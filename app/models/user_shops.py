from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

#Join table
user_shops = db.Table("user_shops", db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('shop_id', db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), primary_key=True))

    
if environment == "production":
    user_shops.schema = SCHEMA
