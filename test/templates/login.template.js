import { addAttachment } from '@wdio/allure-reporter';
import { addScreenshotToAllure } from '../../helpers/allureHelper';
import { timeout } from '../../helpers/globalHelper';
import LoginPage from '../pageobjects/LoginPage';

export async function loginFailureTest(brandName, url, login, password) {
  try {

    await LoginPage.openLogin(url);

    await removeChromeExtension();

    await LoginPage.enterButton.waitForDisplayed({ timeout });
    await LoginPage.enterButton.waitForClickable({ timeout });
    await LoginPage.enterButton.click();

    await LoginPage.emailInput.waitForDisplayed({ timeout });
    await LoginPage.passwordInput.waitForDisplayed({ timeout });
    await LoginPage.loginButton.waitForDisplayed({ timeout });

    await LoginPage.login(login, `${password}_inválida`);

    const errorMessageElement = await $('[data-js="login-error-message"] label');
    await errorMessageElement.waitForDisplayed({ timeout });

    const errorMessageText = await errorMessageElement.getText();
    expect(errorMessageText).toContain('O email ou senha inseridos não constam em nosso cadastro');

    const errorScreenshot = await browser.takeScreenshot();
    await addScreenshotToAllure(`Mensagem de erro de login - ${brandName}`, errorScreenshot);

  } catch (error) {
    const screenshot = await browser.takeScreenshot();
    await addScreenshotToAllure(`Falha inesperada - ${brandName}`, screenshot);
    throw error;
  }
}

export async function loginSuccessTest(brandName, url, login, password) {
  try {

    await LoginPage.openLogin(url);

    const errorModal = await $('[data-js="main-msg"]');
    const isModalDisplayed = await errorModal.isDisplayed().catch(() => false);

    if (isModalDisplayed) {
      const modalText = await errorModal.getText();

      if (modalText.includes('Houve uma falha na requisição')) {
        const modalScreenshot = await browser.takeScreenshot();
        await addScreenshotToAllure(`Falha na requisição - ${brandName}`, modalScreenshot);
        throw new Error(`Teste interrompido: modal com mensagem de erro detectado - "${modalText}"`);
      }
    }

    await removeChromeExtension();

    await LoginPage.enterButton.waitForDisplayed({ timeout });
    await LoginPage.enterButton.waitForClickable({ timeout });

    const printEnterBtn = await browser.takeScreenshot();
    await addScreenshotToAllure(`Botão Entrar - ${brandName}`, printEnterBtn);

    await LoginPage.enterButton.click();

    await LoginPage.emailInput.waitForDisplayed({ timeout });
    await LoginPage.passwordInput.waitForDisplayed({ timeout });
    await LoginPage.loginButton.waitForDisplayed({ timeout });

    const loginForm = await browser.takeScreenshot();
    await addScreenshotToAllure(`Dropdown login - ${brandName}`, loginForm);

    await LoginPage.login(login, password);

    const passengerExists = await LoginPage.isPassengerInSessionStorage();
    expect(passengerExists).toBe(true);

    const passengerValue = await browser.execute(() => sessionStorage.getItem('passenger'));
    addAttachment(`Valor de passenger no sessionStorage - ${brandName}`, passengerValue, 'text/plain');
  } catch (error) {
    const screenshot = await browser.takeScreenshot();
    await addScreenshotToAllure(`Erro inesperado - ${brandName}`, screenshot);
    throw error;
  }
}

export async function removeChromeExtension() {
   await browser.execute(() => {
    const hideElement = (selector) => {
      const el = document.querySelector(selector);
      if (el) {
        el.style.display = 'none';
      }
    };

    hideElement('#contexthub-ui-iframe');
  });

  // Aguarde até que a UI do AEM esteja realmente oculta
  await browser.waitUntil(
    async () => {
      const exists = await browser.execute(() => {
        return (
          document.querySelector('#contexthub-ui-iframe') === null
        );
      });
      return exists === true;
    },
    {
      timeout: 5000,
      timeoutMsg: 'A barra do AEM ainda está presente após tentativa de remoção.',
    }
  );
}