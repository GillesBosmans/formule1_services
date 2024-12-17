import { User } from '../types';
interface NavbarProps {
    user: User | null | undefined;
    onLogout: () => void;
    onLoginSuccess: (response: any) => void;
    onLoginError: () => void;
}
export default function Navbar({ user, onLogout, onLoginSuccess, onLoginError }: NavbarProps): import("react/jsx-runtime").JSX.Element;
export {};
