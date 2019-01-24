document.write('<script src="/js/fnData.js" type="text/javascript"></script>');

function search(supbuyType) {
	var searchData = {};
	var a = $('#searchForm').serializeArray();
	$.each(a, function() {
		if (searchData[this.name]) {
			if (!searchData[this.name].push) {
				searchData[this.name] = [searchData[this.name]];
			}
			searchData[this.name].push(this.value || '');
		} else {
			searchData[this.name] = this.value || '';
		}
	});
	searchData.userEmail = $('#userEmail').val();
	searchData.userComRegno = $('#comRegno').val();
	var request = JSON.stringify(searchData);

	$.support.cors = true;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "list",
		data: request,
		success: function(data) {
			//alert(data['data'][0].sup_com_name);
			fnListView(data['data'], supbuyType);
		},
		error: function(error) {
			alert(error);
		}
	});
}

function fnListView(data, supbuyType){	
	var rows_selected = [];
	if($('#t1').html() != ""){
		$('#t1').html("");
		$('#t1').DataTable().destroy();
	}
	var table = $('#t1').DataTable({
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
			{title: "종류", data: "dtiType"},
			{title: "사업자번호", data: "regno"},
			{title: "회사명", data: "name"},
			{title: "작성일자", data: "wdate"},
			{title: "상태", data: "status"},
			{title: "공급가액", data: "supAmount"},
			{title: "세액", data: "taxAmount"},
			{title: "합계금액", data: "totalAmount"},
			{title: "승인번호", data: "issueID"},
			{title: "CONVERSATIONID", data: "conversationID"},
			{title: "supbuyType", data: "supbuyType"},
			{title: "DIRECTION", data: "direction"},
			{title: "supEmpName", data: "supEmpName"},
			{title: "supEmail", data: "supEmail"},
			{title: "supTelNum", data: "supTelNum"},
			{title: "byrEmpName", data: "byrEmpName"},
			{title: "byrEmail", data: "byrEmail"},
			{title: "byrTelNum", data: "byrTelNum"},
			{title: "brkEmpName", data: "brkEmpName"},
			{title: "brkEmpName", data: "brkEmpName"},
			{title: "brkEmpName", data: "brkEmpName"},
			{title: "sendRequest", data: "sendRequest"},
			{title: "supRegno", data: "supComRegno"},
			{title: "byrRegno", data: "byrComRegno"}
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
				'targets': 1,
				'className': 'dt-body-center',
				'width': '10%',
				'render': function (data, type, full, meta){
						var dType;
						switch(data){
							case '0101' :
							dType = '일반과세';
							break;
							case '0102' :
							dType = '영세율';
							break;
							case '0103' :
							dType = '위수탁과세';
							break;
							case '0104' :
							dType = '수입과세';
							break;
							case '0201' :
							dType = '수정과세';
							break;
							case '0202' :
							dType = '수정영세';
							break;
							case '0203' :
							dType = '수정위수탁<br>과세';
							break;
							case '0204' :
							dType = '수정수입과세';
							break;
							case '0205' :
							dType = '수정영세율<br>위수탁';
							break;
							case '0301' :
							dType = '일반면세';
							break;
							case '0303' :
							dType = '위수탁면세';
							break;
							case '0304' :
							dType = '수입면세';
							break;
							case '0401' :
							dType = '수정면세';
							break;
							case '0403' :
							dType = '수정위수탁<br>면세';
							break;
							case '0404' :
							dType = '수입면세';
							break;
						}
						return dType;
				}
			},
			{
				'targets': 2,
				'className': 'dt-body-center',
				'width': '15%',
				'render': function (data, type, full, meta){
						data = data.substring(0,3) + '-' + data.substring(3,5) + '-' + data.substring(5,10)
						return data;
				}
			},
			{
				'targets': 4,
				'className': 'dt-body-center',
				'render': function (data, type, full, meta){
					data = data.substring(0,10);
					return data;
				}
			},
			{
				'targets': 5,
				'className': 'dt-body-center',
				'render': function (data, type, full, meta){
					var status;
					switch(data){
						case 'S' :
						status = '저장';
						break;
						case 'A' :
						status = '저장';
						break;
						case 'I' :
						status = '수신미승인';
						break;
						case 'C' :
						status = '수신승인';
						break;
						case 'O' :
						status = '발행취소';
						break;
						case 'V' :
						status = '역발행요청';
						break;
						case 'R' :
						status = '수신거부';
						break;
						case 'T' :
						status = '역발행요청거부';
						break;
						case 'W' :
						status = '역발행요청취소';
						break;
					}
					return status;
				}
			},
			{
				'targets': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
				'visible': false
			},
			{
				'targets': [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
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

	var totalCount;
	if(data.length != undefined){
		totalCount = data.length;
	}
	if(totalCount != 0){
		for ( var i = 0; i < totalCount; i++ ) {
			if('AP' == supbuyType){
				table.row.add({
					"": "",
					"dtiType": data[i].dti_type, //세금계산서 종류
					"regno": data[i].sup_com_regno, //거래처 사업자번호
					"name": data[i].sup_com_name, //거래처 회사명
					"status": data[i].dti_status.dti_status, //세금계산서 상태
					"wdate": data[i].dti_wdate, //세금계산서 작성일자
					"supAmount": data[i].sup_amount, //세금계산서 공급가액
					"taxAmount": data[i].tax_amount, //세금계산서 공급가액
					"totalAmount": data[i].total_amount, //세금계산서 공급가액
					"issueID": data[i].issue_id, //세금계산서 승인번호
					"conversationID": data[i].conversation_id, //세금계산서 참조번호
					"supbuyType": data[i].supbuy_type, // 매출/매입 구분
					"direction": data[i].direction, //세금계산서 정/역 구분
					"supEmpName": data[i].sup_emp_name,  //  공급자 담당자
					"supEmail": data[i].sup_email, //공급자 이메일
					"supTelNum": data[i].sup_tel_num, // 공급자 연락처
					"byrEmpName": data[i].byr_emp_name, // 공받자 담당자
					"byrEmail": data[i].byr_email, //공받자 이메일
					"byrTelNum": data[i].byr_tel_num, // 공받자 연락처
					"brkEmpName": data[i].broker_emp_name, // 위탁자 담당자
					"brkEmail": data[i].broker_email, //위탁자 이메일
					"brkTelNum": data[i].broker_tel_num, // 위탁자 연락처
					"sendRequest": data[i].dti_status.send_request, // 국세청 전송 결과
					"sendRequestDesc": data[i].dti_status.send_request_desc, // 전송 실패 사유
					"supComRegno": data[i].sup_com_regno, // 공급자 사업자번호
					"byrComRegno": data[i].byr_com_regno // 공급받는자 사업자번호
				}).draw();
			}else{
				table.row.add({
					"": "",
					"dtiType": data[i].dti_type, //세금계산서 종류
					"regno": data[i].byr_com_regno, //거래처 사업자번호
					"name": data[i].byr_com_name, //거래처 회사명
					"status": data[i].dti_status.dti_status, //세금계산서 상태
					"wdate": data[i].dti_wdate, //세금계산서 작성일자
					"supAmount": data[i].sup_amount, //세금계산서 공급가액
					"taxAmount": data[i].tax_amount, //세금계산서 공급가액
					"totalAmount": data[i].total_amount, //세금계산서 공급가액
					"issueID": data[i].issue_id, //세금계산서 승인번호
					"conversationID": data[i].conversation_id, //세금계산서 참조번호
					"supbuyType": data[i].supbuy_type, // 매출/매입 구분
					"direction": data[i].direction, //세금계산서 정/역 구분
					"supEmpName": data[i].sup_emp_name,  //  공급자 담당자
					"supEmail": data[i].sup_email, //공급자 이메일
					"supTelNum": data[i].sup_tel_num, // 공급자 연락처
					"byrEmpName": data[i].byr_emp_name, // 공받자 담당자
					"byrEmail": data[i].byr_email, //공받자 이메일
					"byrTelNum": data[i].byr_tel_num, // 공받자 연락처
					"brkEmpName": data[i].broker_emp_name, // 위탁자 담당자
					"brkEmail": data[i].broker_email, //위탁자 이메일
					"brkTelNum": data[i].broker_tel_num, // 위탁자 연락처
					"sendRequest": data[i].dti_status.send_request, // 국세청 전송 결과
					"sendRequestDesc": data[i].dti_status.send_request_desc, // 전송 실패 사유
					"supComRegno": data[i].sup_com_regno, // 공급자 사업자번호
					"byrComRegno": data[i].byr_com_regno // 공급받는자 사업자번호
				}).draw();
			}
		}
	}

	$('#t1 tbody').on('click', 'input[type="checkbox"]', function(e) {
		var $row = $(this).closest('tr');
		// Get row data
		var tdata = table.row($row).data();
		// Get row ID
		var rowId = tdata[0];
		// Determine whether row ID is in the list of selected row IDs
		var index = $.inArray(rowId, rows_selected);
		// If checkbox is checked and row ID is not in list of selected row IDs
		if (this.checked && index === -1) {
			rows_selected.push(rowId);
			// Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
		} else if (!this.checked && index !== -1) {
			rows_selected.splice(index, 1);
		}
		if (this.checked) {
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
	$('#t1 tbody').on('click', 'tr', function () {
    	var rdata = table.row(this).data();
		$.support.cors = true;
		$.ajax({
			type: "POST",
			crossDomain: true,
			url: 'getXML',
			data: {conversationID : rdata.conversationID, dtiType : rdata.dtiType, supbuyType : rdata.supbuyType},
			success: function(data) {
				var parser = new DOMParser();
				var xml = parser.parseFromString(data['xml'][0].dti_msg, "text/xml");
				var xsl = parser.parseFromString(data['html'], "text/xml");

				if (typeof (XSLTProcessor) != "undefined"){
					var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
					var xmlFragment = xsltProcessor.transformToFragment(xml, document);
					document.getElementById('viewForm').appendChild(xmlFragment);
				}else{
					if (typeof (xml.transformNode) != 'undefined'){
						document.getElementById("viewForm").appendChild(xml.transformNode(xsl));
					}else {
						 var XMLDOM = new ActiveXObject("Microsoft.XMLDOM");
						 var XSLDOM = new ActiveXObject("Microsoft.XMLDOM");
						 XMLDOM.async = false;
						 XMLDOM.loadXML(xml);
						 XSLDOM.async = false;
						 XSLDOM.loadXML(xsl);
						 document.getElementById('viewForm').innerHTML = XMLDOM.transformNode(XSLDOM);
					}
				}
				var modal = document.getElementById('viewModal');
				modal.style.display = "block";

				// 상태별 버튼 활성화
				switch(rdata.status){
					case 'S':
						$('#ARISSUE').show();
						$('#EDIT').show();
						$('#DEL').show();
						$('#status').html("세금계산서 상태 : 저장");
						break;
					case 'A':
						$('#RARREQUEST').show();
						$('#EDIT').show();
						$('#DEL').show();
						$('#status').html("세금계산서 상태 : 저장");
						break;
					case 'V':
						if('AP' == rdata.supbuyType){
							$('#CANCELRREQUEST').show();
							$('#SENDMAIL').show();
						}else{
							$('#RARISSUE').show();
							$('#RIREJECT').show();
						}
						$('#status').html("세금계산서 상태 : 역발행 요청");
						break;
					case 'I':
						if('AP' == rdata.supbuyType){
							$('#APPROVE').show();
							$('#REJECT').show();
						}else{
							$('#CANCELALL').show();
							$('#SENDMAIL').show();
							$('#AMEND').show();
							$('#SENDHOMETAX').show();
							$('#TAXSTATUS').show();
						}
						$('#status').html("세금계산서 상태 : 수신미승인");
						break;
					case 'O':
						$('#status').html("세금계산서 상태 : 발행취소");
						break;
					case 'T':
						$('#status').html("세금계산서 상태 : 역발행요청거부");
						break;
					case 'W':
						$('#status').html("세금계산서 상태 : 역발행요청취소");
						break;
					case 'R':
						$('#status').html("세금계산서 상태 : 수신거부");
						break;
					case 'C':
						$('#SENDMAIL').show();
						$('#AMEND').show();
						$('#SENDHOMETAX').show();
						$('#TAXSTATUS').show();
						$('#status').html("세금계산서 상태 : 수신승인");
						break;
				}
				$("#copy").show();
				// 건 정보
				$('#conversationID').val(rdata.conversationID);
				$('#supbuyType').val(rdata.supbuyType);
				$('#supRegno').val(rdata.supComRegno);
				$('#byrRegno').val(rdata.byrComRegno);
				$('#status').val(rdata.status);
				// 담당자 정보
				$('#supEmpName').html("공급자 : " + rdata.supEmpName);
				$('#supEmail').html(rdata.supEmail);
				$('#supTelNum').html(rdata.supTelNum);
				$('#byrEmpName').html("공급받는자 : " + rdata.byrEmpName);
				$('#byrEmail').html(rdata.byrEmail);
				$('#byrTelNum').html(rdata.byrTelNum);
				if( null == rdata.brkEmpName ){
					$("#brk").hide();
				}else{
					$('#brkEmpName').html("수탁자 : " + rdata.brkEmpName);
					$('#brkEmail').html(rdata.brkEmail);
					$('#brkTelNum').html(rdata.brkTelNum);
				}			
				// 국세청 전송 결과
				if( null != rdata.sendRequest ){
					var ntsStatus;
					switch(rdata.sendRequest){
						case '9':
						ntsStatus = '미전송';
						break;
						case '0':
						ntsStatus = '전송중';
						break;
						case '1':
						ntsStatus = '전송중';
						break;
						case '2':
						ntsStatus = '전송중';
						break;
						case '3':
						ntsStatus = '전송중';
						break;
						case '7':
						ntsStatus = '전송중';
						break;
						default : 
						ntsStauts='미전송';
						break;
					}
					$('#sendRequest').html("국세청 전송 결과 : " + ntsStatus);
				}
				
				if( null != rdata.sendRequestDesc )
				$('#sendRequestDESC').html("사유 " + rdata.sendRequestDesc);
				 
			},
			error: function(error) {
				alert(error['msg']);
			}
		});

    });
	// Handle click on "Select all" control
	$('thead input[name="select_all"]', table.table().container()).on('click', function(e) {
		if (this.checked) {
			$('#t1 tbody input[type="checkbox"]:not(:checked)').trigger('click');
		} else {
			$('#t1 tbody input[type="checkbox"]:checked').trigger('click');
		}
		// Prevent click event from propagating to parent
		e.stopPropagation();
	});
	// Handle table draw event
	table.on('draw', function() {
		// Update state of "Select all" control
		updateDataTableSelectAllCtrl(table);
	});
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
					{title: "사업자번호", data: "regno"},
					{title: "회사명", data: "name"},
					{title: "작성일자", data: "wdate"},
					{title: "상태", data: "status"},
					{title: "공급가액", data: "supAmount"},
					{title: "conversationID", data: "conversationID"},
					{title: "direction", data: "direction"},
					{title: "DTITYPE", data: "dtiType"},
					{title: "승인번호", data: "issueID"},
					{title: "국세청", data: "sendStatus"},
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
						'targets': 4,
						'className': 'dt-body-center',
						'render': function (data, type, full, meta){
							var status;
							switch(data){
								case 'S' :
								status = '저장';
								break;
								case 'A' :
								status = '저장';
								break;
								case 'I' :
								status = '수신미승인';
								break;
								case 'C' :
								status = '승인';
								break;
								case 'O' :
								status = '발행취소';
								break;
								case 'V' :
								status = '역발행요청';
								break;
								case 'R' :
								status = '수신거부';
								break;
								case 'T' :
								status = '역발행요청거부';
								break;
								case 'W' :
								status = '역발행요청취소';
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
						'targets': [ 1, 2, 3, 4, 5 ],
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
					table.row.add({
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
						}).draw();
				}
			}else if ( "AP" == supbuyType ) { //매입보관함
				for ( var i = 0; i < totalCount; i++ ) {
					table.row.add({
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
						}).draw();
				}
			}
		} else {
			alert( "데이터가 존재하지 않습니다." );
		}
	}
}

function fnGetXML(data, arrDirection, arrStatus, supbuyType){
	if ("30000" != data.ResultCode) {
	 alert(data.ResultMessage);
	}else{
		var totalCount = data.ResultDataSet.Table1.length;
		var suc = 0;
		var err = 0;
		if(0 < totalCount){
			for(var i = 0 ; i < totalCount ; i++){
				var conversationID = data.ResultDataSet.Table1[i].CONVERSATION_ID; //참조번호
				var direction = arrDirection[i];
				var status = arrStatus[i];
				var DTI = data.ResultDataSet.Table1[i].DTI_XML; //세금계산서 원본
				var DTT = data.ResultDataSet.Table1[i].DTT_XML; //거래명세서 원본

				if(DTT.legnth != 0){
					//var returnMSG = insertData(xmlParse(conversationID, supbuyType, direction, status, DTT));
				}
				var returnMSG = insertData(xmlParse(conversationID, supbuyType, direction, status, DTI));
				if(returnMSG){
					suc = suc + 1;
				}else{
					err = err + 1;
				}
			}
			alert('성공 : '+ suc + ' 실패 : '+ err);
			search(supbuyType);
		}
		else{
			alert("데이터가 존재하지 않습니다.");
		}
	}
}

function insertData(jsonData){
	var returnMSG;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "save",
		async: false,
		data: jsonData,
		success: function(data) {
			returnMSG = true;
		},
		error: function(error) {
			returnMSG = false;
		}
	});
	return returnMSG;
}

function updateStatus(signal, conversationID, supbuyType, reason){
	var request = JSON.stringify({
		'signal': signal,
		'conversationID': conversationID,
		'supbuyType': supbuyType,
		'reason': reason
	});
	$.support.cors = true;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "updateStatus",
		data: request,
		success: function(data) {
			alert("업데이트 완료!");
		},
		error: function(error) {
			alert(error);
		}
	});
}

