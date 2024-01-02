// Globally Storage of User Login Details Detials
var globalResponseData = null;

// Base64 File Data
var educationalCertificationBase64 = '';
var employementCertificationBase64 = '';

// Flag Country
var flag_country_code = null
var flag_country_name = null

// Ready Function
$(document).ready(function () {
  LatestJobOpening();
  JobCategoeryList();
  JobApplyForm();
  JobQueryRaiseForm();
  CaptchaValidation();
	})
function addStyleClass() {
  var selector = document.querySelector('.show-label');
  var dynamicElement = selector.querySelector('#qmobile_number-error');
  if (dynamicElement) {
      selector.classList.add('dynamic-label')
  }
  }
  function removeStyleClass() {
  var selector = document.querySelector('.dynamic-label');
  if (selector) {
      selector.classList.remove('dynamic-label')
  }
  }
// Country Code 
const headers_content = {
	'Content-Type':'application/json',
    }
var cat_id = 0;
var hca_data = {};
var country_code = 'IN';
let mobile_val = {
    "US":/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
    "UK":/^(07[\d]{8,12}|447[\d]{7,11})$/,
    "AU":/^(?:\+?61|0)4(?:[01]\d{3}|(?:2[1-9]|3[0-57-9]|4[7-9]|5[0-15-9]|6[679]|7[3-8]|8[1478]|9[07-9])\d{2}|(?:20[2-9]|444|52[0-6]|68[3-9]|70[0-7]|79[01]|820|890|91[0-4])\d|(?:200[0-3]|201[01]|8984))\d{4}$/,
    "SD":/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/,
    "SI":/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/,
    "BE":/^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/,
    "IN":/^(\+91-|\+91|0)?\d{10}$/
}
let mobile_code = {
    "US":'1',
    "AU":'43',
    "SD":'+94',
    "SI":'+94',
    "BE":'32',
    "PG":'675',
    "IN":'+91'
}
let zip_val = {
    "US": /^\d{5}([\-]?\d{4})?$/,
    "UK": /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,
    "AU": /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,
    "BE": /^[1-9]{1}[0-9]{3}$/,
    "SD": /^\d{4}$/,
    "IN": /^\d{6}$/,
    "PG": /^\d{3}$/,
    "SI": /^\d{4}$/
}
//get mobile code
function getMobileCode(){
	return mobile_code['country_code']
}
// ---- Latest Job Opening ----
function LatestJobOpening(){   
  var loadedData = []; // store loaded data
  $.ajax({
      url: 'https://gprogress.green.com.pg/get/jobcategory_list/',
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
          var carouselIndicators = '';
          var carouselItems = '';
          var totalItems = 0; // Total number of items loaded
          Object.keys(result).forEach(function (category) {
              var categoryData = result[category];
              var openings = categoryData.openings;
              openings.forEach(function (opening) {
                  loadedData.push(opening); 
                  totalItems++;
                  var itemIndex = totalItems - 1;
                  var position = opening.position;
                  var experience = opening.experience;
                  var location = opening.location;
                  var jobtype = opening.job_type;
                  var posted_date = opening.posted_date;
                  var positionName = `job-detail-${position}`;
                  positionName = positionName.replace(/[.&]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
                  carouselItems += `
                  <div class="carousel-item ${itemIndex === 0 ? 'active' : ''}">
                  <div class="carousel-caption d-md-block jobapply_button" data-bs-toggle="modal" data-bs-target="#${positionName}">
                  <div class="row text-start"  >
                  <div class="col-md-3">
                    <h5>${position}</h5>
                    <p>${jobtype}</p>
                  </div>
                  <div class="col-md-2">
                    <p class="small">Experience</p>
                    <h6>${experience}</h6>
                  </div>
                  <div class="col-md-1">
                    <p class="small">Salary</p>
                    <h6>---</h6>
                  </div>
                  <div class="col-md-3 text-md-end">
                    <h5><img src="dist/images/location.png" /> ${location}</h5>
                    <p>Posted ${posted_date} Day ago</p>
                  </div>
                  <div class="col-md-3 text-md-end">
                    <button class="btn btn-grn-bor jobapply_button"> <span class="jobApplyText">Apply</span></button>
                    </div>
                  </div>
                  </div>
                  </div>`;
              });
          });
          // ---- Generate slider button ----
          for (var i = 0; i < totalItems; i++) {
              carouselIndicators += `<button type="button" data-bs-target="#jobdetails" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></button>`;
          }
          var carouselHTML = `
          <h3 class="fw-bold mb-4">Latest Job Opening <small></small></h3>
          <div class="job-details">
          <div id="jobdetails" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">${carouselIndicators}</div>
            <div class="carousel-inner">${carouselItems}</div>
          </div>
          </div>
          </div>`;
          $('.latest_job_opening').append(carouselHTML);
          var carousel = new bootstrap.Carousel(document.getElementById('jobdetails'), {
              interval: 2200,
              wrap: true
          });
          $('.carousel-indicators button').on('click', function () {
              var slideTo = $(this).data('bs-slide-to');
              carousel.to(slideTo);
          });
          // Start the carousel automatically
          carousel.cycle();
      }
  });
};

// --- Job Category List ----
function JobCategoeryList(){
  $.ajax({
      url: 'https://gprogress.green.com.pg/get/jobcategory_list/',
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
          var selectHTML = '';
          // Job Category List
          selectHTML += `
              <h3 class="fw-bold mb-4 mt-5">Job Category <small></small></h3>
              <ul class="nav nav-tabs" id="jobTab" role="tablist">`;
          Object.keys(result).forEach(function (category, index) {
              var categoryData = result[category];
              var openings = categoryData.openings;
              selectHTML += `
                  <li class="nav-item" role="presentation">
                      <button class="nav-link ${index === 0 ? 'active' : ''}" id="tab-${index}" data-category="${index}" data-bs-toggle="tab" data-bs-target="#tab-pane-${index}" type="button" role="tab" aria-controls="one-tab-${index}" aria-selected="true">
                          <img src="dist/images/joinus/job-cat-1.png">
                          <h3>${category}</h3>
                          <h5>${openings.length} openings</h5>
                      </button>
                  </li>`;
          });
          selectHTML += '</ul>';
          selectHTML += '<div class="tab-content" id="jobTabContent">';
          Object.keys(result).forEach(function (category, index) {
              var categoryData = result[category];
              var openings = categoryData.openings;
              // Job Available List Data
              selectHTML += `
                  <div class="tab-pane fade${index === 0 ? ' show active' : ''}" id="tab-pane-${index}" role="tabpanel" aria-labelledby="one-tab${index}">`;
              openings.forEach(function (opening, index) {
                  var position = opening.position;
                  var experience = opening.experience;
                  var location = opening.location;
                  var jobtype = opening.job_type;
                  var posted_date = opening.posted_date;
                  var positionName = `job-detail-${position}`;
                  positionName = positionName.replace(/[.&]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
                  selectHTML += `
                      <div class="row single-job-details text-start jobapply_button"  data-bs-toggle="modal" data-bs-target="#${positionName}">
                          <div class="col-md-3">
                              <h5>${position}</h5>
                              <p>${jobtype}</p>
                          </div>
                          <div class="col-md-2">
                              <p class="small">Experience</p>
                              <h6>${experience}</h6>
                          </div>
                          <div class="col-md-1">
                              <p class="small">Salary</p>
                              <h6></h6>
                          </div>
                          <div class="col-md-3 text-end">
                              <h5><img src="dist/images/location.png"/>${location}</h5>
                              <p>Posted ${posted_date} Day ago</p>
                          </div>
                          <div class="col-md-3 text-end">
                              <button class="btn-grn-bor jobapply_button"><span class="jobApplyText">Apply</span></button>
                          </div>
                      </div>`;
              });
              selectHTML += '</div>';
          });
          selectHTML += '</div>';
          $('.api_container').append(selectHTML);
      },
      error: function (error) {
          console.error('Error fetching job categories:', error);
      },
  });
};

