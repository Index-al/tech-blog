async function submitCommentForm(event) {
  event.preventDefault();

  const commentText = document.getElementById('comment-content').value.trim();
  const postId = window.location.toString().split('/').pop();

  console.log("Comment data(?): ", commentText, postId);
  if (commentText) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        content: commentText
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      location.reload();
      console.log("Hit the submitCommentForm route SUCCESS(in addComment.js)");
    } else {
      alert('Failed to create comment');
    }
  }
}

document.getElementById('comment-form').addEventListener('submit', submitCommentForm);