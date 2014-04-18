# jQuery Backtotop

JQuery animated back to top scroll icon

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/Arbeit/jquery.backtotop.my/master/dist/jquery.backtotop.min.js
[max]: https://raw.github.com/Arbeit/jquery.backtotop.my/master/dist/jquery.backtotop.js

In your web page:

```html
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="/vendor/jquery.min.js"></script>
<script src="../../dist/js/bootstrap.min.js"></script>
<script src="../src/jquery.backtotop.js"></script>
<script>
    $(document).ready( function() {

        var options = {
            icon:'arrow-up',
            timeout: 600,
            DEBUG:false
        };
        $("body").jQScrollTop(options);
    });
</script>
<script src="../src/main.js"></script>
</body>
</html>

```

## Documentation

<h2>Developer:</h2>
<ul>
<li>
Compiles bootstrap and jquery.backtoto.my separately
</li>
<li>
install nodejs
</li>
<li>
//do
$npm install
</li>
<li>
//run
$grunt -f
</li>
</ul>
## Examples

<a href="http://www.jquerybacktotop.keepitnative.ch">Jquery backtotop demosite</a>

## Release History ##
2013-04-18 15:00 first release of jquery plugin
