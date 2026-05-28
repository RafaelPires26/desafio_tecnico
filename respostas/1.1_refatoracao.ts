class Produto {

    constructor(
        public id : number,
        public descricao : string,
        public quantidadeEstoque : number
    ) {}
}

class Verdureira {
    private produtos: Produto[];

    constructor() {
        this.produtos = [
            new Produto(1, 'Maçã', 20),
            new Produto(2, 'Laranja', 0),
            new Produto(3, 'Limão', 20)
        ];
    }
    
    // api que validar se o produto está cadastrado no sistema
    public getDescricaoProduto(produtoId: any) : string {
        let msg = 'Produto não encontrado';
        const resProduto = this.validaProdutoID(produtoId);

        if(resProduto) {
            msg = `${resProduto.id} - ${resProduto.descricao} (${resProduto.quantidadeEstoque}x)`;
        }
        
        return msg;
    }

    // api que valida se o produto está cadastrado no sistema e se tem no estoque
    public hasEstoqueProduto(produtoId: any) : boolean {
        const estoqueProduto = this.validaProdutoID(produtoId);
        return (estoqueProduto?.quantidadeEstoque ?? 0) > 0;
    }

    // api que valida se tem o produto selecionado na array produtos comparando pelo id do produto
    private validaProdutoID(produtoId: number) : Produto | undefined {
        return this.produtos.find(prod => prod.id === produtoId);
    }
}