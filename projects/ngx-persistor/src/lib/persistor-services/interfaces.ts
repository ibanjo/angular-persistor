import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface PersistenceResult<T> {
  success: boolean;
  payload?: T;
  error?: Error;
}

export interface IPersistorService {
  save<T>(key: string, applicationData: T): Observable<PersistenceResult<T>> | PersistenceResult<T>;
  load<T>(key: string): Observable<PersistenceResult<T>> | PersistenceResult<T>;
}

export const PERSISTOR_SERVICE_INJECTION_TOKEN: InjectionToken<IPersistorService> = new InjectionToken<IPersistorService>('PERSISTOR_PROVIDER_INJECTION_TOKEN');