function updateMSG(conversationID, supbuyType, dtiMSG){
	var request = JSON.stringify({
		'conversationID': conversationID,
		'supbuyType': supbuyType,
		'dti_msg' : dtiMSG
	});
	$.support.cors = true;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "updateMSG",
		data: request,
		success: function(data) {
			return true;
		},
		error: function(error) {
			return false;
		}
	});
}

function deleteData(){
	var result;
	var request = JSON.stringify({
		'conversationID': $('#conversationID').val(),
		'supbuyType' : $('#supbuyType').val()
	});
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "delete",
		async: false,
		data: request,
		success: function(data) {
			result = true;
		},
		error: function(error) {
			result = false;
		}
	});
	return result;
}

function renewStatus(data){
	var dtiIdate, dtiSdate;
	dtiIdate = data.ResultDataSet.Table[0].DTI_ISSUEDATE;
	dtiSdate = data.ResultDataSet.Table[0].NTS_SEND_DATE;
	if(!isDate(dtiIdate)){
		dtiIdate = null;
	}
	if(!isDate(dtiSdate)){
		dtiSdate = null;
	}
	var request = JSON.stringify({
		'supbuyType' : $('#supbuyType').val(),
		'issueID': data.ResultDataSet.Table[0].ISSUE_ID,
		'conversationID': data.ResultDataSet.Table[0].ETC_PCS_NO,
		'status':  data.ResultDataSet.Table[0].DTI_STATUS,
		'NTSstatus':  data.ResultDataSet.Table[0].NTS_SEND_STATUS,
		'NTSCode':  data.ResultDataSet.Table[0].NTS_RESULT_CODE,
		'dtiIdate':  dtiIdate,
		'dtiSdate':  dtiSdate
	});
	$.support.cors = true;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "renewStatus",
		data: request,
		success: function(data) {
			return true;
		},
		error: function(error) {
			return false;
		}
	});
}

