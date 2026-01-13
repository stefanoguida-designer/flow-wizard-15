// Types
export interface Department {
  id: string;
  name: string;
  abbreviation: string;
  unitsCount: number;
  usersCount: number;
}

export interface Unit {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  usersCount: number;
  createdAt: string;
  createdBy: string;
}

export interface UserAccess {
  departmentId: string;
  departmentName: string;
  fullDepartment: boolean;
  unitIds: string[];
  unitNames: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  access: UserAccess[];
  addedAt: string;
  addedBy: string;
}

export interface ActivityLog {
  id: string;
  action: 'user_invited' | 'user_removed' | 'unit_created' | 'unit_renamed' | 'unit_deleted' | 'access_granted' | 'access_revoked' | 'admin_invited' | 'admin_removed' | 'whitelist_added' | 'whitelist_removed';
  description: string;
  performedBy: string;
  performedByEmail: string;
  timestamp: string;
  targetType: 'user' | 'unit' | 'department' | 'admin' | 'whitelist';
  targetName: string;
  metadata?: Record<string, string>;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  addedAt: string;
  addedBy: string;
}

export interface WhitelistedDomain {
  id: string;
  domain: string;
  addedAt: string;
  addedBy: string;
}

// Mock Departments (Irish Government Departments)
export const departments: Department[] = [
  { id: 'dept-1', name: 'Housing, Local Government and Heritage', abbreviation: 'DHLGH', unitsCount: 12, usersCount: 45 },
  { id: 'dept-2', name: 'Education', abbreviation: 'DE', unitsCount: 8, usersCount: 32 },
  { id: 'dept-3', name: 'Health', abbreviation: 'DoH', unitsCount: 15, usersCount: 67 },
  { id: 'dept-4', name: 'Social Protection', abbreviation: 'DSP', unitsCount: 10, usersCount: 38 },
  { id: 'dept-5', name: 'Enterprise, Trade and Employment', abbreviation: 'DETE', unitsCount: 7, usersCount: 24 },
  { id: 'dept-6', name: 'Agriculture, Food and the Marine', abbreviation: 'DAFM', unitsCount: 9, usersCount: 29 },
  { id: 'dept-7', name: 'Transport', abbreviation: 'DoT', unitsCount: 6, usersCount: 18 },
  { id: 'dept-8', name: 'Environment, Climate and Communications', abbreviation: 'DECC', unitsCount: 8, usersCount: 22 },
  { id: 'dept-9', name: 'Justice', abbreviation: 'DoJ', unitsCount: 11, usersCount: 41 },
  { id: 'dept-10', name: 'Finance', abbreviation: 'DoF', unitsCount: 5, usersCount: 15 },
];

