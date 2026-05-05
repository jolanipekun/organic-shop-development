import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';



// MANDATORY: Initialize Firebase BEFORE the Angular Config starts
const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // We pass the already-initialized 'app' into the providers
    provideFirebaseApp(() => app),
    provideAuth(() => getAuth(app)),
    provideDatabase(() => getDatabase(app))
  ]
};