function onPrint() {
	var w = window.open();
	self.focus();
	w.document.open();
	const printContents = document.getElementById('viewForm').innerHTML;
	w.document.write(printContents);
	w.print();
	w.close();
}

function initView(){
	$("#RARREQUEST").hide();
	$("#ARISSUE").hide();
	$("#RARISSUE").hide();
	$("#APPROVE").hide();
	$("#REJECT").hide();
	$("#CANCELREQUEST").hide();
	$("#RIREJECT").hide();
	$("#CANCELALL").hide();
	$("#SENDMAIL").hide();
	$("#SENDHOMETAX").hide();
	$("#TAXSTATUS").hide();
	$("#AMEND").hide();
	$("#EDIT").hide();
	$("#DEL").hide();

	$('#supEmpName').html("");
	$('#supEmail').html("");
	$('#supTelNum').html("");
	$('#byrEmpName').html("");
	$('#byrEmail').html("");
	$('#byrTelNum').html("");
	$('#brkEmpName').html("");
	$('#brkEmail').html("");
	$('#brkTelNum').html("");
	$('#status').html("");
	$('#sendRequest').html("");
	$('#sendRequestDESC').html("");

	$('#conversationID').val("");
	$('#supbuyType').val("");
	$('#supRegno').val("");
	$('#byrRegno').val("");
}

