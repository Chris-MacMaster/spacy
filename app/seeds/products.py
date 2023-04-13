from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        shop_id='3',
        name='Galaxy Necklace',
        description='A beautiful necklace inspired by the stars and galaxies.',
        category='Jewelry',
        available=50,
        free_shipping=True,
        price=29.99
        )

    product2 = Product(
        # item belongs to Carl Sagan
        shop_id='1',
        name='Rocket Backpack',
        description='A backpack shaped like a rocket ship, perfect for carrying all your space gear.',
        category='Accessories',
        available=20,
        free_shipping=False,
        price=149.99
    )

    product3 = Product(
        # item belongs to Carl Sagan

        shop_id='1',
        name='Planet Coasters',
        description='Set of 6 coasters featuring different planets of our solar system.',
        category='Home Decor',
        available=100,
        free_shipping=True,
        price=14.99
    )

    product4 = Product(
                # item belongs to Carl Sagan

        shop_id='1',
        name='Astronaut Figurine',
        description='A highly detailed figurine of an astronaut in a space suit.',
        category='Collectibles',
        available=10,
        free_shipping=False,
        price=99.99
    )

    product5 = Product(
                # item belongs to Carl Sagan

        shop_id='1',
        name='Solar System Poster',
        description='A beautiful poster featuring all the planets in our solar system.',
        category='Wall Art',
        available=200,
        free_shipping=True,
        price=19.99
    )

    product6 = Product(
        shop_id='3',
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
                # item belongs to Carl Sagan

        shop_id='1',
        name='Space Shuttle Model',
        description='A highly detailed model of the space shuttle, with all its parts and functions.',
        category='Collectibles',
        available=15,
        free_shipping=False,
        price=199.99
    )

    product9 = Product(
        shop_id='2',
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

    product11 = Product(
        shop_id='2',
        name='Space MREs',
        description="Here's the thing about space food. While it might seem exotic to people here on Earth — to people who live in some relative proximity to a farm or a grocery store — space food is awesome only in the sense that it is eaten in space. Otherwise, the stuff is not at all awesome. Space food tends to be dry. Or else slimy. Or else just weird: different enough from the product it's trying to emulate that it serves only as a sad reminder of what it is not. Space food — when actually consumed, rather than bought at a gift shop — is pretty horrendous.",
        category='Foodstuffs',
        available=750,
        free_shipping=False,
        price=14.99
    )
    product12 = Product(
        shop_id='2',
        name='Space Macaroons',
        description="The space macaroon is a delectable dessert that is popular among space travelers and those who reside in distant colonies on other planets. This futuristic treat consists of a light and fluffy pastry shell made with a special blend of space flour and enriched with a variety of vitamins and minerals. The shell is then filled with a creamy and flavorful space frosting that is infused with exotic spices and extracts from distant planets.",
        category='Foodstuffs',
        available=75,
        free_shipping=False,
        price=20.99
    )
    product13 = Product(
        shop_id='2',
        name='Space Coffee Cup',
        description="Over the past few years, NASA has been working on a space cup that keeps liquid in its place, even with an open top. The technology is improving life for astronauts living in the weightless environment aboard the International Space Station while giving scientists new insights into how to design other plumbing systems in space. The cup functions just like cups here on Earth, but instead of relying on gravity, it uses a combination of surface tension, wetting and cup geometry to keep the liquids in place. The use of this special cup will allow astronauts to drink a variety of liquids while they are in space, from simple ones like water and juice to more “complex” fluids like cocoa, coffees, espressos and fruit smoothies. Apart from making life easier for astronauts, this technology could also potentially help reduce the volume and weight of drinking bags that need to be sent to space.",
        category='Dishware',
        available=75,
        free_shipping=False,
        price=24.99
    )
    product14 = Product(
        shop_id='2',
        name='Slurm!',
        description="Introducing Slurm, the newest craze in carbonated beverages! This neon green drink packs a sweet and tangy punch that will leave your taste buds buzzing with excitement. Made from a secret blend of the finest ingredients, Slurm is the ultimate thirst quencher for the adventurous drinker. With its bubbly texture and unique flavor profile, Slurm is perfect for any occasion. Whether you're partying with friends, powering through a long day at work, or exploring the depths of space, Slurm is the perfect companion. But what sets Slurm apart from other drinks on the market is its unique origin story. Made from the excretions of a rare alien worm, Slurm is the perfect blend of science and nature. And despite its unusual origins, Slurm is a completely safe and legal beverage, tested and approved by the most rigorous safety standards in the galaxy. So if you're looking for a drink that's out of this world, look no further than Slurm. With its eye-catching color, unique taste, and fascinating backstory, Slurm is sure to be the next big thing in the beverage industry.",
        category='Soft Drink',
        available=75,
        free_shipping=False,
        price=24.99
    )
    db.session.add_all([product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14])


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
