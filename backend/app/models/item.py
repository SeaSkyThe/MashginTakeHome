import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app import db


class Item(db.Model):
    __tablename__ = "items"

    id = Column(Integer, primay_key=True)
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

    category = relationship("Category", back_populates="items")
    order_items = relationship("OrderItem", back_populates="item")
