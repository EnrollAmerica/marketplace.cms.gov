//Add a the phoneUS function to our jQuery Validation Plugin
jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");


$(document).ready(function() {
    //Form Validation using jQuery Validation Plugin
    $(".socrataForm").validate({
        rules: {
            //Each "rule" corresponds to an input tag "name" field in the form.
            organization_name: "required",
            organization_type: "required",
            market_name: "required",
            market_mailing_address: "required",
            market_phone_number: {
                required: true,
                phoneUS: true
            },
            market_email_address: {
                required: true,
                email: true
            },
            public_phone_number: {
                required: true,
                phoneUS: true
            },
            public_email_address: {
                required: true,
                email: true
            },
            public_website: {
                required: true,
                url: true
            },
            public_address_1: "required",
            public_hours_1: "required",
            //The following address and hour fields are hidden by default.
            //The plugin automatically converts the requirement to false if the field is hidden.
            public_address_2: "required",
            public_hours_2: "required",
            public_address_3: "required",
            public_hours_3: "required",
            public_address_4: "required",
            public_hours_4: "required",
            public_address_5: "required",
            public_hours_5: "required",
            org_gov_entity: "required",
            org_health_care_delivery: "required",
            org_medicaid_chp_app_assist: "required",
            org_under_501c: "required",
            priv_sec_screen_application_counselors: "required",
            priv_sec_handle_protect_pii: "required",
            priv_sec_assist_health_coverage: "required",
            //The following assist fields follow the same rule as the previous address and hour fields.
            assist_if_yes: "required",
            assist_if_no: "required"
                //Require the reCAPTCHA field

        },

        messages: {
            organization_name: {
                required: "<br/>Organization name is required"
            },
            organization_type: {
                required: "<br/>Organization type is required"
            },
            market_phone_number: {
                required: "<br/>Phone number is required"
            },
            market_email_address: {
                required: "<br/>Email address is required"
            },
            public_phone_number: {
                required: "<br/>Phone number is required"
            },
            public_email_address: {
                required: "<br/>Email address is required"
            },
            public_website: {
                required: "<br/>Web site address is required"
            }


        }

    });

    //Fields assist_if_yes and assist_if_no are part of a show/hide and required/!required toggle.
    //The toggle operates on the user's answer to priv_sec_assist_health_coverage.
    //Hide the assist_if_no since assist_if_yes is the default.
    $('.ifno').hide();
    $('.ifyes').hide();
    //Select and set up for change.
    $('#form_field_priv_sec_assist_health_coverage').change(function() {
        //If the answer is yes...
        if ($('#form_field_priv_sec_assist_health_coverage').find('option:selected').text() === 'Yes') {
            $(".ifno").hide();
            $(".ifyes").show();
            $("assist_if_no").rules("remove", "required");
            $("assist_if_yes").rules("add", "required");
        } else if ($('#form_field_priv_sec_assist_health_coverage').find('option:selected').text() === 'Select One') {

            $(".ifno").hide();
            $(".ifyes").hide();
            $("assist_if_yes").rules("add", "required");

        }


        //If the answer is no...
        else {
            $(".ifyes").hide()
            $(".ifno").show()
            $("assist_if_yes").rules("remove", "required");
            $("assist_if_no").rules("add", "required");
        }

    });

    /* Create an array of the 5 location divs.  Each div contains a corresponding address and hour input field, so create arrays of those as well. */
    var locations = ['#location1', '#location2', '#location3', '#location4', '#location5'];
    var addressFields = ['public_address_2', 'public_address_3', 'public_address_4', 'public_address_5'];
    var hourFields = ['public_hours_2', 'public_hours_3', 'public_hours_4', 'public_hours_5'];
    //Initialize by hiding all divs in the array except the first.
    for (var i = 1; i < locations.length; i++) {
        $(locations[i]).hide();
    }
    //Initialize an int counter for the last div shown.
    var divnum = 0;
    //Initialize the "add" and "remove" actions...
    $('#location1').after("<div id='addDiv'><a title='Add another location' href='#' id='add'>Add another location</a></div>");
    $('#location2').before("<div id='removeDiv'><a title='Remove this location' href='#' id='remove'>Remove this location</a></div>");
    //Hide the removeDiv before we begin
    $('#removeDiv').hide();
    //Finally, implement functionality for the "add" and "remove" actions.
    $('#add').click(function(e) {
        if (divnum < 4) {
            divnum += 1;
            //$(locations[divnum]).show();
            $(locations[divnum]).show('slow', function() {
                // Animation complete
            });
            $('#addDiv').insertAfter(locations[divnum]);
            $('#removeDiv').show()
                .insertBefore(locations[divnum]);
        }
        if (divnum == 4) {
            $('#addDiv').hide();
        }
        e.preventDefault();
    });
    $('#remove').click(function(e) {
        if (divnum > 0) {
            //$(locations[divnum]).hide();
            $(locations[divnum]).hide('slow', function() {
                // Animation complete
            });
            divnum -= 1;
            $('#removeDiv').insertBefore(locations[divnum]);
            $('#addDiv').show()
                .insertAfter(locations[divnum]);
        }
        if (divnum == 0) {
            $('#removeDiv').hide();
        }
        e.preventDefault();
    });



    $('#form_field_assist_if_yes').maxlength({
        showFeedback: 'active',
        max: 250
    });
    $('#form_field_assist_if_no').maxlength({
        showFeedback: 'active',
        max: 250
    });





});


