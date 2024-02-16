// Event listener for signup form
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Grab user input
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // If all fields are provided, create a new user
    if (username && email && password) {
        // Send a POST request to the signup route
        const response = await fetch("/api/users/signup", { // Is this the right endpoint?
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" }
        });

        // If we get a good response then redirect the user
        if (response.ok) {
            document.location.replace("/account");
        } else {
            const data = await response.json();
            alert('Failed to sign up: ' + data.message);
        }
    }
}

document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);