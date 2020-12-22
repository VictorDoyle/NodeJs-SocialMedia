console.log("sanity check")


/* ========================== USER PROFILES ========================== */
// SECTION: USER PROFILE FOLLOWERS

/* follower button id # */
/* followButton */
/* follower value id */
/* followerCount */

/*  Follow a user event listener */
let followerTotal = 1;
/* FIXME: add fetch to save follower value on db */

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

// SECTION: USER POSTS COMMENTS/LIKES
/* like button id # */
/* id="likeButton" */
/* like value id */
/*  post.likes */

$("#likeButton").on("click", function addLikes() {});


/* ========================== NOTIFICATIONS ========================== */
/* TODO: link AJAX XTML reqs via btn clcks */
/* id for notification bar */
// mainDropdownMenu



/* ========================== HOME FEED ========================== */


/* ========================== SETTINGS ========================== */