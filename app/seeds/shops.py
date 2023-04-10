from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_shops():
    shop1 = Shop(
            name='Galactic Outfitters',
            owner_id = 1,
            street_address = '123 Starship Blvd',
            city = 'New Terra',
            state = 'Zeta Quadrant',
            country = 'Galactic Federation',
            description = 'We sell the latest and greatest space gear for explorers and adventurers alike.',
            category = 'Space Equipment',
            sales = 100,
            policies = 'We accept all major credit cards. Gift cards are coming soon. All sales are final for used or damaged equipment. We require payment in full before we can ship your order. If you are unhappy with your order please reach out and contact us, we might be able to arrange an exchange or store credit.'
            )

    shop2 = Shop(
            name='Intergalactic Cafe',
            owner_id = 2,
            street_address = '456 Asteroid Way',
            city = 'Nova Station',
            state = 'Alpha Quadrant',
            country = 'Galactic Alliance',
            description = 'We serve up the best coffee and snacks in the galaxy. Shipping is fast! We take pride in our work and strive to help you discover new organic flavors!',
            category = 'Cafe',
            sales = 50,
            policies = 'We strive for 100 percent customer satisfaction. If you are unable with your order, please reach out to us with 14 days of receiving your roder to request a return or exchange. Items must be returned in mint condition with all packaging and tags.'
            )

    shop3 = Shop(
            name='Cosmic Couture',
            owner_id = 3,
            street_address = '789 Meteorite Rd',
            city = 'Celestial City',
            state = 'Beta Quadrant',
            country = 'United Star Systems',
            description = 'We design and create one-of-a-kind space fashion for the stylish space traveler.',
            category = 'Fashion',
            sales = 200,
            policies = 'We love to work on customer orders. Please contact us and let us know your vision, maybe we could collaborate! Please note that customer orders take longer to produce and will ship later than standard policies.'
            )

    db.session.add_all([shop1, shop2, shop3])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
