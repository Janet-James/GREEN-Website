var supplierBrousherUpload = [];
var businessAnnualReportFileUpload = [];
var productselectedCheckboxIds = [];
var additionselectCheckboxIds = [];
var currency_country_code = null;
var supplier_law_country_code = null;

$(document).ready(function () {
    ProductGetList()
});

// --- Wizard Form Event Start Here --- 
$(document).ready(function(){
    $("#onGotoStakeholdersDetails").click(function(){
    $(".iti__flag-container").css({
      'margin-top': '-6px'
    });
    company_details_form_valid = $('#append_supplier_company_details').valid();
    if (company_details_form_valid){
      if (productselectedCheckboxIds.length === 0 && additionselectCheckboxIds.length === 0) {
          Lobibox.notify('warning', {
            position: 'top right',
            msg: 'Please Select Product'
          });
      }else{
        $("#tab-2").removeClass("disable");
        $("#tab-2").addClass("enable");
        $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
        $("#tab-2, .tab-2-view").addClass("active");  
        $(".tab-2-view").show();
        $(".tab-3-view").hide();}
    }
    });
    $("#onGotoBusinessDetails").click(function(){
    $(".iti__flag-container").css({
      'margin-top': '-6px'
    });
    stakeholder_form_valid = $('#append_stakeholder_details').valid();
    if (stakeholder_form_valid){
        $("#tab-3").removeClass("disable");
        $("#tab-3").addClass("enable");
        $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
        $("#tab-3, .tab-3-view").addClass("active");
        $(".tab-3-view").show();
    }
    });

    $("#onBacktoCompanyDetails").click(function(){
        $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
        $("#tab-1, .tab-1-view").addClass("active");
    });

    $("#onBacktoStakeholdersDetails").click(function(){
        $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
        $("#tab-2, .tab-2-view").addClass("active");
    });
});

// ---- Supplier Company Name Append ----
$('#supplier_company_name').on('change', function(e) {
  $('#supplier_company_name_append').empty();
  $('#supplier_company_name_append_2').empty();
  supplier_company_name = $("#supplier_company_name").val().trim();
  companyHTML = `<h3 class="title">Welcome ${supplier_company_name}</h3>`
  $('#supplier_company_name_append').append(companyHTML)
  $('#supplier_company_name_append_2').append(companyHTML)
})

// ------ Brousher File Upload -------
$('#myFile').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader) {
          currentReader.onload = function () {
              var inputData = currentReader.result;
              var replaceValue = (inputData.split(',')[0]);
              var fileData = inputData.replace(replaceValue, "");
              supplierBrousherUpload.push(fileData);
              if (supplierBrousherUpload.length === files.length) {
                  console.log(supplierBrousherUpload);
              }
          };
      })(reader);
  }
});

// ---- Supplier Annual Report File Upload -----
$('#attach_annual_reports').on('change', function (e) {
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      (function (currentReader) {
          currentReader.onload = function () {
              var inputData = currentReader.result;
              var replaceValue = (inputData.split(',')[0]);
              var fileData = inputData.replace(replaceValue, "");
              businessAnnualReportFileUpload.push(fileData);
              if (businessAnnualReportFileUpload.length === files.length) {
                  console.log(businessAnnualReportFileUpload);
              }
          };
      })(reader);
  }
});

