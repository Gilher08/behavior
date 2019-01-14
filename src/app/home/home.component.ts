import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from '../shared/services/counter.service';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public currentCount: number;
    public products: Array<Product>;
    public catName: string;
    private subscription: Subscription;
    public products$: Observable<Array<Product>>;

    constructor(private counter: CounterService, private productService: ProductService, private httpClient: HttpClient) {
        this.subscription = new Subscription();
     }

    ngOnInit(): void {

        this.products$ = this.productService.getAllProducts().pipe(shareReplay(1));

        // this.subscription = this.counter.getCount().subscribe(
        //     res => {
        //         this.currentCount = res.value;
        //         console.log(this.currentCount);
        //     },
        //     err => {
        //         console.error(`An error occurred: ${err.message}`);
        //     }
        // );
        // this.subscription = this.productService.getProducts().subscribe(
        //     res => {
        //         this.products = res;
        //         console.log(res);
        //     },
        //     err => {
        //         console.error(`An error occurred: ${err.message}`);
        //     }
        // );
        // this.httpClient.get('http://localhost:8080/product2').subscribe((data: any) => {
        //     console.log(data);    
        // });

    }

    onMergeMap() {
        this.subscription = this.productService.getProductsByCatName(this.catName).subscribe(
            res => {
                // this.products = res;
                console.log(res);
            },
            err => {
                console.error(`An error occurred: ${err.message}`);
            }
        );
    }

    onForkJoin() {
        this.subscription = this.productService.getProductsByCatNameFork(this.catName).subscribe(
            res => {
                // this.products = res;
                console.log(res);
            },
            err => {
                console.error(`An error occurred: ${err.message}`);
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
