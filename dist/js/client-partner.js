var serviceCallLogDocumentUpload = []
var serviceRequestDocumentUpload = []
var dynamicTime = ''
var customer_chat_date = ''

$(document).ready(function () {
  getCurrentTime();
  chatCurrentDateTime();
  CustomerChatHistory();
})

function CustomerChatHistory() {
  $.ajax({
    url: 'https://gprogress.green.com.pg/customer/chat_history/',
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      console.log("RES -- ", result);

      var replayedMessages = result.paired_messages;
      
      if(replayedMessages){
        var chatContainer = $('#chat-container');
        replayedMessages.forEach(function (replayedMessage) {
          var messageHTML = '<div class="message">';
          var client_message = replayedMessage.sent_message;
          var client_msg_date = replayedMessage.sent_date;
          var replayed_message = replayedMessage.replayed_message;
          var replayed_msg_date = replayedMessage.replayed_date;
          messageHTML += `
            <div class="row align-items-end">
              <div class="col-auto">
                <div class="green-icon">
                </div>
              </div>
              <div class="col user-chat">
                <div class="chat-single-data">
                  <p>${client_message}</p>
                </div>
                <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> ${client_msg_date} </p>
              </div>
              <div class="col-auto">
                <div class="user-icon">
                  <img src="dist/images/client-partner/user.png" />
                </div>
              </div>
            </div>`;
          if(replayed_message == '') {
            messageHTML += ``;
          }else{messageHTML += `<div class="row align-items-end">
          <div class="col-auto">
            <div class="green-icon">
              <div class="icon">
                <img src="dist/images/client-partner/green.png" />
              </div>
            </div>
          </div>
          <div class="col  green-chat">
            <div class="chat-single-data ">
              <p>${replayed_message}</p>
            </div>
            <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> ${replayed_msg_date} </p>
          </div>
          <div class="col-auto">
            <div class="user-icon">
            </div>
          </div>
        </div>`;
      }
          messageHTML += '</div>';
          chatContainer.append(messageHTML);
        });
      }
    }
  });
}

// Function to format the time as 12-hour clock (AM/PM)
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// --- Today's Date ---
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var currentTime = hours + ':' + minutes + ' ' + ampm;
  return currentTime;
}

// Update time
setInterval(function () {
  dynamicTime = getCurrentTime();
  var liveDate = `<p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Today | ${dynamicTime}</p>`;
  $('#live_chat_date_and_time').html(liveDate);
}, 1000);

function chatCurrentDateTime(){
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  customer_chat_date = now.toLocaleString('en-US', options).replace(/,/g, '');
}

// ---- Sent Customer Message ---- 
function SentMessage(){
  chatCurrentDateTime()
  customer_message = $('#customer_text_message').val();
  chat_append = `
      '<div class="message">'
      <div class="row align-items-end">
         <div class="col-auto">
            <div class="green-icon">
            </div>
         </div>
         <div class="col user-chat">
            <div class="chat-single-data">
               <p>${customer_message}</p>
            </div>
            <p class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Today | ${dynamicTime} </p>
         </div>
         <div class="col-auto">
            <div class="user-icon">
               <img src="dist/images/client-partner/user.png" />
            </div>
         </div>
        </div>
      </div>`
  $('#chat-container').append(chat_append)
  $('#customer_text_message').val('');
  customer_id = 896
  chat_date = customer_chat_date
  source_of_meaasge = 3396
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
    url: 'https://gprogress.green.com.pg/customer/chat_box/',
    type: 'post',
    data: {
      'customer_id': customer_id,
      'customer_message': customer_message,
      'chat_date': chat_date,
      'source_of_meaasge': source_of_meaasge,
      csrfmiddlewaretoken: csrf_data
    }
    }).done(function(json_data) {
    // data = JSON.parse(json_data);
    // console.log("Upload Success -- ", data)
    // if (data.Code === "001") {
    //   Lobibox.notify('success', {
    //     position: 'top right',
    //     msg: 'Sent Service Call Log Data'
    //   });
    //   clearServiceCallLog()
    // }else if (data.Code === "002") {
    //   Lobibox.notify('warning', {
    //     position: 'top right',
    //     msg: 'Failed to Sent'
    //   });
    // }else{
    //   Lobibox.notify('warning', {
    //     position: 'top right',
    //     msg: 'Error Occured Please Refresh the Page and Try Agin'
    //   });
    // }
  });
}

