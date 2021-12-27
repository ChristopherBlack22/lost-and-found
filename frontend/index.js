document.addEventListener("DOMContentLoaded", () => {
    fetchItems("http://localhost:3000/items", renderItems);
    const newItemFormHeader = document.getElementById("new-item-form-header");
    newItemFormHeader.addEventListener("click", function() {
        if (document.getElementById("item-form") === null) {
            renderNewItemForm()
        } else {
            document.getElementById("item-form").remove()
        }
    })
});


function fetchItems(targetUrl, callback) {
    fetch(targetUrl)
    .then(response => response.json())
    .then(json => callback(json))
}
//add catch error


function renderItems(jsonItems) {
    for(const item of jsonItems) {
        const lostItemContainer = document.getElementById("lost-item-container");
        const foundItemContainer = document.getElementById("found-item-container");

        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        itemCard.innerHTML = `
            <img src=${item.image_url} height="300" width="300">
            <h2>${item.item_name}</h2>          
        `;

        if (item.lost_status === true) {
            const status = document.createElement("h3");
            status.innerHTML = "LOST!";
            itemCard.appendChild(status);
            lostItemContainer.appendChild(itemCard)
        } else if (item.found_status === true) {
            const status = document.createElement("h3");
            status.innerHTML = "FOUND!";
            itemCard.appendChild(status);
            foundItemContainer.appendChild(itemCard)
        }

        const itemShowContainer = document.createElement("div");
        itemShowContainer.classList.add("item-show-container", "hidden");
        itemShowContainer.innerHTML = `
            <p id="item-desc" >${item.description}</p>
            <p id="item-report-dets" >Last seen at ${readableDateTime(item.last_seen_date)} by ${item.posters_name} - ${item.last_known_location}</p>
        `;        
        itemCard.appendChild(itemShowContainer);

        const itemCommentsContainer = document.createElement("div");
        itemCommentsContainer.classList.add("item-comments-container");
        itemShowContainer.appendChild(itemCommentsContainer);
        renderComments(itemCommentsContainer, item.comments)

        itemCard.addEventListener("mouseenter", function() {
            itemShowContainer.classList.remove("hidden");
            itemCard.classList.add("selected")
        })

        itemCard.addEventListener("mouseleave", function() {            
            itemShowContainer.classList.add("hidden");
            itemCard.classList.remove("selected")
        })
    }
}


function renderComments(itemCommentsContainer, commentsArray) {
    itemCommentsContainer.innerHTML = "<h4>Comments</h4>";
    for (comment of commentsArray) {
        const commenterAndDate = document.createElement("p");
        commenterAndDate.innerHTML = `${comment.commenters_name} <em>at ${readableDateTime(comment.created_at)}</em>`;
        const content = document.createElement("p");
        content.innerHTML = comment.content;
        itemCommentsContainer.append(commenterAndDate, content);
    }
    const newCommentFormContainer = document.createElement("div");
    newCommentFormContainer.id = "new-comment-form-container";
    itemCommentsContainer.appendChild(newCommentFormContainer);
    const newCommentFormHeader = document.createElement("h4");
    newCommentFormHeader.innerHTML = "Click to add a comment";
    newCommentFormContainer.appendChild(newCommentFormHeader);
    newCommentFormHeader.addEventListener("click", function() {
        if (document.getElementById("comment-form") === null) {
        const itemId = commentsArray[0].item_id;
        renderNewCommentForm(newCommentFormContainer, itemId)
        } else {
            document.getElementById("comment-form").remove()
        }
    })
}



function readableDateTime(dateTime) {
    const dateTimeArray = dateTime.split("T");
    const formattedDate = dateTimeArray[0].split("-").reverse().join("/");
    const formattedTime = dateTimeArray[1].slice(0,5);
    const formattedDateTime = `${formattedTime} on ${formattedDate}`;
    return formattedDateTime;
}


function renderNewItemForm() {
    const formContainer = document.getElementById("new-item-form-container");
    const itemForm = document.createElement("form");
    itemForm.id = "item-form";
    itemForm.innerHTML = `
        <label for="item-name">Item:</label>
        <input type="text" id="item-name" name="item-name" ><br><br>
        <label for="image-url">Picture:</label> 
        <input type="text" id="image-url" name="image-url" placeholder="URL for picture"><br><br>
        <label for="description">Description:</label>
        <textarea id="description" name="description" rows="4" cols="50" placeholder="Please provide more details about the item here"></textarea><br><br>
        <label for="status">Have you lost or found this item?</label>
        <input type="radio" id="lost" name="status">
        <label for="lost">Lost</label>
        <input type="radio" id="found" name="status">
        <label for="found">Found</label>
        <br><br>
        <label for="last-known-location">Last known location:</label> 
        <input type="text" id="last-known-location" name="last-known-location" ><br><br>
        <label for="last-seen-date">Date:</label> 
        <input type="datetime-local" id="last-seen-date" name="last-seen-date">
        <br><br>
        <label for="posters-name">Reported by:</label>
        <input type="text" id="posters-name" name="posters-name" placeholder="Your name please">
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

function renderNewCommentForm(newCommentFormContainer, itemId) {
    const commentForm = document.createElement("form");
    commentForm.id = "comment-form";
    commentForm.innerHTML = `
        <label for="commenters-name">Your name</label>
        <input type="text" id="commenters-name" name="commenters-name">
        <input type="text" id="content" name="content">
        <input type="hidden" id="item-id" name="item-id" value="${itemId}">
        <input type="submit" id="comment-form-submit" value="Post comment">
    `;
    newCommentFormContainer.appendChild(commentForm);
    commentForm.addEventListener("submit", function(event){
        handleNewCommentFormSubmit(event)
    })
}

function handleNewCommentFormSubmit(event) {
    event.preventDefault();
    const commentersName = document.querySelector("#comment-form #commenters-name").value;
    const content = document.querySelector("#comment-form #content").value;
    const itemId = document.querySelector("#comment-form #item-id").value;
    const formData = {commenters_name: commentersName, content: content, item_id: itemId};
    postNewComment(formData);    
}

function postNewComment(formData) {
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    //.then(jsonItems => renderComments(jsonItems))
}

//for this to work
//1 - renderComments usually takes in the itemShow Container to which it will populate with comments, how to get round this?
//2 - jsonItems needs to become jsonComments and the serialised data from the API needs to match that which comes from the Item fetch
//3 - backend routes and actions and serialiser need completing
//4 - remderComments need refactoring as it creates a whole comments container first (create the hook elements first and then call function to populate it)
// "comments": [
//     {
//       "id": 1,
//       "commenters_name": "Mouse",
//       "content": "They look like my boots but I'm not sure they're missing. I'll check.",
//       "item_id": 1,
//       "created_at": "2021-12-20T23:49:12.400Z"
//     },