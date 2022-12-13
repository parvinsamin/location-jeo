import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/views/auth/auth/service/auth.service";
import { CountryService } from "../../core/services/api/common/country.service";
import { SearchService } from "../../core/services/api/common/search.service";
import { ChangeDirectionService } from "../../core/services/change-direction.service";
import { LoaderService } from "../../core/services/loader.service";
import { UserDataService } from "../../core/services/user-data.service";

export interface MenuItems {
  name: string;
  disabled?: boolean;
  icon: string;
  url?: string;
  role?: string[];
  children?: MenuItems[];
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: [
    "./home.component.scss",
    "../../../../assets/css/rtl-styles-landing.scss",
  ],
  // encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnInit, OnDestroy {
  // @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild("sidenav") sidenav: MatSidenav;
  keyword = "name";
  isLoading = false;
  showSplash = true;
  searchResults = [];
  direction: string; 
  menuItems: Array<MenuItems> = [
    {
      name: "Dashboard",
      icon: "icon-dashboard",
      url: "/admin/dashboard",
      role: ["admin", "superadmin", "hug"],
      children: [],
    },
    {
      name: "Hug",
      icon: "icon-box",
      role: ["superadmin", "hug"],
      url: "/admin/list-hugs",
      children: [
        // {
        //   name: 'Add Hug',
        //   icon: '',
        //   url: '/admin/add-hug',
        //   children: []
        // }
      ],
    },
    {
      name: "User",
      icon: "icon-user-group",
      url: "/admin/user-profile",
      role: ["superadmin", "hug"],
      children: [
        // {
        //   name: 'Profile',
        //   icon: '',
        //   url: '/admin/user-profile',
        //   children: []
        // },
        // {
        //   name: 'List user',
        //   icon: ' ',
        //   url: '/admin/users-list',
        //   role: ['superadmin', 'hug'],
        //   children: []
        // }
      ],
    },
    {
      name: "Location",
      icon: "icon-location-2",
      role: ["superadmin", "hug"],
      children: [
        {
          name: "Add Location",
          icon: "icon-plus-2",
          url: "/admin/add-location",
          children: [],
        },
        {
          name: "List Location",
          icon: "icon-list",
          url: "/admin/location-total-list",
          children: [],
        },
      ],
    },
    {
      name: "Wifies",
      url: "/admin/wifi-total-list",
      icon: "icon-wifi",
      children: [
        {
          name: "Add Wifi",
          icon: "",
          url: "/admin/add-wifi",
          children: [],
        },
        {
          name: "List Wifies",
          icon: "",
          url: "/admin/wifi-total-list",
          children: [],
        },
      ],
    },
    {
      name: "Packages",
      icon: "icon-dollar",
      // role: ['superadmin'],
      children: [
        {
          name: "Buy Package",
          icon: "",
          url: "/admin/buy-packagebuy-package",
          children: [],
        },
        {
          name: "Package Report",
          icon: "",
          url: "/admin/buy-packagereport",
          children: [],
        },
        //   {
        //     name: 'Packages',
        //     icon: 'auto_awesome',
        //     url: '',
        //     children: [
        //       {
        //         name: 'Add Package',
        //         icon: '',
        //         url: '/admin/buy-packageadd-package',
        //         children: []
        //       },
        //       {
        //         name: 'List Packages',
        //         icon: '',
        //         url: '/admin/buy-packagelist-package',
        //         children: []
        //       }
        //     ]
        //   },
        //   {
        //     name: 'Package Quantities',
        //     icon: 'style',
        //     url: '',
        //     children: [
        //       {
        //         name: 'Add Package Quantity',
        //         icon: '',
        //         url: '/admin/buy-packageadd-package-quantity',
        //         children: []
        //       },
        //       {
        //         name: 'List Packages Quantity',
        //         icon: '',
        //         url: '/admin/buy-packagelist-package-quantity',
        //         children: []
        //       }
        //     ]
        //   },
      ],
    },
  ];

  unsubscribes: Subscription[] = [];
  selectedCountry;
  cookieLocaleData = [];
  allCountries = [];
  splash = true;
  get userData() {
    return this.userDataService.userData;
  }
  constructor(
    private auth: AuthService,
    private searchService: SearchService,
    private loaderService: LoaderService,
    private countryService: CountryService,
    private userDataService: UserDataService,
    private directionService: ChangeDirectionService
  ) {}

  async ngOnInit() {
    this.allCountries = await this.getAllCountries();
    this.userDataService.updateUserData();
    const cookieData = this.directionService.allCookieData; 
    if (cookieData) {
      this.direction = cookieData.direction;
      // this.translate.setDefaultLang(cookieData.lang); 
      this.selectedCountry = cookieData.userSelectedCountry;
    } 
  }

  getAllCountries1() {
    this.countryService.getCountryList().subscribe({
      next: (res) => {
        this.allCountries = res.data.result.map((x) => ({
          ...x,
          src: "../../../../../../assets/flags/" + x.code + ".svg",
        })); 
      },
      error: (err) => {},
    });
  }
  async getAllCountries(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.countryService.getCountryList().subscribe({
        next: (res) => resolve(res.data.result),
        error: (err) => reject(err),
      });
    });
  }

  ScrollIntoView(elem: string) {
    document
      .querySelector(elem)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  selectCountry(country): void {
    this.selectedCountry = country;
    this.changeLanguage(country);
  }

  changeLanguage(userCountry): void {
    if (!userCountry) return;
    this.direction = userCountry.direction;
    // this.translate.setDefaultLang(userCountry.lang); 
    this.directionService.changeDirection(userCountry);
  }

  logout(): void {
    this.auth.logoutWithoutRedirect();
    window.location.reload();
  }

  closeSideBar(e) {
    this.sidenav.toggle();
  }

  onChangeSearch(val: string) {
    const data = {
      search: val,
    };
    let arr = [];
    this.isLoading = true;
    this.searchService.search(data).subscribe({
      next: (res) => {
        if (res.data?.hugs) {
          res.data.hugs.map((item) => {
            const k = item;
            k["name"] = item.title;
            k["type"] = "hug";
            return k;
          });
          res.data.locations.map((item) => {
            const k = item;
            k["name"] = item.location_name;
            k["type"] = "location";
            return k;
          });
          res.data.wifies.map((item) => {
            const k = item;
            k["name"] = item.ssid;
            k["type"] = "wifi";
            return k;
          });
          arr[0] = res.data.hugs;
          arr[1] = res.data.locations;
          arr[2] = res.data.wifies;
          this.searchResults = [].concat(...arr);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.loaderService.setLoader(false);
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribes.forEach((item) => item.unsubscribe());
  }
}
