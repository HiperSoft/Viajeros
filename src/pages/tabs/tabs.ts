import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PrincipalPage } from '../principal/principal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PrincipalPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
