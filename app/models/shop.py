from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func

class Shop(db.Model):
    __tablename__ = "shops"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    street_address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    description = db.Column(db.Text)
    category = db.Column(db.String, nullable=False)
    sales = db.Column(db.Integer, default=0)
    policies = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    products = db.relationship("Product", back_populates="shops", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'streetAddress': self.street_address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'description':self.description,
            'category': self.category,
            'sales': self.sales,
            'policies': self.policies,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
