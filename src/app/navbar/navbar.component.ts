import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  productCount = 0;
  loaded = false;
  constructor(private afAuth: AngularFireAuth, public authService: AuthService, private service: MovieService ) { }

  ngOnInit(): void {
    this.service.getOrders().subscribe(orders => {
      orders.forEach(order => {
        if (order.current === true) {
          let pc = 0;
          order.products.forEach(product => {
            pc += product.count;
          });
          this.productCount = pc;
          this.loaded = true;
        }
      });
    });
  }
  logout(): void {
    this.afAuth.signOut();
  }

}
