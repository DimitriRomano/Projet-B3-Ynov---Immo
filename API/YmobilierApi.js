const email = "admin@test.com"
const password = "admin"

export const ipHome = 'https://a113-2a01-cb19-8374-7700-cce1-f88e-493b-c36a.eu.ngrok.io'
//const bearer = '2|3IBWlMBu8MDoIr4og5zanVMLQ1h2CeyICVSQQAcb'

export const getProperties = async (bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/properties`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let responJson = await res.json();
        return responJson;
    } catch (err) {
        return console.error(err);
    }
}

export const detailProperty = async (id,bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/properties/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let responJson = await res.json();
        return responJson;
    } catch (err) {
        return console.error(err);
    }
}

export const toggleFavorite = async (id,bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/favorites/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let responJson = await res.json();
        return responJson;
    } catch (err) {
        return console.error(err);
    }
}

export const getFavorites = async (bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/favorites`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let responJson = await res.json();
        return responJson;
    } catch (err) {
        return console.error(err);
    }
}

export const getUser = async (bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let responJson = await res.json();
        return responJson;
    } catch (err) {
        return console.error(err);
    }
}

export const getUserUserReservations = async (bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/user/reservations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let responJson = await res.json();
        return responJson;
    } catch (err) {
        return console.error(err);
    }
}

