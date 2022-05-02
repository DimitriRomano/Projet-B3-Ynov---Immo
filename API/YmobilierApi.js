const email = "admin@test.com"
const password = "admin"

const bearer = '1|KbwW9tBWYR2rTeaiQeGFIoncDdo7L9F4vfKRkw2q'
const oldIp = '10.31.32.196:8000'
const ipHome = '192.168.137.1:8080'

export const getProperties = async () => {
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

export const detailProperty = async (id) => {
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