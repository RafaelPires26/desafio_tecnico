import { Component, OnInit, inject } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

  private homeService = inject(HomeService);
  private searchTerms = new Subject<string>();

  results!: Observable<any[]>;
  loading = new Subject<boolean>();

  ngOnInit(): void {
    this.results = this.searchTerms.pipe(
      tap((obj) => { if (obj.trim()) this.loading.next(true); }),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((obj: string) => {
        if (!obj.trim()) {
          this.loading.next(false);
          return of([]);
        }
        
        return this.homeService.buscar(obj).pipe(
          tap(() => this.loading.next(false)),
          catchError((error) => {
            console.error('Erro na busca:', error);
            this.loading.next(false);
            return of([]); 
          })
        );
      })
    );
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }
}
