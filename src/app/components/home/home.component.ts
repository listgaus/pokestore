import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {Observable} from 'rxjs';
import {LoggerService} from '../../services/logger.service';
import {PokeshopStore} from '../../services/app.store';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private logger: LoggerService,
    private store: PokeshopStore
  ) {
  }

  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemons$ = this.store.state$
      .pipe(map(state => state.pokemonList))
      .pipe(distinctUntilChanged());
  }
}
