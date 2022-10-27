// DEFINES A HABIT

export class Habit {
  constructor({name, doneToday, streak, record, gap}) {
    this.id = Date.now()
    this.name = name;
    this.doneToday = doneToday || false;
    this.streak = streak || 0;
    this.record = record || 0;
    this.gap = gap || 0;
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

  //  window.localStorage.setItem(key, value). getItem(key), removeItem(key), clear()
}
