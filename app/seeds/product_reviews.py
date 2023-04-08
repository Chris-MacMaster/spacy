from app.models import db, ProductReview, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_reviews():
    review01 = ProductReview(
        # shop and product tied to user 3, bill nye
        user_id = 6,
        product_id = 1,
        review = "I am absolutely in love with this necklace! It's so unique and eye-catching, and the quality is fantastic. I really appreciate the attention to detail that went into the design. I've worn it several times already and it always adds a special touch to my outfit. Highly recommend!",
        stars = 5
    )
    review02 = ProductReview(
        # shop and product tied to user 3, bill nye
        user_id = 5,
        product_id = 1,
        review = "While the design of this necklace is really pretty, I was a little disappointed in the quality. It feels a bit flimsy and cheaply made, and the clasp doesn't seem very secure. It's still a nice necklace, but I don't think it's worth the price.",
        stars = 4
    )
    review03 = ProductReview(
        # shop and product tied to user 3, bill nye
        user_id = 2,
        product_id = 1,
        review = "This necklace is simply stunning! The design is intricate and beautiful, and the quality is top-notch. I love how it captures the magic and mystery of the stars and galaxies. I get so many compliments every time I wear it. I highly recommend this necklace to anyone looking for a unique and beautiful piece of jewelry.",
        stars = 5
    )
    review04 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 5,
        product_id = 1,
        review = "These coasters are out of this world! 😉😏 The planets look so realistic, and I love that each one is different. They're also really practical - they're easy to clean and they protect my table from water rings. They arrived quickly and in great condition. Highly recommend!",
        stars = 5
    )
    review05 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 3,
        product_id = 1,
        review = "While I wanted to love this product, it's more of a jetpack than a backpack. While my son loves it, the storage is limited and the other kids at school complain that he smells like jet fuel. Maybe with a little more storage capacity I could recommend it to a friend.",
        stars = 3
    )
    review06 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 2,
        product_id = 1,
        review = "Arrived late and missed the holidays, even though I placed my order well in a month in advance. Very dissappointed. I reached out the shop owner and they were willing to make an exception and take the item back as a return. While I am disappointed, I wouldn't rule out making another purchase here in the future becauase there really isn't anyone else like them",
        stars = 4
    )
    review07 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 4,
        product_id = 1,
        review = "I think the seller is well intentioned, but I don't really see the point in this jetpack like contraption if we don't know what sort of atmosphere other worlds will have. Maybe the atmosphere there is too thin, maybe the gravitational pull means that this thing doesn't have enough power to actually get off the ground. I took a chance, because I am such a big fan of The Mandalorian and want to style a jet pack like Din Djarin. I will let you all know how it goes once I test this thing in the field.",
        stars = 3
    )
    review08 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 3,
        product_id = 1,
        review = "I love these coasters! They're so unique and fun. Each one features a different planet, and the colors and details are really beautiful. They're also really good quality - they're thick and sturdy, and the cork backing keeps them in place on my table. I've gotten a lot of compliments on them already!",
        stars = 5
    )
    review09 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 4,
        product_id = 1,
        review = "These coasters are really cool! The planets are beautifully rendered and the colors are so vibrant. The only reason I'm giving them 4 stars instead of 5 is that they're a little on the small side. They still work well as coasters, but I wish they were a bit bigger.",
        stars = 5
    )

    db.session.add_all([review01, review02, review03, review04, review05, review06, review07, review08, review09])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_reviews"))

    db.session.commit()
