import {Component}                                               from '@angular/core';
import {Toast}                                                   from 'primeng/toast';
import {Button}                                                  from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService}                                             from '../../services/auth/auth.service';
import {MessageService, PrimeTemplate}                           from 'primeng/api';
import {Router, RouterLink}                                      from '@angular/router';
import {AppResponse}                                             from '../../interfaces/app/app-response';
import {InputText}                                               from 'primeng/inputtext';
import {FloatLabel}                                              from 'primeng/floatlabel';

@Component({
             selector   : 'app-signup',
               imports: [
                   Toast,
                   Button,
                   ReactiveFormsModule,
                   InputText,
                   RouterLink,
                   PrimeTemplate,
                   InputText,
                   FloatLabel
               ],
             templateUrl: './signup.component.html',
             styleUrl   : './signup.component.scss'
           })
export class SignupComponent {

  signupForm: FormGroup = new FormGroup(
    {
      username      : new FormControl('ajitesh.newnaha@outlook.com', [Validators.required]),
      firstName     : new FormControl('Ajitesh', [Validators.required]),
      lastName      : new FormControl('Newnaha', [Validators.required]),
      contactNumber : new FormControl('8408075788', [Validators.required]),
      password      : new FormControl(
        'Pass@1234', [Validators.required,
                      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]
      ),
      retypePassword: new FormControl(
        'Pass@1234', [Validators.required,
                      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]
      )
    }
  );

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  reset() {
    this.signupForm.reset();
  }

  signup() {
    this.messageService.clear('signup-toast');
    console.log(this.signupForm.valid, this.signupForm);
    const user = this.signupForm.getRawValue();
    if (this.signupForm.valid) {
      console.log(user.password, user.retypePassword);
      if (user.password === user.retypePassword) {
        console.log(this.signupForm.getRawValue());
        this.signupForm.disable();
        this.authService.signup(user).subscribe(
          {
            next    : (response: AppResponse) => {
              console.log(response);
              let countdown: number = 5;
              this.messageService.add(
                {
                  key     : 'signup-toast',
                  sticky  : true,
                  severity: 'success',
                  life    : 5000,
                  summary : `${response.data.firstName} ${response.data.lastName}`,
                  detail  : `Your account is created, please wait we will redirect you to Login page in ${countdown}`
                }
              );
              setTimeout(() => {

                this.messageService.clear('signup-toast');
                this.router.navigate(['/login']).then(r => console.log('navigated to /login', r));
              }, 5000);
            },
            error   : (error: any) => {
              this.signupForm.enable();
              console.log('error while sign up', error);
              this.messageService.add(
                {
                  key     : 'signup-toast',
                  severity: 'error',
                  summary : `${error.error.title} (${error.error.status})`,
                  detail  : error.error.description,
                  life    : 5000
                }
              );
            },
            complete: () => {
              console.log("Signup functionality completed");
            }
          }
        );
      } else {
        this.signupForm.enable();
        this.messageService.add(
          {
            key     : 'signup-toast',
            severity: 'warn',
            summary : 'Error: Password do not match',
            life    : 3000
          }
        );
      }
    } else {
      this.signupForm.enable();
      this.messageService.add(
        {
          key     : 'signup-toast',
          severity: 'error',
          summary : 'Error: all fields are mandatory',
          life    : 1000
        }
      );
    }
  }
}