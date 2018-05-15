document.getElementById('share-button__facebook').onclick = function () {
    chrome.tabs.query({
            active: true,
            currentWindow: true,
        },
        function (tabs) {
            handleShare("facebook", tabs[0].url, "", {
                width: tabs[0].width,
                height: tabs[0].height
            });
        }
    );
};

document.getElementById('share-button__line').onclick = function () {
    chrome.tabs.query({
            active: true,
            currentWindow: true,
        },
        function (tabs) {
            handleShare("line", tabs[0].url, "", {
                width: tabs[0].width,
                height: tabs[0].height
            });
        }
    );
};