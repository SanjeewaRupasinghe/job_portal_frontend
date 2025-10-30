type User = {
  id: string;
  app_metadata: UserAppMetadata;
  user_metadata: UserMetadata;
  email?: string;
  phone?: string;
  role?: string;
};

type UserAppMetadata = {
  provider?: string;
  [key: string]: any;
};

type UserMetadata = {
  [key: string]: any;
};

export type { User };
