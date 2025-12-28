// src/types/navigation.ts
export interface AdminMenuItem {
    id: number | string;
    title: string;
    to: string;
    icon?: React.ReactNode; // Sau này bạn thêm icon sẽ rất dễ
}
