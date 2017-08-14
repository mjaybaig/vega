import * as Raven from 'raven-js';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{
    /**
     *
     */
    constructor(@Inject(ToastyService) private toastyService : ToastyService, 
                private ngZone: NgZone) {
    }
    handleError(error:any): void{

        if( !isDevMode() )
            Raven.captureException(error.originalError || error);
        else
            throw error;
        //endif
        this.ngZone.run( () => {
            this.toastyService.error({
                title: "Error",
                msg: "An unepected error occored",
                theme: "bootstrap",
                showClose: true,
                timeout: 5000
            });
        });
    }
}