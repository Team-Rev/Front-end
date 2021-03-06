import React, { useState, useEffect } from 'react';
import { Container } from '../../Container/Container'
import style from './Question.module.css'
import axios from 'axios'
import {ContentCard} from './ContentCard/ContentCard'
import {PageBar} from "../../../util/PageBar/PageBar"
import {dateCal } from "../../../util/DateManager"
import { AskBoard } from "./AskBoard/AskBoard"

export function Question (props) {
    return (
        <Container 
            content={QuestionBoard}
            // info={props.info}
        />
    );
};

const QuestionBoard = (props) =>{
    
    const [isAskOpened, setIsAskOpened] = useState(false);
    const [nowAsk, setNowAsk] = useState(null);

    return(
        <div className={style.QuestionBoard}>
            <AskBoard
                // info={props.info}
                isAskOpened={isAskOpened}
                setIsAskOpened={setIsAskOpened}
                nowAsk={nowAsk}
                setNowAsk={setNowAsk}
            />
            <TopOfQuestion
                isAskOpened={isAskOpened}
            />
            <FrequentCard
                isAskOpened={isAskOpened}
            />
            <TotalQuestion
                isAskOpened={isAskOpened}
                setIsAskOpened={setIsAskOpened}
                setNowAsk={setNowAsk}
            />

        </div>
    );
}


function TopOfQuestion(props){
    const cards = [];

    cards.push({
        title : "오늘의 TIP",
        content : "혹시 아시나요? 내가 만든 문제를 다른 사용자가 풀면 포인트를 얻을 수 있어요!"
    })
    cards.push({
        title : "질문하기",
        content : "공부하다 잘 모르는 문제가 나왔으면 질문을 올려보세요."
    })
    cards.push({
        title : "문의하기",
        content : "서비스를 이용하는데 불편한 점이 있다면 들려주세요."
    })
    cards.push({
        title : "문의내역",
        content : "보내주신 문의에 대한 답변이 도착했어요."
    })

    if( props.isAskOpened ) return null;
    return(
        <div className={style.Top__Container}>
            <div className={style.TopSlider}>
                {cards.map(e => (
                    <ContentCard
                        title = {e.title}
                        content = {e.content}
                    />)
                )}
            </div>
        </div>
    );
}

const FrequentCard = (props) => {

    const [article, setArticle] = useState();
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            axios({
                method : 'get',
                url : '/board/ask/top',
            }).then(res => {
                setArticle(res.data)
            });
        }
        if (!completed) fetchData();

        return () => {
            setCompleted(true);
        }
    });

       if( props.isAskOpened ) return null;

       console.log(article)


    if (!article) {
        return null;
    } else {
        var leftlists = []
        var rightlists = []
        var i = 0
        var check = true
        while (i < article.length) {
            <div>
                {check ? leftlists.push(
                        <li className={style.FrequentContent}>
                            <div className={style.FrequentTitle}>{article[i].title}</div>
                            <div className={style.FrequentDetail}>{article[i].content}</div>
                            <div className={style.FrequentInfo}>
                                <span className={style.FrequentHits} >{article[i].hits} Hits</span>
                                <span className={style.FrequentComments} >{article[i].comments} Comments</span>
                            </div>
                        </li>
                ) : 
                rightlists.push(
                    <li className={style.FrequentContent}>
                        <div className={style.FrequentTitle}>{article[i].title}</div>
                        <div className={style.FrequentDetail}>{article[i].content}</div>
                        <div className={style.FrequentInfo}>
                            <span className={style.FrequentHits} >{article[i].hits} Hits</span>
                            <span className={style.FrequentComments} >{article[i].comments} Comments</span>
                        </div>
                    </li>)}
            </div>
            if (i % 2 !== 0) {
                check = true
            } else {
                check = false
            }
            i++;
        }

        return(
            <div className={style.FrequentlyBoard}>
                <div className={style.Frequently}>
                    <div className={style.FrequentMain}>
                        많이 본 질문
                    </div>
                    <div className={style.FrequentContentBoard}>
                       <ul>
                          {leftlists}   
                       </ul> 
                       <ul>
                           {rightlists}
                       </ul>
                    </div>
                </div>
            </div>
        );
    }
};

const TotalCard = (props) =>{
    const article = props.article;
    return(
        <li>
            <button className={style.TotalBtn}
            data-key={article.askId}
            onClick={(e) =>{
                const key = e.target.getAttribute('data-key');
                console.log(key);
                props.loadAsk();
                if(!props.isAskOpened) props.setIsAskOpened(true)
            }}>
                <div className={style.TotalTitle}
                    data-key={article.askId}>
                    {article.title}
                </div>

                <div className={style.TotalDetail}
                    data-key={article.askId}>
                    {article.content}
                </div>

                <div className={style.TotalInfo}
                    data-key={article.askId}>
                    <span className={style.TotalComments}
                        data-key={article.askId}>
                        {article.comments}Comments
                    </span>
                    <span className={style.TotalDate}
                        data-key={article.askId}>
                        {dateCal(article.postDate)}
                    </span>
                    <span data-key={article.askId}>{article.askId}</span>
                </div>
            </button>
        </li>
    );
}


function TotalQuestion(props){
    
    var [ ask , setAsk ] = useState([]);
    var [completed, setCompleted ]= useState(false);
    const [ nowPage, setNowPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);

    const loadAsk = (e) => {
        axios({
            method: 'get',
            url : `/board/ask/${e}`,
        }).then(res => {
            props.setNowAsk(res.data)
            console.log(res.data);
        });
    }

    useEffect(()=>{
        async function fetchData(){
            axios({
                method: 'get',
                url: `/board/ask?page=${nowPage}`,
            }).then(res => {
                var data = res.data;
                setAsk(data.asks.content);
                setPageCount(data.pageCount)
            });
        }
        if(!completed) fetchData();

        return () => {
            setCompleted(true);
        };
    });

    if( props.isAskOpened ) return null;

    return(
        <div className={style.TotalBoard}>
            <div className={style.TotalBoardMain}>
                    전체 질문
            </div>
            <div className={style.Total__Container}>
                <ul>
                    { ask.length > 0 && ask.map( e => (
                        <TotalCard 
                            key={e.askId}
                            article={e}
                            setIsAskOpened={props.setIsAskOpened}
                            isAskOpened={props.isAskOpened}
                            loadAsk={() => loadAsk(e.askId)}
                        />
                    ))}
                </ul>
            </div>
            <PageBar 
                nowPage={nowPage}
                setNowPage={setNowPage}
                pageCount={pageCount}
                setPageAsk={setAsk}
            />
        </div>
    );
}

