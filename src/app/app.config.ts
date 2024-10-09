import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { VehiculeFakeService } from './team-car/services/vehicule.fake.service';
import { VehiculeService } from './team-car/services/vehicule.service';
import { AuthService } from './auth/service/auth.service';
import { AuthFakeService } from './auth/service/auth.fake.service';
import { fakeProvider } from './app.provider';


export const appConfig: ApplicationConfig = {
  providers: [  provideHttpClient(),
    // provider to inject routes, preload all modules and trace route change events
    provideRouter(routes, withPreloading(PreloadAllModules)),
    ...fakeProvider
  ]
};