function changeStatus(signal){
	var arrConvId = new Array();
	var supbuyType, sendRegno, receiveRegno, reason, token;
	arrConvId[0] = $('#conversationID').val();
	supbuyType = $('#supbuyType').val();
	token = $('#token').val();
	sendRegno = $('#comRegno').val();
	if('AP' == supbuyType){
		receiveRegno = $('#supRegno').val();
	}else{
		receiveRegno = $('#byrRegno').val();
	}
	reason = "";
	switch(signal){
		case 'REJECT' :
		reason = prompt('사유 입력');
		break;
		case 'CANCELRREQUEST' :
		reason = prompt('사유 입력');
		break;
		case 'RIREJECT' :
		reason = prompt('사유 입력');
		break;
		case 'CANCELALL' :
		reason = prompt('사유 입력');
		break;
	}
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'CHGSTATUS',
		'RequestTime': nowDate(),
		'SendComRegno': sendRegno,
		'ReceiveComRegno': receiveRegno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'SystemType': 'OAPI',
		'ConversationId': arrConvId,
		'supbuyType': supbuyType,
		'StatusSignal': signal,
		'StatusReason': reason
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
			}else{
				alert("전송 완료!");
				updateStatus(signal, data.ConversationId, supbuyType, reason);
			}
		},
		error: function (error) {
			alert("send error");
		//error 처리
		}
	});
}

