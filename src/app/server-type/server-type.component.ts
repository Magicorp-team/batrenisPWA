import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-type',
  templateUrl: './server-type.component.html',
  styleUrls: ['./server-type.component.scss']
})
export class ServerTypeComponent implements OnInit {

  serverTypes = [
    {
      title: "Minecraft"
    },
    {
      title: "Others",
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
