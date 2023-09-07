# Node.js and MySQL Login System with HBS, Bootstrap, and Config

This project is a simple web application that allows users to register, login, logout, and access a home page using Node.js and MySQL. The password is encrypted/hashed using cookies and stored in a local MySQL database. The project also uses HBS as the HTML templating engine, Bootstrap as the CSS framework, and Config as the configuration management module.

## Requirements

- Node.js
- MySQL
- XAMPP (for Windows)

## Installation

- Clone this repository or download the zip file.
- Install the dependencies by running `npm install` in the project directory.
- Start the MySQL server using XAMPP or any other method.
- Create a database named `node_mysql_login` and import the `node_mysql_login.sql` file from the project directory.
- Alternatively setup a mysql database running on apachi(XAMPP) with `id as INT Autoincement  , name , email, password` 
- Create a `.env` file in the project root directory and add your own environment variables, such as `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `SESSION_SECRET`, etc. You can use the `.env.example` file as a reference.
- Add the `.env` file to your `.gitignore` file to prevent it from being exposed on GitHub.
- Start the server by running `node app.js` in the project directory.
- Open your browser and go to `http://localhost:5001` or whatever port you specified in your `.env` file to access the web application.

## Usage

- You can register a new user by filling out the form on the `/register` page and clicking the `Register` button.
- You can login with an existing user by entering the email and password on the `/login` page and clicking the `Login` button.
- You can logout by clicking the `Logout` button on the `/home` page or any other page.
- You can access the home page by clicking the `Home` button on the navigation bar or going to `/home`.
- - You can access the home page by clicking the `profile` button on the navigation bar or going to `/profile`.
- You can see your user information on the home page, such as your name, email

## Features

- The project uses **promisify** to convert callback-based functions to promise-based functions for easier handling of asynchronous operations.
- The project uses **bcrypt** to hash and compare passwords securely.
- The project uses **express-session** and **cookie-parser** to create and manage sessions and cookies for authentication purposes.
- The project uses **express-validator** to validate and sanitize user input data.
- The project uses **hbs** as the template engine to render dynamic HTML pages with partials and helpers.
- The project uses **Bootstrap** as the CSS framework to style the web pages with responsive design.
- The project uses **Config** as the configuration management module to load environment variables from `.env` file and use them in different environments.