// ---- Job Description ----
function JobApplyForm(){
  $.ajax({
      url: 'https://gprogress.green.com.pg/get/jobcategory_list/',
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
          // Country Drop-Down
          $.ajax({
            url: 'https://gprogress.green.com.pg/get/country_dropdown_list/',
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                var countryDropdown = '<select  onfocus="this.size=6;" onblur="this.size=0;" onchange="this.size=1; this.blur()"  id="country_dropdown" name="country_dropdown" class="input-dsn">';
                countryDropdown += '<option value="" selected="" disabled="">--Select Country--</option>';
                result.forEach(function(countryData) {
                  var country_id = countryData.country_id;
                  var country_name = countryData.country_name;
                  countryDropdown += `<option value="${country_id}">${country_name}</option>`;
                });
                countryDropdown += '</select>';
                var descriptionHTML = `${countryDropdown}`;
                // Append the Country In HTML DOM
                // $(".country-dropdown").append(descriptionHTML);
              }
          });
          Object.keys(result).forEach(function (category, index) {
              var categoryData = result[category];
              var openings = categoryData.openings;
              openings.forEach(function (opening, index) {
                  var position = opening.position;
                  var experience = opening.experience;
                  var location = opening.location;
                  var description = opening.job_description;
                  var required_skills = opening.required_skills;
                  var jobtype = opening.job_type;
                  var posted_date = opening.posted_date;
                  // var closed_date = opening.closed_date;
                  var deal_id = opening.deal_id;
                  var resume_folder_id = opening.resume_folder_id;
                  var job_position_id = opening.job_position_id;
                  var job_position_number = opening.job_position_number;
                  var job_position_created_date = opening.job_position_created_date
                  var positionName = `job-detail-${position}`;
                  positionName = positionName.replace(/[.&]+$/, '').replace(/[^a-zA-Z0-9]/g, '');
                  var descriptionHTML = '';
                  var descriptionHTML = `
                  <div class="modal fade joinus-benefit-details " id="${positionName}" data-bs-backdrop="static"
                  data-bs-keyboard="false" tabindex="-1" aria-labelledby="jobdetailsLabel" aria-hidden="true">
                  <div class="modal-dialog  modal-dialog-centered modal-lg">
                  <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close jobapply-btn-close-${positionName}" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body ">
                  <div class="singlejobdetailsdata">
                  <div class="row mb-4">
                  <div class="col">
                    <h4 class="mb-2">${position}</h4>
                    <p class="small">${jobtype}</p>
                  </div>
                  <div class="col-auto">
                    <p class="small">Posted ${posted_date} day ago</p>
                  </div>
                  </div>
                  <div class="row mb-2">
                  <div class="col-auto">
                    <p class="small">Experience</p>
                    <p>${experience}</p>
                  </div>
                  <div class="col-auto">
                    <p class="small">Salary</p>
                    <p></p>
                  </div>
                  <div class="col-auto">
                    <p class="small">Closing date</p>
                    <p>--------</p>
                  </div>
                  <div class="col-auto">
                    <p class="small"></p>
                    <p>${location}</p>
                  </div>
                  </div>
                  <h5><u>Job Description</u></h5>
                  <p>
                      ${description}
                  </p>
                  <h5><u>Skill</u></h5>
                  <p>${required_skills}</p>    
                  <button class="btn-grn-bor onapply${positionName} onapply_button_click">Apply</button>
                  </div>
                  <form id="${positionName}-jobapply_form" class="applyform${positionName} form-align"> 
                  <div class="row">
                  <div class="col-md-7">
                    <h2 class="mb-1 vertical-align-dashboard">JOB APPLICATION</h2>
                    <h4 class="mb-5">Apply For ${position} [${job_position_number}]</h4>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-6">
                      <input type="text" placeholder="FirstName *" class="input-dsn w-100" id="firstname" name="firstname"/>
                  </div>
                  <div class="col-md-6">
                      <input type="text" placeholder="LastName *" class="input-dsn w-100" id="lastname" name="lastname"/>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                    <div class="col-md-12">
                      <input type="email" placeholder="Email *" class="input-dsn w-100" id="email" name="email"/>
                    </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-6">
                     <label for="apply_mobile">Mobile Number*</label>
                     <input type="text" value="+675 " placeholder="Mobile *" class="input-dsn w-100" id="${positionName}-apply_mobile" name="apply_mobile" class="input-dsn" maxlength=25 data-error=".errorTxt17" required/>
                     <span class="errorTxt17 errormessage"></span>
                  </div>
                  <div class="col-md-6">
                     <label for="alternative_mobile">Alternate Mobile Number*</label>
                     <input type="text" value="+675 " placeholder="Alternate Mobile No*" class="input-dsn w-100" id="${positionName}-alternative_mobile" name="alternative_mobile" class="input-dsn" maxlength=25 data-error=".errorTxt16" required/>
                     <span class="errorTxt16 errormessage"></span>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-6">
                  <label>Gender<span class="asterisk">*</span></label>
                  <select  onfocus="this.size=3;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="gender" class="form-control select2 input-dsn w-100" name="gender">
                    <option value="">--- Choose ---</option>
                    <option value="8488">Male</option>
                    <option value="8486">Female</option>
                    <option value="8490">Other</option>
                  </select>
                  </div>
                  <div class="col-md-6">
                    <label for="${positionName}-date_of_birth">Date of Birth</label>
                    <input type="date" id="${positionName}-date_of_birth" name="date_of_birth" class="input-dsn w-100">
                    <span id="ageMessage" class="errorTxt14 errormessage"></span>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3 country_align_sec">                      
                  <div class="col-md-6 country_position">
                  <label>Select Country<span class="asterisk">*</span></label>
                  <input id="${positionName}-country_selector" name="flag_country_select" class="input-dsn w-100" type="text">
				          <label for="${positionName}-country_selector" style="display:none;">Select Country</label>
                  </div>
                  </div>
                  <!-- <div class="row g-3 align-items-center mb-3"> -->     
                  <!-- <div class="col-md-12 country-dropdown">      -->  
                  <!-- </div>                                        -->      
                  <!-- </div>                                        -->  
                  <div class="row g-3 align-items-center mb-3">          
                  <div class="col-md-6">
                    <input type="text" placeholder="Region *" class="input-dsn w-100" id="region" name="region"/>
                  </div>
                  <div class="col-md-6">
                    <input type="text" placeholder="City *" class="input-dsn w-100" id="city" name="city"/>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-12 select-experience">
                  <label>Experience<span class="asterisk">*</span></label>
                    <select  onfocus="this.size=6;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="experience" class="form-control select2 input-dsn w-100" name="experience">
                     <option value="">--- Choose Experience Years ---</option>
                     <option value="1820">0 - 1</option>
                     <option value="1822">1 - 3</option>
                     <option value="1824">3 - 5</option>
                     <option value="1826">5 - 7</option>
                     <option value="1828">7 - 10</option>
                     <option value="1830">10 - 12</option>
                     <option value="1832">12 - 15</option>
                     <option value="1834">15 - 20</option>
                     <option value="1834">Above 20</option>
                     </select>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-12">
                    <textarea type="text" placeholder="Message/Queries*" class="input-dsn w-100 in-textarea" id="message" name="message"></textarea>
                  </div>
                  </div>
                  <div class="row g-3 align-items-center mb-3">                      
                  <div class="col-md-12">
                        <label class="attach-emp" for="${positionName}-resume">Upload CV*</label>
                        <input type="file" accept=".pdf" class="input-dsn w-100" id="${positionName}-resume" name="resume" placeholder="resume">
                  </div>                     
                  <div class="col-md-6">
                        <label class="attach-emp" for="${positionName}-educational_certification">Educational Certification</label>
                        <input type="file" class="input-dsn w-100" id="${positionName}-educational_certification" name="educational_certification">
                  </div>
                  <div class="col-md-6">
                  <label class="attach-emp" for="${positionName}_employement_certification">Employement Certification</label>
                  <input type="file" class="input-dsn w-100" id="${positionName}_employement_certification" name="employement_certification">
                  </div>
                  <div class="col-md-12 submit-btn">
                  <button type="submit" id="${positionName}jobPositionSubmitBtn" class="btn-send w-100 m-0">Submit</button>
                  <p id="${positionName}RequestMessage">We are processing your request please wait.</p>
                  </div>
                  </div>
                  </form>
                  </div>
                  </div>
                  </div>
                  </div>`;

// --- Append DOM Element ---
$('.job_description').append(descriptionHTML);

$(`#${positionName}RequestMessage`).hide(100);

$(document).ready(function() {
  var $countrySelector = $(`#${positionName}-country_selector`);
  $countrySelector.countrySelect();
  var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
  flag_country_code = selectedCountry.iso2;
  flag_country_name = selectedCountry.name;

  $countrySelector.on('change', function() {
    var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
    flag_country_code = selectedCountry.iso2;
    flag_country_name = selectedCountry.name;
  });
});

// --- job apply button click ---
$(document).on('click', '.jobapply_button', function() {
   $(`.singlejobdetailsdata`).show(100);
   $(`.applyform${positionName}`).hide(100);
});

// --- 2-nd Job Apply Button Click
$(document).on('click', '.onapply_button_click', function() {
  $(`.singlejobdetailsdata`).hide(100);
  $(`.applyform${positionName}`).show(100);
  var jobapply_validation = $(`#${positionName}-jobapply_form`).validate();
  jobapply_validation.resetForm();
});

// Mobile Validation
$.validator.addMethod('mobile_no', function (value, element) {
  return this.optional(element) || mobile_val[country_code].test(value);
  }, "Please enter a valid phone number");

//zip code validation
  $.validator.addMethod('zip_code', function (value, element) {
  return this.optional(element) || zip_val[country_code].test(value);
  }, "Please enter a valid phone number");    

// --- JobApply Form Validation ---
$(document).ready(function() {
$(`#${positionName}-jobapply_form`).validate({
  rules:{
    firstname:{required:true},
    lastname:{required:true},
    email:{required:true},
    apply_mobile:{required:true,
      maxlength: 15,
      minlength: 7},
    alternative_mobile:{required:true,
      maxlength: 15,
      minlength: 7},
    gender:{required:true},
    date_of_birth:{required:true},
    region:{required:true},
    city:{required:true},
    experience:{required:true},
    // message:{required:true},
    resume:{required:true},
    // country_dropdown:{required:true}
    country:{required:true}

  },
  messages:{
    firstname:{required:"Enter Name"},
    lastname:{required:"Enter Lastname"},
    email:{required:"Enter Email"},
    apply_mobile:{required: "Enter a Valid Mobile Number",
    maxlength: "Enter Valid Mobile Number",
    minlength: "Enter Valid Mobile Number",},
    alternative_mobile:{required: "Enter a Valid Mobile Number",
    maxlength: "Enter Valid Mobile Number",
    minlength: "Enter Valid Mobile Number",},
    gender:{required:"Select Gender"},
    date_of_birth:{required:"Select Date of Birth"},
    region:{required:"Enter Region"},
    city:{required:"Enter City"},
    experience:{required:"Enter Experience"},
    // message:{required:"Enter Queries"},
    resume:{required:"Upload Resume"},
    // country_dropdown:{required:"Select Country"},
    country:{required:"Select Country"}

  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
     console.log(error)
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
     },
  });
})

// --- Mobile Number Country Flag In Apply Job ---
var input = document.querySelector(`#${positionName}-apply_mobile`);
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

// --- Alter Native Mobile Number Flag ---
var input = document.querySelector(`#${positionName}-alternative_mobile`);
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
});  

// --- Base64 Resume Upload ---
$(`#${positionName}-resume`).on('change', function(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
      var inputData = reader.result;
      var replaceValue = inputData.split(',')[0] + ',';
      resumeBase64 = inputData.replace(replaceValue, "");
  };
});
// --- Base64 Education Certificate Upload --- 
$(`#${positionName}-educational_certification`).on('change', function(e){
   var file = e.target.files[0];
   var reader1 = new FileReader();
   reader1.readAsDataURL(file);
   reader1.onload = function(){
     var inputData = reader1.result;
     var replaceValue = (inputData.split(',')[0]);
     educationalCertificationBase64 = inputData.replace(replaceValue ,"");
};
});
// --- Base64 Employement Certification Upload ---
$(`#${positionName}_employement_certification`).on('change', function(e) {
var file = e.target.files[0];
var reader2 = new FileReader();
reader2.readAsDataURL(file);
reader2.onload = function() {
  var inputData = reader2.result;
  var replaceValue = inputData.split(',')[0] + ',';
  employementCertificationBase64 = inputData.replace(replaceValue, "");
};
});

// Date Of Birth Validation
$(`#${positionName}-date_of_birth`).change(function() {
  var dob = new Date($(this).val());
  var age = calculateAge(dob);
  if (age < 18) {
       $('#ageMessage').text('You must be at least 18 years old.');
       $(this).val('');
  } else {
       $('#ageMessage').text('');
  }
  });
  function calculateAge(birthDate) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
       age--;
  }
  return age;
  }

// --- Clear Validation Button Click ---
$(document).on('click', `.jobapply-btn-close-${positionName}`, function() {
  JobApply_Clear()
})

function JobApply_Clear(){
  var jobapply_validation = $(`#${positionName}-jobapply_form`).validate();
  jobapply_validation.resetForm();
  $("input[name='firstname']").val('');
  $("input[name='lastname']").val('');
  $("input[name='date_of_birth']").val('');
  $("input[name='region']").val('');
  $("input[name='city']").val('');
  $("textarea[name='message']").val('');
  $("input[name='email']").val('');
  $("input[name='apply_mobile']").val('');
  $("input[name='alternative_mobile']").val('');
  $("input[name='apply_mobile']").val("+675 ");
  $("input[name='alternative_mobile']").val("+675 ");
  $("select#gender").val('');
  $("input[name='resume']").val('');
  $("input[name='educational_certification']").val('');
  $("input[name='employement_certification']").val('');
  $("select#country_dropdown").val('');
  $("select#experience").val('');
  $(`#${positionName}jobPositionSubmitBtn`).prop('disabled', false);
  $(`#${positionName}jobPositionSubmitBtn`).css('cursor', 'pointer');
  $(`#${positionName}RequestMessage`).hide(100);
  educationalCertificationBase64 = '';
  employementCertificationBase64 = '';
}

// --- Submit Candidate Detatils ---
$(document).on('submit', `.applyform${positionName}`, function (event) {
    event.preventDefault();
    job_apply_form_valid = $(`#${positionName}-jobapply_form`).valid();
    if (job_apply_form_valid){
    $(`#${positionName}RequestMessage`).show(100);
    var form = $(this);
    var firstnameInput = form.find('#firstname').val().trim();
    var lastnameInput = form.find('#lastname').val().trim();
    var emailInput = form.find('#email').val().trim();
    var mobileInput = form.find('input[name="apply_mobile"]').val();
    var genderInput = form.find('select#gender').val();
    var date_of_birthInput = form.find('input[name="date_of_birth"]').val().trim();
    var cityInput = form.find('#city').val().trim();
    var regionInput = form.find('#region').val().trim();
    var experienceInput = form.find('select#experience').val();
    var messageInput = form.find('#message').val().trim();
    var alternative_mobile = form.find('input[name="alternative_mobile"]').val();
    var country = form.find('select#country_dropdown').val();
    var csrf_data = form.find("input[name=csrfmiddlewaretoken]").val();
    $(`#${positionName}jobPositionSubmitBtn`).prop('disabled', true);
    $(`#${positionName}jobPositionSubmitBtn`).css('cursor', 'not-allowed');
        $.ajax({
            url: 'https://gprogress.green.com.pg/submit/jobapplication/',
            type: 'post',
            data: {
                'firstname': firstnameInput,
                'lastname': lastnameInput,
                'email': emailInput,
                'mobile': mobileInput,
                'gender': genderInput,
                'date_of_birth': date_of_birthInput,
                'city': cityInput,
                'region': regionInput,
                'experience': experienceInput,
                'message': messageInput,
                'resume': resumeBase64,
                'educational_certification': educationalCertificationBase64,
                'employement_certification': employementCertificationBase64,
                'source': "1762",
                'deal_id': deal_id,
                'resume_folder_id': resume_folder_id,
                'job_type': jobtype,
                'salutation_Mr': "8616",
                'salutation_Ms': "8618",
                "job_position_id": job_position_id,
                "resume_extension": "1062",
                "login_from": "1784",
                'alternative_mobile': alternative_mobile,
                'country': country,
                'flag_country_name': flag_country_name,
                'flag_country_code': flag_country_code,
                'send_notification_to_candidate': "752",
                csrfmiddlewaretoken: csrf_data
            },
            }).done(function(json_data) {
                data = JSON.parse(json_data)
                if (data.Code === "001") {
                Lobibox.notify('success',{
                    position: 'top right',
                    msg: 'Job Request is Applied. Please Check Your Mail'
                });
                JobApply_Clear()
                setTimeout(function() {
                  $('.modal').modal('hide');
                }, 1000);
            }else {
                Lobibox.notify('warning',{
                    position: 'top right',
                    msg: 'Failed to Apply'
                });
              }    
            });
          }
        })
      });
    });
  }
});     
}; 

