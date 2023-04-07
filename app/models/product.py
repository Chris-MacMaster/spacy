from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment
# from sqlalchemy.orm import validates


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    shop_id = db.Column(db.Integer, db.ForeignKey("shops.id"))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String, nullable=False)
    available = db.Column(db.Integer)
    free_shipping = db.Column(db.Boolean, nullable=False)
    price = db.Column(db.Float, nullable=False) # if fails, float, DECIMAL


    # menu_id = db.Column(db.Integer, db.ForeignKey("menus.id"))
