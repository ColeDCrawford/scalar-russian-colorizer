(function(global, $) {
  "use strict";
	const ApiClient = global.app.ApiClient;

	function colorizehtml(input_html) {
		const api = new ApiClient();
		var params = {
			"attribute": "data",
		}
		return api.colorizehtml(input_html, params).then((res) => {
			return res;
		});
	}

// async function processHtml() {
// 	const input_html = $("#contentinput").val();
// 	writeframe('inputpreview', input_html);
// 	writeframe('outputpreview', 'Processing...');

// 	const output_html = await colorizehtml(input_html);
// 	writeframe('outputpreview', output_html);
// 	$("#outputhtml").val(output_html);
// 	$("#results").show();
// }

function writeframe(id, html) {
	var iframe = document.createElement('iframe');
	iframe.className = "previewhtml";
	document.getElementById(id).innerHTML = "";
	document.getElementById(id).appendChild(iframe);

	// Note: using this method instead of:
	//    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
	// because it handles larger strings/html
	iframe.contentWindow.document.open();
	iframe.contentWindow.document.write(html);
	iframe.contentWindow.document.close();
}

function copy() {
	var copyText = document.querySelector("#outputhtml");
	copyText.select();
	document.execCommand("copy");
}

$( document ).ready( function() {
	var thisBookUrl = window.location.href;
	var thisPageSlug = window.location.pathname.split("/").pop();
	console.log(thisBookUrl);
	console.log(thisPageSlug);

	if(thisBookUrl.includes("scalar.fas.harvard.edu")){
		console.log(`Scalar API book url set to ${thisBookUrl}`);
		scalarapi.setBook(thisBookUrl);
	} else {
		console.log("Scalar API book url - default book");
		scalarapi.setBook( "https://scalar.fas.harvard.edu/cole---test-book" );
	}

	// if ( scalarapi.loadNode( "russian-test-2", true, handleSuccess, handleFailure) == "loaded" ) {
	// 	// handleSuccess();
	// };

	if ( scalarapi.loadNode( thisPageSlug, true, handleSuccess, handleFailure) == "loaded" ) {
		// handleSuccess();
	};

	async function processHtml(content){
		const output_html = await colorizehtml(content);
		return(output_html);
	}

	function handleSuccess() {
		console.log(thisPageSlug);
		var node = scalarapi.getNode( thisPageSlug );
		console.log("Node:");
		console.log(node);
		var content = node.versions[0].content;
		var promise = processHtml(content);
		var colorized;
		promise.then(function(data){
			colorized = data;
			$(".body_copy").html(colorized);
			console.log("Data colorized.")
		})
	}

	function handleFailure() {
		console.log("The node could not be loaded. Colorization failed.")
	}

});

})(window, jQuery);
