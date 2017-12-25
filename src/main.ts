/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import './assets/styles/main.scss'

import { AppModule } from './app'

export function bootstrap () {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
}

if (document.readyState === 'complete') {
  bootstrap()
} else {
  document.addEventListener('DOMContentLoaded', bootstrap)
}
