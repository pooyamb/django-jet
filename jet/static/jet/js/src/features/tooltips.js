import $ from 'jquery';

import 'jquery-ui/ui/core';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/tooltip';
import 'browsernizr/test/touchevents';
import 'browsernizr';

class Tooltips {
    constructor() { }
}

Tooltips.prototype = {
    initTooltips: function() {
        if (!$(document.documentElement).hasClass('touchevents')) {
            $('a[title], .tooltip[title]').tooltip({
                track: true
            });
        }
    },
    run: function() {
        try {
            this.initTooltips();
        } catch (e) {
            console.error(e, e.stack);
        }
    }
};

$(document).ready(function() {
    new Tooltips($(this)).run();
});
