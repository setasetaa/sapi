<?xml version="1.0" encoding="utf-8"?>
<!-- (공급자용) 매출 세금계산서 -->
<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:dti="http://www.kiec.or.kr/kis"
		xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
    xmlns:sb="urn:kr:or:kec:standard:Tax:ReusableAggregateBusinessInformationEntitySchemaModule:1:0">
  <xsl:output method="html"/>


  <xsl:template match="/">

    <html>
      <head>
        <!-- 헤더 정보 보이기 호출 -->
        <xsl:call-template name="DTIHeader"/>
          <style type="text/css">
          @charset "utf-8";
          /* CSS Document */

          /* smart clover에쓰인 공통 사항 START*/
          /* Default Type Selector */
          *{margin:0; padding:0; font-size:10px; font-family:NanumGothic;}
          a,img,input {selector-dummy:expression(this.hideFocus=true);}/* 링크점선없애기 */
          caption	{display:none;}
          td,div,table{background:none;}

          /* 일반적인 텍스트 롤오버및 링크 */
          a:link     {font-family: NanumGothic ; font-size: 12px; color: #666666;	text-decoration: none; line-height:150% ;}
          a:visited  {font-family: NanumGothic ; font-size: 12px; color: #666666;	text-decoration: none; line-height:150%  ;}
          a:hover    {font-family: NanumGothic ; font-size: 12px; color: #2F488A;	text-decoration: underline;line-height:150% ;}

          /* 테이블에 대한 기본 스타일 정의 */
          td  {font-family: NanumGothic, 돋움, Dotum, 굴림, Gulim, Arial, sans-serif, Verdana, Helvetica, geneva; font-size: 10px; line-height:150% ; color: #666666; padding:0;  word-wrap:break-word;}
          th {font-weight: 300}
          /*// smart clover에쓰인 공통 사항 END */

          #print_wrap{width:650px; /*margin:0 4px;*/}

          /* 인쇄 옵션 START*/
          #print_option{width:100%; padding-bottom:10px;}
          #print_option_con{background:url(../image/center/print_bg.gif) repeat-y; padding:13px 0 9px 0;}
          #pOption{width:620px; margin:0 auto; overflow:hidden}
          /* 인쇄옵션 테이블 */
          .pOption_table{width:520px; float:left; border-top:#a6c2de solid 1px; border-left:#a6c2de solid 1px; border-right:#a6c2de solid 1px; line-height:24px;}
          .pOption_table th,.pOption_table th td{height:24px; background:#FFF; padding-top:3px; border-bottom:#a6c2de solid 1px;}
          .pOption_table th{font-weight:normal; border-bottom:#a6c2de solid 1px; border-right:#a6c2de solid 1px; text-align:left; padding-left:20px; background:url(../image/common/bul_blue.gif) 10px 12px no-repeat; background-color:#FFF; color:#000;}
          .pOption_table td{font-weight:normal; padding-left:8px; border-bottom:#a6c2de solid 1px;}
          #pOption_btnPrint{float:left; margin-left:9px; padding-top:4px; height:53px;}
          /* 인쇄옵션 안내 */
          #pOption_info{clear:both; padding:15px 0 0 11px;}
          .pOption_txt01{height:22px; line-height:22px;}
          .pOption_txt01 txt,img{vertical-align:middle;}
          .pOption_txt02{padding:15px 0 10px 0; color:#D93300;}
          .print_blueB{font-weight:bold; color:#2f488a;}

          #print_bottom{height:2px; background:url(../image/center/print_bottom.gif) no-repeat;}
          /*// 인쇄 옵션 END*/

          /* 담당자 정보 START */
          .manager{margin-bottom:20px; }
          .table_manager{border-top:#c8dbef solid 1px; border-bottom:#c8dbef solid 1px; border-collapse:collapse; width:100%;}
          .table_manager th,.table_manager td{padding:3px 0 0 8px; border:none; text-align:left; }
          .table_manager th{color:#3f7dc5; font-weight:normal; padding-left:29px; background:url(../image/common/bul_blue.gif) 18px 12px no-repeat; vertical-align:top; padding-top:7px; }
          .table_manager .manager_cell{background:url(../image/common/cell_line.gif) 0 8px no-repeat;}
          .table_manager .th_line{border-bottom:#e9eaea solid 1px;}
          .table_manager .td_line{border-bottom:#e9eaea solid 1px;}
          .table_manager .cell_line{border-bottom:#e9eaea solid 1px; background:url(../image/common/cell_line.gif) 0 8px no-repeat;}
          /*// 담당자 정보 END */

          /* 파일첨부 START */
          .add_file{margin-bottom:30px;}
          .table_AddFile{border-top:#a6c2de solid 1px; border-bottom:#a6c2de solid 1px; border-collapse:collapse; width:100%;}
          .table_AddFile th,.table_AddFile td{border:none; text-align:left; padding-top:3px;}
          .table_AddFile th{background:#f1f6fa; padding-left:25px; font-weight:normal;}
          .table_AddFile .FileName{font-weight:bold; text-align:center;}
          /*// 파일첨부 END */


          /* 전자세금계산서 보기 START */
          .tax_invoice{width:646px; padding:0 2px; margin-top:20px; color: #666;}

          /* 스탬프 위치 */
          .divStamp{position:absolute; left:364px; top:114px; width:182px; height:131px; z-index:-2;}
          .divStamp2{position:absolute; left:272px; top:65px; width:50px; height:50px; z-index:-2;}
          .divStamp3{position:absolute; left:592px; top:240px; width:50px; height:50px; z-index:-2;}

          .pinfo{width:646px; height:11px; padding-top:5px;}
          .pinfo ul{padding:0; margin:0;}
          .tli01{display:inline; float:left;}
          .tli02{display:inline; float:right;}
          .tinfo{width:646px; font-size:12px; line-height:18px; padding:0; margin-top:7px; padding-bottom:16px; background:url(../images/bg_dot3.gif) 0 51px repeat-x;}
          .ptxt{font-weight:bold; text-decoration:underline;}
          .ptxt A:link     {color:#666; text-decoration:none;}
          .ptxt A:visited  {color:#666; text-decoration:none;}
          .ptxt A:hover    {color:#666; text-decoration:none;}

          /******************* Red **********************/
          .tax_table {position:relative; border:#e66464 solid 1px; padding:1px; z-index:99999; width:642px;}
          /* 테이블 헤더 start */
          .tax_invoice01 {border-top:#e66464 solid 1px; border-left:#e66464 solid 1px; border-right:#e66464 solid 1px; border-collapse:collapse; width:100%; table-layout:fixed;  z-index:999; position:relative;}
          .tax_invoice01 td {border-bottom:#e66464 solid 1px; color:#666; padding:2px 0 0 2px; background:none;}
          .tax_invoice01 th{padding:4px 0 1px 0; line-height:150%; color:#fe6d69; font-weight:normal; border-bottom:#e66464 solid 1px;}
          .title{font-size:18px; font-weight:bold; color:#fe6d69; text-align:center;}
          .title_long{font-size:12px; font-weight:bold; color:#fe6d69; text-align:center;}
          .td2{text-align:center; letter-spacing:0.3em;}
          .tax_invoice01 td.td3{color:#666; border-left:#e66464 solid 1px; border-bottom:#e66464 solid 1px;}
          .td4{border-right:#e66464 solid 1px;}
          .cell_right01{text-align:right;}
          /* // 테이블 헤더 end */

          /* 테이블 start */
          .tax_invoice02 {margin-top:2px; border-top:#e66464 solid 1px; border-right:#e66464 solid 1px; border-collapse:collapse; width:100%;  table-layout:fixed; word-break:break-all; z-index:999; position:relative;}
          .tax_invoice02 td {border-bottom:#e66464 solid 1px; border-left:#e66464 solid 1px; padding:2px 2px 0 2px; color:#666; vertical-align:middle;}
          .tax_invoice02 th{border-bottom:#e66464 solid 1px; border-left:#e66464 solid 1px;  font-weight:normal; color:#fe6d69; text-align:center; padding:4px 0 1px 0; line-height:150%; vertical-align:middle;}
          .tax_invoice02 th .invoice02_th{border:none;  font-weight:normal; color:#fe6d69; text-align:center;}

          .tax_bold01{font-weight:bold; text-align:center; font-size:13px;}
          .tax_invoice02 .td_chargeL{text-align:left; padding:0; border-bottom:#e66464 solid 1px; border-left:0;}
          .tax_invoice02 .td_chargeR{text-align:right; padding:0; border-left:#e66464 solid 1px; border-bottom:#e66464 solid 1px;}
          .tax_invoice02 .td_chargeC{text-align:center; padding:0; border-left:0; border-top:0;}
          /*.tax_invoice02 .li0201{color:#666; text-decoration:underline;}*/
          .tax_invoice02 .li0202{color:#666; font-weight:bold;}
          .tax_invoice02 .fontB{font-weight:bold;}
          .center{text-align:center;}
          .no_PaddingLR{padding-left:0; padding-right:0;}

          .tax_invoice02 .BDouble{border-left:#e66464 double 1px; border-left-width:3px;}
          .tax_invoice02 .title02-2{color:#fe6d69; text-align:center; line-height:15px; padding:3px 0 0 0;}
          .tax_invoice02 .td_height01{height:50px;}

          /* 20140128 추가 */
          .font11{font-size:11px;}
          .td31{height:31px;}

          /* // 테이블 end */
          /*// 전자세금계산서-공급자용 END */


          /******************* Blue **********************/
          .tax_table_Blue {position:relative; border:#666699 solid 1px; padding:1px; z-index:99999; width:642px;}
          /* 테이블 헤더 start */
          .tax_invoice01_Blue {border-top:#666699 solid 1px; border-left:#666699 solid 1px; border-right:#666699 solid 1px; border:#666699 solid 1px; border-collapse:collapse; width:100%; height:auto; table-layout:fixed; z-index:999; position:relative;}
          .tax_invoice01_Blue td {border-bottom:#666699 solid 1px; color:#666; padding:2px 0 0 2px; background:none;}
          .tax_invoice01_Blue th{padding:4px 0 1px 0; line-height:150%; color:#666699; font-weight:normal; border-bottom:#666699 solid 1px;}
          .title_Blue{font-size:18px; font-weight:bold; color:#666699; text-align:center;}
          .title_long_Blue{font-size:12px; font-weight:bold; color:#666699; text-align:center;}
          .tax_invoice01_Blue td.td3_Blue{color:#666; border-left:#666699 solid 1px; border-bottom:#666699 solid 1px;}
          .td4_Blue{border-right:#666699 solid 1px;}
          /* // 테이블 헤더 end */

          /* 테이블 start */
          .tax_invoice02_Blue {margin-top:2px; border-top:#666699 solid 1px; border-right:#666699 solid 1px; border-collapse:collapse; width:100%; table-layout:fixed; word-break:break-all; z-index:999; position:relative;}
          .tax_invoice02_Blue td {border-bottom:#666699 solid 1px; border-left:#666699 solid 1px; padding:2px 2px 0 2px; color:#666; vertical-align:middle;}
          .tax_invoice02_Blue th{border-bottom:#666699 solid 1px; border-left:#666699 solid 1px;  font-weight:normal; color:#666699; text-align:center; padding:4px 0 1px 0; line-height:150%; vertical-align:middle;}
          .tax_invoice02 th_Blue .invoice02_th_Blue{border:none;  font-weight:normal; color:#666699; text-align:center;}

          .tax_invoice02_Blue .td_chargeL{text-align:left; padding:0; border-bottom:#666699 solid 1px; border-left:0;}
          .tax_invoice02_Blue .td_chargeR{text-align:right; padding:0; border-left:#666699 solid 1px; border-bottom:#666699 solid 1px;}
          .tax_invoice02_Blue .td_chargeC{text-align:center; padding:0; border-left:0; border-top:0;}
          /*.tax_invoice02_Blue .li0201{color:#666; text-decoration:underline;}*/
          .tax_invoice02_Blue .li0202{color:#666; font-weight:bold;}
          .tax_invoice02_Blue .fontB_Blue{font-weight:bold;}

          .tax_invoice02_Blue .BDouble_Blue{border-left:#666699 double 1px; border-left-width:3px;}
          .tax_invoice02_Blue .title02-2_Blue{color:#666699; text-align:center; line-height:15px; padding:3px 0 0 0;}
          .tax_invoice02_Blue .td_height01_Blue{height:50px;}
          /* // 테이블 end */
          /*// 전자세금계산서-공급받는자용 END */

          /******************* Gray **********************/
          .tax_table_Gray {position:relative; border:#666 solid 1px; padding:1px; z-index:99999; width:642px;}
          /* 테이블 헤더 start */
          .tax_invoice01_Gray {border-top:#666 solid 1px; border-left:#666 solid 1px; border-right:#666 solid 1px; border:#666 solid 1px; border-collapse:collapse; width:100%; height:auto; table-layout:fixed; z-index:999; position:relative;}
          .tax_invoice01_Gray td {border-bottom:#666 solid 1px; color:#666; padding:2px 0 0 2px; background:none;}
          .tax_invoice01_Gray th{padding:4px 0 1px 0; line-height:150%; color:#666; font-weight:normal; border-bottom:#666 solid 1px;}
          .title_Gray{font-size:18px; font-weight:bold; color:#666; text-align:center;}
          .title_long_Gray{font-size:12px; font-weight:bold; color:#666; text-align:center;}
          .tax_invoice01_Gray td.td3_Gray{color:#666; border-left:#666 solid 1px; border-bottom:#666 solid 1px;}
          .td4_Gray{border-right:#666 solid 1px;}
          /* // 테이블 헤더 end */

          /* 테이블 start */
          .tax_invoice02_Gray {margin-top:2px; border-top:#666 solid 1px; border-right:#666 solid 1px; border-collapse:collapse; width:100%; table-layout:fixed; word-break:break-all; z-index:999; position:relative;}
          .tax_invoice02_Gray td {border-bottom:#666 solid 1px; border-left:#666 solid 1px; padding:2px 2px 0 2px; color:#666; vertical-align:middle;}
          .tax_invoice02_Gray th{border-bottom:#666 solid 1px; border-left:#666 solid 1px;  font-weight:normal; color:#666; text-align:center; padding:4px 0 1px 0; line-height:150%; vertical-align:middle;}
          .tax_invoice02 th_Gray .invoice02_th_Gray{border:none;  font-weight:normal; color:#666; text-align:center;}

          .tax_invoice02_Gray .td_chargeL{text-align:left; padding:0; border-bottom:#666 solid 1px; border-left:0;}
          .tax_invoice02_Gray .td_chargeR{text-align:right; padding:0; border-left:#666 solid 1px; border-bottom:#666 solid 1px;}
          .tax_invoice02_Gray .td_chargeC{text-align:center; padding:0; border-left:0; border-top:0;}
          /*.tax_invoice02_Gray .li0201{color:#666; text-decoration:underline;}*/
          .tax_invoice02_Gray .li0202{color:#666; font-weight:bold;}
          .tax_invoice02_Gray .fontB_Gray{font-weight:bold;}

          .tax_invoice02_Gray .BDouble_Gray{border-left:#666 double 1px; border-left-width:3px;}
          .tax_invoice02_Gray .title02-2_Gray{color:#666; text-align:center; line-height:15px; padding:3px 0 0 0;}
          .tax_invoice02_Gray .td_height01_Gray{height:50px;}
          /* // 테이블 end */
          /*// 전자세금계산서-거래명세서 END */

          /* ------------------------------------------------------------------------------------ */
          /*									Print CSS											*/
          /* ------------------------------------------------------------------------------------ */
          @media print {
          div {color:black;}
          td  {font-family:NanumGothic, 돋움, Dotum, 굴림, Gulim, Arial, sans-serif, Verdana, Helvetica, geneva; font-size: 10px; line-height:130%; color:black; padding:0;  height:auto;}
          a:link     {color:black;}
          a:visited  {color:black;}
          #print_wrap{width:100%; margin:0;}
          .page-break  {display: block; page-break-after: always; }
          .page-break_before  {display: block; page-break-before: always; }

          #print_option {display:none;}

          /******************* Red *******************/
          .tax_table {border:#d44747 solid 1px; padding:1px; *padding:2px 0 0 2px; /* ie7 */ }

          .tax_invoice01 {border-top:#d44747 solid 1px; border-left:#d44747 solid 1px; border-right:#d44747 solid 1px; border:#d44747 solid 1px; border-collapse:collapse; line-height:130%;}
          .tax_invoice01 td {border-bottom:#d44747 solid 1px; color:#d44747; padding:2px 0 0 2px; height:auto;}
          .tax_invoice01 th{padding:4px 0 1px 0; line-height:120%; color:#d44747; border-bottom:#d44747 solid 1px;}
          .title{color:#d44747;}
          .title_long{color:#d44747;}
          .tax_invoice01 td.td3{border-left:#d44747 solid 1px; border-bottom:#d44747 solid 1px;}
          .td4{border-right:#d44747 solid 1px;}

          .tax_invoice02 {border-top:#d44747 solid 1px; border-right:#d44747 solid 1px; border-collapse:collapse; line-height:130%;}
          .tax_invoice02 td {border-bottom:#d44747 solid 1px; border-left:#d44747 solid 1px; color:black; height:auto;}
          .tax_invoice02 th{border-bottom:#d44747 solid 1px; border-left:#d44747 solid 1px; color:#d44747; line-height:120%;}
          .tax_invoice02 .title02-1{color:#d44747; border-left:#d44747 solid 1px;}
          .tax_invoice02 .title02-2{color:#d44747;}
          .tax_invoice02 .BDouble{border-left:#d44747 double 1px; border-left-width:3px;}

          .tax_invoice02 .td_chargeL{border-bottom:#d44747 solid 1px;}
          .tax_invoice02 .td_chargeR{border-left:#d44747 solid 1px; border-bottom:#d44747 solid 1px;}
          /*.tax_invoice02 .li0201{color:black;}*/
          .tax_invoice02 .li0202{color:black;}
          /*.tax_invoice02 .li0201{color:black;}*/
          .font11{font-size:10px; /*font-size:9px; 20140319 합계금액 테스트*/} /* 20140128 추가 */

          /******************* Blue *******************/
          .tax_table_Blue {border:#363e86 solid 1px; padding:1px; *padding:2px 0 0 2px; /* ie7 */ }

          .tax_invoice01_Blue {border-top:#363e86 solid 1px; border-left:#363e86 solid 1px; border-right:#363e86 solid 1px; border:#363e867 solid 1px; border-collapse:collapse; line-height:130%;}
          .tax_invoice01_Blue td {border-bottom:#363e86 solid 1px; color:#363e86; padding:2px 0 0 2px; height:auto;}
          .tax_invoice01_Blue th{padding:4px 0 1px 0; line-height:120%; color:#363e86; border-bottom:#363e86 solid 1px;}
          .title_Blue{color:#363e86;}
          .title_long_Blue{color:#363e86;}
          .tax_invoice01_Blue td.td3_Blue{border-left:#363e86 solid 1px; border-bottom:#363e86 solid 1px;}
          .td4_Blue{border-right:#363e86 solid 1px;}

          .tax_invoice02_Blue {border-top:#363e86 solid 1px; border-right:#363e86 solid 1px; border-collapse:collapse; line-height:130%;}
          .tax_invoice02_Blue td {border-bottom:#363e86 solid 1px; border-left:#363e86 solid 1px; color:black; height:auto;}
          .tax_invoice02_Blue th{border-bottom:#363e86 solid 1px; border-left:#363e86 solid 1px; color:#363e86; line-height:120%;}
          .tax_invoice02_Blue .title02-1_Blue{color:#363e86; border-left:#363e86 solid 1px;}
          .tax_invoice02_Blue .title02-2_Blue{color:#363e86;}
          .tax_invoice02_Blue .BDouble_Blue{border-left:#363e86 double 1px; border-left-width:3px;}

          .tax_invoice02_Blue .td_chargeL_Blue{border-bottom:#363e86 solid 1px;}
          .tax_invoice02_Blue .td_chargeR_Blue{border-left:#363e86 solid 1px; border-bottom:#363e86 solid 1px;}
          .tax_invoice02_Blue .li0201{color:black;}
          .tax_invoice02_Blue .li0202{color:black;}

          /******************* Gray *******************/
          .tax_table_Gray {padding:1px; *padding:2px 0 0 2px; /* ie7 */ }

          .tax_invoice01_Gray {line-height:130%;}
          .tax_invoice01_Gray td {padding:2px 0 0 2px; height:auto;}
          .tax_invoice01_Gray th{padding:4px 0 1px 0; line-height:120%; color:#666;}
          .title_Gray{color:#666;}
          .title_long_Gray{color:#666;}

          .tax_invoice02_Gray {line-height:130%;}
          .tax_invoice02_Gray td {color:black; height:auto;}
          .tax_invoice02_Gray th{color:#666; line-height:120%;}
          .tax_invoice02_Gray .title02-1_Gray{color:#666;}
          .tax_invoice02_Gray .title02-2_Gray{color:#666;}
          .tax_invoice02_Gray .BDouble_Gray{border-left:#666 double 1px; border-left-width:3px;}

          .tax_invoice02_Gray .li0201{color:black;}
          .tax_invoice02_Gray .li0202{color:black;}
          }
        </style>
      </head>

      <body>
        <div class="taxBillDivision">
          <p class="taxBillFormDescription">
            &#160;&#13;&#13;&#13;<b style="color:Red">
              <xsl:value-of select="/sb:TaxInvoice/sb:SmartBillArea/sb:Reprint"/>
            </b>
          </p>
          <!-- DTI Data Area 정보 보이기 호출 -->
          <xsl:call-template name="DataArea"/>

          <br/>
          <!-- 세금계산서/계산서 주의 보이기 Start -->
          <p class="taxBillFormAttention" id="taxBillFormAttention01">
            주의 : 본 세금계산서는 국세청고시 기준에 따라
            <em>
              스마트빌(www.smartbill.co.kr)에서 발행된 전자세금계산서
            </em>로 <br/>공인인증기관의 공인인증서를 사용하여 전자서명되어 인감날인이 없어도 법적 효력을 갖습니다.
          </p>
          <p class="taxBillFormAttention" id="taxBillFormAttention02" style="display:none">
            주의: 본 전자세금계산서는 국세청 미전송건으로 국세청 전송이 완료된 이후에 법적 효력을 갖습니다. (국세청고시 제 2013-17호, 2013.4.1)
          </p>
          <!-- 세금계산서/계산서 주의 보이기 End -->
        </div>
      </body>
    </html>
  </xsl:template>


  <!-- 헤더 정보 보이기 Start -->
  <xsl:template name="DTIHeader">
    <title>:: 전자세금계산서 ::</title>
  </xsl:template>
  <!-- 헤더 정보 보이기 End -->

  <!--  DTI Data Area 정보 보이기 Start -->
  <xsl:template name="DataArea">
    <!--  DTI Data Header 정보 보이기 호출 -->
    <xsl:call-template name="DataHeader01"/>
  </xsl:template>
  <!--  DTI Data Area 정보 보이기 End -->

  <!--  DTI Data Header 정보 보이기 Start -->
  <!--  세금계산서 DTI Data Header 정보 보이기 Start -->
  <xsl:template name="DataHeader01">
    <!-- 변수 선언 시작 -->
    <xsl:variable name="HeaderDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceDocument"/>
    <xsl:variable name="SupplierPartyDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceTradeSettlement/sb:InvoicerParty"/>
    <xsl:variable name="BuyerPartyDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceTradeSettlement/sb:InvoiceeParty"/>
    <xsl:variable name="BrokerPartyDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceTradeSettlement/sb:BrokerParty"/>
    <xsl:variable name="SmartBillPath" select="/sb:TaxInvoice/dti:SmartBillArea"/>
    <xsl:variable name="LineDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceTradeLineItem"/>
    <xsl:variable name="SummaryDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceTradeSettlement/sb:SpecifiedMonetarySummation"/>
    <xsl:variable name="PaymentMeansDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceTradeSettlement/sb:SpecifiedPaymentMeans"/>
    <xsl:variable name="DescriptionTextDirPath" select="/sb:TaxInvoice/sb:TaxInvoiceDocument/sb:DescriptionText"/>
    <!-- 변수 선언 종료 -->

    <!--전자세금계산서 START -->
    <div class="tax_invoice">
      <div class="tax_table">

        <!-- 헤더 start -->
        <table class="tax_invoice01" border="0" cellspacing="0" cellpadding="0" width="100%" summary="전자세금계산서 승인번호, 관리번호">
          <caption>
            전자세금계산서 승인번호, 관리번호
          </caption>
          <colgroup>
            <col width="41%"/>
            <col width="15%"/>
            <col width="5%"/>
            <col width="12%"/>
            <col width="%"/>
          </colgroup>
          <tr>
            <th rowspan="2">
              <xsl:if test="$HeaderDirPath/sb:OriginalIssueID">
                <xsl:attribute name="rowspan">
                  3
                </xsl:attribute>
              </xsl:if>
              <h1 class="title">
                <xsl:choose>
                  <xsl:when test="string-length($HeaderDirPath/sb:AmendmentStatusCode) > 0">
                    수정
                  </xsl:when>
                </xsl:choose>
                <xsl:choose>
                  <xsl:when test="substring($HeaderDirPath/sb:TypeCode,3,2) = '02'">
                    영세율
                  </xsl:when>
                </xsl:choose>
                전자세금계산서
              </h1>
            </th>
            <th rowspan="2"  class="td2">
              <xsl:if test="$HeaderDirPath/sb:OriginalIssueID">
                <xsl:attribute name="rowspan">
                  3
                </xsl:attribute>
              </xsl:if>
              공급자<br />
              (보관용)
            </th>
            <td rowspan="2" class="td4">
              <xsl:if test="$HeaderDirPath/sb:OriginalIssueID">
                <xsl:attribute name="rowspan">
                  3
                </xsl:attribute>
              </xsl:if>
            </td>
            <th>승인번호</th>
            <td class="td3">
              <xsl:choose>
                <xsl:when test="string-length($HeaderDirPath/sb:IssueID)=24">
                  <xsl:value-of select="$HeaderDirPath/sb:IssueID"/>
                </xsl:when>
              </xsl:choose>
            </td>
          </tr>

          <xsl:if test="$HeaderDirPath/sb:OriginalIssueID">
            <tr>
              <th>당초승인번호</th>
              <td class="td3">
                <xsl:value-of select="$HeaderDirPath/sb:OriginalIssueID"/>
              </td>
            </tr>
          </xsl:if>

          <tr>
            <th>관리번호</th>
            <td class="td3">
              <xsl:value-of select="/sb:TaxInvoice/sb:ExchangedDocument/sb:ReferencedDocument/sb:ID"/>
            </td>
          </tr>
        </table>

        <table class="tax_invoice02" border="0" cellspacing="0" cellpadding="0" width="100%" summary="공급자, 공급받는자 정보">
          <caption>
            공급자, 공급받는자 정보
          </caption>
          <colgroup>
            <col width="3%"/>
            <col width="8%"/>
            <col width="17%"/>
            <col width="1%"/>
            <col width="7%"/>
            <col width=""/>
            <col width="3%"/>
            <col width="8%"/>
            <col width="17%"/>
            <col width="1%"/>
            <col width="7%"/>
            <col width=""/>
          </colgroup>
          <tr>
            <th class="title02-1 fontB" rowspan="4">공급자</th>
            <th>등록번호</th>
            <td class="tax_bold01" colspan="4">
              <xsl:value-of select="substring($SupplierPartyDirPath/sb:ID,1,3)"/>
              <xsl:value-of select="'-'"/>
              <xsl:value-of select="substring($SupplierPartyDirPath/sb:ID,4,2)"/>
              <xsl:value-of select="'-'"/>
              <xsl:value-of select="substring($SupplierPartyDirPath/sb:ID,6,5)"/>
            </td>
            <th class="title02-1 fontB" rowspan="4">공급받는자</th>
            <th>등록번호</th>
            <td class="tax_bold01" colspan="4">
              <xsl:variable name="BuyerPartyID" select="$BuyerPartyDirPath/sb:ID"/>
              <xsl:choose>
                <xsl:when test="string-length($BuyerPartyDirPath/sb:ID)=10">
                  <xsl:value-of select="substring($BuyerPartyDirPath/sb:ID,1,3)"/>
                  <xsl:value-of select="'-'"/>
                  <xsl:value-of select="substring($BuyerPartyDirPath/sb:ID,4,2)"/>
                  <xsl:value-of select="'-'"/>
                  <xsl:value-of select="substring($BuyerPartyDirPath/sb:ID,6,5)"/>
                </xsl:when>
                <xsl:when test="string-length($BuyerPartyDirPath/sb:ID)=13">
                  <xsl:value-of select="substring($BuyerPartyDirPath/sb:ID,1,6)"/>
                  <xsl:value-of select="'-'"/>
                  <xsl:value-of select="substring($BuyerPartyDirPath/sb:ID,7,7)"/>
                </xsl:when>
              </xsl:choose>
            </td>
          </tr>
          <tr>
            <th>
              상호<br />
              (법인명)
            </th>
            <td colspan="2">
              <xsl:value-of select="$SupplierPartyDirPath/sb:NameText"/>
            </td>
            <th>성명</th>
            <td>
              <xsl:value-of select="$SupplierPartyDirPath/sb:SpecifiedPerson/sb:NameText"/>
            </td>
            <th>
              상호<br />
              (법인명)
            </th>
            <td colspan="2">
              <xsl:value-of select="$BuyerPartyDirPath/sb:NameText"/>
            </td>
            <th>성명</th>
            <td>
              <xsl:value-of select="$BuyerPartyDirPath/sb:SpecifiedPerson/sb:NameText"/>
            </td>
          </tr>
          <tr>
            <th>
              사업장<br />
              주소
            </th>
            <td colspan="2">
              <xsl:value-of select="$SupplierPartyDirPath/sb:SpecifiedAddress/sb:LineOneText"/>
            </td>
            <th>
              종사업<br />
              장번호
            </th>
            <td>
              <xsl:value-of select="$SupplierPartyDirPath/sb:SpecifiedOrganization/sb:TaxRegistrationID"/>
            </td>
            <th>
              사업장<br />
              주소
            </th>
            <td colspan="2">
              <xsl:value-of select="$BuyerPartyDirPath/sb:SpecifiedAddress/sb:LineOneText"/>
            </td>
            <th>
              종사업<br />
              장번호
            </th>
            <td>
              <xsl:value-of select="$BuyerPartyDirPath/sb:SpecifiedOrganization/sb:TaxRegistrationID"/>
            </td>
          </tr>
          <tr>
            <th>업태</th>
            <td colspan="2">
              <xsl:value-of select="$SupplierPartyDirPath/sb:TypeCode"/>
            </td>
            <th>종목</th>
            <td>
              <xsl:value-of select="$SupplierPartyDirPath/sb:ClassificationCode"/>
            </td>
            <th>업태</th>
            <td colspan="2">
              <xsl:value-of select="$BuyerPartyDirPath/sb:TypeCode"/>
            </td>
            <th>종목</th>
            <td>
              <xsl:value-of select="$BuyerPartyDirPath/sb:ClassificationCode"/>
            </td>
          </tr>
        </table>
        <!--//테이블헤더 end -->

        <!--공급가액 및 세액 start -->
        <table class="tax_invoice02" border="0" cellspacing="0" cellpadding="0" summary="작성일자, 공급가액, 세액, 수정사유, 비고">
          <caption>
            작성일자, 공급가액, 세액, 수정사유, 비고
          </caption>
          <colgroup>
            <col width="11%"/>
            <col width="18%"/>
            <col width="21%"/>
            <col width=""/>
          </colgroup>
          <tbody>
            <tr>
              <th class="fontB td31">작성일자</th>
              <th class="fontB td31">공급가액</th>
              <th class="fontB td31">세 액</th>
              <th class="fontB td31">수정사유</th>
            </tr>
            <tr>
              <td class="center td31">
                <xsl:value-of select="substring($HeaderDirPath/sb:IssueDateTime,1,4)"/>
                <xsl:value-of select="'/'"/>
                <xsl:value-of select="substring($HeaderDirPath/sb:IssueDateTime,5,2)"/>
                <xsl:value-of select="'/'"/>
                <xsl:value-of select="substring($HeaderDirPath/sb:IssueDateTime,7,2)"/>
              </td>
              <td class="cell_right01 td31">
                <xsl:value-of select="format-number($SummaryDirPath/sb:ChargeTotalAmount,'#,##0.####')"/>
              </td>
              <td class="cell_right01 td31">
                <xsl:value-of select="format-number($SummaryDirPath/sb:TaxTotalAmount,'#,##0.####')"/>
              </td>
              <td>
                <xsl:variable name="AmendCode" select="$HeaderDirPath/sb:AmendmentStatusCode"/>
                <xsl:choose>
                  <xsl:when test="$AmendCode = ''">
                    <xsl:text>  </xsl:text>
                  </xsl:when>
                  <xsl:when test="$AmendCode = '03'">
                    <xsl:text>환입</xsl:text>
                  </xsl:when>
                  <xsl:when test="$AmendCode = '04'">
                    <xsl:text>계약의 해제</xsl:text>
                  </xsl:when>
                  <xsl:when test="$AmendCode = '05'">
                    <xsl:text>내국신용장 사후 개설</xsl:text>
                  </xsl:when>
                  <xsl:when test="$AmendCode = '02'">
                    <xsl:text>공급가액 변동</xsl:text>
                  </xsl:when>
                  <xsl:when test="$AmendCode = '01'">
                    <xsl:text>기재사항의 착오·정정 등</xsl:text>
                  </xsl:when>
                  <xsl:when test="$AmendCode = '06'">
                    <xsl:text>착오에 의한 이중발급 등</xsl:text>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:text></xsl:text>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
            <xsl:for-each select="$DescriptionTextDirPath">
              <xsl:variable name="curRow" select="position()"/>
              <tr>
                <th class="center fontB">
                  <strong>
                    비고 <xsl:value-of select="$curRow"/>
                  </strong>
                </th>
                <td colspan="3">
                  <span>
                    <xsl:value-of select="."/>
                  </span>
                </td>
              </tr>
            </xsl:for-each>

          </tbody>
        </table>
        <!--//공급가액 및 세액 end -->

        <!--품목별 단가 start -->
        <table class="tax_invoice02" border="0" cellspacing="0" cellpadding="0" width="100%" summary="월, 일, 품목, 규격, 수량, 단가, 공급가액, 세액, 비고">
          <caption>
            월, 일, 품목, 규격, 수량, 단가, 공급가액, 세액, 비고
          </caption>
          <colgroup>
            <col width="3%"/>
            <col width="3%"/>
            <col width="23%"/>
            <col width="9%"/>
            <col width="9%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="13%"/>
            <col width="10%"/>
          </colgroup>
          <thead>
            <tr>
              <th class="fontB">월</th>
              <th class="fontB">일</th>
              <th class="fontB">품 목</th>
              <th class="fontB">규 격</th>
              <th class="fontB">수 량</th>
              <th class="fontB">단 가</th>
              <th class="fontB">공 급 가 액</th>
              <th class="fontB">세 액</th>
              <th class="fontB">비 고</th>
            </tr>
          </thead>
          <tbody>

            <!-- 품목 리스트 정보 보이기 Start -->
            <xsl:for-each select="$LineDirPath">
              <xsl:variable name="baseRow" select="position()"/>
              <tr>

                <!-- 품목월 00이거나 null 보이지 않는다 -->
                <xsl:choose>
                  <xsl:when test="substring(sb:PurchaseExpiryDateTime,5,2)='00'">
                    <td class="center"></td>
                  </xsl:when>
                  <xsl:otherwise>
                    <td class="center">
                      <xsl:value-of select="substring(sb:PurchaseExpiryDateTime,5,2)"/>
                    </td>
                  </xsl:otherwise>
                </xsl:choose>

                <!-- 품목일 00이거나 null 이면 보이지 않는다 -->
                <xsl:choose>
                  <xsl:when test="substring(sb:PurchaseExpiryDateTime,7,2)='00'">
                    <td class="center"></td>
                  </xsl:when>
                  <xsl:otherwise>
                    <td class="center">
                      <xsl:value-of select="substring(sb:PurchaseExpiryDateTime,7,2)"/>
                    </td>
                  </xsl:otherwise>
                </xsl:choose>

                <!-- 품목 -->
                <td>
                  <xsl:value-of select="sb:NameText"/>
                </td>

                <!-- 규격 -->
                <td class="center">
                  <xsl:value-of select="sb:InformationText"/>
                </td>

                <!-- 수량 (format:#,###.####) -->
                <xsl:choose>
                  <xsl:when test="string-length(sb:ChargeableUnitQuantity)=0">
                    <td class="center"></td>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:choose>
                      <xsl:when test="sb:ChargeableUnitQuantity != 0">
                        <td class="center">
                          <xsl:value-of select="format-number(sb:ChargeableUnitQuantity,'#,##0.####')"/>
                        </td>
                      </xsl:when>
                      <xsl:otherwise>
                        <td class="center">
                          <xsl:value-of select="format-number(sb:ChargeableUnitQuantity,'#,###.####')"/>
                        </td>
                      </xsl:otherwise>
                    </xsl:choose>
                  </xsl:otherwise>
                </xsl:choose>

                <!-- 단가 (format:#,###.####) -->
                <xsl:choose>
                  <xsl:when test="string-length(sb:UnitPrice/sb:UnitAmount)=0">
                    <td class="cell_right01"></td>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:choose>
                      <xsl:when test="sb:UnitPrice/sb:UnitAmount != 0">
                        <td class="cell_right01">
                          <xsl:value-of select="format-number(sb:UnitPrice/sb:UnitAmount,'#,##0.####')"/>
                        </td>
                      </xsl:when>
                      <xsl:otherwise>
                        <td class="cell_right01">
                          <xsl:value-of select="format-number(sb:UnitPrice/sb:UnitAmount,'#,###.####')"/>
                        </td>
                      </xsl:otherwise>
                    </xsl:choose>
                  </xsl:otherwise>
                </xsl:choose>

                <!-- 공급가액 (format:#,###.####) -->
                <xsl:choose>
                  <xsl:when test="string-length(sb:InvoiceAmount)=0">
                    <td class="cell_right01"></td>
                  </xsl:when>
                  <xsl:otherwise>
                    <td class="cell_right01">
                      <xsl:value-of select="format-number(sb:InvoiceAmount,'#,###.####')"/>
                    </td>
                  </xsl:otherwise>
                </xsl:choose>

                <!-- 세액 (format:#,###.####) -->
                <xsl:choose>
                  <xsl:when test="string-length(sb:TotalTax/sb:CalculatedAmount)=0">
                    <td class="cell_right01"></td>
                  </xsl:when>
                  <xsl:when test="sb:TotalTax/sb:CalculatedAmount=0">
                    <td class="cell_right01">
                      <xsl:value-of select="'0'"/>
                    </td>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:choose>
                      <xsl:when test="sb:TotalTax/sb:CalculatedAmount > 0">
                        <td class="cell_right01">
                          <xsl:value-of select="format-number(sb:TotalTax/sb:CalculatedAmount,'#,##0')"/>
                        </td>
                      </xsl:when>
                      <xsl:otherwise>
                        <td class="cell_right01">
                          <xsl:value-of select="format-number(sb:TotalTax/sb:CalculatedAmount,'#,###')"/>
                        </td>
                      </xsl:otherwise>
                    </xsl:choose>
                  </xsl:otherwise>
                </xsl:choose>

                <!-- 비고 -->
                <td>
                  <xsl:value-of select="sb:DescriptionText"/>&#160;
                </td>

              </tr>
            </xsl:for-each>
            <!-- 품목 리스트 정보 보이기 End -->

          </tbody>
        </table>
        <!--//품목별 단가 end -->

        <!--합계 start -->
        <table class="tax_invoice02" border="0" cellspacing="0" cellpadding="0" width="100%" summary="합계금액, 현금, 수표, 어음, 외상미수금">
          <caption>
            합계금액, 현금, 수표, 어음, 외상미수금
          </caption>
          <colgroup>
            <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width=""/>
            <col width="6%"/>
          </colgroup>
          <tr>
            <th class="fontB">합계금액</th>
            <th class="fontB">현 금</th>
            <th class="fontB">수 표</th>
            <th class="fontB">어 음</th>
            <th class="fontB">외상미수금</th>
            <td class="td_chargeR" rowspan="2">이 금액을</td>
            <td class="td_chargeC" rowspan="2">
              <!-- 영수/청구 정보 보이기 Start -->
              <xsl:variable name="demand" select="$HeaderDirPath/sb:PurposeCode"/>
              <xsl:choose>
                <xsl:when test="$demand='1'">
                  <span class="li0202">[ 영수 ]</span>
                  <br />
                  <span class="li0201">청구</span>
                </xsl:when>
                <xsl:when test="$demand='01'">
                  <span class="li0202">[ 영수 ]</span>
                  <br />
                  <span class="li0201">청구</span>
                </xsl:when>
                <xsl:when  test="$demand='18'">
                  <span class="li0201">영수</span>
                  <br />
                  <span class="li0202">[ 청구 ]</span>
                </xsl:when>
                <xsl:when  test="$demand='02'">
                  <span class="li0201">영수</span>
                  <br />
                  <span class="li0202">[ 청구 ]</span>
                </xsl:when>
              </xsl:choose>
              <!-- 영수/청구 정보 보이기 End -->
            </td>
            <td class="td_chargeL" rowspan="2">함</td>
          </tr>
          <tr>
            <td class="cell_right01">
              <xsl:value-of select="format-number($SummaryDirPath/sb:GrandTotalAmount,'#,##0')"/>
            </td>
            <!-- 현금/수표/어음/외상미수금 정보 보이기 Start -->
            <xsl:variable name="PaymentCount" select="count($PaymentMeansDirPath)"/>
            <xsl:choose>
              <xsl:when test="$PaymentCount = '4'">
                <xsl:for-each select="$PaymentMeansDirPath">
                  <xsl:sort select="."/>
                  <td class="cell_right01">
                    <xsl:choose>
                      <xsl:when test="string-length(sb:PaidAmount)=0">
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:value-of select="format-number(sb:PaidAmount,'#,##0')"/>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </xsl:for-each>
              </xsl:when>
              <xsl:otherwise>
                <td class="cell_right01">
                </td>
                <td class="cell_right01">
                </td>
                <td class="cell_right01">
                </td>
                <td class="cell_right01">
                </td>
              </xsl:otherwise>
            </xsl:choose>
            <!-- 현금/수표/어음/외상미수금 정보 보이기 End -->

          </tr>
        </table>
        <!--//합계 end -->

      </div>
    </div>
    <!--//전자세금계산서 END -->

  </xsl:template>
  <!--  세금계산서 DTI Data Header 정보 보이기 End -->

</xsl:stylesheet>