function sbSearch(supbuyType) {
	var fromDate = $('#SBfrom').val();
	var endDate = $('#SBend').val();
	var token = $('#token').val();
	var comregno = $('#comRegno').val();
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'ARAP_REPO',
		'RequestTime': nowDate(),
		'SendComRegno': comregno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'SearchFromDate': fromDate,
		'SearchToDate': endDate,
		'SearchComRegno': '',
		'RepoTypeCode': supbuyType
	});
	$.support.cors = true;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "http://demoapi.smartbill.co.kr/sb-api/request/",
		data: request,
		success: function(data) {
			SBGetList(data, supbuyType);
		},
		error: function(error) {
			alert(error.message);
		}
	});
}

function uploadXML(supbuyType) {
	var dataset = {};
	var arrConvId = new Array();
	var arrDirection = new Array();
	var arrStatus = new Array();
	var comregno = $('#comRegno').val();
	var token = $('#token').val();
	dataset = $('#t2').DataTable().rows('.selected').data();
	for (var i = 0; i < dataset.length; i++) {
		arrConvId[i] = dataset[i].conversationID;
		arrDirection[i] = dataset[i].direction;
		arrStatus[i] = dataset[i].status;
	}
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'VIEW_XML',
		'RequestTime': nowDate(),
		'SendComRegno': comregno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'ConversationId': arrConvId
	});
	$.support.cors = true;
	$.ajax({
		type: "POST",
		dataType: "json",
		crossDomain: true,
		contentType: "application/json",
		url: "http://demoapi.smartbill.co.kr/sb-api/request/",
		data: request,
		success: function(data) {
			fnGetXML(data, arrDirection, arrStatus, supbuyType);
		},
		error: function(error) {
			alert("error");
		}
	});
}

