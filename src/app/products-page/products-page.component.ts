import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../services/cart/cart.service';
import { ProductsService } from '../services/products/products.service';
import { products } from '../shared/models/Products';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  product!: products;
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService,
    private productsService: ProductsService, private router: Router, private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productsService.getById(params['id']).subscribe((product) => {
          this.product = product;
        });
      }
    })
  }
  ngOnInit(): void {
  }

  addtoCart() {
    if (this.authService.isLoggedIn()) {
      this.cartService.addtoCart(this.product);

      // Thông báo thông qua alert
      alert('Sản phẩm đã được thêm vào giỏ hàng.');

      this.router.navigateByUrl('/cart-page');
    } else {
      alert('Đăng nhập để mua sản phẩm này!');
      this.authService.redirectToLogin();
    }
  }
}
