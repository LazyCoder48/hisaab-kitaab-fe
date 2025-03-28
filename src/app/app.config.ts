import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {
    provideRouter, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling, withViewTransitions
}                                                      from '@angular/router';

import {routes}                 from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG}         from 'primeng/config';
import Lara                     from '@primeng/themes/lara';
import {provideHttpClient}      from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideHttpClient(),
        provideRouter(
            routes, withViewTransitions(), withHashLocation(), withEnabledBlockingInitialNavigation(),
            withInMemoryScrolling()
        ),
        provideAnimationsAsync(),
        providePrimeNG({
                           theme : {
                               preset : Lara,
                               options: {
                                   ripple          : true,
                                   prefix          : 'p-',
                                   darkModeSelector: '.dark-mode',
                                   cssLayer        : {
                                       name : 'primeng',
                                       order: 'app-styles, primeng, another-css-library'
                                   }
                               }
                           },
                           ripple: true
                       })
    ]
};