/**
 * @fileName editMyFormJS.js This page is used to create a form inside a modal, and on close we put
 *           all the modal values in the a html page. The form is based inbootstrpa, so the grid
 *           system is the same with 12 colums.
 * @author LuisZavaleta
 */

var editMyForm = {};

/**
 * VARIABLES
 */

editMyForm.FORM_TYPE_DEFAULT = 0;
editMyForm.FORM_TYPE_HORIZONTAL = 1;
editMyForm.FORM_TYPE_INLINE = 2;

editMyForm.ELEMENT_TYPE_INPUT = 0;
editMyForm.ELEMENT_TYPE_TEXTAREA = 1;
editMyForm.ELEMENT_TYPE_CHECKBOX = 2;
editMyForm.ELEMENT_TYPE_RADIOBUTTON = 3;
editMyForm.ELEMENT_TYPE_SELECT = 4;

editMyForm.ELEMENT_CHECKBOX_STACKED = 0;
editMyForm.ELEMENT_CHECKBOX_INLINE = 1;

/**
 * ARRAYS
 */

var formClass = [ '', 'form-horizontal', 'form-inline' ];
var inputGroupOpen = [ '', '', '<div class="input-group">' ];
var formInputBefore = [ '', '<div class="col-sm-10">', '' ];
var openDivWithColumns = '<div class="%emfWidthInColumns%">';
var formInputStyle = [ '', '', 'width:100%' ];
var elementType = [ 'input', '<textarea' ];

var checkboxDivBefore = [ '<div class="checkbox">', '' ];
var radiobuttonDivBefore = [ '<div class="radio">', '' ];
var checkboxLabelClass = [ '', 'checkbox-inline' ];
var radiobuttonLabelClass = [ '', 'radio-inline' ];

var checboxOrRadioButtonDivBefore = [];
checboxOrRadioButtonDivBefore[editMyForm.ELEMENT_TYPE_CHECKBOX] = checkboxDivBefore;
checboxOrRadioButtonDivBefore[editMyForm.ELEMENT_TYPE_RADIOBUTTON] = radiobuttonDivBefore;

var checkBoxOrRadioButtonLabelClass = [];
checkBoxOrRadioButtonLabelClass[editMyForm.ELEMENT_TYPE_CHECKBOX] = checkboxLabelClass;
checkBoxOrRadioButtonLabelClass[editMyForm.ELEMENT_TYPE_RADIOBUTTON] = radiobuttonLabelClass;

// var closeDivInHorizontal = [ '', ' </div>', '' ];
var closeDiv_1_3 = [ '</div>', '', '' ]; // closDivInStackedCheckBox
var closeDiv_2_3 = [ '', '</div>', '' ]; // closeDivInHorizontal
var closeDiv_3_3 = [ '', '', '</div>' ];

var checkOrRadioType = [];

checkOrRadioType[editMyForm.ELEMENT_TYPE_CHECKBOX] = 'checkbox';
checkOrRadioType[editMyForm.ELEMENT_TYPE_RADIOBUTTON] = 'radio';

/**

 */

/**
 * @param formType{none | horizontal | inline} horizontal, title in the left and input in the right;
 *        inline, title in the top, input in the bottom; default horizontal.
 * @param formGroups{Array} Contains the information of all the form groups that will be displayed
 *        inside the form.
 * @param formGroups[*].inputId{String} Id of the input.
 * @param formGroups[*].labelText{String} Ttitle fo the row.
 * @param formGroups[*].placeholder {String} Placegolder text.
 * @param formGroups[*].rowColumns{Array} Array with the width in columns of the element, the number
 *        of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].labelColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array chedefines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].elementType {input | textarea | checkbox | radioButton | select} Input type
 *        to be generated, default input; <br>
 *        ============ INPUT =========
 * @param formGroups[*].inputType {color | email | hidden | number | password | tel | url} Some
 *        element are only available in HTML5 <br>
 *        ================================== TEXTAREA =================================
 * @param formGroups[*].textareaRows Columns that will be set in a text area.
 *        ============================ CHECKBOX ONLY PARAMS ===========================
 * @param formGroups[*].checkboxFormType{inline | stacked}: String that defines if groups of
 *        checkboxes us inline or stacked
 * @param formGroups[*].checkboxName{String} name of one groups of checkboxes.
 * @param formGroups[*].checkboxParams[*].id: Single checkbox value.
 * @param formGroups[*].checkboxParams[*].value: Single Checkbox value.
 * @param formGroups[*].checkboxParams[*].text: Single Checkbox main text
 */

