import React, { useState } from 'react';
import { LangSelection } from '../../intefaces'

interface Props {
    languages: string[],
    selection: LangSelections,
    setSelection: Any; // React reducer callback
} 


enum SelectChoice {
    prefered = 'prefered',
    dismissed = 'dismissed',
    default = 'default'
}

interface LangSelectAction {
    type: SelectChoice,
    payload: string,
}

interface FieldProps {
    language: string,
    callback: Any, //type callback
}

interface FieldAction {
    type: SelectChoice,
    payload: string,
}


const LanguageField: React.FC<FieldProps> = ( {language, callback} )  => {
   
    const [idx, setIdx] = useState(0);
    const clsNames: string[] = [SelectChoice.default, SelectChoice.prefered, SelectChoice.dismissed]
    const clsName: string = clsNames[idx];

    const getNextIdx = (): number =>  {
        return idx < clsNames.length - 1 ? idx + 1 : 0
    }


    const toggleActive = (e): void => {
        e.preventDefault()
        const nextIndex: number = getNextIdx()
        
        setIdx(nextIndex)

        // todo: need to type this
        const action: FieldAction = {
            type: clsNames[nextIndex],
            payload: language
        }
        callback(action)
    }


    return (
    <div className={`language_field box_shadow rounded ${clsName}`}
         onClick={(e) => toggleActive(e)} >
        <div className="language_field_inner">
            {language}
        </div>
    </div>
    )
}

const LanguageSelection: React.FC<Props> = ({ languages, selection, setSelection}) => {
    //const languages = props.languages;
    //const state = props.selection;
    

    const prepareReduce = (action: LangSelectAction) => {
        let prefered: string[] =  [];
        let dismissed: string[] = [];

        if (action.type === SelectChoice.prefered){
            prefered = [...selection.prefered, action.payload]
            dismissed = [...selection.dismissed]
        } else if (action.type === SelectChoice.dismissed){
            prefered =  [...selection.prefered.filter(ln => ln !== action.payload)],
            dismissed = [...selection.dismissed, action.payload]
        
        } else if (action.type === SelectChoice.default){
            prefered =  [...selection.prefered].filter(ln => ln !== action.payload),
            dismissed =  [...selection.dismissed].filter(ln => ln !== action.payload)
        }
        const newState = {
            prefered: prefered,
            dismissed: dismissed
        }
        return newState;
    }

    // todo: in parent we need to define types for action and payload? 
    const dispatch = (action: LangSelectAction) => {
        const newState = prepareReduce(action)
        const sendAction = {type: 'language', payload: newState}
        setSelection(sendAction) 
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


export default LanguageSelection
