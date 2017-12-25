/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const { JSDOM } = require('jsdom')

const document = new JSDOM('<!doctype html><html><body></body></html>')

global.document = document
global.HTMLElement = document.window.HTMLElement
global.XMLHttpRequest = document.window.XMLHttpRequest

require('core-js/es6')
require('core-js/es7/reflect')

require('zone.js/dist/zone')
require('zone.js/dist/long-stack-trace-zone')
require('zone.js/dist/proxy')
require('zone.js/dist/sync-test')
require('zone.js/dist/async-test')
require('zone.js/dist/fake-async-test')
