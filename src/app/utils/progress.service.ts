import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  stages = [
    {
      id: 'Stage-1',
      name: 'IceBox',
      items: [
        {
          id: 'Story-101',
          title: 'Story 1',
          description: 'Description of story 1',
          allComments: [
            {
              id: 'Story-101-c1',
              description: 'Story is in progress',
              date: null,
            },
          ],
        },
        {
          id: 'Story-A4224',
          title: 'Sample',
          description: 'Sample Description',
          allComments: [
            {
              id: 'A4224-C1',
              description: 'Sample Comment 1',
              date: null,
            },
          ],
        },
      ],
    },
    {
      id: 'Stage-2',
      name: 'BackLog',
      items: [],
    },
    {
      id: 'Stage-3',
      name: 'In Progress',
      items: [],
    },
    {
      id: 'Stage-4',
      name: 'Ready For Verification',
      items: [
        {
          id: 'Story-D4224',
          title: 'Sample',
          description: 'Sample Description',
          allComments: [
            {
              desc: 'Comment 1',
              date: '09-03-2018',
            },
          ],
        },
      ],
    },
    {
      id: 'Stage-5',
      name: 'In Verification',
      items: [],
    },
    {
      id: 'Stage-6',
      name: 'Done',
      items: [],
    },
    {
      id: 'Stage-7',
      name: 'Resolved',
      items: [],
    },
  ];

  private progressStages: BehaviorSubject<any> = new BehaviorSubject(this.stages);

  constructor() {}

  getProgressStages() {
    return this.progressStages.asObservable();
  }

  updateStage(stages, storyDetails, updatedStage) {
    stages.map((stage) => {
      if (stage.id === updatedStage.id) {
        const existingItem = stage.items.find((item) => item.id === storyDetails.id);

        if (!existingItem) {
          const obj = stage.items.push(storyDetails);
          Object.assign({}, stage, obj);
        } else {
          Object.assign({}, existingItem, storyDetails);
        }
      }
    });

    return stages;
  }

  setNewStory(storyDetails, updatedStage) {
    this.stages = this.updateStage(this.stages, storyDetails, updatedStage);
    this.progressStages.next(this.stages);
  }

  deleteStage(selectedStage) {
    const newData = this.stages.filter((stage) => stage.id !== selectedStage.id);
    this.stages = newData;
    this.progressStages.next(this.stages);
  }

  filterItem(items, story) {
    return items.filter((item) => item.id !== story.id);
  }

  deleteStory(stage, story) {
    console.log('delte', stage, story);

    this.stages.map((eachStage) => {
      if (eachStage.id == stage.id) {
        eachStage.items = this.filterItem(eachStage.items, story);
      }
    });
  }
}
