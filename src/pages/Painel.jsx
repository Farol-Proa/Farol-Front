import { useState } from "react";
import "./Painel.css";

function Painel({ onAbrirIlha }) {


    const [dataSelecionada, setDataSelecionada] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [mesExibido, setMesExibido] = useState(() => {
        const hoje = new Date();
        return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    });

    function mudarMes(diferenca) {
        setMesExibido((mesAtual) =>
            new Date(
                mesAtual.getFullYear(),
                mesAtual.getMonth() + diferenca,
                1
            )
        );
    }

    function obterDiasDoMes() {
        const ano = mesExibido.getFullYear();
        const mes = mesExibido.getMonth();

        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0);

        const diasAntes = (primeiroDia.getDay() + 6) % 7;
        const totalDias = ultimoDia.getDate();

        const dias = [];

        for (let i = 0; i < diasAntes; i++) {
            dias.push(null);
        }

        for (let dia = 1; dia <= totalDias; dia++) {
            const data = new Date(ano, mes, dia);

            const dataFormatada = [
                data.getFullYear(),
                String(data.getMonth() + 1).padStart(2, "0"),
                String(data.getDate()).padStart(2, "0")
            ].join("-");

            dias.push({
                dia,
                dataFormatada
            });
        }

        return dias;
    }

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
    const [novoHorario, setNovoHorario] = useState("09:00");
    const [novaPrioridade, setNovaPrioridade] = useState("Média");



    function adicionarTarefa(event) {
        event.preventDefault();

        if (novaTarefa.trim() === "") {
            return;
        }

        const tarefa = {
            id: Date.now(),
            texto: novaTarefa.trim(),
            concluida: false,
            data: dataSelecionada,
            horario: novoHorario,
            prioridade: novaPrioridade
        };

        setTarefas((tarefasAtuais) => [...tarefasAtuais, tarefa]);

        setNovaTarefa("");
        setNovoHorario("09:00");
        setNovaPrioridade("Média");
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
        {
            id: 1,
            nome: "Meu primeiro objetivo",
            concluido: false,
            etapas: [
                { id: 1, texto: "Primeira etapa", concluida: false },
                { id: 2, texto: "Segunda etapa", concluida: false }
            ]
        }
    ]);

    const [novoObjetivo, setNovoObjetivo] = useState("");
    const [novaEtapa, setNovaEtapa] = useState("");
    const [mostrarFormularioObjetivo, setMostrarFormularioObjetivo] = useState(false);

    function adicionarObjetivo(event) {
        event.preventDefault();

        if (novoObjetivo.trim() === "") {
            return;
        }

        const objetivo = {
            id: Date.now(),
            nome: novoObjetivo.trim(),
            concluido: false,
            etapas: []
        };

        setObjetivos([...objetivos, objetivo]);
        setNovoObjetivo("");
        setMostrarFormularioObjetivo(false);
    }

    function adicionarEtapa(idObjetivo) {
        if (novaEtapa.trim() === "") {
            return;
        }

        setObjetivos(
            objetivos.map((objetivo) => {
                if (objetivo.id === idObjetivo) {
                    return {
                        ...objetivo,
                        etapas: [
                            ...objetivo.etapas,
                            {
                                id: Date.now(),
                                texto: novaEtapa.trim(),
                                concluida: false
                            }
                        ]
                    };
                }

                return objetivo;
            })
        );

        setNovaEtapa("");
    }

    function alternarEtapa(idObjetivo, idEtapa) {
        setObjetivos(
            objetivos.map((objetivo) => {
                if (objetivo.id === idObjetivo) {
                    return {
                        ...objetivo,
                        etapas: objetivo.etapas.map((etapa) => {
                            if (etapa.id === idEtapa) {
                                return {
                                    ...etapa,
                                    concluida: !etapa.concluida
                                };
                            }

                            return etapa;
                        })
                    };
                }

                return objetivo;
            })
        );
    }

    function excluirEtapa(idObjetivo, idEtapa) {
        setObjetivos(
            objetivos.map((objetivo) => {
                if (objetivo.id === idObjetivo) {
                    return {
                        ...objetivo,
                        etapas: objetivo.etapas.filter(
                            (etapa) => etapa.id !== idEtapa
                        )
                    };
                }

                return objetivo;
            })
        );
    }

    function calcularProgressoIlha(objetivo) {
        if (!objetivo.etapas || objetivo.etapas.length === 0) {
            return 0;
        }

        const etapasConcluidas = (objetivo.etapas || []).filter(
            (etapa) => etapa.concluida
        ).length;

        return Math.round(
            (etapasConcluidas / objetivo.etapas.length) * 100
        );
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


    const totalEtapas = objetivos.reduce(
        (total, objetivo) => total + objetivo.etapas.length,
        0
    );

    const etapasConcluidas = objetivos.reduce(
        (total, objetivo) =>
            total + objetivo.etapas.filter((etapa) => etapa.concluida).length,
        0
    );

    const totalItens = tarefas.length + totalEtapas;

    const itensConcluidos =
        tarefas.filter((tarefa) => tarefa.concluida).length +
        etapasConcluidas;

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
                        <h3>Meu calendário</h3>
                        <p>Organize seu tempo e suas prioridades.</p>

                        <div className="navegacao-mes">
                            <button
                                type="button"
                                onClick={() => mudarMes(-1)}
                                aria-label="Mês anterior"
                            >
                                ‹
                            </button>

                            <strong>
                                {mesExibido.toLocaleDateString("pt-BR", {
                                    month: "long",
                                    year: "numeric"
                                })}
                            </strong>

                            <button
                                type="button"
                                onClick={() => mudarMes(1)}
                                aria-label="Próximo mês"
                            >
                                ›
                            </button>
                        </div>

                        <div className="calendario-mensal">
                            {["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"].map((dia) => (
                                <strong className="nome-dia" key={dia}>
                                    {dia}
                                </strong>
                            ))}

                            {obterDiasDoMes().map((item, indice) => {
                                if (item === null) {
                                    return (
                                        <div
                                            className="dia-vazio"
                                            key={`vazio-${indice}`}
                                        />
                                    );
                                }

                                const temTarefa = tarefas.some(
                                    (tarefa) => tarefa.data === item.dataFormatada
                                );

                                return (
                                    <button
                                        type="button"
                                        key={item.dataFormatada}
                                        className={`dia ${dataSelecionada === item.dataFormatada
                                            ? "dia-selecionado"
                                            : ""
                                            }`}
                                        onClick={() => setDataSelecionada(item.dataFormatada)}
                                    >
                                        <span>{item.dia}</span>

                                        {temTarefa && (
                                            <span className="dia-com-tarefa"></span>
                                        )}
                                    </button>
                                );
                            })}
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
                                    onChange={(event) =>
                                        setNovoObjetivo(event.target.value)
                                    }
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
                                    onClick={() => onAbrirIlha(objetivo)}
                                >
                                    <div className="ilha-info">
                                        <span>{objetivo.nome}</span>

                                        <button
                                            type="button"
                                            className="remover-objetivo"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                removerObjetivo(objetivo.id);
                                            }}
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

                                    <div className="progresso-ilha">
                                        <div className="progresso-ilha-info">
                                            <span>Progresso</span>
                                            <span>{calcularProgressoIlha(objetivo)}%</span>
                                        </div>

                                        <progress
                                            value={calcularProgressoIlha(objetivo)}
                                            max="100"
                                        />
                                    </div>

                                    <form
                                        className="form-etapa"
                                        onClick={(event) => event.stopPropagation()}
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            adicionarEtapa(objetivo.id);
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Digite uma etapa..."
                                            value={novaEtapa}
                                            onChange={(event) =>
                                                setNovaEtapa(event.target.value)
                                            }
                                        />

                                        <button type="submit">Adicionar etapa</button>
                                    </form>

                                    <div className="lista-etapas">
                                        {objetivo.etapas.map((etapa) => (
                                            <div className="item-etapa" key={etapa.id}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={etapa.concluida}
                                                        onChange={() =>
                                                            alternarEtapa(objetivo.id, etapa.id)
                                                        }
                                                    />

                                                    <span
                                                        className={
                                                            etapa.concluida
                                                                ? "etapa-concluida"
                                                                : ""
                                                        }
                                                    >
                                                        {etapa.texto}
                                                    </span>
                                                </label>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        excluirEtapa(objetivo.id, etapa.id)
                                                    }
                                                    aria-label={`Excluir etapa ${etapa.texto}`}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
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

                            <input
                                type="time"
                                value={novoHorario}
                                onChange={(event) => setNovoHorario(event.target.value)}
                                aria-label="Horário da tarefa"
                            />

                            <select
                                value={novaPrioridade}
                                onChange={(event) => setNovaPrioridade(event.target.value)}
                                aria-label="Prioridade da tarefa"
                            >
                                <option value="Baixa">Baixa prioridade</option>
                                <option value="Média">Média prioridade</option>
                                <option value="Alta">Alta prioridade</option>
                            </select>

                            <button type="submit">Adicionar</button>
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
                                                        <small>
                                                            {tarefa.horario} · Prioridade {tarefa.prioridade}
                                                        </small>
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
