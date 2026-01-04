
export enum WidgetType {
  MUSIC = 'MUSIC',
  CLICKUP = 'CLICKUP',
  CREATIVE = 'CREATIVE',
  HEALTH = 'HEALTH',
  KPI = 'KPI',
  INTEGRATIONS = 'INTEGRATIONS'
}

export enum ProjectStatus {
  RECORDING = 'RECORDING',
  MIXING = 'MIXING',
  MASTERING = 'MASTERING',
  DONE = 'DONE'
}

export interface MusicProject {
  id: string;
  name: string;
  album: string;
  status: ProjectStatus;
  progress: number;
}

export interface ClickUpTask {
  id: string;
  title: string;
  status: 'in-progress' | 'on-hold' | 'done';
  due_at: string;
}

export interface HealthEntry {
  date: string;
  mood: number;
  energy: number;
  focus: number;
}

export interface IntegrationStatus {
  service: string;
  status: 'OK' | 'ISSUE' | 'WARN';
  last_ok_at: string;
}

export interface DashboardState {
  widgets: WidgetType[];
  musicProjects: MusicProject[];
  tasks: ClickUpTask[];
  healthLog: HealthEntry[];
  integrations: IntegrationStatus[];
  skills: string[];
}
