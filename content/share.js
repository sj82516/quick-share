// insert share text into fb share textarea.
function setFBShareTextarea(text){
    let fbShareTextarea = document.getElementsByClassName("uiTextareaNoResize uiTextareaAutogrow input mentionsTextarea textInput")[0]
    if(!fbShareTextarea){
        setTimeout(()=>{
            setFBShareTextarea(text)
        }, 100)
    }
    fbShareTextarea.value = text;
}

// be careful, Line would insert the web link by default 
function setLineShareTextarea(text){
    let lineShareTextarea = document.querySelector(".MdTextarea01 textarea")
    if(!lineShareTextarea){
        setTimeout(()=>{
            setLineShareTextarea(text)
        }, 100)
    }
    text = text==''? text: (text+ "\n");
    lineShareTextarea.value = text + lineShareTextarea.value;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(!message || !message.type || !message.factory){
        return false;
    }
    switch(message.factory){
        case "line":
            setLineShareTextarea(message.text);
            break;
        default:
        case "facebook":
            setFBShareTextarea(message.text);
    }
})