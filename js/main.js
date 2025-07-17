import { adicionarTarefa, concluirTarefa, importarJSON, exportarJSON } from './taskManager.js';
import { atualizarTabela, toggleConcluidas, toggleTheme } from './uiManager.js';
import { aplicarFiltros, removerFiltros } from './filterManager.js';

window.concluirTarefa = function(botao) {
    const linha = botao?.closest('tr');
    if (!linha || !linha.cells[0]) {
        console.error('Erro: Não foi possível encontrar a linha ou célula da tarefa.');
        return;
    }
    const descricao = linha.cells[0].textContent;
    concluirTarefa(descricao);
    aplicarFiltros();
};

window.adicionarTarefa = function() {
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

    if (adicionarTarefa(descricao, prioridade)) {
        tarefaInput.value = '';
        prioridadeSelect.value = 'alta';
        aplicarFiltros();
    }
};

window.aplicarFiltros = aplicarFiltros;
window.removerFiltros = removerFiltros;
window.importarJSON = importarJSON;
window.exportarJSON = exportarJSON;
window.toggleTheme = toggleTheme;
window.toggleConcluidas = toggleConcluidas;

window.onload = atualizarTabela;