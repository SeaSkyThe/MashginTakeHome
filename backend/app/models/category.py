import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app import db


class Category(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    image_id = Column(String(255), nullable=True)
    name = Column(String(100), nullable=False)

    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(
        DateTime,
        default=datetime.datetime.now(datetime.timezone.utc),
        onupdate=datetime.datetime.now(datetime.timezone.utc),
    )

    # Relationship
    items = relationship("Item", back_populates="category")
