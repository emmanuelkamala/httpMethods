//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
//const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;

const url = 'https://5f11228a65dd950016fbd036.mockapi.io/items';

httpForm.addEventListener('submit', submitItems)

//submit items

function submitItems(e){
    e.preventDefault()
    const itemValue = itemInput.value;
    const imageValue = imageInput.value;

    if (itemValue === '' || imageValue === ''){
        showFeedback('Name or image can not be empty');
    } else {
        postItemAPI(itemValue, imageValue);
        itemInput.value = '';
        imageInput.value = '';
    }
}

// load

document.addEventListener('DOMContentLoaded', function(){
    getItemsAPI(showItems);
})


//feedback

function showFeedback(text){
  feedback.classList.add('showItem');
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(()=>{
      feedback.classList.remove('showItem')
  }, 4000)
}

// get items from API

function getItemsAPI(cb){
    const url = 'https://5f11228a65dd950016fbd036.mockapi.io/items';

    const ajax = new XMLHttpRequest();

    ajax.open('GET', url, true);

    ajax.onload = function(){
        if (this.status === 200){
            cb(this.responseText)
        } else {
            console.log('something went wrong');
        }
    }

    ajax.onerror = function(){
        console.log('there was an error');
    }

    ajax.send()
}

// Show items from API

function showItems(data){
    const items = JSON.parse(data);
    
    let info = '';

    items.forEach(item => {
        info += `<li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
                <img src="${item.avatar}" id='itemImage' class='itemImage img-thumbnail' alt="">
                <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
                <div class="icons">
        
                <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
                <i class="fa fa-edit"></i>
                </a>
                <a href='#' class="itemIcon mx-2 delete-icon" data-id='${item.id}'>
                <i class="fa fa-trash"></i>
                </a>
                </div>
        </li>`
    })
     
    itemList.innerHTML = info;
    
}

// Post items

function postItemAPI(img, itemName){
    const avatar = `img/${img}.jpeg`;
    const name = itemName;
    const url = 'https://5f11228a65dd950016fbd036.mockapi.io/items';

    const ajax = new XMLHttpRequest();

    ajax.open('POST', url, true);

    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    ajax.onload = function(){
       getItemsAPI(showItems);
    }

    ajax.onerror = function(){
        console.log('there was an error');
    }

    ajax.send(`avatar=${avatar}&name=${name}`);
}
