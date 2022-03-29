console.log('connected')
const paintDrop =  document.querySelector('#paintDrop')
const rgb = document.querySelector('#rgb')

function randy(min,max){
    return Math.floor(Math.random()*max)+min
}

function randomRGB(){
    let r = randy(1,255)
    let g = randy(1,255)
    let b = randy(1,255)
    return `rgb(${r},${g},${b})`
}

function dripDrop(newRGB){
    return new Promise(resolve=>{
            paintDrop.style.backgroundColor = newRGB
            paintDrop.style.color = newRGB
            paintDrop.classList.toggle('queDrop')
            paintDrop.classList.toggle('dripDrop')
        resolve('resolved');
})
}

function spreadDrop(newRGB){
    return new Promise(resolve=>{
        paintDrop.style.backgroundColor = newRGB
        paintDrop.style.color = newRGB
        setTimeout(()=>{
            paintDrop.classList.toggle('dripDrop')
            paintDrop.classList.toggle('spreadDrop')
        },1000)
        resolve('resolved');
})
}

function clearDrop(newRGB){
    return new Promise(resolve=>{
        paintDrop.style.backgroundColor = newRGB
        paintDrop.style.color = newRGB
        setTimeout(()=>{
            paintDrop.classList.toggle('spreadDrop')
            paintDrop.classList.toggle('clearDrop')
        },10000)
        resolve('resolved');
})
}

function resetDrop(nextRGB){
    return new Promise(resolve=>{
        setTimeout(()=>{
            paintDrop.style.backgroundColor = 'rgb(255,255,255)'
            paintDrop.style.color = 'rgb(255,255,255)'
            setTimeout(()=>{
                paintDrop.classList.toggle('clearDrop')
                paintDrop.classList.toggle('queDrop')
            },2500)
            
        },10000)
        resolve('resolved');
})
}

async function sequenceDrop(){
    let newRGB = randomRGB()
    rgb.innerText = newRGB
    dripDrop(newRGB)
    await spreadDrop(newRGB)
    await clearDrop(newRGB)
    await resetDrop(newRGB)
}

function startDripping(){
    sequenceDrop()
    setInterval(() => {
        sequenceDrop()
}, 14000);

}

document.onload = startDripping()