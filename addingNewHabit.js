// ADDING A NEW HABIT

import { Habit } from "./Habit.js";
import { CardElement } from "./CardElement.js";

const theAddCard = document.getElementById('add');
const addForm = document.getElementById('add-form');
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addHabitCard();
});

function addHabitCard() {
  const habitName = getName();
  const habit = new Habit(habitName);
  let newCard = new CardElement(habit);
  newCard = newCard.background.outerHTML;
  theAddCard.insertAdjacentHTML("beforebegin", newCard);
  newCard = document.querySelector('.new');
};

function getName() {
  let name = document.getElementById('newHabitName').value;
  name = name.trim().toString();
  return name;
};
