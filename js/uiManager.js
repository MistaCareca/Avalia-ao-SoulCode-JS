import { getTarefas } from './taskManager.js';
import { classePrioridade, formatarPrioridade } from './utils.js';

let showCompleted = false;

export function atualizarTabela() {
    atualizarTabelaComLista(getTarefas().filter(tarefa => tarefa.concluida === showCompleted));
}

export function atualizarTabelaComLista(lista) {
    const tabela = document.getElementById('tabelaTarefas');
    tabela.innerHTML = '';

    const status = document.getElementById('status');
    status.textContent = lista.length === 0 ? 
        (showCompleted ? 'Nenhuma tarefa concluída.' : 'Nenhuma tarefa pendente.') : '';

    lista.forEach(({ descricao, prioridade, concluida }) => {
        const linha = tabela.insertRow();

        const celulaDescricao = linha.insertCell(0);
        const celulaPrioridade = linha.insertCell(1);
        const celulaAcao = linha.insertCell(2);

        celulaDescricao.textContent = descricao;
        celulaPrioridade.innerHTML = `<span class="badge ${classePrioridade(prioridade)}">${formatarPrioridade(prioridade)}</span>`;
        celulaAcao.innerHTML = concluida ? 
            '<span class="text-muted">Concluída</span>' : 
            `<button class="btn btn-success" onclick="concluirTarefa(this)">Concluir</button>`;
    });

    const toggleBtn = document.getElementById('toggleConcluidasBtn');
    if (toggleBtn) {
        toggleBtn.textContent = showCompleted ? 'Mostrar Pendentes' : 'Mostrar Concluídas';
    }
}

export function toggleConcluidas() {
    showCompleted = !showCompleted;
    atualizarTabela();
}

export function fecharModal() {
    const modal = document.getElementById('filtroModal');
    modal?.classList.remove('show');
    document.querySelector('[data-bs-dismiss="modal"]')?.click();
}

export function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}