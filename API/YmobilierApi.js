const email = "admin@test.com"
const password = "admin"

const bearer = '1|87qAhDtCxy3bHiTPChrE7Y0MRX8WdhjzXDiypjFP'

export const getProperties = async () => {
    try {
        const res = await fetch(`http://10.31.37.84:8000/api/admin/properties`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return res.json()
    } catch (err) {
        return console.log(err)
    }
}