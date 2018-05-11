document.getElementById('share-button__facebook').onclick = function () {
    chrome.tabs.query({
            active: true,
            currentWindow: true,
        },
        function (tabs) {
            let fbShareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + tabs[0].url;
            handleShare("line", fbShareURL, "", {
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
            let lineShareURL = 'http://line.naver.jp/R/msg/text/?' + encodeURI(tabs[0].url);
            handleShare("line", lineShareURL, "", {
                width: tabs[0].width,
                height: tabs[0].height
            });
        }
    );
};