function updateXML(conversationID, supbuyType){
	var result;
	$.support.cors = true;
	$.ajax({
		type: "POST",
		crossDomain: true,
		url: 'getXML',
		data: {conversationID : conversationID, dtiType : '', supbuyType : supbuyType},
		success: function(data) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(data['xml'][0].dti_msg, "text/xml");
			//var xsl = parser.parseFromString(data['html'], "text/xml");
			var issueDateTime = xmlDoc.getElementsByTagName("IssueDateTime")[0].childNodes[0];
			issueDateTime.nodeValue = nowDate().replace(/-/gi,'') + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
			var dtiMSG = (new XMLSerializer()).serializeToString(xmlDoc);
			if(updateMSG(conversationID, supbuyType, dtiMSG)){
				result = dtiMSG;
			}else{
				console.log('업데이트 실패');
				result = false;
			}
		},
		error: function (error) {
			console.log('data 불러오기 실패');
			result = false;
		}
	});
	return result;
}

function sendData(signal){
    var comRegno = $('#comRegno').val();
	var token = $('#token').val();
	var arrConvId = new Array();
	arrConvId[0] = $('#conversationID').val();
	var supbuyType = $('#supbuyType').val();
	var dtiMSG = updateXML(arrConvId[0], supbuyType);
	var receiveComRegno;
	if(!dtiMSG){
		alert('XML 원본 가져오기 실패');
		return;
	}
    switch(signal){
        case 'ARISSUE' :
			receiveComRegno = $('#byrRegno').val();
		break;
		case 'RARREQUEST' :
			receiveComRegno = $('#supRegno').val();
		break;
        case 'RARISSUE' :
			receiveComRegno = $('#byrRegno').val();
        break;
    }
    var request = JSON.stringify({
        'MessageId': guid(),
        'Signal': signal,
        'RequestTime': nowDate(),
        'SendComRegno': comRegno,
        'ReceiveComRegno': receiveComRegno,
        'AuthToken': token,
        'ServiceCode': 'DTI',
        'SystemType': 'OAPI',
        'ConversationId': arrConvId,
        'SMTPEmail': '',
//        'RValue': '', // 서명모듈 이용해서 발행할 경우에만 필요
        'CertPassword': 'signgate1!', // 암호화된 인증서의 비밀번호
        'SystemId': '',
        'PlatformCode': '',
        'SignedXML': dtiMSG // 세금계산서 xml
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

function sendEmail(signal){
	var token = $('#token').val();
	var comregno = $('#comRegno').val();
	var arrConvId = new Array();
	arrConvId[0] = $('#conversationID').val();
	var arrEmail = new Array();
	arrEmail[0]  = prompt('email 주소 입력');
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'SENDMAIL',
		'RequestTime': nowDate(),
		'SendComRegno': comregno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'SystemType': 'OAPI',
		'ConversationId': arrConvId,
		'StatusSignal': signal,
		'Email': arrEmail
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
			if ("30000" != data.ResultCode){
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

function sendNTS(){
	var comRegno = $('#comRegno').val();
	var token = $('#token').val();
	var arrConvId = new Array();
	arrConvId[0] = $('#conversationID').val();
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'NTS_REQUEST',
		'RequestTime': nowDate(),
		'SendComRegno': comRegno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'SystemType': 'OAPI',
		'ConversationId': arrConvId
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

function renew(){
	var comRegno = $('#comRegno').val();
	var token = $('#token').val();
	var supbuyType = $('#supbuyType').val();
	var arrConvId = new Array();
	arrConvId[0] = $('#conversationID').val();
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'DTI_ISSUE_RESULT',
		'RequestTime': nowDate(),
		'SendComRegno': comRegno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'SystemType': 'OAPI',
		'ConversationId': arrConvId,
		'supbuyType': supbuyType
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
				renewStatus(data);
			}
		},
		error: function (error) {
			alert(error);
		}
	});
}

function resultMail(){
	var comRegno = $('#comRegno').val();
	var token = $('#token').val();
	var arrConvId = new Array();
	arrConvId[0] = $('#conversationID').val();
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'MAIL_RESULT',
		'RequestTime': nowDate(),
		'SendComRegno': comRegno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'ConversationId': arrConvId
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
			var sendhistory = "전송여부 | " +  "열람여부 | "  + "열람일자\n";
			totalCount = data.ResultDataSet.Table.length;
			if(0 < totalCount){
				for(var i = 0 ; i < totalCount ; i++){
					var openDate, openYN, sendYN;
					openDate = data.ResultDataSet.Table[i].OPEN_DATE; //메일 열람 일자
					openYN = data.ResultDataSet.Table[i].OPEN_YN; //메일 열람 여부
					sendYN = data.ResultDataSet.Table[i].SUCCESS_YN; //메일 전송 여부
					if(null == openDate){
						openDate = '--------';
					}
					if(openYN == 'Y'){
						openYN = 'O';
					}else{
						openYN = 'X';
					}
					if(sendYN == 'Y'){
						sendYN = 'O';
					}else{
						sendYN = 'X';
					}
					sendhistory = sendhistory  + openYN + ' | ' + sendYN + ' | ' + openDate  + '\n';
				}
				alert(sendhistory);
			}
			else{
				alert("수신 이력 없음");
			}
		},
		error: function (error) {
			alert(error);
		}
	});
}

