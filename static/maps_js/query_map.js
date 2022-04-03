var inputData = [];
var markers = [];
var customOverlays = [];
var count = 0;

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.484, 126.9), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();
var bounds = new kakao.maps.LatLngBounds();

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도 타입 컨트롤을 지도에 표시합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var imageSrc =
    "https://tistory2.daumcdn.net/tistory/3056305/skin/images/map-marker-red.png", // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(35, 35), // 마커이미지의 크기입니다
    imageOption = {
        offset: new kakao.maps.Point(17, 40)
    }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

// function search() {
//     count = 0;
//     inputData = [];
//     bounds = new kakao.maps.LatLngBounds();

//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//         customOverlays[i].setMap(null);
//     }
//     markers = [];
//     customOverlays = [];

//     var v1 = document.getElementById("keword1");
//     var v2 = document.getElementById("keword2");
//     var v3 = document.getElementById("keword3");
//     var v4 = document.getElementById("keword4");
//     var v5 = document.getElementById("keword5");
//     var v6 = document.getElementById("keword6");

//     var arrTemp = [v1, v2, v3, v4, v5, v6];

//     for (i = 0; i < arrTemp.length; i++) {
//         if (arrTemp[i].value != "") {
//             inputData.push(arrTemp[i].value);
//         }
//     }

//     if (inputData != null) {
//         kewwordSearch(inputData[count]);
//     }
// }    

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다

        displayMarker(data[0]);
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        if (count < inputData.length) {
            kewwordSearch(inputData[count])
        } else if (count == inputData.length) {
            setBounds();
            applyStyle();
        }
    }
}


function kewwordSearch(keword) {
    ps.kewwordSearch(keword, placesSearchCB);
    count = count + 1;
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage
    });

    markers.push(marker);

    kakao.maps.event.addListener(marker, 'click', function () {
        var position = this.getPosition();
        var url = 'https://map.kakao.com/link/map/' + place.id;
        window.open(url, '_blank');
    });

    var content =
        '<div class="customoverlay" style="position: relative;bottom: 76px;border-radius: 6px;border: 1px solid #ccc;border-bottom: 2px solid #ddd;float: left;">' +
        '  <a href="https://map.kakao.com/link/map/' + place.id + '"' +
        ' target="_blank" style="display: block;text-decoration: none;color: #666666;text-align: center;border-radius: 6px;font-size: 14px;font-weight: bold;overflow: hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">' +
        '    <span class="title" style="display: block;text-align: center;background: #fff;margin-right: 35px;padding: 8px 10px;font-size: 13px;font-weight: bold;">' +
        count + '. ' + place.place_name + '</span>' +
        '  </a>' +
        '</div>';

    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        content: content,
        yAnchor: 0.11
    });

    customOverlays.push(customOverlay);
}

function setBounds() {
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
    map.setBounds(bounds, 90, 90, 10, 90);
}

// function init() {
//     document.getElementById("keword1").value = "";
//     document.getElementById("keword2").value = "";
//     document.getElementById("keword3").value = "";
//     document.getElementById("keword4").value = "";
//     document.getElementById("keword5").value = "";
//     document.getElementById("keword6").value = "";
// }