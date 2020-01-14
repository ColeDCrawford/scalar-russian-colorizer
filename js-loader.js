var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
    console.log("onload event: https://harvard-atg.github.io/scalar-assets/static/js/foundationsofrussian.colorize.js");
}
script.src = 'https://harvard-atg.github.io/scalar-assets/static/js/foundationsofrussian.colorize.js';
head.appendChild(script);
