import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PackagesService } from 'src/app/modules/core/services/api/admin/packages/packages.service';
import { CountryService } from 'src/app/modules/core/services/api/common/country.service';
import { ChangeDirectionService } from 'src/app/modules/core/services/change-direction.service';

@Component({
  selector: 'app-home-en',
  templateUrl: './home-en.component.html',
  styleUrls: ['./home-en.component.scss']
})
export class HomeEnComponent implements OnInit {
  packages= [];
  durations = [];
  allCountries = [];
  selectedCountry ={id:1,flag_url:' '}
  constructor(
    private packagesService: PackagesService,
    private countryService: CountryService,
    private directionService: ChangeDirectionService,
    private cookie: CookieService
  ) { }

  async ngOnInit() {
    this.allCountries = await this.getAllCountries(); 
    this.getPackage();
    
  }
  async getAllCountries(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.countryService.getCountryList().subscribe({
        next: (res) => resolve(res.data.result),
        error: (err) => reject(err),
      });
    });
  }
  getPackage() {
    const userCountry = JSON.parse(this.cookie.get('userSelectedCountry'));
    this.packagesService.listPackagesWithOutLogin({ countryId: userCountry['id'] }).subscribe({
      next: (res) => {
        if (res.data) {
          this.packages = res.data; 
        }
      },
      error: (err) => {
        console.log('Err ', err);
      }
    });
  }
  selectCountry(country): void {
    this.selectedCountry = country;
    this.changeLanguage(country);
  }

  changeLanguage(userCountry): void {
    if (!userCountry) return; 
    // this.translate.setDefaultLang(userCountry.lang); 
    this.directionService.changeDirection(userCountry);
  }

  @HostListener('window:scroll', ['$event']) 
  onWindowScroll(e) {
    if(e.target['scrollingElement'].scrollTop  > 0) { 
      document.getElementById('sticky-wrapper').classList.add('is-sticky');
    } else { 
      document.getElementById('sticky-wrapper').classList.remove('is-sticky');
    }
  }
}
