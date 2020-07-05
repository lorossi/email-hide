function codeTemplate(options) {
  let newl, tab, js_code;

  if (options.strip_newlines) {
    newl = "";
    tab = "";
  } else {
    newl = "\n";
    tab = "   ";
  }

  if (options.max_iterations == 0) {
    js_code = `window.onload=function ${options.function_name}(){${newl}${tab}document.querySelector("${options.encoded_container}").innerHTML="${options.encoded_email}";`;
  }
  else if (options.max_iterations == 1) {
    js_code = `window.onload=function ${options.function_name}(){${newl}${tab}let ${options.container_variable}=atob("${options.encoded_container}");${newl}${tab}let ${options.email_variable}=atob("${options.encoded_email}");${newl}${tab}document.querySelector(${options.container_variable}).innerHTML=${options.email_variable};`;
  } else {
    js_code = `window.onload=function ${options.function_name}(){${newl}${tab}let ${options.container_variable}="${options.encoded_container}";${newl}${tab}let ${options.email_variable}="${options.encoded_email}";${newl}${tab}for(let ${options.index_variable}=0;${options.index_variable}<${options.max_iterations};${options.index_variable}++){${newl}${tab}${tab}${options.container_variable}=atob(${options.container_variable});${newl}${tab}${tab}${options.email_variable}=atob(${options.email_variable});${newl}${tab}}${newl}${tab}document.querySelector(${options.container_variable}).innerHTML=${options.email_variable};`;
  }

  if (options.add_mailto) {
    js_code += `${newl}${tab}document.querySelector(${options.container_variable}).href="mailto:"+${options.email_variable};${newl}}`;
  } else {
    js_code += `${newl}}`;
  }

  return js_code;
}
