from flask import Blueprint, request
from flask_restx import Resource
from app import api
from app.schemas import order_schema

import app.services.order as order_service

order_blueprint = Blueprint("order", __name__)


@api.route("/order")
class Orders(Resource):
    @api.expect(order_schema)
    @api.response(201, "Order created successfully")
    @api.response(400, "Invalid data")
    @api.doc(
        description="Creates a new order, including order items and payment details."
    )
    def post(self):
        data = request.json
        if data is None:
            return {"error": "Data is required"}, 400

        order = order_service.create_order(data)
        if order.get("error") is not None:
            return order, 400

        return order, 201