$("#cacsubmit").click(function() {

    if (!$(".socrataForm").validate()) { // Not Valid
        return false;
    } else {
        $(".socrataForm").submit()
    }

});



jQuery.validator.addMethod("zipcodeUS", function(value, element) {
    return this.optional(element) || /\d{5}-\d{4}$|^\d{5}$/.test(value);
}, "Please enter a valid zip code");

$(document).ready(function() {
    //Form Validation using jQuery Validation Plugin
    $(".socrataForm-champion").validate({
        rules: {
            //Each "rule" corresponds to an input tag in the form.
            organization_name: "required",
            point_of_contact: "required",
            email: {
                required: true,
                email: true
            },
            city: "required",
            state: "required",
            zip: {
                required: true,
                zipcodeUS: true
            }

        },

        messages: {
            organization_name: {
                required: "<br/>Organization name is required"
            },
            point_of_contact: {
                required: "<br/> Point of contact is required"
            },
            city: {
                required: "<br/> City name is required"
            },
            email: {
                required: "<br/> Email address is required"
            },
            state: {
                required: "<br/><br/> Please select the state"
            },
            zip: {
                required: "<br/> Zip code is required"
            }

        }
    });


    $("#pledgesubmit").click(function() {

        if (!$(".socrataForm-champion").validate()) { // Not Valid
            return false;
        } else {
            $(".socrataForm-champion").submit();
        }

    });



});

// polyfill for Array.isArray()
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

// force to HTTPS
if ($('#cac-registration-form').length > 0 && window.location.protocol != "https:") {
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

// the following line suports CORS requests in IE 8 and 9
/*!
* jQuery-ajaxTransport-XDomainRequest - v1.0.3 - 2014-06-06
* https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
* Copyright (c) 2014 Jason Moon (@JSONMOON)
* Licensed MIT (/blob/master/LICENSE.txt)
*/
(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(jQuery)}}(function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return}var n=/^https?:\/\//i;var o=/^get|post$/i;var p=new RegExp('^'+location.protocol,'i');$.ajaxTransport('* text html xml json',function(j,k,l){if(!j.crossDomain||!j.async||!o.test(j.type)||!n.test(j.url)||!p.test(j.url)){return}var m=null;return{send:function(f,g){var h='';var i=(k.dataType||'').toLowerCase();m=new XDomainRequest();if(/^\d+$/.test(k.timeout)){m.timeout=k.timeout}m.ontimeout=function(){g(500,'timeout')};m.onload=function(){var a='Content-Length: '+m.responseText.length+'\r\nContent-Type: '+m.contentType;var b={code:200,message:'success'};var c={text:m.responseText};try{if(i==='html'||/text\/html/i.test(m.contentType)){c.html=m.responseText}else if(i==='json'||(i!=='text'&&/\/json/i.test(m.contentType))){try{c.json=$.parseJSON(m.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(i==='xml'||(i!=='text'&&/\/xml/i.test(m.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(m.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+m.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};m.onprogress=function(){};m.onerror=function(){g(500,'error',{text:m.responseText})};if(k.data){h=($.type(k.data)==='string')?k.data:$.param(k.data)}m.open(j.type,j.url);m.send(h)},abort:function(){if(m){m.abort()}}}})}));

// data model for all registration form functionality 
var cacRegistration = { 
    formId: 'cac-registration-form',
    datasets: {} 
};