// --- Job Query Raise ---
function JobQueryRaiseForm(){
  $.ajax({
      url: 'https://gprogress.green.com.pg/get/jobquery_dropdown_list/',
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        var jobqueryHTML = ''
        jobqueryHTML += `<div class="row">
            <div class="col-md-8">
            <div class="joinus-title"><h3 class="fw-bold">Future Envisioned Energy Disruptors, Engaging with Difference  </h3>
            <p>Are you the one?<span class="cl-alert">(ST1)</span></p></div>
            </div>
            <div class="col-md-4">
            <button class="btn-grn-bor-2" data-bs-toggle="modal" data-bs-target="#trackcandidature">Track Your
            Candidature</button>
            <button class="btn-grn-bor-2" data-bs-toggle="modal" data-bs-target="#jobquery">Job Query</button>`
            var positionDropdown = '<select  onfocus="this.size=4;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="feed_role" name="feed_role" class="input-dsn">';
            positionDropdown += '<option value="" selected="" disabled="">--Select the Role--</option>';
            Object.keys(result).forEach(function (category, job_category_id, index) {
              var categoryData = result[category];
              var job_category_id = categoryData.job_category_id;
              positionDropdown += `<option value="${job_category_id}">${category}</option>`;
            });
            positionDropdown += '</select>'
            jobqueryHTML += `
            <div class="modal fade joinus-benefit-details " id="trackcandidature" data-bs-backdrop="static"
            data-bs-keyboard="false" tabindex="-1" aria-labelledby="trackcandidatureLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered modal-lg">
            <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close login-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
            <form class="login-module" id="login_form_validation">
            <div class="row">
            <div class="col-md-12">
            <h4 class="mb-4 text-center">Track Your Candidature</h4>
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">User Name</label>
            </div>
            <div class="col-md-7">
              <input type="text" id="login_username" name="login_username" placeholder="Enter User Email" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Password </label>
            </div>
            <div class="col-md-7">
              <input type="password" id="login_password" name="login_password" placeholder="Enter Phone Number" class="input-dsn" />
            </div>
            </div>
            <!-- <div class="row g-3 align-items-center">
            <div class="col-md-7 offset-md-5 text-end">
              <p class="form-link fgt-pass" id="forgot_btn"><u>Forgot Password</u></p>
            </div>
            </div> -->
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-7 offset-md-5 login-button-track">
              <button type="reset" class="btn-reset login-rest-btn">Reset</button> 
              <button onclick="LoginUser()" type="button" class="btn-send">Login</button>
            </div>
            </div>
            </form>
            <form class="reg-module" style="display:None;">
            <div class="row">
              <div class="col-md-12">
                <h4 class="mb-4 text-center">Track Your Candidature</h4>
              </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Email *</label>
            </div>
            <div class="col-md-7">
              <input type="text" placeholder="Enter Email" class="input-dsn" />
              <input type="submit" value="Send" class="btn-green small">
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
                <label for="" class="col-form-label">One Time Password * <small> ( Note : Enter the OTP Sent to
                    Your Registered Email )</small></label>
            </div>
            <div class="col-md-7">
                <input type="text" placeholder="Enter the One Time Password Mailed" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
                <label for="" class="col-form-label">New Password *</label>
            </div>
            <div class="col-md-7">
                <input type="password" placeholder="Enter new Password" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
                <label for="" class="col-form-label">Re-Enter New Password *</label>
            </div>
            <div class="col-md-7">
                <input type="password" placeholder="Re-Enter New Password" class="input-dsn" />
            </div>
            </div>          
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-7 offset-md-5">
              <button type="reset" class="btn-reset">Reset</button> <button type="submit"
                class="btn-send">Save</button>
            </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-md-7 offset-md-5 text-end">
                <p class="form-link fgt-log" id="login_btn"><u>Login</u></p>
              </div>
            </div>
            </form>
            </div>   
            </div>
            </div>
            </div>  
            <div class="modal fade joinus-benefit-details " id="jobquery" data-bs-backdrop="static"
              data-bs-keyboard="false" tabindex="-1" aria-labelledby="jobqueryLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered modal-lg">
            <div class="modal-content JOB-QUERY_modal">
            <div class="modal-header">
            <button type="button" class="btn-close Jobquery-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
            <form id="JobQuery_Validation">
            <div class="row job-query-page-row">
            <div class="col-md-7 offset-md-5">
            <h4 class="mb-4 job-query-text vertical-align-jobquery">JOB QUERY</h4>
            </div>       
            </div>
            <div class="job-query-modal-content">          
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">First Name *</label>
            </div>
            <div class="col-md-7">
              <input id="qfirstname" name="qfirstname" type="text" placeholder="Enter Your First Name" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Last Name *</label>
            </div>
            <div class="col-md-7">
              <input id="qlastname" name="qlastname" type="text" placeholder="Enter Your Last Name" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Email ID *</label>
            </div>
            <div class="col-md-7">
              <input id="qemail" name="qemail" type="email" placeholder="Enter Your Email ID" class="input-dsn" />
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Mobile Number *</label>
            </div>
            <div class="col-md-7  md-group show-label">
              <input type="text" placeholder="e.g. +1 702 123 4567" id="qmobile_number" name="qmobile_number" class="input-dsn mobile-input" maxlength=25 data-error=".errorTxt16" required value="+675 "/>
              <span class="errorTxt16 errormessage"></span>
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Type of Feedback *</label>
            </div>
            <div class="col-md-7">
            <div class="feedback_select_dom">
                <select  onfocus="this.size=5;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="feed_type" name="feed_type" class="input-dsn">
                <option value="" selected="" disabled="">--Select the Feedback Type--</option>
                <option value="1772">General Feedback</option>
                <option value="1774">Company Feedback</option>
                <option value="1776">Job Feedback</option>
                <option value="1778">Other Feedback</option>
                </select>
            </div> 
            </div>
            </div>
            <div class="row g-3 align-items-center mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Role *</label>
            </div>
            <div class="col-md-7">
              <div class="select_role_dom">
                  ${positionDropdown}
              </div>
            </div>
            </div>
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-5 text-md-end">
              <label for="" class="col-form-label">Queries *</label>
            </div>
            <div class="col-md-7">
              <textarea id="qqueries" name="qqueries" placeholder="Enter Your Queries" class="input-dsn in-textarea"></textarea>
            </div>
            </div>           
            <div class="row g-3 align-items-start mb-3">
            <div class="col-md-7 offset-md-5 job-query-button-track">
              <button type="reset" class="btn-reset job-query-btn-reset">Reset</button> 
              <button id="querysubmit" onclick="Sent_Query()" type="button" class="btn-send enquiry-button">Send Enquiry</button>
              <p id="JobQueryRequestMsg">We are processing your request please wait.</p>
            </div>
            </div>
            </div>
            </form>
            </div>   
            </div>
            </div>
            </div>`          
            jobqueryHTML += `</div>`
            jobqueryHTML += `</div>`

// --- Append Dom INto HTML ---
$('.track_candidate').append(jobqueryHTML); 
$('#JobQueryRequestMsg').hide(); 

// --- Close Btn Functionality - Login Form ---
$(document).on('click', '.login-close-btn', function() {
  var jobquery_validation = $("#login_form_validation").validate();
  jobquery_validation.resetForm();
  $("#login_username").val('')
  $('#login_password').val('')
})

// ---- Job Query Mobile Number Country Flag ----
var input = document.querySelector("#qmobile_number");
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
});

// --- Forgot Password Button Click Functionality ---
$(document).on('click', '#forgot_btn', function() {
  $('.login-module').hide(100);
  $('.reg-module').show(100);
});

// --- Forgot Page Login Btn Functionality ---
$(document).on('click', '#login_btn', function() {
  $('.login-module').show(100);
  $('.reg-module').hide(100);
});

// --- form validation Job Query ---
$.validator.addMethod('mobile_no', function (value, element) {
  return this.optional(element) || mobile_val[country_code].test(value);
  }, "Please enter a valid phone number");
//zip code validation
$.validator.addMethod('zip_code', function (value, element) {
return this.optional(element) || zip_val[country_code].test(value);
}, "Please enter a valid phone number");

$('#JobQuery_Validation').validate({
rules : {
  qfirstname : {required: true},
  qlastname : {required: true},
  qemail : {required: true},
  qmobile_number : {required:true,
    maxlength: 15,
    minlength: 7},
  feed_type : {required: true,},
  feed_role : {required: true},
  // qqueries : {required: true},
},
messages : {
  qfirstname : {required: "Enter First Name",},
  qlastname : {required: "Enter Last Name",},
  qemail : {required: "Enter Email",},
  qmobile_number : {required: "Enter a Valid Mobile Number",
  maxlength: "Enter Valid Mobile Number",
  minlength: "Enter Valid Mobile Number",},
  feed_type : {required: "Select Feedback"},
  feed_role : {required: "Select Role"},
  // qqueries  : {required: "Enter Queries"},
},
errorElement: 'div',
errorPlacement: function(error, element) {
  console.log(error)
    var placement = $(element).data('error');
    if (placement) {
        $(placement).append(error)
    } else {
        error.insertAfter(element);
    }
},
});

// --- Form Validation for Login ---
$('#login_form_validation').validate({
  rules : {
    login_username : {required: true},
    login_password : {required: true},
  },
  messages : {
    login_username : {required: "Enter Email",},
    login_password : {required: "Enter Mobile Number",},
  },
  errorElement: 'div',
  errorPlacement: function(error, element) {
    console.log(error)
      var placement = $(element).data('error');
      if (placement) {
          $(placement).append(error)
      } else {
          error.insertAfter(element);
      }
  },
});

// --- Reset BTN In JOB QUERY ---
$(document).on('click', '.job-query-btn-reset', function() {
  var jobquery_validation = $("#JobQuery_Validation").validate();
  jobquery_validation.resetForm();
})

// --- Reset BTN In LOGIN FORM ---
$(document).on('click', '.login-rest-btn', function() {
  var jobquery_validation = $("#login_form_validation").validate();
  jobquery_validation.resetForm();
})
}
});
}     

