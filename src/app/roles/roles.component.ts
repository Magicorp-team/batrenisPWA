import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service'
import { RoleService } from '../service/role.service'
import { PermissionService } from '../service/permission.service'
import { User } from '../class/user';
import { Role } from '../class/role';
import { Permission } from '../class/permission';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  users: User[];
  roles: Role[];
  permissions: Permission[];
  selectedRole: Role;

  roleForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
    this.getPermissions()
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users
      },
      error => this.openSnackBar(`Error on get users (${error})`, "ok")
    );
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(
      roles => {
        this.roles = roles
        if (roles.length > 0) this.getRole(roles[0]);
      },
      error => this.openSnackBar(`Error on get roles (${error})`, "ok")
    );
  }

  updateUserRole(user: User): void {
    this.userService.updateUserRole(user).subscribe(
      _ => this.openSnackBar("User roles updated with success", "ok"),
      error => {
        this.openSnackBar(`Error on update user roles (${error})`, "ok");
        this.getUsers();
      }
    );
  }

  getPermissions() {
    this.permissionService.getPermissions().subscribe(
      permissions => this.permissions = permissions,
      error => this.openSnackBar(`Error on get permissions (${error})`, "ok")
    );
  }

  getRole(role: Role): void {
    this.roleService.getRole(role.id).subscribe(
      resRole => {
        resRole.id = role.id;
        resRole.permissions = Object.keys(resRole.permissions);
        this.permissions.map(i => i["selected"] = !!(resRole.permissions.find(p => p == i.name)))
        this.selectedRole = resRole;
      },
      error => this.openSnackBar(`Error on get role (${error})`, "ok")
    );
  }

  submitRole(): void {
    let form = this.roleForm.value;
    if (this.selectedRole) {
      this.roleService.updateRole(
        this.selectedRole.id,
        form.title,
        form.name,
        form.description,
        this.permissions
      ).subscribe(
        _ => {
          this.getRoles();
          this.openSnackBar("Role updated with success", "ok");
        },
        error => this.openSnackBar(`Error on update role (${error})`, "ok")
      );
    } else {
      this.roleService.createRole(
        form.title,
        form.name,
        form.description,
        this.permissions
      ).subscribe(
        _ => {
          this.getRoles();
          this.openSnackBar("Role created with success", "ok");
        },
        error => this.openSnackBar(`Error on create role (${error})`, "ok")
      );
    }
  }

  deleteRole(role: Role): void {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        msg: 'Warning!\nDo you want delete ' + role.title + '?'
      }
    }).afterClosed().subscribe(isYes => {
      if (isYes)
        this.roleService.deleteRole(role).subscribe(
          _ => {
            this.getRoles();
            this.openSnackBar("Role deleted with success", "ok");
          },
          error => this.openSnackBar(`Error on delete role (${error})`, "ok")
        );
    });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

}
