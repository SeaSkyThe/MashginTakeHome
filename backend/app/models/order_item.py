from app import db
from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.orm import relationship


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, db.ForeignKey("orders.id"), nullable=False)
    item_id = Column(Integer, db.ForeignKey("items.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Integer, nullable=False)
    subtotal = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=func.now())

    # Relashionship
    order = relationship("Order", back_populates="order_items")
    item = relationship("Item", back_populates="order_items")

    def __repr__(self):
        return f"<OrderItem {self.id} order_id={self.order_id} item_id={self.item_id} quantity={self.quantity} unit_price={self.unit_price} subtotal={self.subtotal}>"
