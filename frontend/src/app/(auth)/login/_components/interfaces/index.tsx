export interface LoginUser {
  id: string;
  nom: string;
  email: string;
  role: string;
  roleDisplayName?: string;
  enabled: boolean;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    type: string;
    user: LoginUser;
  };
}
