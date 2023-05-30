from app.models import db, Purchase, Cart, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_purchases():
    x = 0
    while x < 100:
        x += 1
        db.session.add(Purchase(
            user_id = 3,
            product_id = 14,
            shop_id = 2
        ))
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_purchases():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchases"))

    db.session.commit()
