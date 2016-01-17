var targets = ['js/main.js'];

targets.forEach(function(js){
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', chrome.extension.getURL(js));
    document.documentElement.appendChild(scriptElement);
});
