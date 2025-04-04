import dbClient from "../index.js";

export async function createActivity(name, course_id, details, order_number, description) {
    try {
        const query = `
        INSERT INTO public."Activities"(
            name, course_id, details, order_number, description)
            VALUES ('${name}', ${course_id}, '${JSON.stringify(details)}', ${order_number}, '${description}');
        `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }
}

export async function getLiveActivitiesForStudent(student_id) {
    try {
            const query = `
                SELECT co.name AS course_name, a.id, a.name, ap.completed FROM public."Activities" as a
                INNER JOIN "Courses" as co ON co.id = a.course_id
                INNER JOIN "Classes" as cl ON cl.course_id = co.id
                INNER JOIN "Enrollments" AS e ON e.class_id = cl.id
                INNER JOIN "Users" As u ON u.id = e.student_id
                LEFT JOIN "ActivityProgress" AS ap ON ap.activity_id = a.id
                WHERE u.id = ${student_id};
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }

}

export async function getActivity(id) {
    try {
            const query = `
                SELECT * FROM public."Activities"
                WHERE id = ${id};
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function updateActivity(id, activity) {
    try {
            const query = `
                UPDATE public."Activities"
                    SET name='${activity.name}', details='${activity.details}', description='${activity.description}'
                    WHERE id = ${id};
            `;
            await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }
}

export async function getEnrollment(student_id, activity_id) {
    try {
        const query = `
            SELECT e.id
            FROM public."Enrollments" AS e
            INNER JOIN "Classes" AS cl ON cl.id = e.class_id
            INNER JOIN "Courses" AS co on co.id = cl.course_id
            WHERE e.student_id = ${student_id} AND cl.course_id IN (
                SELECT a.course_id 
                FROM public."Activities" as a
                WHERE a.id = ${activity_id}
                )
            LIMIT 1;

        `;
        return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function startActivity(enrollment_id, activity_id) {
    try {
        const query = `
                INSERT INTO public."ActivityProgress"(
            activity_id, enrollment_id, details)
            VALUES (${activity_id}, ${enrollment_id}, '{"answers":{}}');
            `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }

}

export async function getActivityProgress(enrollment_id, activity_id) {
    try {
        const query = `
            SELECT * FROM public."ActivityProgress"
            WHERE enrollment_id = ${enrollment_id} AND activity_id = ${activity_id};
            `;

        return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function updateActivityProgress(enrollment_id, activity_id, details) {
    try {
        const query = `
            UPDATE public."ActivityProgress"
            SET details='${JSON.stringify(details)}'
            WHERE enrollment_id = ${enrollment_id} AND activity_id = ${activity_id};
            `;

        return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }

}

export async function completeActivity(enrollment_id, activity_id) {
    try {
        const query = `
            UPDATE public."ActivityProgress"
            SET completed=true
            WHERE enrollment_id = ${enrollment_id} AND activity_id = ${activity_id};
            `;

        return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }

}

export async function getActivities(class_id) {
    try {
            const query = `
                SELECT * FROM public."Activities"
                WHERE course_id IN (
                    SELECT course_id FROM public."Classes" AS c
                    WHERE c.id = ${class_id}
                );
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}