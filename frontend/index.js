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

function renderItems(jsonItems) {
    const lostItemContainer = document.getElementById("lost-item-container");
    const foundItemContainer = document.getElementById("found-item-container");
    
    for (const item of jsonItems) {
        const newItem = new Item(item);
        const newItemCard = newItem.createItemCard();

        if (newItem.status === "LOST!") {
            lostItemContainer.appendChild(newItemCard)
        } else if (newItem.status === "FOUND!") {
            foundItemContainer.appendChild(newItemCard)
        }

        renderComments(newItem.comments);
    }
}

function renderComments(jsonComments) {
    for (const comment of jsonComments) {
        const newComment = new Comment(comment);
        const newCommentCard = newComment.createCommentCard();
        const targetContainer = document.querySelector(`#item-${newComment.itemId}-comments`);
        const lastElement = targetContainer.lastChild;
        targetContainer.insertBefore(newCommentCard, lastElement);
    }
}


//dealing with forms

function postFormData(targetUrl, formData, callback) {
	fetch(targetUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
            		"Accept": "application/json"
		},
		body: JSON.stringify(formData)
	})
	.then(response => response.json())
	.then(json => callback(json))
}


function renderNewItemForm() {
    const formContainer = document.getElementById("new-item-form-container");
    const itemForm = document.createElement("form");
    itemForm.id = "item-form";
    itemForm.innerHTML = `
        <label for="item-name">Item:</label>
        <input type="text" id="item-name" name="item-name" placeholder="*required" required><br><br>
        <label for="image-url">Picture:</label> 
        <input type="text" id="image-url" name="image-url" placeholder="*required - URL for picture" required><br><br>
        <label for="description">Description:</label>
        <textarea id="description" name="description" rows="4" cols="50" placeholder="*required" required></textarea><br><br>
        <label for="status">Have you lost or found this item?</label>
        <input type="radio" id="lost" name="status">
        <label for="lost">Lost</label>
        <input type="radio" id="found" name="status">
        <label for="found">Found</label>
        <br><br>
        <label for="last-known-location">Last known location:</label> 
        <input type="text" id="last-known-location" name="last-known-location" placeholder="*required" required><br><br>
        <label for="last-seen-date">Date:</label> 
        <input type="datetime-local" id="last-seen-date" name="last-seen-date" required>
        <br><br>
        <label for="posters-name">Reported by:</label>
        <input type="text" id="posters-name" name="posters-name" placeholder="*required" required>
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
    const formData = {item_name: itemName, description: description, image_url: imageUrl, lost_status: lostStatus, found_status: foundStatus, last_known_location: lastKnownLocation, last_seen_date: lastSeenDate, posters_name: postersName};
    postFormData("http://localhost:3000/items", formData, renderItems)
}

function renderNewCommentForm(itemId) {
    const targetContainer = document.querySelector(`#item-${itemId}-comments`);
    const commentForm = document.createElement("form");
    commentForm.id = "comment-form";
    commentForm.innerHTML = `
        <label for="commenters-name">Name:</label>
        <input type="text" id="commenters-name" name="commenters-name" placeholder="*required" required><br><br>
        <label for="content" id="content-label">Comment:</label>
        <textarea id="content" name="content" rows="5" cols="22" placeholder="*required" required></textarea>
        <input type="hidden" id="item-id" name="item-id" value="${itemId}"><br>
        <input type="submit" id="comment-form-submit" value="Post comment">
    `;
    targetContainer.appendChild(commentForm);

    commentForm.addEventListener("submit", function(event){
        handleNewCommentFormSubmit(event);
        targetContainer.removeChild(commentForm)
    })
}

function handleNewCommentFormSubmit(event) {
    event.preventDefault();
    const commentersName = document.querySelector("#comment-form #commenters-name").value;
    const content = document.querySelector("#comment-form #content").value;
    const itemId = document.querySelector("#comment-form #item-id").value;
    const formData = {commenters_name: commentersName, content: content, item_id: itemId};
    postFormData("http://localhost:3000/comments", formData, renderComments)
}