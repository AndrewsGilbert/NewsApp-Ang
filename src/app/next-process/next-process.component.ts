import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-next-process',
  templateUrl: './next-process.component.html',
  styleUrls: ['./next-process.component.css']
})
export class NextProcessComponent implements OnInit {

  @Input() webid:number = 0
  @Input() index:number = 0

  @Output() gen_audio_event:EventEmitter<number> = new EventEmitter<number>()
  @Output() gen_video_event:EventEmitter<number> = new EventEmitter<number>()
  @Output() post_video_event:EventEmitter<number> = new EventEmitter<number>()


  constructor() { }

  ngOnInit(): void {
  }

  audioGenEvent(event:number){

    this.gen_audio_event.emit(event)

  }

  videoGenEvent(event:number){

    this.gen_video_event.emit(event)

  }

  videoPostEvent(event:number){

    this.post_video_event.emit(event)

  }

}
