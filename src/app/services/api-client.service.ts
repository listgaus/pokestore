import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from './logger.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pokemon, PokemonsResponse} from '../models/pokemon';
import {API_ADDRESS} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {

  // API Docs: https://pokeapi.co/docs/v2#pokemon

  constructor(private logger: LoggerService, private httpClient: HttpClient) {
  }

  public getPokemons(maxItems): Observable<Pokemon[]> {

    return this.httpClient
      .get<PokemonsResponse>(`${API_ADDRESS}/pokemon?limit=${maxItems}`)
      .pipe(map((res) => res.results));
  }
}
