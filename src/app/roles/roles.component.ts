import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  rolesF = new FormControl();
  roles = [
    {
      id: 1,
      title: "Admin",
      name: "admin",
      description: "admin description"
    },
    {
      id: 2,
      title: "User",
      name: "user",
      description: "user description"
    }
  ];

  titleF = new FormControl();
  nameF = new FormControl();
  permissions = [
    {
      id: 1,
      title: "Add new servers",
      name: "canAddServer",
      description: null
    },
    {
      id: 2,
      title: "Add new actions",
      name: "canAddAction",
      description: null
    },
    {
      id: 3,
      title: "Edit servers",
      name: "canEditAllServer",
      description: null
    },
    {
      id: 4,
      title: "Remove actions",
      name: "canDeleteAction",
      description: null
    },
    {
      id: 5,
      title: "Manager all servers",
      name: "canManageAllServer",
      description: null
    },
    {
      id: 6,
      title: "Manager personal servers",
      name: "canManageServer",
      description: null
    },
    {
      id: 7,
      title: "Use all servers",
      name: "canUseServer",
      description: null
    },
    {
      id: 8,
      title: "See servers logs",
      name: "canSeeAllServerLogs",
      description: null
    },
    {
      id: 9,
      title: "See personal servers logs",
      name: "canSeeServerLogs",
      description: null
    },
    {
      id: 10,
      title: "Remove servers",
      name: "canDeleteAllServer",
      description: null
    },
    {
      id: 11,
      title: "See servers terminal",
      name: "canSeeAllServerTerminal",
      description: null
    },
    {
      id: 12,
      title: "See personal servers terminal",
      name: "canSeeServerTerminal",
      description: null
    },
    {
      id: 13,
      title: "Use servers terminal",
      name: "canUseAllServerTerminal",
      description: null
    },
    {
      id: 14,
      title: "Use personal servers terminal",
      name: "cauUseServerTerminal",
      description: null
    },
    {
      id: 15,
      title: "Manage roles",
      name: "canManageRoles",
      description: null
    },
    {
      id: 16,
      title: "Add news",
      name: "canAddNews",
      description: null
    },
    {
      id: 17,
      title: "Edit news",
      name: "canEditNews",
      description: null
    },
    {
      id: 18,
      title: "Remove news",
      name: "canDeleteNews",
      description: null
    },
    {
      id: 19,
      title: "See Issues",
      name: "canViewIssues",
      description: null
    },
    {
      id: 20,
      title: "See news",
      name: "canViewNews",
      description: null
    },
    {
      id: 21,
      title: "Add Issues",
      name: "canAddIssues",
      description: null
    },
    {
      id: 22,
      title: "Edit Issues",
      name: "canEditIssues",
      description: null
    },
    {
      id: 23,
      title: "Remove Issues",
      name: "canDeleteIssues",
      description: null
    }
  ];

  users = [
    {
      id: 1,
      username: "admin",
      roles: [
        {
          id: 1,
          title: "Admin",
          name: "admin",
          date: "2020-08-21T15:24:25.000Z"
        },
        {
          id: 2,
          title: "User",
          name: "user",
          date: "2020-08-21T15:24:37.000Z"
        }
      ]
    },
    {
      id: 2,
      username: "toto",
      roles: []
    }
  ];

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  run(): void {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
