console.log("sanity check")


/* ========================== USER PROFILES ========================== */
/* Follower profile number event listener */

/* follower button id # */
followButton
/* follower value id */
followerCount

/*  Follow a user event listener */
let followerTotal = 0;
$("#followButton").on("click", function followCountAdd(){ 
  followerTotal++; 
    $("#followerCount").text(`${followerTotal}`); 
    $("#followButton").off("click"); /* limit to follow once */
    /* change follow button to "unfollow" */
    $("#followButton").addClass("ui basic button");
    $("#followButton").text("Unfollow");
});

/* Unfollow */


/* ========================== NOTIFICATIONS ========================== */


/* ========================== HOME FEED ========================== */


/* ========================== SETTINGS ========================== */