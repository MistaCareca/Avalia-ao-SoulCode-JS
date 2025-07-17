export function classePrioridade(prioridade) {
    return {
        alta: 'text-bg-danger',
        media: 'text-bg-warning',
        baixa: 'text-bg-success'
    }[prioridade] || '';
}

export function formatarPrioridade(prioridade) {
    return prioridade.charAt(0).toUpperCase() + prioridade.slice(1);
}