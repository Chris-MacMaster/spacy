from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    carl_sagan = User(
        username='carlsagan',
        email='carlsagan@user.io',
        password='password',
        first_name='Carl',
        last_name='Sagan',
        bio="I'm an American astronomer, planetary scientist, cosmologist, astrophysicist, astrobiologist, author, and science communicator. My best known scientific contribution is my research on the possibility of extraterrestrial life, including experimental demonstration of the production of amino acids from basic chemicals by radiation. I assembled the first physical messages sent into space, the Pioneer plaque and the Voyager Golden Record, universal messages that could potentially be understood by any extraterrestrial intelligence that might find them. I've argued in favor of the hypothesis, accepted since, that the high surface temperatures of Venus are the result of the greenhouse effect. ")

    degrassetyson = User(
        username='neildegrassetyson',
        email='neildegrassetyson@user.io',
        password='password',
        first_name='Neil',
        last_name='deGrasse Tyson',
        bio="I'm an American astrophysicist, author, and science communicator. I've studied at Harvard University, the University of Texas at Austin, and Columbia University. From 1991 to 1994, I was a postdoctoral research associate at Princeton University. In 1994, I joined the Hayden Planetarium as a staff scientist and the Princeton faculty as a visiting research scientist and lecturer. In 1996, I became director of the planetarium and oversaw its $210 million reconstruction project, which was completed in 2000. Since 1996, I've been the director of the Hayden Planetarium at the Rose Center for Earth and Space in New York City. The center is part of the American Museum of Natural History, where I founded the Department of Astrophysics in 1997 and have been a research associate in the department since 2003. ")

    scienceguy = User(
        username='scienceguy',
        email='billnyeguy@user.io',
        password='password',
        first_name='Bill',
        last_name='Nye',
        bio="Born in Washington, D.C., Nye began his career as a mechanical engineer for Boeing in Seattle, where he invented a hydraulic resonance suppressor tube used on 747 airplanes. In 1986, he left Boeing to pursue comedy—writing and performing for the local sketch television show Almost Live!, where he regularly conducted entertainment scientific experiments. Aspiring to become the next Mr. Wizard, Nye successfully pitched the children's television program Bill Nye the Science Guy to Seattle's public television station, KCTS-TV. The show—which proudly proclaimed in its theme song that 'science rules!'—ran from 1993 to 1998 in national TV syndication. Known for its 'high-energy presentation and MTV-paced segments', the program became a hit among kids and adults, was critically acclaimed, and was nominated for 23 Emmy Awards, winning 19, including Outstanding Performer in Children's Programming for Nye himself. ")

    neil_armstrong = User(
        username='neil_armstrong',
        email='neil_armstrong@nasa.gov',
        password='password',
        first_name='Neil',
        last_name='Armstrong',
        bio='Neil Armstrong was the first person to walk on the moon as part of the Apollo 11 mission in 1969. He was also a naval aviator and aeronautical engineer. Armstrong was awarded the Presidential Medal of Freedom in 1969 and the Congressional Gold Medal in 2009.')

    michio_kaku = User(
        username='michio_kaku',
        email='michio_kaku@user.io.jp',
        password='password',
        first_name='Michio',
        last_name='Kaku',
        bio="I'm an American theoretical physicist, futurist, and popularizer of science (science communicator). I am a professor of theoretical physics in the City College of New York and CUNY Graduate Center. I'm the author of several books about physics and related topics and has made frequent appearances on radio, television, and film. I am also a regular contributor to his own blog, as well as other popular media outlets. For my efforts to bridge science and science fiction, I am a 2021 Sir Arthur Clarke Lifetime Achievement Awardee. My books Physics of the Impossible (2008), Physics of the Future (2011), The Future of the Mind (2014), and The God Equation: The Quest for a Theory of Everything (2021) became New York Times best sellers. Kaku has hosted several television specials for the BBC, the Discovery Channel, the History Channel, and the Science Channel. ")

    valentina_tereshkova = User(
        username='valentina_tereshkova',
        email='valentina_tereshkova@roscomos.ru',
        password='password',
        first_name='Valentina',
        last_name='Tereshkova',
        bio='Valentina Tereshkova is a retired Russian cosmonaut who became the first woman to travel into space in 1963. She orbited the Earth 48 times aboard the Vostok 6 spacecraft. Tereshkova was also a prominent political figure in the Soviet Union and served in the State Duma, the lower house of the Russian parliament.')


    db.session.add_all([carl_sagan, scienceguy, neil_armstrong, degrassetyson, michio_kaku, ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
