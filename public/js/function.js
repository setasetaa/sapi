function nowDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if ( dd < 10 ) {
		dd = '0' + dd
	}
	if ( mm < 10 ) {
		mm = '0' + mm
	}
	today = yyyy + '-' + mm + '-' + dd
	return today
}

function fromDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if ( dd < 10 ) {
		dd = '0' + dd
	}
	if ( mm < 10 ) {
		mm = '0' + mm
	}
	today = yyyy + '-' + mm + '-01'
	return today
}

function search( url ) {
	//$("#t1").bootstrapTable('destroy');
	$.ajax( {
		url: url,
		type: 'POST',
		//        data: JSON.stringify(formData),
		dataType: 'json',
		success: function ( ansData, textStatus, jqXHR ) {
			//alert("test");
			const objData = JSON.stringify( ansData );
			//alert(objData);
		},
		error: function ( jqXHR, textStatus, errorThrow ) {
			alert( textStatus );
			console.log( jqXHR );
			console.log( textStatus );
			console.log( errorThrow );
		}
	} );
}

function updateDataTableSelectAllCtrl(table){
   var $table             = table.table().node();
   var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
   var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
   var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);

   // If none of the checkboxes are checked
   if($chkbox_checked.length === 0){
      chkbox_select_all.checked = false;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = false;
      }

   // If all of the checkboxes are checked
   } else if ($chkbox_checked.length === $chkbox_all.length){
      chkbox_select_all.checked = true;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = false;
      }

   // If some of the checkboxes are checked
   } else {
      chkbox_select_all.checked = true;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = true;
      }
   }
}

