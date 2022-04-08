`use strict`;

const loadBooks = () => {
  const id = new URLSearchParams(window.location.search).get("asin");
  fetch("https://striveschool-api.herokuapp.com/books/" + id)
    .then((response) => response.json())
    .then((books) => {
      console.log(books);
      const container = document.querySelector(".container");
      const h1 = document.querySelector(`h1`);
      h1.innerText = `${books.title}`;
      const img = document.createElement("img");
      img.src = books.img;
      img.classList.add("img-fluid", "w-50");
      const p = document.createElement(`p`);
      p.innerText = `price: ${books.price}`;
      container.appendChild(img);
      container.appendChild(p);
    })
    .catch((error) => console.log(error));
};
window.onload = loadBooks;
