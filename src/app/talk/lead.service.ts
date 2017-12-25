/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { HttpWrapper } from '../utils'

@Injectable()
export class LeadService {
  constructor (private http: HttpWrapper) {
  }

  add (lead: object): Observable<any> {
    return this.http.post(`lead`, lead)
  }
}
