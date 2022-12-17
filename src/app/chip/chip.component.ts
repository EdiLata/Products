import {Component, Input} from '@angular/core';

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {

  @Input() text?: string;
  @Input() textColor?: string;

}
