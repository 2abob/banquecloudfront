import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  login : string = '';
  mdp : string = '';
  //http : HttpClient;

  constructor(private http:HttpClient){}
    
  loginFormualire(){
    this.http.get('https://banquecloudmongo.herokuapp.com/login?login='+this.login+'&mdp='+this.mdp).subscribe(data=>{
      alert(data);
      console.log(data);
    });
  }
 }