// --- Close Btn Functionality - Job Query ---
$(document).on('click', '.Jobquery-btn-close', function() {
  JobQuery_Clear()
})

function JobQuery_Clear(){
  var jobquery_validation = $("#JobQuery_Validation").validate();
  jobquery_validation.resetForm();
  $("#qfirstname").val('');
  $("#qlastname").val('');
  $('#qemail').val('');
  $('#qmobile_number').val('');
  $('#qmobile_number').val('+675 ');
  $("select#feed_type").val('');
  $("select#feed_role").val('');
  $('#qqueries').val('');
  $('#querysubmit').prop('disabled', false);
  $('#querysubmit').css('cursor', 'pointer');
  $('#JobQueryRequestMsg').hide();
}

// --- Sent Query Function ---
function Sent_Query(){
    form_valid = $("#JobQuery_Validation").valid();
    if (form_valid){
      $('#JobQueryRequestMsg').show(); 
      var firstnameInput = $("#qfirstname").val().trim();
      var lastnameInput = $("#qlastname").val().trim();
      var emailInput = $('#qemail').val().trim();
      var mobileInput = $('#qmobile_number').val().trim();
      var feedback = $("select#feed_type").val();
      var roleselect = $("select#feed_role").val();
      var queriesInput = $('#qqueries').val().trim(); 
      var	csrf_data = $("input[name=csrfmiddlewaretoken]").val(); 
      $('#querysubmit').prop('disabled', true);
      $('#querysubmit').css('cursor', 'not-allowed');
      $.ajax({
          url: 'https://gprogress.green.com.pg/submit/jobquery/',
          type: 'post',
          data: {
              'firstname'     : firstnameInput,
              'lastname'      : lastnameInput,
              'email'         : emailInput,
              'phone'         : mobileInput,
              'feedback'      : feedback,
              'roleselect'    : roleselect,
              'query'         : queriesInput,
              'job_query_source' : "1782",
              'login_from': "1786",
              csrfmiddlewaretoken: csrf_data
          },
          }).done(function(json_data) { 
              data = JSON.parse(json_data)
              if(data.Code === "001"){
              Lobibox.notify('success',{
                  position: 'top right',
                  msg: 'Query Sent'
              });
              JobQuery_Clear()
              setTimeout(function() {
                $('.modal').modal('hide');
              }, 2000);
              }
              else if(data.Code === "002"){
              Lobibox.notify('warning',{
                  position: 'top right',
                  msg: 'Failed'
              });
              $('#JobQueryRequestMsg').hide(); 
              }
          });
      };
  }

