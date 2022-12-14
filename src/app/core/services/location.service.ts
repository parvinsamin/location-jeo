import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BROWSER_STORAGE } from '../tokens/browser-storage.token';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  STORAGE_KEY = 'locations';
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }
  getLocations() {
    const locationsStr = this.storage.getItem(this.STORAGE_KEY);
    const locations = locationsStr ? JSON.parse(locationsStr) : [];
    return of(locations);
  }
  putLocation(location: any) {
    const locationsStr = this.storage.getItem(this.STORAGE_KEY);
    const locations = locationsStr ? JSON.parse(locationsStr) : [];
    this.storage.setItem(this.STORAGE_KEY, JSON.stringify([...locations, location]));
    return of({ message: 'Location added successfully' })
  }
}
