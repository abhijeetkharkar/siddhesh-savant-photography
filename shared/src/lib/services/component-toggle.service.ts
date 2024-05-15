import { Injectable } from '@angular/core';
import { ToggleableComponent } from '@siddhesh-savant-photography/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentToggleService {
  private readonly COMPONENT_TOGGLE_MAP = new Map<ToggleableComponent, boolean>(
    [
      [ToggleableComponent.HEADER, true],
      [ToggleableComponent.FOOTER, true],
    ]
  );
  #showComponent = new BehaviorSubject<Map<ToggleableComponent, boolean>>(
    this.COMPONENT_TOGGLE_MAP
  );
  public showComponent$ = this.#showComponent.asObservable();
  public setShowComponent(component: ToggleableComponent, show: boolean) {
    this.COMPONENT_TOGGLE_MAP.set(component, show);
    this.#showComponent.next(this.COMPONENT_TOGGLE_MAP);
  }
}
