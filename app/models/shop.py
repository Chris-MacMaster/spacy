from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment



class Shop(db.Model):
    __tablename__ = "shops"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    street_address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    description = db.Column(db.Text)
    category = db.Column(db.String, nullable=False)
    sales = db.Column(db.Integer, default=0)
    policies = db.Column(db.Text)

    db.relationship("Product", back_populates="")






    