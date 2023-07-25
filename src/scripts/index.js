import App from './app';

const app = new App();
app.processJSX();

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('root');
  root.insertAdjacentElement('beforeend', app.create());
});