// ---- Service Related Document Upload ---- 
$('#service_call_document').on('change', function (e) {
    var files = e.target.files;
    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(files[i]);
        (function (currentReader) {
            currentReader.onload = function () {
                var inputData = currentReader.result;
                var replaceValue = (inputData.split(',')[0]);
                var fileData = inputData.replace(replaceValue, "");
                serviceCallLogDocumentUpload.push(fileData);
                if (serviceCallLogDocumentUpload.length === files.length) {
                    console.log(serviceCallLogDocumentUpload);
                }
            };
        })(reader);
    }
});

// ---- Service Request Related Doc ----
$('#service_request_document').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader) {
          currentReader.onload = function () {
              var inputData = currentReader.result;
              var replaceValue = (inputData.split(',')[0]);
              var fileData = inputData.replace(replaceValue, "");
              serviceRequestDocumentUpload.push(fileData);
              if (serviceRequestDocumentUpload.length === files.length) {
                  console.log(serviceRequestDocumentUpload);
              }
          };
      })(reader);
  }
});

// ---- Submit Service Request ---- 
function SubmitServiceCallLog(){
    serviceCallLogFormValid = $('#serviceCallLogForm').valid();
    if(serviceCallLogFormValid){
    var service_call_title = $("#service_call_title").val();
    var serivce_call_site_location = $("#serivce_call_site_location").val();
    var service_call_raisedBy = $("#service_call_raisedBy").val();
    var service_call_issues = $('#service_call_issues').find(":selected").val();
    var service_call_priority = $("#service_call_priority").find(":selected").val();
    var service_call_description = $("#service_call_description").val();
    $('#serviceCallSubmitButton').prop('disabled', true);
    $('#serviceCallSubmitButton').css('cursor', 'not-allowed');
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: 'https://gprogress.green.com.pg/submit/client_partner/service_call_log/',
        type: 'post',
        data: {
          'service_call_title': service_call_title,
          'serivce_call_site_location': serivce_call_site_location,
          'service_call_raisedBy': service_call_raisedBy,
          'service_call_issues': service_call_issues,
          'service_call_priority': service_call_priority,
          "service_call_description": service_call_description,
          "service_call_document": serviceCallLogDocumentUpload,
          csrfmiddlewaretoken: csrf_data
        }
      }).done(function(json_data) {
      data = JSON.parse(json_data);
      console.log("Upload Success -- ", data)
      if (data.Code === "001") {
        Lobibox.notify('success', {
          position: 'top right',
          msg: 'Sent Service Call Log Data'
        });
        clearServiceCallLog()
      }else if (data.Code === "002") {
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Failed to Sent'
        });
      }else{
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Error Occured Please Refresh the Page and Try Agin'
        });
      }
   });
  }
}

// ---- Submit Service Request ---- 
function SubmitServiceRequest(){
  serviceRequestFormValid = $('#serviceRequestForm').valid();
  if(serviceRequestFormValid){
  var service_req_common_service = $("#service_req_common_service").find(":selected").val();
  var service_request_type = $("#service_request_type").find(":selected").val();
  var service_req_priority = $("#service_req_priority").find(":selected").val();
  var preferred_date = $('#preferred_date').val();
  var request_person_name = $("#request_person_name").val();
  var request_person_email = $("#request_person_email").val();
  var request_person_contact_no = $("#request_person_contact_no").val();
  $('#serviceRequestBtn').prop('disabled', true);
  $('#serviceRequestBtn').css('cursor', 'not-allowed');
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
      url: 'https://gprogress.green.com.pg/submit/client_partner/service_request/',
      type: 'post',
      data: {
        'service_req_common_service': service_req_common_service,
        'service_request_type': service_request_type,
        'service_req_priority': service_req_priority,
        'preferred_date': preferred_date,
        "request_person_name": request_person_name,
        "request_person_email": request_person_email,
        "request_person_contact_no": request_person_contact_no,
        "service_req_document_upload": serviceRequestDocumentUpload,
        csrfmiddlewaretoken: csrf_data
      }
    }).done(function(json_data) {
    data = JSON.parse(json_data);
    console.log("Upload Success -- ", data)
    if (data.Code === "001") {
      Lobibox.notify('success', {
        position: 'top right',
        msg: 'Sent Service Request Data'
      });
      clearServiceRequest()
    }else if (data.Code === "002") {
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Failed to Sent'
      });
    }else{
      Lobibox.notify('warning', {
        position: 'top right',
        msg: 'Error Occured Please Refresh the Page and Try Agin'
      });
    }
 });
}
}

