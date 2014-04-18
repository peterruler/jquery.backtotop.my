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
/*jshint strict: true */
(function ($, window, document, undefined) {
    "use strict";

    // Create the defaults once
    var pluginName = "jQScrollTop",
        that,
        instance = null,
        defaults = {
            timeout: 600,
            DEBUG: false
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.o = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        that = this;
        $.data(that, "logcount", 1);
        instance = null;
        this.init();
    }

    Plugin.prototype.init = function () {
        Plugin.prototype.getInstance();
        if (document.body.scrollTop < window.innerHeight) {
            $("#upBtn").hide();
        }
        return true;
    };
    Plugin.prototype.getInstance = function () {
        if (that.instance == null) {
            that.instance = addButton();
            fadeInBtn();
        }
        return this.instance;
    };
    Plugin.prototype.removeBtn = function () {
        $("#upBtn").animate({"opactity": 0}, 5000).remove();
        if (that.instance != null) {
            that.instance = null;
        }
    };
    var addButton = function () {
        var upBtn = '<a id="upBtn" class="glyphicon glyphicon-arrow-up" onclick="$.fn.scroll();" href="javascript:;"></a>';
        $('body').append(upBtn);
        return upBtn;
    };
    var fadeInBtn = function () {
        $("#upBtn button").hide();
        $("#upBtn button").fadeIn("slow");
    };
    $.fn.scroll = function () {
        var interv = Math.floor((that.o.timeout / 1200) * $(window).scrollTop());
        //(that.o.DEBUG) ? log("delay", interv) : void(0);
        $("html, body").animate(
            {
                scrollTop: 0
            },
            interv,
            "linear"
        );
    };
    $("#upBtn").on("click", function (e) {
        e.preventDefault();
    });
    $(window).on('scroll', function () {
        //(that.o.DEBUG) ? log("document.body.scrollTop", document.body.scrollTop) : void(0);
        if (document.body.scrollTop > window.innerHeight) {
            Plugin.prototype.getInstance();
        } else {
            Plugin.prototype.removeBtn();
        }
    });
    $.fn.jQScrollTop = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };

  /*  var log = function (msg, txt) {
        var logcount = $.data(that, "logcount");
        var separator = "";
        for (var n = 0; n < logcount; n++) {
            separator += "-";
        }
        window.console.log(separator + " " + logcount + ". " + msg + " =" + txt);
        logcount++;
        $.data(that, "logcount", logcount);
    };*/
})(jQuery, window, document);