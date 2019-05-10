
SELECT m.mat_descricao, g.grp_descricao, s.sgp_descricao, mat_estoque 
FROM materiais as m 
join grupos as g on m.mat_grupo = g.grp_id 
join subgrupos as s on m.mat_subgrupo = s.sgp_id 
where m.mat_unidade = 'UN' and g.grp_id = 12 and s.sgp_id = 25

