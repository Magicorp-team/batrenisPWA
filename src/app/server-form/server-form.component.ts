import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Server } from '../class/server';
import { ServerType } from '../class/server-type';

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

  server: Server;
  envs: Env[];
  serverTypes: ServerType[] = [
    {
      id: 1,
      title: "Others"
    }
  ];
  selectedServerType: ServerType;
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
    saveDir: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
    this.getEnvs();
  }

  ngAfterViewInit(): void {
    this.updateStyle();
  }

  onChange(env: Env): void {
    console.log(env);
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

  onNewChange(input: any, isKey: boolean): void {
    this.envs.push({
      key: isKey? input.value : '',
      value: isKey? '' : input.value
    });
    input.value = "";

    setTimeout(() => {
      let fieldsContainer = input.parentNode.parentNode.parentNode.parentNode.parentNode;
      let fielBlock = fieldsContainer.childNodes[fieldsContainer.childElementCount-1].childNodes[isKey? 0 : 1];
      let parentNewInput = fielBlock.childNodes[fielBlock.childElementCount-1].firstChild;
      let newInputElm = parentNewInput.childNodes[parentNewInput.childElementCount+2].firstChild;
      newInputElm.select();
      newInputElm.setSelectionRange(1, 1);
      let envCont = document.querySelector("#envCont");
      envCont.scrollTop = envCont.scrollHeight;
      this.updateStyle();
    }, 0.01);
  }

  getEnvs(): void {
    this.envs = [
      {
        key: "PORT",
        value: "25566"
      },
      {
        key: "test",
        value: "lol"
      }
    ]
  }

}
