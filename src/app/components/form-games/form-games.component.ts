import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/Games';
import { GamesService } from 'src/services/games.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-form-games',
  templateUrl: './form-games.component.html',
  styleUrls: ['./form-games.component.css'],
})
export class FormGamesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date(),
  };

  noti: any = {
    msg: ''
  }
  suscription?: Subscription;

  id: number = 0;

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
      this.suscription = this.gameService
        .getGameId(param['id'])
        .subscribe((data) => {
          this.gameList = data;
          for (let i = 0; i < this.gameList.length; i++) {
            this.game = this.gameList[i];
          }
          if (this.gameList[0].id > 0) {
            // Si el juego me viene con un ID que es mayor a 0, eso significa que existe y se quiere actualizar.
            this.validation = true;
          }
        });
    }
  }
  
  saveGame(): void {
    delete this.game.created_at; // I don't want sent the date
    delete this.game.id; // and the ID

    this.suscription = this.gameService
      .saveGame(this.game)
      .subscribe((data) => {
        console.log(data);
        this.noti = data;
        this.route.navigate(['/']);
        Swal.fire({ // Alert
          position: 'top-end',
          icon: 'success',
          title: this.noti.msg,
          showConfirmButton: false,
          width: '20%',
          heightAuto: true,
          timer: 1500
        })
      });

  }

  updateGame(): void {
    delete this.game.created_at;

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.suscription = this.gameService
        .updateGame(this.id, this.game)
        .subscribe((data) => {
          console.log(data);
          this.noti = data;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.noti.msg,
            timer: 1500,
            showConfirmButton: false
          })
          // Swal.fire(this.noti.msg, '', 'success');
          this.route.navigate(['/games']);
  
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  /**
   * Este método lo que se ejecutará cuando el componente no esté visitado.
   * Cuando se ejecute este método, se cancelarán las subscriptions.
   */
  ngOnDestroy(): void {
    // console.log("Me he destruido");
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }
}
