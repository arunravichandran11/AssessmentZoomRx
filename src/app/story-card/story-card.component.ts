import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {StoryDetailsSchema} from './story.model';

import {ProgressService} from '../utils/progress.service';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {
  @Input('title') cardTitle: string;
  @Input('stage') stage: any;
  @Input('story') story: StoryDetailsSchema;

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  storyComment: any;

  cardInformation = {
    id: null,
    title: null,
    description: null,
    allComments: [],
  };

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    if (this.story) {
      this.cardInformation = this.story;
      this.cardTitle = this.cardInformation.title;
    }
  }

  getDateFormat(date: any) {
    const createdMonthNumber = date.getMonth();
    const day = date.getDate();
    const monthName = this.monthNames[createdMonthNumber];
    const year = date.getUTCFullYear();

    const formatedDateValue = `${monthName} - ${day}, ${year}`;

    return formatedDateValue;
  }

  addComments() {
    const commentId = Math.round(Date.now() * (this.cardInformation.allComments.length + 1));

    const newComment: any = {
      id: commentId,
      description: this.storyComment,
      date: this.getDateFormat(new Date()),
    };

    if (newComment) {
      this.cardInformation.allComments.push(newComment);
    }
  }

  saveStoryInformation(event: any) {
    const storyId = Math.round(Date.now() * (this.stage.items.length + 1));
    this.cardInformation.id = `Story-${storyId}`;
    this.progressService.setNewStory(this.cardInformation, this.stage);
    this.onClose.emit(this.stage);
  }

  deleteStory() {
    this.progressService.deleteStory(this.stage, this.story);
    this.onClose.emit(this.stage);
  }

  closeModal(e: any) {
    this.onClose.emit([e]);
    e.stopPropagation();
    e.preventDefault();
  }

  modalContentClick(event: any) {
    event.stopPropagation();
  }
}
