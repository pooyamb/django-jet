import jquery from 'jquery';

import './layout-updaters/actions';
import './layout-updaters/breadcrumbs';
import './layout-updaters/paginator';
import './layout-updaters/toolbar';
import './layout-updaters/object-tools';
import './layout-updaters/user-tools';
import './layout-updaters/changeform-tabs';
import './layout-updaters/tabular-inline';
import './layout-updaters/stacked-inline';
import './layout-updaters/related-widget-wrapper';
import './layout-updaters/delete-confirmation';
import './layout-updaters/branding';
import './layout-updaters/icons';
import './features/sidebar/main';
import './features/filters';
import './features/changeform-tabs';
import './features/checkboxes';
import './features/date-time-widgets';
import './features/inlines';
import './features/changelist';
import './features/tooltips';
import './features/dashboard';
import './features/changeform';
import './features/themes';
import './features/siblings';
import './features/selects';
import './features/related-popups';
import './features/scroll-to-bottom-detector';
import './features/touchmove-non-scrollable';

window.jQuery = jquery;
window.$ = jquery;
if(!('django' in window)){
    django = {}
}
django.jQuery = jquery;