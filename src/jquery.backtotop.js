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
    var pluginName = "jQScrollTop", instance = null, that, logcount,
        defaults = {
            timeout: 2000,
            DEBUG :false
        };
    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.o = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        that = this;
        $.data(that, "logcount",1);
        this.instance = null;
        this.init();
    }

    Plugin.prototype.init = function () {
        Plugin.prototype.getInstance();
        if(document.body.scrollTop < window.innerHeight) {
            $("#upBtn button").hide();
        }
        return true;
    };
    Plugin.prototype.getInstance = function() {
        if(this.instance == null) {
            this.instance = addButton();
            fadeInBtn();
        }
        return this.instance;
    };
    var addButton = function() {
        var upBtn = '<a id="upBtn" href="javascript:;"> <button class="glyphicon glyphicon-arrow-up"></button></a>';
        $('body').append(upBtn);
        return upBtn;
    };
    var fadeInBtn = function() {
        $("#upBtn button").hide();
        $("#upBtn button").fadeIn("slow");
    };
    Plugin.prototype.removeBtn = function() {
        $("#upBtn button").animate({"opactity":0}, 5000).remove();
        if(this.instance != null) {
            this.instance = null;
        }
    };
    var doc = document;

    var ycoord = Math.max(
        doc.documentElement.scrollTop,
        doc.body.scrollTop
    );

    var xcoord = 0;

    $("#upBtn").on("click", function(e) {
        e.preventDefault()
        var completeCalled = false;
        $("html, body").animate({ scrollTop: ycoord });
        Plugin.prototype.scrollTopOfPage();
    });
    Plugin.prototype.scrollTopOfPage = function() {

        var ycoord = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        $("body").animate({ scrollTop: 0 });
    };
    var log = function(msg, txt) {
        var logcount = $.data(that, "logcount");
        var separator = "";
        for (var n = 0; n < logcount; n++) {
            separator += "-";
        }
    console.log(separator+" "+logcount+". "+msg+" ="+ txt);
          logcount++;
        $.data(that, "logcount",logcount);
    };
    $(window).on('scroll',function(){
        (that.o.DEBUG) ? log("document.body.scrollTop",document.body.scrollTop) : true === true;
        if(document.body.scrollTop > window.innerHeight) {
            Plugin.prototype.getInstance();
        } else {
            Plugin.prototype.removeBtn();
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