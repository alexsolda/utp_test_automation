class LoginPage {
  get enterButton() {
    return $('[data-js="header-login-button"]');
  }

  get emailInput() {
    return $('.input-login');
  }

  get passwordInput() {
    return $('.input-password');
  }

  get loginButton() {
    return $('[data-js="button-login"]');
  }

  openLogin(brand) {
    return browser.url(`/${brand}`);
  }

  async login(email, password) {
    await this.emailInput.waitForDisplayed();
    await this.passwordInput.waitForDisplayed();
  
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  
    try {
      await browser.waitUntil(
        async () => await this.loginButton.isEnabled(),
        {
          timeout: 5000,
          timeoutMsg: 'Botão de login não ficou habilitado após preencher os campos',
        }
      );
    } catch (error) {
      const screenshot = await browser.takeScreenshot();
      await addScreenshotToAllure('Botão de login não habilitado', screenshot);
      throw error; // relança o erro original para falhar o teste
    }
  
    await this.loginButton.click();
  }

  async isPassengerInSessionStorage(timeout = 5000) {
    return await browser.waitUntil(
      async () => {
        const passenger = await browser.execute(() => sessionStorage.getItem('passenger'));
        console.log(passenger);
        return passenger !== null && passenger.trim() !== '';
      },
      {
        timeout,
        timeoutMsg: 'O item "passenger" não foi encontrado ou está vazio no sessionStorage após o tempo limite',
      }
    );
  }
}

export default new LoginPage();