import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { JokeResponse } from '../models/joke-response';
import { Observable } from 'rxjs';
import { Joke } from '../models/joke';

const API_ENDPOINT = 'https://api.icndb.com/jokes/random/5?limitTo=[nerdy]';
const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 10000;

@Injectable({
  providedIn: 'root'
})
export class JokeService {
    
    private cache$: Observable<Array<Joke>>;

    constructor(private http: HttpClient) { }

    get jokes() {
        if (!this.cache$) {
            const timer$ = timer(0, REFRESH_INTERVAL);
            this.cache$ = this.requestJokes().pipe(shareReplay(CACHE_SIZE));
        }    
        return this.cache$;
    } 
  
    private requestJokes() {
        return this.http.get<JokeResponse>(API_ENDPOINT).pipe(map(response => response.value));
    }
}
