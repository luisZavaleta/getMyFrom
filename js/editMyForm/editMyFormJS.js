
/**
 * @fileName editMyFormJS.js This page is used to create a form inside a modal, and on close we put
 *           all the modal values in the a html page. The form is based inbootstrpa, so the grid
 *           system is the same with 12 colums.
 * @author LuisZavaleta
 */


var debug = true;
//var minHtml = '<div style="display: none"><div id="emf-form"><form role="form" class="%formClass%">%emfFormContent%</form></div><div id="emf-formGroup"><div class="form-group %emfFormGroupWidth%">%emfFormGroupLabel% %emfFormGroupInput%</div></div><div id="emf-formLabel"><label style="%emfFormLabelStyle%"  class="%emfFormLabelClass%" for="%emfFormLabelFor%"> %emfFormLabelValue% </label></div><div id="emf-formInput">%emfFormInputBefore%<input type="%emfFormInputType%" style="" class="form-control" id="%emfFormInputId%"placeholder="%emfFormInputPlaceHolder%" />%emfFormInputAfter%</div><div id="emf-formTextarea">%emfFormInputBefore%<textarea type="%emfFormInputType%" style="" rows="%emfFormTextareaRows%" class="form-control" id="%emfFormInputId%"placeholder="%emfFormInputPlaceHolder%"></textarea>%emfFormInputAfter%</div><div id="emf-formCheckbox">%emfFormCheckboxBefore%<label class="%emfFormCheckboxLabelClass%"><input %disabled% id="%emfFormCheckboxId%" name="%emfFormCheckboxName%" type="%checkOrRadioType%"value="%emfFormCheckboxValue%">%emfFormCheckboxText%</label>%emfFormCheckboxAfter%</div><!-- SELECT --><div id="emf-formSelect">%emfFormSelectBefore%<select id="%emfFormSelectId%" data-placeholder="%emfSelectPlaceholder%" >%emfSelectOptions%</select>%emfFormSelectAfter%</div><!-- STACKED --><div class="checkbox"><label><input id="wereva" name="mustbethesame" type="checkbox" value="">rojo</label></div><!-- INLINE --><label class="checkbox-inline"><input id="inlineCheckbox1" name="mustbethesame" type="checkbox" value="option1">1wwww</label></div>';




var minHtml = '<div style="display: none"><div id="emf-form"><form role="form" class="%formClass%">%emfFormContent%</form></div><div id="emf-formGroup"><div class="form-group %emfFormGroupWidth%">%emfFormGroupLabel% %emfFormGroupInput%</div></div><div id="emf-formLabel"><label style="" class="%emfFormLabelClass%" for="%emfFormLabelFor%"> %emfFormLabelValue% </label></div><div id="emf-formInput">%emfFormInputBefore%<input type="%emfFormInputType%" style="" class="form-control" id="%emfFormInputId%" placeholder="%emfFormInputPlaceHolder%" />%emfFormInputAfter%</div><div id="emf-formTextarea">%emfFormInputBefore%<textarea type="%emfFormInputType%" style="" rows="%emfFormTextareaRows%" class="form-control" id="%emfFormInputId%"placeholder="%emfFormInputPlaceHolder%"></textarea>%emfFormInputAfter%</div><div id="emf-formCheckbox">%emfFormCheckboxBefore%<label class="%emfFormCheckboxLabelClass%"><input %disabled% id="%emfFormCheckboxId%" name="%emfFormCheckboxName%" type="%checkOrRadioType%" value="%emfFormCheckboxValue%">%emfFormCheckboxText%</label>%emfFormCheckboxAfter%</div><!-- SELECT --><div id="emf-formSelect">%emfFormSelectBefore%<select id="%emfFormSelectId%" data-placeholder="%emfSelectPlaceholder%">%emfSelectOptions%</select>%emfFormSelectAfter%</div><!-- STACKED --><div class="checkbox"><label><input id="wereva" name="mustbethesame" type="checkbox" value="">rojo</label></div><!-- INLINE --><label class="checkbox-inline"><input id="inlineCheckbox1" name="mustbethesame" type="checkbox" value="option1">1wwww</label><!-- IMAGE --><div id="emf-formImage">%emfFormImageBefore%<div class="fileinput fileinput-new form-control" id="%emfImageId%" data-provides="fileinput" ><div class="fileinput-new thumbnail"><img src="%emfImagePath%" alt="..." /></div><div class="fileinput-preview fileinput-exists thumbnail" ></div><div><span class="btn btn-default btn-file"><span class="fileinput-new">%emfImageSelectText%</span><span class="fileinput-exists">%emfImageChangeText%</span><input type="file" name="..." /></span><a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">%emfImageDeleteText%</a></div></div>%emfFormImageAfter%</div></div>';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';
//var minHtml = '';










