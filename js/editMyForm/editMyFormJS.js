
/**
 * @fileName editMyFormJS.js This page is used to create a form inside a modal, and on close we put
 *           all the modal values in the a html page. The form is based inbootstrpa, so the grid
 *           system is the same with 12 colums.
 * @author LuisZavaleta
 */


var debug = true;
var minHtml = '<div style="display: none"><div id="emf-form"><form role="form" class="%formClass%">%emfFormContent%</form></div><div id="emf-formGroup"><div class="form-group %emfFormGroupWidth%">%emfFormGroupLabel% %emfFormGroupInput%</div></div><div id="emf-formLabel"><label style="%emfFormLabelStyle%"  class="%emfFormLabelClass%" for="%emfFormLabelFor%"> %emfFormLabelValue% </label></div><div id="emf-formInput">%emfFormInputBefore%<input type="%emfFormInputType%" style="" class="form-control" id="%emfFormInputId%"placeholder="%emfFormInputPlaceHolder%" />%emfFormInputAfter%</div><div id="emf-formTextarea">%emfFormInputBefore%<textarea type="%emfFormInputType%" style="" rows="%emfFormTextareaRows%" class="form-control" id="%emfFormInputId%"placeholder="%emfFormInputPlaceHolder%"></textarea>%emfFormInputAfter%</div><div id="emf-formCheckbox">%emfFormCheckboxBefore%<label class="%emfFormCheckboxLabelClass%"><input %disabled% id="%emfFormCheckboxId%" name="%emfFormCheckboxName%" type="%checkOrRadioType%"value="%emfFormCheckboxValue%">%emfFormCheckboxText%</label>%emfFormCheckboxAfter%</div><!-- SELECT --><div id="emf-formSelect">%emfFormSelectBefore%<select id="%emfFormSelectId%" data-placeholder="%emfSelectPlaceholder%" >%emfSelectOptions%</select>%emfFormSelectAfter%</div><!-- STACKED --><div class="checkbox"><label><input id="wereva" name="mustbethesame" type="checkbox" value="">rojo</label></div><!-- INLINE --><label class="checkbox-inline"><input id="inlineCheckbox1" name="mustbethesame" type="checkbox" value="option1">1wwww</label></div>';
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

