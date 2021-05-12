import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/lista' },
  { path: 'lista', component: ViewComponent},
  { path: 'formulario', component: DataComponent },
  {path: 'editar/:id', component: EditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
