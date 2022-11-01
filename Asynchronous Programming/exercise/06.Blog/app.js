function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPost);
    document.getElementById('btnViewPost').addEventListener('click', getComments);
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const selectedOption = document.getElementById('posts');
    const postTittle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');
    const mainOp = document.getElementById('posts');

    async function getComments() {

        try {
            const postResponse = await fetch(postUrl);

            if (!postResponse.ok) {
                throw new Error();
            }

            const postData = await postResponse.json();
            const selectedPost = Object.values(postData).find(post => post.id === selectedOption.value);
            postTittle.textContent = selectedPost.title;
            postBody.textContent = selectedPost.body;

            const commentsResponse = await fetch(commentsUrl);

            if (!commentsResponse.ok) {
                throw new Error();
            }

            const commentsData = await commentsResponse.json();
            postComments.replaceChildren();
            const comments = Object.values(commentsData).filter(comment => comment.postId === selectedOption.value);
            comments.forEach(el => {
                const li = document.createElement('li');
                li.id = el.id;
                li.textContent = el.text;
                postComments.appendChild(li);
            });
        } catch (e) {
            console.log(e.status);
        }
    }

    async function getPost() {

        try {
            const postResponse = await fetch(postUrl);

            if (!postResponse.ok) {
                throw new Error();
            }

            mainOp.replaceChildren();
            const data = await postResponse.json();

            Object.values(data).forEach(post => {
                const option = document.createElement('option');
                option.value = post.id;
                option.textContent = post.title;
                mainOp.appendChild(option);
            });
        } catch (e) {
            console.log(e.status);
        }
    }
}

attachEvents();