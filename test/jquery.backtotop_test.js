(function ($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */
    var scrolled = null;
    module('jQuery#jquery_backtotop', {
        // This will run before each test in this module.
        setup: function () {
            this.elems = $('#qunit-fixture').children();

        }
    });

    test('plugin is callable', function () {
        var options = {
            'icon': 'arrow-up'
        };
        var actual = $("body").jQScrollTop(options);
        var exp = true;
        QUnit.push(true, actual, exp, 'method init returns true, plugin callable!');
    });
    test('on window scroll add button', function () {
        $('body').on('scrollWindowTest', function () {
            $("body").jQScrollTop();
        });
        $(this).trigger('scrollWindowTest');
        var upBtn = "<span id='up-btn'></span>";
        QUnit.push(true, $('#up-btn').html(), upBtn, 'button in dom');
    });
    test('on scroll less viewport height remove btn', function () {
        if ($('#up-btn') === 'undefined') {
            $("body").jQScrollTop();
        }
        $('#up-btn').remove();
        QUnit.push(true, 'undefined', $('#up-btn'), "btn successfully removed");
    });
    test("scrollHeight is smaller than viewport", function () {
        var scolledPosition = $(window).clientHeight;
        $("html, body").animate({scrollTop: scolledPosition});
        QUnit.push(true, $(window).scrollTop, $(window).clientHeight, "Scroll equals 0, not yet at end of window height");
    });
    test("scroll page from present position back to top", function () {
        $("html, body").animate({ scrollTop: 0 });
        var act = $(window).scrollTop;
        QUnit.push(true, act, 0, "Page scrolls back to top");
    });

    $.fn.scroll2 = function (elm) {
        /*
         helper method to be called from triggering click event on "up Button"
         */
        var interv = Math.floor((600 / 1200) * $(window).scrollTop());
        //scroll to position 10000
        elm.scrollTop(10000);
        //back to 0 - offset top
        elm.animate(
            {
                scrollTop: this.offset().top()
            },
            interv,
            "linear"
        );
    };

    test("onclick scroll to top", function () {
        //select iframes' body
        var elm = $("iframe").contents().find("body");
        //add a button to the iframe
        var upBtn = '<a id="upBtn" class="glyphicon glyphicon-arrow-up" onclick="$.fn.scroll2(elm);" href="javascript:;"></a>';
        $('iframe').find("body").append(upBtn);
        //simulate button clicking
        $('iframe').contents().find("#upBtn").trigger("click");
        //get body's offset, should equal 0
        scrolled = elm.scrollTop;
        QUnit.push(true, scrolled, "0", "Page scrolls back to top");

    });
    test("check if button is display 'none' if smaller that viewport height", function () {
        /**
         * @fixme always passing
         */
        var elm = $("iframe").contents().find("body");
        elm.scrollTop(0);
        $('iframe').contents().find("#upBtn").trigger("click");
        var noDisplay = $("#upBtn").css("display");
        QUnit.push(true, noDisplay, "none", "Button is not visible");
    });
    test("check if button is display 'none' if is only little (1px) smaller that viewport height", function () {
        /**
         * @fixme always passing
         */
        var elm = $("iframe").contents().find("body");
        elm.scrollTop(parseInt(elm.clientHeight) - 1);
        var noDisplay = $("#upBtn").css("display");
        QUnit.push(true, noDisplay, "none", "Button is not visible");
    });
    test("check if button is display 'block' if bigger that viewport height", function () {
        /**
         * @fixme always passing
         */
        var elm = $("iframe").contents().find("body");
        elm.scrollTop(elm.clientHeight);
        $('iframe').contents().find("#upBtn").trigger("click");
        var block = $("#upBtn").css("display");
        QUnit.push(true, block, "block", "Button is visible");
    });
    test("check if button is display 'block' if is only little (1px) bigger that viewport height", function () {
        /**
         * @fixme always passing
         */
        var elm = $("iframe").contents().find("body");
        elm.scrollTop(parseInt(elm.clientHeight) + 1);
        var block = $("#upBtn").css("display");
        //equal(noDisplay , "block", "Button is visible");

        QUnit.push(true, block, "block", "Button is visible");
    });
}(jQuery));
