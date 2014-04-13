/*
 * jquery.backtotop
 * http://www.keepitnative.ch
 *
 * Copyright (c) 2014 Peter Ruler
 * Licensed under the MIT license.
 */
/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "jQScrollTop",
        defaults = {
            timeout: 2000
        };
    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.o = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {

        return true;
    };
    var addButton = function() {
        var upBtn = "<span id='up-btn'></span>";
        $('body').append(upBtn);
    };
    var removeBtn = function() {
      $('#up-btn').remove();
    };
    $('#up-btn').on('click', function() {
        var inWinPosition= $(window).screenX;
        var timeout = (2/this.o.timeout)*inWinPosition;
        $("html, body").animate({ scrollTop: -1* inWinPosition }, timeout, "swing");
    });
    $(window).on('scroll',function(){
        if(this.scrollTop > this.clientHeight) {
            addButton();
        } else {
            removeBtn();
        }
    });
    $.fn.jQScrollTop = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                    new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );