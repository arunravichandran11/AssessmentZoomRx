import {Component, OnInit} from '@angular/core';
import {ProgressService} from '../utils/progress.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  stagesOfWork: Array<object>;
  selectedStage: any;
  seletedStory: any;
  showCardDetails = false;
  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.getProgressStages().subscribe((stage) => (this.stagesOfWork = stage));
  }

  openStoryCard(selectedStageAndStory) {
    this.selectedStage = selectedStageAndStory.stage;
    this.seletedStory = selectedStageAndStory.item;
    this.showCardDetails = true;
  }

  closeStoryCard(e: any) {
    if (e) {
      this.showCardDetails = false;
    }
  }
}
