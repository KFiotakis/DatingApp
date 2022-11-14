
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: () => { this.router.navigateByUrl("/members"); console.log("Login Successfull!"); },
        error: () => console.log("Can not Login! Try again..."),
        complete: () => console.log("Login process completed.")
      });

  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");

  }



}
