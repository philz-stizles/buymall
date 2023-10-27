import { useContext } from 'react';
import { AuthContext } from './auth-context';
import { DrawerContext } from './drawer-context';
import { ThemeContext } from './theme-context';
import { NotificationContext } from './notification-context';

export const useAuth = () => useContext(AuthContext);
export const useDrawerContext = () => useContext(DrawerContext);
export const useThemeContext = () => useContext(ThemeContext);
export const useNotificationContext = () => useContext(NotificationContext);
