import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  apiUrl: string = 'http://api.magicorp.fr/batrenis/v1';
  wsServer: string = 'ws://api.magicorp.fr/batrenis/v1';
  domain: string = ".magicorp.fr";
}