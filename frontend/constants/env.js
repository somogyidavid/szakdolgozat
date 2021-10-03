const variables = {
    development: {
        googleApiKey: 'AIzaSyD4AYFhjNBK_oZNcyRXGr0lOz42zlVzUmQ'
    },
    production: {
        googleApiKey: 'AIzaSyD4AYFhjNBK_oZNcyRXGr0lOz42zlVzUmQ'
    }
};

const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development;
    }

    return variables.production;
};

export default getEnvVariables;