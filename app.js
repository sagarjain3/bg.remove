let filepicker = document.querySelector("#filepicker");
let innerimg = document.querySelector(".inner-img");
let image=null;

let inputimg = document.querySelector("#input-img")


let icon = document.querySelector("#icon")
let span = document.querySelector("span")

let url =null;
// let genimg = document.querySelector("#generimg")

let uploadbtn = document.querySelector("#upload-btn")

let orginalimg = document.querySelector(".resultimg1 img")
let generateimg = document.querySelector(".resultimg2 img")

let style2 =document.querySelector(".style2")
let resultpage  = document.querySelector(".result")

let downloadbtn = document.querySelector("#download")
let reset = document.querySelector("#reset")


let load = document.querySelector("#load")
function uploadhandle(){
    const apikey="4PaLFWPrfxERqRv2NDKb89zh"
    const formdata = new FormData();
    formdata.append("image_file",image)
    formdata.append("size","auto");
    fetch("https://api.remove.bg/v1.0/removebg",{
        method: "POST",
        headers: { "X-Api-Key":apikey },
        body: formdata,
    })
    .then(function(response){
        return response.blob()
    })
    .then(function(blob){
        style2.style.display="none"
        resultpage.style.display="flex"
url=URL.createObjectURL(blob);
generateimg.src=url;
    load.style.display="none"

    })
    // .catch(alert())

}

innerimg.addEventListener("click",()=>{
    filepicker.click();
})


filepicker.addEventListener("change",()=>{
image=filepicker.files[0];
if(!filepicker)
    return;
let reader = new FileReader();
reader.onload =(e)=>{
    console.log(e);
    inputimg.src= `data:${filepicker.type};base64,${e.target.result.split(",")[1]}`
inputimg.style.display="block";
span.style.display="none";
icon.style.display="none";
orginalimg.src=`data:${filepicker.type};base64,${e.target.result.split(",")[1]}`
}
reader.readAsDataURL(image)
})


uploadbtn.addEventListener("click",()=>{
    uploadhandle();
    load.style.display="block"
})

function download(){
    fetch(url)
    .then(response => response.blob())
    .then(file=>{
        let a =document.createElement("a")
        a.href=URL.createObjectURL(file)
        a.download=new Date().getTime();
        a.click();
    })
    
}
downloadbtn.addEventListener("click",()=>{
    download()
})
reset.addEventListener("click",()=>{
    window.location.reload();
})