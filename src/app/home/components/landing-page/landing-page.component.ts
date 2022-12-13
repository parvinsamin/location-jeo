import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PackagesService } from 'src/app/modules/core/services/api/admin/packages/packages.service';
import * as swiper from 'swiper';
import { fade, slideUp } from './animations';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../../../../../../assets/css/rtl-styles-landing.scss'],
  animations: [
    fade,
    slideUp
  ]
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  mySwiper: Swiper;
  packages = [];
  durations = [];
  selectedPackage = [];
  isLoaded = false;
  state = 1;
  constructor(
    private packagesService: PackagesService,
    private cookie: CookieService,

  ) {

  }

  ngOnInit() {
    this.getAllPackages();
  }

  lazyLoadTab() {
  }

  getAllPackages() {
    let myPackages = [];
    const userCountry = JSON.parse(this.cookie.get('userSelectedCountry'));
    this.packagesService.listPackagesWithOutLogin({ countryId: userCountry['id'] }).subscribe({
      next: (res) => {
        if (res.data) {
          res.data.forEach((element, i) => {

            if (!myPackages[element.package_name]) {
              myPackages[element.package_name] = [];
            }
            if (!myPackages[element.package_name][element.package_duration]) {
              myPackages[element.package_name][element.package_duration] = [];
            }
            myPackages[element.package_name][element.package_duration].push(element);
            this.isLoaded = true;
          }); 
          for (const [key, value] of Object.entries(myPackages)) {
            let t = [];
            let i = 0
            for (const [key1, value1] of Object.entries(value)) {
              value1[0]['isSelected'] = false;
              if (i === 0) {
                value1[0]['isSelected'] = true;
              }
              t.push(value1[0]);
              i++;
            }
            this.packages.push(t);
            console.log('packages ',this.packages)
          }
 
        }
      },
      error: (err) => {
        console.log('Err ', err);
      }
    });
  }

  selectDuration(item, event) { 
    this.packages = this.packages.map(x => {
      let z = x;
      const allIds = x.find(c => c.package_id == event.target.value) 
      if (allIds) {
        x.map(y => {
          let t = y;
          if (y?.isSelected) {
            y.isSelected = false
          }
          if (y.package_id == event.target.value) {
            y.isSelected = true;
          }
          return t;
        })
      }
      return z;
    })
  }

  ngAfterViewInit() {
    this.mySwiper = new swiper('.swiper', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      autoplay: 3000,
      spaceBetween: 0,
      loop: true,
      speed: 1000,
      centeredSlides: true,
    });
    this.listenCookieChange(({ oldValue, newValue }) => {
      //  console.log(`Cookie changed from "${oldValue}" to "${JSON.parse(newValue)}"`);
    }, 1000);

  }

  listenCookieChange(callback, interval = 1000) {
    let lastCookie = document.cookie;
    setInterval(() => {
      let cookie = document.cookie;
      if (cookie !== lastCookie) {
        try {
          this.getAllPackages();
          callback({ oldValue: lastCookie, newValue: cookie });
        } finally {
          lastCookie = cookie;
        }
      }
    }, interval);
  }

  activate(event,i) {
    var doc = document.getElementById("package" + event[i].package_id);
    var sections = document.querySelectorAll('.card-package');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('is-active');
    }
    setTimeout(() => {
       doc.classList.add("is-active");
    }, 0)
  }
  
  deActivate() { 
    var sections = document.querySelectorAll('.card-package');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('is-active');
    }
    
  }
}
