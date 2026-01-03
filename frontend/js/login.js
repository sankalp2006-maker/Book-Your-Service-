var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn"); // The sliding purple background

function register() {
    x.style.left = "-400px"; // Move login form to the left (out of view)
    y.style.left = "50px";   // Move register form to center
    z.style.left = "110px";  // Slide the purple tab to the right
}

function login() {
    x.style.left = "50px";   // Move login form back to center
    y.style.left = "450px";  // Move register form to the right (out of view)
    z.style.left = "0px";    // Slide the purple tab to the left
}