editMyForm.getForm = function(params) {

	var htmlForm = $("#emf-form").html();
	var formTypeInt = editMyForm.getFormType(params.formType);

	htmlForm = vulcanoUtil.template(htmlForm, {
		formClass : formClass[formTypeInt],
		emfFormContent : editMyForm.getFormGroups(formTypeInt, params.formGroups)
	});

	$(".testHTML").html(htmlForm);
};

/**
 * @param formTypeInt{ 0 | 1 | 2}
 * @param formGroups[*].inputId{String} Id of the input.
 * @param formGroups[*].labelText{String} Ttitle fo the row.
 * @param formGroups[*].placeholder {String} Placegolder text.
 * @param formGroups[*].rowColumns{Array} Array with the width in columns of the element, the number
 *        of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].labelColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].elementType {input | textarea | checkbox | radioButton | select} Input type
 *        to be generated, default input; <br>
 *        ============ INPUT =========
 * @param formGroups[*].inputType {text | color | email | hidden | number | password | tel | url}
 *        Some element are only available in HTML5 <br>
 *        ================================== TEXTAREA =================================
 * @param formGroups[*].textareaRows Columns that will be set in a text area.
 *        ============================ CHECKBOX ONLY PARAMS ===========================
 * @param formGroups[*].checkboxFormType{inline | stacked}: String that defines if groups of
 *        checkboxes us inline or stacked
 * @param formGroups[*].checkboxName{String} name of one groups of checkboxes.
 * @param formGroups[*].checkboxParams[*].id: Single checkbox value.
 * @param formGroups[*].checkboxParams[*].value: Single Checkbox value.
 * @param formGroups[*].checkboxParams[*].text: Single Checkbox main text
 */

editMyForm.getFormGroups = function(formTypeInt, formGroups) {

	var formGroupsHtml = '';

	$.each(formGroups, function(index, value) {
		formGroupsHtml += editMyForm.getFormGroup(formTypeInt, value);
	});

	return formGroupsHtml;
};

/**
 * @param formTypeInt{ 0 | 1 | 2}
 * @param formGroup.inputId{String} Id of the input.
 * @param inputElementParams.inputName{String} Name of the element (for now we only use it in
 *        checkbox because stuff) // NEEDS TO BE MAPPED
 * @param formGroup.labelText{String} Ttitle fo the row.
 * @param formGroup.placeholder {String} Placegolder text.
 * @param formGroup.rowColumns{Array} Array with the width in columns of the element, the number of
 *        elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroup.labelColumns{Array} Array with the width in columns of the element, the number
 *        of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroup.inputColumns{Array} Array with the width in columns of the element, the number
 *        of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroup.elementType {input | textarea | checkbox | radioButton | select} Input type to
 *        be generated, default input; <br>
 *        ============ INPUT =========
 * @param formGroup.inputType {color | email | hidden | number | password | tel | url} Some element
 *        are only available in HTML5 <br>
 *        ================================== TEXTAREA =================================
 * @param formGroup.textareaRows Columns that will be set in a text area.
 *        ============================ CHECKBOX ONLY PARAMS ===========================
 * @param formGroup.textareaRows Columns that will be set in a text area.
 *        ============================ CHECKBOX ONLY PARAMS ===========================
 * @param formGroup.checkboxFormType{inline | stacked}: String that defines if groups of checkboxes
 *        us inline or stacked
 * @param formGroup.checkboxName{String} name of one groups of checkboxes.
 * @param formGroup.checkboxParams[*].id: Single checkbox value.
 * @param formGroup.checkboxParams[*].value: Single Checkbox value.
 * @param formGroup.checkboxParams[*].text: Single Checkbox main text
 */

editMyForm.getFormGroup = function(formTypeInt, formGroup) {

	var htmlFormGroup = $("#emf-formGroup").html();

	htmlFormGroup = vulcanoUtil.template(htmlFormGroup, {
		emfFormGroupLabel : editMyForm.getFormGroupLabel(formTypeInt, formGroup.inputId, formGroup.labelText,
				formGroup.labelColumns),
		emfFormGroupInput : editMyForm.getFormGroupInputElement(formTypeInt, editMyForm.mapInputParamsElement(formGroup)),
		emfFormGroupWidth : editMyForm.getFormGroupWidth(formTypeInt, formGroup.rowColumns)
	});

	return htmlFormGroup;
};

/**
 * Filter form groups params to get only the data needed for intput element
 */
