"""Initial migration

Revision ID: b26ba6d024f2
Revises:
Create Date: 2025-03-20 17:39:55.515154

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import json

from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision: str = "b26ba6d024f2"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def populate() -> None:
    data = None
    with open("app/menu.json", "r") as f:
        data = json.load(f)

    if not data:
        print("Error populating database based on JSON.")
        raise Exception("Error populating database based on JSON. Check the file path.")

    categories = data.get("categories")
    items = data.get("items")

    if not categories or not items:
        print("Error extracting categories and/or items from JSON object.")
        raise Exception("Error extracting categories and/or items from JSON object.")

    for category in categories:
        id = category.get("id")
        image_id = category.get("image_id")
        name = category.get("name")

        # Just to make sure every field has a value
        assert id is not None
        assert image_id is not None
        assert name is not None

        op.execute(
            f"INSERT INTO categories (id, image_id, name, created_at, updated_at) VALUES ({id}, '{image_id}', '{name}', NOW(), NOW());"
        )

    for item in items:
        id = item.get("id")
        image_id = item.get("image_id")
        name = item.get("name")
        price = item.get("price")
        category_id = item.get("category_id")

        assert id is not None
        assert image_id is not None
        assert name is not None
        assert price is not None
        assert category_id is not None

        # Prices should be always converted to Integer
        # so we can avoid losses because of float precision
        price = price * 100  # Ex: 17.50 = 17500

        op.execute(
            f"INSERT INTO items (id, image_id, name, price, category_id, created_at, updated_at) VALUES ({id}, '{image_id}', '{name}', {price}, {category_id}, NOW(), NOW())"
        )


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "categories",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("image_id", sa.String(length=255), nullable=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, default=func.now()),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
            default=func.now(),
            onupdate=func.now(),
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "items",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("image_id", sa.String(length=255), nullable=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, default=func.now()),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
            default=func.now(),
            onupdate=func.now(),
        ),
        sa.ForeignKeyConstraint(["category_id"], ["categories.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    # Populate tables with .json received with items and categories
    populate()


def downgrade() -> None:
    """Downgrade schema."""
    # Drop tables
    op.drop_table("items")
    op.drop_table("categories")
