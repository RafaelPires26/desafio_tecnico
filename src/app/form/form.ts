import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HomeService } from '../services/home-service';
import { User } from '../model/user.model';
import { CpfMaskDirective } from '../mask/cpf-mask.directive';
import { PhoneMaskDirective } from '../mask/phone-mask.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CpfMaskDirective,
    PhoneMaskDirective
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})

export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private homeService = inject(HomeService);
  private dialogRef = inject(MatDialogRef<FormComponent>);
  
  userForm!: FormGroup;
  isEditMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User } | null) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.user;
    this.initForm();

    if (this.isEditMode && this.data) {
      this.userForm.patchValue(this.data.user);
    }
  }

  private initForm() {
    this.userForm = this.fb.group({
      id     : [null],
      email  : ['', [Validators.required, Validators.email]],
      name   : ['', [Validators.required, Validators.minLength(3)]],
      cpf    : ['', [Validators.required, Validators.pattern(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/)]],
      phone  : ['', [Validators.required, Validators.pattern(/^(\(?\d{2}\)?\s?\d{4,5}-?\d{4}|\d{10,11})$/)]]
    });
  }

  save() {
    if (this.userForm.invalid) return;

    const userData: User = this.userForm.value;
    const action$ = this.isEditMode ? this.homeService.updateUser(userData) : this.homeService.createUser(userData);

    action$.subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}