# This file defines the schemas for the API endpoints, using the Flask-RESTX library
# So we can generate Swagger documentation for the API and validate requests
from flask_restx import fields
from app import api


## Schemas for Items
item_schema = api.model(
    "Item",
    {
        "id": fields.Integer(required=True, description="Item ID"),
        "image_id": fields.String(required=True, description="Item image ID"),
        "name": fields.String(required=True, description="Item name"),
        "price": fields.Float(required=True, description="Item price"),
        "category_id": fields.Integer(required=True, description="Item category ID"),
    },
)

category_schema = api.model(
    "Category",
    {
        "id": fields.Integer(required=True, description="Category ID"),
        "image_id": fields.String(description="Image ID for category"),
        "name": fields.String(required=True, description="Category name"),
        "items": fields.List(
            fields.Nested(item_schema), description="Items in this category"
        ),
    },
)


# Schemas for Orders/Checkout
order_item_schema = api.model(
    "OrderItem",
    {
        "id": fields.Integer(required=True, description="Item ID"),
        "quantity": fields.Integer(required=True, description="Quantity"),
    },
)

order_schema = api.model(
    "Order",
    {
        "items": fields.List(
            fields.Nested(order_item_schema),
            required=True,
            description="Items in this order",
        ),
        "customer_name": fields.String(required=True, description="Customer name"),
        "customer_email": fields.String(required=True, description="Customer email"),
        "card_number": fields.String(
            required=True, description="Card number", min_length=16, max_length=16
        ),
        "cardholder_name": fields.String(required=True, description="Cardholder name"),
        "cvc": fields.String(required=True, description="Credit Card Security Code", min_length=3, max_length=4),
        "expiration_date": fields.String(
            required=True, description="Credit Card Expiration date"
        ),
    },
)

