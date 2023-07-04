from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileField

class ReviewForm(FlaskForm):
    def validate_stars(form, field):
        stars = field.data
        if stars < 1 or stars > 5:
            raise ValidationError('Stars must be between 1 and 5')

    review = StringField('review', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired(), validate_stars])
    url = FileField('url')
