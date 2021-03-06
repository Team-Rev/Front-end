import React from 'react';
import { Container } from '../../Container/Container';
import styles from './MyPage.module.css'
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';

export function MyPage (props) {
    return (
        <>
            <Container content={MyPageBoard} info={props.info}/>
        </>
    );
};

const MyPageBoard = (props) => {

    const location = useLocation();
    const history = useHistory();
    const userinfo = location.state.info
    console.log(userinfo)
    
    const [userId, setUserId] = useState(userinfo.userId);
    const [nickname, setNickname] = useState(userinfo.nickname);
    const [name, setName] = useState(userinfo.name);
    const [DOB, setDOB] = useState(userinfo.DOB);
    const [phone, setPhone] = useState(userinfo.phone);
    const [address, setAddress] = useState(userinfo.address);
    const [detailAddr, setDetailAddr] = useState(userinfo.detailAddress);
    const [postnum, setPostNum] = useState(userinfo.postNumber);

    const handleInput = (e) => {
        var name = e.target.name
        switch(name) {
            case "userId":
                setUserId(e.currentTarget.value);
                break;
            case "nickname":
                setNickname(e.currentTarget.value);
                break;
            case "name":
                setName(e.currentTarget.value);
                break;
            case "DOB":
                setDOB(e.currentTarget.value);
                break;
            case "phone":
                setPhone(e.currentTarget.value);
                break;
            case "address":
                setAddress(e.currentTarget.value);
                break;
            case "detailAddress":
                setDetailAddr(e.currentTarget.value);
                break;
            case "postNumber":
                setPostNum(e.currentTarget.value);
                break;
        }
    }

    const handleBack = (e) => {
        history.push('/')
    }

    const handleModify = (e) => {
        e.preventDefault();
        axios({
            method : "PATCH",
            url : "/auth/userInfo",
            data : {
                "userId" : userId,
                "DOB" : DOB,
                "phone" : phone,
                "address" : address,
                "detailAddress" : detailAddr,
                "postNumber" : postnum
            }
        }).then(res => {
            if (res.data === "OK") {
                alert('????????? ?????????????????????.')
                history.push('/')
            } else {
                alert('???????????? ??? ????????? ?????????????????????.')
                history.push('/')
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentbox}>  
            <form className={styles.formtag}>
                <div style={{paddingLeft : 15}}><p style={{color : "red", fontSize : 13}}>????????????, ??????, ???????????? ????????? ??????????????????.</p></div>
                <input type="email" name="userId" value={userId} onChange={handleInput} className="text-field" disabled/>
                <input type="text" name="nickname" value={nickname} onChange={handleInput} className="text-field" disabled/>
                <input type="text" name="name" value={name} onChange={handleInput} className="text-field" disabled/>
                <input type="date" name="DOB" value={DOB}  onChange={handleInput} className="text-field"/>
                <input type="text" name="phone" value={phone} onChange={handleInput} className="text-field"/>
                <input type="text" name="address" value={address} onChange={handleInput} className="text-field"/>
                <input type="text" name="detailAddress" value={detailAddr} onChange={handleInput} className="text-field"/>
                <input type="text" name="postNumber" value={postnum} onChange={handleInput} className="text-field"/>
                <br/>   
               <div className={styles.bottom}> 
                <input className={styles.submitBtn} type="button" value="????????????" onClick={handleBack}/>
                <input className={styles.submitBtn} type="submit" value="????????????" onClick={handleModify}/>
               </div>
             </form>
             </div>
            </div>
    )
}