import { InjectionToken, Injector, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxPersistorComponent } from './ngx-persistor.component';
import { LocalStoragePersistorService, PERSISTOR_SERVICE_INJECTION_TOKEN } from './persistor-services';
import { ComponentPersistenceDirective } from './component-persistence/component-persistence.directive';

const DEFAULT_PERSISTOR_PROVIDER: Provider = {
  provide: PERSISTOR_SERVICE_INJECTION_TOKEN,
  useClass: LocalStoragePersistorService
};

export const ROOT_KEY_INJECTION_TOKEN: InjectionToken<string> = new InjectionToken<string>('ROOT_KEY_INJECTION_TOKEN');
export const DEBOUNCE_INJECTION_TOKEN: InjectionToken<number> = new InjectionToken<number>('DEBOUNCE_INJECTION_TOKEN');

@NgModule({
  declarations: [
    NgxPersistorComponent,
    ComponentPersistenceDirective
  ],
  imports: [
  ],
  exports: [
    NgxPersistorComponent
  ]
})
export class NgxPersistorModule {
  static injector: Injector;

  static forRoot({ name = 'PERSISTOR-ROOT', debounce = 500, storageProvider = DEFAULT_PERSISTOR_PROVIDER }: {
    name: string,
    debounce: number,
    storageProvider?: Provider
  }): ModuleWithProviders<NgxPersistorModule> {
    // TODO enforce IPersistorProvider implementation for input provider
    return {
      ngModule: NgxPersistorModule,
      providers: [
        storageProvider,
        {
          provide: ROOT_KEY_INJECTION_TOKEN,
          useValue: name
        },
        {
          provide: DEBOUNCE_INJECTION_TOKEN,
          useValue: debounce
        }
      ]
    }
  }

  constructor(injector: Injector) {
    NgxPersistorModule.injector = injector;
  }
}
