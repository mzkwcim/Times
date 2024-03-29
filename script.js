document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('stopwatch-container');
    const differenceOutput = document.getElementById('difference');
  
    for (let i = 0; i < 8; i++) {
        const label = document.createElement('label');
        label.textContent = `Powtórzenie ${(i%4)+1}, seria ${Math.ceil((i+1)/4)}:`; 
    
        label.classList.add('time-label');
    
        container.appendChild(label);
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('time-input');
        input.placeholder = 'MM:SS,SS';
        container.appendChild(input);
        if (i === 3){
            const lineBreak = document.createElement('br');
            container.appendChild(lineBreak);
        }
        if (i !== 7) {
            const lineBreak = document.createElement('br');
            container.appendChild(lineBreak);
        }
        input.addEventListener('input', calculateDifference);
    }
  
    function calculateDifference() {
      const timeInputs = document.querySelectorAll('.time-input');
      const times = Array.from(timeInputs).map(function(input) {
        return parseTime(input.value);
      });
  
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);
  
      const difference = maxTime - minTime;
  
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
      const centiseconds = Math.floor((totalSeconds % 1) * 100);
      return `${padZero(minutes)}:${padZero(seconds)},${padZero(centiseconds)}`;
    }
  
    function padZero(num) {
      return num.toString().padStart(2, '0');
    }
  });
  
