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

function s1(){
	return Math.floor(Math.random() * 10);
}

function s4(){
	return s1()*1000 + s1()*100 + s1()*10 + s1();
}

function guid(){
	var comregno = $('#comRegno').val();
    return comregno.substr(0,8) + '-' + s4() + '-' + s4() + '-' + s4() + '-' + nowDate() + s4();
}

function createConversationID(supComregno, byrComregno){
	var convId = supComregno + byrComregno.substr(0,10) + nowDate() + s4() + '006';
	return convId.replace(/-/gi,'');
}

function createIssueID(dtiWdate){
	var issueID = dtiWdate + '41000008' + s4() + s1() + 'tnt';
	return issueID.replace(/-/gi,'');
}

// 세금계산서 XML 데이터 생성
function createXML(formData){
    var parser, xmlDoc;
    var dtiMSG;
    var node, elements, addNode, addNode2, textNode, header, item;

    dtiMSG = '<?xml version="1.0" encoding="UTF-8"?> <TaxInvoice></TaxInvoice>';
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
    textNode = xmlDoc.createTextNode(nowDate().replace(/-/gi,'') + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds());
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

    // 현금, 수표, 어음, 외상미수금
    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('10');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('20');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('30');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    header.appendChild(node);

    node = xmlDoc.createElement("SpecifiedPaymentMeans");
    addNode = xmlDoc.createElement("TypeCode");
    textNode = xmlDoc.createTextNode('40');
    addNode.appendChild(textNode);
    node.appendChild(addNode);
    addNode = xmlDoc.createElement("PaidAmount");
    textNode = xmlDoc.createTextNode('');
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
            textNode = xmlDoc.createTextNode(formData.itemMD[i].substr(0,10).replace(/-/gi,''));
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

// 세금계산서 XML 파일 파싱
function xmlParse(conversationID, supbuyType, direction, status, DTI){
	var parser, xmlDoc;
	var objData = {};
	
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(DTI,"text/xml");
  	objData.dtiMSG = DTI;
	//console.log(objData.dtiMSG);
	
	if(xmlDoc.getElementsByTagName("IssueDateTime")[0] != null){
		objData.IDate = dateFormat(xmlDoc.getElementsByTagName("IssueDateTime")[0].childNodes[0].nodeValue);
	}
	objData.issueID = xmlDoc.getElementsByTagName("IssueID")[0].childNodes[0].nodeValue;
	objData.typeCode = xmlDoc.getElementsByTagName("TypeCode")[0].childNodes[0].nodeValue;
	objData.WDate = dateFormat(xmlDoc.getElementsByTagName("IssueDateTime")[1].childNodes[0].nodeValue);
	objData.taxDemand = xmlDoc.getElementsByTagName("PurposeCode")[0].childNodes[0].nodeValue;
	if(xmlDoc.getElementsByTagName("ExchangedDocument")[0].getElementsByTagName("ReferencedDocument")[0] != null){
		objData.seqId = xmlDoc.getElementsByTagName("ExchangedDocument")[0].getElementsByTagName("ReferencedDocument")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("AmendmentStatusCode")[0] != null){
		objData.amendCode = xmlDoc.getElementsByTagName("AmendmentStatusCode")[0].childNodes[0].nodeValue;
		objData.oriIssueId = xmlDoc.getElementsByTagName("OriIssueID")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0] != null){
		if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0] != null){
			objData.remark = xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[1] != null){
			objData.remark2 = xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[2] != null){
			objData.remark3 = xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
		}
	}
	
	// 공급자 정보
	objData.supComRegno = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
	objData.supComType = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("TypeCode")[0].childNodes[0].nodeValue;
	objData.supComName = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
	objData.supComClassify = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("ClassificationCode")[0].childNodes[0].nodeValue;
	if(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("TaxRegistrationID")[0] != null){
		objData.supBizplaceCode = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("TaxRegistrationID")[0].childNodes[0].nodeValue;
	}
	objData.supRepName = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("SpecifiedPerson")[0].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
	if(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("PersonNameText")[0] != null){
		objData.supEmpName = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("PersonNameText")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("TelephoneCommunication")[0] != null){
		objData.supTelNum = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("TelephoneCommunication")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("URICommunication")[0] != null){
		objData.supEmail = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("URICommunication")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("DepartmentNameText")[0] != null){
		console.log(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("DepartmentNameText")[0].length);
		if(xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0] != undefined){
			objData.supDeptName = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0].nodeValue;
		}
	}
	objData.supComAddr = xmlDoc.getElementsByTagName("InvoicerParty")[0].getElementsByTagName("LineOneText")[0].childNodes[0].nodeValue;
	// 공급받는자 정보
	objData.byrComRegno = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
	objData.byrComType = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("TypeCode")[0].childNodes[0].nodeValue;
	objData.byrComName = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
	objData.byrComClassify = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("ClassificationCode")[0].childNodes[0].nodeValue;
	if(xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("TaxRegistrationID")[0] != null){
		objData.byrBizplaceCode = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("TaxRegistrationID")[0].childNodes[0].nodeValue;
	}
	objData.byrBusinessTypeCode = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("BusinessTypeCode")[0].childNodes[0].nodeValue;
		objData.byrRepName = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("SpecifiedPerson")[0].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
	if(xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("PersonNameText")[0] != null){
		objData.byrEmpName = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("PersonNameText")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("TelephoneCommunication")[0] != null){
	objData.byrTelNum = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("TelephoneCommunication")[0].childNodes[0].nodeValue;
}
	if(xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("URICommunication")[0] != null){
		objData.byrEmail = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("URICommunication")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("DepartmentNameText")[0] != null){
		if(xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0] != undefined){
			objData.byrDeptName = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0].nodeValue;
		}
	}
	objData.byrComAddr = xmlDoc.getElementsByTagName("InvoiceeParty")[0].getElementsByTagName("LineOneText")[0].childNodes[0].nodeValue;

	if(objData.typeCode.indexOf('03') != -1 || objData.typeCode.indexOf('03') != -1){
		// 수탁자 정보
		objData.brkComRegno = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
		objData.brkComType = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("TypeCode")[0].childNodes[0].nodeValue;
		objData.brkComName = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
		objData.brkComClassify = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("ClassificationCode")[0].childNodes[0].nodeValue;
		if(xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("TaxRegistrationID")[0] != null){
		objData.brkBizplaceCode = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("TaxRegistrationID")[0].childNodes[0].nodeValue;
		}
		objData.brkRepName = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("SpecifiedPerson")[0].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
		if(xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("PersonNameText")[0] != null){
		objData.brkEmpName = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("PersonNameText")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("TelephoneCommunication")[0] != null){
		objData.brkTelNum = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("TelephoneCommunication")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("URICommunication")[0] != null){
		objData.brkEmail = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("URICommunication")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0] != null){
			if(xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0] != undefined){
				objData.brkDeptName = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("DepartmentNameText")[0].childNodes[0].nodeValue;
			}
		}
		objData.brkComAddr = xmlDoc.getElementsByTagName("BrokerParty")[0].getElementsByTagName("LineOneText")[0].childNodes[0].nodeValue;
	}

	//금액 코드
	if(xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[0] != null){
		objData.cashCode = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[0].childNodes[0].childNodes[0].nodeValue;
		objData.cashAmount = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[0].childNodes[1].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[1] != null){
		objData.checkCode = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[1].childNodes[0].childNodes[0].nodeValue;
		objData.checkAmount = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[1].childNodes[1].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[2] != null){
		objData.noteCode = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[2].childNodes[0].childNodes[0].nodeValue;
		objData.noteAmount = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[2].childNodes[1].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[3] != null){
		objData.receivableCode = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[3].childNodes[0].childNodes[0].nodeValue;
		objData.receivableAmount = xmlDoc.getElementsByTagName("SpecifiedPaymentMeans")[3].childNodes[1].childNodes[0].nodeValue;
	}
	//금액정보
	objData.supAmount = xmlDoc.getElementsByTagName("ChargeTotalAmount")[0].childNodes[0].nodeValue;
	objData.taxAmount = xmlDoc.getElementsByTagName("TaxTotalAmount")[0].childNodes[0].nodeValue;
	objData.totalAmount = xmlDoc.getElementsByTagName("GrandTotalAmount")[0].childNodes[0].nodeValue;
	// 아이템
	objData.itemCount = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem").length;

	objData.itemLineNum = [];
	objData.itemRemark = [];
	objData.itemSupAmount = [];
	objData.itemQTY = [];
	objData.itemSize = [];
	objData.itemName = [];
	objData.itemMD = [];
	objData.itemTaxAmount = [];
	objData.itemUnitPrice = [];

	for(var i = 0; i < objData.itemCount; i++){
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("SequenceNumeric")[0] != null){
			objData.itemLineNum[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("SequenceNumeric")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("InvoiceAmount")[0] != null){
			objData.itemSupAmount[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("InvoiceAmount")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("CalculatedAmount")[0] != null){
			objData.itemTaxAmount[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("CalculatedAmount")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("DescriptionText")[0] != null){
			objData.itemRemark[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("ChargeableUnitQuantity")[0] != null){
			objData.itemQTY[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("ChargeableUnitQuantity")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("InformationText")[0] != null){
			objData.itemSize[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("InformationText")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("NameText")[0] != null){
			objData.itemName[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("NameText")[0].childNodes[0].nodeValue;
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("PurchaseExpiryDateTime")[0] != null){
			objData.itemMD[i] = dateFormat(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("PurchaseExpiryDateTime")[0].childNodes[0].nodeValue);
		}
		if(xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("UnitAmount")[0] != null){
			objData.itemUnitPrice[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("UnitAmount")[0].childNodes[0].nodeValue;
		}
    }
    
    if('정' == direction ){
		objData.direction = 2;
	}else if('역' == direction){
		objData.direction = 1;
    }else{
        objData.direction = 2;
    }

    if('' == conversationID){
        objData.conversationID = createConversationID(objData.supComRegno, objData.byrComRegno);
    }else{
        objData.conversationID = conversationID;
    }
    objData.supbuyType = supbuyType;
    objData.status = status;
	
	return JSON.stringify(objData);
}