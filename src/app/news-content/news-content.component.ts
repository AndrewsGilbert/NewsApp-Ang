import { Component, Input, OnInit } from '@angular/core';

type newsContent = {
  text: string;
  audio: string;
}

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {

  @Input() newsDet: Array<newsContent> = []
  @Input() webname:string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