var editMyForm = {};

/**
 * VARIABLES
 */

editMyForm.FORM_TYPE_DEFAULT = 		0;
editMyForm.FORM_TYPE_HORIZONTAL = 	1;
editMyForm.FORM_TYPE_INLINE = 		2;

editMyForm.ELEMENT_TYPE_INPUT = 		0;
editMyForm.ELEMENT_TYPE_TEXTAREA = 		1;
editMyForm.ELEMENT_TYPE_CHECKBOX = 		2;
editMyForm.ELEMENT_TYPE_RADIOBUTTON = 	3;
editMyForm.ELEMENT_TYPE_SELECT = 		4;
editMyForm.ELEMENT_TYPE_IMAGE = 		5;

editMyForm.ELEMENT_CHECKBOX_STACKED = 	0;
editMyForm.ELEMENT_CHECKBOX_INLINE = 	1;

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

var closeDiv_1_3 = [ '</div>', '', '' ]; // closDivInStackedCheckBox
var closeDiv_2_3 = [ '', '</div>', '' ]; // closeDivInHorizontal
var closeDiv_3_3 = [ '', '', '</div>' ];

var checkOrRadioType = [];

checkOrRadioType[editMyForm.ELEMENT_TYPE_CHECKBOX] = 'checkbox';
checkOrRadioType[editMyForm.ELEMENT_TYPE_RADIOBUTTON] = 'radio';


var emfFormImageDivBefore = ["","",""];
var emfFormImageDivAfter = ["","",""];




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
 * Filter iput element params to get only the data needed for intput.
 */
