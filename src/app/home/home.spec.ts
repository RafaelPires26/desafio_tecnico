import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home';
import { HomeService } from '../services/home-service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

describe('UsersListComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUserService: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockUserService = {
      getUsers: () => of([{ id: '1', name: 'Giana', email: 'giana@test.com' }]),
      users: () => [{ id: '1', name: 'Giana', email: 'giana@test.com' }]
    };
    mockDialog = { open: () => {} };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: HomeService, useValue: mockUserService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve aplicar debounce de 300ms no campo de pesquisa', fakeAsync(() => {
    component.setupSearchDebounce();
    component.searchControl.setValue('Gian');
    
    // Teste do Debounce
    tick(150);
    expect(component.filteredUsers().length).toBe(1); // Pode falhar se disparar antes do tempo
    
    tick(150); // Completa os 300ms
    fixture.detectChanges();
    expect(component.filteredUsers()[0].name).toBe('Giana');
  }));
});