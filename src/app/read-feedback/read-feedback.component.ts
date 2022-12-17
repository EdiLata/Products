import { Component, OnInit } from '@angular/core';
import {MovieService} from '../services/movie.service';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-read-feedback',
  templateUrl: './read-feedback.component.html',
  styleUrls: ['./read-feedback.component.css']
})
export class ReadFeedbackComponent implements OnInit {
  feedbackList: any[];
  filteredFeedback: any[];
  reasonList: string[];
  constructor(public service: MovieService, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.service.getFeedback().subscribe(feedback => {
      this.feedbackList = feedback;
      this.filteredFeedback = feedback;
      this.reasonList = this.categoryService.getReasons(this.feedbackList);
    });
  }

  filterFeedback(selectedFilter: string) {
    this.filteredFeedback = this.feedbackList.filter(feedback => feedback.reason === selectedFilter || selectedFilter === '');
  }

}
