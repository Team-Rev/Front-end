import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import logo from './img/logo.png'
import user from './img/user.png'
import learn from './img/learn.png'
import notice from './img/notice.png'
import ques from './img/ques.png'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import loginChk from '../../../store/modules/userSlice'
import { useState } from 'react'
import axios from 'axios'


export function Sidebar(props) {

    /*
    useEffect(() => {
        $('.side-tab, .side-tabm').hover(function() {
            $('.active').css('color', "#00251a");
        });
    });*/
    var isLogin = useSelector(state => state.user.isLogin)
    var username = useSelector(state => state.user.nickname)
    var id = useSelector(state => state.user.id)
    const history = useHistory()

    const [userInfo, setUserInfo] = useState();

    const handleOnClick = (e) => {
        history.push('/')
    }

    const userinformation = (e) => {
        e.preventDefault();
        axios({
            method : "GET",
            url : `/auth/userInfo?userId=${id}`
        }).then(res => {
            history.push({
                pathname : "/mypage",
                state : {
                    info : res.data
                }
            })
        }).catch(error => console.log(error))
    }

    return (
        <div className="side-bar">
            <div className="logo-box">
                <img src={logo} alt="로고이미지" className="logo" onClick={handleOnClick}/>
            </div>
            <div className="menu__container">
                <div className="login-box" >
                        <img src={user}  alt="유저아이콘" />
                        {!isLogin && <button to="/login" className="login" onClick={() => props.setLoginOpen(true)} >로그인</button>}
                        {isLogin && <a href="/" className="user">{username}</a>}
                </div>
            
                <ul className="main-box">
                    <li>
                        <img src={learn}  alt="학습아이콘"/>
                        <NavLink to="/learning">학습하기</NavLink>
                    </li>
                    <li>
                        <img src={notice}  alt="공지아이콘"/>
                        <NavLink to="/notice">공지사항</NavLink>
                    </li>
                    <li>
                        <img src={ques}  alt="질문아이콘"/>
                        <NavLink to="/question">질문 게시판</NavLink>
                    </li>
                </ul>
                {isLogin && 
                <ul className="sub-box">
                    <li>
                        <NavLink to="/mypage" onClick={userinformation}>내 정보</NavLink>
                    </li>
                    <li>
                        <NavLink to="/learnrecord">학습 내역</NavLink>
                    </li>
                    <li>
                        <NavLink to="/vulnerable">취약점</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pointrecord">포인트 내역</NavLink>
                    </li>
                    <li>
                        <NavLink to="/createques">생성한 문제</NavLink>
                    </li>
                    <li>
                        <button className="logout" onClick={() => props.logout()}>로그아웃</button>
                    </li>
                </ul>
                }
            </div>
        </div>
    );
}