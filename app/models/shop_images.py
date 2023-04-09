from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ShopImage(db.Model):
    __tablename__ = 'shop_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'shopId': self.shop_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
            }
