/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { ApplicationRef, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import 'hammerjs'

import { createNewHosts, removeNgStyles } from '@angularclass/hmr'

import { AppComponent } from './app.component'
import { TalkModule } from './talk'

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    TalkModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor (public appRef: ApplicationRef) {
  }

  hmrOnDestroy (store: any) {
    const componentLocations = this.appRef.components.map((component) => component.location.nativeElement)

    store.disposeOldHosts = createNewHosts(componentLocations)

    removeNgStyles()
  }

  hmrAfterDestroy (store: any) {
    store.disposeOldHosts()

    delete store.disposeOldHosts
  }
}
