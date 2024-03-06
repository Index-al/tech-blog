async function newFormHandler(event) {
	// Prevents page from refreshing
	event.preventDefault();

	// Grabs user input for title/content
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  // Grabs user id from session storage
  const user_id = window.sessionStorage.getItem("user_id");
  console.log(user_id);

  // Get post url and post date
  const post_url = window.location.href;
  const post_date = new Date();

	// Sends user input/info to server
	const response = await fetch("/posts", {
		method: "POST",
		body: JSON.stringify({
      user_id,
			title,
			content,
      post_url,
      post_date,
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
		alert("Error creating post"); // TODO: replace this
	}

  console.log("Attempted to create new post!");
}

document
	.querySelector("#new-post-form")
	.addEventListener("submit", newFormHandler);
