import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public model: any = {};
  constructor() {}

  ngOnInit(): void {}
  public register() {
    console.log(this.model);
    console.log('no deberia ');
  }
  public cancel() {
    console.log('canceled');
  }
}
