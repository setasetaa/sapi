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
    $('#dtiWdate').val(nowDate());
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

function saveForm(supbuyType, signal){
    var dtiType = $('#dtiType').val();
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
    formData.supComRegno = $('#supComRegno').val().replace(/-/gi,'');
    formData.byrComRegno = $('#byrComRegno').val().replace(/-/gi,'');
    formData.conversationID = createConversationID(formData.supComRegno, formData.byrComRegno);
    formData.supbuyType = supbuyType;
    formData.issueID = createIssueID();
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

    formData.dtiMSG = createXML(formData);
    var result = insertData(JSON.stringify(formData));

    if(result){
        if('save' != signal){
            sendData(formData, signal);
        }else{
            alert('저장 성공');
            if('AP' == supbuyType){
                location.href='/dti/list/APlist';
            }else{
                location.href='/dti/list/ARlist';
            }
        }
    }else{
        alert('저장 실패');
    }
}

function createXML(formData){
    var parser, xmlDoc;
    var dtiMSG;
    var node, elements, addNode, addNode2, textNode, header, item;

    dtiMSG = '<TaxInvoice></TaxInvoice>';
    if (window.DOMParser){
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(dtiMSG,"text/xml");
    }
    else{ // IE
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(dtiMSG);
    }
    elements = xmlDoc.getElementsByTagName("TaxInvoice");
    
    var tax1 = xmlDoc.createAttribute('xmlns');
    tax1.nodeValue = 'urn:kr:or:kec:standard:Tax:ReusableAggregateBusinessInformationEntitySchemaModule:1:0';
    var tax2 = xmlDoc.createAttribute('xmlns:xsi');
    tax2.nodeValue = 'http://www.w3.org/2001/XMLSchema-instance';
    var tax3 = xmlDoc.createAttribute('xsi:schemaLocation');
    tax3.nodeValue = 'urn:kr:or:kec:standard:Tax:ReusableAggregateBusinessInformationEntitySchemaModule:1:0 http://www.kec.or.kr/standard/Tax/TaxInvoiceSchemaModule_1.0.xsd';
    elements[0].setAttributeNode(tax1);
    elements[0].setAttributeNode(tax2);
    elements[0].setAttributeNode(tax3);

    // 발행일자 생성
    node = xmlDoc.createElement("ExchangedDocument");
    addNode = xmlDoc.createElement("IssueDateTime");
    textNode = xmlDoc.createTextNode('');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    elements[0].appendChild(node);

    // TaxInvoiceDocument
    node = xmlDoc.createElement("TaxInvoiceDocument");
    
    addNode = xmlDoc.createElement("IssueID");
    textNode = xmlDoc.createTextNode(formData.issueID);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode(formData.typeCode);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("IssueDateTime");
    textNode = xmlDoc.createTextNode(formData.dtiWdate.replace(/-/gi,''));
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PurposeCode");
    textNode = xmlDoc.createTextNode(formData.taxDemand);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    elements[0].appendChild(node);

    //TaxInvoiceTradeSettlement
    header = xmlDoc.createElement("TaxInvoiceTradeSettlement");
    // 공급자 정보
    node = xmlDoc.createElement("InvoicerParty");

    addNode = xmlDoc.createElement("ID");
    textNode = xmlDoc.createTextNode(formData.supComRegno);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    if(formData.supComType != null){
        addNode = xmlDoc.createElement("TypeCode");
        textNode = xmlDoc.createTextNode(formData.supComType);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
    }
    addNode = xmlDoc.createElement("NameText");
    textNode = xmlDoc.createTextNode(formData.supComName);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    if(formData.supComClassify != null){
        addNode = xmlDoc.createElement("ClassificationCode");
        textNode = xmlDoc.createTextNode(formData.supComClassify);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
    }

    if(formData.supBizplaceCode != '' && formData.supBizplaceCode != null){
        addNode = xmlDoc.createElement("SpecifiedOrganization");
        addNode2 = xmlDoc.createElement("TaxRegistrationID");
        textNode = xmlDoc.createTextNode(formData.supBizplaceCode);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
        node.appendChild(addNode);
    }

    addNode = xmlDoc.createElement("SpecifiedPerson");
    addNode2 = xmlDoc.createElement("NameText");
    textNode = xmlDoc.createTextNode(formData.supRepName);
    addNode2.appendChild(textNode);
    addNode.appendChild(addNode2);
    node.appendChild(addNode);

    addNode = xmlDoc.createElement("DefinedContact");
    if(formData.supEmpName != null){
        addNode2 = xmlDoc.createElement("PersonNameText");
        textNode = xmlDoc.createTextNode(formData.supEmpName);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }
    if(formData.supTelNum != null){
        addNode2 = xmlDoc.createElement("TelephoneCommunication");
        textNode = xmlDoc.createTextNode(formData.supTelNum);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }
    if(formData.supEmail != null){
        addNode2 = xmlDoc.createElement("URICommunication");
        textNode = xmlDoc.createTextNode(formData.supEmail);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }

    node.appendChild(addNode);

    addNode = xmlDoc.createElement("SpecifiedAddress");
    addNode2 = xmlDoc.createElement("LineOneText");
    textNode = xmlDoc.createTextNode(formData.supComAddr);
    addNode2.appendChild(textNode);
    addNode.appendChild(addNode2);
    node.appendChild(addNode);

    header.appendChild(node);

    // 공급받는자 정보
    node = xmlDoc.createElement("InvoiceeParty");

    addNode = xmlDoc.createElement("ID");
    textNode = xmlDoc.createTextNode(formData.byrComRegno);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    if(formData.byrComType != null){
        addNode = xmlDoc.createElement("TypeCode");
        textNode = xmlDoc.createTextNode(formData.byrComType);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
    }
    addNode = xmlDoc.createElement("NameText");
    textNode = xmlDoc.createTextNode(formData.byrComName);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    if(formData.byrComClassify != null){
        addNode = xmlDoc.createElement("ClassificationCode");
        textNode = xmlDoc.createTextNode(formData.byrComClassify);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
    }

    addNode = xmlDoc.createElement("SpecifiedOrganization");
    if(formData.byrBizplaceCode != '' && formData.byrBizplaceCode != null){
        addNode2 = xmlDoc.createElement("TaxRegistrationID");
        textNode = xmlDoc.createTextNode(formData.byrBizplaceCode);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }
    addNode2 = xmlDoc.createElement("BusinessTypeCode");
    switch(formData.byrComRegno.length){
        case 10:
        textNode = xmlDoc.createTextNode('01');
        break;
        case 13:
        if('99999' == formData.byrComRegno.substr(0,5)){
            textNode = xmlDoc.createTextNode('03');
        }else{
            textNode = xmlDoc.createTextNode('02');
        }
        break;
    }
    addNode2.appendChild(textNode);
    addNode.appendChild(addNode2);
    node.appendChild(addNode);
    
    addNode = xmlDoc.createElement("SpecifiedPerson");
    addNode2 = xmlDoc.createElement("NameText");
    textNode = xmlDoc.createTextNode(formData.byrRepName);
    addNode2.appendChild(textNode);
    addNode.appendChild(addNode2);
    node.appendChild(addNode);

    addNode = xmlDoc.createElement("PrimaryDefinedContact");
    if(formData.byrEmpName != null){
        addNode2 = xmlDoc.createElement("PersonNameText");
        textNode = xmlDoc.createTextNode(formData.byrEmpName);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }
    if(formData.byrTelNum != null){
        addNode2 = xmlDoc.createElement("TelephoneCommunication");
        textNode = xmlDoc.createTextNode(formData.byrTelNum);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }
    if(formData.byrEmail != null){
        addNode2 = xmlDoc.createElement("URICommunication");
        textNode = xmlDoc.createTextNode(formData.byrEmail);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
    }
    
    node.appendChild(addNode);

    addNode = xmlDoc.createElement("SpecifiedAddress");
    addNode2 = xmlDoc.createElement("LineOneText");
    textNode = xmlDoc.createTextNode(formData.byrComAddr);
    addNode2.appendChild(textNode);
    addNode.appendChild(addNode2);
    node.appendChild(addNode);

    header.appendChild(node);

    // 수탁자 정보
    if('03' == formData.typeCode.substr(2,4) || '05' == formData.typeCode.substr(2,4)){
        node = xmlDoc.createElement("BrokerParty");

        addNode = xmlDoc.createElement("ID");
        textNode = xmlDoc.createTextNode(formData.brkComRegno);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
        if(formData.brkComType != null){
            addNode = xmlDoc.createElement("TypeCode");
            textNode = xmlDoc.createTextNode(formData.brkComType);
            addNode.appendChild(textNode);
            node.appendChild(addNode);
        }
        addNode = xmlDoc.createElement("NameText");
        textNode = xmlDoc.createTextNode(formData.brkComName);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
        if(formData.brkComClassify != null){
            addNode = xmlDoc.createElement("ClassificationCode");
            textNode = xmlDoc.createTextNode(formData.brkComClassify);
            addNode.appendChild(textNode);
            node.appendChild(addNode);
        }

        if(formData.brkBizplaceCode != '' && formData.brkBizplaceCode != null){
            addNode = xmlDoc.createElement("SpecifiedOrganization");
            addNode2 = xmlDoc.createElement("TaxRegistrationID");
            textNode = xmlDoc.createTextNode(formData.brkBizplaceCode);
            addNode2.appendChild(textNode);
            addNode.appendChild(addNode2);
            node.appendChild(addNode);
        }

        addNode = xmlDoc.createElement("SpecifiedPerson");
        addNode2 = xmlDoc.createElement("NameText");
        textNode = xmlDoc.createTextNode(formData.brkRepName);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
        node.appendChild(addNode);

        addNode = xmlDoc.createElement("DefinedContact");
        if(formData.brkEmpName != null){
            addNode2 = xmlDoc.createElement("PersonNameText");
            textNode = xmlDoc.createTextNode(formData.brkEmpName);
            addNode2.appendChild(textNode);
            addNode.appendChild(addNode2);
        }
        if(formData.brkTelNum != null){
            addNode2 = xmlDoc.createElement("TelephoneCommunication");
            textNode = xmlDoc.createTextNode(formData.brkTelNum);
            addNode2.appendChild(textNode);
            addNode.appendChild(addNode2);
        }
        if(formData.brkEmail != null){
            addNode2 = xmlDoc.createElement("URICommunication");
            textNode = xmlDoc.createTextNode(formData.brkEmail);
            addNode2.appendChild(textNode);
            addNode.appendChild(addNode2);
        }

        node.appendChild(addNode);

        addNode = xmlDoc.createElement("SpecifiedAddress");
        addNode2 = xmlDoc.createElement("LineOneText");
        textNode = xmlDoc.createTextNode(formData.brkComAddr);
        addNode2.appendChild(textNode);
        addNode.appendChild(addNode2);
        node.appendChild(addNode);

        header.appendChild(node);
    }

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('10');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode(formData.totalAmount);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('20');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('0');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('30');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('0');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('40');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('0');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedMonetarySummation");
    addNode = xmlDoc.createElement("ChargeTotalAmount");
    textNode = xmlDoc.createTextNode(formData.supAmount);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("TaxTotalAmount");
    textNode = xmlDoc.createTextNode(formData.taxAmount);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("GrandTotalAmount");
    textNode = xmlDoc.createTextNode(formData.totalAmount);
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);
    elements[0].appendChild(header);

    //TaxInvoiceTradeLineItem
    // 아이템 내역
    for(var i=0; i<formData.itemCount; i++){
        item = xmlDoc.createElement("TaxInvoiceTradeLineItem");

        node = xmlDoc.createElement("SequenceNumeric");
        textNode = xmlDoc.createTextNode(i+1);
        node.appendChild(textNode);
        item.appendChild(node);
        if('' != formData.itemRemark[i] && null!= formData.itemRemark[i]){
            node = xmlDoc.createElement("DescriptionText");
            textNode = xmlDoc.createTextNode(formData.itemRemark[i]);
            node.appendChild(textNode);
            item.appendChild(node);
        }
        node = xmlDoc.createElement("InvoiceAmount");
        textNode = xmlDoc.createTextNode(formData.itemSupAmount[i]);
        node.appendChild(textNode);
        item.appendChild(node);
        if('' != formData.itemQTY[i] && null!= formData.itemQTY[i]){
            node = xmlDoc.createElement("ChargeableUnitQuantity");
            textNode = xmlDoc.createTextNode(formData.itemQTY[i]);
            node.appendChild(textNode);
            item.appendChild(node);
        }
        if('' != formData.itemSize[i] && null!= formData.itemSize[i]){
            node = xmlDoc.createElement("InformationText");
            textNode = xmlDoc.createTextNode(formData.itemSize[i]);
            node.appendChild(textNode);
            item.appendChild(node);
        }
        if('' != formData.itemName[i] && null!= formData.itemName[i]){
            node = xmlDoc.createElement("NameText");
            textNode = xmlDoc.createTextNode(formData.itemName[i]);
            node.appendChild(textNode);
            item.appendChild(node);
        }
        if('' != formData.itemMD[i] && null!= formData.itemMD[i]){
            node = xmlDoc.createElement("PurchaseExpiryDateTime");
            textNode = xmlDoc.createTextNode(formData.itemMD[i].replace(/-/gi,'').substr(4,7));
            node.appendChild(textNode);
            item.appendChild(node);
        }
        node = xmlDoc.createElement("TotalTax");
        addNode = xmlDoc.createElement("CalculatedAmount");
        textNode = xmlDoc.createTextNode(formData.itemTaxAmount[i]);
        addNode.appendChild(textNode);
        node.appendChild(addNode);
        item.appendChild(node);

        if('' != formData.unitPrice[i] && null!= formData.unitPrice[i]){
            node = xmlDoc.createElement("UnitPrice");
            addNode = xmlDoc.createElement("UnitAmount");
            textNode = xmlDoc.createTextNode(formData.unitPrice[i]);
            addNode.appendChild(textNode);
            node.appendChild(addNode);
            item.appendChild(node);
        }
    }
    elements[0].appendChild(item);
    console.log((new XMLSerializer()).serializeToString(xmlDoc));
    return (new XMLSerializer()).serializeToString(xmlDoc);
}

