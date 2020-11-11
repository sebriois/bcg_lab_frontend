import {User} from './users.model';

export class Provider {
    id: number;
    name: string;
    direct_reception?: boolean;
    is_local?: boolean;
    is_service?: boolean;
    notes?: string;
    reseller?: number;
    users_in_charge?: User[];
}
export class Reseller {
  id: number;
  name: string;
}
