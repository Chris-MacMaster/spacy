from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product.id')))

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
        }
