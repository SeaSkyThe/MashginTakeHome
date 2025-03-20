# Mashgin Take Home

This repository contains my implementation for the Full-Stack Take-Home Assignment as part of the selection process for the Mashgin Software Engineer position.

## Overview

This project consists of:

- Backend: Flask API to serve menu items and process orders.
- Frontend: React/Next.js application for user interaction.
- Database: PostgreSQL to store orders, categories and items.
- Docker: Containerization for easy setup.

For the backend, Alembic was used to control database migrations and SQLAlchemy as ORM.

## How to setup

You have to have Docker and Docker Compose installed in your machine as dependencies.

The setup should be as easy as running `make setup` in the root. If, for any reason that didn't work out for you, you can remove the `sudo` in the line 4 of the Makefile and try again or try to run it step by step:

1. Make sure you are in the root directory of the project.
2. Run `chmod +x ./backend/entrypoint.sh`
3. Run `sudo docker compose up`, and it will:
    1. Setup the PostgreSQL container in port 5432.
    2. Setup the Backend in port 5000 (below the sub-steps that will be performed):
        1. It will copy the backend folder to the container
        2. Install dependencies using pip (used pip for simplicity, but `poetry` or `uv` would be better choices)
        3. Call the `entrypoint.sh`, that will run the database migrations and start the Flask server.
    3. Setup the Frontend in port ?.

After that you can access the frontend in your browser: `localhost:8080`

## Roadmap

- [X] Setup enviroment with Docker and Docker Compose

- [ ] Backend
  - [X] Setup base Flask server.
  - [X] Setup Alembic for manage migrations
  - [ ] Create data models (SQLAlchemy)
    - [ ] Define Entity Relationship Diagram
    - [ ] Create data models
  - [ ] Create migrations (Alembic)
    - [ ] Load JSON to populate database
  - [ ] Create routes
  - [ ] API Swagger (Flask-RESTPlus)
  - [ ] Tests

- [ ] Frontend
  - [ ] Search for design inspirations.
  - [ ] Setup Base Page
    - [ ] Header
    - [ ] Body
  - [ ] Setup Cart View
  - [ ] Setup Checkout Form
  - [ ] Setup dynamic functionalities
    - [ ] Populate page with categories and products
    - [ ] Add Products to Cart
    - [ ] Confirm Order
