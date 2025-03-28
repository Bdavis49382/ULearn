import dbClient from "../index.js";


async function generateCode() {
    try {
        while (true) {
            const code = Math.floor(Math.random()*90000) + 10000;
            const query = `
                SELECT * FROM public."Codes"
                WHERE access_code = ${code}
            `;
            if ((await dbClient.query(query)).rows.length == 0) {
                return code;
            }
        }
    } catch (error) {
        console.log(error);
    }

}
export async function addCode(roleId, organizationId) {
    const code = await generateCode();
    try {
        const query = `
        INSERT INTO public."Codes"(
            access_code, role_id, organization_id)
            VALUES (${code}, ${roleId}, ${organizationId});
        `;
        dbClient.query(query);
        return code;
    } catch (error) {
        console.log(error);
    }
}

export async function getCodes(organizationId) {
    try {
            const code = Math.floor(Math.random()*90000) + 10000;
            const query = `
                SELECT * FROM public."Codes"
                WHERE organization_id = ${organizationId}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getRoles() {
    try {
            const query = `
                SELECT * FROM public."Roles"
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}