from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired
from app.models import User
from flask_login import current_user

class ReviewForm(FlaskForm):
    def validate_stars(form, field):
        stars = field.data
        if stars < 1 or stars > 5:
            raise ValidationError('Stars must be between 1 and 5')
        
    review = StringField('Review', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired(), InputRequired(), validate_stars])
    image = StringField('Image')
    # user = User.objects.get(pk=request.session['userid'])
    # user_id = current_user.id


