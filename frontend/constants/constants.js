export const expirationTime = {
    time: '1h',
    value: 3600
};

export const getHeader = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }
    };
};