editMyForm.mapInputParamsElement = function(formGroup) {

	var inputParams = {};

	inputParams.inputId = formGroup.inputId;
	inputParams.placeholder = formGroup.placeholder;
	inputParams.inputColumns = formGroup.inputColumns;
	inputParams.elementType = formGroup.elementType;
	inputParams.inputType = formGroup.inputType;
	inputParams.textareaRows = formGroup.textareaRows;

	inputParams.checkboxFormType = formGroup.checkboxFormType;
	inputParams.checkboxName = formGroup.checkboxName;
	inputParams.checkboxParams = formGroup.checkboxParams;

	return inputParams;

};

/**
 * Filter iput element params to get only the data needed for intput.
 */
editMyForm.mapInputParams = function(inputParamsElement) {

	var inputParams = {};

	inputParams.inputId = inputParamsElement.inputId;
	inputParams.placeholder = inputParamsElement.placeholder;
	inputParams.inputColumns = inputParamsElement.inputColumns;
	inputParams.inputType = inputParamsElement.inputType;
	inputParams.textareaRows = inputParamsElement.textareaRows;
	// inputParams.elementType = inputParamsElement.elementType;

	console.log("inputParams.textareaRows ========>" + inputParams.textareaRows);
	console.log("inputParamsElement.textareaRows ========>" + inputParamsElement.textareaRows);
	return inputParams;

};

/**
 * @param formType{ 0 | 1 | 2}
 * @param inputId{String} Id of the input.
 * @param labelText{String} Ttitle fo the row.
 * @param labelColumns{Array} Array with the width in columns of the element, the number of elements
 *        in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 */
editMyForm.getFormGroupLabel = function(formType, inputId, labelText, labelColumns) {

	var htmlFormGroupLabel = $("#emf-formLabel").html();

	htmlFormGroupLabel = vulcanoUtil.template(htmlFormGroupLabel, {
		emfFormLabelClass : editMyForm.getFormLabelClass(formType, labelColumns),
		emfFormLabelFor : inputId,
		emfFormLabelValue : labelText
	});
	return htmlFormGroupLabel;
};

/**
 * @param formType{ 0 | 1 | 2}
 * @param rowColumns{Array} Array with the width in columns of the element, the number of elements
 *        in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 */
editMyForm.getFormGroupWidth = function(formType, rowColumns) {

	if (formType == editMyForm.FORM_TYPE_INLINE) {
		// default colum size is 4
		if (!rowColumns) {
			rowColumns = [ 4 ];
		}
		return editMyForm.getSizeCssClass(rowColumns);

	} else {
		return '';
	}
};

/**
 * @param formTypeInt{ 0 | 1 | 2}
 * @param inputElementParams.elementType {input | textarea | checkbox | radioButton | select} Input
 *        type to be generated, default input;
 * @param inputElementParams.id{String}
 * @param inputElementParams.name{String} Name of the element (for now we only use it in checkbox
 *        because stuff)
 * @param inputElementParams.placeholder {String} Placegolder text.
 * @param inputElementParams.inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 *        =================================== INPUT ===================================
 * @param inputElementParams.inputType { color | email | hidden | number | password | tel | url }
 *        Some element are only available in HTML5 <br>
 *        ================================== TEXTAREA =================================
 * @param inputElementParams.textareaRows Columns that will be set in a text area.
 *        ============================ CHECKBOX ONLY PARAMS ===========================
 * @param inputElementParams.checkboxFormType{inline | stacked}: String that defines if groups of
 *        checkboxes us inline or stacked
 * @param inputElementParams.checkboxName{String} name of one groups of checkboxes.
 * @param inputElementParams.checkboxParams[*].id: Single checkbox value.
 * @param inputElementParams.checkboxParams[*].value: Single Checkbox value.
 * @param inputElementParams.checkboxParams[*].text: Single Checkbox main text
 */

editMyForm.getFormGroupInputElement = function(formTypeInt, inputElementParams) {

	console.log("inputElementParams.elementType==========>" + inputElementParams.elementType);

	var elementType = -1;
	switch (inputElementParams.elementType) {

		case "textarea":// done
			return editMyForm.getFormGroupInput(formTypeInt, editMyForm.ELEMENT_TYPE_TEXTAREA, editMyForm
					.mapInputParams(inputElementParams));
			break;
		case "checkbox"://done
			elementType = editMyForm.ELEMENT_TYPE_CHECKBOX;
		case "radio": //done
			if (elementType == -1) {
				elementType = editMyForm.ELEMENT_TYPE_RADIOBUTTON;
			}
			return editMyForm.getFormGroupCheckboxOrRadio(elementType, inputElementParams.checkboxFormType,
					inputElementParams.checkboxName, inputElementParams.checkboxParams);
			break;

		case "select":
			return editMyForm.getFormGroupSelect();
			break;
		case "input":// done
		default:
			return editMyForm.getFormGroupInput(formTypeInt, editMyForm.ELEMENT_TYPE_INPUT, editMyForm
					.mapInputParams(inputElementParams));
			break;

	}

};

