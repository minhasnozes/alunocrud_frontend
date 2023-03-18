import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno/aluno.component';
import { CursoComponent } from './components/curso/curso.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'aluno',
    component: AlunoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'curso',
    component: CursoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