// --- Reach Us ---
function ReachUs_Form_Submition() {
  reachus_apply_status = $('#reachus_form_validation').valid();
  if (reachus_apply_status) {
    $('#ReachusRequestMsg').show();
    var nameInput = $("#rfirstname").val().trim();
    var lastnameInput = $("#rlastname").val().trim();
    var mobileInput = $('#rphone_number').val().trim();
    var emailInput = $("#remail_address").val().trim();
    var messageInput = $("#rrequirement_message").val().trim();
    var isWhatsAppNumber = false;
    if ($("#whatsapp_checkbox").prop("checked")) {
      isWhatsAppNumber = true;
    }
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $('#btnGetCaptcha').prop('disabled', true);
    $('#btnGetCaptcha').css('cursor', 'not-allowed');
    $.ajax({
      url: 'https://gprogress.green.com.pg/submit/reach_us/',
      type: 'post',
      data: {
        'firstname': nameInput,
        'lastname': lastnameInput,
        'email': emailInput,
        'phone': mobileInput,
        'message': messageInput,
        "lead_type": "1790",
        "login_from": "1788",
        "is_whatsapp_number": isWhatsAppNumber,
        csrfmiddlewaretoken: csrf_data
      },
    }).done(function(json_data) {
      data = JSON.parse(json_data);
      if (data.Code === "001") {
        Lobibox.notify('success', {
          position: 'top right',
          msg: 'Your Query is Raised and Team will contact you soon'
        });
        ReachusOnClose()
      } else if (data.Code === "002") {
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Failed'
        });
        $('#ReachusRequestMsg').hide();
      }
    });
  }
}

