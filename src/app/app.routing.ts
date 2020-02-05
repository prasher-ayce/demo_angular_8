import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { PersonComponent } from "./person";
import { RegisterComponent } from "./register";
import { AuthGuard } from "./_helpers";
import { PersonListComponent } from "./person-list/person-list.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "add_person", component: PersonComponent },
  { path: "persons", component: PersonListComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
