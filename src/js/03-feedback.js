import throttle from 'lodash.throttle';

const FeedBackForm = document.querySelector('.feedback-form');
const inputTextObj = parceObj(localStorage.getItem('feedback-form-state'));

window.addEventListener('load', checkStorage(inputTextObj));

FeedBackForm.addEventListener('input', throttle(writeData, 500));
FeedBackForm.addEventListener('submit', submitForm);

function checkStorage(obj) {
  if (Object.keys(obj).length > 0) {
    setValueInput(FeedBackForm);
  }
}

function setValueInput(form) {
  [...form.querySelectorAll('label')].forEach(item => {
    if (inputTextObj[item.control.name])
      item.control.value = inputTextObj[item.control.name];
  });
}

function writeData(e) {
  inputTextObj[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(inputTextObj));
}

function submitForm(e) {
  e.preventDefault();

  console.log(parceObj(localStorage.getItem('feedback-form-state')));
  localStorage.clear();
  e.target.reset();
}

function parceObj(obj) {
  obj = obj ? JSON.parse(obj) : {};
  return obj;
}
