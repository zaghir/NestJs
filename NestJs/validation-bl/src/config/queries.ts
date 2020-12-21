const schema = "[bl-validation].[dbo].";
export const queries = {
  retrieveDocuments: `select doc_numero , doc_piece  ,doc_stype , doc_date , pcf_code ,doc_f_rs , doc_mt_ttc , statut from dbo.DOCUMENTS WHERE DOC_TYPE ='v' and DOC_STYPE ='B' and statut is null 
  AND PCF_CODE IN (select PCF_CODE from dbo.tiers where sft_code ='001' and  PCF_VILLE like 'CASA%')`,

//   insertDocument: `INSERT INTO dbo.DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO) VALUES ($1,$2,$3,$4,$5,$6)`, -- postgress
  insertDocument: `INSERT INTO dbo.DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO) VALUES (@0 ,@1,@2,@3,@4,@5)`,

  updateDocument: `UPDATE dbo.DOCUMENTS SET STATUT = '10' WHERE DOC_NUMERO = @0`,

  insertLigDocument: `INSERT INTO dbo.lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES (@0 ,@1, @2)`,

  retrieveLigDocument: `SELECT doc_numero , art_code , lig_qte FROM LIGNES WHERE DOC_NUMERO = @0 AND LIG_QTE <> 0 `,

//   userSingup: `insert into dbo.USER_APP(username , password , salt , role) VALUES ($1 ,$2, $3, $4)`,
  userSingup: `insert into dbo.USER_APP(username , surname , lastname , email , password , salt , role ) OUTPUT Inserted.id VALUES (@0 , @1 ,@2, @3, @4, @5, @6)`,

  userFindOne : `select id , username , password , salt , role  from dbo.USER_APP where username = @0`,

  userFindDomain : `select ud.userId , ud.domainId , d.name  from  user_domain ud inner join domain d on ud.domainId =d.id  and ud.userId = @0` ,

  userAddDomain : `insert into user_domain(userId , domainId) values (@0 , @1)`,

  configurationFindOne : `select  	c.id as conf_id, c.name as conf_name, c.value as conf_value , c.description as conf_description ,
  									c.domain_id as domain_id , d.name as domain_name,
									c.application_id as app_id, app.name as app_name 
									from CONFIG_APP c 
									left join DOMAIN d on c.domain_id = d.id  
									left join APPLICATION app on c.application_id = app.id 
									where c.id = @0`,

  configurationFindAll : `select  	c.id as conf_id, c.name as conf_name, c.value as conf_value , c.description as conf_description ,
  									c.domain_id as domain_id , d.name as domain_name,
									c.application_id as app_id, app.name as app_name 
									from CONFIG_APP c 
									left join DOMAIN d on c.domain_id = d.id  
									left join APPLICATION app on c.application_id = app.id 
									order by c.id`,
									
  configurationFindByIdApp : `select  	c.id as conf_id, c.name as conf_name, c.value as conf_value , c.description as conf_description ,
									c.domain_id as domain_id , d.name as domain_name,
								    c.application_id as app_id, app.name as app_name 
								    from CONFIG_APP c 
								    left join DOMAIN d on c.domain_id = d.id  
								    left join APPLICATION app on c.application_id = app.id 
									where app.id =@0`,

  configurationFindByAppidUserId : `select conf.id as conf_id , conf.name as conf_name, conf.domain_id  as domain_id , d.name as domain_name , conf.application_id  as app_id  from CONFIG_APP conf 
									inner join DOMAIN d on conf.domain_id = d.id and conf.application_id = @0 
									inner join user_domain ud on ud.domainId = conf.domain_id and ud.userId = @1 ` ,	
				  
	
  configurationFindConnectionDb : `select value from CONFIG_APP where type ='db_connection' ` ,


  configurationInsert : `insert into CONFIG_APP(id , name , value , description , domain_id , application_id) values (@0 , @1 , @2 , @3, @4 , @5)`,

  configurationUpdate : `update CONFIG_APP set name = @1 , value = @2 , description = @3 , domain_id = @4 , application_id = @5  where id = @0 `,

  

  domainFindOne : `select id , name , description  from dbo.domain where id = @0`,

  domainFindAll : `select id , name , description from dbo.domain `,

  domainUpdate : `update domain set name = @1  , description = @2 where id = @0 `,

  domainInsert : `insert into domain(id , name , description) values( @0 , @1 , @2)  `,

  applicationFindOne : `select id , name , description from APPLICATION where id = @0`,

  applicationFindAll : `select id , name , description From APPLICATION order by id`,

  applicationInsert : `insert into APPLICATION(id , name , description) values (@0 , @1 , @2 )`,

  applicationUpdate : ` update APPLICATION set name = @1 , description = @2 where id = @0 `,

  
};

// export const queries = {
// 	retrieveDocuments: `select doc_numero , doc_piece ,doc_stype, doc_date , pcf_code ,DOC_F_RS, doc_mt_ttc, statut from DOCUMENTS WHERE DOC_TYPE ='v' and DOC_STYPE ='B' and statut is null
// 	AND PCF_CODE IN (select PCF_CODE from tiers where sft_code ='001' and  PCF_VILLE like 'CASA%')`,

// 	insertDocument: `INSERT INTO DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO) VALUES (:docNumero,:docPiece,:docStype,:pcfCode,:docMtTtc,:docMemo)`,

// 	updateDocument: `UPDATE DOCUMENTS SET STATUT = '10' WHERE DOC_NUMERO = :docNumero`,

// 	insertLigDocument: `INSERT INTO lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES (:docNumero ,:artCode, :ligQte)`,

