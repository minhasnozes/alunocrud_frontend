import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  login(username: string, password: string): boolean {
    // Fazer a lógica de autenticação aqui, por exemplo, verificar se o nome de usuário e senha estão corretos em um backend
    if (username === 'user' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isLoggedInFn(): boolean {
    return this.isLoggedIn;
  }

}
