import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule}                                     from '@angular/forms';
import {NgIf, UpperCasePipe}                             from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AppRequest}                                      from './interfaces/app/app-request';
import {AuthService}                                     from './services/auth/auth.service';
import {CookieService}                                   from 'ngx-cookie-service';
import {AppResponse}                                     from './interfaces/app/app-response';
import {Toast}                                           from 'primeng/toast';
import {MenuItem, MessageService}                        from 'primeng/api';
import {HttpClient}                                      from '@angular/common/http';
import {Drawer}                                          from 'primeng/drawer';
import {Menubar}                                         from 'primeng/menubar';
import {Avatar}                                          from 'primeng/avatar';
import {PanelMenu}                                       from 'primeng/panelmenu';
import {Ripple}                                          from 'primeng/ripple';

@Component({
               selector   : 'app-root',
               imports    : [FormsModule, RouterOutlet, Toast, UpperCasePipe, NgIf, RouterLink,
                             Menubar, Avatar, PanelMenu, Ripple],
               templateUrl: './app.component.html',
               styleUrl   : './app.component.scss',
               providers  : [AuthService, CookieService, MessageService, HttpClient]
           })
export class AppComponent implements OnInit {
    title: string            = 'hisaab-kitaab-fe';
    isLoggedIn: boolean      = false;
    onLoginOrSignup: boolean = false;
    onLoginPage: boolean     = false;
    onSignupPage: boolean    = false;
    isLightTheme: boolean    = false;
    themeIcon: string        = 'pi pi-moon';
    @ViewChild('drawerRef') drawerRef!: Drawer;

    menuItems: MenuItem[] = [
        {
            label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app/home']
        },
        {
            label: 'House Hold', icon: 'pi pi-fw pi-users',
            items: [
                {
                    label: 'Add House Hold', icon: 'pi pi-fw pi-plus', routerLink: ['app/household/create']
                },
                {
                    label: 'View House Hold', icon: 'pi pi-fw pi-eye', routerLink: ['app/household/view']
                },
                {
                    label: 'Edit House Hold', icon: 'pi pi-fw pi-pencil', routerLink: ['app/household/edit']
                }
            ]
        },
        {
            label: 'Members', icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Add Member', icon: 'pi pi-fw pi-plus', routerLink: ['app/member/create']
                },
                {
                    label: 'View Member', icon: 'pi pi-fw pi-eye', routerLink: ['app/member/view']
                },
                {
                    label: 'Edit Member', icon: 'pi pi-fw pi-pencil', routerLink: ['app/member/edit']
                }
            ]
        }
    ]

    constructor(private router: Router, private messageService: MessageService,
                private cdr: ChangeDetectorRef, private authService: AuthService,
                private cookieService: CookieService) {
    }

    /**
     * Angular lifecycle hook called after the component's view has been fully initialized.
     * It initializes the application's theme, logs a message indicating the component has been initialized,
     * and subscribes to router events to perform an action on navigation end.
     *
     * @return {void} No return value.
     */
    ngOnInit(): void {
        console.log('user logged in', this.authService.isLoggedIn);
        this.isLightTheme = this.cookieService.get('hkTheme') === 'true';
        if (this.isLightTheme) {
            const element = document.querySelector('html');
            element?.classList.add('dark-mode');
            this.themeIcon = 'pi pi-sun';
        }
        console.log('App Component Initialized');
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getDetailsFromCookie();
            }
        });
    }

    /**
     * Detects and determines the current route status of the application, verifying login or signup states
     * and updating authentication details accordingly.
     *
     * @return {void} This method does not return any value.
     */
    detectCurrentRoute(): void {
        console.log('detectCurrentRoute', this.router.url);
        if (this.authService.jwt) {
            this.authService.validateJwt();
        }
        this.onLoginOrSignup = this.router.url.includes('login') || this.router.url.includes('signup');
        this.onLoginPage     = this.router.url.includes('login');
        this.onSignupPage    = this.router.url.includes('signup');
        this.isLoggedIn      = this.authService.isLoggedIn;
        setTimeout(() => {
            this.isLoggedIn = this.authService.isLoggedIn;
            console.log('200', this.isLoggedIn);
        }, 200);
        console.log('0', this.isLoggedIn);
        this.messageService.clear('login-toast');
        this.messageService.add(
            {
                key     : 'user-toast',
                severity: 'info',
                summary : `User: ${this.authService.userData?.firstName} ${this.authService.userData?.lastName}`,
                detail  : `Logged in ${this.authService.isLoggedIn ? 'successfully' : 'unsuccessfully'}.`,
                life    : 3000
            }
        );
    }

    /**
     * Logs out the current user by clearing authentication data, deleting cookies,
     * resetting related properties, and navigating to the home page.
     * An HTTP request is sent to the backend to handle server-side logout operations.
     *
     * @return {void} This method does not return a value.
     */
    logout(): void {
        let appRequest: AppRequest = {
            data: this.authService.userData,
            jwt : this.authService.jwt
        }
        console.info(appRequest);
        this.authService.logout(appRequest).subscribe(
            {
                next : (response: AppResponse) => {
                    console.log(response);
                    if (response.httpResponseCode === 202) {
                        this.authService.userData   = {};
                        this.authService.jwt        = '';
                        this.authService.isLoggedIn = false;
                        this.cookieService.delete('hkUser', '/');
                        this.cookieService.delete('hkUserJwt', '/');
                        console.log('after delete', this.cookieService.get('hkUser'),
                                    this.cookieService.get('hkUserJwt'));
                        this.onLoginOrSignup = this.router.url.includes('login') || this.router.url.includes('signup');
                        this.onLoginPage     = this.router.url.includes('login');
                        this.onSignupPage    = this.router.url.includes('signup');
                        this.isLoggedIn      = false;
                        this.router.navigate(['/']).then(r => console.log('navigated to /', r));
                    }
                },
                error: (error: any) => {
                    console.error("error", error);
                }
            });
    }

    /**
     * Extracts user details and JWT token from cookies, assigns them to the authService properties, and triggers route
     * detection.
     *
     * @return {void} This method does not return any value.
     */
    getDetailsFromCookie(): void {
        if (this.cookieService.get('hkUser') && this.cookieService.get('hkUserJwt')) {
            this.authService.userData = JSON.parse(this.cookieService.get('hkUser'));
            this.authService.jwt      = JSON.parse(this.cookieService.get('hkUserJwt'))?.jwt || '';
            this.detectCurrentRoute();
        }
    }

    toggleTheme(): void {
        this.isLightTheme = !this.isLightTheme;
        this.themeIcon    = this.isLightTheme ? 'pi pi-sun' : 'pi pi-moon';
        console.log('toggleTheme', this.isLightTheme);
        const element = document.querySelector('html');
        element?.classList.toggle('dark-mode');
        this.cookieService.set('hkTheme', this.isLightTheme.toString(), {path: '/'});
    }

}