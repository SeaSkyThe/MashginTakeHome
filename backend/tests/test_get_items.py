import unittest
from app import create_app
from app.services import item as item_service


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
        items = item_service.get_items_grouped_by_category()

        # Check that we have the correct number of categories (3)
        self.assertEqual(len(items), 3)

        # Check that the first category has the correct name, ID and number of items
        self.assertEqual(items[0]["id"], 1)
        self.assertEqual(items[0]["name"], "Bakery")
        self.assertEqual(len(items[0]["items"]), 5)

        # Check that the second category has the correct name, ID and number of items
        self.assertEqual(items[1]["id"], 2)
        self.assertEqual(items[1]["name"], "Entrees")
        self.assertEqual(len(items[1]["items"]), 3)

        # Check that the third category has the correct name, ID and number of items
        self.assertEqual(items[2]["id"], 3)
        self.assertEqual(items[2]["name"], "Drinks")
        self.assertEqual(len(items[2]["items"]), 3)
