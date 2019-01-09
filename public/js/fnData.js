

function nowDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if ( dd < 10 ) {
		dd = '0' + dd;
	}
	if ( mm < 10 ) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

function fromDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if ( dd < 10 ) {
		dd = '0' + dd;
	}
	if ( mm < 10 ) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-01';
	return today;
}

function dateFormat(str){
	var y = str.substr(0, 4);
	var m = str.substr(4, 2);
	var d = str.substr(6, 2);
	var date = y + '-' + m + '-' + d;
    return date;
}

function isDate(value) {
    switch (typeof value) {
        case 'number':
            return true;
        case 'string':
            return !isNaN(Date.parse(value));
        case 'object':
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
        default:
            return false;
    }
}

function guid() {
	var comregno = $('#comRegno').val();
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substr(0,1);
    }
    return comregno.substr(0,8) + '-' + s4() + '-' + s4() + '-' + s4() + '-' + nowDate() + s4();
}

function createConversationID(supComregno, byrComregno){
	var convId = supComregno + byrComregno.substr(0,10) + nowDate() + guid().s4() + '006';
	return convId;
}