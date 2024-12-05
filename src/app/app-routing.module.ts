import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./splash/splash.module')
        .then(mod => mod.SplashModule)
},
{
    path: 'work', loadChildren: () => import('./work/work.module')
        .then(mod => mod.WorkModule)
},
{
    path: 'news', loadChildren: () => import('./news/news.module')
        .then(mod => mod.NewsModule)
},
{
    path: 'press', loadChildren: () => import('./press/press.module')
        .then(mod => mod.PressModule)
},
{
    path: 'exhibitions', loadChildren: () => import('./exhibitions/exhibitions.module')
        .then(mod => mod.ExhibitionsModule)
},
{
    path: 'about', loadChildren: () => import('./about/about.module')
        .then(mod => mod.AboutModule)
},
{
    path: 'contact', loadChildren: () => import('./contact/contact.module')
        .then(mod => mod.ContactModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
