"use strict"; // ECMA 6

function encode(text, max_iterations=1) {
  // encodes clear text into Base64 through multiple iterations
  let encoded = text;
  for (let i = 0; i < max_iterations; i++) {
    encoded = btoa(encoded); // text to Base64
  }

  return encoded;
}

function randHexString(len) {
  // generates random hex string of set length
    let hex_string = "_0x";
    for (let i = 0; i < len; ++i) {
        hex_string += (Math.floor(Math.random() * 16)).toString(16);
    }
    return hex_string;
}

function generateCode(encoded_container, encoded_email, max_iterations, obfuscate, page_loaded, hide_variables, strip_newlines, add_mailto, write_email) {
  // generates js code from templates
  let container_variable, email_variable, function_name, index_variable;

  // hide variables names
  if (hide_variables) {
    container_variable = randHexString(6);
    email_variable = randHexString(6);
    function_name = randHexString(6);
    index_variable = randHexString(6);
  } else {
    container_variable = "container";
    email_variable = "email";
    function_name = "load";
    index_variable = "i";
  }

  // load options into object
  let options = {
    "container_variable": container_variable,
    "encoded_container": encoded_container,
    "email_variable": email_variable,
    "encoded_email": encoded_email,
    "function_name": function_name,
    "index_variable": index_variable,
    "max_iterations": max_iterations,
    "page_loaded": page_loaded,
    "strip_newlines": strip_newlines,
    "add_mailto": add_mailto,
    "write_email": write_email
  }
  let js_code = codeTemplate(options);

  // obfuscate - VERY aggressively
  if (obfuscate) {
    let options = {
      deadCodeInjection: true,
      controlFlowFlattening: true,
      splitStrings: true
    };
    js_code = JavaScriptObfuscator.obfuscate(js_code, options).getObfuscatedCode();
  }
  return js_code;
}

function generateDowload(js_code) {
    // create downloadable file
    let prefix = "data:text/plain;base64,";
    let output_encoded;

    // base64 encoding because firefox doesn't like plaintext
    output_encoded = prefix + btoa(js_code);
    return output_encoded;
}


$(document).ready(function() {
  // form object
  let form_obj = "form";
  // result container
  let result_obj = ".scriptcontainer";

  // when the text intputs change
  $(form_obj + " input").on("change keyup paster", function() {
    let all_filled = true;
    // check if both are non empty
    $(form_obj + ' input[type="text"]').each(function() {
      // if empty
      if (!$(this).val()) {
        all_filled = false;
      }

      all_filled &= $(form_obj + " #writeemail").prop('checked') || $(form_obj + " #addmailto").prop('checked');
    });

    // if both are filles we enable the "generate code" button
    if (all_filled) {
      $(form_obj + " #generate").each(function() {
        $(this).attr("disabled", false);
      });
    } else {
      // otherwise we disable it
      $(form_obj + " #generate").each(function() {
        $(this).attr("disabled", true);
      });
    }
  });

  $(form_obj + " #generate").click(function() {
    // nuber of iterations
    let iterations = $(form_obj + " #iterations").val();
    // obfuscate code checkbox
    let obfuscate = $(form_obj + " #obfuscator").prop('checked');
    // hide variables checkbox
    let hide_variables = $(form_obj + " #hidevariables").prop('checked');
    // strip newlines checkbox
    let strip_newlines = $(form_obj + " #striplines").prop('checked');
    // write email checkbox
    let write_email = $(form_obj + " #writeemail").prop('checked');
    // add mailto checkbox
    let add_mailto = $(form_obj + " #addmailto").prop('checked');
    // wait for page loaded
    let page_loaded = $(form_obj + " #onload").prop('checked');

    // encode email
    let encoded_email = encode($(form_obj + " #email").val(), iterations);
    // encode container
    let encoded_container = encode($(form_obj + " #container").val(), iterations);

    // create code
    let js_code = generateCode(encoded_container, encoded_email, iterations, obfuscate, page_loaded, hide_variables, strip_newlines, add_mailto, write_email);
    // add it to result container
    $(result_obj).html(js_code);

    // add download link to button
    let download = generateDowload(js_code, form_obj + " #download");
    $(form_obj + " #download").attr({"disabled": false});
    $(form_obj + " #download").children().attr({"href": download, "download": "email-hide.js"});

    // enable copy button
    $(form_obj + " #copy").attr({"disabled": false});
  });

  $(form_obj + " #copy").click(function() {
    let output = $(result_obj).text();
    navigator.clipboard.writeText(output);
  });
});
