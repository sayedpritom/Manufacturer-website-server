# Max Motor

## This is an electric parts manufacturer company's website. Live site: https://manufacturer-website-af272.web.app/

## In back-end, the implemented APIs are: 
1. Create users in MongoDB and issue a JWT token for the client
2. Verify admin
3. Create a new admin
4. Get all users
5. Get all orders
6. Get all orders for a particular user
7. Get a specific parts/item from the parts collection
8. Delete a specific order from the orders collection
9. Upload orders to the database & if already exists then replace that order
10. Upload reviews to the database
11. Get all the reviews from the database
12. Upload the users' details to the database
13. Upload new product to the database
14. Delete a certain product
15. Get the user's details from the database

## Used technologies in the back-end: 
* Node.js, express.js
* JSON Web Token,
* Mongodb(for database)
* Heroku(for server hosting)


## Front-end code: https://github.com/sayedpritom999/Manufacturer-website-client

## In the front-end implemented features and functionalities of the website are:
1. On the home page there are 5 sections(Header, Banner, Items/Parts, Introduction, Business Summary/Achievements, Reviews, and Footer)
2. Email/ password (login/Register) based authentication system
3. The "purchase" page is a private/protected route. This route redirects to the login page if the user is not logged in. After login, the user will be redirected to the page he/she wanted to go to. 
4. Logged-in users can see an option in the header called dashboard. Inside the dashboard, the controls will be different for a normal user and for an admin.
5. Normal users can place orders, leave reviews, and save their personal info on the site.
6. An admin can also save his personal info but other things that an admin can do are: manage all the orders made by all the users, add new products to the site, make new admin, and manage listed products. 
8. Basic Payment System(To be implemented) 
9. Few extra routes: Blogs, Portfolio, 404 Not found. 

## Used technologies in front-end: 
* HTML, CSS, 
* Tailwind CSS, DaisyUI
* Font Awesome
* React, react components, router, react hook form, react query, React Toastify
* Firebase(for website hosting, user login and registration)
