// DEFINES THE 'CARD' THAT THE HABIT APPEARS ON

export class CardElement {
  constructor(habit) {
    this.divCard = this.cardAsElement();
    this.h3record = this.recordAsElement(habit.record);
    this.h2name = this.nameAsElement(habit.name);
    this.h3streak = this.streakAsElement(habit.streak, habit.gap);
    this.id = habit.id;
  };

  returnDOMnode() {
    // Object.assign(document.createElement('div'), {
    //   className: 'card',
    //   id: this.id,
    //   innerHTML: ''
    // })
    let el = document.createElement('div');
    el.setAttribute("class", "card");
    el.setAttribute("id", this.id)

    // let DOMnode  = this.divCard;
    el.appendChild(this.h3record);
    el.appendChild(this.h2name);
    el.appendChild(this.h3streak);
    return el;
  }

  cardAsElement() {
    let div = document.createElement('div');
    div.className = 'card';
    return div;
  };

  recordAsElement(record) {
    let h3 = document.createElement('h3');
    h3.innerHTML = `🏆 ${record.toString()}`;
    return h3;
  };

  nameAsElement(name) {
    let h2 = document.createElement('h2');
    h2.innerHTML = `${name}`;
    return h2;
  };

  streakAsElement(streak, gap) {
    let h3 = document.createElement('h3');
    if (streak > gap) {
      h3.innerHTML = `🔥 ${streak.toString()}`;
    } else {
      h3.innerHTML = `🚫 ${gap.toString()}`;
    }
    return h3;
  };
};
