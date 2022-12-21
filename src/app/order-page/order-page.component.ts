import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  currentOrder: any;
  loaded = false;

  constructor(private service: MovieService) {
  }

  ngOnInit(): void {
    this.service.getOrders().subscribe(orders => {
      orders.forEach(order => {
        if (order.current === true) {
          this.currentOrder = order;
          this.loaded = true;
        }
      });
    });
  }
}
