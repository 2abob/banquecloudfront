import { Component } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';

@Component({
  templateUrl: 'carousels.component.html',   
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true } },
    CookieService
  ]
})
export class CarouselsComponent {

  myInterval: number = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;
  isCollapsed: boolean;
  devis : string;

  numero : string;
  montant : string;
  date : string;

  constructor(private router : Router, private cookieService : CookieService, private http : HttpClient) {
    if(cookieService.get('numero') == null){
      router.navigate(['login']);
    }
    this.devis = cookieService.get('devis');
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  addSlide(): void {
    this.slides.push({
      image: `https://loremflickr.com/900/500/sailing?random=${this.slides.length % 8 + 1}/`
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  annuler(){
    this.router.navigate(['dashboard']);
  }

  deposer(){
    this.http.get('https://banquecloudmongo.herokuapp.com/decaisser?numeroSource='+this.cookieService.get("numero")+'&numeroRecepteur='+this.numero+'&montant='+this.montant+'&date='+this.date).subscribe(data=>{
      if(data == 1)alert('decaissement reussi');
      else alert('decaissement echoue');  
      this.numero = "";
      this.montant = "";
      this.date = "";  
    },err=>{
      alert('il y a des information incorrect');
    });
  }
}
