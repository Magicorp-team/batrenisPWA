import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Server } from '../class/server';
import { ServerType } from '../class/server-type';
import { User } from '../class/user';
import { Action } from '../class/action';
import { ActionService } from '../service/action.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import { ServerTypeService } from '../service/server-type.service';
import { ServerService } from '../service/server.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Env {
  key: string;
  value: string;
}

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss']
})
export class ServerFormComponent implements OnInit, AfterViewInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  envs: Env[];
  serverTypes: ServerType[];
  actions: Action[];
  users: User[];
  serverForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    backupActive: new FormControl(''),
    backupLocation: new FormControl(''),
    autorestartActive: new FormControl(''),
    autorestartTime: new FormControl(''),
    serverType: new FormControl(''),
    hostname: new FormControl(''),
    serverInstallDir: new FormControl(''),
    saveDir: new FormControl(''),
    actions: new FormControl(''),
    managers: new FormControl('')
  });

  constructor(
    private serverService: ServerService,
    private actionService: ActionService,
    private serverTypeService: ServerTypeService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ServerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public server: Server
  ) { }

  ngOnInit(): void {
    this.getActions();
    this.getUsers();
    this.getServerTypes();

    this.getEnvs();
  }

  ngAfterViewInit(): void {
    this.updateStyle();
  }

  onChange(env: Env): void {
    if (env.key.length == 0 && env.value.length == 0) {
      const index = this.envs.indexOf(env);
      if (index > -1) this.envs.splice(index, 1);
    }
  }

  updateStyle(): void {
    document.querySelectorAll("#envCont mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex").forEach(
      i => {
        i.parentNode["style"].padding = 0;
        i.parentNode["style"].margin = 0;
      }
    );
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  compareNameObjects(o1: any, o2: any): boolean {
    return o1.title === o2;
  }

  onNewChange(input: any, isKey: boolean): void {
    this.envs.push({
      key: isKey ? input.value : '',
      value: isKey ? '' : input.value
    });
    input.value = "";

    setTimeout(() => {
      let fieldsContainer = input.parentNode.parentNode.parentNode.parentNode.parentNode;
      let fielBlock = fieldsContainer.childNodes[fieldsContainer.childElementCount - 1].childNodes[isKey ? 0 : 1];
      let parentNewInput = fielBlock.childNodes[fielBlock.childElementCount - 1].firstChild;
      let newInputElm = parentNewInput.childNodes[parentNewInput.childElementCount + 2].firstChild;
      newInputElm.select();
      newInputElm.setSelectionRange(1, 1);
      let envCont = document.querySelector("#envCont");
      envCont.scrollTop = envCont.scrollHeight;
      this.updateStyle();
    }, 0.01);
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

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users
      },
      error => this.openSnackBar(`Error on get users (${error})`, "ok")
    );
  }

  getServerTypes(): void {
    this.serverTypeService.getServerTypes().subscribe(
      serverTypes => {
        this.serverTypes = serverTypes
      },
      error => this.openSnackBar(`Error on get server types (${error})`, "ok")
    );
  }

  getEnvs(): void {
    this.envs = this.server ? this.server.serverEnv : [];
  }

  createServer(server: Server) {
    this.serverService.createServer(server).subscribe(
      _ => {
        this.openSnackBar("Server created with success", "ok");
        this.dialogRef.close(true);
      },
      error => this.openSnackBar(`Error on create server (${error})`, "ok")
    );
  }

  updateServer(server: Server) {
    this.serverService.updateServer(server).subscribe(
      _ => {
        this.openSnackBar("Server updated with success", "ok");
        this.dialogRef.close(true);
      },
      error => this.openSnackBar(`Error on update server (${error})`, "ok")
    );
  }

  onSubmit(): void {
    let form = this.serverForm.value;
    let newServer: Server = new Server();
    newServer.title = form.title;
    newServer.name = form.name;
    newServer.description = form.description;
    newServer.hostname = form.hostname;
    newServer.serverInstallDir = form.serverInstallDir;
    newServer.saveDir = form.saveDir;
    newServer.backupActive = form.backupActive;
    newServer.backupLocation = form.backupLocation;
    newServer.autorestartActive = form.autorestartActive;
    newServer.autorestartTime = form.autorestartTime == '' ? null : form.autorestartTime;
    newServer.type = form.serverType.id;
    newServer.actions = form.actions.reduce((acc: Array<Number>, i: Action) => (acc.push(i.id), acc), []);
    newServer.managers = form.managers.reduce((acc: Array<Number>, i: User) => (acc.push(i.id), acc), []);
    newServer.serverEnv = this.envs;
    if (this.server) {
      newServer.id = this.server.id;
      this.updateServer(newServer);
    } else this.createServer(newServer);
  }

}
