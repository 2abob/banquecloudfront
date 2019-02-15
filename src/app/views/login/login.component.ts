import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [CookieService]
})
export class LoginComponent {
  private isConsented: boolean = false;

  login : string = '';
  mdp : string = '';
  //http : HttpClient;

  constructor(private http:HttpClient, private cookieService: CookieService, private router: Router){
    cookieService.set("test", "test");
    // this.isConsented = this.getCookie(COOKIE_CONSENT) === '1';
  }

  private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
              return c.substring(cookieName.length, c.length);
          }
      }
      return '';
  }

  private deleteCookie(name) {
      this.setCookie(name, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      let cpath:string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  private consent(isConsent: boolean, e: any) {
      if (!isConsent) {
          return this.isConsented;
      } else if (isConsent) {
          // this.setCookie(COOKIE_CONSENT, '1', COOKIE_CONSENT_EXPIRE_DAYS);
          this.isConsented = true;
          e.preventDefault();
      }
  }
    
  loginFormualire(){
    this.http.get('https://banquecloudmongo.herokuapp.com/login?login='+this.login+'&mdp='+this.mdp).subscribe(data=>{
      console.log(data);
      this.cookieService.set("devis", data["devis"]);
      this.cookieService.set("nom", data["nom"]);
      this.cookieService.set("prenom", data["prenom"]);
      this.cookieService.set("numero", data["numero"]);
    // alert(data);
      // console.log(data);
      // console.log(this.cookieService.get("test"));
      // this.cookieService.set("utilisateurid", data["id"]);
      // console.log(this.cookieService.get("utilisateurid"));
      this.router.navigate(['dashboard']);
    },
      err =>{
        alert('login ou mot de passe incorect');
      }
    );
  }
 }