// set all Socrata destinations 
cacRegistration.datasets['registration'] = 'https://data.healthcare.gov/views/pun6-u22w/rows.html?method=createForm&successRedirect=https%3A%2F%2Fdata.healthcare.gov%2Fresource%2Fcac-form-submission-result.json%3F%2524where%3Dresult_status%253D%2527success%2527&errorRedirect=https%3A%2F%2Fdata.healthcare.gov%2Fresource%2Fcac-form-submission-result.json%3F%2524where%3Dresult_status%253D%2527failure%2527';
cacRegistration.datasets['location'] = 'https://data.healthcare.gov/views/e8mn-2jyk/rows.html?method=createForm&successRedirect=https%3A%2F%2Fdata.healthcare.gov%2Fresource%2Fcac-form-submission-result.json%3F%2524where%3Dresult_status%253D%2527success%2527&errorRedirect=https%3A%2F%2Fdata.healthcare.gov%2Fresource%2Fcac-form-submission-result.json%3F%2524where%3Dresult_status%253D%2527failure%2527';

cacRegistration.pingUrl = 'https://data.healthcare.gov/resource/cac-form-submission-result.json';
cacRegistration.systemUp = false;

cacRegistration.browsers = {};
cacRegistration.browsers.isSafari = function () {
    return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
};

cacRegistration.ajaxStatus = {};
cacRegistration.messages = [];

// add onload handler, since jQuery is not available yet
cacRegistration.addOnLoad = function (handler) {
    if (typeof window.onload !== 'function') {
        // add new onload function
        window.onload = handler;
    } else {
        // onload already exists; execute new onload function after existing
        var onload = window.onload;
        window.onload = function () {
            onload();
            handler();
        }
    }
};

// get the registration form element
cacRegistration.getForm = function () {
    var formId = this.formId;
    if (formId) {
        return $('#' + formId);
    }
};

// get an array of all datasets used in the form 
// each dataset will appear at most once 
cacRegistration.getDistinctDatasets = function (form) {
    var datasets = [];

    if (form) {
        var datasetElements = $(form).find('[data-dataset]');

        for (var i = 0; i < datasetElements.length; i++) {
            var datasetElement = datasetElements[i];
            var datasetId = $(datasetElement).attr('data-dataset');

            if (datasetId && $.inArray(datasetId, datasets) < 0) {
                datasets.push(datasetId);
            }
        }
    }

    return datasets;
};

$(document).ajaxSend(function (event, jqXHR, ajaxOptions) {
    var id = cacRegistration.generateUUIDv4();
    // record the status before going out 
    cacRegistration.ajaxStatus[id] = jqXHR.readyState;
    jqXHR.xRequestId = id;
});

