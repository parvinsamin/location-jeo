import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss', '../../../../../../assets/css/rtl-styles-landing.scss'],
})
export class ScrollToTopComponent implements OnInit {
  showScroll: boolean = false;
  showScrollHeight = 20;
  hideScrollHeight = 20;


  navIsFixed: boolean = false;
  constructor(public router: Router, @Inject(DOCUMENT) private document: any) { }
 

  ngOnInit() { }

  scrollTop() {  
    document.querySelector("body").scrollTo({top: 0, behavior: "smooth"});
  }
}
