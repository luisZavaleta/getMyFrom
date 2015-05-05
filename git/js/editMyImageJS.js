var domElementModal = null; // used to store temporally any webPage element that is using during the
// modal

function editMyElement() {

	/** add hidden modal * */
	addBaseModal();

	/** delete domElementModal when modal is closed * */
	closeModalEvent();

	/** Config Image picker in modal * */
	fileInputConfig();

	/** Defines actions to be made when the user click "Guardar" in the modal. * */
	saveModal();

}

/**
 * Add modal to the webPage, for editing purposes when contenteditable is not enough
 */
function addBaseModal() {
	var htmlModal = getModalHtml();
	$("body").append(htmlModal);
}

/**
 * Clear domElementModal Globar variable used for storing the element that trigered the modal.
 */
function closeModalEvent() {
	$("#vulcano-cms-modal").on('hidden.bs.modal', function(e) {
		domElementModal = null; // domElementModal was used to store the element that trigered the
		// modal window.
	});
}

/**
 * For image picker, use the input-new with and height and put it in the imput-preview
 */
function fileInputConfig() {

	$(document).on("change.bs.fileinput", ".fileinput", function() {

		var originalImage = $(this).find(".fileinput-new img");

		// Workaround to get width anf height because originalImage.css("height") returns 0px when
		// height = auto
		var style = originalImage.attr("style");

		if (!!style) {
			var styles = style.split(";");

			var height = "";
			var width = "";

			$.each(styles, function(index, singleStyle) {

				if (singleStyle.contains("height")) {
					height = (singleStyle.split(":"))[1];
				}

				if (singleStyle.contains("width")) {
					width = (singleStyle.split(":"))[1];
				}
			});

			/*
			 * var wdth = originalImage.css("width") var hght = originalImage.css("height")
			 */

			var previewImage = $(this).find(".fileinput-preview img");

			previewImage.css("width", width);
			previewImage.css("height", height);
		}

	});

}

function getModalHtml() {

	var html = '';

	html += '<div id="vulcano-cms-modal" class="modal fade" tabindex="-1" data-width="auto" style="display: none;">';
	html += '	<div class="modal-body modal-body-vcms">Este texto se modificará de forma dinámica</div>';
	html += '	<div class="modal-footer">';
	html += '		<button type="button" data-dismiss="modal" class="btn btn-default">Cerrar</button>';
	html += '		<button type="button" class="btn btn-primary guardar-modal-vcms" data-dismiss="modal">Guardar</button>';
	html += '	</div>';
	html += '</div>';

	return html;

}

// Save button for the modal
function saveModal() {

	$(document).on("click", ".guardar-modal-vcms", function() {
		
		console.log("Closing modal...")

		var data = getAttrDataFromModal($("#vulcano-cms-modal"), [ "data-vwe-type" ]);

		switch (data["data-vwe-type"]) {

			case "image":
				setImageToPage($("#vulcano-cms-modal"));
				break;

			// image-redirect will put the redirec info in the footer of the getModalHtml()

			default:
				alert("not implemented yet---->" + data["data-vwe-type"]);

		}

	});
}

/**
 * @param thiz:
 *        modal window
 * @param imageInMainPageSelector:
 *        selector in main page
 * @param index:
 *        index used with imageInMainPageSelector in case of collections
 * @param parent:
 * @event modal.setImage.before
 * @event modal.setImage.after
 */
function setImageToPage(thiz) {

	var element = domElementModal; // clicked element

	$(element).trigger("modal.setImage.before");

	var previewImage = $(thiz).find(".fileinput-preview img:first");

	if (!exists(previewImage)) {
		previewImage = $(thiz).find(".fileinput-new.thumbnail img:first");
	}

	if (exists(previewImage)) {

		var image = previewImage.attr("src");

		$(element).attr("src", image);

		touch(element); // indicates that the element had been modfied

	}

	$(element).trigger("modal.setImage.after");
}

/**
 * @param thiz:
 * @param attNames =
 *        ["att-name-1", "att-name-2"] NOTE: modal body must have the "modal-body" class
 */

function getAttrDataFromModal(thiz, attNames) {

	var data = {};

	$.each(attNames, function(index, attr) {
		if (!empty(attr)) {
			data[attr] = $(thiz).find(".modal-body:first").attr(attr);
			// $(thiz).find(".modal-body:first").removeAttr(attr) //may be on close modal
		}
	});

	return data;
}

