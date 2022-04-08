`use strict`;
window.onload = () => {
  loadBooks();
};
const loadBooks = () => {
  document.querySelector(
    ".row"
  ).innerHTML = `<div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((books) => {
      console.log(books);
      let row = document.querySelector(".row");
      row.innerHTML = ``;
      books.forEach((eachBook) => {
        let col = document.createElement("div");
        col.classList.add("col-4", "mb-2");
        col.innerHTML = `<div class="card h-100">
    <img src="${eachBook.img}" class="card-img-top w-100 img-fluid" alt="..." 
    style="height: 300px; object-fit: cover;"/>
    <div class="card-body">
    <h5 class="card-title">${eachBook.title}</h5>
    <p class="card-text">
    Some quick example text to build on the card title and make up the
    bulk of the card's content.
    </p>
    <a href="#" class="btn btn-primary button " onclick="addSelected(event)">ADD TO CART</a>
    </div>`;
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

let addSelected = (event) => {
  const card = event.target.closest(".card");
  card.classList.toggle("selected");

  let ulNode = document.querySelector("ul");
  let list = document.createElement("li");
  list.classList.add("list-group-item");
  let title = card.querySelector(`.card-title`);
  list.innerHTML = title.textContent;
  ulNode.appendChild(list);
};
