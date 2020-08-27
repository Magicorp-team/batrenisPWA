import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../service/server.service'
import { Server } from '../class/server';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServerFormComponent } from '../server-form/server-form.component';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  servers: Server[];

  constructor(
    private serverService: ServerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getServers();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getServers(): void {
    this.serverService.getServers().subscribe(
      servers => {
        this.servers = servers
      },
      error => this.openSnackBar(`Error on get servers (${error})`, "ok")
    );
  }

  addServer() {
    this.dialog.open(ServerFormComponent).afterClosed().subscribe(newServer => {
      if (newServer) this.getServers();
    });
  }

}
