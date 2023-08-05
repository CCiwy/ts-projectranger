import React, {useState, useContext} from 'react'

import {SelectionContext} from '../SelectionContext';


import './components.css'

const ExpSelection: React.FC = () => {
    const { dispatch } = useContext(SelectionContext); 
    const [skill, setSkill] = useState('')
    
    const onUpdate = (value: string): void => {
        setSkill(value)
        const action = {
            type: 'skill',
            payload: value
        }
        dispatch(action)
    }


    return (
        <div>
        <h2>Select your experience in development</h2>
        <select onChange={(e) => onUpdate(e.target.value)} value={skill}>
            <option value="junior">Beginner</option>
            <option value="adv">Advanced</option>
            <option value="senior">Senior</option>
            <option value="cto">CTO</option>
        </select>
        </div>
    )
}

export default ExpSelection

