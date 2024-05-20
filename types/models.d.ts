interface IPlayer {
    id: number;
    last_name: string;
    first_name: string;
    phone: string;
    score: number;
    gift: string | null;
    created_at: string;
    updated_at: string;
}

interface IGift {
    id: number;
    name: string;
    initial_qty: number;
    actual_qty: number;
    created_at: string;
    updated_at: string;
}
type NewPlayerData = {
    last_name: string;
    first_name: string;
    phone: string;
    address?: string;
}
type NewGiftData = {
    name: string;
    init_qty: number | string;
}