import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: [ './slide.component.scss' ],
})
export class SlideComponent implements OnInit {

  @Input() newsSlides: any;
  @Input() slideOptions: any;

  constructor() { }

  ngOnInit() { }

}
