import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true // option to log all route changes
      }
    });
    this.appInsights.loadAppInsights();
  }

  logPageView(name?: string, url?: string) { // option to call manually
    console.log('PAGEVIEW:' + name + '; URL:' + url);
    this.appInsights.trackPageView({
      name: name,
      uri: url
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (properties) {
      console.log('EVENT:' + name + '; PROPERTIES:' + Object.entries(properties));
    } else {
      console.log('EVENT:' + name);
    }
    this.appInsights.trackEvent({name: name}, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    if (properties) {
      console.log('Metric:' + name + '; Properties:' + Object.entries(properties));
    } else {
      console.log('Metric:' + name);
    }
    this.appInsights.trackMetric({name: name, average: average}, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    console.log('Exception:' + exception.message + '; StackTrace' + exception.stack);
    this.appInsights.trackException({exception: exception, severityLevel: severityLevel});
  }

  logError(msg: string, properties?: { [key: string]: any }) {
    if (properties) {
      console.log('ERROR:' + msg + '; PROPERTIES:' + Object.entries(properties));
    } else {
      console.log('ERROR:' + msg);
    }
    this.appInsights.trackTrace({message: 'ERROR:' + msg}, properties);
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    if (properties) {
      console.log('TRACE:' + message + '; PROPERTIES:' + Object.entries(properties));
    } else {
      console.log('TRACE:' + message);
    }
    this.appInsights.trackTrace({message: message}, properties);
  }
}
