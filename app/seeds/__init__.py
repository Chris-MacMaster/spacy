from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .shops import seed_shops, undo_shops
from .user_shops import seed_user_shops, undo_user_shops
from .shop_images import seed_shop_images, undo_shop_images
from .product_images import seed_product_images, undo_product_images
from .product_reviews import seed_product_reviews, undo_product_reviews
from .review_images import seed_review_images, undo_review_images
from .carts import seed_carts, undo_carts
from .following_users import seed_follows, undo_follows
from .purchases import seed_purchases, undo_purchases
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_shops()
        undo_products()
        undo_user_shops()
        undo_shop_images()
        undo_product_images()
        undo_product_reviews()
        undo_review_images()
        undo_carts()
        undo_follows()
        undo_purchases()
    seed_users()
    seed_shops()
    seed_products()
    seed_user_shops()
    seed_shop_images()
    seed_product_images()
    seed_product_reviews()
    seed_review_images()
    seed_carts()
    seed_follows()
    seed_purchases()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_users()
    undo_shops()
    undo_products()
    undo_user_shops()
    undo_shop_images()
    undo_product_images()
    undo_product_reviews()
    undo_review_images()
    undo_carts()
    undo_follows()
    undo_purchases()
