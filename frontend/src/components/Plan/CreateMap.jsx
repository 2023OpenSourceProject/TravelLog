import React, { useState, useEffect } from "react";
import styles from "./NewPlan.module.css";
import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";


const CreateMap = () => {
  // map은 지도 객체를 저장, places는 검색 결과를 저장

  
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);

  const [inputText, setInputText] = useState("");
  const [searchPlace, setSearchPlace] = useState("");


  // inputText는 입력 필드의 현재 값을 추적, searchPlace는 검색할 장소를 저장

  // 입력 필드에서 발생하는 이벤트를 처리하는 함수
  const onChange = (event) => {
    setInputText(event.target.value);
  };

  // 검색 버튼을 클릭했을 때의 이벤트를 처리하는 함수
  const submitHandler2 = (event) => {
    event.preventDefault();
    setSearchPlace(inputText);
    setInputText("");
  };

  const addLocationHandler = () => {

  }

  useEffect(() => {
    setSearchPlace(" ")
    if (!searchPlace) {
      return;
    }
    if (map) {
      for (let i = 0; i < map.markers.length; i++) {
        map.markers[i].setMap(null);
      }
      map.markers = [];
    } else {
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(33.325776, 126.5),
        level: 3,
      };
      // 지도 객체를 생성하고 map 상태에 저장
      const newMap = new kakao.maps.Map(container, options);
      newMap.markers = [];
      setMap(newMap);
    }

    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const ps = new kakao.maps.services.Places();

    // 키워드 검색을 수행하고, 결과를 placesSearchCB 콜백 함수에 전달

    ps.keywordSearch(searchPlace, placesSearchCB);


    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);

        // 검색 결과를 places 상태에 저장
        setPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT){
        setPlaces([]);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 클릭 이벤트 리스너를 추가하여, 마커 클릭 시 정보 창을 표시
      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px; font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
      map.markers.push(marker);
    }
  }, [searchPlace, map]);

  // 검색 창과 결과 리스트, 지도를 표시하는 렌더링 부분
  return (
    <div className={styles.mapSection} style={{ display: "flex" }}>
      <div className={styles.searchSection} id="result-list">
        <form className={styles.inputForm} onSubmit={submitHandler2}>
          <input type="text" onChange={onChange} value={inputText} />
          <button type="submit">검색</button>
        </form>
        {places.map((item, i) => (
          <div className={styles.searchList}>
            <div key={i} className={styles.locationInfo}>
              <span>{i + 1}</span>
              <div>
                <h5>{item.place_name}</h5>
                {item.road_address_name ? (
                  <div>
                    <div>{item.road_address_name}</div>
                    <span>{item.address_name}</span>
                  </div>
                ) : (
                  <span>{item.address_name}</span>
                )}
                <span>{item.phone}</span>
              </div>
            </div>
            <button className={styles.plusBtn} onClick={addLocationHandler}>+</button>
          </div>
        ))}
      </div>

      <div // 지도를 표시할 Container
        className={styles.kakaoMap}
        id="myMap"
        style={{
          width: "100%",
          height: "743px",
        }}
      ></div>
    </div>
  );
};

export default CreateMap;
