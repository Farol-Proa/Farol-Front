import { useState } from "react";
import "./Painel.css";

function Painel() {


    const [dataSelecionada, setDataSelecionada] = useState(
        new Date().toLocaleDateString("en-CA")
    );


    function alternarObjetivo(id) {
        setObjetivos(
            objetivos.map((objetivo) =>
                objetivo.id === id
                    ? { ...objetivo, concluido: !objetivo.concluido }
                    : objetivo
            )
        );
    }

    function removerObjetivo(id) {
        setObjetivos((objetivosAtuais) =>
            objetivosAtuais.filter((objetivo) => objetivo.id !== id)
        );
    }


    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState("");



    function adicionarTarefa(event) {
        event.preventDefault();

        if (novaTarefa.trim() === "") {
            return;
        }

        const tarefa = {
            id: Date.now(),
            texto: novaTarefa.trim(),
            concluida: false,
            data: dataSelecionada
        };

        setTarefas([...tarefas, tarefa]);
        setNovaTarefa("");
    }


    function alternarTarefa(id) {
        setTarefas(
            tarefas.map((tarefa) =>
                tarefa.id === id
                    ? { ...tarefa, concluida: !tarefa.concluida }
                    : tarefa
            )
        );
    }

    function removerTarefa(id) {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    }


    const [objetivos, setObjetivos] = useState([
        { id: 1, nome: "Meu primeiro objetivo" }
    ]);

    const [novoObjetivo, setNovoObjetivo] = useState("");
    const [mostrarFormularioObjetivo, setMostrarFormularioObjetivo] = useState(false);

    function adicionarObjetivo(event) {
        event.preventDefault();

        if (novoObjetivo.trim() === "") {
            return;
        }

        const objetivo = {
            id: Date.now(),
            nome: novoObjetivo.trim(),
            concluido: false
        };

        setObjetivos([...objetivos, objetivo]);
        setNovoObjetivo("");
        setMostrarFormularioObjetivo(false);
    }


    const [notas, setNotas] = useState([
        { id: 1, texto: "Revisar resumo do TCC", concluida: true },
        { id: 2, texto: "Enviar e-mail para o orientador", concluida: false },
        { id: 3, texto: "Consolidar anotações da semana", concluida: false }
    ]);

    const [novaNota, setNovaNota] = useState("");

    function adicionarNota(event) {
        event.preventDefault();

        if (novaNota.trim() === "") {
            return;
        }

        const nota = {
            id: Date.now(),
            texto: novaNota,
            concluida: false
        };

        setNotas([...notas, nota]);
        setNovaNota("");
    }

    function alternarNota(id) {
        setNotas(
            notas.map((nota) =>
                nota.id === id
                    ? { ...nota, concluida: !nota.concluida }
                    : nota
            )
        );
    }

    function removerNota(id) {
        setNotas((notasAtuais) =>
            notasAtuais.filter((nota) => nota.id !== id)
        );
    }


    const totalItens = tarefas.length + objetivos.length;

    const itensConcluidos =
        tarefas.filter((tarefa) => tarefa.concluida).length +
        objetivos.filter((objetivo) => objetivo.concluido).length;

    const progresso =
        totalItens === 0
            ? 0
            : Math.round((itensConcluidos / totalItens) * 100);


    return (
        <div className="painel">
            <aside className="menu-lateral">
                <div className="marca-painel">
                    <div className="marca-icone">✦</div>
                    <h2>Farol</h2>
                </div>

                <nav className="menu-opcoes">
                    <a className="menu-ativo" href="#inicio">⌂ Início</a>
                    <a href="#objetivos">◎ Objetivos</a>
                    <a href="#mapas">♧ Mapas</a>
                    <a href="#anotacoes">☷ Anotações</a>
                    <a href="#calendario">▦ Calendário</a>
                    <a href="#mentoria">♙ Mentoria</a>
                </nav>

                <div className="meta-lateral">
                    <div className="mini-farol">⚑</div>
                    <strong>7 dias</strong>
                </div>

                <button className="configuracao">
                    ⚙ Configuração
                </button>
            </aside>

            <main className="painel-conteudo" id="inicio">
                <header className="painel-topo">
                    <h1>Início</h1>
                    <div className="perfil">R</div>
                </header>

                <section className="boas-vindas">
                    <div>
                        <h2>Olá, visitante!</h2>
                        <p>
                            “Qualquer ideia é estupidamente útil”
                        </p>
                    </div>

                    <div className="data-painel">
                        <strong>Minha jornada começa hoje.</strong>
                        <span>Bom dia! ☀️</span>
                    </div>
                </section>

                <section className="painel-grade">

                    <article className="painel-card notas-card" id="anotacoes">
                        <h3>
                            Notas Diárias
                            <button
                                type="button"
                                onClick={() => document.getElementById("campo-nota")?.focus()}
                                aria-label="Adicionar nota"
                            >
                                +
                            </button>
                        </h3>

                        <form className="form-nota" onSubmit={adicionarNota}>
                            <input
                                id="campo-nota"
                                type="text"
                                placeholder="Escreva uma nova nota..."
                                value={novaNota}
                                onChange={(event) => setNovaNota(event.target.value)}
                            />

                            <button type="submit">Adicionar</button>
                        </form>

                        <div className="lista-notas">
                            {notas.map((nota) => (
                                <div
                                    className={`nota ${nota.concluida ? "nota-concluida" : ""}`}
                                    key={nota.id}
                                >
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={nota.concluida}
                                            onChange={() => alternarNota(nota.id)}
                                        />

                                        <span>{nota.texto}</span>
                                    </label>

                                    <button
                                        type="button"
                                        className="remover-nota"
                                        onClick={() => removerNota(nota.id)}
                                        aria-label={`Excluir nota ${nota.texto}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </article>





                    <article className="painel-card calendario-card" id="calendario">
                        <h3>Minha semana</h3>
                        <p>Organize seu tempo e suas prioridades.</p>

                        <div className="dias">
                            {["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"].map(
                                (dia, indice) => {
                                    const hoje = new Date();
                                    const diaDaSemana = (hoje.getDay() + 6) % 7;
                                    const data = new Date(hoje);

                                    data.setDate(hoje.getDate() - diaDaSemana + indice);

                                    const dataFormatada = [
                                        data.getFullYear(),
                                        String(data.getMonth() + 1).padStart(2, "0"),
                                        String(data.getDate()).padStart(2, "0")
                                    ].join("-");

                                    return (
                                        <button
                                            type="button"
                                            key={dia}
                                            className={`dia ${dataSelecionada === dataFormatada
                                                ? "dia-selecionado"
                                                : ""
                                                }`}
                                            onClick={() => setDataSelecionada(dataFormatada)}
                                        >
                                            <span>{dia}</span>
                                            <strong>{data.getDate()}</strong>
                                            {tarefas.some((tarefa) => tarefa.data === dataFormatada) && (
                                                <span className="dia-com-tarefa"></span>
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <p>Data selecionada: {dataSelecionada}</p>
                    </article>




                    <article className="painel-card jornada-card" id="objetivos">
                        <h3>Minha Jornada</h3>

                        <div className="progresso">
                            <span>{progresso}%</span>

                            <div className="barra-progresso">
                                <div
                                    className="barra-progresso-preenchida"
                                    style={{ width: `${progresso}%` }}
                                ></div>
                            </div>
                        </div>

                        <p>
                            {totalItens === 0
                                ? "Comece adicionando seu primeiro objetivo."
                                : `Você concluiu ${itensConcluidos} de ${totalItens} itens.`}
                        </p>
                    </article>



                    <article className="painel-card ilhas-card" id="mapas">
                        <h3>Minhas Ilhas</h3>

                        {mostrarFormularioObjetivo && (
                            <form
                                className="form-objetivo"
                                onSubmit={adicionarObjetivo}
                            >
                                <input
                                    type="text"
                                    placeholder="Qual é o seu objetivo?"
                                    value={novoObjetivo}
                                    onChange={(event) => setNovoObjetivo(event.target.value)}
                                />

                                <button type="submit">Criar objetivo</button>

                                <button
                                    type="button"
                                    onClick={() => setMostrarFormularioObjetivo(false)}
                                >
                                    Cancelar
                                </button>
                            </form>
                        )}

                        <div className="ilha-lista">
                            {objetivos.map((objetivo) => (

                                <div
                                    className={`ilha ${objetivo.concluido ? "ilha-concluida" : ""}`}
                                    key={objetivo.id}
                                >
                                    <div className="ilha-info">
                                        <span>{objetivo.nome}</span>

                                        <button
                                            type="button"
                                            className="remover-objetivo"
                                            onClick={() => removerObjetivo(objetivo.id)}
                                            aria-label={`Excluir objetivo ${objetivo.nome}`}
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <label className="concluir-objetivo">
                                        <input
                                            type="checkbox"
                                            checked={objetivo.concluido || false}
                                            onChange={() => alternarObjetivo(objetivo.id)}
                                        />
                                        Concluído
                                    </label>
                                </div>

                            ))}

                            <button
                                type="button"
                                className="adicionar-ilha"
                                onClick={() => setMostrarFormularioObjetivo(true)}
                                aria-label="Adicionar objetivo"
                            >
                                +
                            </button>
                        </div>
                    </article>



                    <article className="painel-card tarefas-card">
                        <h3>Tarefas da Semana</h3>

                        <form className="form-tarefa" onSubmit={adicionarTarefa}>
                            <input
                                type="text"
                                placeholder="Digite uma tarefa..."
                                value={novaTarefa}
                                onChange={(event) => setNovaTarefa(event.target.value)}
                            />

                            <button type="submit">+</button>
                        </form>

                        {tarefas.length === 0 ? (
                            <p>Nenhuma tarefa cadastrada ainda.</p>
                        ) : (

                            <div className="lista-tarefas">
                                {tarefas.filter((tarefa) => tarefa.data === dataSelecionada).length === 0 ? (
                                    <p>Nenhuma tarefa para esta data.</p>
                                ) : (
                                    tarefas
                                        .filter((tarefa) => tarefa.data === dataSelecionada)
                                        .map((tarefa) => (
                                            <div className="item-tarefa" key={tarefa.id}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={tarefa.concluida}
                                                        onChange={() => alternarTarefa(tarefa.id)}
                                                    />

                                                    <span className={tarefa.concluida ? "tarefa-concluida" : ""}>
                                                        {tarefa.texto}
                                                    </span>
                                                </label>

                                                <button
                                                    type="button"
                                                    className="remover-tarefa"
                                                    onClick={() => removerTarefa(tarefa.id)}
                                                    aria-label={`Remover ${tarefa.texto}`}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))
                                )}
                            </div>

                        )}
                    </article>

                </section>
            </main>
        </div>
    );
}

export default Painel;
