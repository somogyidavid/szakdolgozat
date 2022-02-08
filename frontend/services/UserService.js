import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailed,
    editUserRequest,
    editUserSuccess,
    editUserFailed
} from '../store/actions/UserActions';

let user = {
    email: 'test@test.com',
    name: '',
    age: 0,
    description: '',
    interests: ['park', 'restaurant', 'museum', 'spa', 'zoo']
};

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchUserRequest());
            dispatch(fetchUserSuccess(user));
        } catch (err) {
            dispatch(fetchUserFailed(err));
        }
    };
};

export const editUser = (editedUser) => {
    return async (dispatch) => {
        try {
            dispatch(editUserRequest());
            user = {
                email: 'test@test.com',
                name: editedUser.name,
                age: editedUser.age,
                description: editedUser.description,
                interests: user.interests
            };
            dispatch(editUserSuccess(user));
        } catch (err) {
            dispatch(editUserFailed(err));
        }
    };
};