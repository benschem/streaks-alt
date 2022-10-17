// CLASSES

class Habit {
  constructor(name){
    this.name = name;
    this.doneToday = false;
    this.streak = 0;
    this.recordStreak = 0;
    this.gap = 0;
  }

  increase(item) {
    item++;
  }

  decrease(item) {
    item--;
  }

  reset(item) {
    item = 0;
  }
};

class Card {
  constructor(habit){
    this.background = this.background();
    this.record = this.streakRecord(habit.recordStreak);
    this.title = this.nameAsTitle(habit.name);
    this.currentStreak = this.currentStreak(habit);
    this.background.appendChild(this.record);
    this.background.appendChild(this.title);
    this.background.appendChild(this.currentStreak);
  }

  background() {
    let div = document.createElement('div');
    div.className = 'card';
    return div
  }

  streakRecord(recordStreak) {
    let h3 = document.createElement('h3');
    h3.innerHTML = `🏆 ${recordStreak.toString()}`;
    return h3;
  }

  nameAsTitle(name) {
    let h2 = document.createElement('h2');
    h2.innerHTML = `${name}`;
    return h2;
  }

  currentStreak(habit) {
    let h3 = document.createElement('h3');
    if(habit.streak > habit.gap) {
      h3.innerHTML = `🔥 ${habit.streak.toString()}`;
    } else {
      h3.innerHTML = `🚫 ${habit.gap.toString()}`;
    }
    return h3;
  }
}

// ADDING A NEW HABIT

const theAddCard = document.getElementById('add');
const addForm = document.getElementById('add-form');
addForm.addEventListener('submit', (event) => {
  event.preventDefault()
  addHabitCard();
});

function addHabitCard() {
  const habitName = getName();
  const habit = new Habit(habitName);
  let newCard = new Card(habit);
  newCard = newCard.background.outerHTML;
  theAddCard.insertAdjacentHTML("beforebegin", newCard);
  newCard = document.querySelector('.new');
}

function getName() {
  let name = document.getElementById('newHabitName').value;
  name = name.trim().toString();
  return name;
}

// CLICKING ON A HABIT

const allHabitCards = document.querySelectorAll('.card');
allHabitCards.forEach(card => {
  if (!isTheAddCard(card)) {
    markDoneOnClick(card);
  }
});

function markDoneOnClick(card) {
  card.addEventListener('click', () => {
    if(!isDone(card)) {
      markDone(card);
    } else {
      markNotDone(card);
    }
  })
};

function isDone(card) {
  if (card.classList.contains('done')) {
    return true;
  } else {
    return false;
  };
}

function isTheAddCard(card) {
  if (card.id === 'add') {
    return true;
  } else {
    return false;
  }
}

function markDone(card) {
  card.classList.add('done');
  increase(card.habit.streak);
  decrease(card.habit.gap);
  if(card.habit.streak > card.habit.recordStreak) {
    increase(card.habit.recordStreak);
  }
}

function markNotDone(card) {
  card.classList.remove('done');
  decrease(card.habit.streak);
  decrease(card.habit.gap);
  if(card.habit.streak < card.habit.recordStreak) {
    decrease(card.habit.recordStreak);
  }
}

// UPDATE WHEN A DAY PASSES

// if(a_day_passes) {
//   Habits.forEach(habit => {
//     if(habit.doneToday) {
//       reset(habit.gap);
//       if (habit.streak > habit.recordStreak) {
//         increase(habit.recordStreak);
//       }
//     } else {
//       reset(habit.streak);
//       increase(habit.gap);
//     }
//   })
// }
