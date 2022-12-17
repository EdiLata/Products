import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

import {MatNativeDateModule} from '@angular/material/core';

import {MatRippleModule} from '@angular/material/core';

import {MatSidenavModule} from '@angular/material/sidenav';

import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';

import {MatToolbarModule} from '@angular/material/toolbar';

import {MatTreeModule} from '@angular/material/tree';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';

import {environment} from '../environments/environment';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movies/movie/movie.component';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {CardComponent} from './card/card.component';
import {ChipComponent} from './chip/chip.component';
import {FilterComponent} from './filter/filter.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MovieUpdateDeleteComponent} from './movies/movie-update-delete/movie-update-delete.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {DialogComponent} from './dialog/dialog.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {SafePipe} from './safe.pipe';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {ReadFeedbackComponent} from './read-feedback/read-feedback.component';
import {RatingComponent} from './rating/rating.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        ForgotPasswordComponent,

        MoviesComponent,
        MovieComponent,
        MovieListComponent,
        CardComponent,
        ChipComponent,
        FilterComponent,
        MovieDetailsComponent,

        NavbarComponent,

        MovieUpdateDeleteComponent,

        AdminPageComponent,

        DialogComponent,
        FeedbackComponent,
        SafePipe,
        SearchBarComponent,
        ReadFeedbackComponent,
        RatingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
