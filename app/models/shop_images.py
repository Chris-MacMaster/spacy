from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShopImage(db.Model):
    __tablename__ = 'shop_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)

    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')))

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
            }
