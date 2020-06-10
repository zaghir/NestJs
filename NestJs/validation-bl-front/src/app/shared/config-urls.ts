const host: string = `http://localhost`;
const port: string = `3000`;
const urlHost: string = `${host}:${port}`;

export const PathsApi = {

  login: `${urlHost}/auth/signin`,
  signup: `${urlHost}/auth/signup`,
  getDocuments :`${urlHost}/validation-bl/documents`,
  saveDocument :`${urlHost}/validation-bl/documents`,
  getDocNumero :`${urlHost}/validation-bl/documents/docLig/:id`,
  saveLigneDocument :`${urlHost}/validation-bl/documents/lignedocument` ,
  updateDocument :`${urlHost}/validation-bl/documents/:id`,

  domain :`${urlHost}/domain`,
  getDomains :`${urlHost}/domain`,
  getDomainById :`${urlHost}/domain/q`,

  config :`${urlHost}/configuration`,
  getConfigSearch :`${urlHost}/configuration/q`,

  application :`${urlHost}/application`,
  applicationSearch :`${urlHost}/application/q`,


};

