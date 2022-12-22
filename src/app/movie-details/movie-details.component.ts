import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../services/movie.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    name: string;
    movie: any;
    movieList: any[];
    orderList: any[];

    productCount = 0;

    constructor(private router: ActivatedRoute, private service: MovieService, private snack: MatSnackBar) {
    }

    ngOnInit(): void {
        this.name = this.router.snapshot.params['title'];
        this.service.getMovies().subscribe(movies => {
            this.movieList = movies;
            this.movieList.forEach(movie => {
                if (movie.title === this.name) {
                    this.movie = movie;
                }
            });
        });
        this.service.getOrders().subscribe(orders => {
            this.orderList = orders;
        });
    }

    undifindHandle(movie: any) {
        return typeof (movie) !== 'undefined';
    }

    changeProductCount(increment: boolean) {
        if (increment) {
            this.productCount++;
        } else {
            if (this.productCount !== 0) {
                this.productCount--;
            }
        }
    }

    addToOrder() {
        const orderNum = Math.floor(Math.random() * 10) + 1;
        let currentOrder = null;
        this.orderList.forEach(order => {
            if (order.current === true) {
                currentOrder = order;
            }
        });
        if (!currentOrder) {
            const order = {
                products: [{title: this.movie.title, count: this.productCount, price: this.movie.price}],
                orderNumber: orderNum,
                current: true,
                personalDetails: 'notSet'
            };
            this.service.addOrder(order);
        } else {
            let existingProduct = null;
            currentOrder.products.forEach(product => {
                if (product.title === this.movie.title) {
                    existingProduct = product;
                }
            });
            if (!existingProduct) {
                currentOrder.products.push({title: this.movie.title, count: this.productCount, price: this.movie.price});
            } else {
                existingProduct.count += this.productCount;
            }
            this.service.updateOrder(currentOrder);
        }
        this.snack.open('Product successfully added to shopping kart!', 'Close');
    }
}
