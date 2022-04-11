import { Inject, Injectable, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription, tap } from 'rxjs';
import { DEBOUNCE_INJECTION_TOKEN } from '../ngx-persistor.module';
import { IPersistorService, PERSISTOR_SERVICE_INJECTION_TOKEN } from '../persistor-services';

@Injectable()
export class PersistenceDispatcherService implements OnDestroy {
  private _subs = new Subscription();
  private _saveIntents = new Subject<{ key: string, payload: any }>();
  private _saveCache = new Map<string, any>();

  constructor(
    @Inject(PERSISTOR_SERVICE_INJECTION_TOKEN) private _persistenceService: IPersistorService,
    @Inject(DEBOUNCE_INJECTION_TOKEN) private _debounce: number
  ) {
    this._subs.add(
      this._saveIntents.pipe(
        tap(value => this._saveCache.set(value.key, value.payload)),
        debounceTime(this._debounce)
      ).subscribe(
        () => {
          this._persistenceService.save();
          this._saveCache.clear();
        }
      )
    );
  }

  scheduleToSave<T = any>(key: string, payload: T) {
    this._saveIntents.next({ key, payload });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
