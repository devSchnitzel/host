function errorLogger(msg, lineNo, columnNo, url, error) {
  $.post('/jslogger', {
    message: msg,
    line: lineNo,
    column: columnNo,
    url: url,
    useragent: navigator.userAgent,
    stack: error
  });
}

function uuid() {
  "use strict";
  var result = "";
  var random;
  var seed = Date.now();
  var i;
  for (i = 0; i < 32; i++) {
    random = (seed + Math.random() * 16) % 16 | 0;
    seed = Math.floor(seed / 16);

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      result += "-";
    }

    if (i === 12) {
      result += (4).toString(16);
    } else if (i === 16) {
      result += (random & (3 | 8)).toString(16);
    } else {
      result += random.toString(16);
    }
  }
  return result;
}

function sleep(time) {
  "use strict";
  return new Promise((resolve) => setTimeout(resolve, time));
}

function removeArrayEntry(remove, entry) {
  "use strict";
  var index = entry.indexOf(remove);
  if (index > -1) {
    entry.splice(index, 1);
  }
  return entry;
}

function getJson(url) {
  "use strict";
  var result = $.ajax({
    dataType: "json",
    url: url,
    async: false
  }).responseJSON;

  return result;
}

function getCategories() {
  "use strict";
  var url = "/api/categories";
  var result = getJson(url);
  result = removeArrayEntry("No Categories Found", result);
  result = removeArrayEntry("I/O Error on Host", result);

  if (result.length > 0) {
    return result;
  }
  return;
}

function getEntries(category) {
  "use strict";
  var url = "/api/entries/" + category;
  var result = getJson(url);
  result = removeArrayEntry("No Entries Found", result);
  result = removeArrayEntry("I/O Error on Host", result);

  if (result.length > 0) {
    return result;
  }
  return;
}

function cacheCategory(category) {
  "use strict";
  var url = "/cache/category/" + category + "/index.html";
  $("#ifr").get(0).contentWindow.location.replace(url);
}

function cacheEntry(category, entry) {
  "use strict";
  var url = "/cache/entry/" + category + "/" + entry + "/index.html";
  $("#ifr").get(0).contentWindow.location.replace(url);
}

function getCategoryMeta(category) {
  "use strict";
  var url = "/exploits/" + category + "/meta.json";
  return getJson(url);
}

function getEntryMeta(category, entry) {
  "use strict";
  var url = "/exploits/" + category + "/" + entry + "/meta.json";
  return getJson(url);
}

function isCategoryCacheable(category) {
  "use strict";
  var result = getCategoryMeta(category);
  if (result === undefined ||
      result.Cacheable === undefined ||
      typeof(result.Cacheable) !== typeof(true)) {
    return false;
  }
  return result.Cacheable;
}

function isEntryAvailableOffline(category, entry) {
  "use strict";
  var result = getEntryMeta(category, entry);
  if (result === undefined ||
      result.Offline === undefined ||
      typeof(result.Offline) !== typeof(true)) {
    return false;
  }
  return result.Offline;
}

function checkUAMatch(validUAs) {
  "use strict";
  var currentUA = navigator.userAgent;
  if ($.inArray(currentUA, validUAs) !== -1) {
    return true;
  }

  var result;
  $.each(validUAs, function(i, field) {
    var pattern = new RegExp(field);
    if (pattern.test(currentUA)) {
      result = true;
    }
  });
  return result;
}

function loadEntry(category, entry) {
  "use strict";
  var url = "/exploits/" + category + "/" + entry + "/index.html";
  $("#ifr").get(0).contentWindow.location.replace(url);
}

function clearFrame() {
  "use strict";
  var url = "/blank.html";
  $("#ifr").get(0).contentWindow.location.replace(url);
}

function safeRedirect(url) {
  "use strict";
  clearFrame();
  $("#ifr").on("load", function() {
    window.location.href = url;
  });
}

function getStorage(key) {
  "use strict";
  if (localStorage.getItem(key) !== null) {
    return localStorage.getItem(key);
  }
  return;
}

function setStorage(key, value, datatype) {
  "use strict";
  if (typeof(value) === datatype) {
    localStorage.setItem(key, value);
  }
}

function getLanguage() {
  "use strict";
  return getStorage("language");
}

function setLanguage(lang) {
  "use strict";
  setStorage("language", lang, "string");
}

function setAutoload(category, entry) {
  "use strict";
  document.cookie = "autoload=" + category + "/" + entry + "; " +
                    "expires=Tue, 19 Jan 2038 03:14:07 UTC;";
}

function getCookie(cname) {
  "use strict";
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split(";");
  var result;
  $.each(cookies, function(i, field) {
    while (field.charAt(0) === " ") {
      field = field.substring(1);
    }
    if (field.indexOf(name) === 0) {
      result = field.substring(name.length, field.length);
    }
  });
  return result;
}

function autoloadCookie() {
  "use strict";
  var autoload = getCookie("autoload");
  if (autoload) {
    try {
      var category = autoload.split("/")[0];
      var entry = autoload.split("/")[1];
      if ($.inArray(category, getCategories()) === -1 ||
          $.inArray(entry, getEntries(category)) === -1) {
        document.cookie = "autoload=;";
        return;
      } else {
        return autoload;
      }
    } catch(e) {
      document.cookie = "autoload=;";
      return;
    }
  }
}
/*
Copyright (c) 2017-2018 Al Azif, https://github.com/Al-Azif/ps4-exploit-host

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/