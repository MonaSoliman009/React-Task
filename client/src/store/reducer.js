const initial_state={
    score:0
}

export default function scoreReducer(state=initial_state,action){

    switch(action.type){
        case "SET_SCORE":
            return {...state,score:action.payload}
            default:
                return state
    }
}