// ---- Data Detail ----
var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];
$(document).ready(function () {
    $("#supplier_company_name, #supplier_registerd_address, #supplier_correspondence_address, #supplier_factory_address, #supplier_year_established, #supplier_law, #supplier_date, #supplier_place, #supplier_organization, #supplier_company_email, #supplier_website_link, #supplier_telephone_no, #supplier_mobile_no").on("input", function () {
        var supplierCompanyName = $("#supplier_company_name").val();
        var supplierRegisteredAddress = $("#supplier_registerd_address").val();
        var supplierCorrespondenceAddress = $("#supplier_correspondence_address").val();
        var supplierFactoryAddress = $("#supplier_factory_address").val();
        var supplierYearEstablished = $("#supplier_year_established").val();
        var supplierLaw = $("#supplier_law").val();
        var supplierDate = $("#supplier_date").val();
        var parsedDate = new Date(supplierDate);
        var formattedDate = parsedDate.getDate() + "-" + monthNames[parsedDate.getMonth()] + "-" + parsedDate.getFullYear();
        // var supplierPlace = $("#supplier_place").val();
        var supplierOrganization = $("select#supplier_organization").val();
        var supplierCompanyEmail = $("#supplier_company_email").val();
        var supplierWebsiteLink = $("#supplier_website_link").val();
        var supplierTelephoneNo = $("#supplier_telephone_no").val();
        var supplierMobileNo = $("#supplier_mobile_no").val();
        $("#company_name_value").text(supplierCompanyName);
        $("#registerd_address_value").text(supplierRegisteredAddress);
        $("#correspondence_address_value").text(supplierCorrespondenceAddress);
        $("#factory_address_value").text(supplierFactoryAddress);
        $("#date_place_incorporation_value").text(formattedDate);
        $("#year_established_value").text(supplierYearEstablished);
        $("#under_laws_value").text(supplierLaw);
        $("#type_organization_value").text(supplierOrganization);
        $("#company_email_value").text(supplierCompanyEmail);
        $("#company_website_value").text(supplierWebsiteLink);
        $("#office_telephone_no_value").text(supplierTelephoneNo);
        $("#office_mobile_no_value").text(supplierMobileNo);
    });
});

// ----- StakeHolder Data ------
$(document).ready(function () {
    $("#stakeholder_partner_name, #stakeholder_chief_executive_name, #stakeholder_chief_executive_email, #stakeholder_chief_executive_phone, #stakeholder_manager_name, #stakeholder_manager_email, #stakeholder_manager_phone, #stakeholder_contact_person_name, #stakeholder_contact_person_email, #stakeholder_contact_person_phone").on("input", function () {
        var stakeholderPartnerName = $("#stakeholder_partner_name").val();
        var stakeholderChiefExecutiveName = $("#stakeholder_chief_executive_name").val();
        var stakeholderChiefExecutiveEmail = $("#stakeholder_chief_executive_email").val();
        var stakeholderChiefExecutivePhone = $("#stakeholder_chief_executive_phone").val();
        var stakeholderManagerName = $("#stakeholder_manager_name").val();
        var stakeholderManagerEmail = $("#stakeholder_manager_email").val();
        var stakeholderManagerPhone = $("#stakeholder_manager_phone").val();
        var stakeholderContactPersonName = $("#stakeholder_contact_person_name").val();
        var stakeholderContactPersonEmail = $("#stakeholder_contact_person_email").val();
        var stakeholderContactPersonPhone = $("#stakeholder_contact_person_phone").val();
        
        $("#owner_name_value").text(stakeholderPartnerName);
        $("#officer_name_value").text(stakeholderChiefExecutiveName);
        $("#officer_email_value").text(stakeholderChiefExecutiveEmail);
        $("#officer_phone_value").text(stakeholderChiefExecutivePhone);
        $("#gm_name_value").text(stakeholderManagerName);
        $("#gm_email_value").text(stakeholderManagerEmail);
        $("#gm_phone_value").text(stakeholderManagerPhone);
        $("#contact_name_value").text(stakeholderContactPersonName);
        $("#contact_email_value").text(stakeholderContactPersonEmail);
        $("#contact_phone_value").text(stakeholderContactPersonPhone);
    });
});

