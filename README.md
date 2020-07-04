  <h1>Email Hide</h1>
  <h2>Secause stopping spam is not impossible</h2>
  <p>
    Whoever needs to publish their email on his personal website knows what's going to happen. <span class="bold">SPAM.</span> <br>
    A <span class="bold">lot</span> of it.<br>
    Webcrawlers constantly roam the web, hoping to find some new mails to reap in order to sell gigantic lists to serial spammers.
    It looks like nobody is ever safe. <br>
    Luckily, though, that's not true. <br>
    In order to save loading time and processing speed, webcrawlers don't load javscript.
    To exploit this flaw in our advance, we can hide the emails in a separate script made specifically to inject some text in the DOM. <br>
    So this program generates a .js script hiding all the constant values with repeated Base64 encoding and will keep you safe from spambots.
    <br><br>
    In order to use this program, you have to specify:
  </p>
    <ul>
      <li>The email that you want to hide</li>
      <li>The element that will contain the clear email (using CSS selectors)</li>
      <li>Whether or not you want to hide variables names (recommended)</li>
      <li>Whether or not you wanto to use an obfuscator (provided by <a href="https://github.com/javascript-obfuscator/javascript-obfuscator">JavaScriptObfuscator</a>)
      <li>How many Base64 iterations you want to hide your email behind</li>
    </ul>
    <br><br>
    <p>
      The generated will then be shown below and you will be able to download it. Just incorporate it inside your web page and say no to spammers!
    </p>
    
<h1><a href="https://lorossi.github.io/email-hide/">Try it here!</a></h1>
