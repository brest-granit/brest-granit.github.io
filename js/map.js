window.addEventListener('load', function()
{


let map_json =
                [
                    {
                        city: 111,
                        "id": 001,
                        "uniqid": "111",
                        image: "img/map.png",
                        title: "111",
                        address: "111",
                        x: 52.079139,
                        y: 23.754685,


                    },
                ]

                ymaps.ready(function () 
                {
                 var myMap = new ymaps.Map('map', {
                  center: [52.079139, 23.754685],
                  zoom: 15,
                  controls: ['geolocationControl',]
                 }, {
                  searchControlProvider: 'yandex#search'
                 }),
             
                  MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                   `
                   <div style = 'background-image:url($[properties.balloonImage]);' class = 'mapMarkImageContainer'></div>
                   <div class = 'mapMarkBottomRect'></div>
                   <div class = 'mapMarkBody'>
                     <div class = 'mapMarkTitle'>$[properties.balloonTitle]</div>
                     <div class = 'mapMarkAdditional'>$[properties.balloonAddress]</div>
                   </div> 
                   `
             
                  ),
                  MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                   '<div style="color: rgba(0,0,0,1); font-weight: bold;">$[properties.iconContent]</div>'
                  )
                 for (let balloon of map_json) {
                  myPlacemarkWithContent = new ymaps.Placemark([balloon.x, balloon.y],
                   {
                    balloonImage: balloon.image,
                    balloonTitle: balloon.title,
                    balloonAddress: balloon.address,
                    hintContent: balloon.title,
                   },
                   {
                    balloonContentLayout: MyBalloonContentLayout,       
                    iconImageSize: [48, 48],
                    iconImageOffset: [-24, -24],
                    iconContentOffset: [15, 15],       
                   });
             
                  let currentObject = myMap.geoObjects.add(myPlacemarkWithContent);
                 }
                 myMap.controls.add('zoomControl',
                 {
                  size: "small"
                 });
                 myMap.controls.add('rulerControl', 
                 {     
                  scaleLine: false
                 });
                 myMap.geoObjects.add(myPlacemarkWithContent);
                 
                });
            })