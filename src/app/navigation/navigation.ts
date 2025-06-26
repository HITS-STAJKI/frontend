let navigate: ((path: string) => void) | null = null;

export const setNavigator = (navFn: (path: string) => void) => {
  navigate = navFn;
};

export const redirectToLogin = () => {
  if (navigate) {
    navigate('/login');
  } else {
    window.location.href = '/login'; // fallback
  }
};