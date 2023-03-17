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

  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.AccountService.currentUser$.subscribe({
      next: (user) => (this.loggedIn = !!user), //returns true or false
      error: (error) => console.log(error),
    });
  }

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
    this.AccountService.logout();
    this.loggedIn = false;
  }
}
