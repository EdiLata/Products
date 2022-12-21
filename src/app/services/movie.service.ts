import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
    providedIn: 'root'
})
export class MovieService implements OnInit {
    movieDetailList: AngularFireList<any>;
    feedbackList: AngularFireList<any>;
    feedbacks: Observable<any[]>;
    movies: Observable<any[]>;
    ratingList: AngularFireList<any>;
    ratings: Observable<any[]>;
    orderList: AngularFireList<any>;
    orders: Observable<any[]>;

    constructor(private firebase: AngularFireDatabase) {
        this.movieDetailList = firebase.list('productDetails');
        this.movies = this.movieDetailList.snapshotChanges().pipe(
            map(res => res.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }))
            ));
        this.feedbackList = firebase.list('feedbackList');
        this.feedbacks = this.feedbackList.snapshotChanges().pipe(
            map(res => res.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }))
            ));
        this.ratingList = firebase.list('ratingList');
        this.ratings = this.ratingList.snapshotChanges().pipe(
            map(res => res.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }))
            ));
        this.orderList = firebase.list('orderList');
        this.orders = this.orderList.snapshotChanges().pipe(
            map(res => res.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }))
            )
        );
    }

    ngOnInit() {
    }

    getMovies() {
        return this.movies;
    }

    copyComments(newTitle, oldTitle) {
        if (newTitle !== oldTitle) {
            this.ratings.subscribe(r => {
                r.forEach(k => {
                    if (k.title === oldTitle) {
                        this.movies.subscribe(m => {
                            m.forEach(w => {
                                if (w.title === oldTitle) {
                                    this.deleteMovie(w);
                                }
                            });
                            this.deleteRating(k);
                            this.insertRating({rating: k.rating, title: newTitle, comment: k.comment});
                        });
                    }
                });
            });
        }
    }

    getFeedback() {
        return this.feedbacks;
    }

    deleteFeedback(feedback) {
        this.firebase.object('/feedbackList/' + feedback.key).remove();
    }

    insertFeedback(feedback) {
        this.feedbackList.push(feedback);
    }

    insertRating(rating) {
        this.ratingList.push(rating);
    }

    getRatings() {
        return this.ratings;
    }

    getRating(title) {
        let filterRating = [];
        let filteredFilter = [];
        let ok = 1;
        this.ratings.subscribe(r => {
            r.forEach(k => {
                if (k.title === title) {
                    filterRating.push(k);
                }
            });
            filterRating.forEach(filt => {
                ok = 1;
                filteredFilter.forEach(f => {
                    if (f.title === filt.title && f.comment === filt.comment && f.rating === filt.rating) {
                        ok = 0;
                    }
                });
                if (ok === 1) {
                    filteredFilter.push(filt);
                }
            });
        });
        return filteredFilter;
    }

    deleteRating(rating) {
        this.firebase.object('/ratingList/' + rating.key).remove();
        window.location.reload();
    }

    insertMovieDetails(movieDetails) {
        this.movieDetailList.push(movieDetails);
    }

    deleteMovie(movie) {
        this.firebase.object('/productDetails/' + movie.key).remove();
    }

    updateMovie(movie, formValue) {
        this.firebase.object('/productDetails/' + movie.key)
            .set({
                title: formValue.title,
                category: formValue.category,
                description: formValue.description,
                price: formValue.price,
                imageUrl: formValue.imageUrl,
                trailerUrl: formValue.trailerUrl,
            });
    }

    getOrders() {
        return this.orders;
    }

    addOrder(order) {
        this.orderList.push(order);
    }

    updateOrder(order) {
        this.firebase.object('/orderList/' + order.key).set(
            {
                orderNumber: order.orderNumber,
                products: order.products,
                current: order.current
            }
        );
    }
}
