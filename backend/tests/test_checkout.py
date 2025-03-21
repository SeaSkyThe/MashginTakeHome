import unittest
from app import create_app
from app.services import order as order_service


class TestGetItems(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Set up the Flask test app and push an application context."""
        cls.app = create_app()
        cls.app_context = cls.app.app_context()
        cls.app_context.push()

    @classmethod
    def tearDownClass(cls):
        """Remove the application context after all tests run."""
        cls.app_context.pop()

    def test_get_items_grouped_by_category(self):
        """Test that we have all items grouped by category."""
        # Item ID 1 = Bagel - Price 2
        # Item ID 3 = Muffin - Price 1.25
        payload = {
            "items": [{"id": 1, "quantity": 2}, {"id": 3, "quantity": 1}],
            "customer_name": "Marcelo Rodrigues",
            "customer_email": "marcelo.rodrigues@example.com",
            "card_number": "4242424242424242",
            "cardholder_name": "Marcelo Silva",
            "cvc": "123",
            "expiration_date": "12/26",
        }

        order_result = order_service.create_order(payload)

        assert order_result.get("message") == "Order created successfully"
        assert order_result.get("total_amount") == 525

        # Delete the order
        order_id = order_result.get("order_id")
        assert order_id is not None
        deleted = order_service.delete_order(order_id)
        assert (
            deleted.get("message")
            == f"Order {order_id} and all related records deleted successfully"
        )

    def test_request_with_valid_data(self):
        """Test that we can create an order with valid data."""
        payload = {
            "items": [{"id": 1, "quantity": 2}, {"id": 3, "quantity": 1}],
            "customer_name": "Marcelo Rodrigues",
            "customer_email": "marcelo.rodrigues@example.com",
            "card_number": "4242424242424242",
            "cardholder_name": "Marcelo Silva",
            "cvc": "123",
            "expiration_date": "12/26",
        }

        with self.app.app_context():
            response = self.app.test_client().post("/order", json=payload)
            data = response.get_json()

            assert response.status_code == 201
            assert data.get("message") == "Order created successfully"
            assert data.get("total_amount") == 525

            # Delete the order
            order_id = data.get("order_id")
            assert order_id is not None
            deleted = order_service.delete_order(order_id)
            assert (
                deleted.get("message")
                == f"Order {order_id} and all related records deleted successfully"
            )

    def test_request_with_invalid_data(self):
        """Test that we can create an order with invalid data."""
        payload = {
            "items": [{"id": 1, "quantity": 2}, {"id": 3, "quantity": 1}],
            "customer_name": "Marcelo Rodrigues",
            "customer_email": "marcelo.rodrigues@example.com",
            "card_number": "",  # Invalid card number
            "cardholder_name": "Marcelo Silva",
            "cvc": "123",
            "expiration_date": "12/26",
        }

        with self.app.app_context():
            response = self.app.test_client().post("/order", json=payload)
            data = response.get_json()

            assert response.status_code == 400
            assert data.get("errors") is not None
            assert data.get("message") == "Input payload validation failed"
