class Item {

    constructor(itemObject) {
        this.id = itemObject.id;
        this.itemName = itemObject.item_name;
        this.description = itemObject.description;
        this.imageUrl = itemObject.image_url;
        this.lastKnownLocation = itemObject.last_known_location;
        this.lastSeenDate = itemObject.last_seen_date;
        this.lost_status = itemObject.lost_status;
        this.found_status = itemObject.found_status;
        this.postersName = itemObject.posters_name;
        this.comments = itemObject.comments;
    }

    get status() {
        if (this.lost_status === true) {
            return "LOST!"
        } else if (this.found_status === true) {
            return "FOUND!"
        }
    }

    get readableLastSeenDate() {
        const dateTimeArray = this.lastSeenDate.split("T");
        const formattedDate = dateTimeArray[0].split("-").reverse().join("/");
        const formattedTime = dateTimeArray[1].slice(0,5);
        const formattedDateTime = `${formattedTime} on ${formattedDate}`;
        return formattedDateTime
    }

    createItemCard() {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        itemCard.id = `item-${this.id}-card`;

        itemCard.innerHTML = `
            <img src=${this.imageUrl} height="300" width="300">
            <h2>${this.itemName}</h2>
            <h3>${this.status}</h3>       
        `;
        
        const itemShowContainer = document.createElement("div");
        itemShowContainer.classList.add("item-show-container", "hidden");
        itemShowContainer.innerHTML = `
            <p id="item-desc" >${this.description}</p>
            <p id="item-report-dets" >Last seen at ${this.readableLastSeenDate} by ${this.postersName} - ${this.lastKnownLocation}</p>
        `;        
        itemCard.appendChild(itemShowContainer);

        itemCard.addEventListener("mouseenter", function() {
            itemShowContainer.classList.remove("hidden");
            itemCard.classList.add("selected")
        })

        itemCard.addEventListener("mouseleave", function() {            
            itemShowContainer.classList.add("hidden");
            itemCard.classList.remove("selected")
        });

        //adding a container for comments to be rendered in
        const itemCommentsContainer = document.createElement("div");
        itemCommentsContainer.id = `item-${this.id}-comments`;
        itemCommentsContainer.classList.add("item-comments-container");
        itemCommentsContainer.innerHTML = "<h4>Comments</h4>";
        itemShowContainer.appendChild(itemCommentsContainer);

        //adding a new comment form
        const newCommentFormContainer = document.createElement("div");
        newCommentFormContainer.classList = "new-comment-form-container";
        itemCommentsContainer.appendChild(newCommentFormContainer);

        const newCommentFormHeader = document.createElement("h4");
        newCommentFormHeader.innerHTML = "Click to add a new comment";
        newCommentFormContainer.appendChild(newCommentFormHeader);

        newCommentFormHeader.addEventListener("click", function() {
            if (document.getElementById("comment-form") === null) {
                renderNewCommentForm(this.id)
            } else {
                document.getElementById("comment-form").remove()
            }
        }.bind(this));

        return itemCard;
    }
 
};