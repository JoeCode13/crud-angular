import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/Games';
import { GamesService } from 'src/services/games.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css'],
})
export class ListGamesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'row';
  games: any = [];

  suscription?: Subscription;

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.suscription = this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }

  deleteGame(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this game?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Deleted!', 'Your game has been deleted 😕', 'success');

        Swal.fire({
          position: 'center',
          text: 'Your game has been deleted 😕',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        })

        this.suscription = this.gameService.deleteGame(id).subscribe((data) => {
          console.log(data);
          this.getGames();
        });
      } else {
        Swal.fire('Deleted!', 'The game has not been removed', 'info');
        Swal.fire({
          position: 'center',
          text: 'The game has not been removed',
          icon: 'info',
          timer: 1200,
          showConfirmButton: false
        })
      }
    });
  }
  ngOnDestroy(): void {
    if (this.suscription) this.suscription.unsubscribe();
  }
}
