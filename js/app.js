//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
//const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;

url = 'https://5f11228a65dd950016fbd036.mockapi.io/items';

// load
