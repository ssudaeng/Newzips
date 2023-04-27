 
function findAddr(){
	new daum.Postcode({
        oncomplete: function(data) {
        	
        	console.log(data);
        	
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('userZipCode').value = data.zonecode;
            if(roadAddr !== ''){
                document.getElementById("userAddr").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("userAddr").value = jibunAddr;
            }
        }
    }).open();
}

function findRealtorAddr(){
	new daum.Postcode({
        oncomplete: function(data) {
        	
        	console.log(data);
        	
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('realtorZipCode').value = data.zonecode;
            if(roadAddr !== ''){
                document.getElementById("realtorAddr").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("realtorAddr").value = jibunAddr;
            }
        }
    }).open();
}

function allCheck() {
	
	var obj = document.getElementsByName("check");
	
	if (obj[0].checked){
		for (i=1; i<obj.length; i++){
			obj[i].checked = true;
		}
	}else{
		for (i=1; i<obj.length; i++){
			obj[i].checked = false;
		}
	}
	
}

function itemCheck(){
	
	var c = 0;
	var obj = document.getElementsByName("check");
	
	for(i=1; i<obj.length; i++){
	    if(obj[i].checked){
	    	c++;
	    }
	 }
	
	if (c==(obj.length-1)){
		obj[0].checked = true;
	}else{
		obj[0].checked = false;
	}
	
}




 function findId() {
    	
    	var url = "/newzips/findId";
    	
    	var header = $("meta[name='_csrf_header']").attr('content');
    	var token = $("meta[name='_csrf']").attr('content');
    	
    	var userName = $("#userName").val();
    	var userPhone = $("#userPhone").val();

    	//var params = "userName=" + userName + "&userPhone=" + userPhone;
    	
		$.ajax({
				
			url:url,
			type:"post",
			data:{userName:userName, userPhone:userPhone}, 
			success:function(mav){
			
				replaceHTML = "<div class='popup-form'><div style='margin-top: 40px'></div>";
				
				if ((mav.userId) != null) {
					replaceHTML += "<h3>아이디는 <span style='font-size:14pt; font-weight: bold;'>" + mav.userId + "</span>입니다.</h3>";
				} else {
					replaceHTML += "<h3>아이디를 찾을 수 없습니다.</h3>";
				}
				
				replaceHTML += "<div style='margin-bottom: 40px'></div><button type='button' class='btn2' id='popUp-Close-Button' ";
				replaceHTML += "onclick=\"location.href='http://localhost:8080/newzips/login';\">닫기</button></div>";
				
				$(".popup-form").replaceWith(replaceHTML);
				
				},
			beforeSend:function(xhr){
		        xhr.setRequestHeader(header, token);
		    }
				
		})

    }


function addWish(itemId){

	alert("addWish js");

	var url = '/newzips/addWish/'+itemId;
	
	alert(url);	

}
    


$(window).on("load", function() {
   
	$("#header_login").on('click', function(){
		location.href = "http://localhost:8080/newzips/login"
	})
	
	$("#header_logout").on('click', function(){
		location.href = "http://localhost:8080/newzips/logout"
	})
	
	$("#header_signin").on('click', function(){
		location.href = "http://localhost:8080/newzips/join"
	})
	
	$("#header_login_realtor").on('click', function(){
		location.href = "http://localhost:8080/newzips/realtor/login"
	})
	
	$("#header_signin_realtor").on('click', function(){
		location.href = "http://localhost:8080/newzips/realtor/join"
	})
	
	
	//하트 눌렀을때 관심목록에 등록
	$(".popular-listing .card .card-footer a .la-heart-o").on("click", function(){
    	
    	var itemId = $(this).next('.hiddenItemId').val();
    	//var itemId = $(this).next('input').val();
    	var url = '/newzips/addWish/'+itemId;
    	alert(url);
    	
    	$.ajax({
    		
    		url:url,
    		type:"get",
    		success:function(mav){
    			$(".alert-success").find("strong").text(mav.msg);
    			//strong_val = mav.msg;
    			$(".alert-success").addClass("active");
        		return false;
    		}
    	})
    	
    });
	
	//휴지통 눌렀을때 관심목록에서 삭제
	$(".popular-listing .card .card-footer a .la-trash-o").on("click", function(){
    	
    	console.log($(this).next());
    	
    	//var itemId = $(this).next('.hiddenItemId').val();
    	var itemId = $(this).next('input').val();
    	alert(itemId);
    	var url = '/newzips/deleteWish/'+itemId;
    	
    	$.ajax({
    		
    		url:url,
    		type:"get",
    		success:function(mav){
	    		$(".alert-success").find("strong").text(mav.msg);
	    		$(".alert-success").addClass("active");
        		return false;
    		}
    		
    	})
    	
    });

   $("#load-more-button").on("click", function() {
      
      var header = $("meta[name='_csrf_header']").attr('content');
       var token = $("meta[name='_csrf']").attr('content');
       
      var start = 0;
      var end = 12;
           
      $.ajax({
         type: 'post',
         url: '/newzips/itemList_user',
         data: {
            start: start,
            end: end
         },
         success: function(result) {
            $(".listing-container").replaceWith(result);
            if (result.length == 0) {
               $('.load-more-button').hide();
         }
         },
         beforeSend:function(xhr){
            xhr.setRequestHeader(header, token);
         }
         
      });

   });
   





})//$(window)끝