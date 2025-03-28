BEGIN;


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

INSERT INTO public."Organizations"(
	name)
	VALUES ('Fake School');

INSERT INTO public."Roles"(
	role_name)
	VALUES ('Student'),
	('Teacher'),
	('Administrator');
    
END;