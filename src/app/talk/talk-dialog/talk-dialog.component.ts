/*
 * Copyright (c) 2017, Hugo Freire <hugo@afrag.st>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import 'rxjs/add/operator/finally'

import { LeadService } from '../lead.service'

@Component({
  selector: 'talk-dialog',
  templateUrl: 'talk-dialog.html',
  styles: [ 'talk-dialog.scss' ],
  providers: [ LeadService ],
})
export class TalkDialogComponent {
  constructor (public dialogRef: MatDialogRef<any>, private leadService: LeadService) {}

  private _form: FormGroup

  get form () {
    return this._form
  }

  private _isHuman: boolean = false

  get isHuman () {
    return this._isHuman
  }

  get email () {
    return this._form.get('email')
  }

  ngOnInit () {
    this._form = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ])
    })
  }

  onCaptcha (success: boolean) {
    this._isHuman = success
  }

  onLastNextButtonClick () {
    if (!this._form.valid || !this._isHuman) {
      return
    }

    const lead = { emailAddress: this._form.get('email').value }

    this.leadService.add(lead)
      .subscribe(() => {
      })
  }

  getEmailErrorMessage () {
    if (this._form.get('email').hasError('required')) {
      return 'You must enter a valid e-mail address'
    }

    if (this._form.get('email').hasError('email')) {
      return 'Not a valid e-mail address'
    }
  }
}