var checkboxDivBefore = [ '<div class="checkbox %disabled%">', '' ];
var radiobuttonDivBefore = [ '<div class="radio">', '' ];
var checkboxLabelClass = [ '', 'checkbox-inline %disabled%' ];
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
 * Generates a Boostrap 3 form dinamically, the form can have inputs, text areas, checkox,
 * radiobutton or select elements, select element use chosen. Libraries required: jquery, bootstrap
 * 3, bostrap modal, jasny boostrap, vulcano util 1.5.1 and chosen.
 * 
 * ============ COMMON FORM =========
 * 
 * @param formType{none | horizontal | inline} horizontal, title in the left and input in the right;
 *        inline, title in the top, input in the bottom; default horizontal.        
 * @param formContainerSelector{String} Selector of the container of the form (it could be a form element, a div, etc).        
 * @param formGroups{Array} Contains the information of all the form groups that will be displayed
 *        inside the form.
 * @param formGroups[*].rowColumns{Array} Array with the width in columns of the element, the number
 *        of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>    
 *        
 *         
 * ============  LABEL =========
 * @param formGroups[*].labelText{String} Ttitle fo the row.
 * @param formGroups[*].placeholder {String} Placegolder text.
 * @param formGroups[*].labelColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array chedefines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 *              
 *        
 * ====== COMMON INPUT ======     
 * @param formGroups[*].inputId{String} Id of the input.
 * @param formGroups[*].inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param formGroups[*].elementType {input | textarea | checkbox | radio | select} Input type
 *        to be generated, default input; <br> 
 *        
 *        
 *        
 *        ============ INPUT PARAMS =========
 * @param formGroups[*].inputType {text | color | email | hidden | number | password | tel | url} Some
 *        element are only available in HTML5 <br>
 *        
 *        ================================== TEXTAREA PARAMS =================================
 * @param formGroups[*].textareaRows Columns that will be set in a text area.
 * 
 *        ============================ CHECKBOX AND RADIO  PARAMS ===========================
 * @param formGroups[*].checkboxFormType{inline | stacked}: String that defines if groups of
 *        checkboxes us inline or stacked
 * @param formGroups[*].checkboxName{String} name of one groups of checkboxes.
 * @param formGroups[*].checkboxParams[*].id: Single checkbox value.
 * @param formGroups[*].checkboxParams[*].value: Single Checkbox value.
 * @param formGroups[*].checkboxParams[*].text: Single Checkbox main text
 * @param formGroups[*].checkboxParams[*].type{selected || disabled} Extra information about the select option.
 * 
 *        ============================ SELECT ONLY PARAMS======================
 * @param formGroups[*].multiple{Boolean} Indicates if multiple selection is permited.
 * @param formGroups[*].options{Array} Specify the different options in this select.
 * @param formGroups[*].options.value{String} Value that will be set when the option is
 *        selected, default text value
 * @param formGroups[*].options.text{String} Text that will be Displayed in the select option,
 *        it is also used as value if a value is not pressent.
 * @param formGroups[*].options.type{selected || disabled} Extra information about the select
 *        option.
 * @param formGroups[*].optgroups{Array} Specify the different optgroups in this select.
 * @param formGroups[*].optgroups.label{String} Specifies a label for an option-group.
 * @param formGroups[*].optgroups.options{Array} Specify the different options in this
 *        optgroup. firstOptgroup.label{String} Specifies a label for an option-group.
 *        firstOptgroup.disable{Boolean} firstOptgroup.options{selected || disabled} Extra
 *        information about the select option.
 * @param formGroups[*].optgroups.options.value{String} Value that will be set when the option
 *        formGroups[*], default text value
 * @param formGroups[*].optgroups.options.text{String} Text that will be Displayed in the
 *        select option, it is also used as value if a value is not pressent.
 * @param formGroups[*].optgroups.options.type{selected || disabled} Extra information about
 *        the select option.
 *        
 *         ================ NEW SELECT PARAMS , NOT IMPLEMENTED YET===================
      
 * @params formGroups[*].chosenOption{Array}: ninamically add options when calling chosen 
 * 				e.g:  $(".chosen-select").chosen({width: "95%"});
 * 
 * @params formGroups[*].style{JSON} 
 * @params formGroups[*].rightAling{Boolean}
 * 
 *
 *        
 */