/**
 * @selector: image selector
 * @redirect: {true | false} -define if the image will have a redirection attribute or not
 * @event: event to be used to open the modal
 * @css: css attributes in a map (json object).
 * @modalselector: Modal selector, only needed when you're gonna provide your own modal.
 * @parentSelector: Parent of the selector, find a child with selector, if no selector is defined,
 *                  then uses img as child selector
 * @image: Image to be shown by default in the modal, if an image is no indicated, it use the
 *         clicked image.
 * @-NOTE: width and height deprecated, use css instead.
 */
function makeImageEditable(params) {

	// Create composite selector in case parentSelector is setter
	if (!!params.selector || !!params.parentSelector) {
		if (!!params.parentSelector) {
			if (!!params.selector) {
				params.selector = params.parentSelector + " " + params.selector;
			} else {
				params.selector = params.parentSelector + " img";
			}
		}

		// Remove a previously-attached event handler from the element
		$(params.selector).unbind();

		imageEditor(params);
	} else {
		console.error("Can't edit image, selector not found");
	}
}



/**
 * @selector:
 * @redirect: {true | false} -define if the image will have a redirection attribute or not
 * @width: define the width of the normal image in px, by default 200px
 * @event:
 * @image: main image
 * @parent: parent selector (the closest element with this selector is the parent)
 * @addIndex: Boolean, indicates if the index relatively to the parent ins needed
 * @deprecated: id <-- id of the image
 */

function imageEditor(paramsBase) {

	$(document).on("click", paramsBase.selector, function(e) {

		var params = vulcanoUtil.clone(paramsBase);

		// stop events propagation
		e.preventDefault();
		e.stopPropagation();

		// set global domElementModal variable it store the last element that trigger a modal window
		domElementModal = e.target;

		imageEditorConfigModal(params, e.target);

		// set the type of element in the modal window
		if (params.redirect) {
			$(params.modalselector).attr("data-vwe-type", "image-redirect");
		} else {
			$(params.modalselector).attr("data-vwe-type", "image");
		}

	});

	// closeModal("#vulcano-cms-modal")
}






/**
 * Add some attribute to the parameters, this attibutes will be used to render the modal window
 * correctly
 * 
 * @refreshDimensions: True if we want to refresh the with and height attributes
 * @refreshImage: true if we want to replace the image in the params for the image in the webpage.
 * @deprecated: imageWidth & imageHeight are deprecated, we sustitute it with css.
 */

function imageEditorConfigModal(params, thiz) {

	if (!params.css) {
		params.css = {};
	}

	// if no default image is setted, set clicked image
	if (!params.image) {

		console.log("params.image======>");
		console.log(thiz);
		console.log($(thiz));
		console.log($(thiz).attr("src"));

		params.image = $(thiz).attr("src");
	}

	// if redirect select as href the closest anchor href attr.
	if (!!params.redirect) {
		var href = $(thiz).closest("a").attr("href"); // It's ok.

		if (exists(href)) {
			params.redirecturl = href;
		}
	}

	// Add default values if needed
	// setImageEditorDefaultValues(params);

	setGeneralDefaultValues(params);

	var html = generateHtmlImageEditor(params); // structure-helper.js

	// change modal html for recently generated html
	$(params.modalselector).html(html);

	console.log("WIDTH====>START ");
	console.log("WIDTH====>" + getModalWidth(params));
	$("#vulcano-cms-modal").modal({

	});
	console.log("WIDTH====>END ");

}


function setGeneralDefaultValues(params) {
	
	//set modal selector if not exists
	params.modalselector = objectOrDefault(params.modalselector, "#vulcano-cms-modal .modal-body");
}


function generateHtmlImageEditor(params) {

	var html = '';

	html += '<div class="fileinput fileinput-new" data-provides="fileinput" style="max-width:100%">';
	html += '	<div class="fileinput-new thumbnail">';
	html += '		<img style="' + JSON.toCssString(params.css) + '" src="' + params.image + '" alt="..." />';
	html += '	</div>';
	html += '	<div class="fileinput-preview fileinput-exists thumbnail"  />';
	html += '	<div>';
	html += '		<span class="btn btn-default btn-file">';
	html += '			<span class="fileinput-new">Seleccionar...</span>';
	html += '			<span class="fileinput-exists">Cambiar</span>';
	html += '			<input type="file" name="..." />';
	html += '		</span>';
	html += '		<a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Eliminar</a>';
	html += '	</div>';
	html += '</div>';

	return html;
}



function getModalWidth(params) {
	
	console.log("WIDTH 2 ====>"+params.width);

	var width = 200; // min

	if (params.redirect) {
		width += 250;
	}

	if (params.width > 150) {
		width += (params.width - 155);
	}

	console.log("WIDTH 3 ====>"+params.width);

	return width;

}



var vulcanoUtil = {};

vulcanoUtil.clone = function clone(obj) {
	return jQuery.extend(true, {}, obj);
};
