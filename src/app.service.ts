import { Injectable } from '@nestjs/common';
import * as fs from 'fs-sync';
import * as path from 'path';
import uuidv1 = require('uuid/v1');

@Injectable()
export class AppService {
  private assetsFileId: any = path.join(__dirname, './../assets/assets.json');
  private assets = fs.readJSON(this.assetsFileId);

  public getAsset(id: string): any {
    this.assets = fs.readJSON(this.assetsFileId);
    return this.assets.filter((entry) => entry.id === id)[0];
  }

  public addAsset(content: any) {
    const randomAssetId = uuidv1().substr(0, 7);
    const entry = {
      id: randomAssetId,
      type: 'JSON',
      content,
    };

    const fileContent = fs.readJSON(this.assetsFileId);
    fileContent.push(entry);
    fs.write(this.assetsFileId, JSON.stringify(fileContent));
    return {randomAssetId};
  }

  public updateAsset(id: string, content: any) {
    const randomAssetId = uuidv1().substr(0, 7);
    const fileContent = fs.readJSON(this.assetsFileId);
    const relevantEntry = fileContent.filter((entry) => entry.id === id)[0];
    if (relevantEntry === undefined) {
      throw new Error('could not find and entry for this asset id');
    }
    relevantEntry.content = content;
    fs.write(this.assetsFileId, JSON.stringify(fileContent));
    return {randomAssetId};
  }

}
