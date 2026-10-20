import { useRef, useState } from "react";
import "./Painel.css";

function Painel() {
    // Os dados iniciais usam IDs de 1 a 3; novos itens compartilham um contador para evitar colisões entre listas.
    const proximoId = useRef(4);


    const [dataSelecionada, setDataSelecionada] = useState(
        new Date().toLocaleDateString("en-CA")
    );


    function alternarObjetivo(id) {
        setObjetivos((objetivosAtuais) =>
            objetivosAtuais.map((objetivo) =>
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

        // Tarefas sem texto útil não entram na lista.
        if (novaTarefa.trim() === "") {
            return;
        }

        const tarefa = {
            id: proximoId.current++,
            texto: novaTarefa.trim(),
            concluida: false,
            data: dataSelecionada
        };

        setTarefas((tarefasAtuais) => [...tarefasAtuais, tarefa]);
        setNovaTarefa("");
    }


    function alternarTarefa(id) {
        setTarefas((tarefasAtuais) =>
            tarefasAtuais.map((tarefa) =>
                tarefa.id === id
                    ? { ...tarefa, concluida: !tarefa.concluida }
                    : tarefa
            )
        );
    }

    function removerTarefa(id) {
        setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa.id !== id));
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
            id: proximoId.current++,
            nome: novoObjetivo.trim(),
            concluido: false
        };

        setObjetivos((objetivosAtuais) => [...objetivosAtuais, objetivo]);
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
            id: proximoId.current++,
            texto: novaNota,
            concluida: false
        };

        setNotas((notasAtuais) => [...notasAtuais, nota]);
        setNovaNota("");
    }

    function alternarNota(id) {
        setNotas((notasAtuais) =>
            notasAtuais.map((nota) =>
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


    // O calendário filtra a lista visível, enquanto o progresso considera todas as tarefas cadastradas.
    const tarefasDaData = tarefas.filter((tarefa) => tarefa.data === dataSelecionada);
    const totalItens = tarefas.length + objetivos.length;

    const itensConcluidos =
        tarefas.filter((tarefa) => tarefa.concluida).length +
        objetivos.filter((objetivo) => objetivo.concluido).length;

    const progresso =
        totalItens === 0
            ? 0
            : Math.round((itensConcluidos / totalItens) * 100);


    return (
        <div className="min-h-screen bg-farol-dashboard text-farol-text flex max-[600px]:flex-col">
            <aside className="flex w-[190px] shrink-0 flex-col border-r border-farol-sidebar-border bg-farol-sidebar px-3.5 py-5 max-[950px]:w-[155px] max-[600px]:w-full max-[600px]:p-3">
                <div className="mb-[35px] flex items-center gap-2.5 max-[600px]:mb-3">
                    <div className="grid size-[38px] place-items-center rounded-full bg-farol-primary text-farol-accent">✦</div>
                    <h2 className="text-xl">Farol</h2>
                </div>

                <nav className="dashboard-nav grid gap-2.5">
                    <a className="dashboard-nav-link dashboard-nav-active" href="#inicio">⌂ Início</a>
                    <a className="dashboard-nav-link" href="#objetivos">◎ Objetivos</a>
                    <a className="dashboard-nav-link" href="#mapas">♧ Mapas</a>
                    <a className="dashboard-nav-link" href="#anotacoes">☷ Anotações</a>
                    <a className="dashboard-nav-link" href="#calendario">▦ Calendário</a>
                    <a className="dashboard-nav-link" href="#mentoria">♙ Mentoria</a>
                </nav>

                <div className="mt-auto grid justify-items-center gap-2.5 rounded-xl bg-farol-dashboard-card px-2.5 py-5 max-[600px]:hidden">
                    <div className="text-[42px] text-farol-accent">⚑</div>
                    <strong>7 dias</strong>
                </div>

                <button className="dashboard-nav-link mt-3 cursor-pointer text-left max-[600px]:hidden">
                    ⚙ Configuração
                </button>
            </aside>

            <main className="min-w-0 flex-1 p-[22px] max-[600px]:p-3.5" id="inicio">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="m-0 text-[26px]">Início</h1>
                    <div className="grid size-9 place-items-center rounded-full bg-farol-primary">R</div>
                </header>

                <section className="mb-4 flex items-center justify-between gap-5 rounded-[18px] bg-farol-dashboard-card px-6 py-5 max-[600px]:items-start max-[600px]:flex-col">
                    <div>
                        <h2 className="mb-3 mt-0 text-[22px]">Olá, visitante!</h2>
                        <p className="text-xs text-farol-muted">
                            “Qualquer ideia é estupidamente útil”
                        </p>
                    </div>

                    <div className="grid gap-3.5 text-right max-[600px]:text-left">
                        <strong>Minha jornada começa hoje.</strong>
                        <span className="text-xs text-farol-muted">Bom dia! ☀️</span>
                    </div>
                </section>

                <section className="grid grid-cols-[1.2fr_1fr_1fr] gap-3.5 max-[950px]:grid-cols-2 max-[600px]:grid-cols-1">

                    <article className="painel-card min-w-0 p-4" id="anotacoes">
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

                        <form className="form-nota mb-3 flex gap-1.5" onSubmit={adicionarNota}>
                            <input
                                id="campo-nota"
                                type="text"
                                placeholder="Escreva uma nova nota..."
                                value={novaNota}
                                onChange={(event) => setNovaNota(event.target.value)}
                            />

                            <button type="submit">Adicionar</button>
                        </form>

                        <div className="grid gap-2">
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





                    <article className="painel-card min-w-0 p-4" id="calendario">
                        <h3>Minha semana</h3>
                        <p className="text-xs leading-relaxed text-farol-muted">Organize seu tempo e suas prioridades.</p>

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

                        <p className="text-xs leading-relaxed text-farol-muted">Data selecionada: {dataSelecionada}</p>
                    </article>




                    <article className="painel-card min-w-0 p-4 text-center" id="objetivos">
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

                        <p className="text-xs leading-relaxed text-farol-muted">
                            {totalItens === 0
                                ? "Comece adicionando seu primeiro objetivo."
                                : `Você concluiu ${itensConcluidos} de ${totalItens} itens.`}
                        </p>
                    </article>



                    <article className="painel-card col-span-2 min-w-0 p-4 max-[950px]:col-span-1" id="mapas">
                        <h3>Minhas Ilhas</h3>

                        {mostrarFormularioObjetivo && (
                            <form
                                className="form-objetivo mb-4 flex flex-wrap gap-2"
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

                        <div className="flex flex-wrap gap-3">
                            {objetivos.map((objetivo) => (

                                <div
                                    className={`ilha ${objetivo.concluido ? "ilha-concluida" : ""}`}
                                    key={objetivo.id}
                                >
                                    <div className="flex min-w-0 flex-1 items-center justify-between gap-2.5">
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

                                    <label className="mt-2.5 flex cursor-pointer items-center gap-1.5 text-[13px]">
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
                                className="w-[75px] cursor-pointer rounded-[14px] border-2 border-farol-primary bg-transparent text-[32px] text-farol-primary"
                                onClick={() => setMostrarFormularioObjetivo(true)}
                                aria-label="Adicionar objetivo"
                            >
                                +
                            </button>
                        </div>
                    </article>



                    <article className="painel-card min-w-0 p-4">
                        <h3>Tarefas da Semana</h3>

                        <form className="form-tarefa mb-3.5 flex gap-2" onSubmit={adicionarTarefa}>
                            <input
                                type="text"
                                placeholder="Digite uma tarefa..."
                                value={novaTarefa}
                                onChange={(event) => setNovaTarefa(event.target.value)}
                            />

                            <button type="submit">+</button>
                        </form>

                        {tarefasDaData.length === 0 ? (
                            <p className="text-xs leading-relaxed text-farol-muted">
                                {tarefas.length === 0
                                    ? "Nenhuma tarefa cadastrada ainda."
                                    : "Nenhuma tarefa para esta data."}
                            </p>
                        ) : (
                            <div className="grid gap-2">
                                {tarefasDaData.map((tarefa) => (
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
                                ))}
                            </div>

                        )}
                    </article>

                </section>
            </main>
        </div>
    );
}

export default Painel;
