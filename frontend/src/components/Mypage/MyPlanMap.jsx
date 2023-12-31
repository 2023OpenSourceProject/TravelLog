import { useState, useEffect, useRef } from "react";
import axios from "axios";

const MyPlanMap = ({ planId, selectedDay }) => {
  const [planDetails, setPlanDetails] = useState([]);
  const mapRef = useRef(null); // useRef 사용
  const markersRef = useRef([]); // 마커를 저장할 useRef 생성
  const linesRef = useRef(null);

  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.setMap(null); // 선을 지우는 부분
    }
    markersRef.current.forEach(({ marker, overlay }) => {
      marker.setMap(null);
      overlay.setMap(null);
    });


    markersRef.current = [];
    const positions = []; // 마커의 위치를 저장할 배열

    axios
      .get(`https://api.travellog.site:8080/viewplan/${planId}`, {})
      .then((response) => {
        const planDetails = response.data.plan_details.filter(
          (place) => place.day === selectedDay
        );

        const bounds = new kakao.maps.LatLngBounds(); // LatLngBounds 객체 생성

        planDetails.forEach((place) => {
          bounds.extend(new kakao.maps.LatLng(place.lat, place.lng)); // 각 장소의 좌표를 bounds에 추가
        });

        const container = document.getElementById("myMap");
        const options = {
          center: new kakao.maps.LatLng(planDetails[0].lat, planDetails[0].lng),
          level: 3,
        };

        if (!mapRef.current) {
          // 지도가 생성되지 않았다면
          mapRef.current = new kakao.maps.Map(container, options); // 지도 생성
        }

        mapRef.current.setBounds(bounds); // 지도의 영역을 bounds로 설정

        // 마커를 찍는 함수
        const displayMarker = (locPosition, message, seq) => {
          const marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: locPosition,
          });

          const overlay = new kakao.maps.CustomOverlay({
            position: locPosition,
            content: `<div style="background-color: white; border: 0px solid #333; width: 15px; height: 15px;  text-align: center; line-height: 13.5px; border-radius: 10px; font-size: 12px; font-weight: bold;">${seq}</div>`,
            yAnchor: 2.2,
          });

          overlay.setMap(mapRef.current); // 사용자 정의 오버레이를 지도에 표시

          markersRef.current.push({ marker, overlay }); // 마커와 오버레이를 함께 markersRef에 추가
          positions.push(locPosition); // 마커의 위치를 배열에 추가
        };

        markersRef.current.forEach(({ marker, overlay }) => {
          marker.setMap(null);
          overlay.setMap(null);
        });

        // 각 장소에 대해 마커 생성
        planDetails.forEach((place) => {
          const locPosition = new kakao.maps.LatLng(place.lat, place.lng);
          displayMarker(locPosition, place.name, place.seq);
        });
        if(markersRef.current.length > 1) {
          if (linesRef.current) {
            linesRef.current.setMap(null); // 선을 지우는 부분
          }
          // 모든 마커가 생성된 후에 선을 그립니다.
          linesRef.current = new kakao.maps.Polyline({
            map: mapRef.current,
            path: positions, // 마커의 위치를 순서대로 연결
            strokeWeight: 2, // 선의 두께
            strokeColor: "#FF0000", // 선의 색상
            strokeOpacity: 1, // 선의 투명도
            strokeStyle: 'dashed' // 선의 스타일을 점선으로 설정
          });

        } else {
          if (linesRef.current) {
            linesRef.current.setMap(null); // 선을 지우는 부분
          }
        }

      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [planId, selectedDay]);

  return (
    <div>
      <div // 지도를 표시할 Container
        id="myMap"
        style={{
          width: "100%",
          height: "743px",
        }}
      ></div>
    </div>
  );
};

export default MyPlanMap;
