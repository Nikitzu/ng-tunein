import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: '[appMenu]',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
@HostBinding('class') menuClass = 'menu';

  constructor() { }

  ngOnInit() {
  }

}
