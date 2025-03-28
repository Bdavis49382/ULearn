import dbClient from "../index.js";

export async function getAllOrganizations() {
    try {
        const query = `
        SELECT * FROM "Organizations"
        `;
        return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getUsers(organizationId) {
    try {
        const query = `
        SELECT * FROM "Users"
        WHERE organization_id = '${organizationId}';
        `
        return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}