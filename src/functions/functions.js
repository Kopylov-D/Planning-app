export function setID() {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

export class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  fire(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }
}

export class Observer {
  constructor(state = false) {
    this.state = state;
    this.initialState = state;
  }

  update(action) {
    switch (action.type) {
      case 'CHECK':
        this.state = !this.state;
        break;
      case 'SUB':
        this.state = action.payload;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

const stream$ = new Subject()

const obs1 = new Observer()
const obs2 = new Observer(true)

stream$.subscribe(obs1)
stream$.subscribe(obs2)

stream$.fire({type: 'CHECK'})
stream$.fire({type: 'ADD', payload: true})

console.log(obs1.state)
console.log(obs2.state)
