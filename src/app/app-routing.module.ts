import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno/aluno.component';
import { CursoComponent } from './components/curso/curso.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'aluno', component: AlunoComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
