document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById('grid-container');
  const labels = ['Label 1:', 'Label 2:', 'Label 3:', 'Label 4:'];

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  labels.forEach(function(labelText, index) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');

    const label = document.createElement('label');
    label.textContent = labelText;
    label.classList.add('time-label');
    rowContainer.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('time-input');
    input.placeholder = 'MM:SS,SS';
    rowContainer.appendChild(input);

    input.addEventListener('input', function() {
      const value = input.value.trim();
      const isValid = validateTime(value);
      if (!isValid) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
      updateDifference();
    });

    formContainer.appendChild(rowContainer);
  });

  container.appendChild(formContainer);

  const textareaContainer = document.createElement('div');
  textareaContainer.classList.add('textarea-container');

  const textarea = document.createElement('textarea');
  textarea.classList.add('additional-textarea');
  textarea.placeholder = 'Wieloliniowe pole tekstowe';
  textareaContainer.appendChild(textarea);

  textarea.addEventListener('input', function() {
    const value = textarea.value.trim();
    const isValid = validateTime(value);
    if (!isValid) {
      textarea.classList.add('invalid');
    } else {
      textarea.classList.remove('invalid');
    }
    updateDifference();
  });

  container.appendChild(textareaContainer);

  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.addEventListener('click', function() {
    const inputs = document.querySelectorAll('.time-input, .additional-textarea');
    let isError = false;
    inputs.forEach(function(input) {
      if (input.classList.contains('invalid')) {
        isError = true;
      }
    });
    if (isError) {
      alert('Błąd: Nieprawidłowe dane!');
    } else {
      alert('Dane zostały zatwierdzone poprawnie.');
    }
    updateDifference();
  });
  container.appendChild(button);

  function validateTime(timeString) {
    const regex = /^\d{2}:\d{2},\d{2}$|^\d{2},\d{2}$|^\d{2}:\d{2}\.\d{2}$|^\d{2}\.\d{2}$/;
    return regex.test(timeString);
  }

function updateDifference() {
  const timeInputs = document.querySelectorAll('.time-input, .additional-textarea');
  const times = Array.from(timeInputs).map(function(input) {
    if (!validateTime(input.value)) {
      return NaN;
    } else {
      return parseTime(input.value);
    }
  }).filter(time => !isNaN(time));

  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  const difference = maxTime - minTime;

  const differenceOutput = document.getElementById('difference');
  differenceOutput.textContent = formatTime(difference);
}

  function parseTime(timeString) {
    let seconds, centiseconds;
    if (timeString.includes(":")) {
      const [minutes, secsAndCents] = timeString.split(":");
      const [secondsString, centisecondsString] = secsAndCents.split(",");
      seconds = parseInt(minutes) * 60 + parseInt(secondsString);
      centiseconds = parseInt(centisecondsString);
    } else {
      const [secondsString, centisecondsString] = timeString.split(",");
      seconds = parseInt(secondsString);
      centiseconds = parseInt(centisecondsString);
    }
    return seconds + centiseconds / 100;
  }

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const centiseconds = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 100); 
  return `${padZero(minutes)}:${padZero(seconds)},${padZero(centiseconds)}`; 
}

  function padZero(num) {
    return num.toString().padStart(2, '0');
  }
});
