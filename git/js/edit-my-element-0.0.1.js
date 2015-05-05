/**
 * @author: luisZavaleta, Vulcano Software
 * @dependOn: JQuery, vulcano-utils: http://www.facturacion-mexico.com/JS/vulcano-util-1.5.1.js,
 *            Bootstrap 3, Jasny Bootstrap File Input. (Bootstrao and Jasny are only used for
 *            images)
 */

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

	/** Add default delete element funcionality * */
	makeElementsDeletable();

	/** Add default create element funcionality * */
	makeElementsAddable();

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

// common functions

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

// modal-scrollable

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

/**
 * @param modalselector
 */
/*
 * function closeModal(modalSelector) {
 * 
 * $(modalSelector).unbind('hidden.bs.modal')
 * 
 * $(modalSelector).on('hidden.bs.modal', function(e) { }) }
 */
/**
 * This fucntion ensure that the we have the parameters needed in order to create the modal, if we
 * don't have it put default parameters.
 */
function setImageEditorDefaultValues(params) {

	setGeneralDefaultValues(params);

	// params.width = numericOrDefault(params.css["width"], 200);
	// params.height = numericOrDefault(params.css["height"], 150);

	if (!!params.modalWidth) {
		params.width = params.modalWidth;
	}

	if (!!params.modalHeight) {
		params.height = params.modalHeight;
	}

	if (!!params.imageClass) {
		params.imageClass = "";
	}

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
 * @param preventDefault:
 *        String of events name, separated by a space
 * @param stopPropagation:
 *        String of events name, separated by a space
 * @param unbind:
 *        boolean
 */
function preprocessEditableElement(params) {

	if (!!params.unbind) {
		$(params.id).unbind();
	}

	if (!!params.stopPropagation) {
		$(params.id).on(params.stopPropagation, function(event) {
			event.stopPropagation();
		});
	}

	if (!!params.preventDefault) {
		$(params.id).on(params.preventDefault, function(event) {
			event.preventDefault();
		});
	}

	if (!!params.deleteItem) {
		if (!params.deleteItem.customDeleteFunction) {
			defaultDeleteItem(params);
		} else {

			customDeleteItem(params);

		}

	}

	if (!!params.addItem) {

		if (!params.addItem.customAddFunction) {
			defaultAddItem(params)
		} else {
			customAddItem(params)
		}

	}

}

/**
 * @editable: true for contenteditable=true
 * @selector: span selector
 */
function makeSpanEditable(params) {

	if (params.editable) {

		$(params.selector).unbind()
		$(params.selector).attr("contenteditable", true)
	}

}

function makeStrongEditable(params) {

	if (params.editable) {
		$(params.selector).unbind()
		$(params.selector).attr("contenteditable", true)
	}

}

/**
 * @editable: true for contenteditable=true
 * @selector: span selector
 */
function makeH(params) {

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}

/**
 * @editable: true for contenteditable=true
 * @modal: edit using a modal
 * @redirect: add redirect edition (only works with modal = true)
 */

function makeAEditable(params) {

	if (params.modal) {
		alert("editar a en modal no ha sido implementado todavía")
		return;
	}

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}// 

/**
 * @editable: true for contenteditable=true
 * @modal: edit using a modal
 * @redirect: add redirect edition (only works with modal = true)
 */

function makePEditable(params) {

	if (params.modal) {
		alert("editar a en modal no ha sido implementado todavía")
		return;
	}

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}

function makeDivEditable(params) {

	if (!!params.modal) {
		alert("editar a en modal no ha sido implementado todavía")
		return;
	}

	if (!!params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

	if (!!params.addButton) {

	}

}

/**
 * @editable: true for contenteditable=true
 * @modal: edit using a modal
 * @redirect: add redirect edition (only works with modal = true)
 */

function makeLiEditable(params) {

	if (params.modal) {
		alert("editar li en modal no ha sido implementado todavía")
		return;
	}

	if (params.editable) {
		$(params.selector).attr("contenteditable", true)
	}

}

/**
 * For image picker, use the input-new with and height and put it in the imput-preview
 */
function fileInputConfig() {

	$(document).on("change.bs.fileinput", ".fileinput", function() {

		var originalImage = $(this).find(".fileinput-new img")

		// Workaround to get width anf height because originalImage.css("height") returns 0px when
		// height = auto
		var style = originalImage.attr("style")

		if (!!style) {
			var styles = style.split(";")

			var height = ""
			var width = ""

			$.each(styles, function(index, singleStyle) {

				if (singleStyle.contains("height")) {
					height = (singleStyle.split(":"))[1]
				}

				if (singleStyle.contains("width")) {
					width = (singleStyle.split(":"))[1]
				}
			})

			/*
			 * var wdth = originalImage.css("width") var hght = originalImage.css("height")
			 */

			var previewImage = $(this).find(".fileinput-preview img")

			previewImage.css("width", width)
			previewImage.css("height", height)
		}

	})

}

// Save button for the modal
function saveModal() {

	$(document).on("click", ".guardar-modal-vcms", function() {

		var data = getAttrDataFromModal($("#vulcano-cms-modal"), [ "data-vwe-type" ])

		switch (data["data-vwe-type"]) {

			case "image":
				setImageToPage($("#vulcano-cms-modal"))
				break;

			// image-redirect will put the redirec info in the footer of the getModalHtml()
			/**
			 * @x case "image-redirect":
			 * @x notImplementedYet()
			 * @x break;
			 * @x case "li-array": // setHmlLiLinkToPage(this, data.id)
			 * @x setHmlLinkToPage(this, data.id)
			 * @x break;
			 * @x case "link":
			 * @x setLinkToPage(this, data.id)
			 * @x break;
			 * @x case "image-redirect-array":
			 * @x setImageArrayToPage(this, data.id)
			 * @x break;
			 * @x case "image-array":
			 * @x setImageArrayToPage(this, data.id)
			 * @x break;
			 */
			default:
				alert("not implemented yet---->" + data["data-vwe-type"])

		}

	})
}

/*
 * function saveInDatabase(params, queuedStructure) { } sacsa-clients-logo
 */

// addable-item alert("addable
