import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  id = 1;
  server = {
    name: "toto",
    description: "le server de toto",
    serviceName: "toto",
    scriptServer: "totod",
    hostnameIp: "cheztoto.fr",
    backupActive: false,
    backupLocation: "/dev/null",
    autorestartActive: true,
    autorestartTime: "now",
  }

  constructor() { }

  ngOnInit(): void {
  }

}
