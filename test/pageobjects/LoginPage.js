class LoginPage {
    get usernameInput() { return $('#username'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#loginButton'); }

    login(username, password) {
      this.usernameInput.setValue(username);
      this.passwordInput.setValue(password);
      this.loginButton.click();
    }
}

export default new LoginPage();