// --- User Login Functionality ---
function LoginUser() {
  login_form_valid = $("#login_form_validation").valid();
  if (login_form_valid){
  var usernameInput = $("#login_username").val().trim();
  var passwordInput = $('#login_password').val().trim();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  $.ajax({
      url: 'https://gprogress.green.com.pg/login/user/',
      type: 'post',
      data: {
          'username': usernameInput,
          'password': passwordInput,
          csrfmiddlewaretoken: csrf_data,
      },
  }).done(function (json_data) {
      var data = JSON.parse(json_data);
      if (data.Code === "001") {
          Lobibox.notify('success',{
            position: 'top right',
            msg: 'Login Successful. You can view your Candidature Status'
          });
          $("#login_username").val('')
          $('#login_password').val('')
          setTimeout(function() {
            globalResponseData = data;
            localStorage.setItem('globalResponseData', JSON.stringify(globalResponseData)); // Store in localStorage
            window.location.href = 'dashboard.html';
          }, 1000);

      } else if (data.Code === "002") {
        Lobibox.notify('warning',{
          position: 'top right',
          msg: 'Login Authentication Failed'
          });
          $('#login_password').val('')
      }
  }).fail(function () {
    Lobibox.notify('error',{
      position: 'top right',
      msg: 'Login Authentication Failed'
    });
    setTimeout(function() {
      window.location.href = 'joinus.html';
    }, 2000);
  });
}
}

