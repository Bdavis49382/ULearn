import dbClient from "../index.js";

export async function getClasses(teacher_id) {
    try {
            const query = `
                SELECT * FROM public."Classes"
                INNER JOIN public."FacultyAssignment" AS f ON "Classes".id = f.class_id
                WHERE f.teacher_id = ${teacher_id}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getClassesForStudent(student_id) {
    try {
            const query = `
                SELECT c.id, c.name, co.name AS course_name, organization_id, description, meeting_time FROM public."Enrollments" AS e
                INNER JOIN public."Classes" AS c ON c.id = e.class_id
                INNER JOIN public."Courses" AS co ON co.id = c.course_id
                WHERE e.student_id = ${student_id}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }

}

export async function getAllClasses(org_id) {
    try {
            const query = `
                SELECT meeting_time, cl.id, cl.name, c.name AS course_name, u.last_name AS teacher_name, c.description FROM public."Classes" AS cl
                INNER JOIN public."Courses" AS c ON cl.course_id = c.id
                INNER JOIN public."FacultyAssignment" AS f ON f.class_id = cl.id
                INNER JOIN public."Users" AS u ON u.id = f.teacher_id
                WHERE c.organization_id = ${org_id}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
    
}


export async function getStudentsInClass(class_id) {
    try {
            const query = `
                SELECT u.id, given_names, last_name, email, organization_id FROM public."Users" AS u
                INNER JOIN public."Enrollments" AS e ON u.id = e.student_id
                WHERE e.class_id = ${class_id}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function createCourse(name, description, org_id) {
    try {
        const query = `
        INSERT INTO public."Courses"(
            name, description, organization_id)
            VALUES ('${name}', '${description}', ${org_id});
        `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }
}

export async function getCourses(organization_id) {
    try {
            const query = `
                SELECT * FROM public."Courses"
                WHERE organization_id = ${organization_id}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getClass(class_id) {
    try {
            const query = `
                SELECT c.id, c.name, co.name AS course_name, co.id AS course_id FROM public."Classes" AS c
                INNER JOIN public."Courses" as co ON co.id = c.course_id
                WHERE c.id = ${class_id}
            `;
            return (await dbClient.query(query)).rows;
    } catch (error) {
        console.log(error);
    }
}


export async function createClass(course_id, name, meeting_time, teacher_id) {
    try {
        const query = `
        INSERT INTO public."Classes"(
            name, meeting_time, course_id)
            VALUES ('${name}', '${meeting_time}', ${course_id});
        
        INSERT INTO public."FacultyAssignment"(
            teacher_id, class_id)
            VALUES (${teacher_id}, lastval());
        `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }
}

export async function addTeacher(class_id, teacher_id) {
    try {
        const query = `
        INSERT INTO public."FacultyAssignment"(
            teacher_id, class_id)
            VALUES (${teacher_id}, ${class_id});
        `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }
}

export async function enrollStudent(class_id, student_id) {
    try {
        const query = `
        INSERT INTO public."Enrollments"(
            student_id, class_id)
            VALUES (${student_id}, ${class_id});
        `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }
}

export async function unenrollStudent(class_id, student_id) {
    try {
        const query = `
        DELETE FROM public."Enrollments"
        WHERE student_id = '${student_id}' AND class_id = '${class_id}';
        `;
        await dbClient.query(query);
    } catch (error) {
        console.log(error);
    }

}