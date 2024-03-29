from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Purchase(db.Model):
    __tablename__ = 'purchases'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')))
    shop_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('shops.id')))

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'quantity': self.quantity,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
