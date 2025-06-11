import { brandConfig } from '../../../../helpers/globalHelper';
import { loginFailureTest, loginSuccessTest } from '../../../templates/login.template';

const { 
  name: BRAND_NAME,  
  login: BRAND_LOGIN, 
  password: BRAND_PASSWORD 
} = brandConfig.wemobi;


describe(`Teste de Login - ${BRAND_NAME}`, () => {

  it('não deve permitir login com credenciais inválidas', async () => {
    await loginFailureTest(BRAND_NAME, '/', BRAND_LOGIN, BRAND_PASSWORD);
  });

  it('deve permitir que o usuário realize o Login', async () => {
    await loginSuccessTest(BRAND_NAME, '/', BRAND_LOGIN, BRAND_PASSWORD);
  });
});