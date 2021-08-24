import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NextProcessComponent } from './next-process/next-process.component';
import { VideoTagComponent } from './video-tag/video-tag.component';
import { NewsContentComponent } from './news-content/news-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsArticleComponent,
    AddNewsComponent,
    NextProcessComponent,
    VideoTagComponent,
    NewsContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
