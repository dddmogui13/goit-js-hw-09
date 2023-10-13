import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let isTimerRunning = false;

function initStyle() {
  dateEl.style.fontWeight = '700';
  Object.values(timerElements).forEach((element) => {
    element.style.fontSize = '36px';
  });
}

function setActive(value) {
  startBtn.disabled = value;
  startBtn.style.backgroundColor = value ? '#C0C0C0' : 'none';
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function addPad(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(dif) {
  const { days, hours, minutes, seconds } = convertMs(dif);
  Object.entries(timerElements).forEach(([key, element]) => {
    element.textContent = addPad({ days, hours, minutes, seconds }[key]);
  });
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    setActive(true);

    const futureDate = new Date(dateEl.value);
    const now = new Date();

    if (futureDate <= now) {
      Notify.failure('Please choose a date in the future');
      setActive(false);
      isTimerRunning = false;
      return;
    }

    let dif = futureDate - now;
    updateTimerDisplay(dif);

    timerId = setInterval(() => {
      if (dif > 1000) {
        dif -= 1000;
        updateTimerDisplay(dif);
      } else {
        clearInterval(timerId);
        updateTimerDisplay(0);
        Notify.success('Timer reached 00:00');
        setActive(false);
        isTimerRunning = false;
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerId);
  updateTimerDisplay(0);
  setActive(false);
  isTimerRunning = false;
}

initStyle();
setActive(false);
startBtn.addEventListener('click', startTimer);

flatpickr(dateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      setActive(true);
    } else {
      setActive(false);
      resetTimer();
    }
  },
});