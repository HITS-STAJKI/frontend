//@ts-nocheck
//-----Types.File-----
/** dto для возвращения ошибочных результатов */
export interface ErrorResponse {
  message?: string;
  timestamp?: Date;
  status?: number;
  validationErrors?: ValidationErrorResponse[];
  [key: string]: any;
}
export function deserializeErrorResponse(json: string): ErrorResponse {
  const data = JSON.parse(json) as ErrorResponse;
  initErrorResponse(data);
  return data;
}
export function initErrorResponse(_data: ErrorResponse) {
  if (_data) {
    _data.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>null;
    if (Array.isArray(_data["validationErrors"])) {
      _data.validationErrors = _data["validationErrors"].map(item =>
        initValidationErrorResponse(item)
      );
    }
  }
  return _data;
}
export function serializeErrorResponse(_data: ErrorResponse | undefined) {
  if (_data) {
    _data = prepareSerializeErrorResponse(_data as ErrorResponse);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeErrorResponse(_data: ErrorResponse): ErrorResponse {
  const data: Record<string, any> = { ..._data };
  data["timestamp"] = _data.timestamp && _data.timestamp.toISOString();
  if (Array.isArray(_data.validationErrors)) {
    data["validationErrors"] = _data.validationErrors.map(item =>
      prepareSerializeValidationErrorResponse(item)
    );
  }
  return data as ErrorResponse;
}
export interface ValidationErrorResponse {
  field?: string;
  message?: string;
  [key: string]: any;
}
export function deserializeValidationErrorResponse(json: string): ValidationErrorResponse {
  const data = JSON.parse(json) as ValidationErrorResponse;
  initValidationErrorResponse(data);
  return data;
}
export function initValidationErrorResponse(_data: ValidationErrorResponse) {
  return _data;
}
export function serializeValidationErrorResponse(_data: ValidationErrorResponse | undefined) {
  if (_data) {
    _data = prepareSerializeValidationErrorResponse(_data as ValidationErrorResponse);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeValidationErrorResponse(_data: ValidationErrorResponse): ValidationErrorResponse {
  const data: Record<string, any> = { ..._data };
  return data as ValidationErrorResponse;
}
/** Модель редактирования пользователя */
export interface UserEditDto {
  /** Полное имя пользователя */
  fullName: string;
  [key: string]: any;
}
export function deserializeUserEditDto(json: string): UserEditDto {
  const data = JSON.parse(json) as UserEditDto;
  initUserEditDto(data);
  return data;
}
export function initUserEditDto(_data: UserEditDto) {
  return _data;
}
export function serializeUserEditDto(_data: UserEditDto | undefined) {
  if (_data) {
    _data = prepareSerializeUserEditDto(_data as UserEditDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUserEditDto(_data: UserEditDto): UserEditDto {
  const data: Record<string, any> = { ..._data };
  return data as UserEditDto;
}
/** Модель пользователя */
export interface UserShortDto {
  /** Идентификатор пользователя */
  id: string;
  /** Адрес электронной почты */
  email: string;
  /** Дата и время последнего захода в систему */
  lastLoginDate: Date;
  /** Полное имя пользователя */
  fullName: string;
  [key: string]: any;
}
export function deserializeUserShortDto(json: string): UserShortDto {
  const data = JSON.parse(json) as UserShortDto;
  initUserShortDto(data);
  return data;
}
export function initUserShortDto(_data: UserShortDto) {
  if (_data) {
    _data.lastLoginDate = _data["lastLoginDate"] ? new Date(_data["lastLoginDate"].toString()) : <any>null;
  }
  return _data;
}
export function serializeUserShortDto(_data: UserShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeUserShortDto(_data as UserShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUserShortDto(_data: UserShortDto): UserShortDto {
  const data: Record<string, any> = { ..._data };
  data["lastLoginDate"] = _data.lastLoginDate && _data.lastLoginDate.toISOString();
  return data as UserShortDto;
}
/** Модель редактирования электронной почты пользователя */
export interface UserEmailEditDto {
  /** Адрес электронной почты */
  email: string;
  [key: string]: any;
}
export function deserializeUserEmailEditDto(json: string): UserEmailEditDto {
  const data = JSON.parse(json) as UserEmailEditDto;
  initUserEmailEditDto(data);
  return data;
}
export function initUserEmailEditDto(_data: UserEmailEditDto) {
  return _data;
}
export function serializeUserEmailEditDto(_data: UserEmailEditDto | undefined) {
  if (_data) {
    _data = prepareSerializeUserEmailEditDto(_data as UserEmailEditDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUserEmailEditDto(_data: UserEmailEditDto): UserEmailEditDto {
  const data: Record<string, any> = { ..._data };
  return data as UserEmailEditDto;
}
/** Модель для изменения пароля */
export interface PasswordEditDto {
  /** Старый пароль пользователя */
  oldPassword: string;
  /** Новый пароль пользователя */
  newPassword: string;
  /** Повтор нового пароля пользователя */
  repeatNewPassword: string;
  [key: string]: any;
}
export function deserializePasswordEditDto(json: string): PasswordEditDto {
  const data = JSON.parse(json) as PasswordEditDto;
  initPasswordEditDto(data);
  return data;
}
export function initPasswordEditDto(_data: PasswordEditDto) {
  return _data;
}
export function serializePasswordEditDto(_data: PasswordEditDto | undefined) {
  if (_data) {
    _data = prepareSerializePasswordEditDto(_data as PasswordEditDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePasswordEditDto(_data: PasswordEditDto): PasswordEditDto {
  const data: Record<string, any> = { ..._data };
  return data as PasswordEditDto;
}
/** dto для ответов */
export interface Response {
  /** Содержание ответа */
  message?: string;
  timestamp?: Date;
  /** Статус ответа */
  status?: number;
  [key: string]: any;
}
export function deserializeResponse(json: string): Response {
  const data = JSON.parse(json) as Response;
  initResponse(data);
  return data;
}
export function initResponse(_data: Response) {
  if (_data) {
    _data.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>null;
  }
  return _data;
}
export function serializeResponse(_data: Response | undefined) {
  if (_data) {
    _data = prepareSerializeResponse(_data as Response);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeResponse(_data: Response): Response {
  const data: Record<string, any> = { ..._data };
  data["timestamp"] = _data.timestamp && _data.timestamp.toISOString();
  return data as Response;
}
/** Модель группы */
export interface GroupShortDto {
  /** Идентификатор группы */
  id?: string;
  /** Номер группы */
  number?: string;
  [key: string]: any;
}
export function deserializeGroupShortDto(json: string): GroupShortDto {
  const data = JSON.parse(json) as GroupShortDto;
  initGroupShortDto(data);
  return data;
}
export function initGroupShortDto(_data: GroupShortDto) {
  return _data;
}
export function serializeGroupShortDto(_data: GroupShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeGroupShortDto(_data as GroupShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeGroupShortDto(_data: GroupShortDto): GroupShortDto {
  const data: Record<string, any> = { ..._data };
  return data as GroupShortDto;
}
/** Модель студента */
export interface StudentDto {
  /** Идентификатор роли */
  id: string;
  isAcadem: boolean;
  isGraduated: boolean;
  user: UserShortDto;
  group: GroupShortDto;
  chatId: string;
  /** Число непрочитанных сообщений для текущего пользователя в чате с этим студентом */
  unreadMessagesCount?: number;
  [key: string]: any;
}
export function deserializeStudentDto(json: string): StudentDto {
  const data = JSON.parse(json) as StudentDto;
  initStudentDto(data);
  return data;
}
export function initStudentDto(_data: StudentDto) {
  if (_data) {
    _data.user = _data["user"] && initUserShortDto(_data["user"]);
    _data.group = _data["group"] && initGroupShortDto(_data["group"]);
  }
  return _data;
}
export function serializeStudentDto(_data: StudentDto | undefined) {
  if (_data) {
    _data = prepareSerializeStudentDto(_data as StudentDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeStudentDto(_data: StudentDto): StudentDto {
  const data: Record<string, any> = { ..._data };
  data["user"] = _data.user && prepareSerializeUserShortDto(_data.user);
  data["group"] = _data.group && prepareSerializeGroupShortDto(_data.group);
  return data as StudentDto;
}
/** Модель для возвращения студента из академа */
export interface ReturnFromAcademDto {
  /** Идентификатор группы */
  groupId: string;
  [key: string]: any;
}
export function deserializeReturnFromAcademDto(json: string): ReturnFromAcademDto {
  const data = JSON.parse(json) as ReturnFromAcademDto;
  initReturnFromAcademDto(data);
  return data;
}
export function initReturnFromAcademDto(_data: ReturnFromAcademDto) {
  return _data;
}
export function serializeReturnFromAcademDto(_data: ReturnFromAcademDto | undefined) {
  if (_data) {
    _data = prepareSerializeReturnFromAcademDto(_data as ReturnFromAcademDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeReturnFromAcademDto(_data: ReturnFromAcademDto): ReturnFromAcademDto {
  const data: Record<string, any> = { ..._data };
  return data as ReturnFromAcademDto;
}
/** Модель для изменения студента */
export interface StudentEditDto {
  /** Идентификатор группы */
  groupId: string;
  [key: string]: any;
}
export function deserializeStudentEditDto(json: string): StudentEditDto {
  const data = JSON.parse(json) as StudentEditDto;
  initStudentEditDto(data);
  return data;
}
export function initStudentEditDto(_data: StudentEditDto) {
  return _data;
}
export function serializeStudentEditDto(_data: StudentEditDto | undefined) {
  if (_data) {
    _data = prepareSerializeStudentEditDto(_data as StudentEditDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeStudentEditDto(_data: StudentEditDto): StudentEditDto {
  const data: Record<string, any> = { ..._data };
  return data as StudentEditDto;
}
/** dto для обновления стека */
export interface UpdateStackDto {
  /** Название стека */
  name: string;
  [key: string]: any;
}
export function deserializeUpdateStackDto(json: string): UpdateStackDto {
  const data = JSON.parse(json) as UpdateStackDto;
  initUpdateStackDto(data);
  return data;
}
export function initUpdateStackDto(_data: UpdateStackDto) {
  return _data;
}
export function serializeUpdateStackDto(_data: UpdateStackDto | undefined) {
  if (_data) {
    _data = prepareSerializeUpdateStackDto(_data as UpdateStackDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUpdateStackDto(_data: UpdateStackDto): UpdateStackDto {
  const data: Record<string, any> = { ..._data };
  return data as UpdateStackDto;
}
/** dto стека */
export interface StackDto {
  /** Идентификатор стека */
  id: string;
  /** Название стека */
  name: string;
  [key: string]: any;
}
export function deserializeStackDto(json: string): StackDto {
  const data = JSON.parse(json) as StackDto;
  initStackDto(data);
  return data;
}
export function initStackDto(_data: StackDto) {
  return _data;
}
export function serializeStackDto(_data: StackDto | undefined) {
  if (_data) {
    _data = prepareSerializeStackDto(_data as StackDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeStackDto(_data: StackDto): StackDto {
  const data: Record<string, any> = { ..._data };
  return data as StackDto;
}
/** dto для обновления практики */
export interface UpdatePracticeDto {
  /** Статус оплачиваемости */
  isPaid: boolean;
  [key: string]: any;
}
export function deserializeUpdatePracticeDto(json: string): UpdatePracticeDto {
  const data = JSON.parse(json) as UpdatePracticeDto;
  initUpdatePracticeDto(data);
  return data;
}
export function initUpdatePracticeDto(_data: UpdatePracticeDto) {
  return _data;
}
export function serializeUpdatePracticeDto(_data: UpdatePracticeDto | undefined) {
  if (_data) {
    _data = prepareSerializeUpdatePracticeDto(_data as UpdatePracticeDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUpdatePracticeDto(_data: UpdatePracticeDto): UpdatePracticeDto {
  const data: Record<string, any> = { ..._data };
  return data as UpdatePracticeDto;
}
/** dto для компаний партнеров */
export interface CompanyPartnerDto {
  /** Идентификатор языка */
  id: string;
  /** Имя компании */
  name: string;
  /** Информация о компании */
  description: string;
  /** Кураторы, закрепленные за компанией */
  curators?: UserShortDto[];
  /** Идентификатор файла-логотипа */
  fileId?: string;
  [key: string]: any;
}
export function deserializeCompanyPartnerDto(json: string): CompanyPartnerDto {
  const data = JSON.parse(json) as CompanyPartnerDto;
  initCompanyPartnerDto(data);
  return data;
}
export function initCompanyPartnerDto(_data: CompanyPartnerDto) {
  if (_data) {
    if (Array.isArray(_data["curators"])) {
      _data.curators = _data["curators"].map(item =>
        initUserShortDto(item)
      );
    }
  }
  return _data;
}
export function serializeCompanyPartnerDto(_data: CompanyPartnerDto | undefined) {
  if (_data) {
    _data = prepareSerializeCompanyPartnerDto(_data as CompanyPartnerDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCompanyPartnerDto(_data: CompanyPartnerDto): CompanyPartnerDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.curators)) {
    data["curators"] = _data.curators.map(item =>
      prepareSerializeUserShortDto(item)
    );
  }
  return data as CompanyPartnerDto;
}
/** dto для практик */
export interface PracticeDto {
  /** Идентификатор практики */
  id?: string;
  /** Владелец практики */
  user?: UserDto;
  /** Группа владельца практики */
  group?: GroupShortDto;
  /** Место прохождения практики */
  company?: CompanyPartnerDto;
  /** Стек практики */
  stack?: StackDto;
  /** Время создания практики */
  createdAt?: Date;
  /** Статус оплачиваемости */
  isPaid?: boolean;
  /** Является ли заархивированной */
  isArchived?: boolean;
  /** Подтверждена куратором */
  isApproved?: boolean;
  [key: string]: any;
}
export function deserializePracticeDto(json: string): PracticeDto {
  const data = JSON.parse(json) as PracticeDto;
  initPracticeDto(data);
  return data;
}
export function initPracticeDto(_data: PracticeDto) {
  if (_data) {
    _data.user = _data["user"] && initUserDto(_data["user"]);
    _data.group = _data["group"] && initGroupShortDto(_data["group"]);
    _data.company = _data["company"] && initCompanyPartnerDto(_data["company"]);
    _data.stack = _data["stack"] && initStackDto(_data["stack"]);
    _data.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>null;
  }
  return _data;
}
export function serializePracticeDto(_data: PracticeDto | undefined) {
  if (_data) {
    _data = prepareSerializePracticeDto(_data as PracticeDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePracticeDto(_data: PracticeDto): PracticeDto {
  const data: Record<string, any> = { ..._data };
  data["user"] = _data.user && prepareSerializeUserDto(_data.user);
  data["group"] = _data.group && prepareSerializeGroupShortDto(_data.group);
  data["company"] = _data.company && prepareSerializeCompanyPartnerDto(_data.company);
  data["stack"] = _data.stack && prepareSerializeStackDto(_data.stack);
  data["createdAt"] = _data.createdAt && _data.createdAt.toISOString();
  return data as PracticeDto;
}
/** Модель роли */
export interface RoleDto {
  /** Идентификатор роли */
  id: string;
  /** Роль */
  userRole?: RoleDtoUserRole;
  [key: string]: any;
}
export function deserializeRoleDto(json: string): RoleDto {
  const data = JSON.parse(json) as RoleDto;
  initRoleDto(data);
  return data;
}
export function initRoleDto(_data: RoleDto) {
  if (_data) {
    _data.userRole = _data["userRole"];
  }
  return _data;
}
export function serializeRoleDto(_data: RoleDto | undefined) {
  if (_data) {
    _data = prepareSerializeRoleDto(_data as RoleDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeRoleDto(_data: RoleDto): RoleDto {
  const data: Record<string, any> = { ..._data };
  return data as RoleDto;
}
/** Модель пользователя */
export interface UserDto {
  /** Идентификатор пользователя */
  id?: string;
  /** Адрес электронной почты */
  email?: string;
  /** ФИО пользователя */
  fullName?: string;
  roles?: RoleDto[];
  [key: string]: any;
}
export function deserializeUserDto(json: string): UserDto {
  const data = JSON.parse(json) as UserDto;
  initUserDto(data);
  return data;
}
export function initUserDto(_data: UserDto) {
  if (_data) {
    if (Array.isArray(_data["roles"])) {
      _data.roles = _data["roles"].map(item =>
        initRoleDto(item)
      );
    }
  }
  return _data;
}
export function serializeUserDto(_data: UserDto | undefined) {
  if (_data) {
    _data = prepareSerializeUserDto(_data as UserDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUserDto(_data: UserDto): UserDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.roles)) {
    data["roles"] = _data.roles.map(item =>
      prepareSerializeRoleDto(item)
    );
  }
  return data as UserDto;
}
/** dto для обновления компаний партнеров */
export interface UpdateCompanyPartnerDto {
  /** Имя компании */
  name: string;
  /** Информация о компании */
  description: string;
  /** Идентификатор файла-логотипа */
  fileId?: string;
  [key: string]: any;
}
export function deserializeUpdateCompanyPartnerDto(json: string): UpdateCompanyPartnerDto {
  const data = JSON.parse(json) as UpdateCompanyPartnerDto;
  initUpdateCompanyPartnerDto(data);
  return data;
}
export function initUpdateCompanyPartnerDto(_data: UpdateCompanyPartnerDto) {
  return _data;
}
export function serializeUpdateCompanyPartnerDto(_data: UpdateCompanyPartnerDto | undefined) {
  if (_data) {
    _data = prepareSerializeUpdateCompanyPartnerDto(_data as UpdateCompanyPartnerDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUpdateCompanyPartnerDto(_data: UpdateCompanyPartnerDto): UpdateCompanyPartnerDto {
  const data: Record<string, any> = { ..._data };
  return data as UpdateCompanyPartnerDto;
}
/** dto для обновления языков */
export interface UpdateLanguageDto {
  /** Название языка */
  name: string;
  [key: string]: any;
}
export function deserializeUpdateLanguageDto(json: string): UpdateLanguageDto {
  const data = JSON.parse(json) as UpdateLanguageDto;
  initUpdateLanguageDto(data);
  return data;
}
export function initUpdateLanguageDto(_data: UpdateLanguageDto) {
  return _data;
}
export function serializeUpdateLanguageDto(_data: UpdateLanguageDto | undefined) {
  if (_data) {
    _data = prepareSerializeUpdateLanguageDto(_data as UpdateLanguageDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUpdateLanguageDto(_data: UpdateLanguageDto): UpdateLanguageDto {
  const data: Record<string, any> = { ..._data };
  return data as UpdateLanguageDto;
}
/** dto языка */
export interface LanguageDto {
  /** Идентификатор языка */
  id: string;
  /** Название языка */
  name: string;
  [key: string]: any;
}
export function deserializeLanguageDto(json: string): LanguageDto {
  const data = JSON.parse(json) as LanguageDto;
  initLanguageDto(data);
  return data;
}
export function initLanguageDto(_data: LanguageDto) {
  return _data;
}
export function serializeLanguageDto(_data: LanguageDto | undefined) {
  if (_data) {
    _data = prepareSerializeLanguageDto(_data as LanguageDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeLanguageDto(_data: LanguageDto): LanguageDto {
  const data: Record<string, any> = { ..._data };
  return data as LanguageDto;
}
/** dto для обновления отбора */
export interface UpdateInterviewDto {
  /** Статус отбора */
  status: UpdateInterviewDtoStatus;
  [key: string]: any;
}
export function deserializeUpdateInterviewDto(json: string): UpdateInterviewDto {
  const data = JSON.parse(json) as UpdateInterviewDto;
  initUpdateInterviewDto(data);
  return data;
}
export function initUpdateInterviewDto(_data: UpdateInterviewDto) {
  if (_data) {
    _data.status = _data["status"];
  }
  return _data;
}
export function serializeUpdateInterviewDto(_data: UpdateInterviewDto | undefined) {
  if (_data) {
    _data = prepareSerializeUpdateInterviewDto(_data as UpdateInterviewDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUpdateInterviewDto(_data: UpdateInterviewDto): UpdateInterviewDto {
  const data: Record<string, any> = { ..._data };
  return data as UpdateInterviewDto;
}
/** dto отбора */
export interface InterviewDto {
  /** Идентификатор отбора */
  id: string;
  /** Время создания отбора */
  createdAt: Date;
  /** Время обновления отбора */
  modifiedAt?: Date;
  /** Статус отбора */
  status: InterviewDtoStatus;
  stack: StackDto;
  languages: LanguageDto[];
  companyPartner: ShortCompanyPartnerDto;
  student: UserDto;
  [key: string]: any;
}
export function deserializeInterviewDto(json: string): InterviewDto {
  const data = JSON.parse(json) as InterviewDto;
  initInterviewDto(data);
  return data;
}
export function initInterviewDto(_data: InterviewDto) {
  if (_data) {
    _data.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>null;
    _data.modifiedAt = _data["modifiedAt"] ? new Date(_data["modifiedAt"].toString()) : <any>null;
    _data.status = _data["status"];
    _data.stack = _data["stack"] && initStackDto(_data["stack"]);
    if (Array.isArray(_data["languages"])) {
      _data.languages = _data["languages"].map(item =>
        initLanguageDto(item)
      );
    }
    _data.companyPartner = _data["companyPartner"] && initShortCompanyPartnerDto(_data["companyPartner"]);
    _data.student = _data["student"] && initUserDto(_data["student"]);
  }
  return _data;
}
export function serializeInterviewDto(_data: InterviewDto | undefined) {
  if (_data) {
    _data = prepareSerializeInterviewDto(_data as InterviewDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeInterviewDto(_data: InterviewDto): InterviewDto {
  const data: Record<string, any> = { ..._data };
  data["createdAt"] = _data.createdAt && _data.createdAt.toISOString();
  data["modifiedAt"] = _data.modifiedAt && _data.modifiedAt.toISOString();
  data["stack"] = _data.stack && prepareSerializeStackDto(_data.stack);
  if (Array.isArray(_data.languages)) {
    data["languages"] = _data.languages.map(item =>
      prepareSerializeLanguageDto(item)
    );
  }
  data["companyPartner"] = _data.companyPartner && prepareSerializeShortCompanyPartnerDto(_data.companyPartner);
  data["student"] = _data.student && prepareSerializeUserDto(_data.student);
  return data as InterviewDto;
}
/** Сокращенное dto для компаний партнеров */
export interface ShortCompanyPartnerDto {
  /** Идентификатор языка */
  id: string;
  /** Имя компании */
  name: string;
  /** Идентификатор файла-логотипа */
  fileId?: string;
  [key: string]: any;
}
export function deserializeShortCompanyPartnerDto(json: string): ShortCompanyPartnerDto {
  const data = JSON.parse(json) as ShortCompanyPartnerDto;
  initShortCompanyPartnerDto(data);
  return data;
}
export function initShortCompanyPartnerDto(_data: ShortCompanyPartnerDto) {
  return _data;
}
export function serializeShortCompanyPartnerDto(_data: ShortCompanyPartnerDto | undefined) {
  if (_data) {
    _data = prepareSerializeShortCompanyPartnerDto(_data as ShortCompanyPartnerDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeShortCompanyPartnerDto(_data: ShortCompanyPartnerDto): ShortCompanyPartnerDto {
  const data: Record<string, any> = { ..._data };
  return data as ShortCompanyPartnerDto;
}
/** Модель для изменения куратора */
export interface CuratorEditDto {
  /** Идентификатор компании */
  companyId: string;
  [key: string]: any;
}
export function deserializeCuratorEditDto(json: string): CuratorEditDto {
  const data = JSON.parse(json) as CuratorEditDto;
  initCuratorEditDto(data);
  return data;
}
export function initCuratorEditDto(_data: CuratorEditDto) {
  return _data;
}
export function serializeCuratorEditDto(_data: CuratorEditDto | undefined) {
  if (_data) {
    _data = prepareSerializeCuratorEditDto(_data as CuratorEditDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCuratorEditDto(_data: CuratorEditDto): CuratorEditDto {
  const data: Record<string, any> = { ..._data };
  return data as CuratorEditDto;
}
/** Модель куратора */
export interface CuratorDto {
  /** Идентификатор роли */
  id: string;
  user: UserShortDto;
  companyPartner: ShortCompanyPartnerDto;
  [key: string]: any;
}
export function deserializeCuratorDto(json: string): CuratorDto {
  const data = JSON.parse(json) as CuratorDto;
  initCuratorDto(data);
  return data;
}
export function initCuratorDto(_data: CuratorDto) {
  if (_data) {
    _data.user = _data["user"] && initUserShortDto(_data["user"]);
    _data.companyPartner = _data["companyPartner"] && initShortCompanyPartnerDto(_data["companyPartner"]);
  }
  return _data;
}
export function serializeCuratorDto(_data: CuratorDto | undefined) {
  if (_data) {
    _data = prepareSerializeCuratorDto(_data as CuratorDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCuratorDto(_data: CuratorDto): CuratorDto {
  const data: Record<string, any> = { ..._data };
  data["user"] = _data.user && prepareSerializeUserShortDto(_data.user);
  data["companyPartner"] = _data.companyPartner && prepareSerializeShortCompanyPartnerDto(_data.companyPartner);
  return data as CuratorDto;
}
export interface EditMessageRequest {
  content: string;
  [key: string]: any;
}
export function deserializeEditMessageRequest(json: string): EditMessageRequest {
  const data = JSON.parse(json) as EditMessageRequest;
  initEditMessageRequest(data);
  return data;
}
export function initEditMessageRequest(_data: EditMessageRequest) {
  return _data;
}
export function serializeEditMessageRequest(_data: EditMessageRequest | undefined) {
  if (_data) {
    _data = prepareSerializeEditMessageRequest(_data as EditMessageRequest);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeEditMessageRequest(_data: EditMessageRequest): EditMessageRequest {
  const data: Record<string, any> = { ..._data };
  return data as EditMessageRequest;
}
export interface MessageDto {
  /** Идентификатор сообщения */
  id?: string;
  /** Контент сообщения */
  content?: string;
  /** Идентификатор отправителя */
  senderId?: string;
  /** Прочитано текущим пользователем ? */
  isRead?: boolean;
  /** Изменено ли ? */
  isEdited?: boolean;
  /** Дата отправки */
  sentAt?: Date;
  /** Дата изменения */
  modifiedAt?: Date;
  [key: string]: any;
}
export function deserializeMessageDto(json: string): MessageDto {
  const data = JSON.parse(json) as MessageDto;
  initMessageDto(data);
  return data;
}
export function initMessageDto(_data: MessageDto) {
  if (_data) {
    _data.sentAt = _data["sentAt"] ? new Date(_data["sentAt"].toString()) : <any>null;
    _data.modifiedAt = _data["modifiedAt"] ? new Date(_data["modifiedAt"].toString()) : <any>null;
  }
  return _data;
}
export function serializeMessageDto(_data: MessageDto | undefined) {
  if (_data) {
    _data = prepareSerializeMessageDto(_data as MessageDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeMessageDto(_data: MessageDto): MessageDto {
  const data: Record<string, any> = { ..._data };
  data["sentAt"] = _data.sentAt && _data.sentAt.toISOString();
  data["modifiedAt"] = _data.modifiedAt && _data.modifiedAt.toISOString();
  return data as MessageDto;
}
/** Модель регистрации */
export interface RegistrationRequestDto {
  /** Адрес электронной почты */
  email: string;
  /** Пароль пользователя */
  password: string;
  /** ФИО пользователя */
  fullName: string;
  [key: string]: any;
}
export function deserializeRegistrationRequestDto(json: string): RegistrationRequestDto {
  const data = JSON.parse(json) as RegistrationRequestDto;
  initRegistrationRequestDto(data);
  return data;
}
export function initRegistrationRequestDto(_data: RegistrationRequestDto) {
  return _data;
}
export function serializeRegistrationRequestDto(_data: RegistrationRequestDto | undefined) {
  if (_data) {
    _data = prepareSerializeRegistrationRequestDto(_data as RegistrationRequestDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeRegistrationRequestDto(_data: RegistrationRequestDto): RegistrationRequestDto {
  const data: Record<string, any> = { ..._data };
  return data as RegistrationRequestDto;
}
export interface TokenDto {
  token?: string;
  expirationDate?: Date;
  [key: string]: any;
}
export function deserializeTokenDto(json: string): TokenDto {
  const data = JSON.parse(json) as TokenDto;
  initTokenDto(data);
  return data;
}
export function initTokenDto(_data: TokenDto) {
  if (_data) {
    _data.expirationDate = _data["expirationDate"] ? new Date(_data["expirationDate"].toString()) : <any>null;
  }
  return _data;
}
export function serializeTokenDto(_data: TokenDto | undefined) {
  if (_data) {
    _data = prepareSerializeTokenDto(_data as TokenDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeTokenDto(_data: TokenDto): TokenDto {
  const data: Record<string, any> = { ..._data };
  data["expirationDate"] = _data.expirationDate && _data.expirationDate.toISOString();
  return data as TokenDto;
}
/** Модель login'а */
export interface LoginCredentialsDto {
  /** Адрес электронной почты */
  email: string;
  /** Пароль пользователя */
  password: string;
  [key: string]: any;
}
export function deserializeLoginCredentialsDto(json: string): LoginCredentialsDto {
  const data = JSON.parse(json) as LoginCredentialsDto;
  initLoginCredentialsDto(data);
  return data;
}
export function initLoginCredentialsDto(_data: LoginCredentialsDto) {
  return _data;
}
export function serializeLoginCredentialsDto(_data: LoginCredentialsDto | undefined) {
  if (_data) {
    _data = prepareSerializeLoginCredentialsDto(_data as LoginCredentialsDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeLoginCredentialsDto(_data: LoginCredentialsDto): LoginCredentialsDto {
  const data: Record<string, any> = { ..._data };
  return data as LoginCredentialsDto;
}
/** Модель для создания преподавателя */
export interface TeacherCreateDto {
  /** Идентификатор пользователя */
  userId: string;
  [key: string]: any;
}
export function deserializeTeacherCreateDto(json: string): TeacherCreateDto {
  const data = JSON.parse(json) as TeacherCreateDto;
  initTeacherCreateDto(data);
  return data;
}
export function initTeacherCreateDto(_data: TeacherCreateDto) {
  return _data;
}
export function serializeTeacherCreateDto(_data: TeacherCreateDto | undefined) {
  if (_data) {
    _data = prepareSerializeTeacherCreateDto(_data as TeacherCreateDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeTeacherCreateDto(_data: TeacherCreateDto): TeacherCreateDto {
  const data: Record<string, any> = { ..._data };
  return data as TeacherCreateDto;
}
/** Модель преподавателя */
export interface TeacherDto {
  /** Идентификатор роли */
  id: string;
  user: UserShortDto;
  [key: string]: any;
}
export function deserializeTeacherDto(json: string): TeacherDto {
  const data = JSON.parse(json) as TeacherDto;
  initTeacherDto(data);
  return data;
}
export function initTeacherDto(_data: TeacherDto) {
  if (_data) {
    _data.user = _data["user"] && initUserShortDto(_data["user"]);
  }
  return _data;
}
export function serializeTeacherDto(_data: TeacherDto | undefined) {
  if (_data) {
    _data = prepareSerializeTeacherDto(_data as TeacherDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeTeacherDto(_data: TeacherDto): TeacherDto {
  const data: Record<string, any> = { ..._data };
  data["user"] = _data.user && prepareSerializeUserShortDto(_data.user);
  return data as TeacherDto;
}
/** Модель для создания студента */
export interface StudentCreateDto {
  /** Идентификатор группы */
  groupId: string;
  [key: string]: any;
}
export function deserializeStudentCreateDto(json: string): StudentCreateDto {
  const data = JSON.parse(json) as StudentCreateDto;
  initStudentCreateDto(data);
  return data;
}
export function initStudentCreateDto(_data: StudentCreateDto) {
  return _data;
}
export function serializeStudentCreateDto(_data: StudentCreateDto | undefined) {
  if (_data) {
    _data = prepareSerializeStudentCreateDto(_data as StudentCreateDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeStudentCreateDto(_data: StudentCreateDto): StudentCreateDto {
  const data: Record<string, any> = { ..._data };
  return data as StudentCreateDto;
}
/** dto для создания стека */
export interface CreateStackDto {
  /** Название стека */
  name: string;
  [key: string]: any;
}
export function deserializeCreateStackDto(json: string): CreateStackDto {
  const data = JSON.parse(json) as CreateStackDto;
  initCreateStackDto(data);
  return data;
}
export function initCreateStackDto(_data: CreateStackDto) {
  return _data;
}
export function serializeCreateStackDto(_data: CreateStackDto | undefined) {
  if (_data) {
    _data = prepareSerializeCreateStackDto(_data as CreateStackDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCreateStackDto(_data: CreateStackDto): CreateStackDto {
  const data: Record<string, any> = { ..._data };
  return data as CreateStackDto;
}
export interface ReportId {
  reportId?: string;
  [key: string]: any;
}
export function deserializeReportId(json: string): ReportId {
  const data = JSON.parse(json) as ReportId;
  initReportId(data);
  return data;
}
export function initReportId(_data: ReportId) {
  return _data;
}
export function serializeReportId(_data: ReportId | undefined) {
  if (_data) {
    _data = prepareSerializeReportId(_data as ReportId);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeReportId(_data: ReportId): ReportId {
  const data: Record<string, any> = { ..._data };
  return data as ReportId;
}
export interface ReportDto {
  /** Идентификатор отчета */
  id: string;
  /** Время отправки комментария */
  createdAt?: Date;
  /** Время обновления комментария */
  updatedAt?: Date;
  /** Идентификатор файла с отчетом */
  fileId?: string;
  /** Оценка отчета */
  grade?: number;
  [key: string]: any;
}
export function deserializeReportDto(json: string): ReportDto {
  const data = JSON.parse(json) as ReportDto;
  initReportDto(data);
  return data;
}
export function initReportDto(_data: ReportDto) {
  if (_data) {
    _data.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>null;
    _data.updatedAt = _data["updatedAt"] ? new Date(_data["updatedAt"].toString()) : <any>null;
  }
  return _data;
}
export function serializeReportDto(_data: ReportDto | undefined) {
  if (_data) {
    _data = prepareSerializeReportDto(_data as ReportDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeReportDto(_data: ReportDto): ReportDto {
  const data: Record<string, any> = { ..._data };
  data["createdAt"] = _data.createdAt && _data.createdAt.toISOString();
  data["updatedAt"] = _data.updatedAt && _data.updatedAt.toISOString();
  return data as ReportDto;
}
/** dto для создания практики */
export interface CreatePracticeDto {
  /** ID интервью, по которому создаётся практика */
  interviewId: string;
  /** Статус оплачиваемости */
  isPaid: boolean;
  [key: string]: any;
}
export function deserializeCreatePracticeDto(json: string): CreatePracticeDto {
  const data = JSON.parse(json) as CreatePracticeDto;
  initCreatePracticeDto(data);
  return data;
}
export function initCreatePracticeDto(_data: CreatePracticeDto) {
  return _data;
}
export function serializeCreatePracticeDto(_data: CreatePracticeDto | undefined) {
  if (_data) {
    _data = prepareSerializeCreatePracticeDto(_data as CreatePracticeDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCreatePracticeDto(_data: CreatePracticeDto): CreatePracticeDto {
  const data: Record<string, any> = { ..._data };
  return data as CreatePracticeDto;
}
/** dto для создания компаний партнеров */
export interface CreateCompanyPartnerDto {
  /** Имя компании */
  name: string;
  /** Информация о компании */
  description: string;
  /** Идентификатор файла-логотипа */
  fileId?: string;
  [key: string]: any;
}
export function deserializeCreateCompanyPartnerDto(json: string): CreateCompanyPartnerDto {
  const data = JSON.parse(json) as CreateCompanyPartnerDto;
  initCreateCompanyPartnerDto(data);
  return data;
}
export function initCreateCompanyPartnerDto(_data: CreateCompanyPartnerDto) {
  return _data;
}
export function serializeCreateCompanyPartnerDto(_data: CreateCompanyPartnerDto | undefined) {
  if (_data) {
    _data = prepareSerializeCreateCompanyPartnerDto(_data as CreateCompanyPartnerDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCreateCompanyPartnerDto(_data: CreateCompanyPartnerDto): CreateCompanyPartnerDto {
  const data: Record<string, any> = { ..._data };
  return data as CreateCompanyPartnerDto;
}
/** dto для создания языков */
export interface CreateLanguageDto {
  /** Название языка */
  name: string;
  [key: string]: any;
}
export function deserializeCreateLanguageDto(json: string): CreateLanguageDto {
  const data = JSON.parse(json) as CreateLanguageDto;
  initCreateLanguageDto(data);
  return data;
}
export function initCreateLanguageDto(_data: CreateLanguageDto) {
  return _data;
}
export function serializeCreateLanguageDto(_data: CreateLanguageDto | undefined) {
  if (_data) {
    _data = prepareSerializeCreateLanguageDto(_data as CreateLanguageDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCreateLanguageDto(_data: CreateLanguageDto): CreateLanguageDto {
  const data: Record<string, any> = { ..._data };
  return data as CreateLanguageDto;
}
/** dto для создания отбора */
export interface CreateInterviewDto {
  /** Идентификатор стека */
  stackId: string;
  /** Идентификаторы языков */
  languageIds: string[];
  /** Идентификатор компании-партнера */
  companyPartnerId: string;
  /** Статус отбора */
  status: CreateInterviewDtoStatus;
  [key: string]: any;
}
export function deserializeCreateInterviewDto(json: string): CreateInterviewDto {
  const data = JSON.parse(json) as CreateInterviewDto;
  initCreateInterviewDto(data);
  return data;
}
export function initCreateInterviewDto(_data: CreateInterviewDto) {
  if (_data) {
    _data.languageIds = _data["languageIds"];
    _data.status = _data["status"];
  }
  return _data;
}
export function serializeCreateInterviewDto(_data: CreateInterviewDto | undefined) {
  if (_data) {
    _data = prepareSerializeCreateInterviewDto(_data as CreateInterviewDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCreateInterviewDto(_data: CreateInterviewDto): CreateInterviewDto {
  const data: Record<string, any> = { ..._data };
  return data as CreateInterviewDto;
}
/** Создание группы (только номер) */
export interface CreateGroupDto {
  /** Номер группы */
  number: string;
  [key: string]: any;
}
export function deserializeCreateGroupDto(json: string): CreateGroupDto {
  const data = JSON.parse(json) as CreateGroupDto;
  initCreateGroupDto(data);
  return data;
}
export function initCreateGroupDto(_data: CreateGroupDto) {
  return _data;
}
export function serializeCreateGroupDto(_data: CreateGroupDto | undefined) {
  if (_data) {
    _data = prepareSerializeCreateGroupDto(_data as CreateGroupDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCreateGroupDto(_data: CreateGroupDto): CreateGroupDto {
  const data: Record<string, any> = { ..._data };
  return data as CreateGroupDto;
}
/** dto группы */
export interface GroupDto {
  /** Идентификатор группы */
  id?: string;
  /** Номер группы */
  number?: string;
  students?: UserDto[];
  /** Число студентов, обучающихся в группе */
  studentsCount?: number;
  [key: string]: any;
}
export function deserializeGroupDto(json: string): GroupDto {
  const data = JSON.parse(json) as GroupDto;
  initGroupDto(data);
  return data;
}
export function initGroupDto(_data: GroupDto) {
  if (_data) {
    if (Array.isArray(_data["students"])) {
      _data.students = _data["students"].map(item =>
        initUserDto(item)
      );
    }
  }
  return _data;
}
export function serializeGroupDto(_data: GroupDto | undefined) {
  if (_data) {
    _data = prepareSerializeGroupDto(_data as GroupDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeGroupDto(_data: GroupDto): GroupDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.students)) {
    data["students"] = _data.students.map(item =>
      prepareSerializeUserDto(item)
    );
  }
  return data as GroupDto;
}
export interface ChangeStudentGraduationStatusDto {
  /** Идентификатор студента */
  studentId: string;
  /** Статус выпуска студента */
  status: boolean;
  [key: string]: any;
}
export function deserializeChangeStudentGraduationStatusDto(json: string): ChangeStudentGraduationStatusDto {
  const data = JSON.parse(json) as ChangeStudentGraduationStatusDto;
  initChangeStudentGraduationStatusDto(data);
  return data;
}
export function initChangeStudentGraduationStatusDto(_data: ChangeStudentGraduationStatusDto) {
  return _data;
}
export function serializeChangeStudentGraduationStatusDto(_data: ChangeStudentGraduationStatusDto | undefined) {
  if (_data) {
    _data = prepareSerializeChangeStudentGraduationStatusDto(_data as ChangeStudentGraduationStatusDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeChangeStudentGraduationStatusDto(_data: ChangeStudentGraduationStatusDto): ChangeStudentGraduationStatusDto {
  const data: Record<string, any> = { ..._data };
  return data as ChangeStudentGraduationStatusDto;
}
export interface FileDto {
  /** Идентификатор файла */
  id?: string;
  /** Имя файла */
  name?: string;
  /** Тип файла */
  contentType?: string;
  /** Размер файла в байтах */
  size?: number;
  /** Время создания файла (загрузки на сервер) */
  createdAt?: Date;
  /** Тип файла */
  type?: FileDtoType;
  [key: string]: any;
}
export function deserializeFileDto(json: string): FileDto {
  const data = JSON.parse(json) as FileDto;
  initFileDto(data);
  return data;
}
export function initFileDto(_data: FileDto) {
  if (_data) {
    _data.createdAt = _data["createdAt"] ? new Date(_data["createdAt"].toString()) : <any>null;
    _data.type = _data["type"];
  }
  return _data;
}
export function serializeFileDto(_data: FileDto | undefined) {
  if (_data) {
    _data = prepareSerializeFileDto(_data as FileDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeFileDto(_data: FileDto): FileDto {
  const data: Record<string, any> = { ..._data };
  data["createdAt"] = _data.createdAt && _data.createdAt.toISOString();
  return data as FileDto;
}
/** Модель для создания руководителя образовательной программы */
export interface EducationalProgramLeadCreateDto {
  /** Идентификатор пользователя */
  userId: string;
  [key: string]: any;
}
export function deserializeEducationalProgramLeadCreateDto(json: string): EducationalProgramLeadCreateDto {
  const data = JSON.parse(json) as EducationalProgramLeadCreateDto;
  initEducationalProgramLeadCreateDto(data);
  return data;
}
export function initEducationalProgramLeadCreateDto(_data: EducationalProgramLeadCreateDto) {
  return _data;
}
export function serializeEducationalProgramLeadCreateDto(_data: EducationalProgramLeadCreateDto | undefined) {
  if (_data) {
    _data = prepareSerializeEducationalProgramLeadCreateDto(_data as EducationalProgramLeadCreateDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeEducationalProgramLeadCreateDto(_data: EducationalProgramLeadCreateDto): EducationalProgramLeadCreateDto {
  const data: Record<string, any> = { ..._data };
  return data as EducationalProgramLeadCreateDto;
}
/** Модель руководителя образовательной программы */
export interface EducationalProgramLeadDto {
  /** Идентификатор роли */
  id: string;
  user: UserShortDto;
  [key: string]: any;
}
export function deserializeEducationalProgramLeadDto(json: string): EducationalProgramLeadDto {
  const data = JSON.parse(json) as EducationalProgramLeadDto;
  initEducationalProgramLeadDto(data);
  return data;
}
export function initEducationalProgramLeadDto(_data: EducationalProgramLeadDto) {
  if (_data) {
    _data.user = _data["user"] && initUserShortDto(_data["user"]);
  }
  return _data;
}
export function serializeEducationalProgramLeadDto(_data: EducationalProgramLeadDto | undefined) {
  if (_data) {
    _data = prepareSerializeEducationalProgramLeadDto(_data as EducationalProgramLeadDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeEducationalProgramLeadDto(_data: EducationalProgramLeadDto): EducationalProgramLeadDto {
  const data: Record<string, any> = { ..._data };
  data["user"] = _data.user && prepareSerializeUserShortDto(_data.user);
  return data as EducationalProgramLeadDto;
}
/** Модель для создания представителя деканата */
export interface DeanCreateDto {
  /** Идентификатор пользователя */
  userId: string;
  [key: string]: any;
}
export function deserializeDeanCreateDto(json: string): DeanCreateDto {
  const data = JSON.parse(json) as DeanCreateDto;
  initDeanCreateDto(data);
  return data;
}
export function initDeanCreateDto(_data: DeanCreateDto) {
  return _data;
}
export function serializeDeanCreateDto(_data: DeanCreateDto | undefined) {
  if (_data) {
    _data = prepareSerializeDeanCreateDto(_data as DeanCreateDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeDeanCreateDto(_data: DeanCreateDto): DeanCreateDto {
  const data: Record<string, any> = { ..._data };
  return data as DeanCreateDto;
}
/** Модель деканата */
export interface DeanDto {
  /** Идентификатор роли */
  id: string;
  user: UserShortDto;
  [key: string]: any;
}
export function deserializeDeanDto(json: string): DeanDto {
  const data = JSON.parse(json) as DeanDto;
  initDeanDto(data);
  return data;
}
export function initDeanDto(_data: DeanDto) {
  if (_data) {
    _data.user = _data["user"] && initUserShortDto(_data["user"]);
  }
  return _data;
}
export function serializeDeanDto(_data: DeanDto | undefined) {
  if (_data) {
    _data = prepareSerializeDeanDto(_data as DeanDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeDeanDto(_data: DeanDto): DeanDto {
  const data: Record<string, any> = { ..._data };
  data["user"] = _data.user && prepareSerializeUserShortDto(_data.user);
  return data as DeanDto;
}
/** Модель для создания куратора */
export interface CuratorCreateDto {
  /** Идентификатор пользователя */
  userId: string;
  /** Идентификатор компании */
  companyId: string;
  [key: string]: any;
}
export function deserializeCuratorCreateDto(json: string): CuratorCreateDto {
  const data = JSON.parse(json) as CuratorCreateDto;
  initCuratorCreateDto(data);
  return data;
}
export function initCuratorCreateDto(_data: CuratorCreateDto) {
  return _data;
}
export function serializeCuratorCreateDto(_data: CuratorCreateDto | undefined) {
  if (_data) {
    _data = prepareSerializeCuratorCreateDto(_data as CuratorCreateDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCuratorCreateDto(_data: CuratorCreateDto): CuratorCreateDto {
  const data: Record<string, any> = { ..._data };
  return data as CuratorCreateDto;
}
export interface SendMessageRequest {
  content: string;
  [key: string]: any;
}
export function deserializeSendMessageRequest(json: string): SendMessageRequest {
  const data = JSON.parse(json) as SendMessageRequest;
  initSendMessageRequest(data);
  return data;
}
export function initSendMessageRequest(_data: SendMessageRequest) {
  return _data;
}
export function serializeSendMessageRequest(_data: SendMessageRequest | undefined) {
  if (_data) {
    _data = prepareSerializeSendMessageRequest(_data as SendMessageRequest);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeSendMessageRequest(_data: SendMessageRequest): SendMessageRequest {
  const data: Record<string, any> = { ..._data };
  return data as SendMessageRequest;
}
export interface SendMessageToStudentsRequest {
  /** Идентификаторы студентов */
  studentIds: string[];
  content: string;
  [key: string]: any;
}
export function deserializeSendMessageToStudentsRequest(json: string): SendMessageToStudentsRequest {
  const data = JSON.parse(json) as SendMessageToStudentsRequest;
  initSendMessageToStudentsRequest(data);
  return data;
}
export function initSendMessageToStudentsRequest(_data: SendMessageToStudentsRequest) {
  if (_data) {
    _data.studentIds = _data["studentIds"];
  }
  return _data;
}
export function serializeSendMessageToStudentsRequest(_data: SendMessageToStudentsRequest | undefined) {
  if (_data) {
    _data = prepareSerializeSendMessageToStudentsRequest(_data as SendMessageToStudentsRequest);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeSendMessageToStudentsRequest(_data: SendMessageToStudentsRequest): SendMessageToStudentsRequest {
  const data: Record<string, any> = { ..._data };
  return data as SendMessageToStudentsRequest;
}
/** Обновление группы */
export interface UpdateGroupDto {
  /** Номер группы */
  number: string;
  [key: string]: any;
}
export function deserializeUpdateGroupDto(json: string): UpdateGroupDto {
  const data = JSON.parse(json) as UpdateGroupDto;
  initUpdateGroupDto(data);
  return data;
}
export function initUpdateGroupDto(_data: UpdateGroupDto) {
  return _data;
}
export function serializeUpdateGroupDto(_data: UpdateGroupDto | undefined) {
  if (_data) {
    _data = prepareSerializeUpdateGroupDto(_data as UpdateGroupDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUpdateGroupDto(_data: UpdateGroupDto): UpdateGroupDto {
  const data: Record<string, any> = { ..._data };
  return data as UpdateGroupDto;
}
/** Модель куратора */
export interface CuratorShortDto {
  /** Идентификатор роли */
  id: string;
  companyPartner: ShortCompanyPartnerDto;
  [key: string]: any;
}
export function deserializeCuratorShortDto(json: string): CuratorShortDto {
  const data = JSON.parse(json) as CuratorShortDto;
  initCuratorShortDto(data);
  return data;
}
export function initCuratorShortDto(_data: CuratorShortDto) {
  if (_data) {
    _data.companyPartner = _data["companyPartner"] && initShortCompanyPartnerDto(_data["companyPartner"]);
  }
  return _data;
}
export function serializeCuratorShortDto(_data: CuratorShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeCuratorShortDto(_data as CuratorShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeCuratorShortDto(_data: CuratorShortDto): CuratorShortDto {
  const data: Record<string, any> = { ..._data };
  data["companyPartner"] = _data.companyPartner && prepareSerializeShortCompanyPartnerDto(_data.companyPartner);
  return data as CuratorShortDto;
}
/** Модель представителя деканата */
export interface DeanShortDto {
  /** Идентификатор роли */
  id: string;
  [key: string]: any;
}
export function deserializeDeanShortDto(json: string): DeanShortDto {
  const data = JSON.parse(json) as DeanShortDto;
  initDeanShortDto(data);
  return data;
}
export function initDeanShortDto(_data: DeanShortDto) {
  return _data;
}
export function serializeDeanShortDto(_data: DeanShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeDeanShortDto(_data as DeanShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeDeanShortDto(_data: DeanShortDto): DeanShortDto {
  const data: Record<string, any> = { ..._data };
  return data as DeanShortDto;
}
/** Модель руководителя образовательной программы */
export interface EducationalProgramLeadShortDto {
  /** Идентификатор роли */
  id: string;
  [key: string]: any;
}
export function deserializeEducationalProgramLeadShortDto(json: string): EducationalProgramLeadShortDto {
  const data = JSON.parse(json) as EducationalProgramLeadShortDto;
  initEducationalProgramLeadShortDto(data);
  return data;
}
export function initEducationalProgramLeadShortDto(_data: EducationalProgramLeadShortDto) {
  return _data;
}
export function serializeEducationalProgramLeadShortDto(_data: EducationalProgramLeadShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeEducationalProgramLeadShortDto(_data as EducationalProgramLeadShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeEducationalProgramLeadShortDto(_data: EducationalProgramLeadShortDto): EducationalProgramLeadShortDto {
  const data: Record<string, any> = { ..._data };
  return data as EducationalProgramLeadShortDto;
}
/** Модель студента */
export interface StudentShortDto {
  /** Идентификатор роли */
  id: string;
  isAcadem: boolean;
  isGraduated: boolean;
  group: GroupShortDto;
  chatId: string;
  [key: string]: any;
}
export function deserializeStudentShortDto(json: string): StudentShortDto {
  const data = JSON.parse(json) as StudentShortDto;
  initStudentShortDto(data);
  return data;
}
export function initStudentShortDto(_data: StudentShortDto) {
  if (_data) {
    _data.group = _data["group"] && initGroupShortDto(_data["group"]);
  }
  return _data;
}
export function serializeStudentShortDto(_data: StudentShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeStudentShortDto(_data as StudentShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeStudentShortDto(_data: StudentShortDto): StudentShortDto {
  const data: Record<string, any> = { ..._data };
  data["group"] = _data.group && prepareSerializeGroupShortDto(_data.group);
  return data as StudentShortDto;
}
/** Модель преподавателя */
export interface TeacherShortDto {
  /** Идентификатор роли */
  id: string;
  [key: string]: any;
}
export function deserializeTeacherShortDto(json: string): TeacherShortDto {
  const data = JSON.parse(json) as TeacherShortDto;
  initTeacherShortDto(data);
  return data;
}
export function initTeacherShortDto(_data: TeacherShortDto) {
  return _data;
}
export function serializeTeacherShortDto(_data: TeacherShortDto | undefined) {
  if (_data) {
    _data = prepareSerializeTeacherShortDto(_data as TeacherShortDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeTeacherShortDto(_data: TeacherShortDto): TeacherShortDto {
  const data: Record<string, any> = { ..._data };
  return data as TeacherShortDto;
}
/** Подробная модель пользователя */
export interface UserDetailsDto {
  /** Идентификатор пользователя */
  id: string;
  /** Адрес электронной почты */
  email: string;
  /** ФИО пользователя */
  fullName: string;
  dean?: DeanShortDto;
  student?: StudentShortDto;
  curator?: CuratorShortDto;
  teacher?: TeacherShortDto;
  educationalProgramLead?: EducationalProgramLeadShortDto;
  [key: string]: any;
}
export function deserializeUserDetailsDto(json: string): UserDetailsDto {
  const data = JSON.parse(json) as UserDetailsDto;
  initUserDetailsDto(data);
  return data;
}
export function initUserDetailsDto(_data: UserDetailsDto) {
  if (_data) {
    _data.dean = _data["dean"] && initDeanShortDto(_data["dean"]);
    _data.student = _data["student"] && initStudentShortDto(_data["student"]);
    _data.curator = _data["curator"] && initCuratorShortDto(_data["curator"]);
    _data.teacher = _data["teacher"] && initTeacherShortDto(_data["teacher"]);
    _data.educationalProgramLead = _data["educationalProgramLead"] && initEducationalProgramLeadShortDto(_data["educationalProgramLead"]);
  }
  return _data;
}
export function serializeUserDetailsDto(_data: UserDetailsDto | undefined) {
  if (_data) {
    _data = prepareSerializeUserDetailsDto(_data as UserDetailsDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeUserDetailsDto(_data: UserDetailsDto): UserDetailsDto {
  const data: Record<string, any> = { ..._data };
  data["dean"] = _data.dean && prepareSerializeDeanShortDto(_data.dean);
  data["student"] = _data.student && prepareSerializeStudentShortDto(_data.student);
  data["curator"] = _data.curator && prepareSerializeCuratorShortDto(_data.curator);
  data["teacher"] = _data.teacher && prepareSerializeTeacherShortDto(_data.teacher);
  data["educationalProgramLead"] = _data.educationalProgramLead && prepareSerializeEducationalProgramLeadShortDto(_data.educationalProgramLead);
  return data as UserDetailsDto;
}
export interface PageDto {
  /** Количество элементов текущей страницы */
  size?: number;
  /** Номер текущей страницы */
  currentPage?: number;
  /** Общее количество страниц */
  totalPages?: number;
  /** Общее количество элементов */
  totalElements?: number;
  [key: string]: any;
}
export function deserializePageDto(json: string): PageDto {
  const data = JSON.parse(json) as PageDto;
  initPageDto(data);
  return data;
}
export function initPageDto(_data: PageDto) {
  return _data;
}
export function serializePageDto(_data: PageDto | undefined) {
  if (_data) {
    _data = prepareSerializePageDto(_data as PageDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePageDto(_data: PageDto): PageDto {
  const data: Record<string, any> = { ..._data };
  return data as PageDto;
}
export interface PagedListDtoUserDto {
  items?: UserDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoUserDto(json: string): PagedListDtoUserDto {
  const data = JSON.parse(json) as PagedListDtoUserDto;
  initPagedListDtoUserDto(data);
  return data;
}
export function initPagedListDtoUserDto(_data: PagedListDtoUserDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initUserDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoUserDto(_data: PagedListDtoUserDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoUserDto(_data as PagedListDtoUserDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoUserDto(_data: PagedListDtoUserDto): PagedListDtoUserDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeUserDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoUserDto;
}
export interface PagedListDtoTeacherDto {
  items?: TeacherDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoTeacherDto(json: string): PagedListDtoTeacherDto {
  const data = JSON.parse(json) as PagedListDtoTeacherDto;
  initPagedListDtoTeacherDto(data);
  return data;
}
export function initPagedListDtoTeacherDto(_data: PagedListDtoTeacherDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initTeacherDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoTeacherDto(_data: PagedListDtoTeacherDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoTeacherDto(_data as PagedListDtoTeacherDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoTeacherDto(_data: PagedListDtoTeacherDto): PagedListDtoTeacherDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeTeacherDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoTeacherDto;
}
export interface PagedListDtoStudentDto {
  items?: StudentDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoStudentDto(json: string): PagedListDtoStudentDto {
  const data = JSON.parse(json) as PagedListDtoStudentDto;
  initPagedListDtoStudentDto(data);
  return data;
}
export function initPagedListDtoStudentDto(_data: PagedListDtoStudentDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initStudentDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoStudentDto(_data: PagedListDtoStudentDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoStudentDto(_data as PagedListDtoStudentDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoStudentDto(_data: PagedListDtoStudentDto): PagedListDtoStudentDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeStudentDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoStudentDto;
}
/** Статистика по найденным студентам */
export interface StatisticsResponse {
  /** Количество найденных студентов */
  count?: number;
  [key: string]: any;
}
export function deserializeStatisticsResponse(json: string): StatisticsResponse {
  const data = JSON.parse(json) as StatisticsResponse;
  initStatisticsResponse(data);
  return data;
}
export function initStatisticsResponse(_data: StatisticsResponse) {
  return _data;
}
export function serializeStatisticsResponse(_data: StatisticsResponse | undefined) {
  if (_data) {
    _data = prepareSerializeStatisticsResponse(_data as StatisticsResponse);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeStatisticsResponse(_data: StatisticsResponse): StatisticsResponse {
  const data: Record<string, any> = { ..._data };
  return data as StatisticsResponse;
}
export interface PagedListDtoPracticeDto {
  items?: PracticeDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoPracticeDto(json: string): PagedListDtoPracticeDto {
  const data = JSON.parse(json) as PagedListDtoPracticeDto;
  initPagedListDtoPracticeDto(data);
  return data;
}
export function initPagedListDtoPracticeDto(_data: PagedListDtoPracticeDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initPracticeDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoPracticeDto(_data: PagedListDtoPracticeDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoPracticeDto(_data as PagedListDtoPracticeDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoPracticeDto(_data: PagedListDtoPracticeDto): PagedListDtoPracticeDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializePracticeDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoPracticeDto;
}
/** dto списка практик с информацией о студенте */
export interface PagedPracticesDto {
  student?: StudentDto;
  practices?: PagedListDtoPracticeDto;
  [key: string]: any;
}
export function deserializePagedPracticesDto(json: string): PagedPracticesDto {
  const data = JSON.parse(json) as PagedPracticesDto;
  initPagedPracticesDto(data);
  return data;
}
export function initPagedPracticesDto(_data: PagedPracticesDto) {
  if (_data) {
    _data.student = _data["student"] && initStudentDto(_data["student"]);
    _data.practices = _data["practices"] && initPagedListDtoPracticeDto(_data["practices"]);
  }
  return _data;
}
export function serializePagedPracticesDto(_data: PagedPracticesDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedPracticesDto(_data as PagedPracticesDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedPracticesDto(_data: PagedPracticesDto): PagedPracticesDto {
  const data: Record<string, any> = { ..._data };
  data["student"] = _data.student && prepareSerializeStudentDto(_data.student);
  data["practices"] = _data.practices && prepareSerializePagedListDtoPracticeDto(_data.practices);
  return data as PagedPracticesDto;
}
export interface PagedListDtoShortCompanyPartnerDto {
  items?: ShortCompanyPartnerDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoShortCompanyPartnerDto(json: string): PagedListDtoShortCompanyPartnerDto {
  const data = JSON.parse(json) as PagedListDtoShortCompanyPartnerDto;
  initPagedListDtoShortCompanyPartnerDto(data);
  return data;
}
export function initPagedListDtoShortCompanyPartnerDto(_data: PagedListDtoShortCompanyPartnerDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initShortCompanyPartnerDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoShortCompanyPartnerDto(_data: PagedListDtoShortCompanyPartnerDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoShortCompanyPartnerDto(_data as PagedListDtoShortCompanyPartnerDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoShortCompanyPartnerDto(_data: PagedListDtoShortCompanyPartnerDto): PagedListDtoShortCompanyPartnerDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeShortCompanyPartnerDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoShortCompanyPartnerDto;
}
export interface PagedListDtoInterviewDto {
  items?: InterviewDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoInterviewDto(json: string): PagedListDtoInterviewDto {
  const data = JSON.parse(json) as PagedListDtoInterviewDto;
  initPagedListDtoInterviewDto(data);
  return data;
}
export function initPagedListDtoInterviewDto(_data: PagedListDtoInterviewDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initInterviewDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoInterviewDto(_data: PagedListDtoInterviewDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoInterviewDto(_data as PagedListDtoInterviewDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoInterviewDto(_data: PagedListDtoInterviewDto): PagedListDtoInterviewDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeInterviewDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoInterviewDto;
}
export interface PagedListDtoGroupDto {
  items?: GroupDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoGroupDto(json: string): PagedListDtoGroupDto {
  const data = JSON.parse(json) as PagedListDtoGroupDto;
  initPagedListDtoGroupDto(data);
  return data;
}
export function initPagedListDtoGroupDto(_data: PagedListDtoGroupDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initGroupDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoGroupDto(_data: PagedListDtoGroupDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoGroupDto(_data as PagedListDtoGroupDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoGroupDto(_data: PagedListDtoGroupDto): PagedListDtoGroupDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeGroupDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoGroupDto;
}
export interface PagedListDtoFileDto {
  items?: FileDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoFileDto(json: string): PagedListDtoFileDto {
  const data = JSON.parse(json) as PagedListDtoFileDto;
  initPagedListDtoFileDto(data);
  return data;
}
export function initPagedListDtoFileDto(_data: PagedListDtoFileDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initFileDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoFileDto(_data: PagedListDtoFileDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoFileDto(_data as PagedListDtoFileDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoFileDto(_data: PagedListDtoFileDto): PagedListDtoFileDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeFileDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoFileDto;
}
export interface PagedListDtoDeanDto {
  items?: DeanDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoDeanDto(json: string): PagedListDtoDeanDto {
  const data = JSON.parse(json) as PagedListDtoDeanDto;
  initPagedListDtoDeanDto(data);
  return data;
}
export function initPagedListDtoDeanDto(_data: PagedListDtoDeanDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initDeanDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoDeanDto(_data: PagedListDtoDeanDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoDeanDto(_data as PagedListDtoDeanDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoDeanDto(_data: PagedListDtoDeanDto): PagedListDtoDeanDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeDeanDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoDeanDto;
}
export interface PagedListDtoCuratorDto {
  items?: CuratorDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoCuratorDto(json: string): PagedListDtoCuratorDto {
  const data = JSON.parse(json) as PagedListDtoCuratorDto;
  initPagedListDtoCuratorDto(data);
  return data;
}
export function initPagedListDtoCuratorDto(_data: PagedListDtoCuratorDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initCuratorDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoCuratorDto(_data: PagedListDtoCuratorDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoCuratorDto(_data as PagedListDtoCuratorDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoCuratorDto(_data: PagedListDtoCuratorDto): PagedListDtoCuratorDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeCuratorDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoCuratorDto;
}
export interface PagedListDtoMessageDto {
  items?: MessageDto[];
  pagination?: PageDto;
  [key: string]: any;
}
export function deserializePagedListDtoMessageDto(json: string): PagedListDtoMessageDto {
  const data = JSON.parse(json) as PagedListDtoMessageDto;
  initPagedListDtoMessageDto(data);
  return data;
}
export function initPagedListDtoMessageDto(_data: PagedListDtoMessageDto) {
  if (_data) {
    if (Array.isArray(_data["items"])) {
      _data.items = _data["items"].map(item =>
        initMessageDto(item)
      );
    }
    _data.pagination = _data["pagination"] && initPageDto(_data["pagination"]);
  }
  return _data;
}
export function serializePagedListDtoMessageDto(_data: PagedListDtoMessageDto | undefined) {
  if (_data) {
    _data = prepareSerializePagedListDtoMessageDto(_data as PagedListDtoMessageDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializePagedListDtoMessageDto(_data: PagedListDtoMessageDto): PagedListDtoMessageDto {
  const data: Record<string, any> = { ..._data };
  if (Array.isArray(_data.items)) {
    data["items"] = _data.items.map(item =>
      prepareSerializeMessageDto(item)
    );
  }
  data["pagination"] = _data.pagination && prepareSerializePageDto(_data.pagination);
  return data as PagedListDtoMessageDto;
}
export interface ChatInfoDto {
  /** Идентификатор чата */
  chatId?: string;
  /** Идентификатор студента */
  studentId?: string;
  /** Число непрочитанных сообщений для текущего пользователя */
  unreadCount?: number;
  [key: string]: any;
}
export function deserializeChatInfoDto(json: string): ChatInfoDto {
  const data = JSON.parse(json) as ChatInfoDto;
  initChatInfoDto(data);
  return data;
}
export function initChatInfoDto(_data: ChatInfoDto) {
  return _data;
}
export function serializeChatInfoDto(_data: ChatInfoDto | undefined) {
  if (_data) {
    _data = prepareSerializeChatInfoDto(_data as ChatInfoDto);
  }
  return JSON.stringify(_data);
}
export function prepareSerializeChatInfoDto(_data: ChatInfoDto): ChatInfoDto {
  const data: Record<string, any> = { ..._data };
  return data as ChatInfoDto;
}
/** Роль пользователя */
export enum UserRole {
  ADMIN = "ADMIN",
  DEAN = "DEAN",
  CURATOR = "CURATOR",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  EDUCATIONAL_PROGRAM_LEAD = "EDUCATIONAL_PROGRAM_LEAD",
}
/** Статус отбора */
export enum Status {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SUCCEED = "SUCCEED",
}
export enum Type {
  LOGO = "LOGO",
  REPORT = "REPORT",
  OTHER = "OTHER",
}
export enum RoleDtoUserRole {
  ADMIN = "ADMIN",
  DEAN = "DEAN",
  CURATOR = "CURATOR",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  EDUCATIONAL_PROGRAM_LEAD = "EDUCATIONAL_PROGRAM_LEAD",
}
export enum UpdateInterviewDtoStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SUCCEED = "SUCCEED",
}
export enum InterviewDtoStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SUCCEED = "SUCCEED",
}
export enum CreateInterviewDtoStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SUCCEED = "SUCCEED",
}
export enum FileDtoType {
  LOGO = "LOGO",
  REPORT = "REPORT",
  OTHER = "OTHER",
}
import type { AxiosError } from 'axios'
export interface FileParameter {
  data: any;
  fileName: string;
}
export interface FileResponse {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
}
export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;
  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }
  protected isApiException = true;
  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}
export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
  if (result !== null && result !== undefined)
    throw result;
  else
    throw new ApiException(message, status, response, headers, null);
}
export function isAxiosError(obj: any | undefined): obj is AxiosError {
  return obj && obj.isAxiosError === true;
}
//-----/Types.File-----