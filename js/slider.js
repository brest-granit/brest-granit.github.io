window.addEventListener('DOMContentLoaded', function()
{

    let imgContainer = document.getElementById('slider');
    let w = imgContainer.offsetWidth;

    let img1 = document.createElement('div');
    img1.style.backgroundImage = "url(./img/sky.jpg)"
    img1.className = 'mainImage';
    imgContainer.appendChild(img1);

    let img = document.createElement('div');
    img.className = 'mainImage';
    img.style.backgroundImage = "url(./img/sky2.jpg)"
    img1.style.backgroundSize = img.style.backgroundSize = `${imgContainer.offsetWidth}px ${imgContainer.offsetHeight}px`
    img.style.width = "50%"
    imgContainer.appendChild(img);

    img.innerHTML = `<div class ='slider'><div class = 'circle'></div></div>`

    imgContainer.addEventListener('mousemove', slideMove)
    imgContainer.addEventListener('touchmove', slideMove)

    function slideMove(e)
    {
        let pos;
        pos = pos ? pos : 100;
        pos = getCursorPos(e);
        if(pos < 0 ) pos = 0;
        if(pos > w)  pos = w;
        img.style.width = `${pos}px`
    }

    function getCursorPos(e)
    {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
    }

    setTimeout(function()
    { 
       img1.style.backgroundSize = img.style.backgroundSize = `${imgContainer.offsetWidth}px ${imgContainer.offsetHeight + 50}px`
    }, 
    200);

})