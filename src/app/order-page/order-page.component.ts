import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  currentOrder: any;
  loaded = false;

  formTemplate = new UntypedFormGroup({
    person: new UntypedFormControl('', Validators.required),
    phone: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    county: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required),
    street: new UntypedFormControl('', Validators.required)
  });

  constructor(private service: MovieService, private snack: MatSnackBar) {
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

  updateCount(increment, product) {
    if (increment) {
      product.count++;
    } else {
      if (product.count !== 0) {
        product.count--;
      }
    }
  }

  updateOrder(product) {
    let foundProduct = null;
    this.currentOrder.products.forEach(p => {
      if (product.title === p.title) {
        foundProduct = p;
      }
    });
    foundProduct.count = product.count;
    this.service.updateOrder(this.currentOrder);
    this.snack.open('Order updated successfully!', 'Close');
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  placeOrder() {
    if (!this.formTemplate.valid) {
      this.snack.open('Please complete all the form fields!', 'Close');
      return;
    }
    const formValue = this.formTemplate.value;
    this.currentOrder.personalDetails = 'Contact person: ' + formValue.person + ' Phone: ' + formValue.phone +
        ' Address: ' + formValue.street + ', ' + formValue.city + ', ' + formValue.county + ', ' + formValue.country;
    this.currentOrder.current = false;
    this.service.updateOrder(this.currentOrder);
    this.snack.open('Order placed successfully!', 'Close');
    window.location.reload();
  }

  getTotalPrice() {
    let price = 0;
    this.currentOrder.products.forEach(p => {
      price += p.price * p.count;
    });
    return price;
  }
}
