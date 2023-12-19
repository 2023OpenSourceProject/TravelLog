import React, { useState, useEffect, useRef } from "react";
import styles from "./NewPlan.module.css";
import searchIcon from "../../assets/searchIcon.png";
import notFound from "../../assets/image/notFound.svg";
import addBtn from "../../assets/addBtn.svg";

const CreateMap = ({
  selectedDay,
  setLocationList,
  setNewPlan,
  locationList,
}) => {
  let lat, lng;
  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  let markerSource =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";

  // map은 지도 객체를 저장, places는 검색 결과를 저장
  const mapRef = useRef(null); // useRef 사용
  const [places, setPlaces] = useState([]);
  // inputText는 입력 필드의 현재 값을 추적, searchPlace는 검색할 장소를 저장
  const [inputText, setInputText] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  // 입력 필드에서 발생하는 이벤트를 처리하는 함수
  const onChange = (event) => {
    setInputText(event.target.value);
  };

  // 검색 버튼을 클릭했을 때의 이벤트를 처리하는 함수
  const searchLocationHandler = (event) => {
    event.preventDefault();
    setSearchPlace(inputText);
    setInputText("");
  };

  const clearMarkers = () => {
    for (let i = 0; i < mapRef.current.markers.length; i++) {
      mapRef.current.markers[i].setMap(null);
    }
    mapRef.current.markers = [];
  };

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successGeo, failGeo);

      function successGeo(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        let container = document.getElementById("myMap");
        let options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        if (!mapRef.current) {
          mapRef.current = new kakao.maps.Map(container, options);
          mapRef.current.markers = [];
        }
      }

      function failGeo(position) {
        let container = document.getElementById("myMap");
        let options = {
          center: new kakao.maps.LatLng(33.4, 126.3),
          level: 3,
        };

        if (!mapRef.current) {
          mapRef.current = new kakao.maps.Map(container, options);
          mapRef.current.markers = [];
        }
      }
    } else {
      let container = document.getElementById("myMap");
      let options = {
        center: new kakao.maps.LatLng(33.4, 126.3),
        level: 3,
      };

      if (!mapRef.current) {
        mapRef.current = new kakao.maps.Map(container, options);
        mapRef.current.markers = [];
      }
    }

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i], i);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        mapRef.current.setBounds(bounds);

        setPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        clearMarkers();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successGeo, failGeo);

          function successGeo(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            mapRef.current.setCenter(new kakao.maps.LatLng(lat, lng));
            mapRef.current.setLevel(3, {
              anchor: new kakao.maps.LatLng(lat, lng),
            });
          }

          function failGeo(event) {
            console.log("Error Geolocation!");
            mapRef.current.setCenter(
              new kakao.maps.LatLng(37.537183, 127.005454)
            );
            mapRef.current.setLevel(3, {
              anchor: new kakao.maps.LatLng(37.537183, 127.005454),
            });
          }
        } else {
          clearMarkers();
          mapRef.current.setCenter(
            new kakao.maps.LatLng(37.537183, 127.005454)
          );
        }
        setPlaces([]);
      }
    }
  }, [searchPlace]);

  function displayMarker(place, index) {
    let imageSrc = `${markerSource}`, // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

    kakao.maps.event.addListener(marker, "mouseover", function () {
      infowindow.setContent(
        '<div style="padding:5px; font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(mapRef.current, marker);
    });

    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });

    mapRef.current.markers.push(marker);
  }

  const addLocationHandler = (place, day) => {
    // 이미 추가된 장소인지 확인
    const isPlaceAlreadyAdded = locationList.some(
      (item) => item.name === place.place_name && item.day === day
    );

    if (isPlaceAlreadyAdded) {
      alert("이미 추가된 장소입니다.");
      return;
    }
    setLocationList((prevState) => {
      const newLocationList = [...prevState];
      const newPlace = {
        day: day,
        lat: parseFloat(place.y),
        lng: parseFloat(place.x),
        img: "#",
        seq: newLocationList.filter((item) => item.day === day).length + 1,
        location: place.address_name,
        name: place.place_name,
        category: place.category_group_name,
        category2: place.category_name,
      };
      newLocationList.push(newPlace);

      return newLocationList;
    });
    setNewPlan((prevState) => {
      return { ...prevState, plan_details: locationList };
    });
  };

  // 검색 창과 결과 리스트, 지도를 표시하는 렌더링 부분
  return (
    <div className={styles.mapSection}>
      <div className={styles.searchSection} id="result-list">
        <form onSubmit={searchLocationHandler} className={styles.inputForm}>
          <input
            className={styles.searchInput}
            type="text"
            onChange={onChange}
            value={inputText}
            placeholder="Search"
          />
          <img
            className={styles.searchIcon}
            src={searchIcon}
            onClick={searchLocationHandler}
            type="submit"
          ></img>
        </form>
        {places.length > 0 ? (
          places.map((item, i) => (
            <div className={styles.searchResult} key={i}>
              <div className={styles.searchItem}>
                <div
                  className={styles.markerNumber}
                  style={{
                    backgroundImage: `url(${markerSource})`,
                    backgroundPosition: `0px ${-i * 46}px`, // 마커 이미지의 위치를 조정합니다.
                    width: "36px", // 이미지 요소의 너비를 조정합니다.
                    height: "46px", // 이미지 요소의 높이를 조정합니다.
                  }}
                ></div>
                <div className={styles.locationInfo}>
                  <h5>{item.place_name}</h5>
                  <p className={styles.locationCategory}>
                    {item.category_name}
                  </p>
                  <span className={styles.locationAddress}>
                    {item.address_name}
                  </span>

                  <div className={styles.locationPhone}>{item.phone}</div>
                </div>
              </div>
              <img
                className={styles.addBtn}
                src={addBtn}
                alt="addBtn"
                onClick={() => addLocationHandler(item, selectedDay)}
              />
            </div>
          ))
        ) : (
          <div className={styles.noResultSection}>
            <img style={{ width: "10vw" }} src={notFound} alt="notFound" />
            <div>검색 결과가 없습니다</div>
            <div>다른 키워드로 검색해보세요!</div>
          </div>
        )}
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
