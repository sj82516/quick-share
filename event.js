const fatoryList = ['facebook', 'line'];

let [parentMenuId, facebookMenuId, lineMenuId] = [0, 0, 0];

// create menu when write click.
// TODO: support right click share menu.
function createMenus () {
  parentMenuId = chrome.contextMenus.create ({
    title: 'Share to',
    contexts: ['all'],
  });

  facebookMenuId = chrome.contextMenus.create ({
    title: 'Facebook',
    contexts: ['all'],
    parentId: parentMenuId,
    onclick: handleSelectClick,
  });

  lineMenuId = chrome.contextMenus.create ({
    title: 'Line',
    contexts: ['all'],
    parentId: parentMenuId,
    onclick: handleSelectClick,
  });
}

function handleSelectClick (info, tab) {
  let factory = '';
  switch (info.menuItemId) {
    case lineMenuId:
      factory = 'line';
      break;
    default:
    case facebookMenuId:
      factory = 'facebook';
      break;
  }

  let shareUrl = info.pageUrl;
  let text = info.selectionText || info.linkUrl || "";

  // if user wana share image, replace pageUrl by imageUrl
  if(info.srcUrl){
    shareUrl = info.srcUrl;
    text = ""
  }

  handleShare (factory, shareUrl, text, {
    width: tab.width,
    height: tab.height,
  });
}

createMenus ();
