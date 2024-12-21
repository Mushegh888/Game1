const emojis = [
	"🤑","😍","☕","🔥","🎂","😇","🤣","🤗","🌟",
	"🎨","🚀","🙂","🙃","🌺","🍀","❤️","🎶","🎁",
];
function arrMixer(rows,cols,arr){
	let arr2 = []
	let mid = rows*cols / 2;
	for(let i = 0;i < mid;i++){
		arr2.push(arr[i],arr[i])
	}
	arr2 = arr2.sort(() => Math.random() - 0.6)
	return arr2
}

function paint(rows,cols){
	htmlMain = "";
	htmlx = ""
	let newarr = [];
	newarr = arrMixer(rows,cols,emojis)
	console.log(newarr)
	newarr.forEach(item => {
		htmlx += `<div class="item2 add"><span>${item}</span></div>` 
	})
	htmlMain = `
	<div class="grid" 
	style="display: grid; grid-template: repeat(${rows}, 1fr) / repeat(${cols},1fr);">
			${htmlx}
	</div>`
	return htmlMain
}

const levels = document.querySelectorAll(".item")
const body = document.querySelector("body")

levels.forEach(item => {
	item.addEventListener("click",function(){
		let rows = 0;
		let cols = 0;
		let htmlMain = ""
		switch(item.innerHTML){
		case "level 1":
			rows = 3;
			cols = 4;
			break;
		case "level 2":
			rows = 4;
			cols = 4;
			break;
		case "level 3":
			rows = 6;
			cols = 6;
			break;
		}
		htmlMain = paint(rows,cols)
		body.innerHTML = htmlMain
		pred(document.querySelectorAll(".item2"))
	})
})

function pred(list){
	let trys = 0;
	let score = 0;
	let duo = []
	let count = 0;
	let mid = list.length / 2
	list.forEach(item => {
		if(item.classList.contains("add")){
			item.classList.remove("add")
			item.addEventListener("click",function(){
				let child = item.firstElementChild;
				trys++;
				count++;
				if(count <= 2){
					item.style.pointerEvents = "none"
					opener(item)
					duo.push({element: item,content: item.textContent})
					if(duo.length === 2){
						if(compear(duo)){
							green(duo)
							score++;
						}
						else{
							closer(duo)
						}
						duo = [];
						count = 0;
					}
				}
				congrat(score,mid,list.length,trys)
			})
		}
		else{
			return;
		}
	})
}

let sound = new Audio("congart.mp3")
//sound.load()
function congrat(score,mid,length,trys){
	console.log(score,mid,length,trys)
	let name = "";
	switch(length){
	case 12:
		name = "level1"
		break;
	case 16:
		name = "level2"
		break;
	case 36:
		name = "level3"
		break;
	}
	if(score == mid){
		let loc = localStorage.getItem(name)
		if(loc > trys || !loc){
			localStorage.setItem(name,trys)
			body.innerHTML = `<div class="congrat"><p>New Record!!!${localStorage.getItem(name)}</p>
			<button class="home" onclick="home()"><i class="fa-solid fa-house"></i></button>
			</div>`
		}
		else{
			body.innerHTML = `<div class="congrat"><p>You won</p>
			<button class="home" onclick="home()"><i class="fa-solid fa-house"></i></button>
			</div>`
		}
		//sound.play()
	}
}
//localStorage.clear()
function home(){
	window.location.reload()
}
function compear(arr){
	let first = arr[0]
	let second = arr[1]
	if(first.content === second.content){
		return true
	}
	return false
}
function opener(item){
	let child = item.firstElementChild
	if(item.classList.contains("rot")){
		item.classList.remove("rot")
		setTimeout(() =>{
			item.classList.add("rot")
		},200)
	}
	else{
		item.classList.add("rot")
	}
	setTimeout(function(){
		child.style.display = "block"
	},500)
}
function closer(item){
	let first = item[0]
	let second = item[1]
	first.element.style.pointerEvents = ""
	second.element.style.pointerEvents = ""
	setTimeout(function(){
		first.element.classList.remove("rot")
		second.element.classList.remove("rot")
	},500)
	let firstchild = first.element.firstElementChild
	let secondchild = second.element.firstElementChild
	setTimeout(function(){
		firstchild.style.display = "none"
		secondchild.style.display = "none"
		first.element.classList.add("rot")
		second.element.classList.add("rot")
	},1000)
}
function green(item){
	let first = item[0]
	let second = item[1]
	setTimeout(function(){
		first.element.classList.add("matched")
		second.element.classList.add("matched")
	},500)
}