// ----- Product Get List ----
function ProductGetList() {
  $.ajax({
      url: 'https://gprogress.green.com.pg/product_dropdown_list/',
      contentType: 'application/json',
      dataType: 'json',
      success: function (result) {
          var productHTML = '';
          result.forEach(function (values) {
              var product_id = values.product_list_id;
              var product_name = values.product_name;
              productHTML += `
                  <div class="product-details-checkbox row">
                      <div class="col">
                          <label for="${product_id}" class="pt-2" style="font-size: 86%">${product_name}</label>
                      </div>
                      <div class="col-auto">
                          <input type="checkbox" id="${product_id}" name="product_checkbox">
                      </div>
                  </div>`;
          });
          $('#product_group_list').append(productHTML);
          $('#mobile_product_group_list').append(productHTML);
          $('#product_group_list, #mobile_product_group_list').on('change', 'input[name="product_checkbox"]', function () {
              var checkboxId = $(this).attr('id');
              if ($(this).prop('checked')) {
                  productselectedCheckboxIds.push(checkboxId);
              } else {
                  productselectedCheckboxIds = productselectedCheckboxIds.filter(id => id !== checkboxId);
              }
          });
          // Search Option 
          $("#product_add_list, #mobile_product_add_list").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".product-details-checkbox").each(function () {
                var label = $(this).find('label').text().toLowerCase();
                var shouldShow = label.indexOf(value) > -1;
                $(this).toggle(shouldShow);
            });
        });        
      }
  });
}

// ----- Organization List -----
$(document).ready(function () {
    $.ajax({
        url: 'https://gprogress.green.com.pg/organsation_dropdown_list/',
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var organizationHTML = '<label  class="floating-select-label">Type of Organization  </label>';
            organizationHTML += '<select onfocus="this.size=3;" onblur="this.size=0;" onchange="this.size=1; this.blur()" id="supplier_organization" class="form-control select2 floating-select-2" name="supplier_organization" aria-required="true">';
            organizationHTML += '<option value="">Choose Type</option>';
            result.forEach(function (values){
                var organization_id = values.organisation_list_id;
                var organization_name = values.organisation_name;
                organizationHTML += '<option value="' + organization_id + '">' + organization_name + '</option>';
            });
            organizationHTML += '</select>';
            $('#organizationDropdown').append(organizationHTML);
        }
    });
});

// ---- Country Select ---- 
$(document).ready(function() {
  var $countrySelector = $('#supplier_law');
  $countrySelector.countrySelect();
  var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
  supplier_law_country_code = selectedCountry.iso2;
  supplier_law_country_name = selectedCountry.name;

  $countrySelector.on('change', function() {
    var selectedCountry = $countrySelector.countrySelect("getSelectedCountryData");
    supplier_law_country_code = selectedCountry.iso2;
    supplier_law_country_name = selectedCountry.name;
  });
});

// ---- Currency Select ---- 
var $countrySelector = $('#currency_selector');
$countrySelector.currencyCountrySelect();
var selectedCountry = $countrySelector.currencyCountrySelect("getSelectedCountryData");
currency_country_code = selectedCountry.iso2;
currency_country_name = selectedCountry.name;

$countrySelector.on('change', function() {
  var selectedCountry = $countrySelector.currencyCountrySelect("getSelectedCountryData");
  currency_country_code = selectedCountry.iso2;
  currency_country_name = selectedCountry.name;
});

// ---- Web Add Product ----
function ProductAddList(){
  var product_add_list = $("#product_add_list").val();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if (product_add_list === "") {
      Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Please Enter the Product.'
      });
  } else {
      $('#productAppend').prop('disabled', true);
      $('#productAppend').css('cursor', 'not-allowed');
      $.ajax({
          url: 'https://gprogress.green.com.pg/add/product_list/',
          type: 'post',
          data: {
              'product_name': product_add_list,
              csrfmiddlewaretoken: csrf_data
          },
      }).done(function (json_data) {
          data = JSON.parse(json_data);
          product_data = data.product_list;
          var productHTML = '';
          product_data.forEach(function (values) {
              var product_id = values.ID;
              var product_name = values.NAME;
              var labelId = 'label_' + product_id;
              var checkboxId = product_id;
              productHTML += `
                  <div class="product-details-checkbox row">
                      <div class="col">
                          <label for="${labelId}" class="pt-2" style="font-size: 86%">${product_name}</label>
                      </div>
                      <div class="col-auto">
                          <input type="checkbox" id="${checkboxId}" name="additional_product_checkbox" checked>
                      </div>
                  </div>`;
              additionselectCheckboxIds.push(checkboxId);
          });
          var existingHTML = $('#product_group_list').html();
          var productConHTML = existingHTML + productHTML;
          $('#product_group_list').html(productConHTML);
          if (data.Code === "001") {
              Lobibox.notify('success', {
                  position: 'top right',
                  msg: 'Product Added.'
              });
              $('#productAppend').prop('disabled', false);
              $('#productAppend').css('cursor', 'pointer');
              $('#product_add_list').val('');
              $('#product_add_list').trigger('keyup');
          } else if (data.Code === "002") {
              Lobibox.notify('warning', {
                  position: 'top right',
                  msg: 'Failed to Add Product.'
              });
              $('#product_add_list').val('');
          }
      });
  }
}

