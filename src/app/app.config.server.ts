import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataBaseService } from '../data-base.service';
import { HttpClientModule } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(DataBaseService, { delay: 500 }),
      HttpClientModule
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
