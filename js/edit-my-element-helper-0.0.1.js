// INIT
function addSaveButton(siteConfig) {

	if (!!siteConfig.saveButton) {
		saveButton = siteConfig.saveButton;
		$("body").prepend(saveButton.html);

		if (!!saveButton.css) {
			$(".vulcano-cms.guardar-webpage").css(saveButton.css);
		}

	}
	$(".vulcano-cms.guardar-webpage").on("click", function() {

		$('.guardar-webpage .btn').prop('disabled', true);
		saveCMS(siteConfig.structure, siteConfig.id); // START SAVING CMS

		$(document).ajaxStop(function() {
			alert("reloading");
			location.reload();
		});

		$(document).ajaxError(function() {
			alert("Algun elemento pudo no haberse guardado correctamente");
		});
	});

}

/**
 * Add modal to the webPage, for editing purposes when contenteditable is not enough
 */
function addBaseModal() {
	var htmlModal = getModalHtml(); 
	$("body").append(htmlModal);
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

function setGeneralDefaultValues(params) {
	
	//set modal selector if not exists
	params.modalselector = objectOrDefault(params.modalselector, "#vulcano-cms-modal .modal-body");
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

function notImplementedYet() {
	alert("not implemented yet");
}

// save to database functions

function saveDBImage(structure) {

	var img = $(structure.id);
	// var src = img.attr("src")

}

/*
 * Clear domElementModal Globar variable used for storing the element that trigered the modal.
 * */
function closeModalEvent() {
	$("#vulcano-cms-modal").on('hidden.bs.modal', function(e) {
		domElementModal = null; // domElementModal was used to store the element that trigered the
		// modal window.
	});
}

function unbindHref(structure) {
	var element = $(structure.id);

	var a = element.closest("a");
	if (!!a) {
		a.bind('click', function() {
			return false;
		});
	}

}

function makeElementsDeletable() {

	$(document).on("click", ".deletable-clickable", function() {

		touch(this);

		var tobeDeletedElement = $(this).closest(".deletable-wrapper");

		if (!!tobeDeletedElement.attr("data-deletable-min")) {

			var min = tobeDeletedElement.attr("data-deletable-min");

			if (parseInt(min) > parseInt(tobeDeletedElement.siblings().length)) {
				return;
			}

		}

		tobeDeletedElement.remove();
	});
}

function makeElementsAddable() {

	$(document).on("click", ".addable-clickable", function(event) {

		var wrapper = $(this).closest(".addable-wrapper");

		var html = wrapper.find(".addable-item").first().clone();
		html.attr("data-id", "");
		html.find("*[data-id]").attr("data-id", "");

		html.addClass("edited");
		html.find("*").addClass("edited");

		touch(wrapper);

		wrapper.find(".addable-item").last().after(html);

	});
}

function defaultDeleteItem(params) {
	var deletableElement;

	if (!!params.deleteItem.wrapper) {
		deletableElement = $(params.deleteItem.wrapper + " " + params.id).closest(params.deleteItem.wrapper)
	} else {
		deletableElement = $(params.id)
	}

	deletableElement.addClass("deletable-wrapper")

	if (!!params.deleteItem.min) {
		deletableElement.attr("data-deletable-min", params.deleteItem.min)

	}

	params.deleteItem.clazz = params.deleteItem.clazz + " deletable-clickable"

	deletableElement.append(getIconItem(params.deleteItem))

}

function customDeleteItem(params) {

	var diffId = new Date().getTime();

	var deletableElement;

	if (!!params.deleteItem.wrapper) {
		deletableElement = $(params.deleteItem.wrapper + " " + params.id).closest(params.deleteItem.wrapper)
	} else {
		deletableElement = $(params.id)
	}

	deletableElement.addClass("deletable-wrapper-" + diffId)

	if (!!params.deleteItem.min) {
		deletableElement.attr("data-deletable-min", params.deleteItem.min)

	}

	params.deleteItem.clazz = params.deleteItem.clazz + " deletable-clickable-" + diffId

	deletableElement.append(getIconItem(params.deleteItem))

	$(document).on("click", ".deletable-clickable-" + diffId, function() {

		customDeleteItemClick(this, diffId, params)
	})

}

function defaultAddItem(params) {

	var wrapper = $(params.id)
	wrapper.addClass("addable-wrapper")

	var items = wrapper.find(params.addItem.item)
	items.addClass("addable-item")

	params.addItem.clazz = params.addItem.clazz + " addable-clickable"

	wrapper.append(getIconItem(params.addItem))

	if (!!params.addItem.executeAfter) {
		$(document).on(params.addItem.executeAfter.event, params.id + " .addable-clickable", function() {
			setTimeout(function() {// Another terrible hack, if the element takes more than one
				// second to be added, this simply will fail. we will put an event listener in
				// the next version
				// ¡¡¡¡¡¡¡¡¡¡Take out this in the next version, use customAddItem instead.!!!!!!!
				params.addItem.executeAfter.onClick()
			}, 1000)

		})

	}
}

function customAddItem(params) {

	var diffId = new Date().getTime();

	var wrapper = $(params.id)
	wrapper.addClass("addable-wrapper-" + diffId)

	var items = wrapper.find(params.addItem.item)
	items.addClass("addable-item-" + diffId)

	params.addItem.clazz = params.addItem.clazz + " addable-clickable-" + diffId

	wrapper.append(getIconItem(params.addItem))

	$(document).on("click", ".addable-clickable-" + diffId, function() {
		customAddItemClick(this, diffId, params)
	})

}

function customAddItemClick(thizz, diffId, params) {

	console.log("this")
	console.log(thizz)

	var wrapper = $(thizz).closest(".addable-wrapper-" + diffId)

	console.log(".addable-wrapper- + diffId")
	console.log(".addable-wrapper-" + diffId)

	console.log("wrapper")
	console.log(wrapper)

	var html = wrapper.find(".addable-item-" + diffId).first().clone()

	console.log("html")
	console.log(html)
	html.attr("data-id", "")
	html.find("*[data-id]").attr("data-id", "")

	html.addClass("edited")
	html.find("*").addClass("edited")

	touch(wrapper)

	params.addItem.customAddFunction(html, wrapper)

	// wrapper.find(".addable-item-" + diffId).last().after(html)
}

function customDeleteItemClick(thizz, diffId, params) {

	console.log("delete custom")
	console.log(thizz)
	console.log(diffId)

	touch(thizz)

	var tobeDeletedElement = $(thizz).closest(".deletable-wrapper-" + diffId)

	if (!!params.deleteItem.min) {

		var min = params.deleteItem.min

		if (parseInt(min) > parseInt(tobeDeletedElement.siblings().length)) {
			return;
		}

	}

	params.deleteItem.customDeleteFunction(tobeDeletedElement)
	// .remove()

}
// $container.isotope

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



// Falta width, bitch

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
