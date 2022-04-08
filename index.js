`use strict`;
window.onload = () => {
  loadBooks();
};
let outerBook = [];
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
      outerBook = books;
      renderBooks(books);
    })
    .catch((error) => console.log(error));
};
const filteredBooks = (e) => {
  query = e.target.value;
  const filtered = outerBook.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
  renderBooks(filtered);
};
const renderBooks = (booksArr) => {
  let row = document.querySelector(".row");
  row.innerHTML = ``;
  booksArr.forEach(({ img, title, asin }) => {
    let col = document.createElement("div");
    col.classList.add("col-4", "mb-2");
    const card = document.createElement(`div`);
    card.classList.add("card", "h-100", "px-2");
    const BookImg = document.createElement(`img`);
    BookImg.src = img;
    BookImg.classList.add("card-img-top", "w-100", "img-fluid");
    BookImg.style.height = "300px";
    BookImg.style.objectFit = "cover";
    card.appendChild(BookImg);
    const h5 = document.createElement(`h5`);
    h5.classList.add("card-title");
    h5.innerText = title;
    card.appendChild(h5);
    const p = document.createElement(`p`);
    p.classList.add("card-text");
    p.innerText = `Some quick example text to build on the card title and make up the
    bulk of the card's content.`;
    card.appendChild(p);
    const addBtn = document.createElement(`a`);
    addBtn.classList.add("btn", "btn-primary", "button");
    addBtn.innerText = `ADD TO CART`;
    card.appendChild(addBtn);
    const button = document.createElement(`button`);
    button.classList.add("btn", "btn-outline-dark");
    button.innerText = `SKIP`;
    card.appendChild(button);
    col.appendChild(card);

    row.appendChild(col);
    BookImg.onclick = () => {
      window.location.assign("./details.html?asin=" + asin);
    };
    button.onclick = (e) => {
      hideBook(e);
    };
    addBtn.onclick = (e) => {
      addSelected(e);
    };
  });
};

let addSelected = (e) => {
  e.preventDefault();
  document.querySelector(`.cart`).classList.remove(`d-none`);
  const card = e.target.closest(".card");
  card.classList.toggle("selected");

  let ulNode = document.querySelector("ul");
  let list = document.createElement("li");
  list.classList.add(
    "list-group-item",
    "justify-content-between",
    "d-flex",
    "align-items-center"
  );
  let title = card.querySelector(`.card-title`);
  list.innerHTML = title.textContent;
  list.innerHTML += `<button class="btn btn-outline-dark"
  onclick=removeFromCart(event)>
  delete
</button>`;
  ulNode.appendChild(list);
};

const removeFromCart = (e) => {
  const singleCart = e.target.closest(`li`);
  singleCart.remove();
};
const clearAll = () => {
  document.querySelector(`ul`).innerHTML = ``;
  document.querySelector(`.cart`).classList.add(`d-none`);
  document.querySelectorAll(`.card`).forEach((card) => {
    card.classList.remove(`selected`);
  });
};
const hideBook = (e) => {
  const card = e.target.closest(`.col-4`);
  card.remove();
};
