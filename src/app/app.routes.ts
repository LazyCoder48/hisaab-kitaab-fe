import {Routes}                   from '@angular/router';
import {HomeComponent}            from './home/home.component';
import {SignupComponent}          from './auth/signup/signup.component';
import {LoginComponent}           from './auth/login/login.component';
import {CreateHouseHoldComponent} from './house-hold/create-house-hold/create-house-hold.component';
import {authGuard}                from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'app', children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path               : 'household', children: [
                    {path: 'create', component: CreateHouseHoldComponent}
                ], canActivateChild: [authGuard]
            }
        ]
    },
    {
        path: 'auth', children: [
            {
                path: 'signup', component: SignupComponent
            },
            {
                path: 'login', component: LoginComponent
            }
        ]
    },
    {
        path      : '**',
        redirectTo: '/app/home',
        pathMatch : 'full'
    }
];