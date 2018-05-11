const fatoryList = ["facebook", "line"]

// create menu when write click.
// TODO: support right click share menu.
function createMenus(){
    let parent = chrome.contextMenus.create({
        title: "Share to",
        contexts: ['all']
    })


}
console.log(handleShare)