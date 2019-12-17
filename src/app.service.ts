import { Injectable } from '@nestjs/common';
import * as fs from 'fs-sync';
import * as path from 'path';

@Injectable()
export class AppService {
  private assets = fs.readJSON(path.join(__dirname, './../assets/assets.json'));

  public getAsset(id: string): any {
    return this.assets.filter((entry) => entry.id === id)[0];
  }
}