function SBGetList( data, supbuyType ) {
	if ( "30000" != data.ResultCode ) {
		alert( data.ResultMessage );
		if($('#t2').html() != ""){
			$('#t2').html("");
			$('#t2').DataTable().destroy();
		}
	} else {
		//alert( "정상적으로 처리되었습니다." );
		totalCount = data.ResultDataSet.Table.length;
		if($('#t2').html() != ""){
			$('#t2').html("");
			$('#t2').DataTable().destroy();
		}
		var rows_selected = [];
		var table = $('#t2').DataTable(
			{
				select: {
					style: 'os',
					selector: 'td:first-child'
				},
				order: [
								[ 1, 'asc' ]
				],
				searching: false,
				columns: [
					{title: "<input type='checkbox' name='select_all' value='1' id='select_all' style='align:center'>", data: ""},
					{title: "B / N", data: "regno"},
					{title: "COMPANY", data: "name"},
					{title: "STATUS", data: "status"},
					{title: "DTI WDATE", data: "wdate"},
					{title: "SUP AMOUNT", data: "supAmount"},
					{title: "conversationID", data: "conversationID"},
					{title: "direction", data: "direction"},
					{title: "dtiType", data: "dtiType"},
					{title: "issueID", data: "issueID"},
					{title: "sendStatus", data: "sendStatus"},
					{title: "email", data: "email"}
				],
				columnDefs: [
					{
						'targets': 0,
						'searchable': false,
						'orderable': false,
						'width': '1%',
						'className': 'dt-body-center',
						'render': function (data, type, full, meta){
								return '<input type="checkbox">';
						}
					},
					{
						'targets': 3,
						'className': 'dt-body-center',
						'render': function (data, type, full, meta){
							var status;
							switch(data){
								case 'I' :
								status = '발행';
								break;
								case 'C' :
								status = '승인';
								break;
								case 'O' :
								status = '취소';
								break;
							}
								return status;
						}
					},
					{
						'targets': 10,
						'className': 'dt-body-center',
						'render': function (data, type, full, meta){
							var returnMSG;
							switch(data){
								case '9' :
								returnMSG = '미전송';
								break;
								case '7' :
								returnMSG = '전송완료';
								break;
							}
								return returnMSG;
						}
					},
					{
						'targets': [ 6, 7, 8, 9, 11 ],
						'visible': false
					},
					{
						'targets': [ 1, 2, 4, 5 ],
						'className': 'dt-body-center'
					}
				],
				'rowCallback': function(row, data, dataIndex){
			   // Get row ID
			   var rowId = data[0];
			   // If row ID is in the list of selected row IDs
				   if($.inArray(rowId, rows_selected) !== -1){
				      $(row).find('input[type="checkbox"]').prop('checked', true);
				      $(row).addClass('selected');
				   }
				 },
				'destroy': true
		});

		// Handle click on checkbox
	  $('#t2 tbody').on('click', 'input[type="checkbox"]', function(e){

	      var $row = $(this).closest('tr');
	      // Get row data
	      var data = table.row($row).data();
	      // Get row ID
	      var rowId = data[0];
	      // Determine whether row ID is in the list of selected row IDs
	      var index = $.inArray(rowId, rows_selected);
	      // If checkbox is checked and row ID is not in list of selected row IDs
	      if(this.checked && index === -1){
	         rows_selected.push(rowId);
	      // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
	      } else if (!this.checked && index !== -1){
	         rows_selected.splice(index, 1);
	      }

	      if(this.checked){
	         $row.addClass('selected');
	      } else {
	         $row.removeClass('selected');
	      }
	      // Update state of "Select all" control
	      updateDataTableSelectAllCtrl(table);
	      // Prevent click event from propagating to parent
	      e.stopPropagation();
	  });

	  // Handle click on table cells with checkboxes
	  $('#t2').on('click', 'tbody td, thead th:first-child', function(e){
	     $(this).parent().find('input[type="checkbox"]').trigger('click');
	  });

	  // Handle click on "Select all" control
	  $('thead input[name="select_all"]', table.table().container()).on('click', function(e){
	      if(this.checked){
	         $('#t2 tbody input[type="checkbox"]:not(:checked)').trigger('click');
	      } else {
	         $('#t2 tbody input[type="checkbox"]:checked').trigger('click');
	      }
	      // Prevent click event from propagating to parent
	      e.stopPropagation();
	  });

	  // Handle table draw event
	  table.on('draw', function(){
	      // Update state of "Select all" control
	      updateDataTableSelectAllCtrl(table);
	  });

		if ( 0 < totalCount ) {
			if ( "AR" == supbuyType ) { //매출보관함
				for ( var i = 0; i < totalCount; i++ ) {
					table.row.add( {
							"": "",
							"name": data.ResultDataSet.Table[ i ].BYR_COM_NAME, //공급받는자 회사명
							"regno": data.ResultDataSet.Table[ i ].BYR_COM_REGNO, //공급받는자 사업자번호
							"direction": data.ResultDataSet.Table[ i ].DIRECTION, //세금계산서 정/역 구분
							"status": data.ResultDataSet.Table[ i ].DTI_STATUS, //세금계산서 상태
							"dtiType": data.ResultDataSet.Table[ i ].DTI_TYPE, //세금계산서 종류
							"wdate": data.ResultDataSet.Table[ i ].DTI_WDAY, //세금계산서 작성일자
							"conversationID": data.ResultDataSet.Table[ i ].ETC_PCS_NO, //세금계산서 참조번호
							"issueID": data.ResultDataSet.Table[ i ].ISSUE_ID, //세금계산서 승인번호
							"sendStatus": data.ResultDataSet.Table[ i ].NTS_SEND_STATUS, //세금계산서 국세청 전송상태
							"supAmount": data.ResultDataSet.Table[ i ].SUP_AMT, //세금계산서 공급가액
							"email": data.ResultDataSet.Table[ i ].SUP_EMAIL //담당자 이메일
						} )
						.draw();
				}
			} else if ( "AP" == supbuyType ) { //매입보관함
				for ( var i = 0; i < totalCount; i++ ) {
					table.row.add( {
							"": "",
							"name": data.ResultDataSet.Table[ i ].SUP_COM_NAME, //공급자 회사명
							"regno": data.ResultDataSet.Table[ i ].SUP_COM_REGNO, //공급자 사업자번호
							"direction": data.ResultDataSet.Table[ i ].DIRECTION, //세금계산서 정/역 구분
							"status": data.ResultDataSet.Table[ i ].DTI_STATUS, //세금계산서 상태
							"dtiType": data.ResultDataSet.Table[ i ].DTI_TYPE, //세금계산서 종류
							"wdate": data.ResultDataSet.Table[ i ].DTI_WDAY, //세금계산서 작성일자
							"conversationID": data.ResultDataSet.Table[ i ].ETC_PCS_NO, //세금계산서 참조번호
							"issueID": data.ResultDataSet.Table[ i ].ISSUE_ID, //세금계산서 승인번호
							"sendStatus": data.ResultDataSet.Table[ i ].NTS_SEND_STATUS, //세금계산서 국세청 전송상태
							"supAmount": data.ResultDataSet.Table[ i ].SUP_AMT, //세금계산서 공급가액
							"email": data.ResultDataSet.Table[ i ].BYR_EMAIL //담당자 이메일
						} )
						.draw();
				}
			}
		} else {
			alert( "데이터가 존재하지 않습니다." );
		}
	}
}

