import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/delay';
import { HnService } from './hn.service';

@Injectable({
  providedIn: 'root'
})
export class HnResolver  implements Resolve<Observable<any>> {
    constructor(private hnService: HnService) {}

    resolve() {
      return this.hnService.getTopPosts();
    }
}
