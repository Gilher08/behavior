import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { HnResolver } from './shared/services/hn-resolver';
import { JokeListComponent } from './joke-list/joke-list.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'rxjs',
        component: RxjsComponent
    },
    {
        path: 'joke',
        component: JokeListComponent
    },
    {
        path: 'counter',
        component: CounterComponent,
        resolve: { hnData: HnResolver }
    },
    {
        path: 'counter/:id',
        component: CounterComponent,
        resolve: { hnData: HnResolver }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
