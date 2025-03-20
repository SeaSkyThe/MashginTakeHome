import datetime

from app import db
from sqlalchemy import Column, Integer, String, DateTime


class Order(db.Model):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    customer_name = Column(String(100), nullable=False)
    customer_email = Column(String(100), nullable=False)
    total_amount = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))

    def __repr__(self):
        return f"<Order {self.id} customer_name={self.customer_name} customer_email={self.customer_email} total_amount={self.total_amount}>"
