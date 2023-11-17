from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
# from sqlalchemy.orm import validates
from sqlalchemy.sql import func


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shop_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("shops.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String, nullable=False)
    available = db.Column(db.Integer)
    free_shipping = db.Column(db.Boolean, nullable=False)
    price = db.Column(db.Float, nullable=False)  # if fails, float, DECIMAL
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    shops = db.relationship('Shop', back_populates='products')
    product_reviews = db.relationship(
        'ProductReview', back_populates='products', cascade="all, delete")
    product_images = db.relationship(
        'ProductImage', back_populates='products', cascade="all, delete")
    carts = db.relationship('Cart', backref='product', lazy=True)
    purchases = db.relationship('Purchase', backref='product', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'shopId': self.shop_id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'available': self.available,
            'freeShipping': self.free_shipping,
            'price': self.price,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    # menu_id = db.Column(db.Integer, db.ForeignKey("menus.id"))
