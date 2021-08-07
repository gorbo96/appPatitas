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
  },  {
    path: 'datos-mascota',
    loadChildren: () => import('./pages/datos-mascota/datos-mascota.module').then( m => m.DatosMascotaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