/**
 * @param formTypeInt{ 0 | 1 | 2}
 * @param inputElementParams.inputId{String}
 * @param inputElementParams.placeholder {String} Placegolder text.
 * @param inputElementParams.inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param inputElementParams.inputType {color | email | hidden | number | password | tel | url} Some
 *        element are only available in HTML5
 * @param inputElementParams.textareaRows Columns that will be set in a text area.
 */
editMyForm.getFormGroupInput = function(formTypeInt, formElementType, inputElementParams) {

	console.log("formElementType=======>" + formElementType);
	var htmlFormGroupInput = '';

	if (formElementType == editMyForm.ELEMENT_TYPE_INPUT) {
		htmlFormGroupInput = $("#emf-formInput").html();
	} else if (formElementType == editMyForm.ELEMENT_TYPE_TEXTAREA) {
		htmlFormGroupInput = $("#emf-formTextarea").html();
	}

	htmlFormGroupInput = vulcanoUtil.template(htmlFormGroupInput, {
		emfFormInputBefore : editMyForm.getFormGroupInputDivBefore(formTypeInt, inputElementParams.inputColumns),
		emfFormInputType : inputElementParams.inputType,
		emfFormInputId : inputElementParams.inputId,
		emfFormInputPlaceHolder : inputElementParams.placeholder,
		emfFormInputAfter : closeDiv_2_3[formTypeInt],
		emfFormInputStyle : formInputStyle[formTypeInt],
		emfFormInputElementType : elementType[formElementType],
		emfFormTextareaRows : inputElementParams.textareaRows
	// returning null
	});

	console.log("============>getTextareaRows(formElementType, inputElementParams.textareaRows)");

	return htmlFormGroupInput;

};

function getTextareaRows(formElementType, textareaRows) {
	if (formElementType == editMyForm.ELEMENT_TYPE_TEXTAREA) {
		return 'rows="' + textareaRows + '"';
	} else {
		return '';
	}
}

/**
 * @param formTypeInt{ 0 | 1 | 2}
 * @param inputColumns{Array} Array with the width in columns of the element, the number of elements
 *        in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 */
editMyForm.getFormGroupInputDivBefore = function(formTypeInt, inputColumns) {

	if (formTypeInt == editMyForm.FORM_TYPE_HORIZONTAL) {

		if (!inputColumns) {
			inputColumns = [ 8 ];
		}

		var formInputDivBefore = openDivWithColumns;

		formInputDivBefore = vulcanoUtil.template(formInputDivBefore, {
			emfWidthInColumns : editMyForm.getSizeCssClass(inputColumns)
		});

		return formInputDivBefore;

	} else {
		return '';
	}
};

/**
 * @param checkboxFormType{inline | stacked}: String that defines if groups of checkboxes us inline
 *        or stacked
 * @param checkboxName{String} name of one groups of checkboxes.
 * @param checkboxParams[*].id: Single checkbox value.
 * @param checkboxParams[*].value: Single Checkbox value.
 * @param checkboxParams[*].text: Single Checkbox main text
 */

editMyForm.getFormGroupCheckboxOrRadio = function(elementType, checkboxFormType, checkboxName, checkboxParams) {

	var formGroupCheckboxHtml = "";

	var checkboxFormTypeInt = editMyForm.getCheckboxFormType(checkboxFormType);

	console.log("checkboxFormTypeInt======>" + checkboxFormTypeInt);

	$.each(checkboxParams, function(index, value) {
		formGroupCheckboxHtml += editMyForm.getFormSingleCheckboxOrRadio(elementType, checkboxFormTypeInt, checkboxName,
				value); // changed
	});

	return formGroupCheckboxHtml;
};

/**
 * @param checkboxFormTypeInt{0 - inline | 1 - stacked}: Integer that defines if groups of
 *        checkboxes us inline or stacked.
 * @param checkboxName{String} name of one groups of checkboxes.
 * @param checkboxParams.id: Single checkbox value.
 * @param checkboxParams.value: Single Checkbox value.
 * @param checkboxParams.text: Single Checkbox main text
 */
