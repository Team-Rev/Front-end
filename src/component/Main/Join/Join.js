import React, { useState } from 'react';
import monent from 'react-moment';
import { useHistory } from 'react-router';
import { Container } from '../../Container/Container'
import axios from 'axios';
import styles from './Join.module.css'
import moment from 'moment';

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
            url : '/auth/signup',
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
        console.log('??????')
        if(res.data == "SUCCESS") {
            history.push("/login")
        } else if(res.data == "ID is present") {
            alert('???????????? ???????????????.')
            var id = document.getElementById("id")
            id.style.border = "2px solid red"
        } 
        else {
            alert('?????? ??????????????????')
        }
    })
    .catch(error => console.log(error))
}

            // // API ???????????? ????????? ????????? accessToken ?????? ???????????? ??????
            // axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`; 
            // axios.defaults.headers.common['Authorization'] = `Bearer ${REFRESH_TOKEN}`;      


        return (
            <div className={styles.container}>
             <div className={styles.contentbox}>
             <form className={styles.formtag} onSubmit={onSubmitHandler}>
                <div style={{paddingLeft : 15}}><p style={{color : "red", fontSize : 13}}>????????????, ??????, ???????????? ????????? ??????????????? ???????????? ??????????????????.</p></div>
                <input type="email"  name={userId} id="id" className="text-field" placeholder="?????????" onChange={onIdHandler}></input>
                <div style={{paddingLeft : 15}}><p style={{color : "#a7abab", fontSize : 12}}>????????? ???????????? ???????????????.</p></div>
                <input type="password" name={password} className="text-field" placeholder="????????????(8?????? ??????)" onChange={onPasswordHandler}></input>

                {password.length >= 8 && password.length <= 10 ? 
                    <div style={{paddingLeft : 15}}><p style={{color : "blue", fontSize : 12}}>?????? ???????????????.</p></div> : 
                    <div style={{paddingLeft : 15}}><p style={{color : "#a7abab", fontSize : 12}}>8~10 ???????????? ???????????????</p></div>}
                <input type="text" name={name} className="text-field" placeholder="??????" onChange={onUsernameHandler}></input>

                <input type="text"  name={nickname} className="text-field" placeholder="?????????" onChange={onNickHandler}></input>
                {/* <input type="text" name={DOB} className="text-field" placeholder="????????????(YYYY-MM-DD)" onChange={onDateHandler}></input> */}
                <input type="date" name={DOB} required pattern="\d{4}-\d{2}-\d{2}" onChange={onDateHandler}></input>
                <input type="text" name={phone} className="text-field" placeholder="??? ??????" onChange={onPhoneHandler}></input>
                <input type="text" name={detailAddress} className="text-field" placeholder="????????????" onChange={onDetailAddHandler}></input>
                <input type="text" name={address} className="text-field" placeholder="????????????" onChange={onAddHandler}></input>
                <input type="text" name={postNumber} className="text-field" placeholder="????????????" onChange={onPostnumHandler}></input>
                <br/>
               <div className={styles.bottom}> 
                <input className={styles.submitBtn} type="button" value="????????????" onClick={Goback}></input>
                <input className={styles.submitBtn} type="submit" value="????????????"></input>
               </div>
             </form>
             </div>
            </div> 
    
/* 
                <div className="links">
                    <a href="#2">?????????</a>
                    <br></br>
                    <hr className="hr1"></hr>
                <a href="#">?????????, ???????????? ??????</a>
                </div> */
    )
}