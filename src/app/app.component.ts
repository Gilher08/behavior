import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'behaviorProject';

    constructor(private httpClient: HttpClient, private productService: ProductService) { }

    ngOnInit(): void {
        // this.httpClient.get('http://localhost:8080/product').subscribe((data: any) => {
        //     if (this.productService.isEmpty()) {
        //         this.productService.setProducts(data);
        //     }
        // });
    }

}
