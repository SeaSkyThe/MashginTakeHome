from app import db
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship


class Order(db.Model):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    customer_name = Column(String(100), nullable=False)
    customer_email = Column(String(100), nullable=False)
    total_amount = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=func.now())

    # Relashionship
    order_items = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )
    payments = relationship(
        "Payment", back_populates="order", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Order {self.id} customer_name={self.customer_name} customer_email={self.customer_email} total_amount={self.total_amount}>"
