from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Flask-SQLAlchemy instance

# Import all models to register them
from .category import Category
from .item import Item
from .order import Order
from .order_item import OrderItem
from .payment import Payment

