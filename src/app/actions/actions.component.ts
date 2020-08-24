import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  actions = [
    {
      title: "Start server",
      name: "start",
      description: "test de desctiption"
    },
    {
      title: "Stop server",
      name: "stop",
      description: "test de desctiption"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
