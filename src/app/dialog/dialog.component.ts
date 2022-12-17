import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {MovieService} from '../services/movie.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    action: string;
    local_data: any;
    old_title: string;
    old_data: any;
    imgSrc: string;
    selectedImage: any = null;
    formTemplate = new UntypedFormGroup({
        title: new UntypedFormControl(''),
        category: new UntypedFormControl(''),
        description: new UntypedFormControl(''),
        price: new UntypedFormControl(0),
        imageUrl: new UntypedFormControl(''),
        trailerUrl: new UntypedFormControl(''),
    });

    constructor(private storage: AngularFireStorage, private service: MovieService, public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.local_data = {...data};
        this.action = this.local_data.action;
        this.imgSrc = this.local_data.imageUrl;
        this.selectedImage = this.local_data.imageUrl;
        this.old_title = this.local_data.title;
        this.old_data = this.local_data.title;
    }

    showPreview(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.imgSrc = e.target.result;
            reader.readAsDataURL(event.target.files[0]);
            this.selectedImage = event.target.files[0];
        } else {
            this.imgSrc = this.local_data.imageUrl;
            this.selectedImage = this.local_data.imageUrl;
        }
    }

    doAction(formValue) {
        if (formValue.title !== '') {
            var directory = `Products`;
            if (this.selectedImage.name) {
                var filePath = `${directory}/${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
                const fileRef = this.storage.ref(filePath);
                this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
                    finalize(() => {
                        fileRef.getDownloadURL().subscribe((url) => {
                            formValue['imageUrl'] = url;
                            this.service.insertMovieDetails(formValue);
                            this.service.copyComments(this.local_data.title, this.old_title);
                        });
                    })
                ).subscribe();
            } else {
                formValue['imageUrl'] = this.local_data.imageUrl;
                this.service.insertMovieDetails(formValue);
                this.service.copyComments(this.local_data.title, this.old_title);
            }
        }
        this.dialogRef.close({event: this.action, data: this.local_data});
    }

    get formControls() {
        return this.formTemplate['controls'];
    }

    closeDialog() {
        this.dialogRef.close({event: 'Cancel'});
    }

    ngOnInit(): void {
    }
}
