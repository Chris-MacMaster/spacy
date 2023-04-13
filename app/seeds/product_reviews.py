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
        product_id = 3,
        review = "These coasters are out of this world! 😉😏 The planets look so realistic, and I love that each one is different. They're also really practical - they're easy to clean and they protect my table from water rings. They arrived quickly and in great condition. Highly recommend!",
        stars = 5
    )
    review05 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 3,
        product_id = 2,
        review = "While I wanted to love this product, it's more of a jetpack than a backpack. While my son loves it, the storage is limited and the other kids at school complain that he smells like jet fuel. Maybe with a little more storage capacity I could recommend it to a friend.",
        stars = 3
    )
    review06 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 2,
        product_id = 2,
        review = "Arrived late and missed the holidays, even though I placed my order well in a month in advance. Very dissappointed. I reached out the shop owner and they were willing to make an exception and take the item back as a return. While I am disappointed, I wouldn't rule out making another purchase here in the future becauase there really isn't anyone else like them",
        stars = 4
    )
    review07 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 4,
        product_id = 2,
        review = "I think the seller is well intentioned, but I don't really see the point in this jetpack like contraption if we don't know what sort of atmosphere other worlds will have. Maybe the atmosphere there is too thin, maybe the gravitational pull means that this thing doesn't have enough power to actually get off the ground. I took a chance, because I am such a big fan of The Mandalorian and want to style a jet pack like Din Djarin. I will let you all know how it goes once I test this thing in the field.",
        stars = 3
    )
    review08 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 3,
        product_id = 3,
        review = "I love these coasters! They're so unique and fun. Each one features a different planet, and the colors and details are really beautiful. They're also really good quality - they're thick and sturdy, and the cork backing keeps them in place on my table. I've gotten a lot of compliments on them already!",
        stars = 5
    )
    review09 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 4,
        product_id = 3,
        review = "These coasters are really cool! The planets are beautifully rendered and the colors are so vibrant. The only reason I'm giving them 4 stars instead of 5 is that they're a little on the small side. They still work well as coasters, but I wish they were a bit bigger.",
        stars = 5
    )
    review10 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 2,
        product_id = 4,
        review = "The Astronaut Figurine is a high-quality collectible that exceeded my expectations. It arrived in perfect condition and is even more impressive in person than in the photos. Highly recommended!",
        stars = 5
    )
    review11 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 3,
        product_id = 4,
        review = "I wanted to love this figurine, but it really looks like it's from wish.com. You can see all of the seams where the plastic molds were pressed together, and not only can you see them, but they're actually really sharp! Hurts to hold this little thing in your hand for too long. As such, my kids don't really play with it too often and it just sits in their room. Maybe I'll give it to the dog for him to destroy",
        stars = 1
    )
    review12 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 4,
        product_id = 4,
        review = "The historical accuracy of this thing is ridiculous. This is an astronaut in an older model space suit that NASA retired about two decades ago. This figurine represents a piece of history and definitely more of a collector's piece than a toy to be given to your kids",
        stars = 5
    )
    review13 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 5,
        product_id = 4,
        review = "The Astronaut Figurine is a beautiful piece of art that captures the wonder and excitement of space exploration. It's well-made, sturdy, and looks great on my desk. I couldn't be happier with my purchase.",
        stars = 5
    )
    review14 = ProductReview(
        # shop and product tied to user 1, carl sagan
        user_id = 6,
        product_id = 4,
        review = "It's an astronaut. What more can you want?",
        stars = 5
    )
    review15 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 6,
        product_id = 11,
        review = "As an avid camper, I've tried my fair share of MREs, but these's are by far the best I've had. The taste is surprisingly good, and the portion sizes are perfect for a hearty meal. Plus, the packaging is incredibly durable, ensuring that the food stays fresh for a long time. I would definitely recommend thsese MREs to any outdoor enthusiast",
        stars = 5
    )
    review16 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 1,
        product_id = 11,
        review = "I'm super pleased that these MREs come in vegan, vegetarian, gluten free, and keto varieties! I super recommend these to anyone who is currently on a diet! ",
        stars = 5
    )
    review17 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 3,
        product_id = 11,
        review = "As a space rogue, adventurer, and jack of all trades, I've had my fair share of struggle meals. I've got to say though, after all the years of hearing horror stories, the bad reputation that MREs have gotten are undeserved, at least when we're talking about these MREs. They are surprisingly good, and I appreciate that they are nutritionally balanced, especially when I'm in the middle of dead space without hope of restock.",
        stars = 5
    )
    review18 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 4,
        product_id = 11,
        review = "On a recent mission, I forgot to bring my own supplies and these MREs were what the employer had on hand. Being in zero gravity can really mess with your appetite, but even then these are pretty neutral on the palette. A must have, but a soft recommend.",
        stars = 3
    )
    review19 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 1,
        product_id = 12,
        review = "I heard a rumor that these are spiced with THE spice, you know the one. The one that is worth more republic credits than you can carry. After trying them, I understand the rumors. These are amazing, perfect for following the bland MREs that so many of us have become accustomed to.",
        stars = 5
    )
    review20 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 3,
        product_id = 12,
        review = "I'm not usually a fan of deserts but these were amazing. The textures and flavors a perfect match, very apparent that whomever made them is incredibly skilled. One complaint though. The spice, something about the spice makes my lips burn.",
        stars = 5
    )
    review21 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 4,
        product_id = 12,
        review = "As a self-proclaimed foodie, I'm super pleased that these are gluten free! It's so hard to find gluten free things that taste and feel like a big bite of styrofoam.",
        stars = 5
    )
    review22 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 5,
        product_id = 12,
        review = "I ordered these macaroons for a party, I was too busy that week preparing for the next mission. And they were a huge hit! I ordered a few dozen. Something about them is strangely filling, I wasn't hungry for the rest of the day, super bizarre. I don't usually try new foods so I'm super pleased that I loved these.",
        stars = 5
    )
    review23 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 1,
        product_id = 13,
        review = "I once got stranded in the orbit of a far off strange planet. How? My got-danged TANG escaped the pouch I was drinking from and fried my navigation console. Some bounty hunters took me in and rescued me but that's another story. Can't believe there's finally a solution to drinking in space!",
        stars = 5
    )
    review24 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 3,
        product_id = 13,
        review = "Nothing is scarier than trying to chase down a boiling ball of coffee as it floats through the office, cant wait to show my cabin mates the new mug I got! And the best part is, those who stream our missions down on Earth don't know what I'm drinking 😏😉.",
        stars = 5
    )
    review25 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 6,
        product_id = 13,
        review = "I was skeptical at first, but this mug really works! I've used it on several zero-gravity flights and it keeps my coffee contained and easy to drink. The quality is top-notch, and the NASA logo adds a nice touch. Great gift for any space enthusiast",
        stars = 5
    )
    review26 = ProductReview(
        # shop and product tied to user 2, degrasse tyson
        user_id = 1,
        product_id = 13,
        review = "If you're looking for the ultimate coffee mug for space travel, look no further. The NASA zero-gravity coffee mug is the real deal. It's lightweight, durable, and the perfect size for a morning cup of coffee. I love the way it feels in my hand, and the special design keeps my coffee from spilling all over the place. A must-have for any serious astronaut.",
        stars = 5
    )
    # review24 = ProductReview(
    #     # shop and product tied to user 2, degrasse tyson
    #     user_id = 1,
    #     product_id = 14,
    #     review = "",
    #     stars = 5
    # )
    # review24 = ProductReview(
    #     # shop and product tied to user 2, degrasse tyson
    #     user_id = 1,
    #     product_id = 14,
    #     review = "",
    #     stars = 5
    # )

    db.session.add_all([review01, review02, review03, review04, review05, review06, review07, review08, review09, review10, review11, review12, review13, review14, review14, review15, review16, review17, review18, review19, review20, review21, review22, review23, review24, review25, review26])
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
