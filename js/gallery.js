window.addEventListener('DOMContentLoaded', function()
{    

  
    let works = document.getElementById('gallery');
    let scale = 2;

    let json = 
    [
        {
            "src":"img/photo1.jpg",
            "h":"1600",
            "w":"1200",
        },
        {
            "src":"img/photo2.jpg",
            "h":"1600",
            "w":"1200",
        },
        {
            "src":"img/photo3.jpg",
            "h":"1600",
            "w":"1200",
        },
        {
            "src":"img/photo4.jpg",
            "h":"1600",
            "w":"1200",
        },
        {
            "src":"img/photo5.jpg",
            "h":"1600",
            "w":"1200",
        },
        {
            "src":"img/photo6.jpg",
            "h":"1600",
            "w":"1200",
        },
        {
            "src":"img/photo7.jpg",
            "h":"1600",
            "w":"1200",
        }
    ]

    let string = '';
    
    for(let img of json)
    {
        let imgContainer = document.createElement('a')
        imgContainer.className = 'pageBlockOurWorksImageContainer'
        //imgContainer.style.backgroundImage = `url(${img.src})`
        works.appendChild(imgContainer)
       
        let imgImage = document.createElement('img')
        imgImage.src = img.src
        imgImage.className = 'zoom'

        let bgImage = document.createElement('img')
        bgImage.src = img.src

        imgContainer.appendChild(bgImage) 
        imgContainer.appendChild(imgImage) 

        let containerHeight = imgContainer.offsetHeight;
        let containerWidth =  imgContainer.offsetWidth;
      
        

        if(img.h > img.w && containerHeight*img.w/img.h > containerWidth) 
        {
            img.resizeY = containerHeight
            bgImage.style.height = imgImage.style.height =  img.resizeY  + "px";
            img.resizeX = containerHeight*img.w/img.h             
            bgImage.style.width = imgImage.style.width = img.resizeX + "px"
        }
        else
        {
            img.resizeX = containerWidth  
            bgImage.style.width = imgImage.style.width =  img.resizeX + "px";
            img.resizeY =  containerWidth*img.h/img.w
            bgImage.style.height = imgImage.style.height = img.resizeY +"px"
        }
        img.scaleX = img.resizeX * scale
        img.scaleY = img.resizeY * scale

        bgImage.style.left = imgImage.style.left = `${-(img.resizeX/2) + containerWidth/2 }px`;
        bgImage.style.top =  imgImage.style.top = `${-(img.resizeY/2) + containerHeight/2}px`;
        
        imgImage.style.width =  `${img.scaleX }px`
        imgImage.style.height = `${img.scaleY }px`
       
       
       
        let imgW = imgImage.clientWidth  * scale
       
        imgContainer.addEventListener('mouseover', function()
        {            
            imgImage.className = 'zoom hover'
        });
        imgContainer.addEventListener('mouseleave', function()
        {          
            imgImage.className = 'zoom'
        });


        imgContainer.addEventListener('mousemove', function()
        {
           
            let mouse = getCursorPos(event, imgContainer);         
            
            let pMouse = { "x": (mouse.x/imgContainer.offsetWidth).toFixed(5), "y": (mouse.y/imgContainer.offsetHeight).toFixed(5)};          
           
            let offsetX = ( - img.scaleX * pMouse.x ) + img.scaleX/2 * (imgContainer.offsetWidth/img.scaleX);
            let offsetY = ( - img.scaleY * pMouse.y ) + img.scaleY/2 * (imgContainer.offsetHeight/img.scaleY);

            if(offsetX > 0)                                         offsetX = 0 
            if((img.scaleX + offsetX) <  imgContainer.offsetWidth)  offsetX = - img.scaleX+imgContainer.offsetWidth;           
            if(offsetY > 0)                                         offsetY = 0
            if((img.scaleY + offsetY) <  imgContainer.offsetHeight) offsetY = - img.scaleY+imgContainer.offsetHeight;
         
            imgImage.style.left = `${offsetX}px`;
            imgImage.style.top = `${offsetY}px`;
        })
      



    } 

    let galleryButton = document.createElement('a')
    galleryButton.className = 'pageBlockOurWorksBlockButton pageBlockOurWorksImageContainer'
    works.appendChild(galleryButton)
    galleryButton.innerText="Больше наших работ"
    galleryButton.href="#"

    function getCursorPos(e, obj)
    {
        var a, x, y  = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;      
        a = obj.getBoundingClientRect();

        x = e.pageX - a.left;       
        x = x - window.pageXOffset;

        y = e.pageY - a.top;
        y = y - window.pageYOffset;

        return {"x":x, "y":y};
    }
})

