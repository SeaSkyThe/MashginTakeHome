from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base
from app.config import Config

api = Api()


Base = declarative_base()

db = SQLAlchemy(model_class=Base)


def register_blueprints(app):
    from app.routes.item import item_blueprint
    from app.routes.order import order_blueprint

    app.register_blueprint(item_blueprint)
    app.register_blueprint(order_blueprint)


def create_app():
    app = Flask(__name__)
    CORS(app, origins="*")

    # Starting the Flask-RESTX
    api.init_app(
        app,
        title="Mashgin API",
        version="1.0",
        description="API for the Mashgin Take Home Assessment",
    )

    app.config.from_object(Config)

    db.init_app(app)
    register_blueprints(app)

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0")