function fnUploadXML(data, arrDirection, arrStatus, supbuyType){
	if ("30000" != data.ResultCode) {
	 alert(data.ResultMessage);
	}else{
		//alert("정상적으로 처리되었습니다.");
		var totalCount = data.ResultDataSet.Table1.length;
		if(0 < totalCount){
		 for(var i = 0 ; i < totalCount ; i++){
			 var conversationID = data.ResultDataSet.Table1[i].CONVERSATION_ID; //참조번호
			 var direction = arrDirection[i];
			 var status = arrStatus[i];
			 var supbuyType = supbuyType;
			 var DTI = data.ResultDataSet.Table1[i].DTI_XML; //세금계산서 원본
			 var DTT = data.ResultDataSet.Table1[i].DTT_XML; //거래명세서 원본

			 if(DTT.legnth != 0){
         //var dttData = xmlParse(conversationID, supbuyType, direction, status, DTT);
       }
			 dataSave(xmlParse(conversationID, supbuyType, direction, status, DTI));
		 }
		}
		else{
		 alert("데이터가 존재하지 않습니다.");
		}
	}
}

function xmlParse(conversationID, supbuyType, direction, status, DTI){
	var text, parser, xmlDoc
	var objData= {};
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(DTI,"text/xml");
	//alert(xmlDoc.getElementsByTagName("IssueDateTime")[1].childNodes[0].nodeValue);
	objData.conversationID = conversationID;
	objData.supbuyType = supbuyType;
	objData.direction = direction;
	objData.status = status;
	objData.IDate = dateFormat(xmlDoc.getElementsByTagName("IssueDateTime")[0].childNodes[0].nodeValue);
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
	if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0] != null){
		objData.remark = xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[1] != null){
		objData.remark2 = xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
	}
	if(xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[2] != null){
		objData.remark3 = xmlDoc.getElementsByTagName("TaxInvoiceDocument")[0].getElementsByTagName("DescriptionText")[0].childNodes[0].nodeValue;
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
		objData.itemLineNum[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("SequenceNumeric")[0].childNodes[0].nodeValue;
    objData.itemSupAmount[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("InvoiceAmount")[0].childNodes[0].nodeValue;
    objData.itemTaxAmount[i] = xmlDoc.getElementsByTagName("TaxInvoiceTradeLineItem")[i].getElementsByTagName("CalculatedAmount")[0].childNodes[0].nodeValue;

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
	return objData;
}

function dataSave(objData){
  var request = JSON.stringify(objData);
  $.support.cors = true;
  $.ajax({
    type: "POST",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json",
    url: "save",
    data: request,
    success: function(data) {
      alert("success~");
    },
    error: function(error) {
      alert("error");
    }
  });
}

function dateFormat(str){
	var y = str.substr(0, 4);
  var m = str.substr(4, 2);
  var d = str.substr(6, 2);
	var date = y + '-' + m + '-' + d
  return date;
}
