# sqlalchemy is reading the values of commented out code somehow so i'm storing this from the followers model in case we ever decide to revert
# follows = db.Table(
#     "following_users",
#     db.Model.metadata,

#     # if environment == "production":
#     #     __table_args__ = {'schema': SCHEMA}

#     db.Column('id', db.Integer, primary_key=True),
#     db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
#     db.Column('followed_id', db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),

# )

