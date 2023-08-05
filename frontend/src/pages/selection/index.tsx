import React, {useReducer, useState } from 'react';
import { ProjectChooser } from './components/';
import { ExpSelection } from './components/';
import { LanguageSelection } from './components/';
import { Selections } from './interfaces';
import { SelectionProvider } from './SelectionContext';

import './selection.css'

// todo: should come from backend
const LANGUAGES: string[] = ["PHP","Python","JS", "TS", "C", "C++", "C#", "GO", "Rust", "Lisp", "OCamel", "Cobol", "Lua", "Julia"].sort();


//todo: refactor as context provider
// https://stackoverflow.com/questions/55055793/react-usereducer-hook-fires-twice-how-to-pass-props-to-reducer


const INITAL_SELECTIONS: Selections = {
    skill: '',
    languages: {
        prefered: [],
        dismissed: [],
    }
}

// todo: import from seperate file
// also use in child
enum ActionType {
    lang =  'language',
    skill =  'skill',
    unknown = 'Uknown Action'
}

interface JumpProps {
    callback: Any;
}


const JumpBefore: React.FC = ( {callback}: JumpProps) => {
    
    const handleClick = (e) => {
        e.preventDefault();
        callback(-1)
        }
    return (<> <div className="button_action button_jump box_shadow rounded" onClick={(e) => handleClick(e)} >BEFORE</div> </>)

}


const JumpNext: React.FC = ( {callback}: JumpProps ) => {

    const handleClick = (e) => {

        e.preventDefault();
        callback(1)
        }
    return (<> <div className="button_action button_jump box_shadow rounded" onClick={(e) => handleClick(e)}>NEXT</div> </>)
}

//todo: add context -> toggle on context


const SelectionWrapper: React.FC = () => {
    const [componentIdx, setComponentIdx] = useState(0) 
   
    const updateComponentIdx = (value) => {
        setComponentIdx(componentIdx+value)

    }

    const reducer = (state, action) =>  {
        //if (action.type === ActionType.language){
        if (action.type === 'language'){
            return {languages: action.payload}
        
        //} else if  (action.type === ActionType.skill ) {
        } else if  (action.type === 'skill' ) {
            return  {skill: action.payload}
        }
        throw Error(ActionType.Unknown);
    }

    const [selections, dispatch] = useReducer(reducer, INITAL_SELECTIONS)


    return (
    <>
        <h1>Get a random Project</h1>
        <SelectionProvider>
            { componentIdx > 0 && <JumpBefore callback={updateComponentIdx}/> }
            <div className="page__selection">
                { componentIdx === 0 && <ExpSelection setSelection={dispatch}/> }
                { componentIdx === 1 && <LanguageSelection languages={LANGUAGES} selection={selections.languages} setSelection={dispatch}/> }
            </div>
            { componentIdx === 2 && <ProjectChooser state={selections}/> }
            { componentIdx !== 2 && <JumpNext callback={updateComponentIdx}/> }
        </SelectionProvider>
    </>)
}


export {SelectionWrapper}