function dtiHistory(){
	var comRegno = $('#comRegno').val();
	var token = $('#token').val();
	var arrConvId = new Array();
	arrConvId[0] = $('#conversationID').val();
	var request = JSON.stringify({
		'MessageId': guid(),
		'Signal': 'DTI_HISTORY',
		'RequestTime': nowDate(),
		'SendComRegno': comRegno,
		'AuthToken': token,
		'ServiceCode': 'DTI',
		'SystemType': 'OAPI',
		'ConversationId': arrConvId
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
			}else{
				totalCount = data.ResultDataSet.Table.length;
				if(0 < totalCount){
					var resultData = "일자 | " +  "회사명 | "  + "상태 | " + "담당자명" + "\n";
					for(var i = 0 ; i < totalCount ; i++){
						var cdate, comName, status, wdate, memName, reason;
						cdate = data.ResultDataSet.Table[i].CDATE; //생성일자
						comName = data.ResultDataSet.Table[i].COM_NAME; //회사명
						status = data.ResultDataSet.Table[i].DTI_STATUS; //세금계산서 상태
						wdate = data.ResultDataSet.Table[i].DTI_WDAY; //세금계산서 작성일자
						memName = data.ResultDataSet.Table[i].MEM_NAME; //담당자명
						reason = data.ResultDataSet.Table[i].REASON; //사유
						data.ResultDataSet.Table[i].SEQ_NUM;
						switch(status){
							case 'S' :
							status = '저장';
							break;
							case 'A' :
							status = '저장';
							break;
							case 'I' :
							status = '발행';
							break;
							case 'C' :
							status = '승인';
							break;
							case 'O' :
							status = '취소';
							break;
							case 'V' :
							status = '발행요청';
							break;
							case 'R' :
							status = '수신거부';
							break;
							case 'T' :
							status = '역발행요청거부';
							break;
							case 'W' :
							status = '발행요청취소';
							break;
						}
						resultData = resultData  + cdate + " | " + comName + " | " + status + " | " + memName + "\n";
					}
					alert(resultData);
				}else{
					alert("데이터가 존재하지 않습니다.");
				}
			}
		},
		error: function (error) {
			alert(error);
		}
	});
}

