export interface LangSelections {
    prefered: string[],
    dismissed: string[],
}

export interface Selections  {
    skill: string, // todo: should be enum
    languages: LangSelections 
}
