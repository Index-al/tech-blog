async function deletePost(postId) {
    const response = await fetch(`/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        console.log('Post deleted');
        document.location.reload();
    } else {
        alert('Error deleting post');
    }
}