export const ipHome = 'https://fb8f-85-169-101-162.eu.ngrok.io'

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

export const postSendReservation = async (bearer,id) => {
    try {
        const res = await fetch(`${ipHome}/api/reservations/${id}`, {
            method: 'POST',
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

export const logOut = async (bearer) => {
    try {
        const res = await fetch(`${ipHome}/api/logout`, {
            method: 'POST',
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

