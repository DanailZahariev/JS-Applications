export function notification(error) {
    document.querySelector('#errorBox span').textContent = error;
    document.getElementById('errorBox').style.display = 'block';

    setTimeout(() => (document.getElementById('errorBox').style.display = 'none'), 4000);
}