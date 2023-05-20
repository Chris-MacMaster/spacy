from app.models import db, environment, SCHEMA, User, Shop
from sqlalchemy.sql import text


def seed_user_shops(): 

    demo = User.query.get(1)
  
    shop_2 = Shop.query.get(2)
    shop_3 = Shop.query.get(3)
   
    demo.shops.append(shop_2)
    demo.shops.append(shop_3)

    db.session.commit()


def undo_user_shops():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_shops"))

    db.session.commit()

    

