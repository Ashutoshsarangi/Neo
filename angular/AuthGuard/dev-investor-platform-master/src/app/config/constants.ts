export class AppConstants {
    public static BASE_URL = 'http://localhost:5000';
    public static BASE_ROUTE = '/investor_portal/api';
    public static VERSION = '/v1';

    public static API_URL = AppConstants.BASE_URL + AppConstants.BASE_ROUTE + AppConstants.VERSION;

    public static loginConfig = {
        SESSION_KEY: 'account_details'
    };

    public static language = {
        DEFAULT: 'en',
        SESSION_SELECTED_LANGUAGE_KEY: 'selected_language'
    };
}
