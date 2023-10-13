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

function formSubmit(event) {
  event.preventDefault();
  const { step, amount, delay } = getInputValues();

  const promises = [];
  for (let i = 1; i <= amount; i++) {
    promises.push(create(i, delay + (i - 1) * step));
  }

  Promise.all(promises.map((promise, index) => {
    return promise
      .then(() => Notify.success(`✅ Fulfilled promise ${index + 1} in ${delay + index * step}ms`))
      .catch(() => Notify.failure(`❌ Rejected promise ${index + 1} in ${delay + index * step}ms`));
  }));
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