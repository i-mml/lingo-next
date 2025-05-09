export default interface IUnitActivity {
  active: boolean;
  activity_id: string;
  blocked_by: string[];
  duration: number;
  finished: boolean;
  id: number;
  title: string;
  type: string;
  unlock_at: string;
  is_locked: boolean;
  is_finished: boolean;
}
