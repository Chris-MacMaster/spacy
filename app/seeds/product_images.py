from app.models import db, ProductImage, environment, SCHEMA

def seed_product_images():
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
    productimage16 = ProductImage(
        url= 'https://i.imgur.com/3LCevE9.png',
        product_id= 3
    )
    productimage17 = ProductImage(
        url= 'https://i.imgur.com/42vLbYz.png',
        product_id= 3
    )
    productimage18 = ProductImage(
        url= 'https://i.imgur.com/S2vUvbI.png',
        product_id= 3
    )
    productimage19 = ProductImage(
        url= 'https://i.imgur.com/NFiggmk.png',
        product_id= 3
    )
    productimage20 = ProductImage(
        url= 'https://i.imgur.com/gdYYdaQ.png',
        product_id= 3
    )
    productimage21 = ProductImage(
        url= 'https://i.imgur.com/gwXshyH.png',
        product_id= 3
    )
    productimage22 = ProductImage(
        url= 'https://i.imgur.com/NM0j3Wo.png',
        product_id= 3
    )
    productimage23 = ProductImage(
        url= 'https://i.imgur.com/PrppzVS.png',
        product_id= 3
    )
    productimage24 = ProductImage(
        url= 'https://i.imgur.com/kKbkr7m.png',
        product_id= 3
    )
    productimage25 = ProductImage(
        url= 'https://i.imgur.com/eVVxNWV.png',
        product_id= 4
    )
    productimage26 = ProductImage(
        url= 'https://i.imgur.com/YCLlLuR.png',
        product_id= 4
    )
    productimage27 = ProductImage(
        url= 'https://i.imgur.com/jeCkJ9F.png',
        product_id= 4
    )
    productimage28 = ProductImage(
        url= 'https://i.imgur.com/LZON9JL.png',
        product_id= 4
    )
    productimage29 = ProductImage(
        url= 'https://i.imgur.com/GjAQvaQ.png',
        product_id= 4
    )
    productimage30 = ProductImage(
        url= 'https://i.imgur.com/NyNVdXF.png',
        product_id= 4
    )
    productimage31 = ProductImage(
        url= 'https://i.imgur.com/xc9Fiia.png',
        product_id= 4
    )
    productimage32 = ProductImage(
        url= 'https://i.imgur.com/tEj9Epz.png',
        product_id= 5
    )
    productimage33 = ProductImage(
        url= 'https://i.imgur.com/pePufdv.jpg',
        product_id= 5
    )
    productimage34 = ProductImage(
        url= 'https://i.imgur.com/XqLxXvF.png',
        product_id= 5
    )
    productimage35 = ProductImage(
        url= 'https://i.imgur.com/sh8t94f.png',
        product_id= 5
    )
    productimage36 = ProductImage(
        url= 'https://i.imgur.com/YSGPnEk.png',
        product_id= 5
    )
    productimage37 = ProductImage(
        url= 'https://i.imgur.com/TG1Tcxu.jpg',
        product_id= 5
    )
    productimage38 = ProductImage(
        url= 'https://i.imgur.com/f07f3yw.png',
        product_id= 5
    )
    productimage39 = ProductImage(
        url= 'https://i.imgur.com/WFo2sEz.png',
        product_id= 5
    )
    productimage40 = ProductImage(
        url= 'https://i.imgur.com/1mTvkR5.png',
        product_id= 5
    )
    productimage41 = ProductImage(
        url= 'https://i.imgur.com/uqNliHt.png',
        product_id= 6
    )
    productimage42 = ProductImage(
        url= 'https://i.imgur.com/evnq0PG.png',
        product_id= 6
    )
    productimage43 = ProductImage(
        url= 'https://i.imgur.com/vr2OCDy.png',
        product_id= 6
    )
    productimage44 = ProductImage(
        url= 'https://i.imgur.com/buMdxF0.png',
        product_id= 6
    )
    productimage45 = ProductImage(
        url= 'https://i.imgur.com/x9Dg5hE.png',
        product_id= 6
    )
    productimage46 = ProductImage(
        url= 'https://i.imgur.com/5H2uUpU.png',
        product_id= 6
    )
    productimage47 = ProductImage(
        url= 'https://i.imgur.com/ZSd0rLQ.png',
        product_id= 6
    )
    productimage48 = ProductImage(
        url= 'https://i.imgur.com/tTfh31L.png',
        product_id= 6
    )
    productimage49 = ProductImage(
        url= 'https://i.imgur.com/NtSDPdE.png',
        product_id= 6
    )
    productimage50 = ProductImage(
        url= 'https://i.imgur.com/B8yEesB.png',
        product_id= 7
    )
    productimage51 = ProductImage(
        url= 'https://i.imgur.com/bt00Nzl.png',
        product_id= 7
    )
    productimage52 = ProductImage(
        url= 'https://i.imgur.com/49wtAVt.png',
        product_id= 7
    )
    productimage53 = ProductImage(
        url= 'https://i.imgur.com/KWP0Qte.png',
        product_id= 7
    )
    productimage54 = ProductImage(
        url= 'https://i.imgur.com/ZqG1UeJ.png',
        product_id= 7
    )
    productimage55 = ProductImage(
        url= 'https://i.imgur.com/COhfkFa.jpg',
        product_id= 8
    )
    productimage56 = ProductImage(
        url= 'https://i.imgur.com/mwJsU82.jpg',
        product_id= 8
    )
    productimage57 = ProductImage(
        url= 'https://i.imgur.com/GMojaJt.jpg',
        product_id= 8
    )
    productimage58 = ProductImage(
        url= 'https://i.imgur.com/fvtIr2i.jpg',
        product_id= 8
    )
    productimage59 = ProductImage(
        url= 'https://i.imgur.com/jbSxcdm.jpg',
        product_id= 8
    )
    productimage60 = ProductImage(
        url= 'https://i.imgur.com/2D1dEjW.jpg',
        product_id= 8
    )
    productimage61 = ProductImage(
        url= 'https://i.imgur.com/wrwMDZn.png',
        product_id= 9
    )
    productimage62 = ProductImage(
        url= 'https://i.imgur.com/KZwxSnH.jpg',
        product_id= 9
    )
    productimage63 = ProductImage(
        url= 'https://i.imgur.com/WQ691xR.png',
        product_id= 9
    )
    productimage64 = ProductImage(
        url= 'https://i.imgur.com/DUYXTxF.png',
        product_id= 9
    )
    productimage65 = ProductImage(
        url= 'https://i.imgur.com/HdLdCYM.png',
        product_id= 9
    )
    productimage66 = ProductImage(
        url= 'https://i.imgur.com/M2Jw0xx.png',
        product_id= 9
    )
    productimage67 = ProductImage(
        url= 'https://i.imgur.com/q7TV7FX.png',
        product_id= 9
    )
    productimage68 = ProductImage(
        url= 'https://i.imgur.com/U4EMihM.jpg',
        product_id= 9
    )
    productimage69 = ProductImage(
        url= 'https://i.imgur.com/LHcFif1.png',
        product_id= 9
    )
    productimage70 = ProductImage(
        url= 'https://i.imgur.com/vCmP87y.png',
        product_id= 10
    )
    productimage71 = ProductImage(
        url= 'https://i.imgur.com/4W5xRhn.png',
        product_id= 10
    )
    productimage72 = ProductImage(
        url= 'https://i.imgur.com/Xyngxpq.png',
        product_id= 10
    )
    productimage73 = ProductImage(
        url= 'https://i.imgur.com/F6hQZN7.png',
        product_id= 10
    )
    productimage74 = ProductImage(
        url= 'https://i.imgur.com/AVb1lTK.png',
        product_id= 10
    )



    db.session.add_all([productimage1, productimage2, productimage3, productimage4, productimage5, productimage6, productimage7, productimage8, productimage9, productimage10, productimage11, productimage12, productimage13, productimage14, productimage15, productimage16, productimage17, productimage18, productimage19, productimage20, productimage21, productimage22, productimage23, productimage24, productimage25, productimage26, productimage27, productimage28, productimage29, productimage30, productimage31, productimage32, productimage33, productimage34, productimage35, productimage36, productimage37, productimage38, productimage39, productimage40, productimage41, productimage42, productimage43, productimage44, productimage45, productimage46, productimage47, productimage48, productimage49, productimage50, productimage51, productimage52, productimage53, productimage54, productimage55, productimage56, productimage57, productimage58, productimage59, productimage60, productimage61, productimage62, productimage63, productimage64, productimage65, productimage66, productimage67, productimage68, productimage69, productimage70, productimage71, productimage72, productimage73, productimage74])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
