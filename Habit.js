export class Habit {
  constructor(name) {
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
}
