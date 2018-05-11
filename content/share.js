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
    let fbShareTextarea = document.getElementsByClassName("uiTextareaNoResize uiTextareaAutogrow input mentionsTextarea textInput")[0]
    if(!fbShareTextarea){
        setTimeout(()=>{
            setLineShareTextarea(text)
        }, 100)
    }
    fbShareTextarea.value = text;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(!message || !message.type || !message.factory){
        return false;
    }
    switch(message.factory){
        case "facebook":
            setFBShareTextarea(message.text);
            break;
        case "line":
            setLineShareTextarea(message.text);
            break;
    }
})