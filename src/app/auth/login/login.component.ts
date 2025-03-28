import {AfterViewInit, Component, OnInit}                                     from '@angular/core';
import {AuthService}                                                          from '../../services/auth/auth.service';
import {MessageService, PrimeTemplate}                                        from 'primeng/api';
import {Router}                                                               from '@angular/router';
import {CookieOptions, CookieService}                                         from 'ngx-cookie-service';
import {
    LoginRequest
}                                                                             from '../../interfaces/auth/login-request';
import {AppResponse}                                                          from '../../interfaces/app/app-response';
import {Users}                                                                from '../../interfaces/users/users';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Checkbox}                                                             from 'primeng/checkbox';
import {Toast}                                                                from 'primeng/toast';
import {InputText}                                                            from 'primeng/inputtext';
import {Button}                                                               from 'primeng/button';
import {FloatLabel}                                                           from 'primeng/floatlabel';

@Component({
               selector   : 'app-login',
               imports    : [
                   FormsModule,
                   Checkbox,
                   Toast,
                   PrimeTemplate,
                   InputText,
                   Button,
                   FloatLabel,
                   ReactiveFormsModule
               ],
               templateUrl: './login.component.html',
               styleUrl   : './login.component.scss'
           })
export class LoginComponent implements OnInit, AfterViewInit {
    rememberMe: boolean  = false;
    loginForm: FormGroup = new FormGroup(
        {
            username  : new FormControl('ajitesh.newnaha@outlook.com', [Validators.required]),
            password  : new FormControl('Pass@1234', [Validators.required]),
            rememberMe: new FormControl(false)
        }
    );

    constructor(private authService: AuthService, private messageService: MessageService, private router: Router,
                private cookieService: CookieService) {}

    ngOnInit(): void {
    }

    userLogin() {
        const loginData: LoginRequest = this.loginForm.getRawValue();
        this.authService.login(loginData).subscribe(
            {
                next    : (response: AppResponse) => {
                    if (response && response.httpResponseCode === 200 && response.data) {
                        const user: Users = response.data;
                        console.log('response', response, 'user', user);
                        const cookieOptions: CookieOptions = {
                            path    : '/',
                            expires : (new Date().getTime()) + (604800000),
                            secure  : true,
                            sameSite: 'Strict'
                        }
                        this.cookieService.set('hkUser', JSON.stringify(user), cookieOptions);
                        this.cookieService.set('hkUserJwt', JSON.stringify({jwt: response.jwt}), cookieOptions);
                        this.authService.userData = user;
                        this.authService.jwt      = response.jwt;
                        this.messageService.clear('login-toast');
                        this.messageService.add(
                            {
                                key     : 'login-toast',
                                severity: 'success',
                                summary : `Login Successful (${response.httpResponseCode})`,
                                detail  : response.httpResponseBody,
                                life    : 3000
                            }
                        );
                        this.authService.isLoggedIn = true;
                        this.authService.decodeJwt();
                        setTimeout(() => {
                            this.router.navigate(['/app/home']).then(r => console.log('navigated to /app/home', r));
                        }, 1000)
                    } else {
                        console.error('no proper response from backend');
                        this.messageService.add(
                            {
                                key     : 'login-toast',
                                severity: 'error',
                                summary : 'No Response from the backend',
                                life    : 3000
                            }
                        );

                    }
                },
                error   : (error: any) => {
                    console.log(error);
                    this.messageService.add(
                        {
                            key     : 'login-toast',
                            severity: 'error',
                            summary : `${error.error.title} (${error.error.status})`,
                            detail  : error.error.detail,
                            life    : 5000
                        }
                    );
                },
                complete: () => {
                    console.log("Login functionality completed");
                }
            }
        );

    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit');
        if (this.authService.validateJwt()) {
            this.router.navigate(['/app/home']).then(r => console.log('navigated to /', r));
        }
    }

    cancel() {
        this.router.navigate(['/']).then(r => console.log('navigated to /', r));
    }
}