// --- Get User Details Form Bitrix ---
$(document).ready(function () {
var storedData = localStorage.getItem('globalResponseData');
var data = JSON.parse(storedData)
if (data) {
  $.ajax({
    url: 'https://gprogress.green.com.pg/login/user/get_details/',
    type: 'post',
    data: {
        'deal_id': data.UserDetails.deal_id,
        'position_id': data.UserDetails.position_id,
        'user_email_id': data.UserDetails.user_email_id,
        'deal_id': data.UserDetails.deal_id
    },
    success: function (json_data) {
      var responseData = JSON.parse(json_data);
      handleCodeResponse(responseData);
    },
    error: function () {
        Lobibox.notify('error',{
          position: 'top right',
          msg: 'Unable to retrieve details'
        });
    }
    });
} else {
}
});

// --- Dynamic Dashboard ---
function handleCodeResponse(data) {
  var login_user_details = data.UserDetails; // Assuming data is the JSON response object
  var firstname = data.firstname;
  var lastname = data.lastname;
  var email_id = data.user_email;
  var deal_id = data.deal_id;
  var dashboardHTML = '';
  dashboardHTML += `
      <div class="row">
      <div class="col">
        <h4 class="title">${firstname} ${lastname}</h4>
      <p class="mb-0"></p>
      </div>
      <div class="col-auto">
      <p><a href="#" id="logout">Log out</a></p>
      </div>
      </div>
      <div class="row">
      <div class="col-md-12">
      <label>Job Applied List<span class="asterisk"></span></label>`
  var User_Applied_Position_List = '<select  onfocus="this.size=6;" onblur="this.size=0;" onchange="this.size=1; this.blur()"   id="DashboardPositionDropdown" class="form-control select2" name="DashboardPositionDropdown">';
  login_user_details.forEach((position, index) => {
    User_Applied_Position_List += `<option value="${position.position_id}" ${index === 0 ? 'selected' : ''}>${position.position_name}</option>`;
  });
  User_Applied_Position_List += '</select>';
  dashboardHTML += 
      `${User_Applied_Position_List}
      </div>
      </div>
      `
  $('#employee_details_header').append(dashboardHTML);

  // --- Ajax Implementation Login User Get Details ---
  $(document).ready(function() {
    $.ajax({
        url: 'https://gprogress.green.com.pg/dashboard/user/get_details/',
        method: 'post',
        data: {
            "position_id": login_user_details[0].position_id, // Select the first position by default
            "email_id": email_id,
            "deal_id": deal_id,
        },
        success:function(json_data) {
          var data = JSON.parse(json_data);
          DashboardDataResponse(data);
        },
        error: function(error) {
            console.error('Error sending data to backend:', error);
        }
    });
  })

  // Attach the change event handler after the dropdown is populated
  $('#DashboardPositionDropdown').on('change', function() {
    var selectedPositionId = $(this).val(); // Get selected position id
    // --- Ajax Implementation Login User Get Details ---
    $(document).ready(function() {
      $.ajax({
          url: 'https://gprogress.green.com.pg/dashboard/user/get_details/',
          method: 'post',
          data: {
             "position_id": selectedPositionId,
             "email_id": email_id,
             "deal_id": deal_id,
          },
          success:function(json_data) {
            var data = JSON.parse(json_data);
            DashboardDataResponse(data);
          },
          error: function(error) {
              console.error('Error sending data to backend:', error);
          }
      });
  });
});

// --- LogOut Function ----
$('#logout').on('click', function() {
  Lobibox.notify('success',{
  position: 'top right',
  msg: 'Thanks for Visiting'
  });
  setTimeout(function() {
  localStorage.clear();
  window.location.replace("joinus.html");
  }, 1000);
});
}

// Mobile Validation
$.validator.addMethod('mobile_no', function (value, element) {
  return this.optional(element) || mobile_val[country_code].test(value);
  }, "Please enter a valid phone number");
  
//zip code validation
$.validator.addMethod('zip_code', function (value, element) {
return this.optional(element) || zip_val[country_code].test(value);
}, "Please enter a valid phone number");

// --- form validation ---
$('#reachus_form_validation').validate({
  rules:{
      rfirstname:{required:true},
      rlastname:{required:true},
      remail_address:{required:true},
      rphone_number:{required:true,
        maxlength: 15,
        minlength: 7},
      rrequirement_message:{required:true},
      textInput:{required:true},
  },
  messages:{
      rfirstname:{required:"Enter First Name"},
      rlastname:{required:"Enter Last Name"},
      remail_address:{required:"Enter Email"},
      rphone_number:{required: "Enter a Valid Mobile Number",
         maxlength: "Enter Valid Mobile Number",
         minlength: "Enter Valid Mobile Number",},
      rrequirement_message:{required:"Enter Message",},
      textInput:{required:"Please Enter Captcha",},
  },
  errorElement: 'div',
   errorPlacement: function(error, element) {
	   console.log(error)
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
});

// --- Mobile Flag Country Code In Reach US ---
var input = document.querySelector("#rphone_number");
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
});

// --- Reach Us Clear Functionality ---
function ReachusOnClose(){
  var Reachus_validation = $("#reachus_form_validation").validate();
  Reachus_validation.resetForm();
  $("#rfirstname").val('');
  $("#rlastname").val('');
  $("#remail_address").val('');
  $("#rphone_number").val('');
  $("#rphone_number").val("+675 ");
  $("#whatsapp_checkbox").prop("checked", false);
  $("#rrequirement_message").val('');
  $("#textInput").val('');
  $('#ReachusRequestMsg').hide();
  $('#btnGetCaptcha').prop('disabled', false);
  $('#btnGetCaptcha').css('cursor', 'pointer');
}

