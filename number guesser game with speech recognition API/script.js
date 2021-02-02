const speech = document.getElementById('speech');

const randomNum = randNum();


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


let recog = new window.SpeechRecognition();

recog.start();

function speak(e) {
    const msg = e.results[0][0].transcript;
    showSpeech(msg);
    isValid(msg);
}

function showSpeech(msg) {
    speech.innerHTML = `
    <div>What you said:</div>
    <small class='input'>${msg}</small>
    `;
}

function isValid(msg) {
    const number = +msg;
    if (Number.isNaN(number)) {
        speech.innerHTML = '<div>That is not a number</div>';
        return;
    }

    if (number > 10 || number < 1) {
        speech.innerHTML = '<div>Must be between 1-10</div>';
        return;
    }

    if (number === randomNum) {
        speech.innerHTML += `<div> Congrats!!! You guessed right</div><button class=
        'replay' id='replay'>Try Another</button>`

    } else if (number > randomNum) {
        speech.innerHTML += '<div>Too High</div>';
    } else {
        speech.innerHTML += '<div>Too low</div>';
    }
}

function randNum() {
    return Math.floor(Math.random() * 9) + 1;
}
console.log(randomNum)
recog.addEventListener('result', speak)

recog.addEventListener('end', () => recog.start())

document.body.addEventListener('click', (e) => {
    if (e.target.id = 'replay') {
        window.location.reload();
    }
})