import {render} from "/node_modules/lit-html/lit-html.js";
import {editForm, saveForm, tableBody} from "./src/templates.js";

const root = document.querySelector("body");

render([tableBody, saveForm, editForm], root);