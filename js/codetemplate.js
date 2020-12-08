/* jshint esversion: 8 */

let codeTemplate = (options) => {
  // generate and returns js code used to hide email.

  let newl, tab, js_code;

  if (options.strip_newlines) {
    // we want no newlines and tabulations
    newl = "";
    tab = "";
  } else {
    newl = "\n";
    tab = "\t";
  }

  if (options.page_loaded) {
    // add window.onload
    js_code = `window.onload=function ${options.function_name}(){${newl}`;
  } else {
    // generic function
    js_code = `function ${options.function_name}(){${newl}`;
  }

  if (options.max_iterations == 1) {
    // only one base64 encoding
    js_code += `${tab}let ${options.container_variable}=atob("${options.encoded_container}");${newl}${tab}let ${options.email_variable}=atob("${options.encoded_email}");let ${options.label_variable}=atob("${options.encoded_label}");${newl}`;
  } else if (options.max_iterations > 1) {
    // multiple base64 encodings
    js_code += `${tab}let ${options.container_variable}="${options.encoded_container}";${newl}${tab}let ${options.email_variable}="${options.encoded_email}";${newl}${tab}let ${options.label_variable}="${options.encoded_label}";${newl}${tab}for(let ${options.index_variable}=0;${options.index_variable}<${options.max_iterations};${options.index_variable}++){${newl}${tab}${tab}${options.container_variable}=atob(${options.container_variable});${newl}${tab}${tab}${options.email_variable}=atob(${options.email_variable});${newl}${tab}${tab}${options.label_variable}=atob(${options.label_variable});${newl}${tab}}${newl}`;
  }

  // write label
  if (options.max_iterations == 0) {
    js_code += `${tab}document.querySelector("${options.encoded_container}").innerHTML="${options.encoded_label}";${newl}`;
  } else {
    js_code += `${tab}document.querySelector(${options.container_variable}).innerHTML=${options.label_variable};${newl}`;
  }


  if (options.add_mailto) {
    // add mailto to a container
    if (options.max_iterations == 0) {
      js_code += `${tab}document.querySelector("${options.encoded_container}").href="mailto:"+"${options.encoded_email}";${newl}}`;
    } else {
      js_code += `${tab}document.querySelector(${options.container_variable}).href="mailto:"+${options.email_variable};${newl}}`;
    }
  } else {
    if (options.max_iterations == 0) {
      js_code += `${tab}document.querySelector("${options.encoded_container}").href="${options.encoded_email}";${newl}}`;
    } else {
      js_code += `${tab}document.querySelector(${options.container_variable}).href=${options.email_variable};${newl}}`;
    }
  }

  if (!options.page_loaded) {
    // call generic function
    js_code += `${newl}${newl}${options.function_name}();`;
  }

  return js_code;
};
