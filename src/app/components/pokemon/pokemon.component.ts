import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {LoggerService} from '../../services/logger.service';
import {PokeshopStore} from '../../services/app.store';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent{
  @Input() pokemon: Pokemon;
  @Input() inCart = false;
  @ViewChild('pokeCard') pokeCard;
  @ViewChild('pokeImg') pokeImg;

  constructor(
    private logger: LoggerService,
    private store: PokeshopStore,
    private dialogRef: DialogService,
  ) {
  }

  addToCart() {
    this.pokeImg.nativeElement.classList.add('sendtocart');
    setTimeout(() => {
      this.pokeImg.nativeElement.classList.remove('sendtocart');
    }, 1500);
    this.store.addToCart(this.pokemon);
  }

  removeFromCart() {
    this.dialogRef.openConfirmDialog(`are you sure you wanna remove ${this.pokemon.name} from the cart?`).afterClosed().subscribe(res => {
      if (res) {
        this.pokeImg.nativeElement.classList.add('removefromcart');
        setTimeout(() => {
          this.pokeImg.nativeElement.classList.remove('removefromcart');
          this.store.removeFromCart(this.pokemon);
        }, 1500);
      }
    });
  }
}
