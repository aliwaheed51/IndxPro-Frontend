// import { DocumentModel } from './../document/document.model';

// export class DocumentNameModel {
//     id: number;
//     name?: string;
//     documentType: DocumentModel;
//     documentTypeId?: number;
//     createdByUser: string;
//     deletedByUser: string;
//     modifiedByUser: string;
//     createdDate: Date;
//     deletedDate: Date;
//     modifiedDate: Date;
//     companyName: string;
// }
export class AppScreenModel {
    id?: number;
    screenName?: string;
    parentAppScreenId?: number;
    parentScreenName: string;
    urlName?: string;
    seqNo?: number;
    iconPath?: string;
    screenCode: string;
    isMenu: boolean;
    isPermission: boolean;
    isView: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isDelete: boolean;
    isExport: boolean;
    createdByUser: string;
    deletedByUser: string;
    modifiedByUser: string;
    createdDate: Date;
    deletedDate: Date;
    modifiedDate: Date;
    companyName: string;
}

