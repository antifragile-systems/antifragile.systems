/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatStepperModule } from '@angular/material/stepper'

import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha'

import { HttpWrapperModule } from '../utils'

import { TalkComponent } from './talk.component'
import { TalkDialogComponent } from './talk-dialog'
import { LeadService } from './lead.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatStepperModule,
    RecaptchaModule.forRoot(),
    HttpWrapperModule
  ],
  declarations: [ TalkComponent, TalkDialogComponent ],
  entryComponents: [ TalkDialogComponent ],
  exports: [ TalkComponent ],
  providers: [
    LeadService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LfTPz4UAAAAAMbeCT3cvtxa-JK23EdvEJ4y6Apl' } as RecaptchaSettings
    }
  ]
})
export class TalkModule {}
