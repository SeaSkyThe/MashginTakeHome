# type: ignore
from typing import Any
import uuid
import time
from app import db
from app.models.order import Order
from app.models.item import Item
from app.models.order_item import OrderItem
from app.models.payment import Payment


def create_order(data: dict) -> dict:
    """ 
    Create a new order and related records (order items and payment).

    Args:
        data (dict): A dictionary containing the order data

    Returns:
        dict: A dictionary with the order ID, total amount and status message
    """
    items = data.get("items")
    assert items is not None, "Items are required"

    customer_name = data.get("customer_name")
    customer_email = data.get("customer_email")

    card_number = data.get("card_number")
    assert card_number is not None, "Card number is required"

    cardholder_name = data.get("cardholder_name")
    cvc = data.get("cvc")
    expiration_date = data.get("expiration_date")

    try:
        # We will create everything in a single transaction
        # This will ensure that if any of the operations fail, the entire transaction is rolled back
        with db.session.begin():
            # Create order
            order = Order(
                customer_name=customer_name,
                customer_email=customer_email,
                total_amount=-1,
            )
            db.session.add(order)
            db.session.flush()

            # Create order items
            total_amount = 0
            order_items = []
            for item_data in items:
                item = db.session.query(Item).filter_by(id=item_data["id"]).first()

                if not item:
                    raise ValueError(f"Item with id {item_data['id']} not found")

                unit_price = item.price
                quantity = item_data["quantity"]
                subtotal = unit_price * quantity

                order_item = OrderItem(
                    order_id=order.id,
                    item_id=item.id,
                    quantity=quantity,
                    unit_price=unit_price,
                    subtotal=subtotal,
                )
                order_items.append(order_item)
                total_amount += subtotal
            db.session.add_all(order_items)

            # Update order total_ammount
            order.total_amount = total_amount
            db.session.add(order)

            # Simulate payment processing, it would be async
            payment_processed = fake_payment_processing(
                card_number, cardholder_name, cvc, expiration_date, total_amount
            )
            # Create payment
            payment = Payment(
                order_id=order.id,
                card_number_last_four=card_number[-4:],
                cardholder_name=cardholder_name,
                amount=total_amount,
                status=payment_processed["status"],
                transaction_id=payment_processed["transaction_id"],
            )

            db.session.add(payment)

            return {
                "order_id": order.id,
                "total_amount": total_amount,
                "message": "Order created successfully",
            }

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}


def delete_order(order_id: int) -> dict:
    """
    Delete an order and all related records (order items and payment) by order ID.

    Args:
        order_id (int): The ID of the order to delete

    Returns:
        dict: A dictionary with status message
    """
    try:
        with db.session.begin():
            # Delete order items first (foreign key constraint)
            db.session.query(OrderItem).filter_by(order_id=order_id).delete()

            # Delete payment record
            db.session.query(Payment).filter_by(order_id=order_id).delete()

            # Finally delete the order itself
            order = db.session.query(Order).filter_by(id=order_id).first()
            if not order:
                return {"error": f"Order with id {order_id} not found"}

            db.session.delete(order)

        return {
            "message": f"Order {order_id} and all related records deleted successfully"
        }

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}


def fake_payment_processing(
    card_number: Any, cardholder_name: Any, cvc: Any, expiration_date: Any, amount: Any
):
    # Simulate payment processing
    time.sleep(0.5)
    return {"transaction_id": str(uuid.uuid4()), "status": "completed"}
