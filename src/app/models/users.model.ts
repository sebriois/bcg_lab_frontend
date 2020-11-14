export class Permission {
  id: number;
  name: string;
}

export class User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  last_login: Date;
  is_active: boolean;
  is_superuser: boolean;
  access: string;
  user_permissions: Array<Permission>;

  team: {
    id: number;
    name: string;
  };

  expiresIn: number;
}
