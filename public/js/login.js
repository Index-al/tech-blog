// Event listener for login form
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Grab user input from login form
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    // Error debugging
    console.log("Hitting the login form handler!");

    // If email and password are both provided, log the user in
    if (email && password) {
        // Send a POST request to the login route
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        });

        // If we get a good response then redirect the user
        if (response.ok) {
            document.location.replace("/dashboard");
        } else { // otherwise report the error
            const data = await response.json();
            console.log("Error logging in: ", data);

            // TODO: Add a modal or some other way to display the error instead of an alert
            alert('Failed to log in. Please try again.');
        }
    }
}

// Event listener for signup form
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Grab user input
    const user_id = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // Error debugging
    console.log("Hitting the signup form handler!");

    // If all fields are provided, create a new user
    if (user_id && email && password) {
        // Send a POST request to the signup route
        const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ user_id, email, password }),
            headers: { "Content-Type": "application/json" }
        });

        // If we get a good response then redirect the user
        if (response.ok) {
            document.location.replace("/dashboard");
        } else { // otherwise report the error
            const data = await response.json();
            console.log(data);

            alert('Failed to sign up: ' + response.statusText);
        }
    }
}

// Event listeners for login form
document.querySelector(".login-container").addEventListener("submit", loginFormHandler);

// Event listener for signup form
document.querySelector(".signup-container").addEventListener("submit", signupFormHandler);