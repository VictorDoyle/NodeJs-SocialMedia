console.log("sanity check")


/* ========================== USER PROFILES ========================== */
/* Follower profile number event listener */

/* follower button id # */
/* followButton */
/* follower value id */
/* followerCount */

/*  Follow a user event listener */
let followerTotal = 1;

$("#followButton").on("click", function followCountToggle(){ 
    $("#followerCount").text(`${followerTotal}`); 
    $("#followButton").toggleClass("basic")
    const $followIcon = (`<i class="user circle outline icon"></i>`);
  if ( $("#followButton").hasClass("basic")) {
      $("#followButton").text("Unfollow");
      $("#followButton").prepend($followIcon);
      followerTotal--;
} else {
   $("#followButton").text("Follow");
   $("#followButton").prepend($followIcon);
   followerTotal++;
}
});




/* ========================== NOTIFICATIONS ========================== */


/* ========================== HOME FEED ========================== */


/* ========================== SETTINGS ========================== */