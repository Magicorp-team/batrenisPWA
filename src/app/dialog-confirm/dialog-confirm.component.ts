import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  msg: string;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html'
})
export class DialogConfirmComponent {

  msg: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.msg = data.msg;
  }

}
