interface Paginacao {
    pagina: number;
    tamanho: number;
}

interface Pagina<T> {
    paginaAtual: T[];
    totalRegistro: number;
}

function filtrarEPaginar<T> (
    data: T[],
    filterFn: (item: T) => boolean,
    params: Paginacao
): Pagina<T> {

    // Aplicando o predicado dos filtros
    const dadosFiltrados = data.filter(filterFn);
    
    // Paginação
    const pgInicio = (params.pagina - 1) * params.tamanho;
    const pgFim = pgInicio + params.tamanho;
    const itensPaginados = dadosFiltrados.slice(pgInicio, pgFim);
    
    return {
        paginaAtual: itensPaginados,
        totalRegistro: dadosFiltrados.length
    };
}