// -- Dynamic Dashboard Based Login Users ---
function DashboardDataResponse(response){
  $('#employee_details_header').show();
  $('#jobDiscription').empty();
  $('#employee_screening').empty();
  var dashboardHTMLDOM = ''
  var screeningHTMLDOM = ''
  var userDetails = response.UserDetails;
    screeningHTMLDOM += `
      <ul type="none" class="cl_tab_nav dashboard_design">
      <li class="cl_tab_li enable" id="tab_1">
      <p>
      <span>
      <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">1</span>
        <b>Step 1</b> - Screening
      </p>
      </li>
      <li class="cl_tab_li enable" id="tab_2">
      <p>
      <span>
      <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">2</span>
        <b>Step 2</b> - Interview
      </p>
      </li>
      <li class="cl_tab_li enable active" id="tab_3">
      <p>
      <span>
        <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">3</span>
      <b>Step 3</b> - Offer
      </p>
      </li>
      <li class="cl_tab_li" id="tab_4">
      <p>
      <span>
        <i class="fa fa-check" aria-hidden="true"></i>
      </span>
      <span class="number">4</span>
         <b>Step 4</b> - Hired
      </p>
      </li>
      </ul>
      <div class="cl_tab mt-3">
      <div class="cl_tab_detial" id="tab_1_view">
      <p class="col-md-12">${userDetails.description}</p>
      <!-- <div class="text-center mt-100px">
         <button type="reset" class="btn btn-light-green me-3">Back</button>
         <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Revoke Application</span></button> 
      </div>          -->
      </div>
      <div class="cl_tab_detial" id="tab_2_view">
      <p class="col-md-12">${userDetails.description}</p>
      <!--<div class="text-center mt-100px">
           <button type="reset" class="btn btn-light-green me-3">Back</button>
           <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Revoke Application</span></button> 
      </div>-->
      </div>
      <div class="cl_tab_detial active" id="tab_3_view">
      <p class="col-md-12">${userDetails.description}</p>
      <!-- <div class="text-center mt-100px">
          <button type="reset" class="btn btn-light-green me-3">Reject</button> 
          <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Accept Offer</span></button>
      </div> -->
      </div>
      <div class="cl_tab_detial" id="tab_4_view">
      <p class="col-md-12">${userDetails.description}</p>
       <!--<div class="text-center mt-100px">
        <button class="btn-gra-green mt-2 d-inline-block" id="accept_offer"><span>Download Offer Confirmation & Communication Letter </span> <img src="dist/images/cloud-download.png"></button> 
      </div>-->
      </div>
      </div>
      </div>`
      $('#employee_screening').append(screeningHTMLDOM)
      dashboardHTMLDOM += `
      <div class="box-shadow p-4 h-80vh user-details overflow-auto">
      <div class="p-3 dashboard_side">
      <div class="mb-2">
        <label class="form-label">First Name <span class="mark">*</span></label>
        <input type="text" class="form-control" value="${userDetails.firstname}" disabled="">
      </div>
      <div class="mb-2">
         <label class="form-label">Last Name <span class="mark">*</span></label>
         <input type="text" class="form-control" value="${userDetails.lastname}" disabled="">
      </div>
      <div class="mb-2">
         <label class="form-label">Gender <span class="mark">*</span></label>
         <input type="text" class="form-control" value="${userDetails.gender}" disabled="">
      </div>
      <div class="mb-2">
         <label class="form-label">Mobile Number <span class="mark">*</span></label>
         <input type="text" class="form-control" value="${userDetails.phone}" disabled="">
      </div>
      <div class="mb-2">
          <label class="form-label">Email ID <span class="mark">*</span></label>
          <input type="email" class="form-control" value="${userDetails.email}" disabled="">
      </div>
      <div class="mb-2">
          <label class="form-label">Country <span class="mark">*</span></label>
          <input type="text" class="form-control" value="${userDetails.location}" disabled="">
      </div>
      </div>
      </div>`    

// --- Append Class DOM ---
$('#jobDiscription').append(dashboardHTMLDOM);

// --- Dashboard Dynamically Changes stage functionality ---
function showTabContent(tabId) {
  $('.tab_content').hide();
  $("#" + tabId + "_view").show();
}

$(document).ready(function() {
  const stageId = `${userDetails.stageId}`;
  const tabToActivate = determineTabToActivate(stageId);
});
     
function determineTabToActivate(stageId) {
    if (stageId === "DT172_176:NEW" ||
        stageId === "DT172_176:UC_VQKR8B" ||
        stageId === "DT172_176:UC_R42PLX" ||
        stageId === "DT172_176:PREPARATION") {
        showTabContent('tab_1');
        $('.cl_tab_li').removeClass('enable active');
        $('#tab_1').addClass('enable active');
        $("#tab_2_view, #tab_3_view, #tab_4_view").hide();
        return 'tab_1';
    } else if (
        stageId === "DT172_176:UC_W4BUHV" ||
        stageId === "DT172_176:UC_6R4493" ||
        stageId === "DT172_176:UC_VW252I" ||
        stageId === "DT172_176:UC_PLHG7M" ||
        stageId === "DT172_176:UC_U0KDG6" ||
        stageId === "DT172_176:UC_23HCJT" ||
        stageId === "DT172_176:UC_EF7KM3" ||
        stageId === "DT172_176:UC_F7QP1O" ||
        stageId === "DT172_176:UC_IGGLX8") {
        showTabContent('tab_2');
        $('.cl_tab_li').removeClass('enable active');
        $('#tab_1,#tab_2').addClass('enable active');
        $("#tab_1_view, #tab_3_view, #tab_4_view").hide();
        return 'tab_2';
    } else if (
         stageId === "DT172_176:UC_WLHO36" ||
         stageId === "DT172_176:UC_872VPE" ||
         stageId === "DT172_176:UC_I5SX7D" ||
         stageId === "DT172_176:UC_T30Q6V" ||
         stageId === "DT172_176:UC_CJM0PC" ||
         stageId === "DT172_176:UC_V5K99R" ||
         stageId === "DT172_176:UC_SGSBLW" ||
         stageId === "DT172_176:UC_ZC1Y3G" ||
         stageId === "DT172_176:UC_0EPLGE" ||
         stageId === "DT172_176:UC_47NFAY" ||
         stageId === "DT172_176:UC_ZYKODY" ||
         stageId === "DT172_176:UC_EA1MCB") {
         showTabContent('tab_3');
         $('.cl_tab_li').removeClass('enable active');
         $('#tab_1,#tab_2,#tab_3').addClass('enable active');
         $("#tab_1_view, #tab_2_view, #tab_4_view").hide();
         return 'tab_3';      
    } else if (
         stageId === "DT172_176:UC_YXYADF") {
         showTabContent('tab_4');
         $('.cl_tab_li').removeClass('enable active');
         $('#tab_1,#tab_2,#tab_3,#tab_4').addClass('enable active');
         $("#tab_1_view, #tab_2_view, #tab_3_view").hide();
         return 'tab_4';
      }
   }      
}

// --- On Click Contact Form ---
$(document).on('click', '.onContactForm', function() {
  CaptchaValidation();
})

// --- Captcha entry ---
function CaptchaValidation() {
  $("#btnGetCaptcha").prop("disabled", false);
  var iNumber = Math.floor(Math.random() * 10000);
  $("#divGenerateRandomValues").css({
    "background-image": 'url(../img/captcha.png)',
    'width': '100px',
    'height': '50px'
  });
  $("#divGenerateRandomValues").html("<input id='txtNewInput'></input>");
  $("#txtNewInput").css({
    'width': '100px',
    'border': 'none',
    'color': 'black'
  });
  $("#txtNewInput").val(iNumber);
  $("#txtNewInput").prop('disabled', true);
}

// --- Captcha Validation ---
$(document).ready(function() {
  $('#ReachusRequestMsg').hide();
  CaptchaValidation();
  $("#btnGetCaptcha").click(function() {
    var iNumber = parseInt($("#txtNewInput").val());
    if ($("#textInput").val() != iNumber) {
      reachus_apply_status = $('#reachus_form_validation').valid();
      if (reachus_apply_status) {
        Lobibox.notify('warning',{
          position: 'top right',
          msg: 'Please Enter the Correct Captcha'
        });
      }
    } else {
      ReachUs_Form_Submition();
    }
  });
});

