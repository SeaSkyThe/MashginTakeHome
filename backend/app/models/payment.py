import datetime
from app import db
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship


class Payment(db.Model):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, db.ForeignKey("orders.id"), nullable=False)
    card_number_last_four = Column(String(4), nullable=False)
    cardholder_name = Column(String(100), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(String(100), nullable=False)
    transaction_id = Column(String(100), nullable=False)

    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))

    # Relashionship
    order = relationship("Order", back_populates="payments")

    def __repr__(self):
        return f"<Payment {self.id} order_id={self.order_id} card_number_last_four={self.card_number_last_four} cardholder_name={self.cardholder_name} amount={self.amount} status={self.status} transaction_id={self.transaction_id}>"
