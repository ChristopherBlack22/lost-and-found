document.addEventListener("DOMContentLoaded", () => {
    getItems();
    const formTitle = document.getElementById("form-title");
    formTitle.addEventListener("click", function() {
        renderNewItemForm()
    })
});


function getItems() {
    fetch("http://localhost:3000/items")
    .then(response => response.json())
    .then(jsonItems => renderItems(jsonItems))
}

function renderItems(jsonItems) {
    const itemContainer = document.getElementById("item-container");
    for(const item of jsonItems) {
        let itemCard = document.createElement("div");
        itemCard.className = "item";
        itemCard.innerHTML = `
            <img src=${item.image_url} height="200" width="200">
            <h2>${item.name}<h2>
        `;
        if (item.lost_status === true) {
            let status = document.createElement("h3");
            status.innerHTML = "LOST!";
            itemCard.appendChild(status)
        } else if (item.found_status === true) {
            let status = document.createElement("h3");
            status.innerHTML = "FOUND!";
            itemCard.appendChild(status)
        }
        itemContainer.appendChild(itemCard)
    }
}



function renderNewItemForm() {
    let formContainer = document.getElementById("new-item-form-container");
    let itemForm = document.createElement("form");
    itemForm.id = "item-form";
    itemForm.innerHTML = `
        <label for="item-name">Item</label>
        <input type="text" id="item-name" name="item-name"><br><br>
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="4" cols="50"></textarea><br><br>
        <label for="image-url">Picture</label> 
        <input type="text" id="image-url" name="image-url">
        <p>Have you lost or found this item?</p>
        <input type="radio" id="lost" name="status">
        <label for="lost">Lost</label>
        <input type="radio" id="found" name="status">
        <label for="found">Found</label>
        <br><br>
        <label for="last-known-location">Last known location</label> 
        <input type="text" id="last-location" name="last-location"><br><br>
        <label for="last-seen-date">Date</label> 
        <input type="datetime-local" id="last-date" name="last-date">
        <br><br>
        <label for="posters-name">Reported by</label>
        <input type="text" id="posters-name" name="posters-name">
        <br><br>
        <input type="submit" id="item-form-submit" value="Post Report">
    `;
    formContainer.appendChild(itemForm);
    itemForm.addEventListener("submit", function(event) {
        handleItemFormSubmit(event)     
    })
}

function handleItemFormSubmit(event) {
    event.preventDefault();
    const name = document.querySelector("#item-form #item-name").value;
    const description = document.querySelector("#item-form #description").value;
    const imageUrl = document.querySelector("#item-form #image-url").value;
    const lostStatus = document.querySelector("#item-form #lost").checked;
    const foundStatus = document.querySelector("#item-form #found").checked;
    const lastKnownLocation = document.querySelector("#item-form #last-known-location").value;
    const lastSeenDate = document.querySelector("#item-form #last-seen-date").value;
    const postersName = document.querySelector("#item-form #posters-name").value;
    const formData = {item_name: itemName, description: description, image_url: imageUrl, lost_status: lostStatus, found_status: foundStatus, last_know_location: lastKnownLocation, last_seen_date: lastSeenDate, posters_name: postersName};
    postNewItem(formData);    
}

function postNewItem(formData) {
    fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(jsonItems => renderItems(jsonItems))
}