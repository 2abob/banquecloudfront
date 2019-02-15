import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../../_nav';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';



@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [CookieService]
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private route : Router,  private cookieService : CookieService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  deconnecter(){
    this.cookieService.set("devis", "");
    this.cookieService.set("nom", "");
    this.cookieService.set("prenom", "");
    this.cookieService.set("numero", "");
    this.route.navigate(["dashboard"]);
  }
}
