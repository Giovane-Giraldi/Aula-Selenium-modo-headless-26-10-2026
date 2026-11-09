const { Builder, By, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const { expect } = require('chai');

(async function testeInterface() {

// Configurações para modo headless funcional em containers

const options = new chrome.Options();

options.addArguments('--headless'); // executa sem janela gráfica
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--window-size=1920,1080');

// cria diretório temporário único a cada execução

options.addArguments(`--user-data-dir=/tmp/chrome-${Date.now()}`);

let driver = await new Builder()

.forBrowser('chrome')

.setChromeOptions(options)

.build();

try {

console.log('Abrindo site...');

console.log('Abrindo site da Fatec...');
        await driver.get('https://fatec.sp.gov.br/');

        // Verificar título da página
        const titulo = await driver.getTitle();
        console.log('Título:', titulo);
        
        // Validação ajustada para o que realmente aparece no título da Fatec
        expect(titulo).to.include('Fatec');





// Verificar visibilidade do menu

const menu = await driver.findElement(By.css('nav'));
const visivel = await menu.isDisplayed();

console.log('Menu visível?', visivel);

expect(visivel).to.be.true;

// Testar campo de busca

const campoBusca = await driver.findElement(By.css('input[type="search"], input[name*="busca"]'));
await campoBusca.sendKeys('cursos\n');

await driver.wait(until.urlContains('curso'), 5000);

console.log('Redirecionamento OK');

// Captura de tela (opcional)

const screenshot = await driver.takeScreenshot();
const fs = require('fs');

fs.writeFileSync('resultado_teste.png', screenshot, 'base64');

console.log('Screenshot salvo como resultado_teste.png');

} catch (err) {
console.error('Erro no teste:', err);
} finally {
await driver.quit();
}
})();