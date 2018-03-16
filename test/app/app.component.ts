/*
 * Copyright (c) 2018, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'

import { AppComponent } from '../../src/app/app.component'

describe('AppComponent', () => {
  let test: AppComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
  })

  describe('when creating component', () => {
    beforeEach(() => {
      test = TestBed.createComponent(AppComponent).componentInstance
    })

    it('should be created', () => {
      expect(test).toBeDefined()
    })
  })
})
