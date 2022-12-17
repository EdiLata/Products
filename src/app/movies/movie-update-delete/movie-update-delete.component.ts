import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {DialogComponent} from '../../dialog/dialog.component';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'app-movie-update-delete',
    templateUrl: './movie-update-delete.component.html',
    styleUrls: ['./movie-update-delete.component.css']
})
export class MovieUpdateDeleteComponent implements OnInit {

    displayedColumns: string[] = ['title', 'category', 'description', 'imageUrl', 'price', 'trailerUrl', 'action'];
    dataSource: any;
    filteredMovies: any[];
    @ViewChild(MatTable, {static: true}) table: MatTable<any>;

    constructor(public dialog: MatDialog, private service: MovieService) {
    }

    ngOnInit(): void {
        this.service.getMovies().subscribe(movies => {
            this.dataSource = movies;
            this.filteredMovies = movies;
        });
    }

    deleteMovie(movie: any) {
        this.service.deleteMovie(movie);
    }

    updateMovie(movie: any, value: any) {
        this.service.updateMovie(movie, value);
        this.service.deleteMovie(movie);
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            height: '100%',
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Update') {
                this.updateRowData(result.data);
            } else if (result.event === 'Delete') {
                this.deleteRowData(result.data);
            }
        });
    }

    updateRowData(row_obj) {
        this.dataSource = this.dataSource.filter(value => {
            if (value.key === row_obj.key) {
                value.title = row_obj.title;
                value.category = row_obj.category;
                value.description = row_obj.description;
                value.price = row_obj.price;
                value.imageUrl = row_obj.imageUrl;
                value.trailerUrl = row_obj.trailerUrl;
                this.updateMovie(value, row_obj);
            }
            return true;
        });
    }

    deleteRowData(row_obj) {
        this.dataSource = this.dataSource.filter(value => {
            if (value.key === row_obj.key) {
                this.deleteMovie(value);
            }
            return value.title !== row_obj.title;
        });
    }

    filterSearch(searchTerm: string) {
        this.filteredMovies = this.dataSource.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '');
    }
}
