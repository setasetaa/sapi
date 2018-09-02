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

function search(url) {
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

function SBGetList(data, supbuyType){
  if ("30000" != data.ResultCode) {
   alert(data.ResultMessage);
  }else{
    alert("정상적으로 처리되었습니다.");
    totalCount = data.ResultDataSet.Table.length;
		var table = $('#t2').DataTable({
			retrieve: true,
			select: {
				style: 'os',
				selector: 'td:first-child'
			},
			order: [
				[1, 'asc']
			],
			searching: false,
			columns: [
				{title : "", data : "" },
				{title : "B / N",  data : "regno" },
				{title : "Com Name", data : "name"},
				{title : "status", data : "status"},
				{title : "WDATE", data : "wdate"},
				{title : "SUP AMOUNT", data : "supAmount"},
				{title : "conversationID", data : "conversationID"},
				{title : "direction", data : "direction"},
				{title : "dtiType", data : "dtiType"},
				{title : "issueID", data : "issueID"},
				{title : "sendStatus", data : "sendStatus"},
				{title : "email", data: "email"}
			],
			columnDefs: [
				{
					orderable: false,
					className: 'select-checkbox',
					targets: 0
				},
				{
					"targets" : [6,7,8,9,10,11],
					"visible" : false
				}
			]
		});

    if(0 < totalCount){
       if("AR" == supbuyType){ //매출보관함
         for(var i = 0 ; i < totalCount ; i++){
					 table.row.add({
						 "" : "",
						 "name": data.ResultDataSet.Table[i].BYR_COM_NAME, //공급받는자 회사명
	           "regno": data.ResultDataSet.Table[i].BYR_COM_REGNO, //공급받는자 사업자번호
	           "direction": data.ResultDataSet.Table[i].DIRECTION, //세금계산서 정/역 구분
	           "status": data.ResultDataSet.Table[i].DTI_STATUS, //세금계산서 상태
	           "dtiType": data.ResultDataSet.Table[i].DTI_TYPE, //세금계산서 종류
	           "wdate": data.ResultDataSet.Table[i].DTI_WDAY, //세금계산서 작성일자
	           "conversationID": data.ResultDataSet.Table[i].ETC_PCS_NO, //세금계산서 참조번호
	           "issueID": data.ResultDataSet.Table[i].ISSUE_ID, //세금계산서 승인번호
	           "sendStatus": data.ResultDataSet.Table[i].NTS_SEND_STATUS, //세금계산서 국세청 전송상태
	           "supAmount": data.ResultDataSet.Table[i].SUP_AMT, //세금계산서 공급가액
	           "email": data.ResultDataSet.Table[i].SUP_EMAIL //담당자 이메일
					 }).draw();
         }
       }else if("AP" == supbuyType){ //매입보관함
         for(var i = 0 ; i < totalCount ; i++){
					 table.row.add({
						 "" : "",
						 "name": data.ResultDataSet.Table[i].SUP_COM_NAME, //공급받는자 회사명
	           "regno": data.ResultDataSet.Table[i].SUP_COM_REGNO, //공급받는자 사업자번호
	           "direction": data.ResultDataSet.Table[i].DIRECTION, //세금계산서 정/역 구분
	           "status": data.ResultDataSet.Table[i].DTI_STATUS, //세금계산서 상태
	           "dtiType": data.ResultDataSet.Table[i].DTI_TYPE, //세금계산서 종류
	           "wdate": data.ResultDataSet.Table[i].DTI_WDAY, //세금계산서 작성일자
	           "conversationID": data.ResultDataSet.Table[i].ETC_PCS_NO, //세금계산서 참조번호
	           "issueID": data.ResultDataSet.Table[i].ISSUE_ID, //세금계산서 승인번호
	           "sendStatus": data.ResultDataSet.Table[i].NTS_SEND_STATUS, //세금계산서 국세청 전송상태
	           "supAmount": data.ResultDataSet.Table[i].SUP_AMT, //세금계산서 공급가액
	           "email": data.ResultDataSet.Table[i].BYR_EMAIL //담당자 이메일
					 }).draw();
         }
      }
    }else{
     alert("데이터가 존재하지 않습니다.");
   }
  }
}
