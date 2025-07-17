let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTabela() {
    const tabela = document.getElementById('tabelaTarefas');
    tabela.innerHTML = '';

    const status = document.getElementById('status');
    status.textContent = tarefas.length === 0 ? 'Nenhuma tarefa pendente.' : '';

    tarefas.forEach(({ descricao, prioridade }) => {
        const linha = tabela.insertRow();

        const celulaDescricao = linha.insertCell(0);
        const celulaPrioridade = linha.insertCell(1);
        const celulaAcao = linha.insertCell(2);

        celulaDescricao.textContent = descricao;
        celulaPrioridade.innerHTML = `<span class="badge ${classePrioridade(prioridade)}">${formatarPrioridade(prioridade)}</span>`;
        celulaAcao.innerHTML = `<button class="btn btn-success" onclick="concluirTarefa(this)">Concluir</button>`;
    });
}

function adicionarTarefa() {
    const descricao = document.getElementById('tarefaInput').value.trim();
    const prioridade = document.getElementById('prioridadeSelect').value;

    if (descricao) {
        tarefas.push({ descricao, prioridade });
        salvarTarefas();
        document.getElementById('tarefaInput').value = '';
        document.getElementById('prioridadeSelect').value = 'alta';
        aplicarFiltros();
    }
}

function concluirTarefa(botao) {
    const linha = botao.closest('tr');
    const descricao = linha.cells[0].textContent;

    tarefas = tarefas.filter(tarefa => tarefa.descricao !== descricao);
    salvarTarefas();
    aplicarFiltros();
}

function aplicarFiltros() {
    let tarefasFiltradas = [...tarefas];
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

function ordenarPorPrioridade(lista, ordem) {
    const pesos = { baixa: 1, media: 2, alta: 3 };
    const ordenada = [...lista].sort((a, b) => pesos[a.prioridade] - pesos[b.prioridade]);
    return ordem === 'alta' ? ordenada.reverse() : ordenada;
}

function atualizarTabelaComLista(lista) {
    const tabela = document.getElementById('tabelaTarefas');
    tabela.innerHTML = '';

    const status = document.getElementById('status');
    status.textContent = lista.length === 0 ? 'Nenhuma tarefa pendente.' : '';

    lista.forEach(({ descricao, prioridade }) => {
        const linha = tabela.insertRow();

        const celulaDescricao = linha.insertCell(0);
        const celulaPrioridade = linha.insertCell(1);
        const celulaAcao = linha.insertCell(2);

        celulaDescricao.textContent = descricao;
        celulaPrioridade.innerHTML = `<span class="badge ${classePrioridade(prioridade)}">${formatarPrioridade(prioridade)}</span>`;
        celulaAcao.innerHTML = `<button class="btn btn-success" onclick="concluirTarefa(this)">Concluir</button>`;
    });
}

function removerFiltros() {
    document.querySelectorAll('input[name="prioridadeFiltro"], input[name="ordemFiltro"]').forEach(input => input.checked = false);

    tarefas.sort((a, b) => {
        const pesos = { baixa: 1, media: 2, alta: 3 };
        return pesos[b.prioridade] - pesos[a.prioridade];
    });

    atualizarTabela();
    fecharModal();
}

function fecharModal() {
    const modal = document.getElementById('filtroModal');
    modal?.classList.remove('show');
    document.querySelector('[data-bs-dismiss="modal"]')?.click();
}

function classePrioridade(prioridade) {
    return {
        alta: 'text-bg-danger',
        media: 'text-bg-warning',
        baixa: 'text-bg-success'
    }[prioridade] || '';
}

function formatarPrioridade(prioridade) {
    return prioridade.charAt(0).toUpperCase() + prioridade.slice(1);
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function exportarJSON() {
    const blob = new Blob([JSON.stringify(tarefas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importarJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const dados = JSON.parse(e.target.result);
            if (Array.isArray(dados)) {
                tarefas = dados;
                salvarTarefas();
                atualizarTabela();
            }
        } catch (error) {
            alert('Arquivo JSON inválido.');
        }
    };
    reader.readAsText(file);
}

function toggleTheme() {
   document.body.classList.toggle('dark-mode');
}
window.onload = atualizarTabela;
