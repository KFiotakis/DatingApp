import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'myApp';
  users: any;
  private URL = "https://localhost:5001/api/users";

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getUsers(): void {
    this.http.get(this.URL).subscribe(
      {
        next: response => { this.users = response },
        error: e => { console.log(e); },
        complete: () => console.log(this.users)
      }
    )
  }

  setCurrentUser() {

    const user: User = JSON.parse(localStorage.getItem("user")!);

    this.accountService.setCurrentUser(user);

  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

}
