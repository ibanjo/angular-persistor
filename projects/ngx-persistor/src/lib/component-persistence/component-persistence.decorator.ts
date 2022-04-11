import { IComponentPersistenceOptions } from './interfaces';
import { NgxPersistorModule } from '../ngx-persistor.module';
import { IPersistorService, PERSISTOR_SERVICE_INJECTION_TOKEN } from '../persistor-services';
import { PersistenceDispatcherService } from '../core/persistence-dispatcher.service';

function Persistable(options: IComponentPersistenceOptions) {
  const theOptions: IComponentPersistenceOptions = {
    ...options,
    debounce: options.debounce ?? 500
  }

  return function (constructor: Function) {
    const originalOnChangesHook = constructor.prototype['ngOnChanges'];
    constructor.prototype['ngOnChanges'] = function (...args) {
      if (originalOnChangesHook) {
        originalOnChangesHook.apply(this, args);
      }

      // Cycle through persisted fields
      const newValues: any = {};
      options.fields.forEach(fld => {
        if (typeof fld === 'string') newValues[fld] = this[fld];
        else {
          // TODO apply serialization function
        }
      })

      // TODO retrieve key from key engine
      const persistenceDispatcher = NgxPersistorModule.injector.get(PersistenceDispatcherService);
      persistenceDispatcher.scheduleToSave('fuffa', newValues);
    }
  }
}
