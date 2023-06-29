import React, {useState, useEffect} from 'react'
import './components.css'

export default function ExpSelection(props) {
    const [skill, setSkill] = useState('')
    
    const callback = props.setSelection

    const updateParentSelections = () => {
        const data = {
            type: 'skill',
            payload: skill
        }
        callback(data)
    }

    useEffect(
        () => {
            if (skill.length){
                updateParentSelections()
            }
            },
        [skill]
    )

    return (
        <div>
        <h2>Select your experience in development</h2>
        <select onChange={(e) => setSkill(e.target.value)} value={skill} default="junior">
            <option value="junior">Beginner</option>
            <option value="adv">Advanced</option>
            <option value="senior">Senior</option>
            <option value="cto">CTO</option>
        </select>
        </div>
    )
}

