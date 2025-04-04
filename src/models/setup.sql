-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;

DROP TABLE IF EXISTS public."Codes";
DROP TABLE IF EXISTS public."ActivityProgress";
DROP TABLE IF EXISTS public."FacultyAssignment";
DROP TABLE IF EXISTS public."Enrollments";
DROP TABLE IF EXISTS public."Users";
DROP TABLE IF EXISTS public."Classes";
DROP TABLE IF EXISTS public."Activities";
DROP TABLE IF EXISTS public."Courses";
DROP TABLE IF EXISTS public."Organizations";
DROP TABLE IF EXISTS public."Roles";


CREATE TABLE IF NOT EXISTS public."Users"
(
    id bigserial,
    given_names character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    role_id bigserial NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    organization_id bigserial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Codes"
(
    access_code bigserial NOT NULL,
    role_id bigserial NOT NULL,
    used boolean NOT NULL DEFAULT false,
    organization_id bigserial NOT NULL,
    PRIMARY KEY (access_code)
);

CREATE TABLE IF NOT EXISTS public."Organizations"
(
    id bigserial NOT NULL,
    name character varying(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Roles"
(
    id bigserial,
    role_name character varying(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Classes"
(
    id bigserial,
    name character varying(255) NOT NULL,
    meeting_time time without time zone NOT NULL,
    course_id bigserial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."FacultyAssignment"
(
    id bigserial,
    teacher_id bigserial NOT NULL,
    class_id bigserial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Enrollments"
(
    id bigserial,
    student_id bigserial NOT NULL,
    class_id bigserial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Courses"
(
    id bigserial,
    description text,
    name character varying(255),
    organization_id bigserial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Activities"
(
    id bigserial,
    course_id bigserial NOT NULL,
    name character varying(255) NOT NULL,
    details jsonb,
    order_number integer DEFAULT 0,
    description character varying(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."ActivityProgress"
(
    id bigserial,
    activity_id bigserial NOT NULL,
    enrollment_id bigserial NOT NULL,
    details jsonb,
    completed boolean NOT NULL DEFAULT false,
    graded boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Users"
    ADD CONSTRAINT users_organizations_fk FOREIGN KEY (organization_id)
    REFERENCES public."Organizations" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Users"
    ADD CONSTRAINT users_roles_fk FOREIGN KEY (role_id)
    REFERENCES public."Roles" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Codes"
    ADD CONSTRAINT code_org_fk FOREIGN KEY (organization_id)
    REFERENCES public."Organizations" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."Codes"
    ADD CONSTRAINT code_roles_fk FOREIGN KEY (role_id)
    REFERENCES public."Roles" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Classes"
    ADD CONSTRAINT class_course_fk FOREIGN KEY (course_id)
    REFERENCES public."Courses" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."FacultyAssignment"
    ADD CONSTRAINT users_faculty_assignment_fk FOREIGN KEY (teacher_id)
    REFERENCES public."Users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."FacultyAssignment"
    ADD CONSTRAINT faculty_assignment_class_fk FOREIGN KEY (class_id)
    REFERENCES public."Classes" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."Enrollments"
    ADD CONSTRAINT users_enrollments_fk FOREIGN KEY (student_id)
    REFERENCES public."Users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Enrollments"
    ADD CONSTRAINT enrollments_classes_fk FOREIGN KEY (class_id)
    REFERENCES public."Classes" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Courses"
    ADD CONSTRAINT course_org_fk FOREIGN KEY (organization_id)
    REFERENCES public."Organizations" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."Activities"
    ADD CONSTRAINT activity_course_fk FOREIGN KEY (course_id)
    REFERENCES public."Courses" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."ActivityProgress"
    ADD CONSTRAINT "activityProgress_activity_fk" FOREIGN KEY (activity_id)
    REFERENCES public."Activities" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public."ActivityProgress"
    ADD CONSTRAINT "enrollment_activityProgress_fk" FOREIGN KEY (enrollment_id)
    REFERENCES public."Enrollments" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID;

END;

INSERT INTO public."Organizations"(
	name)
	VALUES ('Fake School');

INSERT INTO public."Roles"(
	role_name)
	VALUES ('Student'),
	('Teacher'),
	('Administrator');

END;