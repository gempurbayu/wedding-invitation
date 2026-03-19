export interface RSVP {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  created_at: string;
}

export interface Invitation {
  id: string;
  name: string;
  whatsapp: string;
  slug: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
}
