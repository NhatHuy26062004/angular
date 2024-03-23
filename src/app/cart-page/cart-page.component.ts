import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItems';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: Cart;
  quantityOptions: number[] = [];
  constructor(private cartService: CartService) {
    this.quantityOptions = this.QuantityOptions(10);
    this.setCart()
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product.id);
    this.setCart();
    console.log(`Đã xóa sản phẩm: ${cartItem.product.name}`);
  }

  QuantityOptions(maxQuantity: number): number[] {
    const options: number[] = [];
    for (let i = 1; i <= maxQuantity; i++) {
      options.push(i);
    }
    return options;
  }
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    if (quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.cartService.changeQuantity(cartItem.product.id, quantity);
      this.setCart();
    }
  }

  setCart() {
    this.cart = this.cartService.getCart()
  }
}
