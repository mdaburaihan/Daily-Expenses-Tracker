import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'display-profile-pic',
  templateUrl: './display-profile-pic.component.html',
  styleUrls: ['./display-profile-pic.component.css']
})
export class DisplayProfilePicComponent implements OnInit {
  @Input('selectedProfilePic') selectedProfilePic;
  constructor() { }

  ngOnInit() {

  }

}
