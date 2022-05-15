CREATE OR REPLACE FUNCTION public.avatar_url(article_row artists)
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
    SELECT CONCAT('http://65.108.254.138:9002/params/http://65.108.254.138:8484/image/',avatar)
    FROM artists A
    WHERE A.id = article_row.id
$function$
