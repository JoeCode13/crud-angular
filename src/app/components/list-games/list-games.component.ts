import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/Games';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  games: any = [];

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {

    this.getGames();
  }

  getGames(){
    this.gameService.getGames().subscribe(data => {
      this.games = data;
    })
  }

  deleteGame(id: string){

    this.gameService.deleteGame(id).subscribe(data => {
      console.log(data); 
      this.getGames();
    })
  }

}