// ---- Mobile Product Add ----
function MobileProductAddList(){
  var product_add_list = $("#mobile_product_add_list").val();
  var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
  if (product_add_list === "") {
      Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Please Enter the Product.'
      });
  } else {
      $('#mobileproductAppend').prop('disabled', true);
      $('#mobileproductAppend').css('cursor', 'not-allowed');
      $.ajax({
          url: 'https://gprogress.green.com.pg/add/product_list/',
          type: 'post',
          data: {
              'product_name': product_add_list,
              csrfmiddlewaretoken: csrf_data
          },
      }).done(function (json_data) {
          data = JSON.parse(json_data);
          product_data = data.product_list;
          var productHTML = '';
          product_data.forEach(function (values) {
              var product_id = values.ID;
              var product_name = values.NAME;
              var labelId = 'label_' + product_id;
              var checkboxId = product_id;
              productHTML += `
                  <div class="product-details-checkbox row">
                      <div class="col">
                          <label for="${labelId}" class="pt-2" style="font-size: 86%">${product_name}</label>
                      </div>
                      <div class="col-auto">
                          <input type="checkbox" id="${checkboxId}" name="additional_product_checkbox" checked>
                      </div>
                  </div>`;
              additionselectCheckboxIds.push(checkboxId);
          });
          var existingHTML = $('#mobile_product_group_list').html();
          var productConHTML = existingHTML + productHTML;
          $('#mobile_product_group_list').html(productConHTML);
          if (data.Code === "001") {
              Lobibox.notify('success', {
                  position: 'top right',
                  msg: 'Product Added.'
              });
              $('#mobileproductAppend').prop('disabled', false);
              $('#mobileproductAppend').css('cursor', 'pointer');
              $('#mobile_product_add_list').val('');
              $('#mobile_product_add_list').trigger('keyup');
          } else if (data.Code === "002") {
              Lobibox.notify('warning', {
                  position: 'top right',
                  msg: 'Failed to Add Product.'
              });
              $('#mobile_product_add_list').val('');
          }
      });
  }
}

