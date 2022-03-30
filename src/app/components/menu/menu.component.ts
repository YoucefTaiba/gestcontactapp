import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Option } from "src/app/models/option.model";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
    @Input() theme!: Option;
    @Input() options!: Array<Option>;
    @Output() themeChange: EventEmitter<Option> = new EventEmitter<Option>();

    ngOnChanges() {
      console.log(this.theme);
    }

    changeTheme(themeToSet: Option) {
      this.themeChange.emit(themeToSet);
    }

}
