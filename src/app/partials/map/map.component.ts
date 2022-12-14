import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { latLng, Map, tileLayer } from 'leaflet';
import { LocationModel } from 'src/app/core/CoreModels';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'l-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  url: any;
  map: any;
  marker: any;
  location: LocationModel | undefined;
  @Output() setLocation: EventEmitter<any> = new EventEmitter<any>();
  @Input() model: any;
  @Input() full: boolean = false;
  @Input() storageData: any;

  options: L.MapOptions = {}

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.options = {
      layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 100,
        minZoom: 0,
        detectRetina: true,
        attribution: ' '
      })],
      zoom: 1,
      center: latLng(31, 57)
    }

  }

  selectLocation(e: LocationModel) {
    if (this.marker) this.map.removeLayer(this.marker)
    this.marker = new L.Marker(e.latlng, { draggable: true });
    if (this.model) {
      this.marker.bindPopup(`<b>${this.model.type}</b><br />${this.model.name}`).openPopup();
    } else {
      this.marker.bindPopup(`<b>Type :  </b> <br />Name:  `).openPopup();
    }
    this.map.addLayer(this.marker);
    this.setLocation.emit(e.latlng);
  }

  loadLocation(element?: any) {
    this.marker = new L.Marker(element.location, { draggable: false });
    if (element) {
      this.marker.bindPopup(`<img width="100" height="100" src=${element.file}><br /><b>Name: ${element.name}</b><br /><b>Type :${element?.type} </b><br />`).openPopup();
    }
    this.map.addLayer(this.marker);
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.setZoom(5);
    if (this.full) {

      this.locationService.getLocations().subscribe({
        next: (res) => {
          res.forEach((element: any) => {
            this.loadLocation(element);
          });
        },
        error: (err) => {
          // Catch Error.
        }
      })
    }
    this.map.on('click', (e: any) => {
      if (this.full) return;
      this.selectLocation(e);
    });
  }


  ngOnDestroy() {
    // this.map.clearAllEventListeners;
    // this.map.remove();
  };


}
