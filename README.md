
## WHAT IS SPACEY?

### ABOUT
Spacey is an etsy clone with a space/science-fiction theme to keep things interesting. We though it rhymed, the more we programmed, the more it didn't actually rhyme at all. Prices for jetpacks, phasers, and NASA supplies are at all all time low. Spacey is like the army surplus for space adventurers and scoundrels.


https://spacy-t6mf.onrender.com/


### TECHNOLOGIES

Technologies we've used for our app include

Python
Flask
SqlAlchemy
WTForms
Javascript
React.js/Redux.js


### LAUNCHING APP

To launch the app locally open two terminals.
In the first enter in the terminal 'flask run' to initiate the backend server.

In the second terminal cd into the 'react-app' directory and enter 'npm start' in the terminal to begin the front end server. This will get the app hosted locally.

Otherwise, you can use the app at
https://spacy-t6mf.onrender.com/

### BACKEND ROUTES

Authentication
-logout
-login
-unauthorized

Cart
-Delete cart
-Get cart
-Put cart

Following Users
-Get Followers, Following

Product Reviews
-Get by Review Id
-Get all reviews
-Get by product id
-Delete by review id
-Post review
-Put review
-Post review image

Products
-Get by product id
-Delete by product id
-Put by product id
-Get all products
-Post new product

Search
-Get by parameters
-Filtered get by common categories

Shops
-Get all shops
-Post new shop
-Get Shop by id
-Delete shop by id
-Get shops of current user

User
-Login required

### REDUX STATE SHAPE
```
{
    session: {
        user
    },
    products: {
        allProducts: {},
        singleProducts: {}
    },
    shops: {
        allShops: {},
        singleShop: {}
    },
    reviews: {
        allReviews: {}
    },
    search: {
        searchResults: {}
    },

}
```

### ABOUT THE CREATORS

To learn more about the developers please reach out and network with us. We look forward to programming with you!
```
        ['Christian Ludwell',
        'https://www.linkedin.com/in/christian-ludwell-047b18247/',
        'https://github.com/cludwell'],

        ['Dylan Godeck',
        'https://www.linkedin.com/in/dylan-godeck-188622252/',
        'https://github.com/DylanJG01'],

        ['Christopher MacMaster',
        'https://www.linkedin.com/in/christopher-macmaster-9b05b3113/',
        'https://github.com/Chris-MacMaster'],

        ['Marc Guggenheim',
        'coming-soon',
        'https://github.com/MarcGugg'
        ]
```
