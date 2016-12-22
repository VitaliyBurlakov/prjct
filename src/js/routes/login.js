function login() {
  render('login');

  const loginForm = document.forms['login-form'];
  const field     = loginForm.elements.email;

  window.field = new FormField(field.parentNode, {
    validate: [
      'required',
      'email',
      'minLength[2]',
      'maxLength[10]',
      'unknown',
      'blablah'
    ]
  });
}
