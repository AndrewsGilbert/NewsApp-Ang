import { Component, OnInit ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() display_website_event:EventEmitter<any> = new EventEmitter<any>() 

  constructor() { }

  ngOnInit(): void {
  }

  displyWebsiteEventEmit(){

    this.display_website_event.emit()

  }

}
