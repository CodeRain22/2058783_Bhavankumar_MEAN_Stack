import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contacts } from '../userContactinfo';
import { User } from '../userData';

@Component({
  selector: 'app-lsp',
  templateUrl: './lsp.component.html',
  styleUrls: ['./lsp.component.css']

})
export class LspComponent implements OnInit {
  loginFlag:boolean= true;
  signupFlag:boolean=false;
  showtableFlag:boolean=false;
  loggedPersonName:string="";
  portfolioFlag:boolean=false;
  isSucesslogin:boolean=false;
  loginmsg:string=""
  portfolioMsg:string="";
  users?:User;
  contact:Array<Contacts>=[];
  constructor() { }
  ngOnInit(): void {
  }
  disableLogin():void{
    this.signupFlag=true;
    this.loginFlag=false;
    this.portfolioFlag=false;
  }

  disableSignUpandPort():void{
    this.signupFlag=false;
    this.loginFlag=true;
    this.portfolioFlag=false;
    this.loggedPersonName="";
    this.isSucesslogin=false;
    this.showtableFlag=false;
    this.loginmsg=""
  }

  checkUser(loginRef:NgForm):void{
    let login=loginRef.value;
    if(login.user==this.users?.username && login.pass==this.users?.password)
    {
      this.isSucesslogin=true;
      this.loggedPersonName=this.users?.firstname +" "+this.users?.lastname;
      this.loginmsg="Successful login"
    }else{
      this.loginmsg="Please Enter Correct Username/Password."
    }
    if(this.isSucesslogin==true){
      this.portfolioFlag=true;
      this.loginFlag=false;
      this.signupFlag=false;
    }
    loginRef.reset();
  }
  addUser(signupRef:NgForm):void{
    let signup=signupRef.value;
    this.users={username:signup.un,password:signup.p,firstname:signup.fn,lastname:signup.ln};
    sessionStorage.clear();
    this.contact=[];
    this.portfolioFlag=false;
    this.loginFlag=true;
    this.signupFlag=false;
    signupRef.reset();
  }
  addContacts(potfolio:NgForm):void{
    let contactInfo=potfolio.value;
    let contactObj:Contacts={name:contactInfo.contact_name,phone:contactInfo.phone};
    this.contact.push(contactObj)
    potfolio.reset();
  }
  showContacts():void{
    if(this.contact.length!=0){
      this.showtableFlag=true;
    }
    else
    {
      this.portfolioMsg="There are No Contacts in system yet"
    }
  }
  
}
