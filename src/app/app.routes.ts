import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login";
import { DashboardComponent } from "./pages/dashboard";
import { PlaceholderComponent } from "./pages/placeholder";
import { CreateOrganizationComponent } from "./pages/create-organization";
import { OrganizationEventsComponent } from "./pages/organization-events";
import { ManageUserComponent } from "./pages/manage-user";
import { EventManagersComponent } from "./pages/event-managers";
import { EventDashboardComponent } from "./pages/event-dashboard";
import { EventSetupComponent } from "./pages/event-setup";
import { EventOverviewComponent } from "./pages/event-overview";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: PlaceholderComponent,
    data: { title: "Create Your Account" },
  },
  {
    path: "forgot-password",
    component: PlaceholderComponent,
    data: { title: "Reset Your Password" },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "create-organization",
    component: CreateOrganizationComponent,
  },
  {
    path: "organization/:id/events",
    component: OrganizationEventsComponent,
  },
  {
    path: "event/:id/dashboard",
    component: EventDashboardComponent,
  },
  {
    path: "event/:id/setup",
    component: EventSetupComponent,
  },
  {
    path: "event/:id/overview",
    component: EventOverviewComponent,
  },
  {
    path: "manage-user",
    component: ManageUserComponent,
  },
  {
    path: "event-managers",
    component: EventManagersComponent,
  },
  {
    path: "manage-profile",
    component: PlaceholderComponent,
    data: { title: "Manage Profile" },
  },
  {
    path: "change-password",
    component: PlaceholderComponent,
    data: { title: "Change Password" },
  },
  {
    path: "**",
    redirectTo: "",
  },
];
