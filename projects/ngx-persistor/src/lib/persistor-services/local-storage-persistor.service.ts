import { Injectable } from '@angular/core';
import { IPersistorService, PersistenceResult } from './interfaces';

@Injectable()
export class LocalStoragePersistorService implements IPersistorService {
  load<T>(key: string): PersistenceResult<T> {
    try {
      const strPayload: string | null = window.localStorage.getItem(key);
      const payload: T = JSON.parse(strPayload);
      return {
        success: true,
        payload
      }
    } catch (error: Error) {
      return {
        success: false,
        error
      }
    }
  }

  save<T>(key: string, payload: any): PersistenceResult<T> {
    try {
      window.localStorage.setItem(key, payload);
      return {
        success: true,
        payload
      }
    } catch (error: Error) {
      return {
        success: false,
        error
      }
    }
  }
}
