const email = "admin@test.com"
const password = "admin"

export const oldIp = '10.31.32.196:8000'
export const ipHome = 'https://8c96-2a01-cb19-8374-7700-d1e3-7640-6c1e-be8b.eu.ngrok.io'
//const bearer = '2|3IBWlMBu8MDoIr4og5zanVMLQ1h2CeyICVSQQAcb'

export const getProperties = async (bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/admin/properties`, {
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
        const res = await fetch(`${ipHome}/api/admin/properties/${id}`, {
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
        console.log(responJson);
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