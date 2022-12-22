import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.css']
})
export class OrderListPageComponent implements OnInit {
  orders: any[];
  loaded = false;

  constructor(private service: MovieService) {
  }

  ngOnInit(): void {
    this.service.getOrders().subscribe(orders => {
      this.orders = orders;
      this.loaded = true;
    });
  }

}
