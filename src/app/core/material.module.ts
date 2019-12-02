import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatGridListModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatSnackBarModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule, 
  MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatIconModule, MatDividerModule, MatListModule, MatSnackBarModule, 
MatMenuModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule, 
  MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatIconModule, MatDividerModule, MatListModule, MatSnackBarModule, 
MatMenuModule],
})
export class CustomMaterialModule { }