// Mock Units per Department
export const units: Unit[] = [
  // Housing Department
  { id: 'unit-1', name: 'Cork City Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 8, createdAt: '2024-01-15', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-2', name: 'Dublin City Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 12, createdAt: '2024-01-15', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-3', name: 'Galway County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 5, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-4', name: 'Kilkenny County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 4, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-5', name: 'Limerick City and County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 6, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-6', name: 'Waterford City and County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 4, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  // Education Department
  { id: 'unit-7', name: 'Primary Schools Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 10, createdAt: '2024-01-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-8', name: 'Secondary Schools Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 8, createdAt: '2024-01-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-9', name: 'Higher Education Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 6, createdAt: '2024-02-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-10', name: 'Special Education Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 8, createdAt: '2024-02-15', createdBy: 'Sinead Kelly' },
  // Health Department
  { id: 'unit-11', name: 'HSE Dublin', departmentId: 'dept-3', departmentName: 'Health', usersCount: 15, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-12', name: 'HSE Cork', departmentId: 'dept-3', departmentName: 'Health', usersCount: 12, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-13', name: 'HSE Galway', departmentId: 'dept-3', departmentName: 'Health', usersCount: 8, createdAt: '2024-01-20', createdBy: 'Aoife Brennan' },
  // Social Protection Department
  { id: 'unit-14', name: 'Employment Services', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 10, createdAt: '2024-01-12', createdBy: 'Declan Walsh' },
  { id: 'unit-15', name: 'Community Welfare', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 8, createdAt: '2024-01-12', createdBy: 'Declan Walsh' },
  { id: 'unit-16', name: 'Pensions Division', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 6, createdAt: '2024-02-01', createdBy: 'Declan Walsh' },
];

// Mock Users (Civil Servants)
export const users: User[] = [
  {
    id: 'user-1',
    name: 'Seán Ó Briain',
    email: 'sean.obriain@housing.gov.ie',
    access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: true, unitIds: [], unitNames: [] }],
    addedAt: '2024-01-15',
    addedBy: 'Marie O\'Sullivan'
  },
  {
    id: 'user-2',
    name: 'Aoife Ní Chonchúir',
    email: 'aoife.nichonchuir@housing.gov.ie',
    access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-1', 'unit-2'], unitNames: ['Cork City Council', 'Dublin City Council'] }],
    addedAt: '2024-02-01',
    addedBy: 'Marie O\'Sullivan'
  },
  {
    id: 'user-3',
    name: 'Ciarán Mac Carthaigh',
    email: 'ciaran.maccarthaigh@education.gov.ie',
    access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: true, unitIds: [], unitNames: [] }],
    addedAt: '2024-01-20',
    addedBy: 'Sinead Kelly'
  },
  {
    id: 'user-4',
    name: 'Niamh Ní Dhomhnaill',
    email: 'niamh.nidhomhnaill@education.gov.ie',
    access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-7'], unitNames: ['Primary Schools Division'] }],
    addedAt: '2024-02-10',
    addedBy: 'Sinead Kelly'
  },
  {
    id: 'user-5',
    name: 'Pádraig Ó Suilleabháin',
    email: 'padraig.osuilleabhain@health.gov.ie',
    access: [
      { departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-11', 'unit-12'], unitNames: ['HSE Dublin', 'HSE Cork'] },
      { departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-3'], unitNames: ['Galway County Council'] }
    ],
    addedAt: '2024-01-25',
    addedBy: 'Aoife Brennan'
  },
  {
    id: 'user-6',
    name: 'Máire Ní Bhriain',
    email: 'maire.nibhriain@dsp.gov.ie',
    access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: true, unitIds: [], unitNames: [] }],
    addedAt: '2024-02-05',
    addedBy: 'Declan Walsh'
  },
  {
    id: 'user-7',
    name: 'Eoin Mac Aoidh',
    email: 'eoin.macaoidh@health.gov.ie',
    access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-13'], unitNames: ['HSE Galway'] }],
    addedAt: '2024-03-01',
    addedBy: 'Aoife Brennan'
  },
  {
    id: 'user-8',
    name: 'Síle Ní Mhurchú',
    email: 'sile.nimhurchu@housing.gov.ie',
    access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-4', 'unit-5', 'unit-6'], unitNames: ['Kilkenny County Council', 'Limerick City and County Council', 'Waterford City and County Council'] }],
    addedAt: '2024-03-15',
    addedBy: 'Patrick Murphy'
  },
  {
    id: 'user-9',
    name: 'Tadhg Ó Ceallaigh',
    email: 'tadhg.oceallaigh@dete.gov.ie',
    access: [{ departmentId: 'dept-5', departmentName: 'Enterprise, Trade and Employment', fullDepartment: true, unitIds: [], unitNames: [] }],
    addedAt: '2024-01-18',
    addedBy: 'Marie O\'Sullivan'
  },
  {
    id: 'user-10',
    name: 'Gráinne Ní Fhloinn',
    email: 'grainne.nifhloinn@agriculture.gov.ie',
    access: [{ departmentId: 'dept-6', departmentName: 'Agriculture, Food and the Marine', fullDepartment: true, unitIds: [], unitNames: [] }],
    addedAt: '2024-02-20',
    addedBy: 'Patrick Murphy'
  },
];

