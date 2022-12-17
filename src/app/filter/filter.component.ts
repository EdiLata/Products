import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() default?: string;
  @Input() categories?: string[];
  @Output() selectedFilter = new EventEmitter();
  active: number = -1;

  onClick(index: number, category?: string) {
    if (!category) {
      this.selectedFilter.emit('');
    } else {
      this.selectedFilter.emit(category);
    }
    this.active = index;
  }

}
