import { Component, OnInit,Input,Output,EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  @Input() webid:number = 0
  @Input() index:number = 0
  @Output() add_news_event:EventEmitter<{ind:number,ntext:string}> = new EventEmitter<{ind:number,ntext:string}>()

  constructor() { }

  ngOnInit(): void {
  }

  addNewsEvent(id:number,text:any){
  
    this.add_news_event.emit({ind:this.index,ntext:text.value})
    text.value =''

  }

}
