const views = [...document.querySelectorAll('.view-section')];

function hideAllSection() {
    views.forEach(s => s.style.display = 'none');
}

export function showView(section) {
    hideAllSection();
    section.style.display = 'block';
}

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const usernameContainer = document.getElementById('welcome-msg');
    if (user) {
        document.querySelectorAll('.user').forEach(u => u.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(u => u.style.display = 'none');
        usernameContainer.textContent = `Welcome, ${user.email}`
    } else {
        document.querySelectorAll('.user').forEach(u => u.style.display = 'none');
        document.querySelectorAll('.guest').forEach(u => u.style.display = 'inline-block');
    }
}