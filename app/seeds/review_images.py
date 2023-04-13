from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_review_images():
    rimg1 = ReviewImage(url ='https://i.imgur.com/mkNZVEt.png', review_id =1 )
    rimg2 = ReviewImage(url ='https://i.imgur.com/vk48g0H.png', review_id =2 )
    rimg3 = ReviewImage(url ='https://i.imgur.com/k9X9cVg.jpg', review_id =3 )
    rimg4 = ReviewImage(url ='https://i.imgur.com/ZGG87aE.jpg', review_id =4 )
    rimg5 = ReviewImage(url ='https://i.imgur.com/cUCh380.jpg', review_id =5 )
    rimg6 = ReviewImage(url ='https://i.imgur.com/oUMAFyp.png', review_id =6 )
    rimg7 = ReviewImage(url ='https://i.imgur.com/8rrli9t.jpg', review_id =7 )
    rimg8 = ReviewImage(url ='https://i.imgur.com/dzM0jwt.jpg', review_id =13 )
    rimg9 = ReviewImage(url ='https://i.imgur.com/yiDlUpN.jpg', review_id =12 )
    rimg10 = ReviewImage(url ='https://i.imgur.com/jeCkJ9F.png', review_id =10 )
    rimg11 = ReviewImage(url ='https://i.imgur.com/7Icp2QW.jpg', review_id =11 )
    rimg12 = ReviewImage(url ='https://i.imgur.com/Pl7ckl6.jpg', review_id =17 )
    rimg13 = ReviewImage(url ='https://i.imgur.com/T7YqvtB.jpg', review_id =16 )
    rimg13 = ReviewImage(url ='https://i.imgur.com/762sA1z.jpg', review_id =20 )



    db.session.add_all([rimg1, rimg2, rimg3, rimg4, rimg5, rimg6, rimg7, rimg8, rimg9, rimg10, rimg11, rimg12, rimg13])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()
