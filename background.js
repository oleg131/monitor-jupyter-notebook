
i = 0;

function changeBadge() {
  if (i == 0) {
    chrome.browserAction.setBadgeText({text: '0'});
    i = 1;
  }
  else {
    chrome.browserAction.setBadgeText({text: '1'});
    i = 0;
  };
};

function show_status() {
    chrome.tabs.query({'url': localStorage.url.replace(/#.*$/,'') + '*'},
        function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
              chrome.tabs.executeScript(tabs[i].id, {
                    code: "document.getElementById('kernel_indicator_icon').className"
                }, function (result) {
                    if (result.length) {
                        classname = result[0];
                        if (classname == 'kernel_busy_icon') {
                            path = 'red.png';
                        } else {
                            path = 'gray.png';
                        };
                        chrome.browserAction.setIcon({path: path})
                    }
                });
        }
    });
}

setInterval(show_status, 1000);

chrome.browserAction.onClicked.addListener(function(tab) {
    localStorage['url'] = chrome.tabs.query(
        {active: true, currentWindow: true}, function (tabs) {
          localStorage.url = tabs[0].url.replace(/#.*$/,'');
        });
});
