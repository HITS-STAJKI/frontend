import { Group } from "../Group";

//Создала отдельный файл, потому что не в курсе, будут типы тут как-то меняться или нет, но из готовых типов нужного мне не оказалось
//не поместила его в типы Role, т к, например, тип студента там и тут не совпадают(если будут менять типы, то этот файл можно удалить)

type Student = {
    id: string;
    isAcadem: boolean;
    isGraduated: boolean;
    group: Pick<Group, 'id' | 'number'>
}

type CompanyPartner = {
    id: string;
    name: string;
    fileId: string;
}

type Curator = {
    id: string;
    companyPartner: CompanyPartner;
}
export type UserProfileType = {
    id: string;
    email: string;
    fullName: string;
    dean?: { id: string }; 
    student?: Student; 
    curator?: Curator; 
    teacher?: { id: string }; 
    educationalProgramLead?: { id: string }; 
}