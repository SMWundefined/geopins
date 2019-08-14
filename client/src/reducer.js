import { publicEncrypt } from "crypto";

export default function reducer(state, { type, payload}) {
    switch(type) {
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: payload
            };
        case "IS_LOGGED_IN":
            return {
                ...state,
                isAuth: payload
            }
        case "SIGNOUT_USER":
            return{
                ...state,
                currentUser:null,
                isAuth: false
            }
        case "CREATE_DRAFT":
            return{
                ...state,
                currentPin: null,
                draft: {
                    latitude: 0,
                    longitude: 0
                }
            }
        case "UPDATE_DRAFT_LOCATION":
            return{
                ...state,
                draft: payload
            }
        case "DELETE_DRAFT":
            return{
                ...state,
                draft: null
            }
        case "GET_PINS": 
            const pins = payload
            const authorizedPins = pins.filter(pin => !pin.privacy || state.currentUser._id === pin.author._id)
            return {
                ...state,
                pins: authorizedPins
            }
        case "CREATE_PIN":
            const newPin = payload
            let authPins = state.pins.filter( pin => pin._id !== newPin.id && (!pin.privacy || pin.author._id === state.currentUser._id))
            if(!newPin.privacy || state.currentUser._id === newPin.author._id){
                authPins = [...authPins, newPin]
            }
            return{
                ...state,
                pins: [...authPins]
            }
        case "SET_PIN":
            return{
                ...state,
                currentPin: payload,
                draft: null
            }
        case "DELETE_PIN":
            const deletedPin = payload
            const filteredPins = state.pins.filter(pin => pin._id !== deletedPin._id)
            if(state.currenPin) {
                const isCurrentPin = deletedPin._id === state.currentPin._id
                if(isCurrentPin){
                    return {
                        ...state,
                        pins: filteredPins,
                        currentPin: null
                    }
                }
            }
            return {
                ...state,
                pins: filteredPins,
            }
        case "CREATE_COMMENT":
            const updatedCurrentPin = payload
            const updatedPins = state.pins.map(pin => 
                publicEncrypt._id === updatedCurrentPin._id ? updatedCurrentPin : pin
            )
            return {
                ...state,
                pins: updatedPins,
                currentPin: updatedCurrentPin
            }
        default:
            return state;

    }
}