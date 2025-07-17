import { adicionarTarefa, concluirTarefa, importarJSON, exportarJSON } from './taskManager.js';
import { atualizarTabela, toggleConcluidas, toggleTheme } from './uiManager.js';
import { aplicarFiltros, removerFiltros } from './filterManager.js';
import { formatarPrioridade } from './utils.js';

let tarefaPendente = null;

window.mostrarConfirmacaoAdicionar = function() {
    const tarefaInput = document.getElementById('tarefaInput');
    const prioridadeSelect = document.getElementById('prioridadeSelect');
    
    if (!tarefaInput || !prioridadeSelect) {
        console.error('Erro: Elementos de entrada não encontrados.');
        return;
    }

    const descricao = tarefaInput.value.trim();
    const prioridade = prioridadeSelect.value;
    
    const validPriorities = ['alta', 'media', 'baixa'];
    if (!descricao) {
        console.error('Erro: Descrição da tarefa é obrigatória.');
        return;
    }
    if (!validPriorities.includes(prioridade)) {
        console.error('Erro: Prioridade inválida.');
        return;
    }

    tarefaPendente = { descricao, prioridade };
    document.getElementById('tarefaDescricao').textContent = descricao;
    document.getElementById('tarefaPrioridade').textContent = formatarPrioridade(prioridade);
    
    const modal = new bootstrap.Modal(document.getElementById('confirmarAdicionarModal'));
    modal.show();
};

window.confirmarAdicionar = function() {
    if (tarefaPendente) {
        if (adicionarTarefa(tarefaPendente.descricao, tarefaPendente.prioridade)) {
            document.getElementById('tarefaInput').value = '';
            document.getElementById('prioridadeSelect').value = 'alta';
            aplicarFiltros();
        }
        tarefaPendente = null;
        bootstrap.Modal.getInstance(document.getElementById('confirmarAdicionarModal')).hide();
    }
};

window.concluirTarefa = function(botao) {
    const linha = botao?.closest('tr');
    if (!linha || !linha.cells[0]) {
        console.error('Erro: Não foi possível encontrar a linha ou célula da tarefa.');
        return;
    }
    const descricao = linha.cells[0].textContent;
    tarefaPendente = { descricao };
    document.getElementById('concluirTarefaDescricao').textContent = descricao;
    
    const modal = new bootstrap.Modal(document.getElementById('confirmarConcluirModal'));
    modal.show();
};

window.confirmarConcluir = function() {
    if (tarefaPendente) {
        concluirTarefa(tarefaPendente.descricao);
        aplicarFiltros();
        tarefaPendente = null;
        bootstrap.Modal.getInstance(document.getElementById('confirmarConcluirModal')).hide();
    }
};

window.aplicarFiltros = aplicarFiltros;
window.removerFiltros = removerFiltros;
window.importarJSON = importarJSON;
window.exportarJSON = exportarJSON;
window.toggleTheme = toggleTheme;
window.toggleConcluidas = toggleConcluidas;

window.onload = atualizarTabela;