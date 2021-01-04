import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Store } from './store';
import { Pokemon } from '../models/pokemon';
import { ApiClientService } from './api-client.service';

export class PokeshopState {
  pokemonList: Pokemon[] = [];
  cartList: Pokemon[] = [];
  maxItems = 30;
}

@Injectable({
  providedIn: 'root',
})
export class PokeshopStore extends Store<PokeshopState> {
  constructor(
    private logger: LoggerService,
    private dataService: ApiClientService
  ) {
    super(new PokeshopState());
    this.getPokemons();
  }

  public getPokemons() {
    this.logger.info('fetching pokemons from server');
    this.dataService.getPokemons(this.state.maxItems).subscribe((response) => {
      this.logger.info(`Got ${response.length} pokemons`);
      this.setState({
        ...this.state,
        pokemonList: response.map((p) => this.parseData(p)),
      });
    });
  }

  addToCart(pokemon) {
    pokemon.isInCart = true;
    this.state.cartList.push(pokemon);
    this.setState({
      ...this.state,
      cartList: this.state.cartList,
    });
  }

  removeFromCart(pokemon) {
    this.state.cartList = this.state.cartList.filter(
      (p) => p.id !== pokemon.id
    );
    pokemon.isInCart = false;
    this.setState({
      ...this.state,
      cartList: this.state.cartList,
    });
  }

  clearCart() {
    this.logger.info('clearing the cart');
    this.state.pokemonList.forEach((p) => (p.isInCart = false));
    this.setState({
      ...this.state,
      cartList: [],
      pokemonList: this.state.pokemonList,
    });
  }

  loadUserData() {
    this.logger.info('fetching user data from localstorage');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null || userData?.length > 0) {
      let userCartList = [];
      userCartList = userData.filter((item) => item.isInCart);
      this.logger.info(
        `got ${userData.length} pokemons, ${userCartList.length} in cart`
      );
      this.setState({
        ...this.state,
        pokemonList: JSON.parse(localStorage.getItem('userData')),
        cartList: userCartList,
      });
    } else {
      this.logger.info('no user data in localstorage...');
      this.getPokemons();
    }
  }

  saveUserData() {
    this.logger.info('saving user data to localstorage');
    localStorage.setItem('userData', JSON.stringify(this.state.pokemonList));
  }

  parseData(p) {
    const pokemonId = /pokemon\/(\d+)\//.exec(p.url)[1];
    const pokemonModel: Pokemon = {
      name: p.name,
      id: pokemonId,
      // url : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      isInCart: false,
    };
    return pokemonModel;
  }
}
