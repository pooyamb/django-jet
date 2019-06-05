import $ from 'jquery';

class ObjectToolsUpdater {
    constructor($objectTools) {
        this.$objectTools = $objectTools;
    }
}

ObjectToolsUpdater.prototype = {
    run: function() {
        this.$objectTools.addClass('initialized');
    }
};

$(document).ready(function() {
    $('.object-tools').each(function() {
        new ObjectToolsUpdater($(this)).run();
    });
});
