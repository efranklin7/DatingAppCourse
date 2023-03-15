import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_Services/accounts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  Model: any = {};
  loggedIn: boolean = false;
  constructor(private AccountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.AccountService.login(this.Model).subscribe({
      next: (Response) => {
        console.log(Response);
        console.log(this.Model);
        this.loggedIn = true;
      },
      error: (error) => console.log(error),
    });
  }
  logout() {
    this.loggedIn = false;
  }
}
