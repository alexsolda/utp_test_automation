import { addAttachment } from '@wdio/allure-reporter';
import { addScreenshotToAllure } from "../../../../helpers/allureHelper";
import { expressoUTP, timeout } from '../../../../helpers/globalHelper';
import LoginPage from "../../../pageobjects/LoginPage";


describe('Teste de Login (falha) - Expresso sul', () => {
  it('não deve permitir login com credenciais inválidas', async () => {
    try {
      await LoginPage.openLogin(expressoUTP);

      await LoginPage.enterButton.waitForDisplayed({ timeout });
      await LoginPage.enterButton.waitForClickable({ timeout });
      await LoginPage.enterButton.click();

      await LoginPage.emailInput.waitForDisplayed({ timeout });
      await LoginPage.passwordInput.waitForDisplayed({ timeout });
      await LoginPage.loginButton.waitForDisplayed({ timeout });

      await LoginPage.login('47909726074', 'teste1234');

      const errorMessageElement = await $('[data-js="login-error-message"] label');
      await errorMessageElement.waitForDisplayed({ timeout });

      const errorMessageText = await errorMessageElement.getText();
      expect(errorMessageText).toContain(
        'O email ou senha inseridos não constam em nosso cadastro. Digite novamente o email e senha ou efetue o cadastro abaixo.'
      );

      const errorScreenshot = await browser.takeScreenshot();
      await addScreenshotToAllure(`Mensagem de erro de login - ${expressoUTP}`, errorScreenshot);

    } catch (error) {
      const screenshot = await browser.takeScreenshot();
      await addScreenshotToAllure(`Falha inesperada - ${expressoUTP}`, screenshot);
      throw error;  // Rejoga o erro para o teste falhar corretamente
    }
  });
});

describe('Teste de Login (sucesso) - Expresso sul', () => {
  it('deve permitir que o usuário realize o Login', async () => {
    try {
      // Acessar a página inicial
      await LoginPage.openLogin(expressoUTP);

      const errorModal = await $('[data-js="main-msg"]');
      const isModalDisplayed = await errorModal.isDisplayed().catch(() => false);

      if (isModalDisplayed) {
        const modalText = await errorModal.getText();

        if (modalText.includes('Houve uma falha na requisição. Tente novamente mais tarde.')) {
          const modalScreenshot = await browser.takeScreenshot();
          await addScreenshotToAllure(`Falha na requisição - ${expressoUTP}`, modalScreenshot);
          throw new Error(`Teste interrompido: modal com mensagem de erro detectado - "${modalText}"`);
        }
      }

      await LoginPage.enterButton.waitForDisplayed({ timeout });
      await LoginPage.enterButton.waitForClickable({ timeout });

      expect(await LoginPage.enterButton.isDisplayed()).toBe(true);

      const printEnterBtn = await browser.takeScreenshot();
      await addScreenshotToAllure(`Botão Entrar - ${expressoUTP}`, printEnterBtn);

      await LoginPage.enterButton.click();

      await LoginPage.emailInput.waitForDisplayed({ timeout });
      await LoginPage.passwordInput.waitForDisplayed({ timeout });
      await LoginPage.loginButton.waitForDisplayed({ timeout });

      expect(await LoginPage.emailInput.isDisplayed()).toBe(true);
      expect(await LoginPage.passwordInput.isDisplayed()).toBe(true);
      expect(await LoginPage.loginButton.isDisplayed()).toBe(true);

      const loginForm = await browser.takeScreenshot();
      await addScreenshotToAllure(`Dropdown login - ${expressoUTP}`, loginForm);

      await LoginPage.login('47909726074', 'teste123');

      const currentUrl = await browser.getUrl();
      console.log('URL atual depois do clique:', currentUrl);

      const passengerExists = await LoginPage.isPassengerInSessionStorage();
      expect(passengerExists).toBe(true);

      const passengerValue = await browser.execute(() => sessionStorage.getItem('passenger'));
      addAttachment(`Valor de passenger no sessionStorage - ${expressoUTP}`, passengerValue, 'text/plain');

    } catch (error) {
      const screenshot = await browser.takeScreenshot();
      await addScreenshotToAllure(`Falha inesperada - ${expressoUTP}`, screenshot);
      throw error;  // Rejoga o erro para o teste falhar corretamente
    }
  });
});