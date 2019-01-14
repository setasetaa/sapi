document.write('<script src="/js/fnData.js" type="text/javascript"></script>');

function itemAdd(dtiType){
    var tcount = $('#itembody tr').eq($("#itembody tr").length-1).find("input[name^=dtiLineNum]").val() + 1;
    
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
        $('#itemDelete' +tcount).click(function(){
            $(this).parent().parent().remove();
            $(window).resize();
        });
}

function insertData(supbuyType){
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
    formData.typeCode = '0101';
    formData.itemCount = $("#itembody tr").length;

    // formData.push({ name: 'conversationID', value: createConversationID(supComRegno, byrComRegno) });
    // formData.push({ name: 'supbuyType', value:  supbuyType });
    // if('AP' == supbuyType){
    //     formData.push({ name: 'status', value:  'A' });
    //     formData.push({ name: 'direction', value:  '1' });
    // }else{
    //     formData.push({ name: 'status', value:  'S' });
    //     formData.push({ name: 'direction', value:  '2' });
    // }
    // formData.push({ name: 'typeCode', value:  '0101' });
    // formData.push({ name: 'itemCount', value:  $("#itembody tr").length });

    var request = JSON.stringify(formData);
    alert(request);
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "save",
		async: false,
		data: request,
		success: function(data) {
			alert('success');
		},
		error: function(error) {
			alert('저장 실패');
		}
	});
}
