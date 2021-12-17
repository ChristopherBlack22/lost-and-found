document.addEventListener("DOMContentLoaded", () => {
    getItems()
});

function getItems() {
    fetch("http://localhost:3000/items")
    .then(response => response.json())
    .then(jsonItems => createItems(jsonItems))
}

function createItems(jsonItems) {
    const itemContainer = document.querySelector("#item-container");
    for(const item of jsonItems) {
        let name = document.createElement("h2");
        name.innerHTML = item.name;
        let image = document.createElement("img");
        image.src = item.image_url;
        let itemCard = document.createElement("div");
        itemCard.appendChild(name);
        itemCard.appendChild(image);
        itemContainer.appendChild(itemCard)
    }
}

