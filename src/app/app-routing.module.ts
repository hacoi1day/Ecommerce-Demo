import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {OrderComponent} from "./components/order/order.component";
import {CartComponent} from "./components/cart/cart.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {CategoryDetailsComponent} from "./components/category-details/category-details.component";
import {ProfileResolverService} from "./resolvers/profile-resolver.service";
import {CartResolverService} from "./resolvers/cart-resolver.service";
import {ProductResolverService} from "./resolvers/product-resolver.service";
import {CategoryResolverService} from "./resolvers/category-resolver.service";
import {UserAuthGuard} from "./guards/user-auth.guard";
import {AdminAuthGuard} from "./guards/admin-auth.guard";
import {ApplicationErrorComponent} from "./shared/application-error/application-error.component";
import {ResourceNotFoundComponent} from "./shared/resource-not-found/resource-not-found.component";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverService
    },
    canActivate: [UserAuthGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: {
      cart: CartResolverService
    },
    canActivate: [UserAuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      products: ProductResolverService
    }
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    resolve: {
      categories: CategoryResolverService
    }
  },
  {
    path: 'categories/:id',
    component: CategoryDetailsComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: "notFoundResource", component: ResourceNotFoundComponent},
  {path: "applicationError", component: ApplicationErrorComponent},
  {
    path: 'admin', // this is the prefix route
    canActivate: [AdminAuthGuard],
    //lazy loading: this module will not loaded only if the the user navigate into it
    loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
