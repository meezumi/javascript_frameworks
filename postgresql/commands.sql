SELECT
  RICE_PRODUCTION
FROM
  WORLD_FOOD
WHERE
  COUNTRY = 'United States';

SELECT
  COUNTRY
FROM
  WORLD_FOOD
WHERE
  WHEAT_PRODUCTION > 20;


-- for a loose match we  can use LIKE
(starts with 'U')
SELECT
  COUNTRY
FROM
  WORLD_FOOD
WHERE
  COUNTRY LIKE 'U' || '%';
-- || this merges/ concatnates


(ends with 'a')
SELECT
  COUNTRY
FROM
  WORLD_FOOD
WHERE
  COUNTRY LIKE '%' || 'a';

