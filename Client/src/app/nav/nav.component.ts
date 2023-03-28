import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_Services/accounts.service';
import { IUser } from '../_Model/User';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  Model: any = {};

  isCollapsed = true;
  // loggedIn: boolean = false;
  // currentUser$: Observable<IUser | null> = of(null); // of : because it is a null obsevable

  constructor(public AccountService: AccountService) {}

  ngOnInit(): void {
    //this.currentUser$ = this.AccountService.currentUser$;
  }
  // getCurrentUser() {
  //   this.AccountService.currentUser$.subscribe({
  //     next: (user) => (this.loggedIn = !!user), // (this.loggedIn = user ? true : false),  returns true or false
  //     error: (error) => console.log(error),
  //   });
  // }

  login() {
    this.AccountService.login(this.Model).subscribe({
      next: (Response) => {
        console.log(Response);
        console.log(this.Model);
        // this.loggedIn = true;
      },
      error: (error) => console.log(error),
    });
  }
  logout() {
    this.AccountService.logout();
    //this.loggedIn = false;
  }
}
