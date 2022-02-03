import Dexie, { Table } from 'dexie';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

export class WeatherDB extends Dexie {

  placeItems!: Table<GeocodeResult, number>;

  constructor() {
    super('WeatherDB');
    
    this.version(1).stores({
      placeItems: '++id,place_id,types,formatted_address,address_components,postcode_localities,geometry,plus_code,partial_match'
    });
  }
}

export const db = new WeatherDB();
