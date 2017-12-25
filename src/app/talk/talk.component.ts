/*
 * Copyright (c) 2017, Hugo Freire <hugo@afrag.st>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component } from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'

import { TalkDialogComponent } from './talk-dialog'

@Component({
  selector: 'talk',
  templateUrl: 'talk.html'
})
export class TalkComponent {
  private _dialog: MatDialogRef<TalkDialogComponent>

  constructor (public dialog: MatDialog) {}

  onTalkToAHumanButtonClick () {
    const config = new MatDialogConfig()
    config.width = '375px'

    this._dialog = this.dialog.open(TalkDialogComponent, config)
  }
}
