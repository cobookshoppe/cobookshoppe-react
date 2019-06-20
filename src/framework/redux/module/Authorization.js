import Dispatch from '../Dispatch';

const INITIALIZE = 'authorization/INITIALIZE';
const LOGOUT = 'authorization/LOGOUT';
const UPDATE_TOKEN = 'authorization/UPDATE_TOKEN';

const initialState = {
    auth: null,
    token: null,
    user: {
        username: null
    },
};

const TOKEN_REFRESH_RATE = 30;

/**
 * @author Edward P. Legaspi
 * @since 1.0
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Dispatch.successAction(INITIALIZE):
        case Dispatch.successAction(UPDATE_TOKEN): {
            return {
                ...state,
                ...action.data,
            };
        }
        case Dispatch.successAction(LOGOUT): {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
}

export function logout({
    now
}) {
    return (dispatch, getState) => {
        const {
            authorization
        } = getState();
        const {
            auth: {
                keycloak
            }
        } = authorization || {};
        if (now) {
            Dispatch.success(dispatch, LOGOUT);
            keycloak.logout();
        } else {
            setTimeout(() => {
                Dispatch.success(dispatch, LOGOUT);
                keycloak.logout();
            }, 5000);
        }
    };
}

const updateToken = token => dispatch => Dispatch.success(dispatch, UPDATE_TOKEN, {
    token
});

const scheduleTokenRefresh = (dispatch, auth) => {
    const {
        keycloak
    } = auth || {};
    setInterval(() => {
        keycloak
            .updateToken(TOKEN_REFRESH_RATE)
            .success(refreshed => {
                if (refreshed) {
                    dispatch(updateToken(keycloak.token));
                } // else, token is still valid
            })
            .error(() => {
                // eslint-disable-next-line no-console
                console.error('Failed to retrieve an updated token or session has expired.');
                dispatch(logout({
                    now: true
                }));
            });
    }, TOKEN_REFRESH_RATE * 1000);
};

export function initialize(auth) {
    return (dispatch, getState) => {
        scheduleTokenRefresh(dispatch, auth);
        const {
            keycloak
        } = auth || {};
        const {
            token,
            idTokenParsed: {
                preferred_username
            }
        } = keycloak || {};
        Dispatch.success(dispatch, INITIALIZE, {
            auth,
            token,
            user: {
                username: preferred_username
            }
        });
    };
}