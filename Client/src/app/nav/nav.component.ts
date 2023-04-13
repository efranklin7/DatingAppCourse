import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_Services/accounts.service';
import { IUser } from '../_Model/User';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(
    public AccountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //this.currentUser$ = this.AccountService.currentUser$;
  }
  login() {
    this.AccountService.login(this.Model).subscribe({
      next: () => this.router.navigateByUrl('/members'),

      error: (error) => {
        console.log(error);
        this.toastr.error(error);
      },
    });
  }
  logout() {
    this.AccountService.logout();
    this.router.navigateByUrl('/');

    //this.loggedIn = false;
  }
  // getCurrentUser() {
  //   this.AccountService.currentUser$.subscribe({
  //     next: (user) => (this.loggedIn = !!user), // (this.loggedIn = user ? true : false),  returns true or false
  //     error: (error) => console.log(error),
  //   });
  // }
}
