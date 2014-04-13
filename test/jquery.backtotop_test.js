(function($) {
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

  module('jQuery#jquery_backtotop', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('plugin is callable', function() {
      var options = {
          'icon':'arrow-up'
      };
      var actual = $("body").jQScrollTop(options);
      var exp = true;
    QUnit.push(true, actual ,exp, 'method init returns true, plugin callable!');
  });
    test('on window scroll add button', function() {
        $('body').on('scrollWindowTest', function() {
            $("body").jQScrollTop();
        });
        $(this).trigger('scrollWindowTest');
        var upBtn = "<span id='up-btn'></span>";
        QUnit.push(true, $('#up-btn').html(),upBtn,  'button in dom');
    });
    test('on scroll less viewport height remove btn', function() {
       if($('#up-btn') === 'undefined') {
           $("body").jQScrollTop();
       }
        $('#up-btn').remove();
        QUnit.push(true, 'undefined', $('#up-btn'), "btn successfully removed");
    });
    test("scrollHeight is smaller than viewport", function() {
        var scolledPosition = $(window).clientHeight;
        $("html, body").animate({scrollTop: scolledPosition});
       QUnit.push(true, $(window).scrollTop, $(window).clientHeight, "Scroll equals 0, not yet at end of window height");
    });
    test("scroll page from present position back to top", function() {
       $("html, body").animate({ scrollTop: 0 });
       var act = $(window).scrollTop;
       QUnit.push(true, act, 0, "Page scrolls back to top");
    });
    test("scrolled position equals top() position", function() {
       $('body').css('top', "1200px");
       equal($('body').css('top'),"auto", "$('body').css('top') equals auto");
    });
}(jQuery));
