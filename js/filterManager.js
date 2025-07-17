import { getTarefas } from './taskManager.js';
import { atualizarTabelaComLista, fecharModal } from './uiManager.js';

export function aplicarFiltros() {
    let tarefasFiltradas = getTarefas().filter(tarefa => !tarefa.concluida);
    const prioridadeFiltro = document.querySelector('input[name="prioridadeFiltro"]:checked')?.value;
    const ordemFiltro = document.querySelector('input[name="ordemFiltro"]:checked')?.value;

    if (prioridadeFiltro) {
        tarefasFiltradas = ordenarPorPrioridade(tarefasFiltradas, prioridadeFiltro);
    }

    if (ordemFiltro === 'alfabetica') {
        tarefasFiltradas.sort((a, b) => a.descricao.localeCompare(b.descricao));
    }

    atualizarTabelaComLista(tarefasFiltradas);
    fecharModal();
}

export function removerFiltros() {
    document.querySelectorAll('input[name="prioridadeFiltro"], input[name="ordemFiltro"]').forEach(input => input.checked = false);

    const tarefas = getTarefas().filter(tarefa => !tarefa.concluida).sort((a, b) => {
        const pesos = { baixa: 1, media: 2, alta: 3 };
        return pesos[b.prioridade] - pesos[a.prioridade];
    });

    atualizarTabelaComLista(tarefas);
    fecharModal();
}

function ordenarPorPrioridade(lista, ordem) {
    const pesos = { baixa: 1, media: 2, alta: 3 };
    const ordenada = [...lista].sort((a, b) => pesos[a.prioridade] - pesos[b.prioridade]);
    return ordem === 'alta' ? ordenada.reverse() : ordenada;
}