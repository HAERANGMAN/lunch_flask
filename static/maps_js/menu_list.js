var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.484, 126.9), // 지도의 중심좌표 
        level: 3 // 지도의 확대 레벨 
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


// ============================좌표리스트============================
// 전부 마커가 표시될 좌표 배열입니다
var AllPositions = [ 
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)                
];

// 한식 마커가 표시될 좌표 배열입니다
var KPositions = [ 
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)                
];

// 일식 마커가 표시될 좌표 배열입니다
var JPositions = [
    new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
    new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
];

// 중식 마커가 표시될 좌표 배열입니다
var CPositions = [ 
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)                
];

// 기타 마커가 표시될 좌표 배열입니다
var EPositions = [ 
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)                
];

// 회식 마커가 표시될 좌표 배열입니다
var DPositions = [
    new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
    new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)                       
];    
// ============================좌표리스트============================


var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
    AllMarkers = [], // 전부 마커 객체를 가지고 있을 배열입니다    
    KMarkers = [], // 한식 마커 객체를 가지고 있을 배열입니다
    JMarkers = [], // 일식 마커 객체를 가지고 있을 배열입니다
    CMarkers = [], // 중식 마커 객체를 가지고 있을 배열입니다
    EMarkers = [], // 기타 마커 객체를 가지고 있을 배열입니다
    DMarkers = []; // 회식 마커 객체를 가지고 있을 배열입니다

createAllMarkers(); //  마커를 생성하고 전부 마커 배열에 추가합니다
createKMarkers(); //  마커를 생성하고 한식 마커 배열에 추가합니다
createJMarkers(); //  마커를 생성하고 일식 마커 배열에 추가합니다
createCMarkers(); //  마커를 생성하고 중식 마커 배열에 추가합니다
createEMarkers(); //  마커를 생성하고 기타 마커 배열에 추가합니다
createDMarkers(); //  마커를 생성하고 회식 마커 배열에 추가합니다


changeMarker('coffee'); // 지도에 커피숍 마커가 보이도록 설정합니다    


// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;            
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });
    
    return marker;  
}   
   

// ===============================전부===============================
// 커피숍 마커를 생성하고 커피숍 마커 배열에 추가하는 함수입니다
function createAllMarkers() {
    
    for (var i = 0; i < AllPositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(10, 0),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(AllPositions[i], markerImage);  
        
        // 생성된 마커를 커피숍 마커 배열에 추가합니다
        AllMarkers.push(marker);
    }     
}

// 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
function setAllMarkers(map) {        
    for (var i = 0; i < AllMarkers.length; i++) {  
        AllMarkers[i].setMap(map);
    }        
}
// ===============================전부===============================

// ===============================한식===============================
// 편의점 마커를 생성하고 편의점 마커 배열에 추가하는 함수입니다
function createKMarkers() {
    for (var i = 0; i < KPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 36),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(KPositions[i], markerImage);  

        // 생성된 마커를 편의점 마커 배열에 추가합니다
        KMarkers.push(marker);    
    }        
}

// 편의점 마커들의 지도 표시 여부를 설정하는 함수입니다
function setKMarkers(map) {        
    for (var i = 0; i < KMarkers.length; i++) {  
        KMarkers[i].setMap(map);
    }        
}
// ===============================한식===============================

// ===============================일식===============================   
// 주차장 마커를 생성하고 주차장 마커 배열에 추가하는 함수입니다
function createJMarkers() {
    for (var i = 0; i < JPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 72),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(JPositions[i], markerImage);  

        // 생성된 마커를 주차장 마커 배열에 추가합니다
        JMarkers.push(marker);        
    }                
}

// 주차장 마커들의 지도 표시 여부를 설정하는 함수입니다
function setJMarkers(map) {        
    for (var i = 0; i < JMarkers.length; i++) {  
        JMarkers[i].setMap(map);
    }        
}
// ===============================일식===============================   

// ===============================중식===============================
// 커피숍 마커를 생성하고 커피숍 마커 배열에 추가하는 함수입니다
function createCMarkers() {
    
    for (var i = 0; i < CPositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(10, 0),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(CPositions[i], markerImage);  
        
        // 생성된 마커를 커피숍 마커 배열에 추가합니다
        CMarkers.push(marker);
    }     
}

// 커피숍 마커들의 지도 표시 여부를 설정하는 함수입니다
function setCMarkers(map) {        
    for (var i = 0; i < CMarkers.length; i++) {  
        CMarkers[i].setMap(map);
    }        
}
// ===============================중식===============================

// ===============================기타===============================
// 기타 마커를 생성하고 기타 마커 배열에 추가하는 함수입니다
function createEMarkers() {
    for (var i = 0; i < EPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 36),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(EPositions[i], markerImage);  

        // 생성된 마커를 편의점 마커 배열에 추가합니다
        EMarkers.push(marker);    
    }        
}

