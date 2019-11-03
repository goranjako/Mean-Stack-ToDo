import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { TodoComponent } from './todo/todo/todo.component';



const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},

{path: 'register', component: RegisterComponent},
{path: 'login', component: LoginComponent},
{path: 'todo', component: TodoComponent},
{path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
