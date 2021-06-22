storageInit();
const data=JSON.parse(localStorage.getItem('data'));
console.log(data)
const favoritesWrapper=$('.favorites-wrapper');
const lastFavorite = favoritesWrapper.find('.operations')
const currentDirectory=[];

console.log(favoritesWrapper)
webRender(data)




function storageInit(){
    let isNotFirstIn=localStorage.getItem('isNotFirstIn');
    if(isNotFirstIn===null){
        localStorage.setItem('isNotFirstIn',true);
        localStorage.setItem('data',`[{"name":"A站","url":"www.acfun.cn"},{"name":"B站","url":"bilibili.com"}]`);
        //{"folderName":"abc","content":[{"url":"111"}]}
    }
}

function webRender(data,el){
    favoritesWrapper.find('div:not(.operations)').remove()
    let currentData=data;
    for(let i=0;i<currentDirectory.length;i++){
        currentData=currentData[currentDirectory[i]].content;
    }
    for(let i=0;i<currentData.length;i++){
        let li;
        if(currentData[i].url){
            li=$(`<div class="favorites" data-index=${i}>
                <span  data-index=${i}>${currentData[i].name}</span>
                <button onclick="removeItem()" data-index=${i} class="delete-btn">x</button>
            </div>`)
        }else if(currentData[i].folderName){
           li=$(`<div class="favorites">
                <span>${currentData[i].folderName}</span>
            </div>`)
        }
        li.insertBefore(lastFavorite)
    }
    $('.favorites').on('click', ()=>{
        let index=window.event.target.dataset.index;
        window.open('https://'+data[index].url)
        
    })
}

function removeItem(){
    let index=window.event.target.dataset.index;
    data.splice(index,1);
    webRender(data);
}

function addWeb(){
    let name=window.prompt('网址名称');
    let url=window.prompt('url');
    if(name&&url){
        data.push({name,url});
        webRender(data);
    }
    
}

window.onbeforeunload = () => {
  const string = JSON.stringify(data)
  localStorage.setItem('data', string)
}
/*function addFolder(){
    console.log(window.event)
}*/

