/*---------------------------------------------------------------------
--                                                                   --
--                                                                   --
--                              CREAR                                --
--                          BASE DE DATOS                            --
--                                                                   --
----------------------------------------------------------------------*/
/*CREATE DAtABASE nodeudas;
USE nodeudas;

/*---------------------------------------------------------------------
--                                                                   --
--                                                                   --
--                             CREAR                                 --
--                             TABLAS                                --
--                                                                   --
----------------------------------------------------------------------*/
/*----------------------------------------------------------------*/
/*CREATE TABLE tbl_repository(
	fld_id				INT NOT NULL AUTO_INCREMENT,
	fld_id_creditor	INT NOT NULL,
	fld_id_debtor		INT NOT NULL,
	fld_amout			DECIMAL(11,2),
	fld_date				DATE,
	fld_tipe				BOOL,
	PRIMARY KEY (fld_id)
	
);
/*----------------------------------------------------------------*/
/*CREATE TABLE tbl_creditor(
	fld_id				INT NOT NULL AUTO_INCREMENT,
	fld_name				VARCHAR(40),
	fld_lastName		VARCHAR(40),
	fld_tel				INT(13),
	fld_email			VARCHAR(50),
	fld_passWord		VARCHAR(16),
	PRIMARY KEY (fld_id)
);
/*----------------------------------------------------------------*/
/*CREATE TABLE tbl_debtor(
	fld_id				INT NOT NULL AUTO_INCREMENT,
	fld_name				VARCHAR(40),
	fld_lastName		VARCHAR(40),
	fld_tel				INT(13),
	fld_email			VARCHAR(50),
	fld_bornDate		DATE,
	fld_passWord		VARCHAR(16),
	fld_id_creditor	INT NOT NULL,
	PRIMARY KEY (fld_id)
);
/*----------------------------------------------------------------*/
/*---------------------------------------------------------------------
--                                                                   --
--                                                                   --
--                              CREAR                                --
--                            RELACIONES                             --
--                                                                   --
----------------------------------------------------------------------*/
/*----------------------------------------------------------------*/
/*----------------------------------------------------------------*/
ALTER TABLE tbl_debtor
ADD CONSTRAINT
   rel_debtor_creditor
FOREIGN KEY 
   (fld_id_creditor) 
REFERENCES 
   tbl_creditor (fld_id);
/*----------------------------------------------------------------*/
ALTER TABLE tbl_repository
ADD CONSTRAINT
   rel_repository_debtor
FOREIGN KEY 
   (fld_id_debtor) 
REFERENCES 
   tbl_debtor (fld_id);
/*----------------------------------------------------------------*/
ALTER TABLE tbl_repository
ADD CONSTRAINT
   rel_repository_creditor
FOREIGN KEY 
   (fld_id_creditor) 
REFERENCES 
   tbl_creditor (fld_id);/*