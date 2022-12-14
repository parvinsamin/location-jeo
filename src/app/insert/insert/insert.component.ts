import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/core/CoreModels';
import { LocationForm } from 'src/app/core/Location';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  locationTypes = [
    { id: 1, name: 'Business' },
    { id: 2, name: 'Home' },
    { id: 3, name: 'School' },
    { id: 4, name: 'Hospital' },
    { id: 5, name: 'Park' }
  ];
  message = '';
  finalData = [];
  model = new LocationForm();
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (Object.entries(this.model).filter(x => x[1]).length < 4) {
      return;
    }
    let locationData = [];
    this.locationService.putLocation(this.model).subscribe({
      next: (res: { message: string }) => {
        setTimeout(() => {
          this.message = res.message;
        }, 1000)
      },
      error: (err) => {
        // Catch Error.
      }
    })
    this.resetForm()
  }

  setLocation(e: Location) {
    this.model.location = e;
  }

  setFile(e: any) {
    this.model.file = e;
  }

  resetForm(): void {
    // this.model = new LocationForm();
  }
}
