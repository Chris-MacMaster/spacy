from app.models import db, ProductImage, environment, SCHEMA

def seed_shop_images():
    productimage1 = ProductImage(
        url= 'https://i.imgur.com/x7EF5yJ.jpg',
        product_id= 2
    )
    productimage2 = ProductImage(
        url= 'https://i.imgur.com/iuvY3Px.jpg',
        product_id= 2
    )
    productimage3 = ProductImage(
        url= 'https://i.imgur.com/vNuuuLZ.jpg',
        product_id= 2
    )
    productimage4 = ProductImage(
        url= 'https://i.imgur.com/814gzb1.jpg',
        product_id= 2
    )
    productimage5 = ProductImage(
        url= 'https://i.imgur.com/bKS0Vs5.jpg',
        product_id= 2
    )
    productimage6 = ProductImage(
        url= 'https://i.imgur.com/yPhvcTV.jpg',
        product_id= 2
    )
    productimage7 = ProductImage(
        url= 'https://i.imgur.com/glZ1IaZ.jpg',
        product_id= 1
    )
    productimage8 = ProductImage(
        url= 'https://i.imgur.com/7P90uOX.jpg',
        product_id= 1
    )
    productimage9 = ProductImage(
        url= 'https://i.imgur.com/p6Rsz8s.jpg',
        product_id= 1
    )
    productimage10 = ProductImage(
        url= 'https://i.imgur.com/EjmW3Td.jpg',
        product_id= 1
    )
    productimage11 = ProductImage(
        url= 'https://i.imgur.com/sWDeEzT.png',
        product_id= 1
    )
    productimage12 = ProductImage(
        url= 'https://i.imgur.com/GTzxsPm.png',
        product_id= 1
    )
    productimage13 = ProductImage(
        url= 'https://i.imgur.com/OpkTCzC.png',
        product_id= 1
    )
    productimage14 = ProductImage(
        url= 'https://i.imgur.com/BLhrQzf.png',
        product_id= 1
    )
    productimage15 = ProductImage(
        url= 'https://i.imgur.com/3s0U2wL.png',
        product_id= 1
    )

    db.session.add_all([productimage1, productimage2, productimage3, productimage4, productimage5, productimage6, productimage7, productimage8, productimage9, productimage10, productimage11, productimage12, productimage13, productimage14, productimage15])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shop_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