editMyForm.getForm = function(params) {
	
if(debug){
	console.log("***** GET FORM PARAMETERS  BEGIN  *****");
	console.warn(JSON.stringify(params, undefined, 0));
	console.log("***** GET FORM PARAMETERS  END  *****");
}
	
	
	$("html").append(minHtml);
	
	

	var htmlForm = $("#emf-form").html();
	var formTypeInt = editMyForm.getFormType(params.formType);

	htmlForm = vulcanoUtil.template(htmlForm, {
		formClass : formClass[formTypeInt],
		emfFormContent : editMyForm.getFormGroups(formTypeInt, params.formGroups, params.formContainerSelector)
	});

	$(params.formContainerSelector).html(htmlForm);

	$(params.formContainerSelector).trigger("editMyForm.formCreated");

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
 * @param formGroups[*].elementType {input | textarea | checkbox | radio | select} Input type
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
 * @param formGroups[*].checkboxParams[*].type{selected || disabled} Extra information about the select option.
 *        ============================ SELECT ONLY PARAMS======================
 * @param formGroups[*].multiple{Boolean} Indicates if multiple selection is permited.
 * @param formGroups[*].options{Array} Specify the different options in this select.
 * @param formGroups[*].options.value{String} Value that will be set when the option is
 *        selected, default text value
 * @param formGroups[*].options.text{String} Text that will be Displayed in the select option,
 *        it is also used as value if a value is not pressent.
 * @param formGroups[*].options.type{selected || disabled} Extra information about the select
 *        option.
 * @param formGroups[*].optgroups{Array} Specify the different optgroups in this select.
 * @param formGroups[*].optgroups.label{String} Specifies a label for an option-group.
 * @param formGroups[*].optgroups.options{Array} Specify the different options in this
 *        optgroup. firstOptgroup.label{String} Specifies a label for an option-group.
 *        firstOptgroup.disable{Boolean} firstOptgroup.options{selected || disabled} Extra
 *        information about the select option.
 * @param formGroups[*].optgroups.options.value{String} Value that will be set when the option
 *        is selected, default text value
 * @param formGroups[*].optgroups.options.text{String} Text that will be Displayed in the
 *        select option, it is also used as value if a value is not pressent.
 * @param formGroups[*].optgroups.options.type{selected || disabled} Extra information about
 *        the select option.
 */

editMyForm.getFormGroups = function(formTypeInt, formGroups, containerSelector) {

	var formGroupsHtml = '';

	$.each(formGroups, function(index, value) {
		formGroupsHtml += editMyForm.getFormGroup(formTypeInt, value, containerSelector);
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
 * @param formGroup.labelStyle{JSON} Object with all css attributed that will be setted as inline style in the label.  
 * 
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
 * @param formGroup.elementType {input | textarea | checkbox | radio | select} Input type to
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
 * @param formGroup.checkboxParams[*].type{selected || disabled} Extra information about the select option.
 * 
 * ============================  SELECT ONLY PARAMS======================
 * @param inputElementParams.multiple{Boolean} Indicates if multiple selection is permited.
 * @param inputElementParams.options{Array} Specify the different options in this select.
 * @param inputElementParams.options.value{String} Value that will be set when the option is
 *        selected, default text value
 * @param inputElementParams.options.text{String} Text that will be Displayed in the select option,
 *        it is also used as value if a value is not pressent.
 * @param inputElementParams.options.type{selected || disabled} Extra information about the select
 *        option.
 * @param inputElementParams.optgroups{Array} Specify the different optgroups in this select.
 * @param inputElementParams.optgroups.label{String} Specifies a label for an option-group.
 * @param inputElementParams.optgroups.options{Array} Specify the different options in this
 *        optgroup. firstOptgroup.label{String} Specifies a label for an option-group.
 *        firstOptgroup.disable{Boolean} firstOptgroup.options{selected || disabled} Extra
 *        information about the select option.
 * @param inputElementParams.optgroups.options.value{String} Value that will be set when the option
 *        is selected, default text value
 * @param inputElementParams.optgroups.options.text{String} Text that will be Displayed in the
 *        select option, it is also used as value if a value is not pressent.
 * @param inputElementParams.optgroups.options.type{selected || disabled} Extra information about
 *        the select option.
 */

editMyForm.getFormGroup = function(formTypeInt, formGroup, containerSelector) {

	var htmlFormGroup = $("#emf-formGroup").html();


	
	
	
	htmlFormGroup = vulcanoUtil.template(htmlFormGroup, {
		emfFormGroupLabel : editMyForm.getFormGroupLabel(formTypeInt, formGroup.inputId, formGroup.labelText,
				formGroup.labelColumns, formGroup.labelStyle, formGroup.elementType),
		emfFormGroupInput : editMyForm.getFormGroupInputElement(formTypeInt, formGroup, containerSelector),
		emfFormGroupWidth : editMyForm.getFormGroupWidth(formTypeInt, formGroup.rowColumns)
	});

	

	
	return htmlFormGroup;
};

/**
 * Filter form groups params to get only the data needed for intput element
 */
/*
editMyForm.mapInputParamsElement = function(formGroup) {

	var inputParams = {};

	inputParams.inputId = formGroup.inputId;
	inputParams.placeholder = formGroup.placeholder;
	inputParams.inputColumns = formGroup.inputColumns;
	inputParams.elementType = formGroup.elementType;

	inputParams.inputType = formGroup.inputType;

	inputParams.checkboxFormType = formGroup.checkboxFormType;
	inputParams.checkboxName = formGroup.checkboxName;
	inputParams.checkboxParams = formGroup.checkboxParams;

	inputParams.selectClass = formGroup.selectClass;
	inputParams.multiple = formGroup.multiple;
	inputParams.options = formGroup.options;
	inputParams.optgroups = formGroup.optgroups;

	inputParams.textareaRows = formGroup.textareaRows;

	return inputParams;

};

*/
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
	
	
	
	
	/* * @params formGroups[*].selectorClass{String}  class that will be added to the select and will 
	 * 			be used as a selector to call chosen.      
	 * @params formGroups[*].chosenOption{Array}: ninamically add options when calling chosen 
	 * 				e.g:  $(".chosen-select").chosen({width: "95%"});
	 * 
	 * @params formGroups[*].dataPlaceHolder{String}
	 * @params formGroups[*].style{JSON} 
	 * @params formGroups[*].rightAling{Boolean}
	 */ 
	
	
	

	return inputParams;

};

editMyForm.mapSelectParams = function(inputParamsElement) {



	var selectParams = {};

	selectParams.id = inputParamsElement.inputId;
	selectParams.placeholder = inputParamsElement.placeholder;

	selectParams.multiple = inputParamsElement.multiple;
	selectParams.options = inputParamsElement.options;
	selectParams.optgroups = inputParamsElement.optgroups;
	selectParams.id = inputParamsElement.inputId;
	//selectParams.id = inputParamsElement.inputId;

	selectParams.formTypeInt = inputParamsElement.formTypeInt;
	selectParams.inputColumns = inputParamsElement.inputColumns;
	selectParams.selectorClass = inputParamsElement.selectorClass;
	
	//selectParams.selectorClass = inputParamsElement.selectorClass; //use ID instead
	selectParams.chosenOption = inputParamsElement.chosenOption;
	selectParams.style = inputParamsElement.style;
	selectParams.rightAling = inputParamsElement.rightAling;

	
	
	
	
	return selectParams;

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
 * @param labelStyle{JSON} Object with all css attributed that will be setted as inline style in the label.         
 */
editMyForm.getFormGroupLabel = function(formType, inputId, labelText, labelColumns, labelStyle, elementType) {

	
	if(inputId == undefined || !inputId){
		return "";
	}
	
	
	

	
	
	var htmlFormGroupLabel = $("#emf-formLabel").html();

	

	
	htmlFormGroupLabel = vulcanoUtil.template(htmlFormGroupLabel, {
		emfFormLabelClass : editMyForm.getFormLabelClass(formType, labelColumns),
		emfFormLabelFor : inputId,
		emfFormLabelValue : labelText,
		emfFormLabelStyle : JSON.toCssStringNew(labelStyle)
		
	});
	
	
	
	if((elementType == 'radio' || elementType == 'checkbox') && formType == 0){
		htmlFormGroupLabel = htmlFormGroupLabel + '<br/>';
	}
	

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

	} else if(formType != editMyForm.FORM_TYPE_INLINE && formType != editMyForm.FORM_TYPE_HORIZONTAL){
		
		if (!rowColumns) {
			rowColumns = [ 12 ];
		}
		return editMyForm.getSizeCssClass(rowColumns);
		
	} else {
		return '';
	}
};

/**
 * @param formTypeInt{ 0 | 1 | 2}
 * @param inputElementParams.elementType {input | textarea | checkbox | radio | select} Input
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
 *        ============================ SELECT ONLY PARAMS======================
 * @param inputElementParams.multiple{Boolean} Indicates if multiple selection is permited.
 * @param inputElementParams.options{Array} Specify the different options in this select.
 * @param inputElementParams.options.value{String} Value that will be set when the option is
 *        selected, default text value
 * @param inputElementParams.options.text{String} Text that will be Displayed in the select option,
 *        it is also used as value if a value is not pressent.
 * @param inputElementParams.options.type{selected || disabled} Extra information about the select
 *        option.
 * @param inputElementParams.optgroups{Array} Specify the different optgroups in this select.
 * @param inputElementParams.optgroups.label{String} Specifies a label for an option-group.
 * @param inputElementParams.optgroups.options{Array} Specify the different options in this
 *        optgroup. firstOptgroup.label{String} Specifies a label for an option-group.
 *        firstOptgroup.disable{Boolean} firstOptgroup.options{selected || disabled} Extra
 *        information about the select option.
 * @param inputElementParams.optgroups.options.value{String} Value that will be set when the option
 *        is selected, default text value
 * @param inputElementParams.optgroups.options.text{String} Text that will be Displayed in the
 *        select option, it is also used as value if a value is not pressent.
 * @param inputElementParams.optgroups.options.type{selected || disabled} Extra information about
 *        the select option.
 */

editMyForm.getFormGroupInputElement = function(formTypeInt, inputElementParams, containerSelector) {





	var elementType = -1;
	
	var htmlFormGroup = null;
	
	switch (inputElementParams.elementType) {

		case "textarea":// done
			htmlFormGroup =  editMyForm.getFormGroupInputOrTextArea(formTypeInt, editMyForm.ELEMENT_TYPE_TEXTAREA, editMyForm
					.mapInputParams(inputElementParams));
			break;
		case "checkbox":// done
			elementType = editMyForm.ELEMENT_TYPE_CHECKBOX;
		case "radio": // done
			if (elementType == -1) {
				elementType = editMyForm.ELEMENT_TYPE_RADIOBUTTON;
			}

			htmlFormGroup = editMyForm.getFormGroupCheckboxOrRadio(elementType, inputElementParams.checkboxFormType,
					inputElementParams.checkboxName, inputElementParams.checkboxParams);
			break;

		case "select":

		
			htmlFormGroup = editMyForm.getFormGroupSelect(formTypeInt, editMyForm.mapSelectParams(inputElementParams), containerSelector);
			break;
		case "input":// done
		default:
			htmlFormGroup =  editMyForm.getFormGroupInputOrTextArea(formTypeInt, editMyForm.ELEMENT_TYPE_INPUT, editMyForm
					.mapInputParams(inputElementParams));
			break;

	}
	
	if(debug){
		console.log("******* STARTING HTML FROM GROUP *******");
		console.log(htmlFormGroup);
		console.log("******* ENDING HTML FROM GROUP *******");
	}
	
	return htmlFormGroup;

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
editMyForm.getFormGroupInputOrTextArea = function(formTypeInt, formElementType, inputElementParams) {

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
 * @param checkboxParams[*].type{selected || disabled} Extra information about the select option.
 */

editMyForm.getFormGroupCheckboxOrRadio = function(elementType, checkboxFormType, checkboxName, checkboxParams) {

	var formGroupCheckboxHtml = "";

	var checkboxFormTypeInt = editMyForm.getCheckboxFormType(checkboxFormType);

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
 * @param checkboxParams.type{selected || disabled} Extra information about the select option.
 * 
 * 
 */
editMyForm.getFormSingleCheckboxOrRadio = function(elementType, checkboxFormTypeInt, checkboxName, checkboxParams) {

	var htmlFormGroupCheckbox = $("#emf-formCheckbox").html();

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
	
	


	
	if(!vulcanoUtil.undefinedOrFalse(checkboxParams.type)){
		
		if(checkboxParams.type == "disabled"){
			
		
			htmlFormGroupCheckbox = vulcanoUtil.template(htmlFormGroupCheckbox, {
				disabled : "disabled"				
			});

		}else if (checkboxParams.type == "selected"){
			htmlFormGroupCheckbox = vulcanoUtil.template(htmlFormGroupCheckbox, {
				disabled : "checked"				
			});
			
		}else{
			
			htmlFormGroupCheckbox = vulcanoUtil.template(htmlFormGroupCheckbox, {
				disabled : ""				
			});
		}
	}else{
		htmlFormGroupCheckbox = vulcanoUtil.template(htmlFormGroupCheckbox, {
			disabled : ""				
		});
	};
	
	

	return htmlFormGroupCheckbox;

};

/**
 * @param formTypeInt
 * @param selectParams.id{String} Id of the select.
 * @param selectParams.placeholder{String} Placeholder of the select //*
 * @param selectParams.selectClass
 * @param selectParams.inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param selectParams.multiple{Boolean} Indicates if multiple selection is permited.
 * @param options{Array} Specify the different options in this select.
 * @param options.value{String} Value that will be set when the option is selected, default text
 *        value
 * @param options.text{String} Text that will be Displayed in the select option, it is also used as
 *        value if a value is not pressent.
 * @param options.type{selected || disabled} Extra information about the select option.
 * @param optgroups{Array} Specify the different optgroups in this select.
 * @param optgroups.label{String} Specifies a label for an option-group.
 * @param optgroups.options{Array} Specify the different options in this optgroup.
 *        firstOptgroup.label{String} Specifies a label for an option-group.
 *        firstOptgroup.disable{Boolean} firstOptgroup.options{selected || disabled} Extra
 *        information about the select option.
 * @param optgroups.options.value{String} Value that will be set when the option is selected,
 *        default text value
 * @param optgroups.options.text{String} Text that will be Displayed in the select option, it is
 *        also used as value if a value is not pressent.
 * @param optgroups.options.type{selected || disabled} Extra information about the select option.
 */

editMyForm.getFormGroupSelect = function(formTypeInt, selectParams, containerSelector) {



	var htmlTemplateSelect = $("#emf-formSelect").html();
	
	
	if(vulcanoUtil.undefinedOrFalse(selectParams.placeholder)){
		selectParams.placeholder = "";
	}
	

	htmlTemplateSelect = vulcanoUtil.template(htmlTemplateSelect, {
		emfFormSelectId : selectParams.id,
		emfSelectPlaceholder : selectParams.placeholder,
		// emfSelectClass : selectParams.selectClass,
		emfSelectOptions : editMyForm.getFormGroupSelectOptions(selectParams.options, selectParams.optgroups),
		emfFormSelectBefore : editMyForm.getFormGroupInputDivBefore(formTypeInt, selectParams.inputColumns),
		emfFormSelectAfter : closeDiv_2_3[formTypeInt]
	});

	
	
	
	if(vulcanoUtil.undefinedOrFalse(selectParams.style)){
		selectParams.style = {"width": "100%"};
	}else{
		if(vulcanoUtil.undefinedOrFalse(selectParams.style.width)){
			selectParams.style.width = "100%";
		}
	}
	
	
	
	
	
	
	
	

	$(containerSelector).on("editMyForm.formCreated", function() {
		
		var selectElement = $(containerSelector + " #"+selectParams.id);
		
		selectElement.attr("style", JSON.toCssStringNew(selectParams.style));
		
		
		
		if(!!selectParams.rightAling){
			
			selectElement.addClass("chosen-rtl");
			
			
			
			
		}
	
		if (!!selectParams.multiple) {
			console.log($(htmlTemplateSelect));
			$("#" + selectParams.id).attr("multiple", 'true');
		}
		
		console.log(JSON.stringify(selectParams.chosenOptions, "---", 2));
		
		if(!selectParams.chosenOption){		
			selectParams.chosenOptions = {};
		}
		
		console.log(JSON.stringify(selectParams.chosenOptions, "---", 2));
		
		$("#"+selectParams.id).chosen(selectParams.chosenOptions);

	});

	return htmlTemplateSelect;

};

/**
 * @param options{Array} Specify the different options in this select.
 * @param options.value{String} Value that will be set when the option is selected, default text
 *        value
 * @param options.text{String} Text that will be Displayed in the select option, it is also used as
 *        value if a value is not pressent.
 * @param options.type{selected || disabled} Extra information about the select option.
 * @param optgroups{Array} Specify the different optgroups in this select.
 * @param optgroups.label{String} Specifies a label for an option-group.
 * @param optgroups.options{Array} Specify the different options in this optgroup.
 *        firstOptgroup.label{String} Specifies a label for an option-group.
 *        firstOptgroup.disable{Boolean} firstOptgroup.options{selected || disabled} Extra
 *        information about the select option.
 * @param optgroups.options.value{String} Value that will be set when the option is selected,
 *        default text value
 * @param optgroups.options.text{String} Text that will be Displayed in the select option, it is
 *        also used as value if a value is not pressent.
 * @param optgroups.options.type{selected || disabled} Extra information about the select option.
 */

editMyForm.getFormGroupSelectOptions = function(options, optgroups) {

	var optionsHtml = '';

	if (!!optgroups) {
		if (!!options) {

	
			var firstOptgroup = {};
			firstOptgroup.label = '';
			// firstOptgroup.disable = false;
			firstOptgroup.options = options;
			optgroups.unshift(firstOptgroup);
		} else {
			//NO OPTIONS BUT  OPTGROUPS= _YES

		}


		$.each(optgroups, function(index, value) {
			optionsHtml += editMyForm.getOptGroup(value.label, value.options); // changed
		});

	} else {
		$.each(options, function(index, value) {
			optionsHtml += editMyForm.getSimpleOption(value.value, value.text, value.type);
		});
	}


	return optionsHtml;

};

/**
 * @param value{String} Value that will be set when the option is selected, default text value.
 * @param text{String} Text that will be display in the select option, it is also used as value if a
 *        value is not pressent.
 * @param type{selected || disabled} Extra information about the select option.
 * @returns {String}
 */

editMyForm.getSimpleOption = function(value, text, type) {

	if (!value) {
		value = text;
	}

	if (type != 'selected' && type != 'disabled') {
		type = '';
	}

	return '<option ' + type + ' value = ' + value + '>' + text + '</option>';

};

/**
 * @param label{String} Specifies a label for an option-group.
 * @param disable{Boolean}
 * @param options{Array} Specify the different options in this optgroup.
 * @param options.value{String} Value that will be set when the option is selected, default text
 *        value
 * @param text{String} Text that will be sisplay in the select option, it is also used as value if a
 *        value is not pressent;
 * @param options.text{String} Text that will be sisplay in the select option, it is also used as
 *        value if a value is not pressent.
 * @param options.type{selected || disabled} Extra information about the select option.
 */

editMyForm.getOptGroup = function(label, options) {

	var htmlOptGroup = '<optgroup label="NFC EAST">';

	$.each(options, function(index, value) {


		htmlOptGroup += editMyForm.getSimpleOption(value.value, value.text, value.type);
	});

	htmlOptGroup += '</optgroup>';

	return htmlOptGroup;

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
				columns = [ 4 ];
			}
			return editMyForm.getHorizontalLabelClass(columns) + ' control-label';
			break;
		case editMyForm.FORM_TYPE_INLINE:
			return 'sr-only';
			break;
	}

};

/**
 * ################### HELPER FUNCTIONS ###############
 */

/**
 * @param checkboxFormType{stacked | inline }
 */
editMyForm.getCheckboxFormType = function(checkboxFormType) {

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

};

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
 * @param field.inputType{input | textarea | checkbox | radio | select} Type of input.
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
 * @param elementType {input | textarea | checkbox | radio | select} Input type to be
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
	inlineContent += "</div>";

}

/**
 * @param id{String} Input Id.
 * @param title{String} Title of the row.
 */

function generateInlineLabelHTML(params) {

	return '<label class="sr-only" for="' + params.id + '">' + params.title + '</label>';

}

/**
 * @params id{String}
 * @param elementType {input | textarea | checkbox | radio | select} Input type to be
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
			return getCheckBox(checkboxType, checkBoxesParams);
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
	});

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
			return getInlineCheckBoxes(checkBoxesParams);
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
	checkboxHTML += '		<input %disabled% type="checkbox" id="' + params.id + '" value="' + params.value + '">';
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
		columnSize = getSizeCssClass(params.checkboxColumnSize);
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

//style="%emfFormLabelStyle%" 


// ABORT MISSION, we will change everything, now we will use: vulcanoUtil.template
// (vulcano-not-yet-utils)