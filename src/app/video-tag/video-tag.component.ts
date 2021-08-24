import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tag',
  templateUrl: './video-tag.component.html',
  styleUrls: ['./video-tag.component.css']
})
export class VideoTagComponent implements OnInit {

  @Input() filename:string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
