import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumComponent } from './components/resum/resum.component';
import { CrudComponent } from './components/crud/crud.component';

export const Router: Routes = [
  { path: 'ResumComponent', component: ResumComponent },
  { path: 'Add/Remove', component: CrudComponent }  
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(Router);
