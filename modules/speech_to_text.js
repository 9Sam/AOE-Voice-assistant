// import { recognize } from "./commands.js";

const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResult = true;
recognition.lang = "es";

let p = document.createElement('p');

recognition.addEventListener('result', (e) => {
    texts.appendChild(p);
    let text = e.results[0][0].transcript;
    p.innerText = text;
    // recognize(text);
    p = document.createElement("p");
    p.focus();
})
//El código obtiene el valor y ejecuta el código según la opción seleccionada

recognition.start();
//El programa comienza a escuchar
recognition.addEventListener('end', ()=>{
    recognition.start();
})