import { Component, OnInit, Inject } from '@angular/core';
import { ActionService } from '../service/action.service'
import { Action } from '../class/action';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  actions: Action[];
  actionForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private actionService: ActionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getActions();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getActions(): void {
    this.actionService.getActions().subscribe(
      actions => {
        this.actions = actions
      },
      error => this.openSnackBar(`Error on get actions (${error})`, "ok")
    );
  }

  createAction() {
    let form = this.actionForm.value;
    this.actionService.createAction({
      id: null,
      title: form.title,
      name: form.name,
      description: form.description
    }).subscribe(
      _ => {
        this.getActions();
        this.openSnackBar("Action created with success", "ok");
      },
      error => this.openSnackBar(`Error on create action (${error})`, "ok")
    );
  }

  openActionDialog(action: Action) {
    this.dialog.open(ActionFormDialog, {
      data: {
        id: action.id,
        title: action.title,
        name: action.name,
        description: action.description
      }
    }).afterClosed().subscribe(result => {
      if (result) this.updateAction(result);
    });
  }

  updateAction(action: Action) {
    this.actionService.updateAction(action).subscribe(
      _ => {
        this.getActions();
        this.openSnackBar("Action updated with success", "ok");
      },
      error => this.openSnackBar(`Error on update action (${error})`, "ok")
    );
  }

  deleteAction(action: Action) {
    this.actionService.deleteAction(action).subscribe(
      _ => {
        this.getActions();
        this.openSnackBar("Action deleted with success", "ok");
      },
      error => this.openSnackBar(`Error on delete action (${error})`, "ok")
    );
  }

}

@Component({
  selector: 'dialog-action-form',
  templateUrl: 'action-form.dialog.html'
})
export class ActionFormDialog {

  actionForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Action
  ) { }

}