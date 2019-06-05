import { Component } from '@angular/core';
import { SessionStorageService } from './services/session-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './config/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(public sessionStorageService: SessionStorageService, public translateService: TranslateService) {
        this.translateService.setDefaultLang('en');
        this.setLanguage();
    }

    setLanguage() {
        const selectedLanguage = this.sessionStorageService.getFromSession(AppConstants.language.SESSION_SELECTED_LANGUAGE_KEY);
        if (selectedLanguage) {
            this.translateService.use(selectedLanguage);
        } else {
            this.translateService.use(AppConstants.language.DEFAULT);
            this.sessionStorageService.saveToSession(
                AppConstants.language.SESSION_SELECTED_LANGUAGE_KEY,
                AppConstants.language.DEFAULT
            );
        }
    }
}
