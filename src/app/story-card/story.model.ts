import {CommentsSchema} from './comments.model';

export interface StoryDetailsSchema {
  id: string;
  title: string;
  description: string;
  allComments: [];
}
