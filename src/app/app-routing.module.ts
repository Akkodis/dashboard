import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakClientAuthGuard } from '@core/guards/keycloak-client-auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: { title: 'home', breadcrumb: [{ label: 'Home', url: '' }] }
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/features/home/home.module').then(m => m.HomeModule),
    data: { title: 'home', breadcrumb: [{ label: 'Home', url: '' }] }
  },
  {
    path: 'datacatalogue',
    loadChildren: () => import('./modules/features/datastore/datastore.module').then(m => m.DatastoreModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'datacatalogue',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Data catalogue', url: '' }
      ]
    }
  },
  {
    path: 'tile/:tile',
    loadChildren: () => import('./modules/features/datatype-detail/datatype-detail.module').then(m => m.DatatypeDetailModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'datatype',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Data catalogue', url: '/datacatalogue' },
        { label: 'Datatype', url: '' }
      ]
    }
  },
  // {
  //   path: 'logs',
  //   loadChildren: () => import('./modules/features/logs/logs.module').then(m => m.LogsModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  {
    path: 'monitoring',
    loadChildren: () => import('./modules/features/monitoring/monitoring.module').then(m => m.MonitoringModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'monitoring',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Monitoring', url: '' },
        { label: 'TopicMonitoring', url: '/topic/:topic' },
      ]
    }
  },
  {
    path: 'monitoring/:id',
    loadChildren: () => import('./modules/features/monitoring/monitoring.module').then(m => m.MonitoringModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'monitoring',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Monitoring', url: '' }
      ]
    }
  },
  {
    path: 'manage-subscription',
    loadChildren: () => import('./modules/features/manage-subscription/manage-subscription.module').then(m => m.ManageSubscriptionModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'manage-subscription',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Subscriptions', url: '' }
      ]
    }
  },
  // {
  //   path: 'news',
  //   loadChildren: () => import('./modules/features/news/news.module').then(m => m.NewsModule)
  // },
  // {
  //   path: 'serviceapi',
  //   loadChildren: () => import('./modules/features/serviceapi/serviceapi.module').then(m => m.ServiceapiModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  // {
  //   path: 'costmanagement',
  //   loadChildren: () => import('./modules/features/account/account.module').then(m => m.AccountModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  {
    path: 'profile',
    loadChildren: () => import('./modules/features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  {
    path: 'SubtypeCits',
    loadChildren: () => import('./modules/features/subtypes/subtype-cits/subtype-cits.module').then(m => m.SubtypeCitsModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  {
    path: 'SubtypeApp',
    loadChildren: () => import('./modules/features/subtypes/subtype-app/subtype-app.module').then(m => m.SubtypeAppModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  // {
  //   path: 'help',
  //   loadChildren: () => import('./modules/features/help/help.module').then(m => m.HelpModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  // {
  //   path: 'favorite',
  //   loadChildren: () => import('./modules/features/favorite/favorite.module').then(m => m.FavoriteModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  // {
  //   path: 'map',
  //   loadChildren: () => import('./modules/features/map/map.module').then(m => m.mapModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  // {
  //   path: 'information',
  //   loadChildren: () => import('./modules/features/information/information.module').then(m => m.InformationModule),
  //   canActivate: [KeycloakClientAuthGuard]
  // },
  {
    path: 'Subtypeaudio',
    loadChildren: () => import('./modules/features/subtypes/subtype-audio/subtype-audio.module').then(m => m.SubtypeAudioModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  {
    path: 'Subtypevideo',
    loadChildren: () => import('./modules/features/subtypes/subtype-video/subtype-video.module').then(m => m.SubtypeVideoModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  {
    path: 'Subtypeimage',
    loadChildren: () => import('./modules/features/subtypes/subtype-image/subtype-image.module').then(m => m.SubtypeImageModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  {
    path: 'Subtypetext',
    loadChildren: () => import('./modules/features/subtypes/subtype-text/subtype-text.module').then(m => m.SubtypeTextModule),
    canActivate: [KeycloakClientAuthGuard]
  },
  {
    path: 'tile/:tile/datatype/:datatype',
    loadChildren: () => import('./modules/features/dataflow/components/dataflow.module').then(m => m.DataFlowModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'subtype',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Data catalogue', url: '/datacatalogue' },
        { label: 'Datatype', url: '/tile/:tile' },
        { label: 'Subtype', url: '' }
      ]
    }
  },
  {
    path: 'tile/:tile/datatype/:datatype/dataflow/:subtype/:idMec',
    loadChildren: () => import('./modules/features/dataflow/components/dataflow-subtype/dataflow-subtype.module').then(m => m.DataflowSubtypeModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'dataflow',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Data catalogue', url: '/datacatalogue' },
        { label: 'Datatype', url: '/tile/:tile' },
        { label: 'Subtype', url: '/tile/:tile/datatype/:datatype' },
        { label: 'Dataflow', url: '' }
      ]
    }
  },
  {
    path: 'tile/:tile/datatype/:datatype/dataflow/:subtype/:idMec/detail/:id',
    loadChildren: () => import('./modules/features/dataflow/components/dataflow-detail/dataflow-detail.module').then(m => m.DataflowDetailModule),
    canActivate: [KeycloakClientAuthGuard],
    data:
    {
      title: 'dataflow-detail',
      breadcrumb: [
        { label: 'Home', url: '/home' },
        { label: 'Data catalogue', url: '/datacatalogue' },
        { label: 'Datatype', url: '/tile/:tile' },
        { label: 'Subtype', url: '/tile/:tile/datatype/:datatype' },
        { label: 'Dataflow', url: '/tile/:tile/datatype/:datatype/dataflow/:subtype/:idMec' },
        { label: 'Dataflow details', url: '' }
      ]
    }
  },
  {
    path: 'topics',
    loadChildren: () => import('./modules/features/topics-list/topics-list.component.module').then(m => m.TopicsListModule),
    canActivate: [KeycloakClientAuthGuard]
  },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
