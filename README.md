<h1>Email Hide</h1>
<h2>Secause stopping spam is not impossible</h2>
<p>
  Whoever needs to publish their email on their personal website knows what's going to happen. *SPAM.* <br>
  A *lot* of it.<br>
  Webcrawlers constantly roam the web, hoping to find some new mails to reap in order to be sold to spammers.
  It looks like *nobody* is ever safe. <br>
  Luckily, though, that's not true. <br>
  In order to save loading time and processing speed, webcrawlers don't load javscript.
  To exploit this flaw in our advance, we can hide the emails in a separate script made specifically to inject some text in the DOM once the page is loaded. <br>
  So this program generates a .js script hiding all the sensible information with repeated Base64 encoding and will keep you safe from spambots.
  <br><br>
  In order to use this program, you have to enter (in the form below):
</p>
  <ul>
    <li>The email that you want to hide</li>
    <li>The element that will contain the clear email (using CSS selectors)</li>
    <li>Whether or not you want to hide variables names *(recommended)*</li>
    <li>Whether or not you want to use an obfuscator (provided by <a href="https://github.com/javascript-obfuscator/javascript-obfuscator">JavaScriptObfuscator</a>).
      <span class="bold">Keep in mind that this will increase the script size by up to 200%.</span>
    <li>Whether or not you want to strip newlines</li>
    <li>How many Base64 iterations you want to hide your email behind (the more the better, although I'm not sure more than once is necessary)</li>
  </ul>
  <br><br>
  <p>
    The generated will then be shown in the grey box and you will be able to download it.
    Just incorporate it inside your web page (either inline or in a external script)
    and say no to spammers!
  </p>

<h1><a href="https://lorossi.github.io/email-hide/">Try it here!</a></h1>
