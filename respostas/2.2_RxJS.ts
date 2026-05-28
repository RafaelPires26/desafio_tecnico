// Como precisar ser feito duas buscas em paralelos foi utilizado o forkJoin para
// executar esse processo. 

import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html'
})

export class PessoaComponent implements OnInit {
  texto: Observable<string>;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    const pessoaId = 1;

    this.texto = forkJoin({
      pessoa: this.pessoaService.buscarPorId(pessoaId),
      qtd: this.pessoaService.buscarQuantidadeFamiliares(pessoaId)
    }).pipe(
      map(({ pessoa, qtd }) => `Nome: ${pessoa.nome} | familiares: ${qtd}`)
    );
  }
}