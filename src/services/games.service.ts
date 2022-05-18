import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/models/Games';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  //! Servicios para completar CRUD desde el cliente

  getGames() {
    //? Get all games
    return this.http.get(`${this.API}/games`);
  }

  getGameId(id: string){
    return this.http.get(`${this.API}/games/${id}`);
  }

  saveGame(game: Game): Observable<Game>{
    return this.http.post<Game>(`${this.API}/games`, game);
  }

  updateGame(id: string, gameUpdated: Game){

    return this.http.put(`${this.API}/games/${id}`, gameUpdated);
  }

  deleteGame(id: string): Observable<Game>{

    return this.http.delete<Game>(`${this.API}/games/${id}`);
  }
}
