import {Injectable}            from '@angular/core';
import {HttpClient}            from '@angular/common/http';
import {CookieService}         from 'ngx-cookie-service';
import {Observable}            from 'rxjs';
import {environment}           from '../../../environments/environment';
import {Users}                 from '../../interfaces/users/users';
import {AppResponse}           from '../../interfaces/app/app-response';
import {AppRequest}            from '../../interfaces/app/app-request';
import {LoginRequest}          from '../../interfaces/auth/login-request';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({
                providedIn: 'root'
            })
export class AuthService {

    public isLoggedIn: boolean = false;
    public username: string    = '';
    public userData: any;
    public jwt: string         = '';

    constructor(private http: HttpClient, private cookieService: CookieService) {
        console.log('AuthService constructed at', new Date());
        this.getDetailsFromCookie();
    }

    /**
     * Sends a signup request to the server with user data.
     *
     * @param {Users} data The user data object containing necessary details for registration.
     * @return {Observable<AppResponse>} An observable of the server response.
     */
    signup(data: Users): Observable<AppResponse> {
        let url                    = `${environment.API_URL}/auth/signup`;
        let appRequest: AppRequest = {
            data: data,
            jwt : null
        }
        return this.http.post<AppResponse>(url, appRequest);

    }

    getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    /**
     * Authenticates a user by sending login credentials to the server and returns an observable of the server
     * response.
     *
     * @param {LoginRequest} data - The login credentials containing username and password or other necessary
     *     information required for authentication.
     * @return {Observable<AppResponse>} An observable containing the server's response to the login request.
     */
    login(data: LoginRequest): Observable<AppResponse> {
        let url                    = `${environment.API_URL}/auth/login`;
        let appRequest: AppRequest = {
            data: data,
            jwt : null
        }
        return this.http.post<AppResponse>(url, appRequest);
    }

    /**
     * Decodes a JSON Web Token (JWT) and retrieves the payload.
     *
     * This method uses the provided JWT, decodes its content to extract the payload,
     * and logs both the JWT and the decoded payload to the console.
     *
     * @return {any} The decoded payload from the provided JWT.
     */
    decodeJwt(): any {
        console.log(this.jwt);
        if (this.jwt) {
            const payload: JwtPayload = jwtDecode(this.jwt);
            console.log(payload);
            return payload;
        }
        return null;
    }

    /**
     * Validates a JSON Web Token (JWT) by decoding it and checking its expiration time.
     * Updates the login status and username based on the token's validity.
     *
     * @return {boolean} Returns true if the JWT is valid (not expired), false otherwise.
     */
    validateJwt(): boolean {
        const jwt: any  = this.decodeJwt();
        const now: Date = new Date();
        console.log('jwt', jwt, 'current Date', new Date());
        if (jwt && now.getTime() < jwt.expiration) {
            this.isLoggedIn = true;
            this.username   = jwt.username;
        } else {
            this.isLoggedIn = false;
            this.username   = '';
        }
        return this.isLoggedIn;
    }

    /**
     * Logs out the current user by sending a logout request to the server.
     *
     * @param {AppRequest} appRequest - The request payload containing necessary information for the logout process.
     * @return {Observable<AppResponse>} An Observable containing the server's response to the logout request.
     */
    logout(appRequest: AppRequest): Observable<AppResponse> {
        const url: string = `${environment.API_URL}/auth/logout`;
        return this.http.put<AppResponse>(url, appRequest)
    }

    /**
     * Retrieves user details and JWT token from cookies if available.
     * Populates `userData` with user information and `jwt` with the parsed JSON Web Token.
     * Logs the retrieved user data and token for debugging purposes.
     *
     * @return {void} T his method does not return any value.
     */
    getDetailsFromCookie(): void {
        console.log(this.cookieService.get('hkUser'), '=>', this.cookieService.get('hkUserJwt'));
        if (this.cookieService.get('hkUser') && this.cookieService.get('hkUserJwt')) {
            this.userData = this.cookieService.get('hkUser');
            this.jwt      = JSON.parse(this.cookieService.get('hkUserJwt'))?.jwt;
            console.log('auth service *** *** *** *** ***', this.userData, this.jwt);
        }
    }
}