editMyForm.getFormSingleCheckboxOrRadio = function(elementType, checkboxFormTypeInt, checkboxName, checkboxParams) {

	var htmlFormGroupCheckbox = $("#emf-formCheckbox").html();

	console.log("checboxOrRadioButtonDivBefore======>" + checboxOrRadioButtonDivBefore);
	console.log(checboxOrRadioButtonDivBefore);
	console.log("elementType========================>" + elementType);
	console.log("checkboxFormTypeInt================>" + checkboxFormTypeInt);

	htmlFormGroupCheckbox = vulcanoUtil.template(htmlFormGroupCheckbox, {
		emfFormCheckboxBefore : checboxOrRadioButtonDivBefore[elementType][checkboxFormTypeInt],
		emfFormCheckboxLabelClass : checkBoxOrRadioButtonLabelClass[elementType][checkboxFormTypeInt],
		emfFormCheckboxId : checkboxParams.id,
		emfFormCheckboxName : checkboxName,
		emfFormCheckboxValue : checkboxParams.value,
		emfFormCheckboxText : checkboxParams.text,
		emfFormCheckboxAfter : closeDiv_1_3[checkboxFormTypeInt],
		checkOrRadioType : checkOrRadioType[elementType]

	});

	return htmlFormGroupCheckbox;

};

editMyForm.getFormGroupRadioButton = function() {

};

editMyForm.getFormGroupSelect = function() {

};

/**
 * @param formType{ 0 | 1 | 2}
 * @param labelColumns{Array} Array with the width in columns of the element, the number of elements
 *        in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 */
editMyForm.getFormLabelClass = function(formType, columns) {

	switch (formType) {
		case editMyForm.FORM_TYPE_DEFAULT:
		default:
			return '';
			break;
		case editMyForm.FORM_TYPE_HORIZONTAL:

			if (!columns) {
				columns = [ 2 ];
			}
			return editMyForm.getHorizontalLabelClass(columns) + ' control-label';
			break;
		case editMyForm.FORM_TYPE_INLINE:
			return 'sr-only';
			break;
	}

};

/**
 * ################### HELPER FUNCTIONS ###############
 */

/**
 * @param checkboxFormType{stacked | inline }
 */
editMyForm.getCheckboxFormType = function(checkboxFormType) {

	console.log("checkboxFormType========>" + checkboxFormType);

	switch (checkboxFormType) {

		case "inline":
			return editMyForm.ELEMENT_CHECKBOX_INLINE;
			break;
		default:
		case "stacked":
			return editMyForm.ELEMENT_CHECKBOX_STACKED;
			break;

	}

};

/**
 * @param formType{none | horizontal | inline} horizontal, title in the left and input in the right;
 *        inline, title in the top, input in the bottom; default horizontal.
 */
editMyForm.getFormType = function(formType) {

	switch (formType) {
		case "horizontal":
			return editMyForm.FORM_TYPE_HORIZONTAL;
			break;
		case "inline":
			return editMyForm.FORM_TYPE_INLINE;
			break;
		default:
			return editMyForm.FORM_TYPE_DEFAULT;
	}

};

/**
 * @param columns{Array} Array with the width in columns of the element, the number of elements in
 *        the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @return String with the classes that will be setted in the label of an horizontal form;
 */
editMyForm.getHorizontalLabelClass = function(columns) {

	return editMyForm.getSizeCssClass(columns) + ' control-label';

};

/**
 * @param columns{Array} Array with the width in columns of the element, the number of elements in
 *        the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @test http://jsfiddle.net/mfaj9bkn/
 * @return String with the classes that define the widh in columns in bootstrap;
 */
editMyForm.getSizeCssClass = function(columns) {

	switch (columns.length) {
		case 0:
			throw "getSizeCssClass ---> InvalidParameterException";
			break;
		case 1:
			return " col-xs-" + columns[0] + " col-sm-" + columns[0] + " col-md-" + columns[0] + " col-lg-" + columns[0]
					+ " ";
			break;
		case 2:
			return " col-xs-" + columns[0] + " col-sm-" + columns[0] + " col-md-" + columns[1] + " col-lg-" + columns[1]
					+ " ";
			break;
		case 3:
			return " col-xs-" + columns[0] + " col-sm-" + columns[0] + " col-md-" + columns[1] + " col-lg-" + columns[2]
					+ " ";
			break;
		case 4:
			return " col-xs-" + columns[0] + " col-sm-" + columns[1] + " col-md-" + columns[2] + " col-lg-" + columns[3]
					+ " ";
			break;
		default:
			throw "getSizeCssClass ---> InvalidParameterException";

	}

}

/**
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 * OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD OLD
 */

