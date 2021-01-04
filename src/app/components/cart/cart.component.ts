import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoggerService} from '../../services/logger.service';
import {PokeshopStore} from '../../services/app.store';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Pokemon} from '../../models/pokemon';
import {DialogService} from '../../services/dialog.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  cartSubscription = new Subscription();

  constructor(
    private dialogRef: DialogService,
    private logger: LoggerService,
    private store: PokeshopStore
  ) {
  }

  ngOnDestroy(): void {
    this.logger.debug('CartComponent destroyed');
    this.cartSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.logger.debug('init CartComponent');
    this.cartSubscription = this.store.state$
      .pipe(map((state) => state.cartList))
      .pipe(distinctUntilChanged())
      .subscribe((cartList) => {
        this.pokemons = cartList;
      });
  }

  clearCart() {
    this.dialogRef
      .openConfirmDialog(
        `You are going to empty the cart from your pokemons, are you sure?`
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.store.clearCart();
        }
      });
  }
}
