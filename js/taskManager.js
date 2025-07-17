import { aplicarFiltros } from './filterManager.js';

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

export function adicionarTarefa(descricao, prioridade) {
    if (descricao) {
        tarefas.push({ descricao, prioridade, concluida: false });
        salvarTarefas();
        return true;
    }
    return false;
}

export function concluirTarefa(descricao) {
    tarefas = tarefas.map(tarefa =>
        tarefa.descricao === descricao ? { ...tarefa, concluida: true } : tarefa
    );
    salvarTarefas();
}

export function getTarefas() {
    return [...tarefas];
}

export function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

export function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const dados = JSON.parse(e.target.result);
            if (Array.isArray(dados) && dados.every(t => t.descricao && ['alta', 'media', 'baixa'].includes(t.prioridade))) {
                tarefas = dados.map(t => ({ ...t, concluida: t.concluida ?? false }));
                salvarTarefas();
                aplicarFiltros();
                showToast('Tarefas importadas com sucesso!', 'success');
            } else {
                showToast('Arquivo JSON inválido: cada tarefa deve ter descrição e prioridade válida.', 'danger');
            }
        } catch (error) {
            showToast('Erro ao importar: arquivo JSON inválido.', 'danger');
        }
    };
    reader.readAsText(file);
}

export function exportarJSON() {
    const blob = new Blob([JSON.stringify(tarefas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tarefas exportadas com sucesso!', 'success');
}

function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}