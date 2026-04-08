export interface IClientUserService {
    registerAsync(dto: IRegisterUserRequest): Promise<TokenResponse>;
    loginAsync(dto: ILoginUserRequest): Promise<TokenResponse>;
}
