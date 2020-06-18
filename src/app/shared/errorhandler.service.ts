import {ErrorHandler, Injectable} from '@angular/core';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {

  constructor(private log: LogService) {
    super();
  }

  handleError(error: Error) {
    this.log.logException(error); // Manually log exception
  }
}
