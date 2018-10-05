
/* -------------------------------------------------------------------------------
                                        GLOBAL
---------------------------------------------------------------------------------- */

// Console Log standardization -------------------------------------------------
window.log = function f() { log.history = log.history || []; log.history.push(arguments); if (this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') { log.apply.call(console.log, console, newarr); } else { console.log.apply(console, newarr); } } };
(function (a) {function b() {} for (var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
	  var timeout;

	  return function debounced () {
		  var obj = this, args = arguments;
		  function delayed () {
			  if (!execAsap)
				  func.apply(obj, args);
			  timeout = null;
		  }

		  if (timeout)
			  clearTimeout(timeout);
		  else if (execAsap)
			  func.apply(obj, args);

		  timeout = setTimeout(delayed, threshold || 100);
	  };
  };
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

/*  ------------------------------------------------------------------------------
                                        VARS
---------------------------------------------------------------------------------- */
var APPLICATION_TYPE = 'web';
var ON_MOBILE= false; // TRUE if windowWidth < 768px
var HAS_NETWORK = true;
//var SERVER_URL= 'http://luminopolisdv.dowino.com/';
var URLS = {
    DATA: "data/data.json",
    EVENTS: "data/eventData_FR.json"
}

var cnt = 0;
var nbFiles = 0;

var onlineFilesInfo = {};

/*  ------------------------------------------------------------------------------
	                           ON DOM READY > START
---------------------------------------------------------------------------------- */
$(document).ready(function(){
	detectDevice();
	
	angular.element(document).ready(function () {
			// start angular manually
            bootstrapAngular();
        
	});
});



function bootstrapAngular() {
    angular.bootstrap(document.body, ['aperfectday']);
}


    // Reand file
    function readFromFile(fileName, readHandler) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    readHandler(JSON.parse(this.result));
                };

                reader.readAsText(file);
            }, fileErrorHandler.bind(null, fileName));
        }, fileErrorHandler.bind(null, fileName));
    }


/*  ------------------------------------------------------------------------------
	                       ON WINDOW LOAD > START ANIMATIONS
---------------------------------------------------------------------------------- */

$(window).on("load", function (e) {
    detectDevice();
})

/*  ------------------------------------------------------------------------------
	                       ON WINDOW SCROLL > START ANIMATIONS
---------------------------------------------------------------------------------- */
$(window).scroll(function(){

});

/*  ------------------------------------------------------------------------------
	                       ON WINDOW RESIZE > START ANIMATIONS
---------------------------------------------------------------------------------- */
$(window).smartresize(function(){
	detectDevice();
    if(window.innerWidth<1024 && window.innerHeight < window.innerWidth){
        $('#no-landscape').show();
    }
    else if($('#no-landscape').css('display') == 'block'){
        $('#no-landscape').hide();
    }
});

/*  ------------------------------------------------------------------------------
	                               GLOBAL FUNCTIONS
---------------------------------------------------------------------------------- */
function onBackKeyDown() {
}


// get the device width and apply a class to body ---------------------------------
function detectDevice(){
    
	var windowWidth = $(window).width();
    
	if (windowWidth>=1200){
        $('body').removeClass('wide screen tablet mobile').addClass('wide');
        //ON_MOBILE = false;
    }else if ( windowWidth<1200 && windowWidth>=992 ){
        $('body').removeClass('wide screen tablet mobile').addClass('screen');
        ON_MOBILE = false;
    }else if (windowWidth<992 && windowWidth>=768 ){
        $('body').removeClass('wide screen tablet mobile').addClass('tablet');
        ON_MOBILE = false;
    }else {
        $('body').removeClass('wide screen tablet mobile').addClass('mobile');
        ON_MOBILE = true;
    }
	
}



