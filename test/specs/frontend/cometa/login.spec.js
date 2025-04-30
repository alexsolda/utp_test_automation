import { addAttachment } from '@wdio/allure-reporter';
import { addScreenshotToAllure } from "../../../helpers/allureHelper";
import LoginPage from "../../pageobjects/LoginPage";

describe('Teste de Login - Cometa', () => {
  const timeout = 10000; // Tempo de espera em milissegundos
  
  it('deve permitir que o usuário realize o Login', async () => {
    // Acessar a página inicial
    await LoginPage.openLogin('cometa');

    const errorModal = await $('[data-js="main-msg"]');
    const isModalDisplayed = await errorModal.isDisplayed().catch(() => false);

    if (isModalDisplayed) {
      const modalText = await errorModal.getText();

      if (modalText.includes('Houve uma falha na requisição. Tente novamente mais tarde.')) {
        const modalScreenshot = await browser.takeScreenshot();
        await addScreenshotToAllure('Falha na requisição', modalScreenshot);
        throw new Error(`Teste interrompido: modal com mensagem de erro detectado - "${modalText}"`);
      }
    }
    
    // Garante que o botão está visível e clicável
    await LoginPage.enterButton.waitForDisplayed({ timeout });
    await LoginPage.enterButton.waitForClickable({ timeout });

    expect(await LoginPage.enterButton.isDisplayed()).toBe(true);

    const printEnterBtn = await browser.takeScreenshot();
    await addScreenshotToAllure('Botão Entrar', printEnterBtn);

    // Clicar no botão 'Entrar'
    await LoginPage.enterButton.click();

    // Aguarda os campos de login aparecerem
    await LoginPage.emailInput.waitForDisplayed({ timeout });
    await LoginPage.passwordInput.waitForDisplayed({ timeout });
    await LoginPage.loginButton.waitForDisplayed({ timeout });

    // Validar se os campos estão visíveis
    expect(await LoginPage.emailInput.isDisplayed()).toBe(true);
    expect(await LoginPage.passwordInput.isDisplayed()).toBe(true);
    expect(await LoginPage.loginButton.isDisplayed()).toBe(true);

    const loginForm = await browser.takeScreenshot();
    await addScreenshotToAllure('Dropdown login', loginForm);

    await LoginPage.login('31274324025', 'teste123');

    const passengerExists = await LoginPage.isPassengerInSessionStorage();
    expect(passengerExists).toBe(true);

    const passengerValue = await browser.execute(() => sessionStorage.getItem('passenger'));
    addAttachment('Valor de passenger no sessionStorage', passengerValue, 'text/plain');
  });
});
