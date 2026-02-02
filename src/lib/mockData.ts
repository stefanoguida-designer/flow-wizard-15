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
  acronym?: string;
  departmentId: string;
  departmentName: string;
  usersCount: number;
  createdAt: string;
  createdBy: string;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface UnitRoleAccess {
  unitId: string;
  unitName: string;
  role: UserRole;
}

export interface UserAccess {
  departmentId: string;
  departmentName: string;
  fullDepartment: boolean;
  fullDepartmentRole?: UserRole; // Role when fullDepartment is true
  unitAccess: UnitRoleAccess[]; // Individual unit access with roles
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
  action: 'user_invited' | 'user_removed' | 'unit_created' | 'unit_renamed' | 'unit_deleted' | 'access_granted' | 'access_revoked' | 'admin_invited' | 'admin_removed' | 'allowlist_added' | 'allowlist_removed';
  description: string;
  performedBy: string;
  performedByEmail: string;
  timestamp: string;
  targetType: 'user' | 'unit' | 'department' | 'admin' | 'allowlist';
  targetName: string;
  metadata?: Record<string, string>;
}

export type AdminRole = 'admin' | 'super_admin' | 'read_only';

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'active' | 'disabled';
  addedAt: string;
  addedBy: string;
}

export interface AllowListedDomain {
  id: string;
  domain: string;
  name: string;
  departmentIds: string[];
  addedAt: string;
  addedBy: string;
}

// Mock Departments (Irish Government Departments - 20+ departments)
export const departments: Department[] = [
  { id: 'dept-1', name: 'Housing, Local Government and Heritage', abbreviation: 'DHLGH', unitsCount: 12, usersCount: 45 },
  { id: 'dept-2', name: 'Education', abbreviation: 'DE', unitsCount: 10, usersCount: 32 },
  { id: 'dept-3', name: 'Health', abbreviation: 'DoH', unitsCount: 15, usersCount: 67 },
  { id: 'dept-4', name: 'Social Protection', abbreviation: 'DSP', unitsCount: 10, usersCount: 38 },
  { id: 'dept-5', name: 'Enterprise, Trade and Employment', abbreviation: 'DETE', unitsCount: 0, usersCount: 24 },
  { id: 'dept-6', name: 'Agriculture, Food and the Marine', abbreviation: 'DAFM', unitsCount: 0, usersCount: 29 },
  { id: 'dept-7', name: 'Transport', abbreviation: 'DoT', unitsCount: 0, usersCount: 18 },
  { id: 'dept-8', name: 'Environment, Climate and Communications', abbreviation: 'DECC', unitsCount: 0, usersCount: 22 },
  { id: 'dept-9', name: 'Justice', abbreviation: 'DoJ', unitsCount: 11, usersCount: 41 },
  { id: 'dept-10', name: 'Finance', abbreviation: 'DoF', unitsCount: 0, usersCount: 15 },
  { id: 'dept-11', name: 'Public Expenditure, NDP Delivery and Reform', abbreviation: 'DPENDPR', unitsCount: 0, usersCount: 12 },
  { id: 'dept-12', name: 'Foreign Affairs', abbreviation: 'DFA', unitsCount: 0, usersCount: 18 },
  { id: 'dept-13', name: 'Defence', abbreviation: 'DoD', unitsCount: 0, usersCount: 14 },
  { id: 'dept-14', name: 'Tourism, Culture, Arts, Gaeltacht, Sport and Media', abbreviation: 'DTCAGSM', unitsCount: 0, usersCount: 20 },
  { id: 'dept-15', name: 'Children, Equality, Disability, Integration and Youth', abbreviation: 'DCEDIY', unitsCount: 0, usersCount: 25 },
  { id: 'dept-16', name: 'Rural and Community Development', abbreviation: 'DRCD', unitsCount: 0, usersCount: 16 },
  { id: 'dept-17', name: 'Further and Higher Education, Research, Innovation and Science', abbreviation: 'DFHERIS', unitsCount: 0, usersCount: 19 },
  { id: 'dept-18', name: 'An Taoiseach', abbreviation: 'TAOIS', unitsCount: 0, usersCount: 8 },
  { id: 'dept-19', name: 'Office of the Revenue Commissioners', abbreviation: 'REVENUE', unitsCount: 0, usersCount: 35 },
  { id: 'dept-20', name: 'Office of Public Works', abbreviation: 'OPW', unitsCount: 0, usersCount: 22 },
];

