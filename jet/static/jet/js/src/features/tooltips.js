import $ from 'jquery';
import 'tooltipster'
import 'browsernizr/test/touchevents';
import 'browsernizr';

class Tooltips {
    constructor() { }
}

Tooltips.prototype = {
    initTooltips: function() {
        if (!$(document.documentElement).hasClass('touchevents')) {
            $('a[title], .tooltip[title]').tooltipster();
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
