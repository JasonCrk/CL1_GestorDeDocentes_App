import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router'

import { NavigationSidebarComponent } from '../../../components/ui/navigation-sidebar/navigation-sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationSidebarComponent
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {

}