function sendData(formData, signal){
    var comRegno = $('#comRegno').val();
	var token = $('#token').val();
    var arrConvId = new Array();
    var receiveCom;
    arrConvId[0] = formData.conversationID;
    switch(signal){
        case 'ARISSUE' :
            receiveCom = formData.byrComRegno;
        break;
        case 'RARISSUE' :
            receiveCom = formData.byrComRegno;
        break;
    }
    var request = JSON.stringify({
        'MessageId': guid(),
        'Signal': signal,
        'RequestTime': nowDate(),
        'SendComRegno': comRegno,
        'ReceiveComRegno': receiveCom,
        'AuthToken': token,
        'ServiceCode': 'DTI',
        'SystemType': 'OAPI',
        'ConversationId': arrConvId,
        'SMTPEmail': '',
//        'RValue': '', // 서명모듈 이용해서 발행할 경우에만 필요
        'CertPassword': ' Ygvm7lhfuSp6p', // 암호화된 인증서의 비밀번호
        'SystemId': '',
        'PlatformCode': '',
        'SignedXML': createXML(formData)//서명정보가 있는 세금계산서 xml
    });
    $.support.cors = true;
    $.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true,
        contentType: "application/json",
        url: "http://demoapi.smartbill.co.kr/sb-api/request/",
        data: request,
        success: function (data) {
            if ("30000" != data.ResultCode) {
                alert(data.ResultMessage);
            }
            else{
                alert("정상적으로 처리되었습니다.");
            }
        },
        error: function (error) {
            alert(error);
        }
    });
}