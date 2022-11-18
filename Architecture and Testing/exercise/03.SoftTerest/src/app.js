import {homePage} from "./pages/home.js";

const main = document.querySelector('main');

const registerPage = document.getElementById('register-page');
const loginPage = document.getElementById('login-page');
const detailsPage = document.getElementById('details-page');
const createPage = document.getElementById('create-page');
const catalogPage = document.getElementById('dashboard-holder');

const links = {
    '/': homePage,
    '/catalog': catalogPage,
    '/login': loginPage,
    '/register': registerPage,
    '/detail': detailsPage,
    '/create': createPage
};





