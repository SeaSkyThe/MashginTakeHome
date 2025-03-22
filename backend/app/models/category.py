from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from app import db


class Category(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    image_id = Column(String(255), nullable=True)
    name = Column(String(100), nullable=False)

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(
        DateTime,
        default=func.now(),
        onupdate=func.now(),
    )

    # Relationship
    items = relationship("Item", back_populates="category")
