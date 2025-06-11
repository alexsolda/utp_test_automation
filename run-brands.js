import { exec } from 'child_process';
import { ENV_MAP } from './helpers/environments.js';

const args = process.argv.slice(2);
const brandsArg = args.find(arg => arg.startsWith('--brand='))?.split('=')[1];
const env = args.find(arg => arg.startsWith('--env='))?.split('=')[1] || 'dev';

if (!brandsArg) {
  console.error('❌ Erro: informe as marcas com --brand=marca1,marca2');
  process.exit(1);
}

const brands = brandsArg.split(',');

brands.forEach((brand) => {
  const baseUrl = ENV_MAP[brand]?.[env];
  if (!baseUrl) {
    console.error(`❌ BaseUrl não encontrada para ${brand} no ambinete ${env}`);
    return;
  }

  const specPath = `./test/specs/frontend/${brand}/*.js`;
  const command = `cross-env BASE_URL=${baseUrl} SPEC=${specPath} npx wdio run wdio.conf.ts`;

  console.log(`▶️ Rodando ${brand} em ${env}...\n`);

  const child = exec(command);

  child.stdout?.on('data', data => console.log(`[${brand}] ${data}`));
  child.stderr?.on('data', data => console.error(`[${brand} - ERRO] ${data}`));
});