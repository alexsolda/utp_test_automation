import { addAttachment } from '@wdio/allure-reporter';
import { addScreenshotToAllure } from "../../../../helpers/allureHelper";
import { milEUmUTP, timeout } from '../../../../helpers/globalHelper';
import LoginPage from "../../../pageobjects/LoginPage";


describe('Teste de Login (falha) - 1001', () => {
  it('não deve permitir login com credenciais inválidas', async () => {
      try {

        await LoginPage.openLogin(milEUmUTP);
  
        await LoginPage.enterButton.waitForDisplayed({ timeout });
        await LoginPage.enterButton.waitForClickable({ timeout });
        await LoginPage.enterButton.click();
  
        await LoginPage.emailInput.waitForDisplayed({ timeout });
        await LoginPage.passwordInput.waitForDisplayed({ timeout });
        await LoginPage.loginButton.waitForDisplayed({ timeout });
  
        await LoginPage.login('30306496011', 'teste1234');
  
        const errorMessageElement = await $('[data-js="login-error-message"] label');
        await errorMessageElement.waitForDisplayed({ timeout });
  
        const errorMessageText = await errorMessageElement.getText();
        expect(errorMessageText).toContain('O email ou senha inseridos não constam em nosso cadastro. Digite novamente o email e senha ou efetue o cadastro abaixo.'); 
  
        const errorScreenshot = await browser.takeScreenshot();
        await addScreenshotToAllure(`Mensagem de erro de login - ${milEUmUTP}`, errorScreenshot);

    } catch (error) {
        const screenshot = await browser.takeScreenshot();
        await addScreenshotToAllure(`Falha inesperada - ${milEUmUTP}`, screenshot);
        throw error;  // Rejoga o erro para o teste falhar corretamente
    }
    });
});

describe('Teste de Login (sucesso) - 1001', () => {
  
  it('deve permitir que o usuário realize o Login', async () => {

    try {
      // Acessar a página inicial
    await LoginPage.openLogin(milEUmUTP);

    const errorModal = await $('[data-js="main-msg"]');
    const isModalDisplayed = await errorModal.isDisplayed().catch(() => false);

    if (isModalDisplayed) {
      const modalText = await errorModal.getText();

      if (modalText.includes('Houve uma falha na requisição. Tente novamente mais tarde.')) {
        const modalScreenshot = await browser.takeScreenshot();
        await addScreenshotToAllure(`Falha na requisição - ${milEUmUTP}`, modalScreenshot);
        throw new Error(`Teste interrompido: modal com mensagem de erro detectado - "${modalText}"`);
      }
    }
    
    // Garante que o botão está visível e clicável
    await LoginPage.enterButton.waitForDisplayed({ timeout });
    await LoginPage.enterButton.waitForClickable({ timeout });

    expect(await LoginPage.enterButton.isDisplayed()).toBe(true);

    const printEnterBtn = await browser.takeScreenshot();
    await addScreenshotToAllure(`Botão Entrar - ${milEUmUTP}`, printEnterBtn);

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
    await addScreenshotToAllure(`Dropdown login - ${milEUmUTP}`, loginForm);

    await LoginPage.login('30306496011', 'teste123');

    const passengerExists = await LoginPage.isPassengerInSessionStorage();
    expect(passengerExists).toBe(true);

    const passengerValue = await browser.execute(() => sessionStorage.getItem('passenger'));
    addAttachment(`Valor de passenger no sessionStorage - ${milEUmUTP}`, passengerValue, 'text/plain');
    } catch (error) {
        const modalScreenshot = await browser.takeScreenshot();
        await addScreenshotToAllure(`Falha na requisição - ${milEUmUTP}`, modalScreenshot);
        throw new Error(`Teste interrompido: modal com mensagem de erro detectado - "${modalText}"`);
    }
  });
});