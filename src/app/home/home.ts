import { Component, OnInit, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { HomeService } from './../services/home-service';
import { User } from '../model/user.model';
import { FormComponent } from '../form/form';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  filteredUsers = signal<User[]>([]);

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.loadUsers();
    this.setupSearchDebounce();
  }

  loadUsers() {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.homeService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.filteredUsers.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message);
          this.loading.set(false);
        }
      });
  }

  setupSearchDebounce() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(searchTerm => {
      const term = searchTerm?.toLowerCase() || '';
      const allUsers = this.homeService.users();
      this.filteredUsers.set(
        allUsers.filter(user => user.name.toLowerCase().includes(term))
      );
    });
  }

  openUserModal(user?: User) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      data: user ? { user } : null
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.searchControl.setValue('');
        this.filteredUsers.set(this.homeService.users());
      }
    });
  }
}