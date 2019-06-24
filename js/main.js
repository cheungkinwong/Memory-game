const memory = document.getElementById("memory");
const container = document.getElementById("cardContainer");
const card = document.getElementById("card");

container.addEventListener("click", () =>
  document.querySelector(".card").classList.toggle("flip")
);

// let random = () => Math.floor(Math.random() * 19);

// function deal() {
//   let newCard = document.createElement("div");
//   newCard.classList.add("card");
//   container.appendChild(newCard);
// }

// $("#button").onClick(() => $("#target_element").addClass("animate_class_name"));
