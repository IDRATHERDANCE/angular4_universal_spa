import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerTransferStateModule } from '../modules/transfer-state/server-transfer-state.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
  return () => {
    appRef.isStable
      .filter(stable => stable)
      .first()
      .subscribe(() => {
        transferState.inject();
      });
  };
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [ 
    BrowserAnimationsModule, 
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    ServerModule,
    ServerTransferStateModule,
    AppModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    }
  ]
})
export class ServerAppModule {

}
