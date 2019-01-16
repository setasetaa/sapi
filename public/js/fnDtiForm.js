document.write('<script src="/js/fnData.js" type="text/javascript"></script>');

function init(supbuyType){

    var userName = $('#userName').val();
    var email = $('#userEmail').val();
    var deptName = $('#deptName').val();
    var telNum = $('#telNum').val();
    var comRegno = $('#comRegno').val();
    var bizCode = $('#bizCode').val();
    var comName = $('#comName').val();
    var repName = $('#repName').val();
    var comAddr = $('#comAddr').val();
    var comType = $('#comType').val();
    var comClassify = $('#comClassify').val();
    
    if('AP' == supbuyType){
        $('#byrComRegno').val(comRegno);
        $('#byrEmpName').val(userName);
        $('#byrEmail').val(email);
        $('#byrDeptName').val(deptName);
        $('#byrTelNum').val(telNum);
        $('#byrBizplaceCode').val(bizCode);
        $('#byrComName').val(comName);
        $('#byrRepName').val(repName);
        $('#byrComAddr').val(comAddr);
        $('#byrComType').val(comType);
        $('#byrComClassify').val(comClassify);
    }else{
        $('#supComRegno').val(comRegno);
        $('#supEmpName').val(userName);
        $('#supEmail').val(email);
        $('#supDeptName').val(deptName);
        $('#supTelNum').val(telNum);
        $('#supBizplaceCode').val(bizCode);
        $('#supComName').val(comName);
        $('#supRepName').val(repName);
        $('#supComAddr').val(comAddr);
        $('#supComType').val(comType);
        $('#supComClassify').val(comClassify);
    }
    $('#itemSupAmount').keyup(function(){
        sum();
    });
    $('#itemTaxAmount').keyup(function(){
        sum();
    });
}

function itemAdd(dtiType){
    var tcount = parseInt($('#itembody tr').eq($("#itembody tr").length-1).find("input[name^=dtiLineNum]").val()) + 1;
    
    var itemAdd =           "<tr id='itemrow"+tcount+"'> <td class='center'> <input type='date'  class='custom custom-sm form-control form-control-sm' id='itemMD"+tcount+"'  name='itemMD' style='margin-bottom: 2px;text-align:center'/> </td>";
        itemAdd = itemAdd + "<td class='center'> <input type='text' class='custom custom-sm form-control form-control-sm' id='itemName"+tcount+"' name='itemName' maxlength='100' style='margin-bottom: 2px'/> </td>";
        itemAdd = itemAdd + "<td class='center'><input type='text' class='custom custom-sm form-control form-control-sm' id='itemSize"+tcount+"' name='itemSize' maxlength='18'  style='margin-bottom: 2px'/> </td>";
        itemAdd = itemAdd + "<td class='center'><input type='number' class='custom custom-sm form-control form-control-sm' id='itemQTY"+tcount+"' name='itemQTY'  maxlength='18' style='margin-bottom: 2px;text-align:right' /> </td>";
        itemAdd = itemAdd + "<td class='center'><input type='text' class='custom custom-sm form-control form-control-sm' id='unitPrice"+tcount+"' name='unitPrice'  maxlength='18' style='margin-bottom: 2px;text-align:right' /> </td>";
        itemAdd = itemAdd + "<td class='center'><input type='text' class='custom custom-sm form-control form-control-sm' id='itemSupAmount"+tcount+"' name='itemSupAmount'  maxlength='18' valid='trim,required' element-name='품목 공급가액' style='margin-bottom: 2px;text-align:right'/> </td>";
        if(dtiType != "02"){
            itemAdd = itemAdd + "<td class='center'><input type='text' class='custom custom-sm form-control form-control-sm' id='itemTaxAmount"+tcount+"' name='itemTaxAmount' valid='trim,required' element-name='품목 세액' maxlength='18' style='margin-bottom: 2px;text-align:right';/> </td>";
        }
        itemAdd = itemAdd + "<td class='center'><input type='text'  class='custom custom-sm form-control form-control-sm' id='itemRemark"+tcount+"' name='itemRemark' maxlength='18'  style='margin-bottom: 2px;text-align:center'/> ";
        itemAdd = itemAdd + "<td><input type='button' id='itemDelete"+tcount+"' name='itemDelete' class='btn btn-outline-danger btn-sm' value='삭제'  style='margin-bottom: 3px'/> </td>";
        itemAdd = itemAdd + "<input type='hidden' id='dtiLineNum"+tcount+"' name='dtiLineNum' value="+tcount+" />";
        
        $('#itemData > tbody:last').append(itemAdd);
        $('#itemDelete' + tcount).click(function(){
            $(this).parent().parent().remove();
            $(window).resize();
            sum();
        });

        $('#itemSupAmount' + tcount).keyup(function(){
            sum();
        });
        $('#itemTaxAmount' + tcount).keyup(function(){
            sum();
        });
        
}

function sum(){
    var dtiType = $('#dtiType').val();
    var count = $("#itembody tr").length;
    var tsup = 0, ttax = 0, total = 0;
    for(var i=0; i <count;i++ ){
        var supAmount = 'input[name=itemSupAmount]:eq(' + i + ')';
        var sup,tax;
        
        if('' == $(supAmount).val()){
            sup = 0;
        }else{
            sup = parseInt($(supAmount).val());
        }
        tsup += sup;
        if('01' == dtiType || '03' == dtiType){
            var taxAmount = 'input[name=itemTaxAmount]:eq(' + i + ')';
            if('' == $(taxAmount).val()){
                tax = 0;
            }else{
                tax = parseInt($(taxAmount).val());
            }
            ttax += tax;
        }
    }
    total = tsup + ttax;
    $('#supAmount').val(tsup);
    $('#taxAmount').val(ttax);
    $('#totalAmount').val(total);
}

