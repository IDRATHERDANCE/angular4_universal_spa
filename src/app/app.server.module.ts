import { NgModule, TransferState } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ServerModule, provideServerRendering } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  providers: [
    TransferState,
    provideServerRendering(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
