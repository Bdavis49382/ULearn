-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public."Users"
(
    id bigserial,
    "GivenNames" character varying(255) NOT NULL,
    "LastName" character varying(255) NOT NULL,
    "Role" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    PRIMARY KEY (id)
);
 
-- -- Insert initial categories
-- INSERT OR IGNORE INTO category (category_id, category_name) VALUES
-- (1, 'Strategy'),
-- (2, 'Party');
 
-- -- Insert initial games
-- INSERT OR IGNORE INTO games (game_id, game_name, game_description, category_id, image_path) VALUES
-- (1, 'Catan', 'A popular resource-trading and city-building game.', 1, '/images/games/catan.jpg'),
-- (2, 'Risk', 'A world domination game of strategy and conquest.', 1, '/images/games/risk.jpg'),
-- (3, 'Uno', 'A fast-paced card game of matching colors and numbers.', 2, '/images/games/uno.jpg'),
-- (4, 'Apples to Apples', 'A fun word association game perfect for family and friends.', 2, '/images/games/apples-to-apples.jpg');