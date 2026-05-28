import { ChangeDetectionStrategy, Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
class PessoaService {
  /** @description Mock de uma busca em API com retorno em 0.5 segundos */
  buscarPorId(id: number) {
    return of({ id, nome: 'João' }).pipe(delay(500));
  }
}

@Component({
  selector: 'app-root',
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>{{ texto$ | async }}</h1>`, 
})

export class AppComponent implements OnInit, OnDestroy {

  texto$: Observable<string>; 
  contador = 0;

  constructor(private readonly pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.texto$ = this.pessoaService.buscarPorId(1).pipe(
      map(
        (pessoa: any) => `Nome: ${pessoa.nome}`
      )
    );

    setInterval(() => this.contador++, 1000);
  }
}