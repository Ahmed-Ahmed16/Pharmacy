import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { welcomecomponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { creatcomponent } from './creat account/creat.component';
import { productscomponent } from './products/products.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SellProductComponent } from './sell/sell.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,welcomecomponent,creatcomponent,productscomponent,SellProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  constructor() {
    provideRouter(routes);
  }
}

