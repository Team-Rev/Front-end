
import React from 'react';
import style from './Summary.module.css'

const TotalSummary = (props) => {
    return(
        <li>
            <span className={style.info}>
                {props.info}
            </span>
            <span className={style.title}>
                {props.title}
            </span>
        </li>
    );
}

export function Summary(props){
    return(
        <div className={style.summary}>
            <ul>
                <TotalSummary title="시험 횟수" info={props.entireSummary.examCount}/>
                <TotalSummary title="푼 문제 수" info={props.entireSummary.totalCount}/>
                <TotalSummary title="맞힌 문제 수" info={props.entireSummary.correctCount}/>
                <TotalSummary title="평균 정답률" info={ `${parseInt(props.entireSummary.correctRatioAvg * 100)}%` }/>
            </ul>
        </div>
    );
}
