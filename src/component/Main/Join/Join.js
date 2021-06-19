import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container } from '../../Container/Container'
import axios from 'axios';
import styles from './Join.module.css'

export function Join(props) {
    return(
        <Container content={JoinBoard}/>
    )
}

const JoinBoard = () => {
    return(
        <div>
           <JoinForm/>
        </div>
    )
}

const JoinForm = (props) => {
    let history = useHistory();
    const [userId , setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [nickname, setNickname] = useState("")
    const [DOB, setDOB] = useState("")
    const [phone, setPhone] = useState("")
    const [detailAddress, setDetailAddress] = useState("")
    const [address, setAddress] = useState("")
    const [postNumber, setPostNumber] = useState("")

    const onIdHandler = (e) => {
        setUserId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onUsernameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const onNickHandler = (e) => {
        setNickname(e.currentTarget.value)
    }

    const onDateHandler = (e) => {
        setDOB(e.currentTarget.value)
    }

    const onPhoneHandler = (e) => {
        setPhone(e.currentTarget.value)
    }

    const onDetailAddHandler = (e) => {
        setDetailAddress(e.currentTarget.value)
    }

    const onAddHandler = (e) => {
        setAddress(e.currentTarget.value)
    }

    const onPostnumHandler = (e) => {
        setPostNumber(e.currentTarget.value)
    }

    const Goback = () => {
        history.goBack();
    }
    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios({
            method : 'post',
            url : '/signup',
            data: {
                "detailAddress" : detailAddress,
                "nickname" : nickname,
                "DOB" : DOB,
                "userId" : userId,
                "name" : name,
                "password" : password,
                "phone" : phone,
                "address" : address,
                "postNumber" : postNumber
            }
    }).then(res => {
        console.log(res)
        console.log('체크')
        if(res.data == "SUCCESS") {
            history.push("/login")
        }
    })
    .catch(error => console.log(error))
}

            // // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            // axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`; 
            // axios.defaults.headers.common['Authorization'] = `Bearer ${REFRESH_TOKEN}`;      


        return (
            <div className={styles.container}>
             <div className={styles.contentbox}>
             <form className={styles.formtag} onSubmit={onSubmitHandler}>
                <input type="email"  name={userId} className="text-field" placeholder="아이디" onChange={onIdHandler}></input>
                <input type="password" name={password} className="text-field" placeholder="비밀번호" onChange={onPasswordHandler}></input>
                <input type="text" name={name} className="text-field" placeholder="이름" onChange={onUsernameHandler}></input>
                <input type="text"  name={nickname} className="text-field" placeholder="닉네임" onChange={onNickHandler}></input>
                <input type="text" name={DOB} className="text-field" placeholder="출생년일(YYYY-MM-DD)" onChange={onDateHandler}></input>
                <input type="text" name={phone} className="text-field" placeholder="폰번호" onChange={onPhoneHandler}></input>
                <input type="text" name={detailAddress} className="text-field" placeholder="상세주소" onChange={onDetailAddHandler}></input>
                <input type="text" name={address} className="text-field" placeholder="거주주소" onChange={onAddHandler}></input>
                <input type="text" name={postNumber} className="text-field" placeholder="우편번호" onChange={onPostnumHandler}></input>
                <br/>
               <div className={styles.bottom}> 
                <input className={styles.submitBtn} type="button" value="뒤로가기" onClick={Goback}></input>
                <input className={styles.submitBtn} type="submit" value="회원가입"></input>
               </div>
             </form>
             </div>
            </div> 
    
/* 
                <div className="links">
                    <a href="#2">로그인</a>
                    <br></br>
                    <hr className="hr1"></hr>
                <a href="#">아이디, 비밀번호 찾기</a>
                </div> */
    )
}