// 기타 마커들의 지도 표시 여부를 설정하는 함수입니다
function setEMarkers(map) {        
    for (var i = 0; i < EMarkers.length; i++) {  
        EMarkers[i].setMap(map);
    }        
}
// ===============================기타===============================

// ===============================회식===============================
// 회식 마커를 생성하고 회식 마커 배열에 추가하는 함수입니다
function createDMarkers() {
    for (var i = 0; i < DPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 72),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(DPositions[i], markerImage);  

        // 생성된 마커를 주차장 마커 배열에 추가합니다
        DMarkers.push(marker);        
    }                
}

// 회식 마커들의 지도 표시 여부를 설정하는 함수입니다
function setDMarkers(map) {        
    for (var i = 0; i < DMarkers.length; i++) {  
        DMarkers[i].setMap(map);
    }        
}
// ===============================회식===============================


// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type){
    
    var AllMenu = document.getElementById('AllMenu');
    var KMenu = document.getElementById('KMenu');
    var JMenu = document.getElementById('JMenu');
    var CMenu = document.getElementById('CMenu');
    var EMenu = document.getElementById('EMenu');
    var DMenu = document.getElementById('DMenu');
    
    // 전부 카테고리가 클릭됐을 때
    if (type === 'All') {
    
        // 전부 카테고리를 선택된 스타일로 변경하고             
        // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
        AllMenu.className = 'menu_selected';
        KMenu.className = '';
        JMenu.className = '';
        CMenu.className = '';
        EMenu.className = '';
        DMenu.className = '';                
        
        // 전부 마커들만 지도에 표시하도록 설정합니다
        setAllMarkers(map);
        setKMarkers(null);
        setJMarkers(null);
        setCMarkers(null);
        setEMarkers(null);
        setDMarkers(null);
        
    } else if (type === 'K') { // 한식 카테고리가 클릭됐을 때
    
        // 한식 카테고리를 선택된 스타일로 변경하고
        AllMenu.className = '';
        KMenu.className = 'menu_selected';
        JMenu.className = '';
        CMenu.className = '';
        EMenu.className = '';
        DMenu.className = '';  
        
        // 한식 마커들만 지도에 표시하도록 설정합니다
        setAllMarkers(null);
        setKMarkers(map);
        setJMarkers(null);
        setCMarkers(null);
        setEMarkers(null);
        setDMarkers(null);
        
    } else if (type === 'J') { // 일식 카테고리가 클릭됐을 때
     
        // 일식 카테고리를 선택된 스타일로 변경하고
        AllMenu.className = '';
        KMenu.className = '';
        JMenu.className = 'menu_selected';
        CMenu.className = '';
        EMenu.className = '';
        DMenu.className = '';  
        
        // 일식 마커들만 지도에 표시하도록 설정합니다
        setAllMarkers(null);
        setKMarkers(null);
        setJMarkers(map);
        setCMarkers(null);
        setEMarkers(null);
        setDMarkers(null);

    }  else if (type === 'C') { // 중식 카테고리가 클릭됐을 때
        
        // 중식 카테고리를 선택된 스타일로 변경하고
        AllMenu.className = '';
        KMenu.className = '';
        JMenu.className = '';
        CMenu.className = 'menu_selected';
        EMenu.className = '';
        DMenu.className = '';  
        
        // 중식 마커들만 지도에 표시하도록 설정합니다
        setAllMarkers(null);
        setKMarkers(null);
        setJMarkers(null);
        setCMarkers(map);
        setEMarkers(null);
        setDMarkers(null);

    }  else if (type === 'E') { // 기타 카테고리가 클릭됐을 때
        
        // 기타 카테고리를 선택된 스타일로 변경하고
        AllMenu.className = '';
        KMenu.className = '';
        JMenu.className = '';
        CMenu.className = '';
        EMenu.className = 'menu_selected';
        DMenu.className = '';  
        
        // 기타 마커들만 지도에 표시하도록 설정합니다
        setAllMarkers(null);
        setKMarkers(null);
        setJMarkers(null);
        setCMarkers(null);
        setEMarkers(map);
        setDMarkers(null);

    }  else if (type === 'D') { // 회식 카테고리가 클릭됐을 때
        
        // 회식 카테고리를 선택된 스타일로 변경하고
        AllMenu.className = '';
        KMenu.className = '';
        JMenu.className = '';
        CMenu.className = '';
        EMenu.className = '';
        DMenu.className = 'menu_selected';  
        
        // 회식 마커들만 지도에 표시하도록 설정합니다
        setAllMarkers(null);
        setKMarkers(null);
        setJMarkers(null);
        setCMarkers(null);
        setEMarkers(null);
        setDMarkers(map);
    }     
} 