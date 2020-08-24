import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  servers = [
    {
      id: 1,
      name: "toto",
      description: "le server de toto",
      status: "active"
    },
    {
      id: 2,
      name: "toto dead",
      description: "le server de toto dead",
      status: "dead"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
