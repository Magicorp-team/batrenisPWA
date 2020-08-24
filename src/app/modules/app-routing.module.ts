import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NewsComponent } from '../news/news.component';
import { ServersComponent } from '../servers/servers.component';
import { ServerComponent } from '../server/server.component';
import { RolesComponent } from '../roles/roles.component';
import { ManageComponent } from '../manage/manage.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'servers', component: ServersComponent, canActivate: [AuthGuard] },
  { path: 'server/:id', component: ServerComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
