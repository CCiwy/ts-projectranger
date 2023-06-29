import React, { useState } from 'react';

function LanguageField(props) {
   
    const clsNames = ['default', 'prefered', 'dismissed']
   
    const [idx, setIdx] = useState(0);
    const clsName = clsNames[idx];
    

    const getNextIdx = () => {
        return idx < clsNames.length - 1 ? idx + 1 : 0
    }


    const toggleActive = (e) => {
        e.preventDefault()
        const nextIndex = getNextIdx()
        setIdx(nextIndex)

        const action = {type: clsNames[nextIndex], payload: props.language}
        props.callback(action)
    }


    return (
    <div className={`language_field box_shadow rounded ${clsName}`}
         onClick={(e) => toggleActive(e)} >
        <div className="language_field_inner">
            {props.language}
        </div>
    </div>
    )
}


export default function LanguageSelection(props) {
    const languages = props.languages;
    const state = props.selection;
    

    const prepareReduce = (action) => {
        let prefered =  [];
        let dismissed = [];

        if (action.type === 'prefered'){
            prefered = [...state.prefered, action.payload]

        } else if (action.type === 'dismissed'){
            prefered =  [...state.prefered.filter(ln => ln !== action.payload)],
            dismissed = [...state.dismissed, action.payload]
        
        } else if (action.type === 'default'){
            prefered =  [...state.prefered].filter(ln => ln !== action.payload),
            dismissed =  [...state.dismissed].filter(ln => ln !== action.payload)
        }
        const newState = {
            prefered: prefered,
            dismissed: dismissed
        }
        return newState;
    }


    const dispatch = (action) => {
        const newState = prepareReduce(action)
        const sendAction = {type: 'language', payload: newState}
        props.setSelection(sendAction) 
    }


    return (
    <>
        <h2>Select the languages</h2>

        <div id="languages__wrapper">
            { languages.map((item, idx) => {
                return <LanguageField key={idx} language={item} id={idx} callback={dispatch}/>
            })
            }
        </div>
    </>
    )
}