// Mock Units per Department (5 departments with 10+ units each)
export const units: Unit[] = [
  // Housing Department - 12 units (Local Authorities)
  { id: 'unit-1', name: 'Cork City Council', acronym: 'CCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 4, createdAt: '2024-01-15', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-2', name: 'Dublin City Council', acronym: 'DCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 5, createdAt: '2024-01-15', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-3', name: 'Galway County Council', acronym: 'GCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-4', name: 'Kilkenny County Council', acronym: 'KCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-5', name: 'Limerick City and County Council', acronym: 'LCCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-6', name: 'Waterford City and County Council', acronym: 'WCCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-7', name: 'Fingal County Council', acronym: 'FCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 4, createdAt: '2024-03-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-8', name: 'South Dublin County Council', acronym: 'SDCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-03-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-9', name: 'Dún Laoghaire-Rathdown County Council', acronym: 'DLRCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-03-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-10', name: 'Kerry County Council', acronym: 'KeCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-04-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-11', name: 'Mayo County Council', acronym: 'MCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-04-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-12', name: 'Wexford County Council', acronym: 'WeCC', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-04-05', createdBy: 'Patrick Murphy' },
  
  // Education Department - 10 units
  { id: 'unit-13', name: 'Primary Schools Division', acronym: 'PSD', departmentId: 'dept-2', departmentName: 'Education', usersCount: 4, createdAt: '2024-01-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-14', name: 'Secondary Schools Division', acronym: 'SSD', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-01-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-15', name: 'Higher Education Division', acronym: 'HED', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-16', name: 'Special Education Division', acronym: 'SED', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-02-15', createdBy: 'Sinead Kelly' },
  { id: 'unit-17', name: 'Teacher Education Section', acronym: 'TES', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-18', name: 'Curriculum and Assessment Policy', acronym: 'CAP', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-03-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-19', name: 'School Transport Section', acronym: 'STS', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-03-10', createdBy: 'Patrick Murphy' },
  { id: 'unit-20', name: 'Statistics Section', acronym: 'SS', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-03-15', createdBy: 'Sinead Kelly' },
  { id: 'unit-21', name: 'International Section', acronym: 'IS', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-03-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-22', name: 'ICT Policy Unit', acronym: 'ICTPU', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-04-01', createdBy: 'Patrick Murphy' },
  
  // Health Department - 15 units
  { id: 'unit-23', name: 'HSE Dublin North', acronym: 'HSEDN', departmentId: 'dept-3', departmentName: 'Health', usersCount: 5, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-24', name: 'HSE Dublin South', acronym: 'HSEDS', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-25', name: 'HSE Cork', acronym: 'HSEC', departmentId: 'dept-3', departmentName: 'Health', usersCount: 5, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-26', name: 'HSE Galway', acronym: 'HSEG', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-01-20', createdBy: 'Aoife Brennan' },
  { id: 'unit-27', name: 'HSE Limerick', acronym: 'HSEL', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Declan Walsh' },
  { id: 'unit-28', name: 'HSE Waterford', acronym: 'HSEW', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-02-10', createdBy: 'Declan Walsh' },
  { id: 'unit-29', name: 'HSE Kerry', acronym: 'HSEKe', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-02-15', createdBy: 'Aoife Brennan' },
  { id: 'unit-30', name: 'HSE Sligo', acronym: 'HSES', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-02-20', createdBy: 'Aoife Brennan' },
  { id: 'unit-31', name: 'HSE Donegal', acronym: 'HSEDo', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-03-01', createdBy: 'Declan Walsh' },
  { id: 'unit-32', name: 'HSE Mayo', acronym: 'HSEM', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-03-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-33', name: 'Mental Health Division', acronym: 'MHD', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-03-10', createdBy: 'Declan Walsh' },
  { id: 'unit-34', name: 'Primary Care Division', acronym: 'PCD', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-03-15', createdBy: 'Aoife Brennan' },
  { id: 'unit-35', name: 'Acute Hospitals Division', acronym: 'AHD', departmentId: 'dept-3', departmentName: 'Health', usersCount: 5, createdAt: '2024-03-20', createdBy: 'Declan Walsh' },
  { id: 'unit-36', name: 'Community Healthcare Division', acronym: 'CHD', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-04-01', createdBy: 'Aoife Brennan' },
  { id: 'unit-37', name: 'National Ambulance Service', acronym: 'NAS', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-04-05', createdBy: 'Declan Walsh' },
  
  // Social Protection - 10 units
  { id: 'unit-38', name: 'Employment Services', acronym: 'ES', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 4, createdAt: '2024-01-12', createdBy: 'Declan Walsh' },
  { id: 'unit-39', name: 'Community Welfare', acronym: 'CW', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-01-12', createdBy: 'Declan Walsh' },
  { id: 'unit-40', name: 'Pensions Division', acronym: 'PD', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Declan Walsh' },
  { id: 'unit-41', name: 'Child Benefit Section', acronym: 'CBS', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-02-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-42', name: 'Disability Services', acronym: 'DS', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-02-15', createdBy: 'Declan Walsh' },
  { id: 'unit-43', name: 'Jobseeker Services', acronym: 'JS', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 4, createdAt: '2024-02-20', createdBy: 'Sinead Kelly' },
  { id: 'unit-44', name: 'Carers Section', acronym: 'CS', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 2, createdAt: '2024-03-01', createdBy: 'Declan Walsh' },
  { id: 'unit-45', name: 'Maternity Benefit Section', acronym: 'MBS', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 2, createdAt: '2024-03-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-46', name: 'PRSI Records', acronym: 'PRSIR', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-03-15', createdBy: 'Declan Walsh' },
  { id: 'unit-47', name: 'Appeals Office', acronym: 'AO', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-03-20', createdBy: 'Sinead Kelly' },
  
  // Justice - 11 units
  { id: 'unit-48', name: 'An Garda Síochána Liaison', acronym: 'AGSL', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 4, createdAt: '2024-01-08', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-49', name: 'Irish Prison Service', acronym: 'IPS', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-01-08', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-50', name: 'Courts Service', acronym: 'CoS', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 4, createdAt: '2024-01-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-51', name: 'Immigration Service', acronym: 'ImS', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 5, createdAt: '2024-01-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-52', name: 'Legal Aid Board', acronym: 'LAB', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Patrick Murphy' },
  { id: 'unit-53', name: 'Probation Service', acronym: 'PS', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-02-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-54', name: 'Data Protection Unit', acronym: 'DPU', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 2, createdAt: '2024-02-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-55', name: 'Crime Policy Division', acronym: 'CPD', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-02-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-56', name: 'Civil Law Reform', acronym: 'CLR', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 2, createdAt: '2024-03-01', createdBy: 'Patrick Murphy' },
  { id: 'unit-57', name: 'International Protection Office', acronym: 'IPO', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 4, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-58', name: 'Coroners Service', acronym: 'CorS', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 2, createdAt: '2024-03-15', createdBy: 'Patrick Murphy' },
];

// Irish first names and surnames for realistic data
const irishFirstNames = ['Seán', 'Aoife', 'Ciarán', 'Niamh', 'Pádraig', 'Máire', 'Eoin', 'Síle', 'Tadhg', 'Gráinne', 'Oisín', 'Siobhán', 'Cormac', 'Áine', 'Fionn', 'Caoimhe', 'Darragh', 'Róisín', 'Conor', 'Saoirse', 'Liam', 'Orla', 'Declan', 'Clodagh', 'Brendan', 'Maeve', 'Cathal', 'Eimear', 'Donal', 'Sorcha', 'Fergus', 'Deirdre', 'Colm', 'Aisling', 'Ruairí', 'Fionnuala', 'Diarmuid', 'Meadhbh', 'Tomás', 'Bríd'];
const irishSurnames = ['Ó Briain', 'Ní Chonchúir', 'Mac Carthaigh', 'Ní Dhomhnaill', 'Ó Suilleabháin', 'Ní Bhriain', 'Mac Aoidh', 'Ní Mhurchú', 'Ó Ceallaigh', 'Ní Fhloinn', 'Ó Néill', 'Ní Riain', 'Mac Giolla', 'Ní Shé', 'Ó Dónaill', 'Ní Cheallaigh', 'Ó Murchú', 'Ní Ghrádaigh', 'Ó Flannagáin', 'Ní Mhaoláin', 'Ó Raghallaigh', 'Ní Chonaill', 'Mac Suibhne', 'Ní Fhearghail', 'Ó hEachthairn', 'Ní Bhraonáin', 'Mac Lochlainn', 'Ní Dhuibhir', 'Ó Cathasaigh', 'Ní Chonghaile'];

function generateEmail(firstName: string, surname: string, domain: string): string {
  const cleanFirst = firstName.toLowerCase().replace(/[áéíóú]/g, c => ({á:'a',é:'e',í:'i',ó:'o',ú:'u'}[c] || c)).replace(/\s/g, '');
  const cleanSurname = surname.toLowerCase().replace(/[áéíóú]/g, c => ({á:'a',é:'e',í:'i',ó:'o',ú:'u'}[c] || c)).replace(/['\s]/g, '').replace(/^(ní|ó|mac)\s*/i, '');
  return `${cleanFirst}.${cleanSurname}@${domain}`;
}

// Generate 40+ users across departments
export const users: User[] = [
  // Housing Department users (10 users)
  { id: 'user-1', name: 'Seán Ó Briain', email: generateEmail('Seán', 'Ó Briain', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: true, fullDepartmentRole: 'admin', unitAccess: [] }], addedAt: '2024-01-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-2', name: 'Aoife Ní Chonchúir', email: generateEmail('Aoife', 'Ní Chonchúir', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-1', unitName: 'Cork City Council', role: 'editor' }, { unitId: 'unit-2', unitName: 'Dublin City Council', role: 'viewer' }] }], addedAt: '2024-02-01', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-3', name: 'Ciarán Mac Carthaigh', email: generateEmail('Ciarán', 'Mac Carthaigh', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-3', unitName: 'Galway County Council', role: 'viewer' }, { unitId: 'unit-4', unitName: 'Kilkenny County Council', role: 'editor' }, { unitId: 'unit-5', unitName: 'Limerick City and County Council', role: 'admin' }] }], addedAt: '2024-02-10', addedBy: 'Patrick Murphy' },
  { id: 'user-4', name: 'Niamh Ní Dhomhnaill', email: generateEmail('Niamh', 'Ní Dhomhnaill', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-6', unitName: 'Waterford City and County Council', role: 'editor' }, { unitId: 'unit-7', unitName: 'Fingal County Council', role: 'viewer' }] }], addedAt: '2024-02-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-5', name: 'Pádraig Ó Suilleabháin', email: generateEmail('Pádraig', 'Ó Suilleabháin', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-8', unitName: 'South Dublin County Council', role: 'admin' }] }], addedAt: '2024-03-01', addedBy: 'Patrick Murphy' },
  { id: 'user-6', name: 'Máire Ní Bhriain', email: generateEmail('Máire', 'Ní Bhriain', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-9', unitName: 'Dún Laoghaire-Rathdown County Council', role: 'viewer' }, { unitId: 'unit-10', unitName: 'Kerry County Council', role: 'editor' }] }], addedAt: '2024-03-10', addedBy: 'Sinead Kelly' },
  { id: 'user-7', name: 'Eoin Mac Aoidh', email: generateEmail('Eoin', 'Mac Aoidh', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-11', unitName: 'Mayo County Council', role: 'editor' }] }], addedAt: '2024-03-15', addedBy: 'Patrick Murphy' },
  { id: 'user-8', name: 'Síle Ní Mhurchú', email: generateEmail('Síle', 'Ní Mhurchú', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-12', unitName: 'Wexford County Council', role: 'viewer' }] }], addedAt: '2024-03-20', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-9', name: 'Tadhg Ó Ceallaigh', email: generateEmail('Tadhg', 'Ó Ceallaigh', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-1', unitName: 'Cork City Council', role: 'admin' }, { unitId: 'unit-5', unitName: 'Limerick City and County Council', role: 'viewer' }] }], addedAt: '2024-04-01', addedBy: 'Sinead Kelly' },
  { id: 'user-10', name: 'Gráinne Ní Fhloinn', email: generateEmail('Gráinne', 'Ní Fhloinn', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitAccess: [{ unitId: 'unit-2', unitName: 'Dublin City Council', role: 'editor' }, { unitId: 'unit-7', unitName: 'Fingal County Council', role: 'admin' }] }], addedAt: '2024-04-05', addedBy: 'Patrick Murphy' },
  
  // Education Department users (8 users)
  { id: 'user-11', name: 'Oisín Ó Néill', email: generateEmail('Oisín', 'Ó Néill', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: true, fullDepartmentRole: 'viewer', unitAccess: [] }], addedAt: '2024-01-20', addedBy: 'Sinead Kelly' },
  { id: 'user-12', name: 'Siobhán Ní Riain', email: generateEmail('Siobhán', 'Ní Riain', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-13', unitName: 'Primary Schools Division', role: 'editor' }, { unitId: 'unit-14', unitName: 'Secondary Schools Division', role: 'admin' }] }], addedAt: '2024-02-05', addedBy: 'Patrick Murphy' },
  { id: 'user-13', name: 'Cormac Mac Giolla', email: generateEmail('Cormac', 'Mac Giolla', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-15', unitName: 'Higher Education Division', role: 'viewer' }] }], addedAt: '2024-02-15', addedBy: 'Sinead Kelly' },
  { id: 'user-14', name: 'Áine Ní Shé', email: generateEmail('Áine', 'Ní Shé', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-16', unitName: 'Special Education Division', role: 'editor' }, { unitId: 'unit-17', unitName: 'Teacher Education Section', role: 'viewer' }] }], addedAt: '2024-02-25', addedBy: 'Patrick Murphy' },
  { id: 'user-15', name: 'Fionn Ó Dónaill', email: generateEmail('Fionn', 'Ó Dónaill', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-18', unitName: 'Curriculum and Assessment Policy', role: 'admin' }] }], addedAt: '2024-03-05', addedBy: 'Sinead Kelly' },
  { id: 'user-16', name: 'Caoimhe Ní Cheallaigh', email: generateEmail('Caoimhe', 'Ní Cheallaigh', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-19', unitName: 'School Transport Section', role: 'viewer' }, { unitId: 'unit-20', unitName: 'Statistics Section', role: 'editor' }] }], addedAt: '2024-03-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-17', name: 'Darragh Ó Murchú', email: generateEmail('Darragh', 'Ó Murchú', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-21', unitName: 'International Section', role: 'editor' }] }], addedAt: '2024-03-25', addedBy: 'Patrick Murphy' },
  { id: 'user-18', name: 'Róisín Ní Ghrádaigh', email: generateEmail('Róisín', 'Ní Ghrádaigh', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitAccess: [{ unitId: 'unit-22', unitName: 'ICT Policy Unit', role: 'admin' }] }], addedAt: '2024-04-01', addedBy: 'Sinead Kelly' },
  
  // Health Department users (12 users)
  { id: 'user-19', name: 'Conor Ó Flannagáin', email: generateEmail('Conor', 'Ó Flannagáin', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: true, fullDepartmentRole: 'editor', unitAccess: [] }], addedAt: '2024-01-10', addedBy: 'Aoife Brennan' },
  { id: 'user-20', name: 'Saoirse Ní Mhaoláin', email: generateEmail('Saoirse', 'Ní Mhaoláin', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-23', unitName: 'HSE Dublin North', role: 'viewer' }, { unitId: 'unit-24', unitName: 'HSE Dublin South', role: 'editor' }] }], addedAt: '2024-01-20', addedBy: 'Declan Walsh' },
  { id: 'user-21', name: 'Liam Ó Raghallaigh', email: generateEmail('Liam', 'Ó Raghallaigh', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-25', unitName: 'HSE Cork', role: 'admin' }] }], addedAt: '2024-02-01', addedBy: 'Aoife Brennan' },
  { id: 'user-22', name: 'Orla Ní Chonaill', email: generateEmail('Orla', 'Ní Chonaill', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-26', unitName: 'HSE Galway', role: 'editor' }, { unitId: 'unit-27', unitName: 'HSE Limerick', role: 'viewer' }] }], addedAt: '2024-02-10', addedBy: 'Declan Walsh' },
  { id: 'user-23', name: 'Declan Mac Suibhne', email: generateEmail('Declan', 'Mac Suibhne', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-28', unitName: 'HSE Waterford', role: 'admin' }] }], addedAt: '2024-02-20', addedBy: 'Aoife Brennan' },
  { id: 'user-24', name: 'Clodagh Ní Fhearghail', email: generateEmail('Clodagh', 'Ní Fhearghail', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-29', unitName: 'HSE Kerry', role: 'viewer' }, { unitId: 'unit-30', unitName: 'HSE Sligo', role: 'editor' }] }], addedAt: '2024-03-01', addedBy: 'Declan Walsh' },
  { id: 'user-25', name: 'Brendan Ó hEachthairn', email: generateEmail('Brendan', 'Ó hEachthairn', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-31', unitName: 'HSE Donegal', role: 'editor' }] }], addedAt: '2024-03-10', addedBy: 'Aoife Brennan' },
  { id: 'user-26', name: 'Maeve Ní Bhraonáin', email: generateEmail('Maeve', 'Ní Bhraonáin', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-32', unitName: 'HSE Mayo', role: 'admin' }] }], addedAt: '2024-03-15', addedBy: 'Declan Walsh' },
  { id: 'user-27', name: 'Cathal Mac Lochlainn', email: generateEmail('Cathal', 'Mac Lochlainn', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-33', unitName: 'Mental Health Division', role: 'viewer' }, { unitId: 'unit-34', unitName: 'Primary Care Division', role: 'editor' }] }], addedAt: '2024-03-25', addedBy: 'Aoife Brennan' },
  { id: 'user-28', name: 'Eimear Ní Dhuibhir', email: generateEmail('Eimear', 'Ní Dhuibhir', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-35', unitName: 'Acute Hospitals Division', role: 'admin' }] }], addedAt: '2024-04-01', addedBy: 'Declan Walsh' },
  { id: 'user-29', name: 'Donal Ó Cathasaigh', email: generateEmail('Donal', 'Ó Cathasaigh', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-36', unitName: 'Community Healthcare Division', role: 'editor' }] }], addedAt: '2024-04-05', addedBy: 'Aoife Brennan' },
  { id: 'user-30', name: 'Sorcha Ní Chonghaile', email: generateEmail('Sorcha', 'Ní Chonghaile', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitAccess: [{ unitId: 'unit-37', unitName: 'National Ambulance Service', role: 'viewer' }] }], addedAt: '2024-04-10', addedBy: 'Declan Walsh' },
  
  // Social Protection users (8 users)
  { id: 'user-31', name: 'Fergus Ó Briain', email: generateEmail('Fergus', 'Ó Briain', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: true, fullDepartmentRole: 'admin', unitAccess: [] }], addedAt: '2024-01-25', addedBy: 'Declan Walsh' },
  { id: 'user-32', name: 'Deirdre Ní Dhomhnaill', email: generateEmail('Deirdre', 'Ní Dhomhnaill', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-38', unitName: 'Employment Services', role: 'editor' }, { unitId: 'unit-39', unitName: 'Community Welfare', role: 'viewer' }] }], addedAt: '2024-02-05', addedBy: 'Sinead Kelly' },
  { id: 'user-33', name: 'Colm Mac Carthaigh', email: generateEmail('Colm', 'Mac Carthaigh', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-40', unitName: 'Pensions Division', role: 'admin' }] }], addedAt: '2024-02-15', addedBy: 'Declan Walsh' },
  { id: 'user-34', name: 'Aisling Ní Suilleabháin', email: generateEmail('Aisling', 'Ní Suilleabháin', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-41', unitName: 'Child Benefit Section', role: 'editor' }, { unitId: 'unit-42', unitName: 'Disability Services', role: 'viewer' }] }], addedAt: '2024-02-25', addedBy: 'Sinead Kelly' },
  { id: 'user-35', name: 'Ruairí Ó Néill', email: generateEmail('Ruairí', 'Ó Néill', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-43', unitName: 'Jobseeker Services', role: 'admin' }] }], addedAt: '2024-03-05', addedBy: 'Declan Walsh' },
  { id: 'user-36', name: 'Fionnuala Ní Riain', email: generateEmail('Fionnuala', 'Ní Riain', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-44', unitName: 'Carers Section', role: 'viewer' }] }], addedAt: '2024-03-15', addedBy: 'Sinead Kelly' },
  { id: 'user-37', name: 'Diarmuid Mac Giolla', email: generateEmail('Diarmuid', 'Mac Giolla', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-45', unitName: 'Maternity Benefit Section', role: 'editor' }, { unitId: 'unit-46', unitName: 'PRSI Records', role: 'admin' }] }], addedAt: '2024-03-25', addedBy: 'Declan Walsh' },
  { id: 'user-38', name: 'Meadhbh Ní Shé', email: generateEmail('Meadhbh', 'Ní Shé', 'welfare.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitAccess: [{ unitId: 'unit-47', unitName: 'Appeals Office', role: 'viewer' }] }], addedAt: '2024-04-05', addedBy: 'Sinead Kelly' },
  
  // Justice Department users (6 users)
  { id: 'user-39', name: 'Tomás Ó Dónaill', email: generateEmail('Tomás', 'Ó Dónaill', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: true, fullDepartmentRole: 'viewer', unitAccess: [] }], addedAt: '2024-01-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-40', name: 'Bríd Ní Cheallaigh', email: generateEmail('Bríd', 'Ní Cheallaigh', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitAccess: [{ unitId: 'unit-48', unitName: 'An Garda Síochána Liaison', role: 'editor' }, { unitId: 'unit-49', unitName: 'Irish Prison Service', role: 'admin' }] }], addedAt: '2024-02-01', addedBy: 'Patrick Murphy' },
  { id: 'user-41', name: 'Seán Ó Murchú', email: generateEmail('Seán', 'Ó Murchú', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitAccess: [{ unitId: 'unit-50', unitName: 'Courts Service', role: 'viewer' }] }], addedAt: '2024-02-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-42', name: 'Aoife Ní Ghrádaigh', email: generateEmail('Aoife', 'Ní Ghrádaigh', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitAccess: [{ unitId: 'unit-51', unitName: 'Immigration Service', role: 'editor' }, { unitId: 'unit-52', unitName: 'Legal Aid Board', role: 'viewer' }] }], addedAt: '2024-03-01', addedBy: 'Patrick Murphy' },
  { id: 'user-43', name: 'Ciarán Ó Flannagáin', email: generateEmail('Ciarán', 'Ó Flannagáin', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitAccess: [{ unitId: 'unit-53', unitName: 'Probation Service', role: 'admin' }] }], addedAt: '2024-03-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-44', name: 'Niamh Ní Mhaoláin', email: generateEmail('Niamh', 'Ní Mhaoláin', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitAccess: [{ unitId: 'unit-54', unitName: 'Data Protection Unit', role: 'viewer' }, { unitId: 'unit-55', unitName: 'Crime Policy Division', role: 'editor' }] }], addedAt: '2024-04-01', addedBy: 'Patrick Murphy' },
];

// Helper functions
export function getDepartmentById(id: string): Department | undefined {
  return departments.find(d => d.id === id);
}

export function getUnitsByDepartmentId(departmentId: string): Unit[] {
  return units.filter(u => u.departmentId === departmentId);
}

export function getUsersByDepartmentId(departmentId: string): User[] {
  return users.filter(u => u.access.some(a => a.departmentId === departmentId));
}

export function getUsersByUnitId(unitId: string): User[] {
  return users.filter(u => 
    u.access.some(a => 
      a.unitAccess.some(ua => ua.unitId === unitId)
    )
  );
}

// Activity logs - with realistic timestamps over 3 months
export const activityLogs: ActivityLog[] = [
  { id: 'log-1', action: 'user_invited', description: 'Invited Seán Ó Briain to Housing, Local Government and Heritage with full access', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-15T09:30:00', targetType: 'user', targetName: 'Seán Ó Briain' },
  { id: 'log-2', action: 'unit_created', description: 'Created unit "Cork City Council" in Housing, Local Government and Heritage', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-15T10:15:00', targetType: 'unit', targetName: 'Cork City Council' },
  { id: 'log-3', action: 'unit_created', description: 'Created unit "Dublin City Council" in Housing, Local Government and Heritage', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-15T10:20:00', targetType: 'unit', targetName: 'Dublin City Council' },
  { id: 'log-4', action: 'user_invited', description: 'Invited Oisín Ó Néill to Education with full access', performedBy: 'Sinead Kelly', performedByEmail: 'sinead.kelly@gov.ie', timestamp: '2024-01-20T14:00:00', targetType: 'user', targetName: 'Oisín Ó Néill' },
  { id: 'log-5', action: 'admin_invited', description: 'Added Patrick Murphy as Admin', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-22T11:30:00', targetType: 'admin', targetName: 'Patrick Murphy' },
  { id: 'log-6', action: 'allowlist_added', description: 'Added domain "housing.gov.ie" to allow list', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-10T09:00:00', targetType: 'allowlist', targetName: 'housing.gov.ie' },
  { id: 'log-7', action: 'user_invited', description: 'Invited Aoife Ní Chonchúir to Housing with access to Cork City Council, Dublin City Council', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-02-01T10:00:00', targetType: 'user', targetName: 'Aoife Ní Chonchúir' },
  { id: 'log-8', action: 'unit_created', description: 'Created unit "Primary Schools Division" in Education', performedBy: 'Sinead Kelly', performedByEmail: 'sinead.kelly@gov.ie', timestamp: '2024-01-10T15:00:00', targetType: 'unit', targetName: 'Primary Schools Division' },
  { id: 'log-9', action: 'access_granted', description: 'Granted Siobhán Ní Riain access to Primary Schools Division, Secondary Schools Division', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@gov.ie', timestamp: '2024-02-05T09:45:00', targetType: 'user', targetName: 'Siobhán Ní Riain' },
  { id: 'log-10', action: 'user_invited', description: 'Invited Ciarán Mac Carthaigh with access to multiple units in Housing', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@gov.ie', timestamp: '2024-02-10T11:00:00', targetType: 'user', targetName: 'Ciarán Mac Carthaigh' },
  { id: 'log-11', action: 'unit_renamed', description: 'Renamed "HSE Dublin" to "HSE Dublin North"', performedBy: 'Aoife Brennan', performedByEmail: 'aoife.brennan@gov.ie', timestamp: '2024-02-12T14:30:00', targetType: 'unit', targetName: 'HSE Dublin North' },
  { id: 'log-12', action: 'user_invited', description: 'Invited Conor Ó Flannagáin to Health with full access', performedBy: 'Aoife Brennan', performedByEmail: 'aoife.brennan@gov.ie', timestamp: '2024-01-10T10:30:00', targetType: 'user', targetName: 'Conor Ó Flannagáin' },
  { id: 'log-13', action: 'access_revoked', description: 'Revoked access to HSE Kerry from Brendan Ó hEachthairn', performedBy: 'Declan Walsh', performedByEmail: 'declan.walsh@gov.ie', timestamp: '2024-03-05T16:00:00', targetType: 'user', targetName: 'Brendan Ó hEachthairn' },
  { id: 'log-14', action: 'unit_deleted', description: 'Deleted unit "Temporary Project Unit" from Social Protection', performedBy: 'Declan Walsh', performedByEmail: 'declan.walsh@gov.ie', timestamp: '2024-03-08T09:15:00', targetType: 'unit', targetName: 'Temporary Project Unit' },
  { id: 'log-15', action: 'admin_removed', description: 'Removed admin access for John Doe', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-03-10T11:45:00', targetType: 'admin', targetName: 'John Doe' },
  { id: 'log-16', action: 'allowlist_added', description: 'Added domain "education.gov.ie" to allow list', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-08T14:00:00', targetType: 'allowlist', targetName: 'education.gov.ie' },
  { id: 'log-17', action: 'user_invited', description: 'Invited Fergus Ó Briain to Social Protection with full access', performedBy: 'Declan Walsh', performedByEmail: 'declan.walsh@gov.ie', timestamp: '2024-01-25T10:00:00', targetType: 'user', targetName: 'Fergus Ó Briain' },
  { id: 'log-18', action: 'user_invited', description: 'Invited Tomás Ó Dónaill to Justice with full access', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-01-15T15:30:00', targetType: 'user', targetName: 'Tomás Ó Dónaill' },
  { id: 'log-19', action: 'access_granted', description: 'Granted Bríd Ní Cheallaigh access to An Garda Síochána Liaison, Irish Prison Service', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@gov.ie', timestamp: '2024-02-01T14:15:00', targetType: 'user', targetName: 'Bríd Ní Cheallaigh' },
  { id: 'log-20', action: 'allowlist_removed', description: 'Removed domain "temp-contractor.ie" from allow list', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@gov.ie', timestamp: '2024-03-15T09:30:00', targetType: 'allowlist', targetName: 'temp-contractor.ie' },
];

// Get activity logs for a specific user
export function getUserActivityLogs(userId: string): ActivityLog[] {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  
  return activityLogs.filter(log => 
    log.targetName === user.name || 
    log.description.includes(user.name)
  );
}

// Admins data
export const admins: Admin[] = [
  { id: 'admin-1', name: 'Marie O\'Sullivan', email: 'marie.osullivan@gov.ie', role: 'super_admin', status: 'active', addedAt: '2023-06-15', addedBy: 'System' },
  { id: 'admin-2', name: 'Patrick Murphy', email: 'patrick.murphy@gov.ie', role: 'admin', status: 'active', addedAt: '2024-01-22', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-3', name: 'Sinead Kelly', email: 'sinead.kelly@gov.ie', role: 'admin', status: 'active', addedAt: '2024-02-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-4', name: 'Aoife Brennan', email: 'aoife.brennan@gov.ie', role: 'super_admin', status: 'active', addedAt: '2023-08-01', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-5', name: 'Declan Walsh', email: 'declan.walsh@gov.ie', role: 'admin', status: 'disabled', addedAt: '2024-03-01', addedBy: 'Aoife Brennan' },
  { id: 'admin-6', name: 'Éanna Ó Faoláin', email: 'eanna.ofaolain@gov.ie', role: 'read_only', status: 'active', addedAt: '2024-04-01', addedBy: 'Marie O\'Sullivan' },
];

// Allow listed domains with department associations
export const allowListedDomains: AllowListedDomain[] = [
  { id: 'wl-1', domain: 'housing.gov.ie', name: 'Housing Department', departmentIds: ['dept-1'], addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-2', domain: 'education.gov.ie', name: 'Education Department', departmentIds: ['dept-2'], addedAt: '2024-01-08', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-3', domain: 'health.gov.ie', name: 'Health Services', departmentIds: ['dept-3'], addedAt: '2024-01-05', addedBy: 'Aoife Brennan' },
  { id: 'wl-4', domain: 'welfare.gov.ie', name: 'Social Welfare', departmentIds: ['dept-4'], addedAt: '2024-01-12', addedBy: 'Declan Walsh' },
  { id: 'wl-5', domain: 'justice.gov.ie', name: 'Justice Department', departmentIds: ['dept-9'], addedAt: '2024-01-08', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-6', domain: 'gov.ie', name: 'Government of Ireland', departmentIds: ['dept-1', 'dept-2', 'dept-3', 'dept-4', 'dept-5', 'dept-6', 'dept-7', 'dept-8', 'dept-9', 'dept-10'], addedAt: '2023-12-01', addedBy: 'Marie O\'Sullivan' },
];

// Current user (for profile dropdown)
export const currentUser = admins[0]; // Marie O'Sullivan - Super Admin
