Backbone.Validator.createMessage = function(attrName, attrValue, validatorExpectation, validatorName) {

	var validators = {
		required: "è obbligatorio",
		minLength: "è troppo corto",
		format: "non rispetta il formato"
	};

	// return i18n.translate(attrName + '.' + validatorName, { value: attrValue, expectation: validatorExpectation });
	return attrName + " " + validators[validatorName] + ".";
};