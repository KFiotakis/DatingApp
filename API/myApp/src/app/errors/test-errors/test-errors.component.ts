import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] =[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404error() {
    this.http.get(this.baseUrl + "buggy/not-found").subscribe(
      {
        next: (response) => { console.log(response) },
        error: (e) => { console.log(e) }
      })
  }


  get400error() {
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe(
      {
        next: (response) => { console.log(response) },
        error: (e) => { console.log(e) }
      })
  }


  get500error() {
    this.http.get(this.baseUrl + "buggy/server-error").subscribe(
      {
        next: (response) => { console.log(response) },
        error: (e) => { console.log(e) }
      })
  }



  get401error() {
    this.http.get(this.baseUrl + "buggy/auth").subscribe(
      {
        next: (response) => { console.log(response) },
        error: (e) => { console.log(e) }
      })
  }

  get400Validationerror() {
    this.http.post(this.baseUrl + "account/register", {}).subscribe(
      {
        next: (response) => { console.log(response) },
        error: (e) => {this.validationErrors = e; }
      })
  }

}
