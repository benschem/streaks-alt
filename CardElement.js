export class CardElement {
  constructor(habit) {
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
    return div;
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
    if (habit.streak > habit.gap) {
      h3.innerHTML = `🔥 ${habit.streak.toString()}`;
    } else {
      h3.innerHTML = `🚫 ${habit.gap.toString()}`;
    }
    return h3;
  }
}
