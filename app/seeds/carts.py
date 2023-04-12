from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_carts():
    item1 = Cart(
        product_id = 1,
        user_id = 1,
        quantity = 2
    )
    item2 = Cart(
        product_id = 2,
        user_id = 1,
        quantity = 1
    )
    item3 = Cart(
        product_id = 3,
        user_id = 1,
        quantity = 4
    )
    item4 = Cart(
        product_id = 2,
        user_id = 3,
        quantity = 2
    )


    db.session.add_all([item1, item2, item3, item4])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
