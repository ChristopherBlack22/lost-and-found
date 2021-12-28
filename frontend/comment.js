class Comment {

    constructor(commentObject) {
        this.id = commentObject.id;
        this.content = commentObject.content;
        this.commentersName = commentObject.commenters_name;
        this.itemId = commentObject.item_id;
        this.createdAt = commentObject.created_at;
    }

    get readableCreatedAt() {
        const dateTimeArray = this.createdAt.split("T");
        const formattedDate = dateTimeArray[0].split("-").reverse().join("/");
        const formattedTime = dateTimeArray[1].slice(0,5);
        const formattedDateTime = `${formattedTime} on ${formattedDate}`;
        return formattedDateTime
    }

    createCommentCard() {
        const commentCard = document.createElement("div");
        commentCard.classList.add("comment-card");

        const commenterAndDate = document.createElement("p");
        commenterAndDate.classList.add("comment-title");
        commenterAndDate.innerHTML = `${this.commentersName} <em>at ${this.readableCreatedAt}</em>`;
        const content = document.createElement("p");
        content.classList.add("comment-content");
        content.innerHTML = this.content;
        commentCard.append(commenterAndDate, content);

        return commentCard;
    }
}