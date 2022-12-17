import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {MovieService} from '../../services/movie.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    category: new UntypedFormControl(''),
    description: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl(0, Validators.required),
    imageUrl: new UntypedFormControl('', Validators.required),
    trailerUrl: new UntypedFormControl('')
  });

  constructor(private storage: AngularFireStorage, private service: MovieService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets/images/default.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var directory = `Products`;
      var filePath = `${directory}/${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.service.insertMovieDetails(formValue);
              this.resetForm();
            })
          })
      ).subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      title: '',
      category: 'Toys',
      description: '',
      price: 0,
      imageUrl: '',
      trailerUrl: ''
    });
    this.imgSrc = 'assets/images/default.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}
