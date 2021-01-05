import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmDialogComponent, {
      // width: '390px',
      // height: '200px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: '20%'},
      data: {
        message: msg
      }
    });
  }
}

