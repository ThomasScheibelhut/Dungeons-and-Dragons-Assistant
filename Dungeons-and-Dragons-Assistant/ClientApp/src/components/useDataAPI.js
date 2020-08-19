import { useEffect, useState, useReducer } from 'react'


const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }

};

export const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        if (initialUrl.includes('//')) {
            return () => {
                didCancel = true;
            };
        }

        let didCancel = false;

        dispatch({ type: 'FETCH_INIT' });

        fetch(url).then(res => res.json())
            .then(response => {
                if (!didCancel) {
                    if (response) {
                        if (Array.isArray(response)) {
                            dispatch({ type: 'FETCH_SUCCESS', payload: { response } })
                        } else {
                            dispatch({ type: 'FETCH_SUCCESS', payload: response })
                        }
                    } else {
                        dispatch({ type: 'FETCH_SUCCESS', payload: { } })
                    }
                }
            })
            .catch(err => {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' })
                }
            })

        return () => {
            didCancel = true;
        };

    }, [url]);

    return [state, setUrl];

};