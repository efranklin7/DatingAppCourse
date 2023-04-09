import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_Services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  public model: any = {};

  constructor(public Account: AccountService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  public register() {
    console.log(this.model);
    this.Account.register(this.model).subscribe({
      next: () => this.cancel,
      error: (error) => {
        console.log(error), this.toastr.error(error);
      },
    });
  }
  public cancel() {
    this.cancelRegister.emit(false);
  }
}