// ---- Clear Form ---- 
function clearServiceCallLog() {
    $("#service_call_title").val('');
    $("#serivce_call_site_location").val('');
    $("#service_call_raisedBy").val('');
    $('select#service_call_issues').val('');
    $("select#service_call_priority").val('');
    $("#service_call_description").val('');
    $("#service_call_document").val('');
    serviceCallLogDocumentUpload = [];
    $('#serviceCallSubmitButton').prop('disabled', false);
    $('#serviceCallSubmitButton').css('cursor', 'pointer');
}

function clearServiceRequest() {
  $("select#service_req_common_service").val('');
  $("select#service_request_type").val('');
  $("select#service_req_priority").val('');
  $('#preferred_date').val('');
  $("#request_person_name").val('');
  $("#request_person_email").val('');
  $("#request_person_contact_no").val('');
  $("#service_req_description").val('');
  serviceRequestDocumentUpload = [];
  $('#serviceRequestBtn').prop('disabled', false);
  $('#serviceRequestBtn').css('cursor', 'pointer');
  FileUploadHtml = `<span class="drop-zone__prompt">
  <img src="dist/images/upload-file.png" />
  <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format  ( file size no more than 10 MB )</span></span>
  <span class="file">Select File</span>
  </span>
  <input type="file" id="service_request_document" name="" class="drop-zone__input" multiple></input>`
  $("#serviceRequestFileAppend").html(FileUploadHtml)
}

// --- Service Call Log Form Validation ---
$('#serviceCallLogForm').validate({
    rules:{
        service_call_title:{required:true},
        serivce_call_site_location:{required:true},
        service_call_raisedBy:{required:true},
        service_call_issues:{required:true},
        service_call_priority:{required:true},
        service_call_description:{required:true},
    },
    messages:{
        service_call_title:{required:"Enter Title"},
        serivce_call_site_location:{required:"Enter Site Location"},
        service_call_raisedBy:{required:"Enter RaisedBy"},
        service_call_issues:{required:"Select Service Issue"},
        service_call_priority:{required:"Select the Priority"},
        service_call_description:{required:"Enter Description"},
    },
    errorElement: 'div',
     errorPlacement: function(error, element) {
         console.log('Error:', error);
         var placement = $(element).data('error');
         if (placement) {
             $(placement).append(error)
         } else {
             error.insertAfter(element);
         }
     },
});

// --- Service Request Form Validation ---
$('#serviceRequestForm').validate({
  rules:{
      service_request_type:{required:true},
      service_req_priority:{required:true},
      request_person_name:{required:true},
      request_person_email:{required:true},
      service_req_description:{required:true},
      request_person_contact_no: {
        maxlength: 15,
        minlength: 7
      },
  },
  messages:{
      service_request_type:{required:"Select Type"},
      service_req_priority:{required:"Select Priority"},
      request_person_name:{required:"Enter Name"},
      request_person_email:{required:"Enter Email"},
      service_req_description:{required:"Enter Description"},
      request_person_contact_no: {
        maxlength: "Enter Valid Mobile Number",
        minlength: "Enter Valid Mobile Number"
      },
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
       console.log('Error:', error);
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});

// --- TelePhone Flag ---- 
var input = document.querySelector('#request_person_contact_no');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})