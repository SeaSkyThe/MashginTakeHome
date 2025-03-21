import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app import db


class Item(db.Model):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    image_id = Column(String(255), nullable=True)
    name = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(
        DateTime,
        default=datetime.datetime.now(datetime.timezone.utc),
        onupdate=datetime.datetime.now(datetime.timezone.utc),
    )

    # Relationship
    category = relationship("Category", back_populates="items")
    order_items = relationship("OrderItem", back_populates="item")

    def __repr__(self):
        return f"<Item {self.id} image_id={self.image_id} name={self.name} price={self.price} category_id={self.category_id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "image_id": self.image_id,
            "name": self.name,
            "price": self.price / 100,
            "category_id": self.category_id,
        }
