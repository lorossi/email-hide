function encode(text, iterations = 1) {
  let encoded = text;
  for (let i = 0; i < iterations; i++) {
    encoded = btoa(encoded);
  }

  return encoded;
}

function randHexString(len) {
    let hex_string = "_0x";
    for (let i = 0; i < len; ++i) {
        hex_string += (Math.floor(Math.random() * 16)).toString(16);
    }
    return hex_string;
}

function generateCode(encoded_container, encoded_email, iterations = 1, obfuscate = false, hide_variables = false, strip_newlines = false) {
  let container_variable, email_variable, function_name, index_variable;
  if (hide_variables) {
    container_variable = randHexString(6);
    email_variable = randHexString(6);
    function_name = randHexString(6);
    index_variable = randHexString(6);
  } else {
    container_variable = "container";
    email_variable = "email";
    function_name = "load"
    index_variable = "i";
  }

  let js_code = `window.onload=function ${function_name}(){\n\tlet ${container_variable}="${encoded_container}";\n\tlet ${email_variable}="${encoded_email}";\n\tfor(let ${index_variable}=0;${index_variable}<${iterations};${index_variable}++){\n\t\t${container_variable}=atob(${container_variable});\n\t\t${email_variable}=atob(${email_variable});\n\t}\n\tdocument.querySelector(${container_variable}).innerHTML=${email_variable};\n}`

  if (strip_newlines) {
    js_code = js_code.replace(/\n/g, '');
    js_code = js_code.replace(/\t/g, '');
  }

  if (obfuscate) {
    options = {
      deadCodeInjection: true,
      controlFlowFlattening: true,
    }
    js_code = JavaScriptObfuscator.obfuscate(js_code).getObfuscatedCode();
  }
  return js_code
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
  let form_obj = "form";
  let result_obj = ".scriptcontainer"

  $(form_obj + " input").change(function() {
    let all_filled = true;
    $(form_obj + ' input[type="text"]').each(function() {
      if (!$(this).val()) {
        all_filled = false;
      }
    });

    if (all_filled) {
      $(form_obj + " #generate").each(function() {
        $(this).attr("disabled", false);
      })
    }
  })

  $(form_obj + " #generate").click(function() {
    let iterations = $(form_obj + " #iterations").val();
    let obfuscate = $(form_obj + " #obfuscator").prop('checked');
    let hide_variables = $(form_obj + " #hidevariables").prop('checked');
    let strip_newlines = $(form_obj + " #striplines").prop('checked');

    encoded_email = encode($(form_obj + " #email").val(), iterations);
    encoded_container = encode($(form_obj + " #container").val(), iterations);

    js_code = generateCode(encoded_container, encoded_email, iterations, obfuscate, hide_variables, strip_newlines);
    $(result_obj).html(js_code);

    let download = generateDowload(js_code, form_obj + " #download");
    $(form_obj + " #download").attr({"disabled": false});
    $(form_obj + " #download").children().attr({"href": download, "download": "hide-email.js"});
  })
})
