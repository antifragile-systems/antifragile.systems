/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { getTestBed, TestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'

describe('AppComponent', () => {
  before(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: []
    })
  })

  afterEach(() => {
    getTestBed().resetTestingModule()
  })
})
