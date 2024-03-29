import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  #showHeader = new BehaviorSubject<boolean>(true);
  public showHeader$ = this.#showHeader.asObservable();
  public setShowHeader(value: boolean) {
    this.#showHeader.next(value);
  }
}
