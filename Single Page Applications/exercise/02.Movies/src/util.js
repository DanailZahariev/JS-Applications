const views = [...document.querySelectorAll('.view-section')];

function hideAllSection() {
    views.forEach(s => s.style.display = 'none');
}

export function showView(section) {
    hideAllSection();
    section.style.display = 'block';
}