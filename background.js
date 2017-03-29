function watchdog() {
    if (localStorage['url'].includes('.ipynb')) {
        show_status();
    } else {
        chrome.browserAction.setIcon({path: 'transparent.png'});
        chrome.browserAction.setBadgeText({'text': 'off'});
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
                        chrome.browserAction.setIcon({path: path});
                        chrome.browserAction.setBadgeText({'text': ''});
                    }
                });
        }
    });
}

setInterval(watchdog, 1000);

chrome.browserAction.onClicked.addListener(function(tab) {
    localStorage['url'] = chrome.tabs.query(
        {active: true, currentWindow: true}, function (tabs) {
          localStorage.url = tabs[0].url.replace(/#.*$/, '');
        });
});