// Mock Activity Logs
export const activityLogs: ActivityLog[] = [
  { id: 'log-1', action: 'user_invited', description: 'Invited Seán Ó Briain to the platform', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-15T09:30:00Z', targetType: 'user', targetName: 'Seán Ó Briain' },
  { id: 'log-2', action: 'access_granted', description: 'Granted full access to Housing department', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-15T09:31:00Z', targetType: 'user', targetName: 'Seán Ó Briain', metadata: { department: 'Housing, Local Government and Heritage' } },
  { id: 'log-3', action: 'unit_created', description: 'Created Cork City Council unit', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-15T10:00:00Z', targetType: 'unit', targetName: 'Cork City Council', metadata: { department: 'Housing, Local Government and Heritage' } },
  { id: 'log-4', action: 'unit_created', description: 'Created Dublin City Council unit', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-15T10:05:00Z', targetType: 'unit', targetName: 'Dublin City Council', metadata: { department: 'Housing, Local Government and Heritage' } },
  { id: 'log-5', action: 'user_invited', description: 'Invited Aoife Ní Chonchúir to the platform', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-02-01T11:00:00Z', targetType: 'user', targetName: 'Aoife Ní Chonchúir' },
  { id: 'log-6', action: 'access_granted', description: 'Granted access to Cork City Council and Dublin City Council', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-02-01T11:01:00Z', targetType: 'user', targetName: 'Aoife Ní Chonchúir', metadata: { units: 'Cork City Council, Dublin City Council' } },
  { id: 'log-7', action: 'unit_renamed', description: 'Renamed unit from "Galway City Council" to "Galway County Council"', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@ogcio.gov.ie', timestamp: '2024-02-20T14:30:00Z', targetType: 'unit', targetName: 'Galway County Council', metadata: { previousName: 'Galway City Council' } },
  { id: 'log-8', action: 'whitelist_added', description: 'Added gov.ie domain to whitelist', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-10T08:00:00Z', targetType: 'whitelist', targetName: 'gov.ie' },
  { id: 'log-9', action: 'admin_invited', description: 'Invited Patrick Murphy as admin', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-12T09:00:00Z', targetType: 'admin', targetName: 'Patrick Murphy' },
  { id: 'log-10', action: 'access_revoked', description: 'Revoked access from Limerick City and County Council', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@ogcio.gov.ie', timestamp: '2024-03-20T16:00:00Z', targetType: 'user', targetName: 'John Doe', metadata: { unit: 'Limerick City and County Council' } },
];

// Mock Admins
export const admins: Admin[] = [
  { id: 'admin-1', name: 'Marie O\'Sullivan', email: 'marie.osullivan@ogcio.gov.ie', role: 'super_admin', addedAt: '2024-01-01', addedBy: 'System' },
  { id: 'admin-2', name: 'Patrick Murphy', email: 'patrick.murphy@ogcio.gov.ie', role: 'admin', addedAt: '2024-01-12', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-3', name: 'Sinead Kelly', email: 'sinead.kelly@ogcio.gov.ie', role: 'admin', addedAt: '2024-01-15', addedBy: 'Marie O\'Sullivan' },
];

// Mock Whitelisted Domains
export const whitelistedDomains: WhitelistedDomain[] = [
  { id: 'wl-1', domain: 'gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-2', domain: 'housing.gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-3', domain: 'education.gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-4', domain: 'health.gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-5', domain: 'dsp.gov.ie', addedAt: '2024-01-15', addedBy: 'Patrick Murphy' },
  { id: 'wl-6', domain: 'agriculture.gov.ie', addedAt: '2024-01-20', addedBy: 'Patrick Murphy' },
];

// Current user (mock - for demo purposes)
export const currentUser: Admin = admins[0]; // Super admin by default

// Helper functions
export function getDepartmentById(id: string): Department | undefined {
  return departments.find(d => d.id === id);
}

export function getUnitsByDepartmentId(departmentId: string): Unit[] {
  return units.filter(u => u.departmentId === departmentId);
}

export function getUsersByUnitId(unitId: string): User[] {
  return users.filter(u => 
    u.access.some(a => a.unitIds.includes(unitId))
  );
}

export function getUsersByDepartmentId(departmentId: string): User[] {
  return users.filter(u => 
    u.access.some(a => a.departmentId === departmentId)
  );
}

export function getUserActivityLogs(userId: string): ActivityLog[] {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  return activityLogs.filter(log => 
    log.targetType === 'user' && log.targetName === user.name
  );
}
