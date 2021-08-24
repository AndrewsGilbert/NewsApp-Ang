import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

type web = {
  id: number;
  name: string;
  url: string;
  selector: Array<string>;
}

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {

   @Input() web:Array<web> = []

   @Output() show_news_event:EventEmitter<number> = new EventEmitter<number>() 

  constructor() {}

  ngOnInit(): void {
  }

  showNewsEvent(event:number){

    this.show_news_event.emit(event)

  }

}
