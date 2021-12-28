class Comment {

    constructor(commentObject) {
        this.id = commentObject.id;
        this.content = commentObject.content;
        this.commentersName = commentObject.commenters_name;
        this.itemId = commentObject.item_id;
        this.createdAt = commentObject.created_at;
    }

    get readableCreatedAt() {
        const time = this.createdAt.slice(11, 16);
        const date = this.createdAt.slice(0, 10);
        const formattedDate = date.split("-").reverse().join("/");
        const formattedDateTime = `${time} on ${formattedDate}`;
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