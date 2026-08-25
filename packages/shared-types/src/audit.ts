export interface IAuditLog {
  _id: string;
  actor: {
    _id: string;
    name: string;
    email: string;
  };
  action: string;
  target: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  timestamp: string;
}