/**
 * @param selector{String} Selector of the element that will be "clicked" in order to open the
 *        modal.
 * @param containerSelector{String} Selector of the container in the html that will be used as
 *        parend container for the elements that will be setted in the html.
 * @param event{String} Event that will triger the open of the modal, default value is "click".
 * @param openFunction{function()} Function that will be executed right after the modal open.
 * @param closeFunction{function()} Function that will be executed right before the modal closes.
 * @param css{JSON} general css attributesin a map.
 * @param formType{none | horizontal | inline} horizontal, title in the left and input in the right;
 *        inline, title in the top, input in the bottom; default horizontal. *
 * @param screenSize{extraSmall | xm | small | sm | medium | md | large | lg } Size of the screen
 *        {extraSmall: Phones (<768px)} {small:Tablets (≥768px < 922px)} {medium:Desktop (≥992px) <
 *        1200px)} {large:Desktop ≥ 1200px)}
 *        ==================================================================================
 *        ==================================================================================
 * @param fields{Array} Contains the information of all the field that will be displayed inside the
 *        form.
 * @param field.columnSize{Array} Size in columns of all the row, default for all sizes, The values
 *        in the array are used acording the format defined in Note A. and Sizes defined in Note B.
 * @param field.id{String} Input Id.
 * @param field.title{String} Title of the row.
 * @param field.inputType{input | textarea | checkbox | radioButton | select} Type of input.
 * @param field.titleColumnSize{Number} Size in colums of the title, default 12 for horizontal, 2
 *        for inline.
 * @param field.inputColumnSize{Array} Size in colums of the input , default 12 for horizontal, 10
 *        for inline.
 * @param field.heightSize{large | normal | medium }
 * @param field.css{JSON} element css attributes in a map.
 * @param field.selector{String} Child selector of the element where the input value will be setted,
 *        if input as value, else as inner html.
 * @param field.status{none | disable | readOnly}
 * @param field.context{active | success | info | warning | danger}
 */

function getMyFormHtml(params) {
	var formHTML = '';
	var formCSSClass = "";

	switch (params.formType) {
		case "horizontal":
			formCSSClass = "form-horizontal";
			break;
		case "inline":
			formCSSClass = "form-inline";
			break;
		default:
	}

	formHTML += '<form class="' + formCSSClass + '" role="form">';

	$.each(fields, function(index, value) {
		getMyMyFormRow(params.formType, value);
	});

}

/**
 * @param formType{none | horizontal | inline}
 * @param columnSize{Array} Size in columns of all the row, default Value: 12, the values in the
 *        array are used acording to the format defined in Note A. and Sizes defined in Note B.
 * @param id{String} Input Id.
 * @param titleColumnSize{Array} Size in colums of the title, default 12 for horizontal, 2 for
 *        inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * @paran inputColumnSize{Array} Size in colums of the input , default 12 for horizontal, 10 for
 *        inline, , the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * @returns
 */
function getMyMyFormRow(formType, params) {

	var form = $("#emfForm").cloneNode(true);

	if (!params.columnSize) {
		params.columnSize = [ 12 ];
	}

	form = vulcanoUtil.template(form, {
		formClass : getSizeCssClass(params.columnSize)
	});

	// form += generateRowContentHTML(type, params);

}

/**
 * @param type{inline | horizontal | general}
 * @param params.titleColumnSize
 * @param params.inputColumnSize
 */
function generateRowContentHTML(type, params) {

	var rowContentHtml = "";

	switch (type) {
		case "inline":
			return generateInlineRowContentlHTML(params);
			break;
		case "horizontal":
			return generateHorizontalRowContentHTML(params);
		default:
			return generateGeneralRowContentHtml(params);
			break;
	}

}

/**
 * <code>
 * 	<div class="form-group col-md-8">
 * 		<label class="sr-only" for="exampleInputEmail2">Email address</label>
 * 		<input id="exampleInputEmail2" class="form-control" type="email" placeholder="Enter email" style="width: 100%"/>
 * 	</div>
 * </code>
 * 
 * @param id{String} Input Id.
 * @param title{String} Title of the row.
 * @param elementType {input | textarea | checkbox | radioButton | select} Input type to be
 *        generated, default input;
 * @param params.inputType {color | email | hidden | number | password | tel | url} Some element are
 *        only available in HTML5
 * @param params.placeholder {String} Placegolder text.
 * @param params.titleColumnSize {Array} Size in colums of the title, default 12 for horizontal, 2
 *        for inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * @param inputColumnSize{Array} Size in colums of the input , default 12 for horizontal, 10 for
 *        inline, , the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 */

function generateInlineRowContentlHTML(params) {

	var inlineContent = '';
	inlineContent += '<div class="form-group ' + getSizeCssClass(params.inputColumnSize) + '">';
	inlineContent += generateInlineLabelHTML(params);
	inlineContent += generateInlineInputElement(params);
	inlineContent += "</div>"

}

/**
 * @param id{String} Input Id.
 * @param title{String} Title of the row.
 */

