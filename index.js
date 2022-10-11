let userInput = "";

let habits = [
  {
    habitName: this.habitName,
    streak: this.streak,
    streakRecord: this.streakRecord,
    failStreak: this.failStreak,
    failRecord: this.failRecord,
    totalDaysDone: this.totalDaysDone,
    totalDaysNotDone: this.totalDaysNotDone,
    donePercentage: this.donePercentage,
  },
];

function refreshHabitList() {
  document.getElementById("habitName").innerHTML = habits[1].habitName;
  document.getElementById("streakText").innerHTML = habits[1].streak + "🔥";
  document.getElementById("streakRecordText").innerHTML =
    habits[1].streakRecord + "🏆";
  document.getElementById("failStreakText").innerHTML =
    habits[1].failStreak + "🚫";
  document.getElementById("failRecordText").innerHTML =
    habits[1].failRecord + "🏆";
  document.getElementById("doneButton").innerHTML = "✅";
  document.getElementById("notDoneButton").innerHTML = "🚫";
  document.getElementById("donePercentageText").innerHTML =
    "Avg Consistency: " + habits[1].donePercentage + "%";
}

function submitNewHabit() {
  userInput = document.getElementById("textForm").value;
  userinput = userInput.trim;
  let habit = {
    habitName: userInput,
    streak: 0,
    streakRecord: 0,
    failStreak: 0,
    failRecord: 0,
    totalDaysDone: 0,
    totalDaysNotDone: 0,
    donePercentage: 0,
  };
  habits.push(habit);
  refreshHabitList();
}

function increaseStreak() {
  habits[1].streak = habits[1].streak + 1;
}

function increaseFailStreak() {
  habits[1].failStreak = habits[1].failStreak + 1;
}

function resetStreak() {
  habits[1].streak = 0;
}

function resetFailStreak() {
  habits[1].failStreak = 0;
}

function updateStreak(doneToday) {
  if (doneToday) {
    increaseStreak();
    resetFailStreak();
  } else {
    increaseFailStreak();
    resetStreak();
  }
}

function increaseStreakRecord() {
  if (habits[1].streak > habits[1].streakRecord) {
    habits[1].streakRecord = habits[1].streakRecord + 1;
  }
}

function increaseFailStreakRecord() {
  if (habits[1].failStreak > habits[1].failRecord) {
    habits[1].failRecord = habits[1].failRecord + 1;
  }
}

function updateRecord(doneToday) {
  if (doneToday) {
    increaseStreakRecord();
  } else {
    increaseFailStreakRecord();
  }
}

function average(totalDaysDone, totalDaysNotDone) {
  return (totalDaysDone / (totalDaysDone + totalDaysNotDone)) * 100;
}

function updateDonePercentage(doneToday) {
  if (doneToday) {
    habits[1].totalDaysDone = habits[1].totalDaysDone + 1;
  } else {
    habits[1].totalDaysNotDone = habits[1].totalDaysNotDone + 1;
  }
  habits[1].donePercentage = average(
    habits[1].totalDaysDone,
    habits[1].totalDaysNotDone
  );
}

function habitDone(doneToday) {
  if (doneToday) {
    updateStreak(true);
    updateRecord(true);
    updateDonePercentage(true);
    refreshHabitList();
  } else {
    updateStreak(false);
    updateRecord(false);
    updateDonePercentage(false);
    refreshHabitList();
  }
}

// How to keep track of days???
