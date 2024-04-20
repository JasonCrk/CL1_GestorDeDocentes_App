import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-navigation-sidebar',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroUser })],
  templateUrl: './navigation-sidebar.component.html',
})
export class NavigationSidebarComponent {
}