function generateInlineLabelHTML(params) {

	return '<label class="sr-only" for="' + params.id + '">' + params.title + '</label>'

}

/**
 * @params id{String}
 * @param elementType {input | textarea | checkbox | radioButton | select} Input type to be
 *        generated, default input;
 * @param params.inputType {color | email | hidden | number | password | tel | url} Some element are
 *        only available in HTML5
 * @param params.placeholder {String} Placegolder text.
 * @param params.texareaRows{Number} Number of rows that the text area will have.
 * @===========Check box parameters BEGIN=========
 * @param checkboxType{inline | horizontal}, Default horizontal.
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 * @param checkBoxesParams[*].checkboxColumnSize{Array} Size of each checkbox in columns, for
 *        inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B. *
 * @===========Check box parameters END=========
 */
/**
 * <code>
 *		<input id="exampleInputEmail2" class="form-control" type="email" placeholder="Enter email" style="width: 100%"/>
 *		<textarea class="form-control" rows="3" placeholder="Textarea" style="width: 100%"></textarea>
 *	</code>
 */
function generateInlineInputElement(elementType, params) {

	switch (elementType) {
		case "input":
		default:
			return '<input id="' + params.id + '" class="form-control" type="' + params.inputType + '" placeholder="'
					+ params.placeholder + '" style="width: 100%"/>';

			break;
		case "textarea":
			return '<textarea id="' + params.id + '"  class="form-control" rows="' + params.texareaRows + '" placeholder="'
					+ params.placeholder + '" style="width: 100%"></textarea>';
			break;
		case "checkbox":
			return getCheckBox(checkboxType, checkBoxesParams)
			break;
		case "radiobutton":
			break;
		case "select":
			break;

	}

}

function getRadioButton() {
	switch (radiobuttonType) {
		case "inline":
			return getInlineRadioButton(radioButtonParams);
			break;
		default:
		case "horizontal":
			return getHorizontalRadioButton(radioButtonsParams);
			break;
	}
}

function getHorizontalRadioButtons(radioButtonsParams) {

	var radioButton = '';

	$.each(radioButtonsParams, function() {
		radioButton += getHorizontalRadioButton(radioButtonsParams);
	})

}

/**
 * HORIZONTAL RADIO <br>
 * <code>		
 *   	<div class="radio">
 *       	<label>
 *         		<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
 *         		Option one is this and that&mdash;be sure to include why it's great
 *     		</label>
 *     	</div>
 *     	<div class="radio">
 *        	<label>
 *        		<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
 *          	Option two can be something else and selecting it will deselect option one
 *        	</label>
 *      </div>
 * </code>
 */

function getHorizontalRadioButton(radioButtonsParams) {

	var radioButton = '';

}

function getInlineRadioButtons(radioButtonParams) {

}

/**
 * @param checkboxType{inline | horizontal}, Default horizontal.
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 * @param checkBoxesParams[*].checkboxColumnSize{Array} Size of each checkbox in columns, for
 *        inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 */
function getCheckBox(checkboxType, checkBoxesParams) {

	switch (checkboxType) {
		case "inline":
			return getInlineCheckBoxes(checkBoxesParams)
			break;
		default:
		case "horizontal":
			return getHorizontalCheckBoxes(checkBoxesParams);
			break;
	}

}

/**
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 */
function getHorizontalCheckBoxes(checkBoxesParams) {

	var checkboxes = "";

	$.each(checkBoxesParams, function(index, value) {
		checkboxes += getHorizontalCheckBox(value);
	})

	return checkboxes;

}

/**
 * @param checkBoxesParams{Array} Array with the text and value of the check boxes.
 * @param checkBoxesParams[*].id{String} checkbox Id.
 * @param checkBoxesParams[*].value{String} Value of the input.
 * @param checkBoxesParams[*].text{String} Text of the info in front of the checkbox. <code>
 * @param checkBoxesParams[*].checkboxColumnSize{Array} Size of each checkbox in columns, 
 *        for inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 */

function getInlineCheckBoxes(checkBoxesParams) {

	var checkboxes = '<div style="width:100%" class="checkbox">';

	$.each(checkBoxesParams, function(index, value) {
		checkboxes += getInlineCheckBox(params);
	})

	checkboxes += '</div>';

	return checkboxes;

}

/**
 * @param id{String} checkbox Id.
 * @param value{String} Value of the input.
 * @param text{String} Text of the info in front of the checkbox.
 */

function getHorizontalCheckBox(params) {
	var checkboxHTML = '<div class="checkbox" style="width:100%">';
	checkboxHTML += '	<label>';
	checkboxHTML += '		<input type="checkbox" id="' + params.id + '" value="' + params.value + '">';
	checkboxHTML += params.text;
	checkboxHTML += '	</label>';
	checkboxHTML += '</div>';
	return checkboxHTML;
}

