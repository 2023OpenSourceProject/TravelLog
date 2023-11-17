import React, {useEffect, useRef, useState} from "react";
import Navbar from "../UI/Navbar";

// Toast UI Editor
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NewReview = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [planList, setPlanList] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [inputLocate, setLocate] = useState("");
    const [inputTitle, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(null);
    const editorRef = useRef()
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
            setSelectedImageUrl(URL.createObjectURL(event.target.files[0])); // 이미지 URL 저장
        }
    };

    // plan 선택 핸들러
    const handlePlanChange = (e) => {
        setSelectedPlan(e.target.value);
    }

    function locateChangeHandler(event) {
        setLocate(event.target.value);
    }

    function titleChangeHandler(event) {
        setTitle(event.target.value);
    }

    const handleIsPublicChange = (e) => {
        setIsPublic(e.target.value);
    }

    let navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('https://api.travellog.site:8080/user/myplan', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setPlanList(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);


    // 리뷰 등록 핸들러
    const handleSubmit = async () => {
        if (!selectedImage) {
            alert("사진을 선택해주세요.");
            return;
        }
        if (!selectedPlan || selectedPlan === "") {
            alert("리뷰를 선택해주세요.");
            return;
        }
        if (!isPublic || isPublic === "") {
            alert("공개여부를 선택해주세요.");
            return;
        }

        //제목을 선택했는지 여부 확인
        if (!inputTitle || inputTitle === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        //위치를 선택했는지 여부 확인
        if (!inputLocate || inputLocate === "") {
            alert("여행지를 입력해주세요.");
            return;
        }

        const editorInstance = editorRef.current.getInstance();
        const content = editorInstance.getMarkdown();

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('img', selectedImage);
        formData.append('title', inputTitle);
        formData.append('planId', selectedPlan);
        formData.append('isPublic', isPublic);
        formData.append('content', content);
        formData.append('locate', inputLocate);
        console.log(formData)
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        // const response = await axios.post('https://api.travellog.site:8080/review', formData, {
        const response = await axios.post('http://localhost:8080/review', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        // 응답 처리
        if(response.status === 200){
            alert("성공적으로 제출되었습니다.");
            navigate("/");
        } else {
            alert("제출에 실패하였습니다.");
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', gridGap: '20px' }}>
                <div>
                    <div className="text-zinc-700 text-5xl font-extrabold font-['Poppins'] leading-[57.60px]">Write Review</div>
                    <div className="w-[1043px] h-2 bg-zinc-400 rounded-[15px]" />
                    <br/>
                    <input
                        type="text" name="title"
                        placeholder="제목"
                        style={{width: '1000px', height: '70px',  fontSize: '35px', fontWeight: 'bold'}}
                        required
                        onChange={titleChangeHandler}
                    ></input>
                    <Editor
                        placeholder="내용을 입력해주세요."
                        previewStyle="vertical" // 미리보기 스타일 지정
                        height="600px" // 에디터 창 높이
                        toolbarItems={[
                            // 툴바 옵션 설정
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                            ['table', 'image', 'link'],
                            ['code', 'codeblock']
                        ]
                        }
                        ref={editorRef}
                    ></Editor>
                </div>
                <div>
                    <div className="w-[141px] h-[50px] text-black text-[40px] font-normal font-['Mochiy Pop P One']">Photo</div>
                    {selectedImage && <img src={selectedImageUrl} alt="Selected" style={{width: '100%', height: 'auto'}} />}
                    <input type="file" accept="image/*" onChange={onImageChange} />
                    <div className="w-[312px] h-[52px] text-black text-[40px] font-normal font-['Mochiy Pop P One']">Select Plan</div>
                    <select onChange={handlePlanChange}>
                        <option value="">리뷰를 선택하세요</option>
                        {planList.map((plan) => (
                            <option key={plan.plan_id} value={plan.plan_id}>
                                {plan.title}
                            </option>
                        ))}
                    </select>
                    <div className="w-[367px] h-12 text-black text-[40px] font-normal font-['Mochiy Pop P One']">Trip Place</div>
                    <input
                        type="text" name="locate"
                        placeholder="여행지를 입력해주세요"
                        required
                        onChange={locateChangeHandler}
                    ></input>
                    <div className="w-[367px] h-12 text-black text-[40px] font-normal font-['Mochiy Pop P One']">공개여부</div>
                    <select onChange={handleIsPublicChange}>
                        <option value="">공개여부를 선택해주세요</option>
                        <option value="1">공개</option>
                        <option value="0">비공개</option>
                    </select><br/>
                    <button
                        className="w-[271px] h-[91px] px-[15px] py-[5px] bg-green-400 rounded-[15px] justify-center items-center gap-2.5 inline-flex"
                        onClick={handleSubmit}
                    >
                        <div className="text-center text-white text-[32px] font-normal font-['Poppins'] leading-[57.60px]">Post</div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default NewReview;
