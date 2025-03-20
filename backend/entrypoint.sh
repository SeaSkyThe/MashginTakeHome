#!/bin/sh

# Dockerfile entrypoint

echo "Running Alembic migrations..."
alembic upgrade head

echo "Starting Flask..."
exec flask run --host=0.0.0.0
