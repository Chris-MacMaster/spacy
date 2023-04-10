from app.models import db, ShopImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shop_images():
    shop1img = ShopImage(
        url= 'https://i.imgur.com/8Djz5QN.jpg',
        shop_id= 1
    )
    shop2img = ShopImage(
        url= 'https://i.imgur.com/WSGNKxC.jpg',
        shop_id= 1
    )
    shop3img = ShopImage(
        url= 'https://i.imgur.com/89kEyub.jpg',
        shop_id= 1
    )

    db.session.add_all([shop1img, shop2img, shop3img])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shop_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shop_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shop_images"))

    db.session.commit()
