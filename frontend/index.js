document.addEventListener("DOMContentLoaded", () => {
    fetchItems("http://localhost:3000/items", renderItems);
    const newItemFormHeader = document.getElementById("new-item-form-header");
    newItemFormHeader.addEventListener("click", function() {
        renderNewItemForm()
    })
});



function fetchItems(targetUrl, callback) {
    fetch(targetUrl)
    .then(response => response.json())
    .then(json => callback(json))
}
//add catch error


//DO I NEED TO ADD AN ID FOR EACH ITEM?
function renderItems(jsonItems) {
    for(const item of jsonItems) {
        const lostItemContainer = document.getElementById("lost-item-container");
        const foundItemContainer = document.getElementById("found-item-container");
        let itemCard = document.createElement("div");
        itemCard.classList.add("item", "comments-hidden");
        itemCard.innerHTML = `
            <img src=${item.image_url} height="300" width="300">
            <h2>${item.item_name}</h2>
        `;
        if (item.lost_status === true) {
            let status = document.createElement("h3");
            status.innerHTML = "LOST!";
            itemCard.appendChild(status);
            lostItemContainer.appendChild(itemCard)
        } else if (item.found_status === true) {
            let status = document.createElement("h3");
            status.innerHTML = "FOUND!";
            itemCard.appendChild(status);
            foundItemContainer.appendChild(itemCard)
        }

        renderComments(itemCard, item.comments)
        itemCard.addEventListener("mouseenter", function() {
            const commentsContainer = itemCard.querySelector(".comments-container");
            commentsContainer.classList.remove("hidden");
            itemCard.classList.remove("comments-hidden")
            itemCard.classList.add("comments-showing")
        })
        itemCard.addEventListener("mouseleave", function() {
            const commentsContainer = itemCard.querySelector(".comments-container");
            commentsContainer.classList.add("hidden");
            itemCard.classList.remove("comments-showing")
            itemCard.classList.add("comments-hidden")
        })
    }
}


function renderComments(itemCard, commentsArray) {
    let commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container", "hidden");
    itemCard.appendChild(commentsContainer);
    for (comment of commentsArray) {
        const commenterAndDate = document.createElement("p");
        commenterAndDate.innerHTML = `${comment.commenters_name} <em>at ${readableDateTime(comment.created_at)}</em>`;
        const content = document.createElement("p");
        content.innerHTML = comment.content;
        commentsContainer.append(commenterAndDate, content);
    }
}

function readableDateTime(dateTime) {
    const dateTimeArray = dateTime.split("T");
    const formattedDate = dateTimeArray[0].split("-").reverse().join("/");
    const formattedTime = dateTimeArray[1].slice(0,5);
    const formattedDateTime = `${formattedTime} on ${formattedDate}`;
    return formattedDateTime;
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
        <input type="text" id="last-known-location" name="last-known-location"><br><br>
        <label for="last-seen-date">Date</label> 
        <input type="datetime-local" id="last-seen-date" name="last-seen-date">
        <br><br>
        <label for="posters-name">Reported by</label>
        <input type="text" id="posters-name" name="posters-name">
        <br><br>
        <input type="submit" id="item-form-submit" value="Post Report">
    `;
    formContainer.appendChild(itemForm);
    itemForm.addEventListener("submit", function(event) {
        handleNewItemFormSubmit(event);
        formContainer.removeChild(itemForm)   
    })
}

function handleNewItemFormSubmit(event) {
    event.preventDefault();
    const itemName = document.querySelector("#item-form #item-name").value;
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