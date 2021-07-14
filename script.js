let nome = document.getElementById('name');
let spanNome = document.getElementById('spanName');
let nomeValid = false;

let telefone = document.getElementById('telefone');
let spanTelefone = document.getElementById('spanTelefone');
let telefoneValid = false;
let telefoneAjustado;

let email = document.getElementById('email');
let spanEmail = document.getElementById('spanEmail');
let emailValid = false;

let msgSuccess = document.getElementById('msgSuccess');
let msgError = document.getElementById('msgError');

nome.addEventListener('keyup', (e) => {
  if (e.target.value == '') {
    nome.setAttribute('style', 'border-color: red')
    spanNome.setAttribute('style', 'display: block');
    nomeValid = false;
  } else {
    nome.setAttribute('style', 'border-color: green')
    spanNome.setAttribute('style', 'display: none;');
    nomeValid = true;
  }
});

telefone.addEventListener('keyup', (e) => {

  if (e.target.value == '' || e.target.value.length != 11) {
    telefone.setAttribute('style', 'border-color: red')
    spanTelefone.setAttribute('style', 'display: block');
    telefoneValid = false;
  } else {
    telefone.setAttribute('style', 'border-color: green')
    spanTelefone.setAttribute('style', 'display: none;');
    telefoneValid = true;
  }
});

email.addEventListener('keyup', () => {
  validacaoEmail(email);
})


function mascaraTelefone(telefone) {
  telefoneAjustado = telefone.value
  const ddd = telefoneAjustado.slice(0, 2);
  const parte1 = telefoneAjustado.slice(2, 7);
  const parte2 = telefoneAjustado.slice(7, 11);
  telefoneAjustado = `(${ddd}) ${parte1}-${parte2}`;

  if (telefone.value == '' || telefone.value.length != 11) {
    telefoneAjustado = ''
  } else {
    telefone.value = telefoneAjustado
  }

}

function validacaoEmail(email) {
  let usuario = email.value.substring(0, email.value.indexOf("@"));
  let dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
    email.setAttribute('style', 'border-color: green')
    spanEmail.setAttribute('style', 'display: none')
    emailValid = true;
  } else {
    email.setAttribute('style', 'border-color: red')
    spanEmail.setAttribute('style', 'display: block')
    emailValid = false;
  }
}

function submitForm(e) {
  if (nomeValid && telefoneValid && emailValid) {

    msgSuccess.innerHTML = 'Cadastro efetuado com sucesso!';
    msgSuccess.setAttribute('style', 'display: block');
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';

    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
    listaUser.push({
      nameStorage: nome.value,
      telefoneStorage: telefone.value,
      emailStorage: email.value
    })
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
  } else {
    msgError.innerHTML = 'Preencha todos os campos corretamente';
    msgError.setAttribute('style', 'display: block');
    msgSuccess.setAttribute('style', 'display: none');
    msgSuccess.innerHTML = '';
  }
};

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;

  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.innerHTML = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  let duration = 1199 ;
  let display = document.getElementById('timer')

  startTimer(duration, display);
}