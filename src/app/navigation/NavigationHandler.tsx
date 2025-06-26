import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigator } from './navigation.ts'

export const NavigationHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
};
