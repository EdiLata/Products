import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movies/movie/movie.component';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieUpdateDeleteComponent} from './movies/movie-update-delete/movie-update-delete.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {AdminGuard} from './services/admin.guard';
import {LogoutGuard} from './services/logout.guard';
import {ReadFeedbackComponent} from './read-feedback/read-feedback.component';
import {OrderPageComponent} from './order-page/order-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'product/list', pathMatch: 'full' },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent, canActivate: [LogoutGuard] },
    { path: 'home', component: HomeComponent},
    {path: 'product', component: MoviesComponent, canActivate: [AuthGuard], children: [
            {path: 'upload', component: MovieComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'list', component: MovieListComponent, canActivate: [AuthGuard]},
            {path: 'updateOrDelete', component: MovieUpdateDeleteComponent, canActivate: [AuthGuard, AdminGuard]}
        ]},
    {path: 'product/:title', component: MovieDetailsComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'readFeedback', component: ReadFeedbackComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
    {path: 'checkout', component: OrderPageComponent, canActivate: [AuthGuard]},
    { path: '**', component: HomeComponent }
    // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
