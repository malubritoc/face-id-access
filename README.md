Para tornar a experiência do back-end mais visual e amigável aos usuários, foi criada uma interface com as seguintes características:

1. Tecnologias Utilizadas

   - Next.js: Framework React para construção de aplicações web;
   - Tailwind: Framework CSS para estilização de componentes;
   - TypeScript: Superconjunto do JavaScript que adiciona tipagem estática.

2. Bibliotecas

   - Zod: Utilizada para criar esquemas de formulários;
   - Lucide: Utilizada como fonte de ícones svg.

3. UI

   - shadcn: Coleção de componentes reutilizáveis utilizada para criar componentes.

4. Funcionalidades

   - Cadastrar novo usuário;
   - Enviar imagem de usuário para verificar autorização.

5. Ambiente de produção

   - O aplicativo está disponível no link https://face-id-access.vercel.app/.

6. Uso da aplicação

   - Acessar o link citado acima no ponto 5;
   - Ao abrir a aplicação, o usuário deve permitir o acesso à câmera;
   - Na tela inicial, no canto direito do header, clicar no ícone de mais (+);
   - Essa ação ativará o modal de cadastro de novo usuário;
   - Preencher o formulário com nome, email, 7 imagens tiradas na hora e as permissões desejadas e clicar em cadastrar;
   - Em caso de sucesso, essa ação ativará o toast de sucesso, no caso contrário o toast de erro;
   - Em caso de cadastro exitoso, o usuário deve capturar uma imagem na tela principal clicando no botão “Capturar” e depois em “Enviar”, para que a API realize a validação da sua imagem;
   - Em caso de sucesso, essa ação ativará o toast de sucesso, no caso contrário o toast de erro;

7. Funcionamento interno

   - A captura de imagem funciona através do método navigator.mediaDevices.getUserMedia, a partir disso, o sistema cria um canvas e preenche-o com a imagem obtida através da câmera do dispositivo;
   - Uma vez capturada, a imagem é transformada para o formato base64, conforme contratos de API;
   - Então, os dados respectivos às rotas de cadastro e reconhecimento são enviados para a API para que seja feita a validação e retornado um feedback que definirá qual tipo de toast será renderizado para o usuário.

8. Limitações
   - Não foi possível conectar a interface com a API por uma limitação de CORS, visto que a API não estava habilitada a receber requisições de ambas URLs do front (localhost e a do deploy no vercel).
