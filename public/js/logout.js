// Logout functionality
const logout = async () => {
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.replace("/login");
    } else {
        // In the event of an error, report the error
        const data = await response.json();
        console.log(data);

        // TODO: Add a modal or some other way to display the error instead of an alert
        alert("Failed to log out.");
    }
}

// Event listener for logout button
document.querySelector("#logout").addEventListener("click", logout);