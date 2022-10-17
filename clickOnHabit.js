// CLICKING ON A HABIT

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
