const email = "admin@test.com"
const password = "admin"

export const oldIp = '10.31.32.196:8000'
export const ipHome = '192.168.1.13:8000'

export const getProperties = async (bearer) => {
    try {
        const res = await fetch(`http://${oldIp}/api/admin/properties`, {
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
        const res = await fetch(`http://${oldIp}/api/admin/properties/${id}`, {
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