export const authConsts = {
  googleAuth: `${import.meta.env.VITE_SERVER_URL}/auth/google`,
  logout: `${import.meta.env.VITE_SERVER_URL}/logout`,
} as const;
export const userConsts = {
  getUserInfo: `${import.meta.env.VITE_SERVER_URL}/api/user`,
} as const;

export const formConsts = {
  formSubmit: `${import.meta.env.VITE_SERVER_URL}/form`,
  updateContent: `${import.meta.env.VITE_SERVER_URL}/form-content`,
  formPublish: `${import.meta.env.VITE_SERVER_URL}/form-publish`,
  formByUrl: `${import.meta.env.VITE_SERVER_URL}/form-url`,
  formSubmission: `${import.meta.env.VITE_SERVER_URL}/form-submission`,
} as const;
