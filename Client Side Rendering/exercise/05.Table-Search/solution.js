import {render, html} from '/node_modules/lit-html/lit-html.js'

const url = 'http://localhost:3030/jsonstore/advanced/table';
const table = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

await loadData();

async function loadData() {
   const response = await fetch(url);
   const data = await response.json();

   let map = Object.values(data).map(s => createRow(s));
   render(map, table);
}

function createRow(s) {
   return html`
        <tr>
            <td>${s.firstName} ${s.lastName}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
        </tr>`;
}

function onClick(evt) {
   evt.preventDefault();
   const allRows = document.querySelectorAll('tr');
   const input = document.getElementById('searchField').value.toLowerCase();

   for (const row of allRows) {
      row.classList.remove('select');

      if (row.textContent.toLowerCase().includes(input) && input !== '') {
         row.classList.add('select');
      }
   }
   input.value = '';
}
