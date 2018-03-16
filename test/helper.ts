/*
 * Copyright (c) 2018, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import 'jest-preset-angular'
import * as chai from 'chai'
import * as td from 'testdouble'

require('testdouble-jest')(td, jest)

const mock = () => {
  let storage = {}
  return {
    getItem: (key: any) => key in storage ? storage[ key ] : null,
    setItem: (key: any, value: any) => storage[ key ] = value || '',
    removeItem: (key: any) => delete storage[ key ],
    clear: () => storage = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: mock() })
Object.defineProperty(window, 'sessionStorage', { value: mock() })
Object.defineProperty(window, 'getComputedStyle', {
  value: () => [ '-webkit-appearance' ]
})

Object.defineProperty(global, 'should', chai.should)

Object.defineProperty(global, 'td', td)
