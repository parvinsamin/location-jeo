import { CommonModule } from '@angular/common';
// import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { PartialsModule } from '../admin/partials/partials.module';
import { GetPackagePipe } from './../../core/pipe/get-package.pipe';
import { CenterNavComponent } from './components/center-nav/center-nav.component';
import { HomeEnComponent } from './components/home-en/home-en.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
 
@NgModule({
    declarations: [
        HomeComponent, 
        GetPackagePipe,
        LandingPageComponent, ScrollToTopComponent, CenterNavComponent, SplashScreenComponent, HomeEnComponent 
    ],
    imports: [
        CoreModule,
        CommonModule,
        HomeRoutingModule, 
        PartialsModule,
        SharedModule,  
        // TranslateModule.forRoot({
        //     // defaultLanguage: 'fa',
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: HttpLoaderFactory,
        //         deps: [HttpClient]
        //     }
        // }) 
    ],
    exports: [ 
        CoreModule,
        FlexLayoutModule, 
        // TranslateModule
    ],
    providers: [ 
    ]
})
export class HomeModule {

}
