import Header from "./header";
import "./App.css";
import { useState } from "react";
import Painel from "./pages/Painel";

function App() {

  const [mostrarPainel, setMostrarPainel] = useState(false);

  if (mostrarPainel) {
    return <Painel />;
  }

  return (
    <div className="pagina-farol">

      <Header onEntrar={() => setMostrarPainel(true)}/>

      <main id="farol" className="conteudo-principal">
        <section className="apresentacao">
          <span className="subtitulo">
            <span className="ponto-amarelo">•</span>
            SUA VIDA, COM MAIS DIREÇÃO
          </span>

          <h1>
            Menos à deriva.
            <br />
            Mais perto do
            <br />
            <span>seu horizonte.</span>
          </h1>

          <p className="descricao">
            Anote ideias, organize o dia e trace rotas para seus objetivos.
            O Farol ilumina o caminho. Você conduz a jornada.
          </p>

          <div className="botoes-apresentacao">
            <a className="botao botao-principal" href="#jornada">
              Começar minha jornada <span>→</span>
            </a>

            <a className="botao botao-secundario" href="#como-funciona">
              Conhecer o Farol <span>→</span>
            </a>
          </div>

          <p className="texto-apoio">
            Um espaço para suas notas, seus planos e seu próximo passo.
          </p>
        </section>


        <section className="ilustracao">
          <img
            src="/farol.png"
            alt="Farol iluminando o caminho"
          />
        </section>

      </main>


      <section id="recursos" className="secao-recursos">
        <div className="recursos-cabecalho">
          <h2>
            Não é sobre fazer mais.
            <br />
            É sobre saber para onde ir.
          </h2>

          <p>
            Entre uma ideia, uma tarefa e um sonho, existe um caminho.
            O Farol ajuda você a dar sentido a cada passo.
          </p>
        </div>

        <div className="recursos-lista">
          <article className="recurso-card">
            <span className="recurso-icone">✎</span>
            <h3>Ideias em um porto seguro</h3>
            <p>
              Guarde pensamentos, lembretes e descobertas
              antes que se percam no dia.
            </p>
          </article>

          <article className="recurso-card">
            <span className="recurso-icone">☷</span>
            <h3>Objetivos com um caminho</h3>
            <p>
              Transforme planos distantes em etapas que você
              consegue enxergar e percorrer.
            </p>
          </article>

          <article className="recurso-card">
            <span className="recurso-icone">▦</span>
            <h3>Um dia com mais clareza</h3>
            <p>
              Reúna tarefas, compromissos e prioridades sem
              perder a visão do todo.
            </p>
          </article>
        </div>
      </section>


      <footer id="como-funciona" className="rodape">
        <span className="frase-rodape">
          DA IDEIA AO PRÓXIMO PASSO
        </span>
        <span>01 Capture o que importa</span>
        <span>02 Encontre sua direção</span>
        <span>03 Avance no seu ritmo</span>
      </footer>
    </div>
  );

}

export default App;
