import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, forkJoin, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../models/categorie';
import { mergeMap, concatMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    private initialProducts: Array<Product> = [];
    private productTracker = new BehaviorSubject<Array<Product>>(this.initialProducts);

    getProducts(): Observable<Array<Product>> {
        return this.productTracker.asObservable();
    }

    setProducts(products: Array<Product>): void {
        this.productTracker.next(products);
    }

    resetProducts(): void {
        this.productTracker.next(this.initialProducts);
    }

    isEmpty(): boolean {
        return this.productTracker.value.length === 0 ? true : false;
    }

    getProductsByCatName(cat_name: string): Observable<Array<Product>> {
        return this.getCategorieByName(cat_name).pipe(
            concatMap((categorie: Categorie) => {
                return this.http.get<Array<Product>>('http://localhost:8080/product/' + categorie.id);
            })
        )
    }

    getCategorieByName(name: string): Observable<Categorie> {
        return this.http.get<Categorie>('http://localhost:8080/categorie/' + name);
    }

    getAllProducts(): Observable<Array<Product>> {
        return this.http.get<Array<Product>>('http://localhost:8080/product');
    }

    getMockProducts(): Observable<Array<Product>> {
        const list: Array<Product> = [
            {
                 id: 1,
                 designation: 'Bananes',
                 cat_id: 1
            },
            {
                id: 2,
                designation: 'Fraises',
                cat_id: 1
           },
           {
               id: 3,
               designation: 'Oranges',
               cat_id: 2
           }
        ];
        // return of(list);
        return from([list]);
    }

    getProductsByCatNameFork(cat_name: string): Observable<Array<Product>> {
        return forkJoin(
            this.getCategorieByName(cat_name),
            this.getMockProducts()
        ).pipe(map(([categorie, products]) => {
            return products.filter(p => p.cat_id === categorie.id);
        }));
    }

}
