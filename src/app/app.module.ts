import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProgressCardComponent} from './progress-card/progress-card.component';
import {StoryCardComponent} from './story-card/story-card.component';
import {BoardComponent} from './board/board.component';

@NgModule({
  declarations: [AppComponent, ProgressCardComponent, StoryCardComponent, BoardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
