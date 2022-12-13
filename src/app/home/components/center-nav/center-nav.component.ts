import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'center-nav',
  templateUrl: './center-nav.component.html',
  styleUrls: ['./center-nav.component.scss']
})
export class CenterNavComponent implements OnInit { 

  constructor() { }

  ngOnInit(): void { 
  } 
 
  ScrollIntoView(elem: string) { 
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
