const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

/* ====== Presentational Routes ====== */

// VERIFY - GET req - /login -- returns new form for user to login 

/* ====== Functional Routes ====== */

// VERIFY - POST req - /login -- take body data and verify credentials are valid

// REGISTER - GET req - /register --  Presentational Form Route (signup form for user account creation)
router.get("/register", function (request,response) {
    response.render("auth/register");
})

// REGISTER - POST req - /register -- take body data and create an account
router.post("/register", async function(request, response){

    try {
        const foundUser = await db.User.findOne({email: request.body.email});
        if(foundUser) return response.redirect("/login");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(request.body.password, salt);
        request.body.password = hash;

        const newUser = await db.User.create(request.body);
        return response.redirect("/");

    } catch (error) {
        return response.send(error);
    }
});


/* login get req */
router.get("/login", function(request, response){
    response.render("/");
})
/* login post req */
router.post("/login", async function(request, response){
    try {
        const foundUser = await db.User.findOne({email: request.body.email});

        if(!foundUser) return response.redirect("/register");

        const match = await bcrypt.compare(request.body.password, foundUser.password);
        if (!match) return response.send("Email/Password combination is invalid");

        request.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        }
        console.log(request.session.currentUser);
       return response.redirect("/");

    } catch(error) {
        return response.send(error);
    }

})

/* Logout Delete Req */

router.delete("/logout", async function(request, response){ 
    await request.session.destroy();
    response.redirect("/");
});









module.exports = router;
