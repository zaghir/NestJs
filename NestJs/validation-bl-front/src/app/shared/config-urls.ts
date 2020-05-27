const host: string = `http://localhost`;
const port: string = `3000`;
const urlHost: string = `${host}:${port}`;

export const PathsApi = {

  login: `${urlHost}/auth/signin`,
  singup: `${urlHost}/auth/singup`,
  getDocuments :`${urlHost}/validation-bl/documents`,
  saveDocument :`${urlHost}/validation-bl/documents`,
  getDocNumero :`${urlHost}/validation-bl/documents/docLig/:id`,
  saveLigneDocument :`${urlHost}/validation-bl/documents/lignedocument` ,
  updateDocument :`${urlHost}/validation-bl/documents/:id`,
};
