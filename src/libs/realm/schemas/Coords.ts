import { Realm } from '@realm/react';

export type CoordsSchemaProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export class Coords extends Realm.Object<Coords> {
  latitude!: number;
  longitude!: number;
  timestamp!: number;

  static generate({ latitude, longitude, timestamp }: CoordsSchemaProps) {
    return {
      latitude,
      longitude,
      timestamp
    };

    // AULA PAROU EM 03:17
  }
}