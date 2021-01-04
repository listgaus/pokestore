import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoggerService} from './logger.service';
import {Router} from '@angular/router';
import {PokeshopStore} from './app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private logger: LoggerService, private router: Router, private store: PokeshopStore) {
  }

  public init() {
    this.logger.debug('init AuthService');
  }

  public login() {
    this.logger.info('init user login flow');
    this.store.loadUserData();
    this.isLoggedIn.next(true);
    this.router.navigateByUrl('/');
  }

  public logout() {
    this.logger.info('init user logout flow');
    this.store.saveUserData();
    this.isLoggedIn.next(false);
    this.router.navigateByUrl('/');
    this.store.clearCart();
    this.store.getPokemons();
  }
}
