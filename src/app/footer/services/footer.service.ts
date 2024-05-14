import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  #showFooter = new BehaviorSubject<boolean>(true);
  public showFooter$ = this.#showFooter.asObservable();
  public setShowFooter(value: boolean) {
    this.#showFooter.next(value);
  }
}