function insertData(formData){
    var returnMSG;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "save",
		async: false,
		data: formData,
		success: function(data) {
			returnMSG = true;
		},
		error: function(error) {
            alert(error);
			returnMSG = false;
		}
    });
    return returnMSG;
}

function saveForm(supbuyType){
    var dtiType = $('#dtiType').val();
    var supComRegno = $('#supComRegno').val().replace(/-/gi,'');
    var byrComRegno = $('#byrComRegno').val().replace(/-/gi,'');
    $('#supComRegno').val(supComRegno);
    $('#byrComRegno').val(byrComRegno);
    
    var formData = {};
	var a = $('#sendForm').serializeArray();
	$.each(a, function() {
		if (formData[this.name]) {
			if (!formData[this.name].push) {
				formData[this.name] = [formData[this.name]];
			}
			formData[this.name].push(this.value || '');
		} else {
			formData[this.name] = this.value || '';
		}
	});
 
    formData.conversationID = createConversationID(supComRegno, byrComRegno);
    formData.supbuyType = supbuyType;
    if('AP' == supbuyType){
        formData.status = 'A';
        formData.direction = '1';
    }else{
        formData.status = 'S';
        formData.direction = '2';
    }
    // typecode 정의
    switch(dtiType){
        case '01':
            if('' == formData.amendCode || null == formData.amendCode){
                formData.typeCode = '01';
                if('0' == formData.taxAmount){
                    formData.typeCode = formData.typeCode + '02';
                }else{
                    formData.typeCode = formData.typeCode + '01';
                }
            }else{
                formData.typeCode = '02';
                if('0' == formData.taxAmount){
                    formData.typeCode = formData.typeCode + '02';
                }else{
                    formData.typeCode = formData.typeCode + '01';
                }
            }
        break;
        case '02':
            if('' == formData.amendCode || null == formData.amendCode){
                formData.typeCode = '03';
                formData.typeCode = formData.typeCode + '01';
            }else{
                formData.typeCode = '04';
                formData.typeCode = formData.typeCode + '01';
            }       
        break;
        case '03':
            if('' == formData.amendCode || null == formData.amendCode){
                formData.typeCode = '01';
                if('0' == formData.taxAmount){
                    formData.typeCode = formData.typeCode + '05';
                }else{
                    formData.typeCode = formData.typeCode + '03';
                }
            }else{
                formData.typeCode = '02';
                if('0' == formData.taxAmount){
                    formData.typeCode = formData.typeCode + '05';
                }else{
                    formData.typeCode = formData.typeCode + '03';
                }
            }    
        break;
        case '04':
            if('' == formData.amendCode || null == formData.amendCode){
                formData.typeCode = '03';
                formData.typeCode = formData.typeCode + '03';
            }else{
                formData.typeCode = '04';
                formData.typeCode = formData.typeCode + '03';
            }   
        break;
    }
    
    formData.supAmount = $('#supAmount').val();
    formData.taxAmount = $('#taxAmount').val();
    formData.totalAmount = $('#totalAmount').val();
    formData.itemCount = $("#itembody tr").length;

    formData.dtiLineNum = [];
	formData.itemRemark = [];
	formData.itemSupAmount = [];
	formData.itemQTY = [];
	formData.itemSize = [];
	formData.itemName = [];
	formData.itemMD = [];
	formData.itemTaxAmount = [];
    formData.unitPrice = [];
    
    for(var i=0; i<formData.itemCount; i++){
        if($('input[name=dtiLineNum]:eq(' + i + ')').val()) formData.dtiLineNum[i] = $('input[name=dtiLineNum]:eq(' + i + ')').val();
        if($('input[name=itemRemark]:eq(' + i + ')').val()) formData.itemRemark[i] = $('input[name=itemRemark]:eq(' + i + ')').val();
        if($('input[name=itemSupAmount]:eq(' + i + ')').val()) formData.itemSupAmount[i] = $('input[name=itemSupAmount]:eq(' + i + ')').val();
        if($('input[name=itemTaxAmount]:eq(' + i + ')').val()) formData.itemTaxAmount[i] = $('input[name=itemTaxAmount]:eq(' + i + ')').val();
        if($('input[name=itemQTY]:eq(' + i + ')').val()) formData.itemQTY[i] = $('input[name=itemQTY]:eq(' + i + ')').val();
        if($('input[name=itemSize]:eq(' + i + ')').val()) formData.itemSize[i] = $('input[name=itemSize]:eq(' + i + ')').val();
        if($('input[name=itemName]:eq(' + i + ')').val()) formData.itemName[i] = $('input[name=itemName]:eq(' + i + ')').val();
        if($('input[name=itemMD]:eq(' + i + ')').val()) formData.itemMD[i] = $('input[name=itemMD]:eq(' + i + ')').val();
        if($('input[name=unitPrice]:eq(' + i + ')').val()) formData.unitPrice[i] = $('input[name=unitPrice]:eq(' + i + ')').val();
    }

    var result = insertData(JSON.stringify(formData));
    if(result){
        if('AP' == supbuyType){
            location.href='/dti/list/APlist';
        }else{
            location.href='/dti/list/ARlist';
        }
        
    }
}