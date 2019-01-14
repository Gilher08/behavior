import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject, from, of, interval, timer, concat, merge, ConnectableObservable } from 'rxjs';
import {
    scan, concatMap, delay, publish, mergeMap, map, tap, distinctUntilChanged, concatAll,
    take, combineAll, reduce, mapTo, share, switchMap
} from 'rxjs/operators';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

    private sub: any;

    constructor() { }

    ngOnInit() {
        const button = document.querySelector('button');
        fromEvent(button, 'click').subscribe(() => console.log('Clicked!'));
    }

    onSubject() {
        const subject = new Subject<number>();

        subject.subscribe({
            next: (v) => console.log(`observerA: ${v}`)
        });
        subject.subscribe({
            next: (v) => console.log(`observerB: ${v}`)
        });

        const observable1$ = from([1, 2, 3, 4, 5]);

        // observable1$.subscribe(subject); // You can subscribe providing a Subject

        from([1, 2, 3, 4, 5, true]).subscribe(subject);
    }

    onClickOne() {
        const observable = Observable.create(function (observer) {
            observer.next("Data from observer");
            observer.next("Other data from server");
            observer.next(12);
            observer.complete();
        });

        observable.subscribe({
            next: (data: any) => console.log(data),
            error: (err: any) => console.log(err),
            complete: () => console.log("Complete")
        });

    }

    onTimer() {
        const timerObs$ = timer(2000, 1000).pipe(take(40));
        this.sub = timerObs$.subscribe(val => console.log(val));
    }

    onStopTimer() {
        this.sub.unsubscribe();
    }

    onConcat() {
        const source1$ = of(1, 2, 3);
        const source2$ = of(4, 5, 6);
        const source3$ = source1$.pipe(delay(3000));

        const obs$ = concat(source1$, source2$, source3$);
        obs$.subscribe((val: any) => {
            console.log(val);
        });

        const source = interval(2000);
        const example = source.pipe(
            //for demonstration, add 10 to and return as observable
            map(val => of(val + 10)),
            //merge values from inner observable
            concatAll()
        );
        //output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
        const subscribe = example.subscribe(val =>
            console.log('Example with Basic Observable:', val)
        );
    }

    onCombineAll() {
        const source = interval(1000).pipe(take(2));

        const example = source.pipe(
            map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
        );

        const combined = example.pipe(combineAll());
        const subscribe = combined.subscribe(val => console.log(val));
    }

    onPromise() {
        const myPromise = (val: any) => new Promise(resolve => resolve(`Promise Resolved: ${val}`));
        myPromise('My value').then((value: any) => console.log(value));
    }

    onExercice() {
        const source1$ = interval(1000).pipe(map(val => `Source 1 : ${val}`), take(4));
        const source2$ = interval(1500).pipe(map(val => `Source 2 : ${val}`), take(4));
        // const obs$ = concat(source1$, source2$);
        const obs$ = merge(source1$, source2$);
        obs$.subscribe(val => console.log(val));

    }

    onConcatMap() {
        const source = of(2000, 1000);
        // map value from source into inner observable, when complete emit result and move to next
        const example = source.pipe(
            concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
        );
        //output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
        const subscribe = example.subscribe(val =>
            console.log(`With concatMap: ${val}`)
        );
    }

    onReduce() {
        const source = of(1, 2, 3, 4);
        const example = source.pipe(reduce((acc, val) => acc + val));
        //output: Sum: 10'
        const subscribe = example.subscribe(val => console.log('Sum:', val));

        const s$ = of(1, 2, 3);
        // basic scan example, sum over time starting with zero
        const ex$ = s$.pipe(scan<number>((acc, curr) => acc + curr, 0));
        // log accumulated values
        // output: 1,3,6
        const sub = ex$.subscribe(val => console.log(val));

    }

    onTap() {
        const source = of(1, 2, 3, 4, 5);
        //transparently log values from source with 'do'
        const example = source.pipe(
            tap(val => console.log(`BEFORE MAP: ${val}`)),
            map(val => val + 10),
            tap(val => console.log(`AFTER MAP: ${val}`))
        );

        //'do' does not transform values
        //output: 11...12...13...14...15
        const subscribe = example.subscribe(val => console.log(val));
    }

    onPublish() {
        const source = <ConnectableObservable<any>>interval(1000).pipe(
            //side effects will be executed once
            tap(_ => console.log('Do Something!')),
            //do nothing until connect() is called
            publish()
        );

        const subscribe = source.subscribe(val =>
            console.log(`Subscriber One: ${val}`)
        );

        const subscribeTwo = source.subscribe(val =>
            console.log(`Subscriber Two: ${val}`)
        );

        setTimeout(() => {
            source.connect();
        }, 5000);

    }

    onShare() {
        const source = timer(1000).pipe(
            tap(() => console.log('***SIDE EFFECT***')),
            mapTo('***RESULT***'),
            share()
        );

        const subscribeOne = source.subscribe(val => console.log(val));
        const subscribeTwo = source.subscribe(val => console.log(val));
        
    }

    onSwitchMap() {
        const source = timer(0, 5000).pipe(switchMap(() => interval(500)));
        // const example = source.pipe(switchMap(() => interval(500)));
        const subscribe = source.subscribe(val => console.log(val));
    }

}
