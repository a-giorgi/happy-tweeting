let server = undefined;
let score = 0.6;
(() => {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    
    browser.storage.local.get("server").then(result => {
       
        if(result.server === undefined){
            return;
        }else{
            console.log("server is : "+result.server);
            let xhr = new XMLHttpRequest();
            xhr.open('GET', result.server, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
           // xhr.addEventListener("error", offline());
            xhr.send();
            xhr.onload = () => {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    server = result.server;
                    addScrollListener();
                    document.body.style.borderTop = "5px solid green";
                }
            }
        }
    });
    document.body.style.borderTop = "5px solid red";
})();

function addScrollListener(){
    document.addEventListener("scroll", (event) => {
        let cells = document.querySelectorAll("[data-testid='cellInnerDiv']");
        for(let cell of cells){
            let child = cell.firstChild;
            let processed = child.getAttribute("data-flag");
            if(processed !== "processed"){
                child.querySelectorAll("[data-testid='tweetText']").forEach(element => {
                    console.log (element.firstChild.innerHTML);
                    evaluateTweet(element.firstChild.innerHTML, child);
                })
                child.setAttribute("data-flag", "processed");
            }
        }
    });
}

function evaluateTweet(tweet, element){
   const xhr = new XMLHttpRequest();
   xhr.open("POST", server , true);
   xhr.send(
     JSON.stringify({
         tweet: tweet
     })
   );
   xhr.onload = function(e) {
     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
       	let response = JSON.parse(xhr.responseText);
   	    if(response.score<score){
            element.innerHTML = "";
        }
      }else if(this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
        console.log("xhr error");
        //TODO 
      }
  }
}
  