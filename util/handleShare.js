/**
 * open new window to share content and insert the text if existed.
 * @param  {Enum['facebook', 'line']} factory : which social media
 * @param  {String} shareURL : shareURL corresponding to factory
 * @param  {String} text : any text to replace in share context
 * @param  {Object{width, height}} parentWindow : in order to center the popup page.
 */
function handleShare(factory, shareURL, text, parentWindow) {
    window.open(
        shareURL,
        'pop',
        PopupCenterPosition(640, 540, parentWindow)
    );

    // open share page
    chrome.tabs.query({
            active: true
        },
        function (tabs) {
            let factoryTab = tabs.find(t => t.url == shareURL);
            if (factoryTab) {
                chrome.tabs.executeScript(factoryTab.id, {
                    file: "content/share.js"
                })
                chrome.tabs.sendMessage(factoryTab.id, {
                    type: "share",
                    factory: factory,
                    text: text
                }, (_) => {})
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