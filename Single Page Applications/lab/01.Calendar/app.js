const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
}

const years = document.getElementById('years');
const sections = document.querySelectorAll('section');
sections.forEach(s => s.style.display = 'none');
years.style.display = 'block';

years.addEventListener('click', e => {
    e.preventDefault();

    const year = e.target.querySelector('.date').textContent;
    const yearSection = document.getElementById(`year-${year}`);
    years.style.display = 'none';
    yearSection.style.display = 'block';


    yearSection.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.tagName === "CAPTION") {
            years.style.display = 'block';
            yearSection.style.display = 'none';
        } else {
            const monthYear = e.target.querySelector('.date').textContent;
            const month = months[monthYear];
            const monthSection = document.querySelector(`#month-${year}-${month}`);
            yearSection.style.display = 'none';
            monthSection.style.display = 'block';

            monthSection.addEventListener('click', e => {
                if (e.target.tagName === "CAPTION") {
                    monthSection.style.display = 'none';
                    yearSection.style.display = 'block';
                }
            });
        }
    });
});
