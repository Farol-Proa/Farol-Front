import { useRef, useState } from 'react';
import './Painel.css';

function Painel({ onAbrirIlha }) {
  // Os dados iniciais usam IDs de 1 a 3; novos itens compartilham um contador para evitar colisões entre listas.
  const proximoId = useRef(4);

  const [dataSelecionada, setDataSelecionada] = useState(new Date().toLocaleDateString('en-CA'));
  const [mesExibido, setMesExibido] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  });

  function mudarMes(diferenca) {
    setMesExibido(
      (mesAtual) => new Date(mesAtual.getFullYear(), mesAtual.getMonth() + diferenca, 1),
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
        String(data.getMonth() + 1).padStart(2, '0'),
        String(data.getDate()).padStart(2, '0'),
      ].join('-');

      dias.push({
        dia,
        dataFormatada,
      });
    }

    return dias;
  }

  function alternarObjetivo(id) {
    setObjetivos((objetivosAtuais) =>
      objetivosAtuais.map((objetivo) =>
        objetivo.id === id ? { ...objetivo, concluido: !objetivo.concluido } : objetivo,
      ),
    );
  }

  function removerObjetivo(id) {
    setObjetivos((objetivosAtuais) => objetivosAtuais.filter((objetivo) => objetivo.id !== id));
  }

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [novoHorario, setNovoHorario] = useState('09:00');
  const [novaPrioridade, setNovaPrioridade] = useState('Média');

  function adicionarTarefa(event) {
    event.preventDefault();

    // Tarefas sem texto útil não entram na lista.
    if (novaTarefa.trim() === '') {
      return;
    }

    const tarefa = {
      id: proximoId.current++,
      texto: novaTarefa.trim(),
      concluida: false,
      data: dataSelecionada,
      horario: novoHorario,
      prioridade: novaPrioridade,
    };

    setTarefas((tarefasAtuais) => [...tarefasAtuais, tarefa]);
    setNovaTarefa('');
    setNovoHorario('09:00');
    setNovaPrioridade('Média');
  }

  function alternarTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  function removerTarefa(id) {
    setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa.id !== id));
  }

  const [objetivos, setObjetivos] = useState([
    {
      id: 1,
      nome: 'Meu primeiro objetivo',
      concluido: false,
      etapas: [
        { id: 1, texto: 'Primeira etapa', concluida: false },
        { id: 2, texto: 'Segunda etapa', concluida: false },
      ],
    },
  ]);

  const [novoObjetivo, setNovoObjetivo] = useState('');
  const [novaEtapa, setNovaEtapa] = useState('');
  const [mostrarFormularioObjetivo, setMostrarFormularioObjetivo] = useState(false);

  function adicionarObjetivo(event) {
    event.preventDefault();

    if (novoObjetivo.trim() === '') {
      return;
    }

    const objetivo = {
      id: proximoId.current++,
      nome: novoObjetivo.trim(),
      concluido: false,
      etapas: [],
    };

    setObjetivos((objetivosAtuais) => [...objetivosAtuais, objetivo]);
    setNovoObjetivo('');
    setMostrarFormularioObjetivo(false);
  }

  function adicionarEtapa(idObjetivo) {
    if (novaEtapa.trim() === '') {
      return;
    }

    setObjetivos((objetivosAtuais) =>
      objetivosAtuais.map((objetivo) => {
        if (objetivo.id === idObjetivo) {
          return {
            ...objetivo,
            etapas: [
              ...objetivo.etapas,
              {
                id: proximoId.current++,
                texto: novaEtapa.trim(),
                concluida: false,
              },
            ],
          };
        }

        return objetivo;
      }),
    );

    setNovaEtapa('');
  }

  function alternarEtapa(idObjetivo, idEtapa) {
    setObjetivos((objetivosAtuais) =>
      objetivosAtuais.map((objetivo) => {
        if (objetivo.id === idObjetivo) {
          return {
            ...objetivo,
            etapas: objetivo.etapas.map((etapa) => {
              if (etapa.id === idEtapa) {
                return {
                  ...etapa,
                  concluida: !etapa.concluida,
                };
              }

              return etapa;
            }),
          };
        }

        return objetivo;
      }),
    );
  }

  function excluirEtapa(idObjetivo, idEtapa) {
    setObjetivos((objetivosAtuais) =>
      objetivosAtuais.map((objetivo) => {
        if (objetivo.id === idObjetivo) {
          return {
            ...objetivo,
            etapas: objetivo.etapas.filter((etapa) => etapa.id !== idEtapa),
          };
        }

        return objetivo;
      }),
    );
  }

  function calcularProgressoIlha(objetivo) {
    if (!objetivo.etapas || objetivo.etapas.length === 0) {
      return 0;
    }

    const etapasConcluidas = (objetivo.etapas || []).filter((etapa) => etapa.concluida).length;

    return Math.round((etapasConcluidas / objetivo.etapas.length) * 100);
  }

  const [notas, setNotas] = useState([
    { id: 1, texto: 'Revisar resumo do TCC', concluida: true },
    { id: 2, texto: 'Enviar e-mail para o orientador', concluida: false },
    { id: 3, texto: 'Consolidar anotações da semana', concluida: false },
  ]);

  const [novaNota, setNovaNota] = useState('');

  function adicionarNota(event) {
    event.preventDefault();

    if (novaNota.trim() === '') {
      return;
    }

    const nota = {
      id: proximoId.current++,
      texto: novaNota,
      concluida: false,
    };

    setNotas((notasAtuais) => [...notasAtuais, nota]);
    setNovaNota('');
  }

  function alternarNota(id) {
    setNotas((notasAtuais) =>
      notasAtuais.map((nota) => (nota.id === id ? { ...nota, concluida: !nota.concluida } : nota)),
    );
  }

  function removerNota(id) {
    setNotas((notasAtuais) => notasAtuais.filter((nota) => nota.id !== id));
  }

  // O calend?rio filtra tarefas por data; o progresso geral considera tarefas e etapas.
  const tarefasDaData = tarefas.filter((tarefa) => tarefa.data === dataSelecionada);

  const totalEtapas = objetivos.reduce(
    (total, objetivo) => total + (objetivo.etapas || []).length,
    0,
  );

  const etapasConcluidas = objetivos.reduce(
    (total, objetivo) => total + (objetivo.etapas || []).filter((etapa) => etapa.concluida).length,
    0,
  );

  const totalItens = tarefas.length + totalEtapas;

  const itensConcluidos = tarefas.filter((tarefa) => tarefa.concluida).length + etapasConcluidas;

  const progresso = totalItens === 0 ? 0 : Math.round((itensConcluidos / totalItens) * 100);

  return (
    <div className="min-h-screen bg-farol-dashboard text-farol-text flex max-[600px]:flex-col">
      <aside className="flex w-[190px] shrink-0 flex-col border-r border-farol-sidebar-border bg-farol-sidebar px-3.5 py-5 max-[950px]:w-[155px] max-[600px]:w-full max-[600px]:p-3">
        <div className="mb-[35px] flex items-center gap-2.5 max-[600px]:mb-3">
          <div className="grid size-[38px] place-items-center rounded-full bg-farol-primary text-farol-accent">
            ✦
          </div>
          <h2 className="text-xl">Farol</h2>
        </div>

        <nav className="dashboard-nav grid gap-2.5">
          <a className="dashboard-nav-link dashboard-nav-active" href="#inicio">
            ⌂ Início
          </a>
          <a className="dashboard-nav-link" href="#objetivos">
            ◎ Objetivos
          </a>
          <a className="dashboard-nav-link" href="#mapas">
            ♧ Mapas
          </a>
          <a className="dashboard-nav-link" href="#anotacoes">
            ☷ Anotações
          </a>
          <a className="dashboard-nav-link" href="#calendario">
            ▦ Calendário
          </a>
          <a className="dashboard-nav-link" href="#mentoria">
            ♙ Mentoria
          </a>
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
            <p className="text-xs text-farol-muted">“Qualquer ideia é estupidamente útil”</p>
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
                onClick={() => document.getElementById('campo-nota')?.focus()}
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
                <div className={`nota ${nota.concluida ? 'nota-concluida' : ''}`} key={nota.id}>
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
            <h3>Meu calend?rio</h3>
            <p className="text-xs leading-relaxed text-farol-muted">
              Organize seu tempo e suas prioridades.
            </p>

            <div className="navegacao-mes">
              <button type="button" onClick={() => mudarMes(-1)} aria-label="Mês anterior">
                ‹
              </button>

              <strong>
                {mesExibido.toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>

              <button type="button" onClick={() => mudarMes(1)} aria-label="Próximo mês">
                ›
              </button>
            </div>

            <div className="calendario-mensal">
              {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((dia) => (
                <strong className="nome-dia" key={dia}>
                  {dia}
                </strong>
              ))}

              {obterDiasDoMes().map((item, indice) => {
                if (item === null) {
                  return <div className="dia-vazio" key={`vazio-${indice}`} />;
                }

                const temTarefa = tarefas.some((tarefa) => tarefa.data === item.dataFormatada);

                return (
                  <button
                    type="button"
                    key={item.dataFormatada}
                    className={`dia ${
                      dataSelecionada === item.dataFormatada ? 'dia-selecionado' : ''
                    }`}
                    onClick={() => setDataSelecionada(item.dataFormatada)}
                  >
                    <span>{item.dia}</span>

                    {temTarefa && <span className="dia-com-tarefa"></span>}
                  </button>
                );
              })}
            </div>

            <p className="text-xs leading-relaxed text-farol-muted">
              Data selecionada: {dataSelecionada}
            </p>
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
                ? 'Comece adicionando seu primeiro objetivo.'
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

                <button type="button" onClick={() => setMostrarFormularioObjetivo(false)}>
                  Cancelar
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-3">
              {objetivos.map((objetivo) => (
                <div
                  className={`ilha ${objetivo.concluido ? 'ilha-concluida' : ''}`}
                  key={objetivo.id}
                >
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2.5">
                    <button
                      type="button"
                      className="cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
                      onClick={() => onAbrirIlha(objetivo)}
                    >
                      {objetivo.nome}
                    </button>

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

                  <div className="progresso-ilha">
                    <div className="progresso-ilha-info">
                      <span>Progresso</span>
                      <span>{calcularProgressoIlha(objetivo)}%</span>
                    </div>

                    <progress value={calcularProgressoIlha(objetivo)} max="100" />
                  </div>

                  <form
                    className="form-etapa"
                    onSubmit={(event) => {
                      event.preventDefault();
                      adicionarEtapa(objetivo.id);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Digite uma etapa..."
                      value={novaEtapa}
                      onChange={(event) => setNovaEtapa(event.target.value)}
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
                            onChange={() => alternarEtapa(objetivo.id, etapa.id)}
                          />

                          <span className={etapa.concluida ? 'etapa-concluida' : ''}>
                            {etapa.texto}
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => excluirEtapa(objetivo.id, etapa.id)}
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

            <form className="form-tarefa mb-3.5 flex flex-wrap gap-2" onSubmit={adicionarTarefa}>
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

            {tarefasDaData.length === 0 ? (
              <p className="text-xs leading-relaxed text-farol-muted">
                {tarefas.length === 0
                  ? 'Nenhuma tarefa cadastrada ainda.'
                  : 'Nenhuma tarefa para esta data.'}
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

                      <span className={tarefa.concluida ? 'tarefa-concluida' : ''}>
                        {tarefa.texto}
                        <small className="mt-1 block text-xs text-farol-muted">
                          {tarefa.horario} &middot; Prioridade {tarefa.prioridade}
                        </small>
                      </span>
                    </label>

                    <button
                      type="button"
                      className="remover-tarefa"
                      onClick={() => removerTarefa(tarefa.id)}
                      aria-label={`Remover ${tarefa.texto}`}
                    >
                      ?
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
