const date = document.querySelector('.date');
const clock = document.querySelector('.countdown-container');
const message = document.querySelector('.message');
let timeInterval;


const dateChange = () => {
    clearInterval(timeInterval);
    localStorage.clear();
    message.textContent = '';

    if (timeLeft().total < 0) {
        message.textContent = `SELECT A VALID DATE`;
        clearsCounter();
        return
    }

    timeLeft();
    startsClock()
}

const startsClock = () =>  {
    updatesCounter();

    if (timeLeft().total >= 0) {
    timeInterval = setInterval(updatesCounter, 1000);
    }
    else {
        message.textContent = `TIMES UP!`;
        clearInterval(timeInterval);
    }
}

const updatesCounter = () => {
    for (let keys in timeLeft()) {
        const matchClassName = clock.querySelector(`#${keys}`);

        if (matchClassName !== null) {
        matchClassName.textContent = timeLeft()[keys];
        }
    }
}

const clearsCounter = () => {
    for (let property in timeLeft()) {
        const matchClassName = clock.querySelector(`#${property}`);

        if (matchClassName !== null) {
        matchClassName.textContent = 0;
        }
    }
}

const timeLeft = () =>  {
    const newDate = new Date(date.value);
    const currentDate = new Date();
    const timeLeft = Date.parse(newDate) - Date.parse(currentDate);

    const seconds = Math.floor((timeLeft/1000) % 60);
    const minutes = Math.floor((timeLeft/1000/60) % 60);
    const hours = Math.floor((timeLeft/(1000*60*60) % 24));
    const days = Math.floor((timeLeft/(1000*60*60*24)));
    
    return {
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
        'total': timeLeft
    } 
}


date.addEventListener('change', dateChange);

