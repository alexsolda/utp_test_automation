describe('Teste de Login - Cometa', () => {
  const timeout = 10000; // Tempo de espera em milissegundos
  
  it('should allow user to log in', async () => {
    // Acessar a página inicial
    browser.url('/cometa');

    // Seleciona o botão 'Entrar'
    const enterBtn = await $('[data-js="header-login-button"]');
    
    // Garante que o botão está visível e clicável
    await enterBtn.waitForDisplayed({ timeout });
    await enterBtn.waitForClickable({ timeout });

    expect(await enterBtn.isDisplayed()).toBe(true);

    // Clicar no botão 'Entrar'
    await enterBtn.click();

    // Aguarda os campos de login aparecerem
    const emailInput = await $('.input-login');
    const passwordInput = await $('.input-password');
    
    await emailInput.waitForDisplayed({ timeout });
    await passwordInput.waitForDisplayed({ timeout });

    // Validar se os campos estão visíveis
    expect(await emailInput.isDisplayed()).toBe(true);
    expect(await passwordInput.isDisplayed()).toBe(true);
  });
});
