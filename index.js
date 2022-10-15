// CLASSES

class Habit {
  constructor(name){
    this.name = name;
    this.doneToday = false;
    this.streak = 0;
    this.longestStreak = 0;
    this.gap = 0;
    this.longestGap = 0;
  }

  update() {
    if(this.doneToday) {
      increase(this.streak);
      reset(this.gap);
      updateLongest(this.streak, this.longestStreak);
    } else {
      increase(this.gap);
      reset(this.streak);
      updateLongest(this.gap, this.longestGap);
    }
  }

  increase(item) {
    item++;
  }

  reset(item) {
    item = 0;
  }

  updateLongest(current, longest) {
    if(current > longest) {
      longest = current;
    }
  }
};

class Card {
  constructor(habit){
    this.background = this.background();
    this.record = this.streakRecord(habit.longestStreak);
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

  streakRecord(longestStreak) {
    let h3 = document.createElement('h3');
    h3.innerHTML = `🏆 ${longestStreak.toString()}`;
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
console.log(addForm);
addForm.addEventListener('submit', (event) => {
  event.preventDefault()
  addHabitCard();
});

function addHabitCard() {
  const habitName = getName();
  const habit = new Habit(habitName);
  console.log(habit);
  let newCard = new Card(habit);
  newCard = newCard.background.outerHTML;
  console.log(newCard);
  theAddCard.insertAdjacentHTML("beforebegin", newCard);
  listenForClicks();
}

function getName() {
  let name = document.getElementById('newHabitName').value;
  name = name.trim().toString();
  return name;
}

// CLICKING ON A HABIT



function listenForClicks() {
  const allHabitCards = document.querySelectorAll('.card');
  allHabitCards.forEach(card => {
    listenForClick(card);
  });

  function listenForClick(card) {
    if (!isTheAddCard(card)) {
      card.addEventListener('click', () => {
        if(!isDone(card)) {
          markDone(card);
        } else {
          markNotDone(card);
        }
      })
    };
  }
}

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
}

function markNotDone(card) {
  card.classList.remove('done');
}

// A DAY PASSES

// if (a day passes) {
//   Cards.forEach(card => {
//     if (card.id = 'done') {
//       card.habit.doneToday = true;
//     }
//     else {
//       card.habit.doneToday = true;
//     }
//     card.habit.update();
//   })
// }
