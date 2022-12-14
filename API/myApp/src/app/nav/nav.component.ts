
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../models/member';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  member!:Member;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: () => { this.router.navigateByUrl("/members"); console.log("Login Successfull!"); },
        error: (e) => {console.log("Can not Login! Try again..."); this.toastr.error(e.error);},
        complete: () => console.log("Login process completed.")
      });

  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }



}
