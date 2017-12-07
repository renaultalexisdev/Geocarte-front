import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare let google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat = 48.1246539 ;
  lng = -1.652399100000025;

  lastAdressCliqued = '';

  markers: marker[] = [
    {
      lat: 48.1246539,
      lng: -1.652399100000025,
      draggable: false,
      icon: 'red'
    },
  ];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  clickedMarker() {
    const dialogRef = this.dialog.open(CardTemplateComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '50%'
    });
  }
  mapDoubleClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      icon: 'blue'
    });
    this.getGeoLocation($event.coords.lat, $event.coords.lng);
    const dialogRef = this.dialog.open(CardAddTemplateComponent, {
      data: { lastAdress: this.lastAdressCliqued},
      panelClass: 'myapp-no-padding-dialog',
      width: '75%',
      height: '50%'
    });
  }


  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          const resultLength = rsltAdrComponent.length;
          this.lastAdressCliqued =  result.formatted_address;
        }
      });
    }
  }
}

@Component({
  selector: 'app-modal-template',
  templateUrl: './card.modal.template.html',
  styleUrls: ['./card.modal.template.css']
})
export class CardTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<CardTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-modal-template',
  templateUrl: './cardadd.modal.template.html',
  styleUrls: ['./cardadd.modal.template.css']
})
export class CardAddTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<CardTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    onNoClick(): void {
      this.dialogRef.close();
    }

}
