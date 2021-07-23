import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Login.module.css';
import logo from './img/logo.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

export function Login(props) {
    
    const dispatch = useDispatch();
    var [id, setId] = useState("");
    var [password, setPassword] = useState("");


    const handleInput = (e) => {
        var name = e.target.name
        switch(name){
            case "id":
                setId(e.target.value);
                break;
            case "pw":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const login = () =>{    
        props.setLoginOpen(false);
        axios({
            method: 'post',
            url: '/authenticate',
            data: {
                "username": id,
                "password": password
            }
        }).then(res => {
            console.log(res)
            props.login({
                username : id,
                token : res.data.jwt,
                nickname : res.data.nickname
            });
            localStorage.setItem("ACCESS_TOKEN", res.data.jwt)
        })
        .catch(error => console.log(error));
    }


   return (
        <div className={style.container}>
            <div className={style.form}>
                <button className={style.close} onClick={() => { props.setLoginOpen(false)}} >닫기</button>
                <div className={style.logoBox}>
                <img src={logo} alt="로고이미지" className={style.logo} />
                <span>One Pass 로그인</span>
                </div>

                <div className={style.loginForm}>
                        <input
                            onChange={(e) => handleInput(e)}
                            name="id"
                            type="text"
                            value={id}
                            placeholder="아이디" />
                        <input
                            onChange={(e) => handleInput(e)}
                            name="pw"
                            type="password"
                            value={password}
                            placeholder="비밀번호"/>
                        <button className={style.loginBtn} onClick={() => login()}>로그인</button>
                </div>

                <div className={style.info}>
                    <div className={style.findIdPw}>
                        <span>
                            아이디/비밀번호를 잊어버리셨나요?
                        </span>
                        <button>아이디/비밀번호 찾기</button>
                    </div>
                    <div className={style.signIn}>
                        <span>
                            아직도 One Pass를 모르시나요?
                        </span>
                        <NavLink to="/join" className={style.joinBtn} onClick={() => { props.setLoginOpen(false)}}>회원가입</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
   }