/**
 * @param id{String} checkbox Id.
 * @param value{String} Value of the input.
 * @param text{String} Text of the info in front of the checkbox. <code>
 * @param checkboxColumnSize{Array} Size of each checkbox in columns, 
 *        for inline, the values in the array are used acording to the format defined in Note A. and
 *        Sizes defined in Note B.
 * 
 * 		<label class="checkbox-inline col-sm-3">
 *        	<input type="checkbox" id="inlineCheckbox1" value="option1"> 1
 *     	</label>
 * </code>
 */

function getInlineCheckBox(params) {

	var columnSize = "";

	if (!!params.checkboxColumnSize) {
		columnSize = getSizeCssClass(params.checkboxColumnSize)
	}

	var checkBoxHtml = '';
	checkBoxHtml += '<label class="checkbox-inline ' + columnSize + '">';
	checkBoxHtml += '<input type="checkbox" id="' + params.id + '" value="' + params.value + '">';
	checkBoxHtml += params.text;
	checkBoxHtml += '</label>';

	return checkBoxHtml;

}

/**
 * <code>
 * 		
 * 			<div class="checkbox" style="width:100%">
 * 				<label>
 * 					<input type="checkbox" value="">
 * 					Option one is this and that—be sure to include why it's great
 * 				</label>
 * 			</div>
 * 			<div class="checkbox" style="width:100%"="">
 *				<label>
 *					<input type="checkbox" value="">
 *					Option two is disabled
 *				</label>
 *			</div>
 * 		
 * </code>
 */

function generateHorizontalRowContentHTML(params) {

}

function generateGeneralRowContentHtml(params) {

}

/**
 * <code>
 * 	<div class="form-group col-md-8">
 * 		<label class="sr-only" for="exampleInputEmail2">Email address</label>
 * 		<input id="exampleInputEmail2" class="form-control" type="email" placeholder="Enter email" style="width: 100%"/>
 * 	</div>
 * </code>
 */

function generateHorizontalLabelHTML() {

}

function generateGeneralLabelHtml() {

}

/**
 * @param screenSize{extraSmall | xm | small | sm | medium | md | large | lg } Size of the screen
 *        {extraSmall: Phones (<768px)} {small:Tablets (≥768px < 922px)} {medium:Desktop (≥992px) <
 *        1200px)} {large:Desktop ≥ 1200px)}
 * @param columns{Number} Number of clumns in the row.
 * @param defaultValue{Number} Columns by default
 * @DEPRECATED
 */
function getMyColumnSizeClass(screenSize, columns, defaultValue) {

	if (!columns) {
		if (!defaultValue)
			throw "getMyColumnSizeClass - Column size must be indicated";

		columns = defaultValue;
	}

	switch (type) {
		case !type:
		case "medium":
		case "md":
			return ".col-sm-" + columns;
			break;
		default:
			throw "getMyColumnSizeClass - Screen Size " + screenSize + " not valid";
	}

}

/**
 * NOTES: <code>
 * Note A: 
 * 		{1 : 	[0: xm , sm , md , lg ] }, 
 * 		{2: 	[0: xm, sm] , [1: md, lg] }, 
 * 		{3: 	[0 :xm, sm] , [1: md] , [2: lg]}, 
 * 		{4: 	[0:xm] , [1:sm] , [2: md] , [3: lg]}
 * 
 * 
 *  Note B: 
 *  	{xm: Phones (<768px)} 
 *  	{sm: Tablets (≥768px < 922px)} 
 *  	{md:Desktop (≥992px) < 1200px)} 
 *  	{lg:Big Desktop ≥ 1200px)}
 * 		
 * 
 * 
 * 
 * </code>
 */

/**
 * <code>
 *  <div class="form-group">
 *       	<label for="exampleInputPassword1">Password</label>
 *      		<div class="radio">
 *				<label>
 *					<input type="radio" id="optionsRadios1" checked="" value="option1" name="optionsRadios">
 *					Option one is this and thatasdad asd asd
 *			</label>
 *			<div class="radio">
 *				<label>
 *					<input type="radio" id="optionsRadios1" checked="" value="option1" name="optionsRadios">
 *					Option one is this and thatasdad asd asd
 *			</label>
 * 		</div>
 *	</div>
 * </code>
 */

function generateHorizontalInputElement(type, inputType) {

}

function generateGeneralInputElement(type, inputType) {

}

// ABORT MISSION, we will change everything, now we will use: vulcanoUtil.template
// (vulcano-not-yet-utils)
