from typing import Any, List
from app.models.category import Category

from sqlalchemy.orm import joinedload


def get_items_grouped_by_category() -> List[Any]:
    # Query categories and eager load their items in a single query
    categories = (
        Category.query.order_by(Category.id).options(joinedload(Category.items)).all()
    )

    result = [
        {
            "id": category.id,
            "image_id": category.image_id,
            "name": category.name,
            "items": [item.to_dict() for item in category.items],
        }
        for category in categories
    ]

    return result
