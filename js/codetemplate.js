function codeTemplate(options) {
  // generate and returns js code used to hide email.

  let newl, tab, js_code;

  if (options.strip_newlines) {
    // we want no newlines and tabulations
    newl = "";
    tab = "";
  } else {
    newl = "\n";
    tab = "   "; // 3 spaces tab
  }

  if (options.max_iterations == 0) {
    // no base64 encoding
    js_code = `window.onload=function ${options.function_name}(){`;
  }
  else if (options.max_iterations == 1) {
    // only one base64 encoding
    js_code = `window.onload=function ${options.function_name}(){${newl}${tab}let ${options.container_variable}=atob("${options.encoded_container}");${newl}${tab}let ${options.email_variable}=atob("${options.encoded_email}");`;
  } else {
    // multiple base64 encodings
    js_code = `window.onload=function ${options.function_name}(){${newl}${tab}let ${options.container_variable}="${options.encoded_container}";${newl}${tab}let ${options.email_variable}="${options.encoded_email}";${newl}${tab}for(let ${options.index_variable}=0;${options.index_variable}<${options.max_iterations};${options.index_variable}++){${newl}${tab}${tab}${options.container_variable}=atob(${options.container_variable});${newl}${tab}${tab}${options.email_variable}=atob(${options.email_variable});${newl}${tab}}`;
  }

  if (options.write_email) {
    if (options.max_iterations == 0) {
      js_code += `${newl}${tab}document.querySelector("${options.encoded_container}").innerHTML="${options.encoded_email}";`
    } else {
      js_code += `${newl}${tab}document.querySelector(${options.container_variable}).innerHTML=${options.email_variable};`
    }
  }

  if (options.add_mailto) {
    // add mailto to a container
    if (options.max_iterations == 0) {
      js_code += `${newl}${tab}document.querySelector("${options.encoded_container}").href="mailto:"+"${options.encoded_email}";${newl}}`;
    } else {
      js_code += `${newl}${tab}document.querySelector(${options.container_variable}).href="mailto:"+${options.email_variable};${newl}}`;
    }
  } else {
    js_code += `${newl}}`;
  }

  return js_code;
}
