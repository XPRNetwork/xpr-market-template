export interface Collection {
  author: string;
  collection_name: string;
  name?: string | null;
  img?: string | null;
  allow_notify?: boolean;
  authorized_accounts?: string[];
  notify_accounts?: string[] | [];
  market_fee?: number;
  created_at_block?: string;
  created_at_time?: string;
  order?: number;
  sales?: string;
  volume?: string;
  data?: {
    img?: string;
    name?: string;
    description?: string;
  };
}
