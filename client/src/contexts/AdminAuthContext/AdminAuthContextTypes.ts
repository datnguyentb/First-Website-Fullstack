// 1. Định nghĩa cấu trúc state Auth
export interface AuthState {
    token: string | null;
    role: string | null;
}

// 2. Định nghĩa toàn bộ những gì Context sẽ cung cấp (Value)
export interface AdminAuthContextType {
    auth: AuthState;
    login: (newToken: string, newRole: string) => void;
    logout: () => void;
}
