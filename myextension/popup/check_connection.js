let check = document.getElementById("check-mark");
let url = document.getElementById("server-url");
let checkbtn = document.getElementById("check-button");
let enablebtn = document.getElementById("enable-button");
let current = document.getElementById("saved-server-url");
let cstatus = document.getElementById("on-or-off");

enablebtn.addEventListener("click", e => {
    browser.storage.local.set({"server":url.value});
    updateStatus();
});

checkbtn.addEventListener("click", e =>{
    url.setAttribute("disabled", "true");
    checkbtn.setAttribute("disabled", "true");
    let xhr = new XMLHttpRequest();
    let urlv = url.value;
    console.log(urlv);
    xhr.open('GET', urlv, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.addEventListener("error", handleError());
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
            let jresp = JSON.parse(xhr.response);
            if(jresp.status === "online"){
                enablebtn.removeAttribute("disabled");
                checkbtn.removeAttribute("disabled");
                check.innerHTML = "&#10003;";
                check.classList.remove("hidden");
                check.classList.add("inline-block");
                check.classList.remove("red");
                check.classList.add("green");

            }
        }else if(xhr.readyState === 4 & xhr.status !== 200){
            handleError();
        }
    }
    xhr.send();
    })

function updateStatus(){
    browser.storage.local.get("server").then(result => {
        if(result.server === undefined){
            current.innerHTML = "Not set yet";
            cstatus.innerHTML = "-";
            cstatus.classList.remove("red");
            cstatus.classList.remove("green");
        }else{
            current.innerHTML = result.server;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', result.server, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.addEventListener("error", offline());
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    cstatus.innerHTML = "ONLINE";
                    cstatus.classList.add("green");
                    cstatus.classList.remove("red");
                }else if(xhr.readyState === 4 & xhr.status !== 200){
                    offline();
                }
            }
            xhr.send();
        }
      
        console.log(result.server);
    });
}

function offline(){
    cstatus.innerHTML = "OFFLINE";
    cstatus.classList.add("red");
    cstatus.classList.remove("green");
}
  
function handleError(){
    enablebtn.setAttribute("disabled", "true");
    checkbtn.removeAttribute("disabled");
    url.removeAttribute("disabled");
    check.innerHTML = "&times;";
    check.classList.remove("hidden");
    check.classList.add("inline-block");
    check.classList.remove("green");
    check.classList.add("red");
}
updateStatus();