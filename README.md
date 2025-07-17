# Avalia-ao-SoulCode-JS

Uma aplicação de gerenciamento de tarefas com visual moderno, tema claro/escuro, filtros inteligentes e suporte a exportação/importação de tarefas via JSON.

---

## 🎨 Paleta de Cores

| Cor         | Hex      | Uso                      |
|-------------|----------|--------------------------|
| Primária    | `#6C63FF`| Destaques e botões       |
| Fundo Claro | `#F7F7F7`| Tema claro               |
| Fundo Escuro| `#252525`| Tema escuro              |
| Texto Sec.  | `#666666`| Ícones e descrições      |

---

## 🔧 Funcionalidades

- ✅ Adicionar e remover tarefas
- ✅ Marcar como concluída
- ✅ Filtros por prioridade e ordem alfabética
- ✅ Alternância entre tema claro e escuro
- ✅ Armazenamento local com `localStorage`
- ✅ Exportação e importação de dados via JSON
- ✅ UI com Bootstrap e badges de prioridade

---

## 📦 Instalação

1. Baixe os arquivos ou clone o repositório:

```bash
git clone https://github.com/seuusuario/tarefa-app-modern.git
```

2. Abra o `index.html` em um navegador moderno.

---

## 📁 Exportar & Importar Tarefas

### Exportar
Clique no botão **Exportar JSON** para baixar as tarefas salvas em um arquivo `.json`.

### Importar
Use o input de arquivo para importar um `.json` com a estrutura:

```json
[
  { "descricao": "Estudar React", "prioridade": "alta" },
  { "descricao": "Lavar louça", "prioridade": "baixa" }
]
```

---

## 🧠 Tecnologias Usadas

- HTML, CSS, JavaScript
- Bootstrap 5
- `localStorage` para persistência local
- Manipulação de arquivos com `Blob` e `FileReader`
