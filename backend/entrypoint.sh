#!/bin/sh

# Dockerfile entrypoint

# Exit immediately if a command exits with a non-zero status
set -e

echo "Running Alembic migrations..."
alembic upgrade head

echo "Running unit tests before starting the app..."
python -m unittest discover -s tests

echo "Starting Flask..."
exec flask run --host=0.0.0.0
