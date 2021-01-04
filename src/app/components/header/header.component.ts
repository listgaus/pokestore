import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoggerService} from '../../services/logger.service';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {PokeshopStore} from '../../services/app.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount$: Observable<number>;

  isLoggedIn = this.auth.isLoggedIn$;

  constructor(private auth: AuthService, private logger: LoggerService, private store: PokeshopStore) {
    this.cartCount$ = this.store.state$
      .pipe(map(state => state.cartList.length))
      .pipe(distinctUntilChanged());
  }

  ngOnInit(): void {
    this.logger.debug('init HeaderComponent');
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}
