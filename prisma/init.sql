CREATE FUNCTION search_artists(search text) 
returns setof artists AS $$ 
SELECT   * 
FROM     artists 
WHERE    search <% ( name, ig, tg) 
ORDER BY similarity(search, ( NAME )) DESC; 

$$ language sql stable;