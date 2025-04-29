export async function addScreenshotToAllure(title, screenshot) {

    const now = new Date();
    const timestamp = now.toISOString().replace(/:/g, '-');
    const attachmentTitle = `${title}_${timestamp}`;
  
    // Adiciona o screenshot ao Allure com o título formatado
    await import('@wdio/allure-reporter').then(({ default: allure }) => {
      allure.addAttachment(attachmentTitle, Buffer.from(screenshot, 'base64'), 'image/png');
    });
  }