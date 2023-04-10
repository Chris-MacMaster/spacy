from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_prdocuts():
    product1 = Product(
    shop_id='1',
    name='Galaxy Necklace',
    description='A beautiful necklace inspired by the stars and galaxies.',
    category='Jewelry',
    available=50,
    free_shipping=True,
    price=29.99
    )

    product2 = Product(
        shop_id='1',
        name='Rocket Backpack',
        description='A backpack shaped like a rocket ship, perfect for carrying all your space gear.',
        category='Accessories',
        available=20,
        free_shipping=False,
        price=49.99
    )

    product3 = Product(
        shop_id='1',
        name='Planet Coasters',
        description='Set of 6 coasters featuring different planets of our solar system.',
        category='Home Decor',
        available=100,
        free_shipping=True,
        price=14.99
    )

    product4 = Product(
        shop_id='1',
        name='Astronaut Figurine',
        description='A highly detailed figurine of an astronaut in a space suit.',
        category='Collectibles',
        available=10,
        free_shipping=False,
        price=99.99
    )

    product5 = Product(
        shop_id='2',
        name='Solar System Poster',
        description='A beautiful poster featuring all the planets in our solar system.',
        category='Wall Art',
        available=200,
        free_shipping=True,
        price=19.99
    )

    product6 = Product(
        shop_id='2',
        name='Meteorite Necklace',
        description='A necklace featuring a small piece of a real meteorite.',
        category='Jewelry',
        available=5,
        free_shipping=False,
        price=149.99
    )

    product7 = Product(
        shop_id='3',
        name='Moon Lamp',
        description='A realistic and detailed 3D printed lamp in the shape of the moon.',
        category='Lighting',
        available=30,
        free_shipping=True,
        price=39.99
    )

    product8 = Product(
        shop_id='3',
        name='Space Shuttle Model',
        description='A highly detailed model of the space shuttle, with all its parts and functions.',
        category='Collectibles',
        available=15,
        free_shipping=False,
        price=199.99
    )

    product9 = Product(
        shop_id='3',
        name='Astronaut Ice Cream',
        description='Freeze-dried ice cream, just like the astronauts eat in space!',
        category='Food',
        available=1000,
        free_shipping=True,
        price=4.99
    )

    product10 = Product(
        shop_id='3',
        name='Galactic T-Shirt',
        description='A cool t-shirt with a galaxy print, perfect for space enthusiasts.',
        category='Apparel',
        available=75,
        free_shipping=False,
        price=24.99
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_prdocuts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