// --- Supplier Partner Submit Form ---
function SupplierPartnerSubmitBtn(){
    // Company Details
    var supplier_company_name = $("#supplier_company_name").val();
    var supplier_registerd_address = $("#supplier_registerd_address").val();
    var supplier_correspondence_address = $("#supplier_correspondence_address").val();
    var supplier_factory_address = $("#supplier_factory_address").val();
    var supplier_year_established = $("#supplier_year_established").val();
    var supplier_date = $("#supplier_date").val();
    var supplier_place = $("#supplier_place").val();
    // var supplier_organization = form.find("select#supplier_organization").val();
    var supplier_organization = $('#supplier_organization').val();
    var supplier_company_email = $("#supplier_company_email").val();
    var supplier_website_link = $("#supplier_website_link").val();
    var supplier_telephone_no = $("#supplier_telephone_no").val();
    var supplier_mobile_no = $("#supplier_mobile_no").val();
    var isWhatsAppNumber = false;
    if ($("#whatsapp_checkbox").prop("checked")) {
      isWhatsAppNumber = true;
    }
    // StateHolder Details
    var stakeholder_partner_name = $("#stakeholder_partner_name").val();
    var stakeholder_chief_executive_name = $("#stakeholder_chief_executive_name").val();
    var stakeholder_chief_executive_email = $("#stakeholder_chief_executive_email").val();
    var stakeholder_chief_executive_phone = $("#stakeholder_chief_executive_phone").val();
    var stakeholder_manager_name = $("#stakeholder_manager_name").val();
    var stakeholder_manager_email = $("#stakeholder_manager_email").val();
    var stakeholder_manager_phone = $("#stakeholder_manager_phone").val();
    var stakeholder_contact_person_name = $("#stakeholder_contact_person_name").val();
    var stakeholder_contact_person_email = $("#stakeholder_contact_person_email").val();
    var stakeholder_contact_person_phone = $("#stakeholder_contact_person_phone").val();
    // Business Details
    var annual_sales = $("#annual_sales").val();
    var factory_size = $("#factory_size").val();
    var no_of_employee = $("#no_of_employee").val();
    var no_of_offices = $("#no_of_offices").val();
    var factory_locations = $("#factory_locations").val();
    var no_of_plants = $("#no_of_plants").val();
    var business_type = $('#business_type').find(":selected").val();
    var no_of_warehouses = $("#no_of_warehouses").val();
    var warehouse_location = $("#warehouse_location").val();
    var production_capacity = $("#production_capacity").val();
    var export_countries = $("select#export_country_list").val() || [];
    var international_shipping_terms = $("#international_shipping_terms").val();
    $('#SupplierPartnerSubmit').prop('disabled', true);
    $('#SupplierPartnerSubmit').css('cursor', 'not-allowed');
    var csrf_data = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url: 'https://gprogress.green.com.pg/submit/supplier_partner/',
        type: 'post',
        data: {
          'supplier_company_name': supplier_company_name,
          'supplier_registerd_address': supplier_registerd_address,
          'supplier_correspondence_address': supplier_correspondence_address,
          'supplier_factory_address': supplier_factory_address,
          'supplier_year_established': supplier_year_established,
          "supplier_law_country": supplier_law_country_code,
          "supplier_date": supplier_date,
          "supplier_place": supplier_place,
          "supplier_organization": supplier_organization,
          "supplier_company_email": supplier_company_email,
          "supplier_website_link": supplier_website_link,
          "supplier_telephone_no": supplier_telephone_no,
          "supplier_mobile_no": supplier_mobile_no,
          "whatsapp_checkbox": isWhatsAppNumber,
          "brousher_file_upload": supplierBrousherUpload,
          "product_selected": productselectedCheckboxIds,
          "partner_name": stakeholder_partner_name,
          "chief_executive_name": stakeholder_chief_executive_name,
          "chief_executive_email": stakeholder_chief_executive_email,
          "chief_executive_phone": stakeholder_chief_executive_phone,
          "manager_name": stakeholder_manager_name,
          "manager_email": stakeholder_manager_email,
          "manager_phone": stakeholder_manager_phone,
          "contact_person_name": stakeholder_contact_person_name,
          "contact_person_email": stakeholder_contact_person_email,
          "contact_person_phone": stakeholder_contact_person_phone,
          "annual_sales": annual_sales,
          "currency_selector": currency_country_name,
          "factory_size": factory_size,
          "no_of_employee": no_of_employee,
          "no_of_offices": no_of_offices,
          "factory_locations": factory_locations,
          "no_of_plants": no_of_plants,
          "business_type": business_type,
          "no_of_warehouses": no_of_warehouses,
          "warehouse_location": warehouse_location,
          "production_capacity": production_capacity,
          "export_countries": export_countries,
          "international_shipping_terms": international_shipping_terms,
          "annual_report_upload": businessAnnualReportFileUpload,
          "additional_product_select": additionselectCheckboxIds,
          csrfmiddlewaretoken: csrf_data
        }
      }).done(function(json_data) {
      data = JSON.parse(json_data);
      console.log("Upload Success -- ", data)
      if (data.Code === "001") {
        Lobibox.notify('success', {
          position: 'top right',
          msg: 'Sent Supplier partner Details'
        });
        $("#tab-1, .tab-1-view").addClass("active");
        $("#tab-2, .tab-2-view").removeClass("disable");
        $("#tab-3, .tab-3-view").removeClass("disable");
        $("#tab-2").removeClass("enable");
        $("#tab-3").removeClass("enable");
        $("#tab-2").addClass("disable");
        $("#tab-3").addClass("disable");
        $(".tab-2-view").hide();
        $(".tab-3-view").hide();
        $(".drop-zone__thumb").remove();
        $('#product_group_list').empty();
        ProductGetList()
        clearFormFields()
      }else if (data.Code === "002") {
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Failed to Sent'
        });
      }else{
        Lobibox.notify('warning', {
          position: 'top right',
          msg: 'Error'
        });
      }
   });
}

