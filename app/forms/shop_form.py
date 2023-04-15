from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, URLField
from wtforms.validators import DataRequired, URL

class CreateShopForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    street_address = StringField('street_address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    policies = StringField('policies', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
    sales = IntegerField('sales')
