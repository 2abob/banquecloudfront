import { Component, Input, ViewEncapsulation  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { stringify } from 'querystring';

@Component({
  templateUrl: 'paginations.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  encapsulation: ViewEncapsulation.None,
  providers: [CookieService]
})
export class PaginationsComponent {

  numero : string;
  date = {
    mois : "",
    anne : ""
  }

  constructor(private http : HttpClient, private cookieService : CookieService) {
    this.numero = cookieService.get("numero");
  }

  totalItems: number = 64;
  currentPage: number   = 4;
  smallnumPages: number = 0;

  maxSize: number = 5;
  bigTotalItems: number = 675;
  bigCurrentPage: number = 1;
  numPages: number = 0;

  currentPager: number   = 4;

  clotureMois : string;
  clotureAnnuel : string;
  reporter : string;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  resetClotureMois(){
    this.clotureMois = '';
  }

  resetClotureAnnuel(){
    this.clotureAnnuel = '';
  }

  resetreport(){
    this.reporter = '';
  }

  formater (temp : string){
    let obj = temp.split('-');
    this.date.anne = obj[0];
    this.date.mois = obj[1];
  }

  cloturerMois(){
    // alert(this.clotureMois);
    // alert('haha');
    this.formater(this.clotureMois);
    this.http.get('https://banquecloudmongo.herokuapp.com/CloturerMois?numeroCompte='+this.numero+'&mois='+this.date.mois+'&annee='+this.date.anne).subscribe(data=>{
      alert('cloture avec succes');
      this.clotureMois = "";
    },err=>{
      alert('cloture echoue');
      this.clotureMois = "";
    });
  }

  cloturerAnne(){
    // alert(this.clotureAnnuel);
    // alert('hoho');
    // this.formater(this.clotureAnnuel);
    this.http.get('https://banquecloudmongo.herokuapp.com/CloturerAnnee?numero='+this.numero+'&annee='+this.clotureAnnuel).subscribe(data=>{
      alert('cloture avec succes');
    },err=>{
      alert('cloture echoue');
    });
  }

  reporterMois(){
    // alert(this.reporter);
    this.formater(this.reporter);
    this.http.get('https://banquecloudmongo.herokuapp.com/reporterMois?numero='+this.numero+'&mois='+this.date.mois+'&annee='+this.date.anne).subscribe(data=>{
      alert('report avec succes');
      this.reporter = "";
    },err=>{
      alert('cloture echoue');
      this.reporter = "";
    });
  }
}
