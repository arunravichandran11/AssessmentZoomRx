import {Component, OnInit, ElementRef, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {ProgressService} from '../utils/progress.service';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
  @Input('stage') stage: any;

  @Output() onStorySelection: EventEmitter<any> = new EventEmitter();

  stages: Array<object>;
  selectedStage: object;
  showCardDetails: boolean = false;

  @ViewChild('itemsHolder', {static: false}) itemsHolder: ElementRef;
  @ViewChild('dragItem', {static: false}) dragItem: ElementRef;

  carditems: Array<object> = [];
  showNewCardEditor: boolean = false;

  newlyEnteredCardTitle: string;

  constructor(private progressService: ProgressService) {}

  ngOnInit() {}

  editCard(item: any) {
    this.showCardDetails = true;
    this.selectedStage = this.stage;
    this.onStorySelection.emit({stage: this.selectedStage, item});
  }

  enterNewCardSection(event: any) {
    event.preventDefault();
    this.showNewCardEditor = true;
  }

  editCardTitle(event: any) {
    this.newlyEnteredCardTitle = event.target.textContent;
  }

  closeNewCardEditor() {
    this.showNewCardEditor = false;
  }

  addNewItem() {
    const newObj = {
      title: this.newlyEnteredCardTitle,
      description: 'Test Description',
      comments: [
        {
          desc: 'Comment 2',
          date: '09-03-2018',
        },
      ],
    };
    this.carditems.push(newObj);

    this.showNewCardEditor = false;
  }

  deleteStage() {
    this.progressService.deleteStage(this.stage);
  }

  onDragStart(event: any) {
    event.dataTransfer.setData('Text', event.target.id);
    event.target.style.opacity = '0.7';
  }

  onDragEnd(event: any) {
    event.target.style.opacity = '1';
  }

  onDrag(event: any) {}

  onDrop(event: any) {
    event.preventDefault();
    if (event.target.className === 'items-holder') {
      event.target.style.border = '';
      const data = event.dataTransfer.getData('Text');
      const sourceElement = document.getElementById(data);
      event.target.appendChild(sourceElement);
      event.target.style.background = 'none';
    }
  }

  onDragEnterTarget(event: any) {
    if (event.target.className === 'items-holder') {
      event.target.style.background = 'lightgrey';
    }
  }

  onDragOverTarget(event: any) {
    event.preventDefault();
  }

  onDragLeaveTarget(event: any) {
    if (event.target.className === 'items-holder') {
      event.target.style.background = 'none';
    }
  }
}