// --- Company Details --- 
$('#append_supplier_company_details').validate({
    rules:{
        supplier_company_name:{required:true},
        supplier_registerd_address:{required:true},
        // supplier_factory_address:{required:true},
        // supplier_year_established:{required:true},
        supplier_law:{required:true},
        // supplier_date:{required:true},
        // supplier_place:{required:true},
        // supplier_organization:{required:true},
        supplier_company_email:{required:true},
        // myFile:{required:true},
        supplier_telephone_no: {
          maxlength: 15,
          minlength: 7
        },
        supplier_mobile_no: {
          maxlength: 15,
          minlength: 7
        },
    },
    messages:{
        supplier_company_name:{required:"Enter Company Name"},
        supplier_registerd_address:{required:"Enter Registered Address"},
        // supplier_factory_address:{required:"Enter Factory Address"},
        // supplier_year_established:{required:"Select Established Year"},
        supplier_law:{required:"Select Country law"},
        // supplier_date:{required:"Enter Date"},
        // supplier_place:{required:"Enter Place"},
        // supplier_organization:{required:"Select Type of organization"},
        supplier_company_email:{required:"Enter Company Email"},
        // myFile:{required:"Upload File"},
        supplier_telephone_no: {
          maxlength: "Enter Valid Mobile Number",
          minlength: "Enter Valid Mobile Number"
      },
        supplier_mobile_no: {
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

// --- State Holder Details ---
$('#append_stakeholder_details').validate({
  rules:{
    stakeholder_partner_name:{required:true},
    // stakeholder_chief_executive_name:{required:true},
    // stakeholder_chief_executive_email:{required:true},
    // stakeholder_manager_name:{required:true},
    // stakeholder_manager_email:{required:true},
    stakeholder_contact_person_name:{required:true},
    stakeholder_contact_person_email:{required:true},
    // stakeholder_chief_executive_phone:{required:true,
    //     maxlength: 15,
    //     minlength: 7},
    // stakeholder_manager_phone:{required:true,
    //     maxlength: 15,
    //     minlength: 7},
    stakeholder_contact_person_phone:{required:true,
        maxlength: 15,
        minlength: 7},
  },
  messages:{
    stakeholder_partner_name:{required:"Enter Partner Name"},
    // stakeholder_chief_executive_name:{required:"Enter Chief Executive Name"},
    // stakeholder_chief_executive_email:{required:"Enter Chief Executive Email"},
    // stakeholder_manager_name:{required:"Enter Manager Name"},
    // stakeholder_manager_email:{required:"Enter Manager Email"},
    stakeholder_contact_person_name:{required:"Enter Contact Person Name"},
    stakeholder_contact_person_email:{required:"Enter Contact Person Email"},
    // stakeholder_chief_executive_phone:{required: "Enter Chief Executive Phone",
    //     maxlength: "Enter Valid Mobile Number",
    //     minlength: "Enter Valid Mobile Number",},
    // stakeholder_manager_phone:{required: "Enter Manager Phone",
    //     maxlength: "Enter Valid Mobile Number",
    //     minlength: "Enter Valid Mobile Number",},
    stakeholder_contact_person_phone:{required: "Enter Contact Person Phone",
        maxlength: "Enter Valid Mobile Number",
        minlength: "Enter Valid Mobile Number",},
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

// ---- Clear Form ---- 
function clearFormFields() {
    // Company 
    $("#supplier_company_name").val('');
    $("#supplier_registerd_address").val('');
    $("#supplier_correspondence_address").val('');
    $("#supplier_factory_address").val('');
    $("#supplier_year_established").val('');
    // $("#supplier_law").val('');
    $("#supplier_date").val('');
    $("#supplier_place").val('');
    $("#supplier_organization").val('');
    $("#supplier_company_email").val('');
    $("#supplier_website_link").val('');
    $("#supplier_telephonezone__input_no").val("+675 ");
    $("#supplier_mobile_no").val("+675 ");
    // StateHolder Details
    $("#stakeholder_partner_name").val('');
    $("#stakeholder_chief_executive_name").val('');
    $("#stakeholder_chief_executive_email").val('');
    $("#stakeholder_chief_executive_phone").val("+675 ");
    $("#stakeholder_manager_name").val('');
    $("#stakeholder_manager_email").val('');
    $("#stakeholder_manager_phone").val("+675 ");
    $("#stakeholder_contact_person_name").val('');
    $("#stakeholder_contact_person_email").val('');
    $("#stakeholder_contact_person_phone").val("+675 ");
    // Business Details
    $("#annual_sales").val('');
    $("#factory_size").val('');
    $("#no_of_employee").val('');
    $("#no_of_offices").val('');
    $("#factory_locations").val('');
    $("#no_of_plants").val('');
    $("#business_type").val('');
    $("#no_of_warehouses").val('');
    $("#warehouse_location").val('');
    $("#production_capacity").val('');
    $("#export_countries").val('');
    $("#international_shipping_terms").val('');
    $("#whatsapp_checkbox").prop("checked", false);
    $('input[name="product_checkbox"]').prop('checked', false);
    $('input[name="additional_product_checkbox"]').prop('checked', false);
    $('#SupplierPartnerSubmit').prop('disabled', false);
    $('#SupplierPartnerSubmit').css('cursor', 'pointer');
    // Details
    $("#company_name_value").text('');
    $("#registerd_address_value").text('');
    $("#correspondence_address_value").text('');
    $("#factory_address_value").text('');
    $("#year_established_value").text('');
    $("#under_laws_value").text('');
    $("#date_place_incorporation_value").text('');
    $("#type_organization_value").text('');
    $("#company_email_value").text('');
    $("#company_website_value").text('');
    $("#office_telephone_no_value").text('');
    $("#office_mobile_no_value").text('');
    $("#owner_name_value").text('');
    $("#officer_name_value").text('');
    $("#officer_email_value").text('');
    $("#officer_phone_value").text('');
    $("#gm_name_value").text('');
    $("#gm_email_value").text('');
    $("#gm_phone_value").text('');
    $("#contact_name_value").text('');
    $("#contact_email_value").text('');
    $("#contact_phone_value").text('');
    $("#myFile").text('');
    $("#attach_annual_reports").val('');
    $("select#export_country_list").val('')
    // $("#currency_selector").val('');
    $("#supplier_telephone_no").val('+675');
    productselectedCheckboxIds = [];
    supplierBrousherUpload = [];
    businessAnnualReportFileUpload = [];
    var company_details = $('#append_supplier_company_details').validate();
    var stakeholder_details = $('#append_stakeholder_details').validate();
    company_details.resetForm();
    stakeholder_details.resetForm();
    FileUploadHtml = `
    <span class="drop-zone__prompt">
    <img src="dist/images/upload-file.png" />
    <span class="content">Select a file or drag and drop here<span>JPG, PNG,PDF or TXT format  ( file size no more than 10 MB )</span></span>
    <span class="file">Select File</span>
    </span>
    <input type="file" id="myFile" name="myFile" class="drop-zone__input" multiple>`
    $("#fileUploadAppend").html(FileUploadHtml)
}

// --- TelePhone Flag ---- 
var input = document.querySelector('#supplier_telephone_no');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#supplier_mobile_no');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#stakeholder_chief_executive_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#stakeholder_manager_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

var input = document.querySelector('#stakeholder_contact_person_phone');
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "us";
      success(countryCode);
    });
  },
})

