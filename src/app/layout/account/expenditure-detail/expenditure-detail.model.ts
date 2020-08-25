export class ExpenditureDetailModel {
    companyID: number;
    companyName: string;
    paymentCategory: string;
    expenseType: string;
    paid: Date;
    beneficiaryCategoryID: number;
    beneficiaryCategoryName: string;
    expenditureTypeID: number;
    expenditureTypeName: string;
    beneficiaryNameID: number;
    beneficiaryNameName: string;
    amount: number;
    currency: string;
    paidBy: string;
    paymentRefNumber: string;
    companyBankAccDetailID: number;
    companyBankAccDetailName: string;
    invoiceNumber: number;
    invoiceDate: Date;
    note: string;

    company: any;
    beneficiaryCategory: any;
    expenditureType: any;
    beneficiaryName: any;
    companyBankAccountDetail: any;
}
