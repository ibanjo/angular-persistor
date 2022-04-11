import { Directive, Input } from '@angular/core';
import { IComponentPersistenceConfig } from './interfaces';

@Directive({
  selector: '[persistState]'
})
export class ComponentPersistenceDirective {
  @Input() persistState: IComponentPersistenceConfig = {};
}