$("#dtiType").click(function() {
	if ($("#dtiType").prop("checked")) {
		$("input[name=dtiType]").prop("checked", true);
	} else {
		$("input[name=dtiType]").prop("checked", false);
	}
});

$("#dtiStatus").click(function() {
	if ($("#dtiStatus").prop("checked")) {
		$("input[name=dtiStatus]").prop("checked", true);
	} else {
		$("input[name=dtiStatus]").prop("checked", false);
	}
});

$("#taxDemand").click(function() {
	if ($("#taxDemand").prop("checked")) {
		$("input[name=taxDemand]").prop("checked", true);
	} else {
		$("input[name=taxDemand]").prop("checked", false);
	}
});

$("#direction").click(function() {
	if ($("#direction").prop("checked")) {
		$("input[name=direction]").prop("checked", true);
	} else {
		$("input[name=direction]").prop("checked", false);
	}
});

$('#SBData').click(function(){
	var modal = document.getElementById("SBModal");
	modal.style.display = "block";
});

$('#viewClose').click(function(){
	var modal = document.getElementById("viewModal");
	modal.style.display = "none";
	$('#viewForm').html("");
	initView();
});

$('#SBClose').click(function(){
	var modal = document.getElementById("SBModal");
	modal.style.display = "none";
	if($('#t2').html() != ""){
		$('#t2').DataTable().destroy();
		$('#t2').html("");
	}
});

$('#RARREQUEST').click(function(){

});

$('#ARISSUE').click(function(){
	var request = JSON.stringify({
		'conversationID': $('#conversationID').val(),
		'supbuyType'  : $('#supbuyType').val()
	});
	selectData(request);
});

$('#RARISSUE').click(function(){

});

$('#APPROVE').click(function(){
	changeStatus("APPROVE");
});

$('#REJECT').click(function(){
	changeStatus("REJECT");
});

$('#CANCELREQUEST').click(function(){
	changeStatus("CANCELREQUEST");
});

$('#RIREJECT').click(function(){
	changeStatus("RIREJECT");
});

$('#CANCELALL').click(function(){
	changeStatus("CANCELALL");
});

$('#SENDMAIL').click(function(){
	var supbuyType, signal, status;
	status = $('#status').val();
	supbuyType = $('#supbuyType').val();
	switch(status){
		case 'I' :
			if('AP' == supbuyType){
				signal = 'RARISSUE';
			}else{
				signal = 'ARISSUE';
			}
		break;
		case 'C' :
			if('AP' == supbuyType){
				signal = 'RARISSUE';
			}else{
				signal = 'ARISSUE';
			}
		break;
		case 'V' :
			signal = 'RARREQUEST';
		break;
	}
	alert(status);
	sendEmail(signal);
});

$('#SENDHOMETAX').click(function(){
	sendNTS();
});

$('#TAXSTATUS').click(function(){
	renew();
});

$('#AMEND').click(function(){

});

$('#COPY').click(function(){

});

$('#EDIT').click(function(){

});

$('#DEL').click(function(){
	if(deleteData()){
		alert('success');
		if('AP' == $('#supbuyType').val()){
            location.href='/dti/list/APlist';
        }else{
            location.href='/dti/list/ARlist';
        }
	}else{
		alert('fail');
	}
});

$('#resultMail').click(function(){
	resultMail();
});

$('#dtiHistory').click(function(){
	dtiHistory();
});

$('#print').click(function(){
	onPrint();
});