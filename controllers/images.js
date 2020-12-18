// using express
const express = require("express");
// setting up router
const router = express.Router();
// database setup
const db = require('../models');
// Rest Routes
/* 
  * Index - GET - /users  - Presentational - all users
  * New - GET - /users/new  - Presentational Form - user signup page
  * Show - GET - /users/:id  - Presentational - show your user page or other user profiles
  * Create - Post - /users  - Functional - data receiving for route to create new user
  * Edit - GET - /users/:id/edit  - Presentational Form - edit user profile with previous filled data
  * Update - PUT - /users/:id  - Functional - update user profile with new changes
  * Delete - DELETE - /users/:id  - Functional - Deletes user profile by id from request (FIXME: Make sure to make delete only available to your own profile)
*/

