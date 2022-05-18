import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/Games';
import { GamesService } from 'src/services/games.service';

@Component({
  selector: 'app-form-games',
  templateUrl: './form-games.component.html',
  styleUrls: ['./form-games.component.css'],
})
export class FormGamesComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date(),
  };

  constructor(private gameService: GamesService, private route: Router, private activeR: ActivatedRoute) {}

  ngOnInit(): void {
    const param = this.activeR.snapshot.params;
    
    if(param){
      this.gameService.getGameId(param['id'])
      .subscribe(data => {
        console.log(data);
      })
    }
  }


  saveGame(){
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.saveGame(this.game)
    .subscribe(data => {
      console.log(data);
      this.route.navigate(['/']);
    });
  }
}
