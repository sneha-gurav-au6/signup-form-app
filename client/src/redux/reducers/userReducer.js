import { RegisterUser, LoginUser, Get_Error } from "../actions/userType";
import isEmpty from "../../utils/is-empty";
const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    RegisterUser: {},
    errors: {},
    UserProfile: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case RegisterUser: {
            return {
                ...state,
                RegisterUser: payload,
            };
        }
        case LoginUser: {
            console.log(action.payload);
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload),
            };
        }
        // case UserProfile: {
        //     return {
        //         ...state,
        //         UserProfile: action.payload,
        //     };
        // }
        case Get_Error: {
            return {
                ...state,
                errors: action.payload,
            };
        }
        default:
            return { ...state };
    }
};

export default userReducer;
