import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuardService] },
  { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuardService] },
  { path: 'detail/:id', loadChildren: './detail/detail.module#DetailPageModule', canActivate: [AuthGuardService] },
  { path: 'add-sighting/:id', loadChildren: './add-sighting/add-sighting.module#AddSightingPageModule', canActivate: [AuthGuardService] },
  { path: 'add-bird', loadChildren: './add-bird/add-bird.module#AddBirdPageModule', canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
