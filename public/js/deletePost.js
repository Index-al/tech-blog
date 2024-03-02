async function newFormHandler(event) {
	// Prevents page from refreshing
	event.preventDefault();

  // Grabs user id from session storage
  const user_id = window.sessionStorage.getItem("user_id");
  console.log(user_id);

	// Sends user input/info to server
	const response = await fetch("/posts/:id", {
		method: "DELETE",
		body: JSON.stringify({
            id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

  // If successful, redirect to homepage
	if (response.ok) {
    console.log('Good response: ' + response);
		document.location.replace("/");
	} else {
    console.log('Bad response: ' + response);
		alert("Error deleting post"); // TODO: replace this
	}

  console.log("Attempted to delete a post!");
}

document
	.querySelector("#delete-post-form")
	.addEventListener("submit", newFormHandler);