// 	retrieveLigDocument: `SELECT DOC_NUMERO ,ART_CODE, LIG_QTE FROM LIGNES WHERE DOC_NUMERO = :docNumero AND ligQte <> 0 `,
//   };
/**
 *drop table DOCUMENTS ;
create table DOCUMENTS(
DOC_NUMERO varchar(250) ,
	DOC_PIECE varchar(250),
	DOC_STYPE varchar(250),
	PCF_CODE varchar(250),
	DOC_MT_TTC int ,
	DOC_MEMO varchar(250),
	DOC_DATE varchar(250) ,
	DOC_F_RS varchar(250),
	STATUT varchar(250),
	DOC_TYPE varchar(250)
) ;


drop table tiers;
create table tiers(sft_code varchar(250) , PCF_VILLE varchar(250) , PCF_CODE varchar(250));

insert into tiers(sft_code , PCF_VILLE , PCF_CODE) VALUES ('001' , 'CASABLANCA' , 'PCF_CODE_1');


create table lignes (DOC_NUMERO varchar(250) ,ART_CODE varchar(250) , LIG_QTE int) ;

delete from DOCUMENTS ;
INSERT INTO dbo.DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO , DOC_TYPE ) VALUES ('doc_1','doc_piece_1','B','PCF_CODE_1',1000,'doc_memo_1' ,'v' );
INSERT INTO dbo.DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO , DOC_TYPE ) VALUES ('doc_2','doc_piece_2','B','PCF_CODE_1',2000,'doc_memo_2','v' );
INSERT INTO dbo.DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO , DOC_TYPE ) VALUES ('doc_3','doc_piece_3','B','pcf_code_2',3000,'doc_memo_3','v' );
select * from DOCUMENTS ;
				   
INSERT INTO dbo.lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ('doc_1' ,'acrt_code_1', 10);				   
INSERT INTO dbo.lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ('doc_2' ,'acrt_code_2', 20);				   
INSERT INTO dbo.lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ('doc_3' ,'acrt_code_3', 30);				   

drop table USER_APP ;
create table USER_APP(
	id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY ,	
	username varchar(250) NOT NULL UNIQUE,
	surname varchar(100) NOT NULL ,
	lastname varchar(100) NOT NULL ,
	email varchar(250) ,
	password varchar(2000) NOT NULL  , 
	salt varchar(2000) NOT NULL , 
	role int ,
	domainId int
);
insert into dbo.USER_APP( username , password  , salt , role) values ('test' , 'eeeee' , 'eeee', 1);

create table user_domain(
	userId  int  NOT NULL ,	
	domainId int NOT NULL 	
);
insert into user_domain(userId , domainId) values (1 , 1);
insert into user_domain(userId , domainId) values (1 , 2);
insert into user_domain(userId , domainId) values (1 , 3);


drop table CONFIG_APP ;
create table CONFIG_APP(
	id varchar(250) NOT NULL PRIMARY KEY ,		
	name varchar(250) NOT NULL UNIQUE ,
	type varchar(250) NOT NULL UNIQUE , 
	value varchar(4000) NOT NULL ,
	description varchar(1000) NOT NULL ,
	domain_id int NOT NULL ,
	application_id int NOT NULL ,
);

select id , value , description , domain_id  from dbo.CONFIG_APP order by id;

insert into CONFIG_APP( id , name , type , domain_id , application_id , value , description) 
	values ( 'db_validation_bl_pinguin',
			'config db pour app validation bl pour pinguin',
			'db_connection',
			1,
			1,
			'{"datasource" : "{port:14123}"  }' ,
			'configuration de la base pour l application validation bl pour le domain pinguin'); 

insert into CONFIG_APP( id , name , domain_id , application_id , value , description) 
	values ( 'db_validation_bl_pattys',
			'config db pour app validation bl pour pattys',
			2,
			1,
			'{"datasource" : "{port:14123}"  }' ,
			'configuration de la base pour l application validation bl pour le domain pattys');

drop table APPLICATION ;
create table APPLICATION(
	id int NOT NULL PRIMARY KEY ,		
	name varchar(250) NOT NULL UNIQUE ,
	description varchar(1000) NOT NULL ,
);

insert into APPLICATION( id , name , description) values(1 , 'Validation des BL' , 'Application pour la validation des bons de livraison');

drop table DOMAIN ;
create table DOMAIN(
	id  int  NOT NULL PRIMARY KEY IDENTITY(1,1) ,	
	name varchar(250) NOT NULL ,
	description varchar(1000) NOT NULL
);

insert domain(id , name , description) values ( 1 , 'pinguin' , 'domain Pinguin casablanca');
insert domain(id , name , description) values ( 2 , 'pattys' , 'Domain Pattys chefchaouni casablanca');
insert domain(id , name , description) values ( 3 , 'mobigen' , 'Domain Mobigen Hassan II casablanca');

Il est possible de forcer une valeur dans la colonne pourvue de la propriété IDENTITY. Pour ce faire il faut utiliser le flag :
SET IDENTITY_INSERT #MaTable { ON | OFF }

create table DOMAIN(
	id  int  NOT NULL  PRIMARY KEY  ,	
	name varchar(250) NOT NULL ,
	description varchar(1000) NOT NULL
);

insert domain(id , name , description) values ( 1 , 'pinguin' , 'domain Pinguin casablanca');
insert domain(id , name , description) values ( 2 , 'pattys' , 'Domain Pattys chefchaouni casablanca');
insert domain(id , name , description) values ( 3 , 'mobigen' , 'Domain Mobigen Hassan II casablanca');




select * from  lingnes ;
select * from  tiers ;
select * from  DOCUMENTS ;

JSON.stringify({ foo: "sample", bar: "sample" }, null, 2);

 */
