import { Component, OnInit } from '@angular/core';
import { CounterService } from '../shared/services/counter.service';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

    constructor(private counter: CounterService, private productService: ProductService,
        private route: ActivatedRoute, private httpClient: HttpClient) { }

    public currentCount: number;
    private subscription;
    public data: any;

    ngOnInit(): void {
        this.data = this.route.snapshot.data;

        this.subscription = this.counter.getCount().subscribe(
            res => {
                this.currentCount = res.value;
                console.log(this.currentCount);
            },
            err => {
                console.error(`An error occurred: ${err.message}`);
            }
        );
        this.subscription = this.productService.getProducts().subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.error(`An error occurred: ${err.message}`);
            }
        );

        this.httpClient.get('http://localhost:8080/product2').subscribe((data: any) => {
            console.log(data);    
        });
    }

    increment(): void {
        this.counter.setCount(this.currentCount, 1);
    }

    decrement(): void {
        this.counter.setCount(this.currentCount, -1);
    }

    reset(): void {
        this.counter.resetCount();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
