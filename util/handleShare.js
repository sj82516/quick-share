/**
 * open new window to share content and insert the text if existed.
 * @param  {Enum['facebook', 'line']} factory : which social media
 * @param  {String} shareURL : shareURL corresponding to factory
 * @param  {String} content : any text to replace in share context
 * @param  {Object} parentWindow : in order to center the popup page.
 * @param  {String} parentWindow.width : parent window width
 * @param  {String} parentWindow.height : parent window height
 */
function handleShare(factory, shareURL, content, parentWindow) {
    let factoryShareURL = "";
    switch (factory) {
        case 'line':
            factoryShareURL = 'http://line.naver.jp/R/msg/text/?' + encodeURI(shareURL)
            break;
        default:
        case 'facebook':
            factoryShareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + shareURL
    }

    window.open(
        factoryShareURL,
        'pop',
        PopupCenterPosition(640, 540, parentWindow)
    );

    // open share page
    chrome.tabs.query({
            active: true
        },
        function (tabs) {
            let factoryTab = tabs.find(t => t.url == factoryShareURL);
            if (factoryTab) {
                // need to wait popup page is completed to execute script and send message.
                chrome.tabs.onUpdated.addListener(function (tabId, info) {
                    if (tabId == factoryTab.id && info.status == 'complete') {
                        chrome.tabs.executeScript(factoryTab.id, {
                            file: "content/share.js"
                        }, function (_) {
                            let e = chrome.runtime.lastError;
                            if (e !== undefined) {
                                console.error("executeScript", _, e);
                            }
                        })
                        chrome.tabs.sendMessage(factoryTab.id, {
                            type: "share",
                            factory: factory,
                            text: content
                        }, (_) => {
                            let e = chrome.runtime.lastError;
                            if (e !== undefined) {
                                console.error("sendMessage", _, e);
                            }
                        })
                    }
                })
            }
        }
    );
}

// open pop up window in the center of screen.
// copy and modify from https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
function PopupCenterPosition(w, h, parentWindow) {
    let width = parentWindow.width
    let height = parentWindow.height
    let left = ((width / 2) - (w / 2));
    let top = ((height / 2) - (h / 2));
    return 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left
}