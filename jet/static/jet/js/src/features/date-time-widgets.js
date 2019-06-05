import $ from 'jquery';
import flatpickr from "flatpickr";

class DateTimeWidgets {
    constructor() { }
}

DateTimeWidgets.prototype = {
    removeInputTextNode: function($input) {
        if ($input.length == 0) {
            return;
        }

        var node = $input.get(0).previousSibling;

        if (node.nodeType == 3) {
            $(node).remove();
        }
    },
    updateDatetimeLayout: function() {
        var self = this;

        $('.form-row .datetime').each(function () {
            var $dateTime = $(this);
            var $dateField = $dateTime.find('.vDateField');
            var $timeField = $dateTime.find('.vTimeField');

            self.removeInputTextNode($dateField);
            self.removeInputTextNode($timeField);

            $dateField.nextAll('br').first().remove();
        });

        $('.form-row .vDateField').each(function () {
            var $dateField = $(this)
                .attr('data-input', '')
                .wrap('<div class="flatpickr vDateFieldBox"></div>');
            var $dateButton = $('<span>').addClass('icon-calendar');
            $('<a>')
                .attr('title', 'toggle')
                .attr('data-toggle', '')
                .addClass('vDateField-link')
                .append($dateButton)
                .insertAfter($dateField);
        });

        $('.form-row .vTimeField').each(function () {
            var $timeField = $(this).wrap('<div class="flatpickr vTimeFieldBox"></div>');
            var $timeButton = $('<span>').addClass('icon-clock');
            $('<a>')
                .attr('title', 'toggle')
                .attr('data-toggle', '')
                .addClass('vTimeField-link')
                .append($timeButton)
                .insertAfter($timeField);
        });
    },
    djangoDateTimeFormatToJs: function(format) {
        return format.toLowerCase().replace(/%\w/g, function(format) {
            format = format.replace(/%/,"");
            return format + format;
        });
    },
    initDateWidgets: function($container) {
        $container = $container || $(document);

        var self = this;

        $container.find('.form-row .vDateFieldBox').each(function () {
            var $dateFieldBox = $(this);

            flatpickr($dateFieldBox[0] ,{
                format: self.djangoDateTimeFormatToJs(DATE_FORMAT),
                allowInput: true,
                clickOpens: false,
                wrap: true
            });
        });

        // var old_goToToday = $.datepicker._gotoToday;
        // $.datepicker._gotoToday = function(id) {
        //     old_goToToday.call(this,id);
        //     this._selectDate(id);
        // };
    },
    initTimeWidgets: function($container) {
        $container = $container || $(document);

        $container.find('.form-row .vTimeField').each(function () {
            var $timeField = $(this);
            var $timeLink = $timeField.next('.vTimeField-link');

            var timepicker = flatpickr($timeField[0] ,{
                enableTime: true,
                noCalendar: true,
                enableSeconds: true,
                dateFormat: "H:i:ss",
                allowInput: true,
                clickOpens: false
            });
            

            $timeLink.on('click', function (e) {
                timepicker.open();
                e.preventDefault();
            });
        });
    },
    run: function() {
        try {
            this.updateDatetimeLayout();
            this.initDateWidgets();
            this.initTimeWidgets();

            var self = this;

            $('.inline-group').on('inline-group-row:added', function(e, $inlineItem) {
                $inlineItem.find('.hasDatepicker').removeClass('hasDatepicker');
                $inlineItem.find('.hasTimepicker').removeClass('hasTimepicker');
                self.initDateWidgets($inlineItem);
                self.initTimeWidgets($inlineItem);
            });
        } catch (e) {
            console.error(e, e.stack);
        }
    }
};

$(document).ready(function() {
    new DateTimeWidgets().run();
});
