
$(document).ready(function(){
	$("#loading").hide();
});

$("#news_letter_email").keyup(function (event) { 
   if (event.keyCode === 13) {
      News_Letter_Subscribe();
}
});

function News_Letter_Subscribe(){
   var news_letter_email = $("#news_letter_email").val();
   var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
 
   var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
   if(news_letter_email === "") {
    Lobibox.notify('warning', {
      position: 'top right',
      msg: 'Enter your email id'
    });
   }else if (!news_letter_email.match(emailPattern)) {
    Lobibox.notify('warning', {
      position: 'top right',
      msg: 'Enter your valid email id'
    });
   }else{

   $.ajax({
    url: 'https://gprogress.green.com.pg/submit/news_letter/',
    type: 'post',
    data: {
       'news_letter_email': news_letter_email,
       csrfmiddlewaretoken: csrf_data
    },
   }).done(function(json_data){
       data = JSON.parse(json_data);
       if (data.Code === "001") {
        Lobibox.notify('success', {
           position: 'top right',
           msg: 'Thank you for subscribing to our newsletter! Get ready to receive the latest updates. Welcome to our community!'
        });
        News_Letter_Clear()
       } else if (data.Code === "002") {
        Lobibox.notify('success', {
           position: 'top right',
           msg: 'Thank you for your continued interest! You are already subscribed to our newsletter. Stay tuned for the latest updates.'
        });
       } else if (data.Code === "003") {
        Lobibox.notify('error', {
           position: 'top right',
           msg: 'We apologize, but it seems there was an error while processing your subscription. Try Again Later.'
        });
       }
   });
}
}
  
function News_Letter_Clear(){
  $("#news_letter_email").val('');
}