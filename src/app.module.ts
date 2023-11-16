import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterResponseInterceptor } from './app/application_module/interceptors/filterResponse.interceptor';
import { HealthModule } from './app/modules/health/health.module';
import { NoteModule } from './app/modules/note/note.module';

@Module({
  imports: [HealthModule, NoteModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: FilterResponseInterceptor,
    },

  ],
})
export class AppModule {}
