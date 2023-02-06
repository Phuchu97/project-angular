import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {PaginationConstants} from "../../common/pagination.constants";

@Component({
  selector: 'app-my-pagination',
  templateUrl: './my-pagination.component.html',
  styleUrls: ['./my-pagination.component.css']
})
export class MyPaginationComponent implements OnInit {
  @Input() totalItems: number;
  @Input() maxSize: number;
  @Input() itemsPerPage: number;
  @Output() pageChanged = new EventEmitter();
  public numPages: number;
  public paginationConstants = PaginationConstants;
  constructor() { }

  ngOnInit(): void {
  }

  change(event: PageChangedEvent) {
    this.pageChanged.emit(event);
  }
}
