import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Server } from '../class/server';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from '../service/server.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { ServerFormComponent } from '../server-form/server-form.component';
import { environment } from './../../environments/environment';
import { AuthService } from '../service/auth.service';
declare const AnsiUp: any;

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, AfterViewChecked {

  @ViewChild('actionTerminalElm') private actionTerminalElm: ElementRef;
  @ViewChild('serverTerminalElm') private serverTerminalElm: ElementRef;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  server: Server;

  ansi_up: any;

  actionWs: any;
  serverWs: any;

  actionStatus: string;
  actionTerminal: string = '';

  serverStatus: string;
  serverTerminal: string = '';

  cmd: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public dialog: MatDialog,
    private location: Location,
    private serverService: ServerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == NaN) return this.location.back();
    this.getServer(id);
    this.ansi_up = new AnsiUp;

    // Server terminal
    setInterval(() => {
      if (!this.serverWs) {
        this.serverStatus = "Connecting...";
        this.serverWs = new WebSocket(
          environment.wsServer + "/servers/" + this.server.id + "/terminal",
          this.auth.getToken()/*,
          { headers: { Authorization: this.auth.getToken() } }*/
        );
        this.serverWs.addEventListener("error", err => {
          this.serverStatus = "WebSocket error";
        });
        this.serverWs.addEventListener("open", () => {
          this.serverStatus = "Server terminal connection established";
        });
        this.serverWs.addEventListener("message", msg => {
          this.serverTerminal += this.showMessage(msg.data);;
        });
        this.serverWs.addEventListener("close", () => {
          this.serverStatus = "Server terminal connection closed";
          this.serverWs = null;
        });
      }
    }, 5000);
  }

  ngAfterViewChecked() {
    try {
      this.actionTerminalElm.nativeElement.scrollTop = this.actionTerminalElm.nativeElement.scrollHeight;
      this.serverTerminalElm.nativeElement.scrollTop = this.serverTerminalElm.nativeElement.scrollHeight;
    } catch (err) { }
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

  // Server actions
  runAction(action: string) {
    this.attachToActionTerminal();
    this.serverService.runAction(this.server.id, action).subscribe(
      status => {
        if (status.alreadyUse)
          this.openSnackBar('One action is currently run on this server', "ok");
        else
          this.openSnackBar('Action successfully run on server', "ok");
      },
      error => {
        this.openSnackBar(`Error on run action (${error})`, "ok");
        this.actionWs.close();
      }
    );
  }

  attachToActionTerminal() {
    this.actionStatus = "Connecting...";
    this.actionWs = new WebSocket(
      environment.wsServer + "/servers/" + this.server.id + "/actions/terminal",
      this.auth.getToken()/*,
      { headers: { Authorization: this.auth.getToken() } }*/
    );
    this.actionWs.addEventListener("error", () => {
      this.actionStatus = "WebSocket error";
    });
    this.actionWs.addEventListener("open", () => {
      this.actionStatus = "Actions terminal connection established";
    });
    this.actionWs.addEventListener("message", msg => {
      this.actionTerminal += this.showMessage(msg.data);;
    });
    this.actionWs.addEventListener("close", () => {
      this.actionStatus = "Actions terminal connection closed";
      this.actionWs = null;
    });
  }

  showMessage(msg: string): string {
    // Process
    let res = JSON.parse(msg);

    let txt = "";
    if (res.code == 1) {
      txt = res.content.stdout;
    } else if (res.code == 2) {
      txt = res.content.stderr;
    } else if (res.code == 200) {
      txt = res.content.msg;
    } else if (res.code == 500) {
      this.openSnackBar(`Error : (${res.content.msg})`, "ok");
    } else {
      this.openSnackBar(`Terminal (${res.content.error})`, "ok");
    }
    return this.ansi_up.ansi_to_html(txt);;
  }

  sendCmd(): void {
    if (!this.serverWs) this.serverStatus = "Not connect to server terminal";
    else this.serverWs.send(this.cmd);
  }

}