editMyForm.mapInputParams = function(inputParamsElement) {

	var inputParams = {};

	inputParams.inputId = inputParamsElement.inputId;
	inputParams.placeholder = inputParamsElement.placeholder;
	inputParams.inputColumns = inputParamsElement.inputColumns;
	inputParams.inputType = inputParamsElement.inputType;
	inputParams.textareaRows = inputParamsElement.textareaRows;

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

	selectParams.formTypeInt = inputParamsElement.formTypeInt;
	selectParams.inputColumns = inputParamsElement.inputColumns;
	selectParams.selectorClass = inputParamsElement.selectorClass;
	
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

	if(debug){
		console.log("PRE PRE");
		console.log(inputElementParams);
	}

	var elementType = -1;
	var htmlFormGroup = null;
	
	switch (inputElementParams.elementType) {

		case "textarea":
			htmlFormGroup =  editMyForm.getFormGroupInputOrTextArea(formTypeInt, editMyForm.ELEMENT_TYPE_TEXTAREA,inputElementParams);
			break;
		case "checkbox":
			elementType = editMyForm.ELEMENT_TYPE_CHECKBOX;
		case "radio": 
			if (elementType == -1) {
				elementType = editMyForm.ELEMENT_TYPE_RADIOBUTTON;
			}

			htmlFormGroup = editMyForm.getFormGroupCheckboxOrRadio(elementType, inputElementParams.checkboxFormType,
					inputElementParams.checkboxName, inputElementParams.checkboxParams);
			break;

		case "select":	
			htmlFormGroup = editMyForm.getFormGroupSelect(formTypeInt, inputElementParams, containerSelector);
			break;
			
		case "image":
				htmlFormGroup = editMyForm.getFormGroupImage(formTypeInt, inputElementParams, containerSelector);
			break;	
			
		case "input":
		default:
			htmlFormGroup =  editMyForm.getFormGroupInputOrTextArea(formTypeInt, editMyForm.ELEMENT_TYPE_INPUT, inputElementParams);
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
		formGroupCheckboxHtml += editMyForm.getFormSingleCheckboxOrRadio(elementType, checkboxFormTypeInt, checkboxName, value); 
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
	if(debug){
		console.log("CHOSEN ONE PRE");
		console.log(selectParams);
	}
	
	var htmlTemplateSelect = $("#emf-formSelect").html();
	
	if(vulcanoUtil.undefinedOrFalse(selectParams.placeholder)){
		selectParams.placeholder = "";
	}
	
	htmlTemplateSelect = vulcanoUtil.template(htmlTemplateSelect, {
		emfFormSelectId : selectParams.inputId,
		emfSelectPlaceholder : selectParams.placeholder,
		emfSelectOptions : editMyForm.getFormGroupSelectOptions(selectParams.options, selectParams.optgroups),
		emfFormSelectBefore : editMyForm.getFormGroupInputDivBefore(formTypeInt, selectParams.inputColumns),
		emfFormSelectAfter : closeDiv_2_3[formTypeInt]
	});
	

	$(containerSelector).on("editMyForm.formCreated", function() {
		
		var selectElement = $(containerSelector + " #"+selectParams.inputId);
		
		selectElement.attr("style", "width:100%");		
		if(!!selectParams.rightAling){
			selectElement.addClass("chosen-rtl");
		}
		
		if (!!selectParams.multiple) {		
			if(debug){	
				console.log($(htmlTemplateSelect));
			}
			$("#" + selectParams.inputId).attr("multiple", 'true');
		}
		
		if(debug){		
			console.log("CHOSEN ONE");
			console.log(selectParams);
			console.log(JSON.stringify(selectParams.chosenOptions, "---", 2));		
		}
		
		if(!!selectParams.chosenOption){		
			selectParams.chosenOptions = {};
		}
		
		if(debug){		
			console.log(JSON.stringify(selectParams.chosenOptions, "---", 2));
			console.log("Chossen option begin");		
			console.log(JSON.stringify(selectParams.style));			
			console.log("Chossen option end");
		}
		
		$("#"+selectParams.inputId).chosen(selectParams.chosenOptions);

		if(!!selectParams.style){					
			var actualStyle = $("#" + selectParams.inputId + "_chosen").attr("style"); + ";";			
			$("#" + selectParams.inputId + "_chosen").attr("style",  actualStyle + JSON.toCssStringNew(selectParams.style));
			selectParams.chosenOptions = {};
		}	
	});
	return htmlTemplateSelect;
};






/**
 * @param formTypeInt
 * @param selectParams.id{String} Id of the select.
 * @param selectParams.inputColumns{Array} Array with the width in columns of the element, the
 *        number of elements in the array defines the use of them as follow <br>
 *        <code>
 *        		{1 : 	[0: xm, sm, md, lg]},
 *        		{2: 	[0:	xm, sm]			[1: md, lg]},  
 *        		{3: 	[0: xm, sm]			[1: md]			[2: lg]},
 *        		{4: 	[0:	xm]				[1: sm]			[2: md]			[3: lg]}
 *        </code>
 * @param css:  JSON Object with scc properties to be aplied to the images. ==DEPRECATED: Will be set again in next version==
 * @param image: Path of default image.
 * @param selectText:
 * @param changeText
 * @param deleteText:
 */


editMyForm.getFormGroupImage = function(formTypeInt, imageParams) {
	
	
	/*
	var imageParams = {};
	imageParams.css = {
		"width" : '100px',
		"height" : '100px'
	};	
	imageParams.image = "http://img-9gag-lol.9cache.com/photo/anXQwq5_460s.jpg";
	
	
*/
	
	
	var htmlTemplateImage = $("#emf-formImage").html();
	
	
	console.log("htmlTemplateImage ====>"+htmlTemplateImage);
	
	//$(".fileinput.fileinput-new.form-control img").attr("style", JSON.toCssString(imageParams.css));	
	
	
	
	if(!imageParams.selectText){
		imageParams.selectText = "Seleccionar...";
	}
	if(!imageParams.changeText){
		imageParams.changeText = "Cambiar...";
	}
	if(!imageParams.deleteText){
		imageParams.deleteText = "Eliminar..";
	}
	
	
	
	htmlTemplateImage = vulcanoUtil.template(htmlTemplateImage, {
		
		
		emfImageId : imageParams.id,
		emfImagePath : imageParams.image,		
		emfFormImageBefore: editMyForm.getFormGroupInputDivBefore(formTypeInt, imageParams.inputColumns),
		emfFormImageAfter: emfFormImageDivAfter[formTypeInt],
		
		emfImageSelectText : imageParams.selectText,		
		emfImageChangeText : imageParams.changeText,
		emfImageDeleteText : imageParams.deleteText
	});
	
	
	
	


	
		return 	htmlTemplateImage;//editMyForm.generateHtmlImageEditor(imageParams, formTypeInt); 
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
			firstOptgroup.options = options;
			optgroups.unshift(firstOptgroup);
		} //else  do nothing: NO OPTIONS BUT  OPTGROUPS= _YES

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
	
	var htmlOptGroup = '<optgroup label="'+label+'">';

	$.each(options, function(index, value) {
		
		if(value.value != null){
			htmlOptGroup += editMyForm.getSimpleOption(value.value, value.text, value.type);
		}
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



							/****************************
							 **** IMAGE FUNCTIONS    ****
							 ****************************/



/*

	<div class="fileinput-new thumbnail" style="display:block">		
		<img style="width:100px;height:100px;" src="http://img-9gag-lol.9cache.com/photo/anXQwq5_460s.jpg" alt="...">	
	</div>
	
	
	<div class="fileinput-new thumbnail" style="display:block">		
	<img style="width:100px;height:100px;" src="http://img-9gag-lol.9cache.com/photo/anXQwq5_460s.jpg" alt="...">	
	</div>

*/
