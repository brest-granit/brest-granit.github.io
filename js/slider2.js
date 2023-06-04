window.addEventListener('DOMContentLoaded', function()
{

    let imgContainer2 = document.getElementById('slider2');
    let w2 = imgContainer2.offsetWidth;

    let img12 = document.createElement('div');
    img12.style.backgroundImage = "url(./img/photo_posle.jpg)"
    img12.className = 'mainImage2';
    imgContainer2.appendChild(img12);

    let img2 = document.createElement('div');
    img2.className = 'mainImage2';
    img2.style.backgroundImage = "url(./img/photo_do.jpg)"
    img12.style.backgroundSize = img2.style.backgroundSize = `${imgContainer2.offsetWidth}px ${imgContainer2.offsetHeight}px`
    img2.style.width = "50%"
    imgContainer2.appendChild(img2);

    img2.innerHTML = `<div class ='slider2'><div class = 'circle2'></div></div>`

    imgContainer2.addEventListener('mousemove', slideMove)
    imgContainer2.addEventListener('touchmove', slideMove)

    function slideMove(e)
    {
        let pos;
        pos = pos ? pos : 100;
        pos = getCursorPos(e);
        if(pos < 0 ) pos = 0;
        if(pos > w2)  pos = w2;
        img2.style.width = `${pos}px`
    }

    function getCursorPos(e)
    {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        a = img2.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
    }

    setTimeout(function()
    { 
       img12.style.backgroundSize = img2.style.backgroundSize = `${imgContainer2.offsetWidth}px ${imgContainer2.offsetHeight + 50}px`
    }, 
    200);

})