"use strict"

function analisarEntrada(event) {
    if (document.forms[0].email.value.length == 0) {
        document.getElementById('situacaoEmail').innerText = "E ai";
    }

    if (document.forms[0].email.validity.typeMismatch) {
        document.getElementById('situacaoEmail').innerText = "Válido";
    }

    // let email = document.getElementById('email').innerText;
    // document.getElementById('situacaoEmail').innerText = event.keyCode;
    // if (email === "") {
    //     situacaoEmail.innerText = "";
    // }
    // if (!email.validity.rangeOverflow) {
    //     situacaoEmail.innerText = "Value too small";
    // }
}