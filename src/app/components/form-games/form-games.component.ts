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

  id:number = 0;
  
  validation: boolean = false;

  gameList: any = [];

  constructor(
    private gameService: GamesService,
    private route: Router,
    private activeR: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const param = this.activeR.snapshot.params;
    this.id = param['id'];

    if (param['id']) {
      this.gameService.getGameId(param['id']).subscribe((data) => {
        console.log('Paso por aquí');
        this.gameList = data;
        for (let i = 0; i < this.gameList.length; i++) {
          this.game = this.gameList[i];
        }
        if (this.gameList[0].id > 0) {
          this.validation = true;
        }
      });
    }
  }

  saveGame(): void {
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.saveGame(this.game).subscribe((data) => {
      console.log(data);
      this.route.navigate(['/']);
    });
  }
  updateGame(): void {
    this.gameService.updateGame(this.id, this.game);
    this.route.navigate(['/games']);
  }
}
