import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function getInputValues() {
  const {
    elements: { delay, step, amount },
  } = form;
  return {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };
}

async function formSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = getInputValues();

  for (let i = 0; i < amount; i++) {
    try {
      await create(i + 1, delay);
      Notify.success(`✅ Fulfilled promise ${i + 1} in ${delay}ms`);
    } catch (error) {
      Notify.failure(`❌ Rejected promise ${i + 1} in ${delay}ms`);
    }
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

async function create(position, delay) {
  return createPromise(position, delay);
}

form.addEventListener('submit', formSubmit);
form.addEventListener('input', getInputValues);