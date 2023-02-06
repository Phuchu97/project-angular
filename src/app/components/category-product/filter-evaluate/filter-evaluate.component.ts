import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VoteConstans} from "../../../shared/common/category.constans";

@Component({
  selector: 'app-filter-evaluate',
  templateUrl: './filter-evaluate.component.html',
  styleUrls: ['./filter-evaluate.component.css']
})
export class FilterEvaluateComponent implements OnInit {
  public voteConstans = VoteConstans;
  public currentVote: number | null;

  @Output() evaluate = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  public onClick(value) {
    if (this.currentVote === value) {
      this.currentVote = null;
    } else {
      this.currentVote = value;
    }
    this.evaluate.emit(value);
  }

}
