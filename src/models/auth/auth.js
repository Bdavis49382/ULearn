import dbClient from "../index.js";
import bcrypt from 'bcryptjs';

export async function register(code, firstName, lastName, email, password) {
    try {
        const getCodeQuery = `
            SELECT * FROM public."Codes"
            WHERE access_code = ${code} AND used = false
        `;
        const response = await dbClient.query(getCodeQuery);
        if (response.rows.length == 0)  {
            // code did not exist
            console.log('code entered did not exist: ',code);
            throw 'code entered was not valid';
        }
        else {
            // code did exist, use it to create account
            const codeInfo = response.rows[0]
            password = await bcrypt.hash(password, 10);
            const addUserQuery = `
            INSERT INTO public."Users"(
                given_names, last_name, role_id, email, password, organization_id)
                VALUES ('${firstName}', '${lastName}', ${codeInfo.role_id} , '${email}', '${password}', ${codeInfo.organization_id});
            `;
            await dbClient.query(addUserQuery);

            const updateCodeQuery = `
            UPDATE public."Codes"
                SET used=true
                WHERE access_code = ${code};
            `;
            await dbClient.query(updateCodeQuery);
            return codeInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function login(email, password) {
    try {
        const query = `
            SELECT * FROM public."Users"
            WHERE email = '${email}'
        `
        const response = await dbClient.query(query);
        if (response.rows.length == 0) {
            return null;
        }
        else {
            if (bcrypt.compare(password,response.rows[0].password)) {
                return response.rows[0];
            }
            else {
                return null;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export async function getStudentProfile(student_id) {
    try {
        const query = `
            SELECT id, given_names, last_name, email FROM public."Users"
            WHERE id = ${student_id};
        `
        const response = await dbClient.query(query);
        if (response.rows.length == 0) {
            return null;
        }
        else {
            return response.rows[0];
        }
    }
    catch (error) {
        console.log(error);
    }

}