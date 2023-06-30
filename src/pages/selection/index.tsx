import { React, useReducer } from 'react';
import { ProjectChooser } from './components/';
import { ExpSelection } from './components/';
import { LanguageSelection } from './components/';
import { Selections } from './interfaces';


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


const SelectionWrapper: React.FC = () => {
    
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


    return (<>
        <h1>Get a random Project</h1>
        <ExpSelection setSelection={dispatch}/>
        <LanguageSelection languages={LANGUAGES} selection={selections.languages} setSelection={dispatch}/>
        <ProjectChooser state={selections}/>
    </>)
}


export {SelectionWrapper}
