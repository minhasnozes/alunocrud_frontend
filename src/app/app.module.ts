import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoComponent } from './components/aluno/aluno.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AlunoDialogComponent } from './components/aluno/aluno-dialog/aluno-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CursoComponent } from './components/curso/curso.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    AlunoDialogComponent,
    NavbarComponent,
    CategoriaComponent,
    CursoComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 },

    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
