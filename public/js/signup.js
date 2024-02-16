// Event listener for signup form
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Grab user input
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // Error debugging
    console.log("Hitting the signup form handler!");

    // If all fields are provided, create a new user
    if (username && email && password) {
        // Send a POST request to the signup route
        const response = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" }
        });

        // If we get a good response then redirect the user
        if (response.ok) {
            document.location.replace("/account");
        } else { // otherwise report the error
            const data = await response.json();
            console.log(data);

            alert('Failed to sign up: ' + response.statusText);
        }
    }
}

// Event listener for signup form
document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);

// Event listener for login link
document.querySelector("#login-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.location.replace("/login");
});