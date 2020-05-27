export const queries = {
  retrieveDocuments: `select doc_numero as docNumero, doc_piece as docPiece ,doc_stype as docStype, doc_date as docDate, pcf_code as pcfCode ,DOC_F_RS as docFRs, doc_mt_ttc as docMtTtc , statut from DOCUMENTS WHERE DOC_TYPE ='v' and DOC_STYPE ='B' and statut is null 
  AND PCF_CODE IN (select PCF_CODE from tiers where sft_code ='001' and  PCF_VILLE like 'CASA%')`,

  insertDocument: `INSERT INTO DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO) VALUES ($1,$2,$3,$4,$5,$6)`,

  updateDocument: `UPDATE DOCUMENTS SET STATUT = '10' WHERE DOC_NUMERO = $1`,

  insertLigDocument: `INSERT INTO lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ($1 ,$2, $3)`,

  retrieveLigDocument: `SELECT DOC_NUMERO as docNumero ,ART_CODE as artCode, LIG_QTE as ligQte FROM LIGNES WHERE DOC_NUMERO = $1 AND LIG_QTE <> 0 `,
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
INSERT INTO DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO , DOC_TYPE ) VALUES ('doc_1','doc_piece_1','B','PCF_CODE_1',1000,'doc_memo_1' ,'v' );
INSERT INTO DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO , DOC_TYPE ) VALUES ('doc_2','doc_piece_2','B','PCF_CODE_1',2000,'doc_memo_2','v' );
INSERT INTO DOCUMENTS(DOC_NUMERO,DOC_PIECE,DOC_STYPE,PCF_CODE,DOC_MT_TTC,DOC_MEMO , DOC_TYPE ) VALUES ('doc_3','doc_piece_3','B','pcf_code_2',3000,'doc_memo_3','v' );
select * from DOCUMENTS ;
				   
INSERT INTO lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ('doc_1' ,'acrt_code_1', 10);				   
INSERT INTO lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ('doc_2' ,'acrt_code_2', 20);				   
INSERT INTO lignes (DOC_NUMERO ,ART_CODE, LIG_QTE) VALUES ('doc_3' ,'acrt_code_3', 30);				   



select * from  lingnes ;
select * from  tiers ;
select * from  DOCUMENTS ;
 */
