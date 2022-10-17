// USER CLICKS ON A HABIT TO MARK IT DONE FOR THAT DAY

import { Habit } from "./Habit.js";
import { CardElement } from "./CardElement.js";

const allHabitCards = document.querySelectorAll('.card');

allHabitCards.forEach(card => {
  if (!isTheAddCard(card)) {
    markDoneOnClick(card);
  }
});

function isTheAddCard(card) {
  if (card.id === 'add') {
    return true;
  } else {
    return false;
  }
};

function markDoneOnClick(card) {
  card.addEventListener('click', () => {
    console.log("card clicked");
    if (!isDone(card)) {
      markDone(card);
    } else {
      markNotDone(card);
    }
  });
};

function isDone(card) {
  if (card.classList.contains('done')) {
      return true;
  } else {
      return false;
  };
};

function markDone(card) {
  card.classList.add('done');
  // UNCOMMENT THESE WHEN:
  // Card DOM Element is linked to a Habit instance
  // increase(card.habit.streak);
  // decrease(card.habit.gap);
  // if (card.habit.streak > card.habit.recordStreak) {
    // increase(card.habit.recordStreak);
  // }
};

function markNotDone(card) {
  card.classList.remove('done');
  // UNCOMMENT THESE WHEN:
  // Card DOM Element is linked to a Habit instance
  // TODO: Link DOM Element to a Habit instance
  // decrease(card.habit.streak);
  // decrease(card.habit.gap);
  // if (card.habit.streak < card.habit.recordStreak) {
    // decrease(card.habit.recordStreak);
  // }
};

// USER TYPES A NAME AND CLICKS SUBMIT ON THE 'ADD' CARD TO ADD A NEW HABIT

const form = document.getElementById('add-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewHabit();
});

const theAddCard = document.getElementById('add');

function addNewHabit() {
  let newHabit = createHabit();
  let newCard = createCardElement(newHabit);
  theAddCard.insertAdjacentElement("beforebegin", newCard);
};

function createHabit() {
  const habitName = getName();
  const habit = new Habit(habitName);
  return habit;
};

function createCardElement(habit) {
  let newCard = new CardElement(habit);
  newCard = newCard.returnDOMnode();
  markDoneOnClick(newCard);
  return newCard;
};

function getName() {
  let name = document.getElementById('newHabitName').value;
  name = name.trim().toString();
  return name;
};
