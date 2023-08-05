export interface LangSelections {
    prefered: string[],
    dismissed: string[],
}

export interface Selections  {
    skill: string, // todo: should be enum
    languages: LangSelections 
}

export interface SelectAction {
    type: string,
    payload: LangSelections | string, 
} 


export enum ActionType {
    LANG =  'language',
    SKILL =  'skill',
}
