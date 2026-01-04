export interface Department {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  department: string;
  budgetAllocated: number;
  budgetSpent: number;
  outcomePercent: number;
  transparencyScore: number;
  status: 'good' | 'medium' | 'low';
  startDate: string;
  endDate: string;
  ComplainAlignment: number;
}

export interface BudgetData {
  department: string;
  budget: number;
  spent: number;
}

export interface TransparencyTrend {
  month: string;
  score: number;
}

export interface Alert {
  id: string;
  projectName: string;
  issue: string;
  severity: 'good' | 'medium' | 'low';
  date: string;
}

export interface Region {
  id: string;
  name: string;
  department: string;
  score: number;
}
