let tarefas = [
    ["dado mokado 3", "baixa"],
    ["dado mokado 2", "media"],
    ["dado mokado 1", "alta"]
];

function atualizarTabela() {
    const tabela = document.getElementById('tabelaTarefas');
    tabela.innerHTML = '';
    if (tarefas.length === 0) {
        document.getElementById('status').textContent = 'Nenhuma tarefa pendente.';
    } else {
        document.getElementById('status').textContent = '';
    }
    tarefas.forEach(tarefa => {
        const novaLinha = tabela.insertRow();
        const celulaTarefa = novaLinha.insertCell(0);
        const celulaPrioridade = novaLinha.insertCell(1);
        const celulaAcao = novaLinha.insertCell(2);

        celulaTarefa.textContent = tarefa[0];
        let badgeClass = '';
        switch (tarefa[1]) {
            case 'alta': badgeClass = 'badge text-bg-danger'; break;
            case 'media': badgeClass = 'badge text-bg-warning'; break;
            case 'baixa': badgeClass = 'badge text-bg-success'; break;
        }
        celulaPrioridade.innerHTML = `<span class="${badgeClass}">${tarefa[1].charAt(0).toUpperCase() + tarefa[1].slice(1)}</span>`;
        celulaAcao.innerHTML = '<button class="btn btn-success" onclick="concluirTarefa(this)">Concluir</button>';
    });
}

function adicionarTarefa() {
    const tarefaInput = document.getElementById('tarefaInput').value;
    const prioridadeSelect = document.getElementById('prioridadeSelect').value;
    if (tarefaInput) {
        tarefas.push([tarefaInput, prioridadeSelect]);
        document.getElementById('tarefaInput').value = '';
        document.getElementById('prioridadeSelect').value = 'alta';
        atualizarTabela();
    }
}

function concluirTarefa(botao) {
    const linha = botao.parentElement.parentElement;
    const tarefaTexto = linha.cells[0].textContent;
    tarefas = tarefas.filter(t => t[0] !== tarefaTexto);
    atualizarTabela();
}

function ordenarTarefas() {
    tarefas.sort((a, b) => {
        const prioridadeOrder = { 'alta': 3, 'media': 2, 'baixa': 1 };
        return prioridadeOrder[b[1]] - prioridadeOrder[a[1]];
    });
    atualizarTabela();
}