// handle the sumission of form data to a parituclar dataset
cacRegistration.submitForm = function (destination, data, callback) {
    if (destination && data) {
        $.ajax({
            type: 'post',
            url: destination,
            data: data,
            contentType: 'text/plain',
            success: function (data) {
                if (callback) {
                    var err = undefined;

                    if (data) {
                        if (Array.isArray(data)) {
                            data = data.pop();
                        }
                        if (!data.hasOwnProperty('outcome') || data.outcome !== true) {
                            err = new Error('problem submitting the form');
                        }
                    } else {
                        err = new Error('missing submission result');
                    }

                    callback(err);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (callback) {
                    var isCORSRequest = function () {
                        var id = jqXHR.xRequestId;
                        var recordedStatus = cacRegistration.ajaxStatus[id];

                        if (recordedStatus === null || recordedStatus === undefined) {
                            recordedStatus = jqXHR.readyState - 1;
                        }

                        return cacRegistration.systemUp === true && 
                            cacRegistration.browsers.isSafari() &&
                            jqXHR.status === 0 && 
                            // if the readyState is less than recordedStatus,
                            // then the browser manually changed the state;
                            // this indicates a possible CORS failure
                            recordedStatus > jqXHR.readyState &&
                            jqXHR.readyState === 0;
                    };
                    if (isCORSRequest()) {
                        callback();
                    } else {
                        var errMessage = 'error: ' + textStatus + ' - ' +
                            errorThrown;
                        callback(new Error(errMessage));
                    }
                }
            }
        });
    }
};

// submit the main body of the form (anything not in a repeatable)
cacRegistration.processMainSubmission = function (form, callback) {
    if (!form) {
        return;
    }

    // get all possible datasets for the form 
    var datasets = cacRegistration.getDistinctDatasets(form);

    $.each(datasets, function (index, value) {
        // get all elements that get submitted to this data set that are not 
        // part of repeating element; repeating elements will be submitted 
        // individually 
        var datasetSelector = '[data-dataset=' + value + ']';
        var matchingElements = form.find(datasetSelector + ':not(.repeatable.subform *):not(.repeatable > .template *)');

        if (matchingElements.length > 0) {
            var postData = {};
            // find the appropriate destination for this data 
            var postDestination = cacRegistration.datasets[value];

            // need to use JSON object, not querystring in order to support IE8
            // not sending content-type header in AJAX request
            for (var i = 0; i < matchingElements.length; i++) {
                var element = $(matchingElements[i]);
                var elementType = $(element).attr('type');
                if ((elementType != 'radio' && elementType != 'checkbox') || $(element).is(':checked')) {
                    postData[element.attr('name')] = element.val();
                }
            }

            // submit data to dataset
            cacRegistration.submitForm(postDestination, JSON.stringify(postData), callback);
        }
    });
};

// submit the repeatable sections (treat as sub-forms)
cacRegistration.processRepeatableSubmissions = function (form, callback) {
    if (!form) {
        return;
    }

    // iterate over each repeatable sections within the form 
    var repeatableSections = $(form).find('.repeatable.subform .display > [data-index]')
        .get();

    $.each(repeatableSections, function (index, section) {
        // iterate over the datasets that apply to this particular section
        var datasets = cacRegistration.getDistinctDatasets(section);
        if (datasets && datasets.length > 0) {
            $.each(datasets, function (index, dataset) {
                // find any matching form elements in this section
                var matchingElements = $(section).find('[data-dataset=' +
                    dataset + ']');
                if (matchingElements.length > 0) {
                    var dataObj = {};
                    var postDestination = cacRegistration.datasets[dataset];
                    var postData;

                    // build a custom data object that uses the original name,
                    // not the auto-generated repeatable name 
                    // (repeatables have unique names to handle things like 
                    // radio buttons)
                    for (var i = 0; i < matchingElements.length; i++) {
                        var element = matchingElements[i];
                        var elementType = $(element).attr('type');
                        if ((elementType != 'radio' && elementType != 'checkbox') || $(element).is(':checked')) {
                            var name = $(element).attr('data-original-name');
                            var value = $(element).val();
                            dataObj[name] = value;
                        }
                    }

                    // need to use JSON object, not querystring in order to support IE8
                    // not sending content-type header in AJAX request
                    postData = JSON.stringify(dataObj);

                    // submit data to the dataset
                    cacRegistration.submitForm(postDestination, postData, 
                        callback);
                }
            });
        }
    });
};

// process the form submission event 
cacRegistration.processSubmission = function (form) {
    if (!form) {
        return;
    }

    var numRepeatables = $(form).find('.repeatable.subform > .display > .repeated').length;
    var totalSubmissions = numRepeatables + 1;

    cacRegistration.messages.push("starting new submission...");

    var callback =  function (err) {
        if (err) {
            if (!Array.isArray(err)) {
                err = [err];
            }
            cacRegistration.showErrorMessage('There was a problem submitting the form.  Please try again.');
            cacRegistration.enableForm();
            cacRegistration.messages.push(JSON.stringify(err));
        } else {
            cacRegistration.messages.push("successfully completed submission");
            window.location = "http://marketplace.cms.gov/technical-assistance-resources/assister-programs/form-success-cac.html";
        }
    };
    var after = function (times, func) {
        var errors = [];
        return function () {
            var firstArg = arguments[0];
            if (firstArg) {
                errors.push(firstArg);
            }
            if (--times < 1) {
                return func.call(this, (errors.length > 0) ? errors : undefined);
            }
        };
    };
    var whenDone = after(totalSubmissions, callback);

    cacRegistration.processMainSubmission(form, whenDone);
    cacRegistration.processRepeatableSubmissions(form, whenDone);
};

cacRegistration.getFormattedFieldValue = function (field) {
    if (!field) {
        return;
    }

    if (field.val()) {
        // if the field already has a value, use it
        return field.val();
    }

    // no field value, build it from the format string
    var formatStr = field.attr('data-format');
    var resultStr = formatStr;
    var indexedParents = field.parents('[data-index]');
    var idSuffix = '';

    if (indexedParents.length > 0) {
        for (var i = 0; i < indexedParents.length; i++) {
            var indexVal = $(indexedParents[i]).attr('data-index');
            idSuffix += '_' + indexVal;
        }
    }

    if (formatStr) {
        var paramRegx = /({)(\w+)(})/g;
        var placeholder;

        // split the placeholders
        while ((placeholder = paramRegx.exec(formatStr)) !== null) {
            // use the placeholders to get the data reference
            var dataElementName = placeholder[2];
            var dataElementVal = field.attr('data-' + dataElementName);

            if (dataElementVal) {
                // get the value of the referenced field
                var dataElementId = '#' + dataElementVal + idSuffix;
                var valueElement = $(dataElementId);
                var value = valueElement.val();

                if (!value && valueElement.attr('data-format')) {
                    // value does not exist, but can be generated; generate it
                    value = cacRegistration.getFormattedFieldValue(valueElement);
                }

                // replace the placeholder with the generated value
                resultStr = resultStr.replace(placeholder[0], value);
            }
        }
    }

    // store the result in the value
    field.val(resultStr);

    // return the result
    return resultStr;
}

cacRegistration.processFormattedFields = function (form) {
    if (!form) {
        return;
    }

    var formattedFields = form.find('[data-format]');

    // reset the values (in case anything may have changed)
    formattedFields.val('');

    // set the value for each field
    for (var i = 0; i < formattedFields.length; i++) {
        var field = $(formattedFields[i]);
        if (field && !field.val()) {
            cacRegistration.getFormattedFieldValue($(field));
        }
    }
};

cacRegistration.processJsonArrayFields = function (form) {
    if (!form) {
        return;
    }

    var jsonContainers = form.find('.json-array');

    if (jsonContainers.length > 0) {
        for (var i = 0; i < jsonContainers.length; i++) {
            var container = jsonContainers[i];
            var field = $(container).find('.array-value');
            var inputs = $(container).find('.display input, .display select, .display textarea');
            var arr = [];

            field.val('');

            if (inputs.length > 0) {
                for (var j = 0; j < inputs.length; j++) {
                    arr.push($(inputs[j]).val());
                }
            }

            field.val(JSON.stringify(arr));
        }
    }
};

cacRegistration.generateUUIDv4 = function () {
    var format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    var legalY = ['8', '9', 'A', 'B'];
    
    return format.replace(/[xy]/g, function (char) {
        var rand, val;
        if (char == 'y') {
            rand = Math.floor(Math.random() * legalY.length);
            val = legalY[rand];
        } else {
            rand = Math.random() * 16 | 0;
            val = rand.toString(16);
        }
        return val;
    });
};

cacRegistration.getTimestamp = function () {
    return (new Date()).toGMTString();
};

cacRegistration.processAutoPopulate = function (form) {
    if (!form) {
        return;
    }

    var autoPopulatedInputs = form.find('[data-populate]');

    if (autoPopulatedInputs.length > 0) {
        for (var i = 0; i < autoPopulatedInputs.length; i++) {
            var input = autoPopulatedInputs[i];
            var type = $(input).attr('data-populate');

            // determine what to auto-populate
            // (only limited values are supported)
            if (type) {
                if (type == 'id') {
                    // only set ID value if it is not already set
                    if (!$(input).val()) {
                        var id = cacRegistration.generateUUIDv4();
                        $(input).val(id);
                    }
                } else if (type == 'timestamp') {
                    // always set timestamp on submit
                    var timestamp = cacRegistration.getTimestamp();
                    $(input).val(timestamp);
                }
                // else unknown
            }
        }
    }
};

cacRegistration.processAutoReference = function (form) {
    if (!form) {
        return;
    }

    var autoReferencedInputs = form.find('[data-reference]');

    if (autoReferencedInputs.length > 0) {
        for (var i = 0; i < autoReferencedInputs.length; i++) {
            var input = autoReferencedInputs[i];
            var reference = $(input).attr('data-reference');

            if (reference) {
                var referencedElem = $(reference);
                if (referencedElem.length > 0) {
                    // set this element to referenced element value
                    $(input).val(referencedElem.val());
                }
                // else unknown
            }
        }
    }
};

cacRegistration.processFields = function (form) {
    if (!form) {
        return;
    }

    cacRegistration.processFormattedFields(form);
    cacRegistration.processJsonArrayFields(form);
    cacRegistration.processAutoPopulate(form);
    cacRegistration.processAutoReference(form);
};

cacRegistration.registerSelectToggles = function (target) {
    if (!target) {
        target = $('body');
    }

    target.find('.toggle-action.hide').hide().removeClass('hide');

    target.find('.select-toggle select').change(function () {
        var toggleWrapper = $(this).parents('.select-toggle').get(0);
        var value = $(this).find('option:selected').text();
        var toggleTarget = $(toggleWrapper).find('.toggle-action[data-showon="' + value + '"]');

        // hide all
        $(toggleWrapper).find('.toggle-action').hide();

        // show only the one

        toggleTarget.show();
        toggleTarget.find(':input:visible:enabled').focus();
    });
};

cacRegistration.registerToggles = function (target) {
    if (!target) {
        target = $('body');
    }

    // allow js to control if an element is hidden or not 
    target.find('.toggle-action.hide').hide().removeClass('hide');

    target.find('.toggle [data-toggleaction="show"]').change(function () {
        var toggle = $(this).parents('.toggle').get(0);
        $(toggle).children('.toggle-action').show();
    });

    target.find('.toggle [data-toggleaction="hide"]').change(function () {
        var toggle = $(this).parents('.toggle').get(0);
        $(toggle).children('.toggle-action').hide();
    });

    var getToggleCheckedAction = function (toggleAction, isChecked) {
        var checkedAction;

        if ($(toggleAction).is('visible')) {
            if (isChecked) {
                checkedAction = 'hide';
            }
        } else {
            if (!isChecked) {
                checkedAction = 'hide';
            }
        }

        return (checkedAction !== undefined) ? checkedAction : 'show';
    };

    target.find('.toggle [data-toggleaction="toggle"]').change(function () {
        var toggle = $(this).parents('.toggle').get(0);
        var toggleAction = $(toggle).children('.toggle-action');
        var toggleCheckedAction = $(toggle).attr('data-whenchecked');

        if (!toggleCheckedAction) {
            toggleCheckedAction = getToggleCheckedAction(toggleAction, $(this).is(':checked'));
            $(toggle).attr('data-whenchecked', toggleCheckedAction);
        }

        if ($(this).is(':checked')) {
            if (toggleCheckedAction == 'hide') {
                $(toggleAction).hide();
            } else {
                $(toggleAction).show();
            }
        } else {
            if (toggleCheckedAction == 'show') {
                $(toggleAction).hide();
            } else {
                $(toggleAction).show();
            }
        }
    });
};

cacRegistration.setRepeatableIndex = function (target, index) {
    if (!target || isNaN(index)) {
        return;
    }

    // determine if an element has the specified attribute
    var hasAttribute = function (element, attrName) {
        if (!element || !attrName) {
            return;
        }

        var attrVal = $(element).attr(attrName);
        return typeof attrVal !== typeof undefined && attrVal !== false;
    };

    // set the suffix value
    var setSuffix = function (element, attrName, suffix) {
        if (!element || !attrName || !suffix) {
            return;
        }

        if (!Array.isArray(attrName)) {
            attrName = [attrName];
        }

        for (var i = 0; i < attrName.length; i++) {
            var curName = attrName[i];
            if (hasAttribute(element, curName)) {
                var curVal = $(element).attr(curName);
                $(element).attr(curName, curVal + suffix);
                $(element).attr('data-original-' + curName, curVal);
            }    
        }
    };

    // iterate over all elements with unique fields and append a suffix
    // name must be included to handle elements like radio buttons
    var elementsWithId = $(target).find('[id],[for],[name]');
    var suffix = '_' + index;
    for (var i = 0; i < elementsWithId.length; i++) {
        var element = elementsWithId.get(i);

        setSuffix(element, ['id','for','name'], suffix);
    }

    // store the index in the target as a data element
    $(target).attr('data-index', index);
};

cacRegistration.registerRemoves = function (target) {
    if (!target) {
        return;
    }

    var removeButtons = $(target).find('.control button.remove');
    var enableRepeat = function (target) {
        if (!target) {
            return;
        }

        var addButton = $(target).children('.control').find('.add');
        if (addButton.length > 0) {
            if (addButton.attr('disabled')) {
                addButton.attr('disabled', false);
            }
            addButton.show();
        }
    };
    var removeRepeatable = function (target) {
        if (!target) {
            return;
        }

        var repeatableContainer = $(target).parents('.repeatable').get(0);
        
        $(target).remove();
        var container = $(repeatableContainer).find('.display').get(0);
        $(container).children('.repeated:last').find('.control').show();
        $(repeatableContainer).children('.control').find('.add').focus();


        enableRepeat(repeatableContainer);
    };

    removeButtons.click(function (event) {
        event.preventDefault();
        removeRepeatable($(this).parents('.repeated').get(0));
    });
};

cacRegistration.registerRepeatables = function (target) {
    if (!target) {
        target = $('body');
    }

    // allow js to control if the element is hidden or not
    target.find('.repeatable .template.hide').hide().removeClass('hide');

    var repeatables = target.find('.repeatable');
    var duplicateButtons = target.find('.repeatable button.add');
    var disableRepeat = function (target) {
        if (!target) {
            return;
        }

        $(target).children('.control').find('.add').attr('disabled', true).hide();
    };
    var insertRepeatable = function (target, focus) {
        if (!target) {
            return;
        }

        var maxRepeat = $(target).attr('data-maxrepeats');
        var insertPoint = $(target).children('.display');
        var template = $(target).children('.template');
        var templateClone = template.clone(true);
        var index = $(target).attr('data-curindex');
        var toAdd;

        if (!insertPoint || insertPoint.length < 1) {
            insertPoint = template
                .clone()
                .empty()
                .show()
                .removeClass('template')
                .addClass('display');
            $(template).before(insertPoint);
        }

        if (maxRepeat && !isNaN(maxRepeat)) {
            var length = insertPoint.children().length;
            maxRepeat = parseInt(maxRepeat, 10);
            if (length + 1 >= maxRepeat){
                disableRepeat(target);
            }
            if (length >= maxRepeat) {
                return;
            }   
        }

        if (templateClone.children().length === 1) {
            toAdd = templateClone.children();
            toAdd.addClass('repeated');
        } else {
            toAdd = $('<div></div>')
                .addClass('repeated')
                .append(templateClone.children());   
        }         

        if (isNaN(index)) {
            index = 0;
        } else {
            index = parseInt(index, 10) + 1;
        }

        if (index == 0) {
            toAdd.children('.control').remove();
        } else {
            insertPoint.children('.repeated').children('.control').hide();
        }
        
        $(target).attr('data-curindex', index);
        cacRegistration.setRepeatableIndex(toAdd, index);
        cacRegistration.registerToggles(toAdd);
        cacRegistration.registerRemoves(toAdd);
        insertPoint.append(toAdd);
        templateClone.show();
        if (focus) {
            toAdd.find(':input:visible:enabled:first').focus();
        }
    };

    if (duplicateButtons.length > 0) {
        for (var i = 0; i < duplicateButtons.length; i++) {
            $(duplicateButtons[i]).click(function (event) {
                event.preventDefault();
                insertRepeatable($(this).parents('.repeatable').get(0), true);
            });
        }
    }

    if (repeatables.length > 0) {
        for (var j = repeatables.length; j >= 0; j--){
            insertRepeatable(repeatables[j]);
        }
    }
};

cacRegistration.jumpTo = function () {
    window.scrollTo(0,0);
    $('#main_content').focus();
};

cacRegistration.setMessage = function (message) {
    var formMessage = $('#form-message');
    
    if (formMessage.hasClass('hide')) {
        formMessage.hide().removeClass('hide');
    }

    cacRegistration.clearMessage();

    if (message) {
        formMessage.append('<p>' + message + '</p>');
        formMessage.show();
    }

    return formMessage;
};

cacRegistration.clearMessage = function () {
    var formMessage = $('#form-message');
    formMessage.hide();
    formMessage.empty();
    formMessage.removeClass();
    return formMessage;
}

cacRegistration.showInfoMessage = function (message) {
    cacRegistration.setMessage(message).addClass('alert alert-info');
};

cacRegistration.showErrorMessage = function (message) {
    cacRegistration.setMessage(message).addClass('alert alert-error');
};

cacRegistration.disableForm = function () {
    var form = $(cacRegistration.getForm());
    form.find('button').attr('disabled', true);
};

cacRegistration.enableForm = function () {
    var form = $(cacRegistration.getForm());
    form.find('button').removeAttr('disabled');
};

cacRegistration.enableValidation = function (target) {
    if (!target) {
        target = cacRegistration.getForm();
    }

    var rules = {};
    var messages = {};

    // require the first marketplace contact
    $('#marketplace-contacts > .display > *[data-index="0"] .field').addClass('require');
    $('#marketplace-contacts > .display > *[data-index="0"] input').attr('required', true);
    $('#marketplace-contacts > .display > *[data-index="0"] label').append('*');

    // require at least 1 organization type
    $('#organization-types input').addClass('org-type');
    jQuery.validator.addMethod("atLeast1", function(value, element) {
        return $('.org-type:checked').length > 0;
    }, "Please select at least one Organization Type");
    jQuery.validator.addClassRules('org-type', { atLeast1: true });

    // require either state or zip for public locations
    jQuery.validator.addMethod("atLeastStateOrZip", function (value, element) {
        var wrapper = $($(element).parents('fieldset').get(0));
        var state = $(wrapper).find('select[name^="location_address_state"]');
        var zip = $(wrapper).find('input[name^="location_address_zip"]');
        return $(state).val() != '' || $(zip).val() != '';
    }, "Please provide either a state or Zip code");
    jQuery.validator.addClassRules('zip-or-state', {'atLeastStateOrZip': true});
    $(document).on('change', 'select[name^="location_address_state"]', function () {
        var wrapper = $($(this).parents('fieldset').get(0));
        var zip = $(wrapper).find('input[name^="location_address_zip"]');
        zip.valid();
    });
    $(document).on('change', 'input[name^="location_address_zip"]', function () {
        var wrapper = $($(this).parents('fieldset').get(0));
        var state = $(wrapper).find('select[name^="location_address_state"]');
        state.valid();
    });

    // allow for phone validation
    jQuery.validator.addClassRules('tel', { 'phoneUS': true });

    // require hours for at least one day 
    jQuery.validator.addMethod("hoursOnAtLeastOneDay", function (value, element) {
        var wrapper = $($(element).parents('fieldset').get(0));
        var needHours = $(wrapper).find('input[id^="location-location_hours-hours"]').is(':checked');
        return !needHours || $(wrapper).find('input.hours-selector:checked').length > 0;
    }, 'Please specify hours for at least one day of the week, or select "By Appointment Only"');
    jQuery.validator.addClassRules('hoursSelect', {'hoursOnAtLeastOneDay': true});
    $(document).on('change', 'input.hours-selector', function () {
        var wrapper = $($(this).parents('fieldset.hours').get(0));
        var hoursSelect = $(wrapper).find('.hoursSelect');
        if (hoursSelect.length > 0) {
            hoursSelect.valid();
        }
    });

    // enable validation
    $(target).validate({
        rules: rules,
        messages: messages,
        errorPlacement: function (error, element) {
            if ($(element).hasClass('org-type')) {
                var fieldset = $(element).parents('fieldset').get(0);
                if ($(fieldset).find('label.error').length < 1) {
                    $(fieldset).append(error);
                }
            } else if ($(element).hasClass('hoursSelect')) {
                var wrapper = $(element).parents('.radio-wrapper').get(0);
                if ($(wrapper).parent().find('label.error').length < 1) {
                    $(wrapper).after(error);
                }
            } else {
                $(element).after(error);
            }
        },
        invalidHandler: function (event) {
            cacRegistration.showErrorMessage('Please correct the validation errors below.');
            cacRegistration.jumpTo();
        },
        submitHandler: function (form) {
            cacRegistration.showInfoMessage('Please wait...');
            cacRegistration.jumpTo();
            cacRegistration.disableForm();
            cacRegistration.processFields($(form));
            cacRegistration.processSubmission($(form));
        },
        focusInvalid: false,
        success: false
    });
};

cacRegistration.addOnLoad(function () {
    // register toggle actions
    cacRegistration.registerToggles();
    cacRegistration.registerSelectToggles();
    cacRegistration.registerRepeatables();
    cacRegistration.enableValidation();

    // register the form submission event handler 
    cacRegistration.getForm().on('submit', function (event) {
        event.preventDefault();
    });

    if (cacRegistration.browsers.isSafari()) {
        $.get(cacRegistration.pingUrl, function () {
            cacRegistration.systemUp = true;
        });
    }

    $('#registration-organization_type_other').hide();
    $('#registration-organization_type_other-check').click(function(){
        $('#registration-organization_type_other').toggle();
    });
});