function signup() {
  // createUserWithEmailAndPassword
  render('signup');

  let form = document.getElementById('signup-form');

  let {email, password, password_confirm} = form;

  form.addEventListener('submit', submitHandler);

  // 1. Нету обработки серверных ошибок
  // 2. Нету обработки случая когда пользователь был успешно создан
  // 3. Нету информативности при клиентской валидации
  function submitHandler(e) {

    // 1. @
    // 2. .
    // 3. pass.length > 6
    // 4. pass === pass_confirm

    if ((email.value.indexOf('@') === -1) || (email.value.indexOf('.') === -1) || (password.value.length < 6) || (password.value !== password_confirm.value)) {
      alert('Error');
    } else {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .catch((error) => {
          alert(error.message);
        });
    }

    e.preventDefault();
  }
}
