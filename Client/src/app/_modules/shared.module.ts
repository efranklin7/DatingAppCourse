import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-top-full-width' }),
  ],
  exports: [BsDropdownModule, CollapseModule, ToastrModule],
})
export class SharedModule {}
