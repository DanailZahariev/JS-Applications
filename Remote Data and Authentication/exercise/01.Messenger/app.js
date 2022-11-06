function attachEvents() {

    const url = 'http://localhost:3030/jsonstore/messenger';
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const messagesTextArea = document.getElementById('messages');

    submitBtn.addEventListener('click', sendMessage);
    refreshBtn.addEventListener('click', refreshContent);

    async function refreshContent() {
        messagesTextArea.textContent = '';

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();

            let allMsg = ''

            Object.values(data).forEach(m => {
                allMsg += `${m.author}: ${m.content}\n`;
            });
            messagesTextArea.textContent = allMsg.trim();
        } catch (e) {
            console.error(e.message);
        }
    }

    async function sendMessage() {

        const author = document.querySelector('input[name="author"]');
        const content = document.querySelector('input[name="content"]');

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {"Content-Type": "application-json"},
                body: JSON.stringify({author: author.value, content: content.value})
            });

            if (!response.ok) {
                throw new Error();
            }

            author.value = '';
            content.value = '';

        } catch (e) {
            console.error(e.message)
        }
    }
}

attachEvents();