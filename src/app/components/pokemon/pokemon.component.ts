import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokeshopStore } from '../../services/app.store';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  @Input() pokemon: Pokemon;
  @Input() inCart = false;
  @ViewChild('pokeImg') pokeImg;
  animationDelay = 1500;
  
  constructor(private store: PokeshopStore, private dialogRef: DialogService) {}

  addToCart() {
    this.pokeImg.nativeElement.classList.add('sendtocart');
    setTimeout(() => {
      this.pokeImg.nativeElement.classList.remove('sendtocart');
    }, this.animationDelay);
    this.store.addToCart(this.pokemon);
  }

  removeFromCart() {
    this.dialogRef
      .openConfirmDialog(
        `are you sure you wanna remove ${this.pokemon.name} from the cart?`
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.pokeImg.nativeElement.classList.add('removefromcart');
          setTimeout(() => {
            this.pokeImg.nativeElement.classList.remove('removefromcart');
            this.store.removeFromCart(this.pokemon);
          }, this.animationDelay);
        }
      });
  }
}
