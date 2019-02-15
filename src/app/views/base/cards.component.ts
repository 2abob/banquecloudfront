import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'cards.component.html',
  providers: [CookieService]
})
export class CardsComponent {

  devis : string;
  montant : string;
  date : string;
  constructor(private route : Router, private cookieService : CookieService, private http : HttpClient) {
    if(cookieService.get('numero') == null){
      route.navigate(['login']);
    }
    this.devis =  cookieService.get("devis");
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  annuler(): void{
    this.route.navigate(['dashboard']);
  }

  deposerargent(){
    // console.log('montant : '+this.montant+' date : '+this.date)
    this.http.get('https://banquecloudmongo.herokuapp.com/deposerArgent?numeroSource='+this.cookieService.get("numero")+'&numeroEntrer='+this.cookieService.get("numero")+'&montant='+this.montant+'&date='+this.date).subscribe(data =>{
      // console.log(data);
      if(data == 1){
        alert('depot d\'argent reussi');
        this.montant = '';
        this.date = '';
      }
    }, err=>{
      alert('montant ou date errone');
    });
  }
}
