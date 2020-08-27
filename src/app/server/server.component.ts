import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Server } from '../class/server';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../service/server.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { ServerFormComponent } from '../server-form/server-form.component';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  server: Server;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private serverService: ServerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == NaN) return this.location.back();
    this.getServer(id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getServer(id: number): void {
    this.serverService.getServer(id).subscribe(
      server => {
        server.id = id;
        this.server = server;
      },
      error => {
        this.openSnackBar(`Error on get server (${error})`, "ok");
        this.location.back();
      }
      );
    }

    deleteServer(server: Server): void {
      this.dialog.open(DialogConfirmComponent, {
        data: {
          msg: 'Warning!\nDo you want delete ' + server.title + '?'
        }
      }).afterClosed().subscribe(isYes => {
        if (isYes)
        this.serverService.deleteServer(server).subscribe(
          _ => {
            this.location.back();
            this.openSnackBar("Server deleted with success", "ok");
          },
          error => this.openSnackBar(`Error on delete server (${error})`, "ok")
        );
    });
  }

  editServer(server: Server): void {
    this.dialog.open(ServerFormComponent, {
      data: server
    }).afterClosed().subscribe(update => {
      if (update) this.getServer(server.id);
    });
  }

}
