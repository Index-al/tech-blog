async function editPostHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
    const postId = window.location.pathname.split('/')[3]; // Extract post ID from URL

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('Post updated');
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update post');
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);