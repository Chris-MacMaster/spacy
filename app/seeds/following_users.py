
from app.models import db, environment, SCHEMA, follows, User
from sqlalchemy.sql import text, insert


# Adds a demo user, you can add other users here if you want
def seed_follows():
    follower1 = User.query.filter_by(username='carlsagan').first()
    followed1 = User.query.filter_by(username='scienceguy').first()

    x = db.session.add(follows.insert().values(
        follower_id = follower1.id ,
        followed_id = followed1.id)
        )

    db.engine.execute(x)
    # db.session.add(follows.insert().values(
    #     follower_id = 2 ,
    #     followed_id = 3)
    #     )
    # db.session.add(follows.insert().values(
    #     follower_id = 3 ,
    #     followed_id = 2)
    #     )

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
