import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { ServerType } from '../class/server-type';
import { ServerTypeService } from '../service/server-type.service';

@Component({
  selector: 'app-server-type',
  templateUrl: './server-type.component.html',
  styleUrls: ['./server-type.component.scss']
})
export class ServerTypeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  serverTypes: ServerType[];
  serverTypeForm = new FormGroup({
    title: new FormControl('')
  });

  constructor(
    private serverTypeService: ServerTypeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getServerTypes();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getServerTypes(): void {
    this.serverTypeService.getServerTypes().subscribe(
      serverTypes => {
        this.serverTypes = serverTypes
      },
      error => this.openSnackBar(`Error on get server types (${error})`, "ok")
    );
  }

  createServerType() {
    let form = this.serverTypeForm.value;
    this.serverTypeService.createServerType({
      id: null,
      title: form.title
    }).subscribe(
      _ => {
        this.serverTypeForm.reset();
        this.getServerTypes();
        this.openSnackBar("Server type created with success", "ok");
      },
      error => this.openSnackBar(`Error on create server type (${error})`, "ok")
    );
  }

  deleteServerType(serverType: ServerType) {
    this.serverTypeService.deleteServerType(serverType).subscribe(
      _ => {
        this.getServerTypes();
        this.openSnackBar("Server type deleted with success", "ok");
      },
      error => this.openSnackBar(`Error on delete server type (${error})`, "ok")
    );
  }

}
