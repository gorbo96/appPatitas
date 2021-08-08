import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',

    redirectTo: 'inicio-sesion',

    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./pages/crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./pages/mascotas/mascotas.module').then( m => m.MascotasPageModule)
  },
  {
    path: 'crear-mascotas',
    loadChildren: () => import('./pages/crear-mascotas/crear-mascotas.module').then( m => m.CrearMascotasPageModule)
  },
  {
    path: 'menu-p',
    loadChildren: () => import('./pages/menu-p/menu-p.module').then( m => m.MenuPPageModule)
  },
  {
    path: 'listacentros/:id',
    loadChildren: () => import('./pages/listacentros/listacentros.module').then( m => m.ListacentrosPageModule)
  },
  {
    path: 'centro',
    loadChildren: () => import('./pages/centro/centro.module').then( m => m.CentroPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
