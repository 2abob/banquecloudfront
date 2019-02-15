import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";


@Component({
  templateUrl: 'collapses.component.html',
  providers: [CookieService]
})
export class CollapsesComponent {

  list : any;
  numero : string;

  constructor(private http : HttpClient, private cookieService : CookieService) { 
    this.numero = cookieService.get("numero");
    this.getList();
  }

  isCollapsed : boolean = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  getList(){
    // alert(this.numero);
    this.http.get("https://banquecloudmongo.herokuapp.com/getListeMouvement?numero="+this.numero).subscribe(data=>{
      // alert(data);
      this.list = data;
    },
    err=>{

    });
  }

}
