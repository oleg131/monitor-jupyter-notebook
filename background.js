WATCHDOG_INTERVAL = 1000;

function watchdog() {
    if (localStorage.url.includes('.ipynb')) {
        interval = setInterval(show_status, WATCHDOG_INTERVAL);
    } else {
        var last_interval = setInterval(function(){}, 9999);
        for (var i = 1; i < last_interval; i++) {
            clearInterval(i);
        }
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

chrome.browserAction.onClicked.addListener(function(tab) {
    localStorage.url = tab.url.replace(/#.*$/, '');
    watchdog();
});

watchdog();
