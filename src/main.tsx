import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <a className="skip" href="#conteudo">Ir para o conteúdo</a>
    <header className="masthead">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">◇</span>
        <span>Quiz bíblico</span>
      </div>
      <span className="collection">Coleção de estudo bíblico</span>
    </header>
    <main id="conteudo" tabIndex={-1}>
      <div className="intro">
        <h1>Quiz bíblico</h1>
        <nav className="atalhos" aria-label="Seções desta página">
          <a href="#rodada">Rodada</a>
          <a href="#desempenho">Desempenho</a>
          <a href="#historico">Histórico</a>
        </nav>
      </div>
      <App />
    </main>
  </StrictMode>,
);
