import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = enviroment.apiUrl;
  private UrlEndPoint: string = this.apiUrl + 'Authenticate/';

  constructor(private http: HttpClient) {}

  login(request: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.UrlEndPoint}LogIn`, request);
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const expirationTimeInSeconds = decodedToken.exp;
        const currentTimeInSeconds = Date.now() / 1000;

        return currentTimeInSeconds < expirationTimeInSeconds;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return false; // Si no hay token o está expirado, devuelve false
  }
}
