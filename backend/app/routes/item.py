from flask import Blueprint
from flask_restx import Resource
from app import api
from app.schemas import category_schema

import app.services.item as item_service

item_blueprint = Blueprint("item", __name__)


@api.route("/items")
class Items(Resource):
    @api.marshal_with(category_schema)
    @api.response(200, 'Successfully fetched items')
    @api.response(500, 'Internal server error')
    @api.doc(description='Fetches all items grouped by category.')
    def get(self):
        items = item_service.get_items_grouped_by_category()
        return items, 200
