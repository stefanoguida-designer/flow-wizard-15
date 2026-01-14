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
  { id: 'unit-1', name: 'Cork City Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 4, createdAt: '2024-01-15', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-2', name: 'Dublin City Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 5, createdAt: '2024-01-15', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-3', name: 'Galway County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-4', name: 'Kilkenny County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-5', name: 'Limerick City and County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-6', name: 'Waterford City and County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-7', name: 'Fingal County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 4, createdAt: '2024-03-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-8', name: 'South Dublin County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-03-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-9', name: 'Dún Laoghaire-Rathdown County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 3, createdAt: '2024-03-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-10', name: 'Kerry County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-04-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-11', name: 'Mayo County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-04-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-12', name: 'Wexford County Council', departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', usersCount: 2, createdAt: '2024-04-05', createdBy: 'Patrick Murphy' },
  
  // Education Department - 10 units
  { id: 'unit-13', name: 'Primary Schools Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 4, createdAt: '2024-01-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-14', name: 'Secondary Schools Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-01-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-15', name: 'Higher Education Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-16', name: 'Special Education Division', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-02-15', createdBy: 'Sinead Kelly' },
  { id: 'unit-17', name: 'Teacher Education Section', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-02-20', createdBy: 'Patrick Murphy' },
  { id: 'unit-18', name: 'Curriculum and Assessment Policy', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-03-01', createdBy: 'Sinead Kelly' },
  { id: 'unit-19', name: 'School Transport Section', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-03-10', createdBy: 'Patrick Murphy' },
  { id: 'unit-20', name: 'Statistics Section', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-03-15', createdBy: 'Sinead Kelly' },
  { id: 'unit-21', name: 'International Section', departmentId: 'dept-2', departmentName: 'Education', usersCount: 2, createdAt: '2024-03-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-22', name: 'ICT Policy Unit', departmentId: 'dept-2', departmentName: 'Education', usersCount: 3, createdAt: '2024-04-01', createdBy: 'Patrick Murphy' },
  
  // Health Department - 15 units
  { id: 'unit-23', name: 'HSE Dublin North', departmentId: 'dept-3', departmentName: 'Health', usersCount: 5, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-24', name: 'HSE Dublin South', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-25', name: 'HSE Cork', departmentId: 'dept-3', departmentName: 'Health', usersCount: 5, createdAt: '2024-01-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-26', name: 'HSE Galway', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-01-20', createdBy: 'Aoife Brennan' },
  { id: 'unit-27', name: 'HSE Limerick', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Declan Walsh' },
  { id: 'unit-28', name: 'HSE Waterford', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-02-10', createdBy: 'Declan Walsh' },
  { id: 'unit-29', name: 'HSE Kerry', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-02-15', createdBy: 'Aoife Brennan' },
  { id: 'unit-30', name: 'HSE Sligo', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-02-20', createdBy: 'Aoife Brennan' },
  { id: 'unit-31', name: 'HSE Donegal', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-03-01', createdBy: 'Declan Walsh' },
  { id: 'unit-32', name: 'HSE Mayo', departmentId: 'dept-3', departmentName: 'Health', usersCount: 2, createdAt: '2024-03-05', createdBy: 'Aoife Brennan' },
  { id: 'unit-33', name: 'Mental Health Division', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-03-10', createdBy: 'Declan Walsh' },
  { id: 'unit-34', name: 'Primary Care Division', departmentId: 'dept-3', departmentName: 'Health', usersCount: 4, createdAt: '2024-03-15', createdBy: 'Aoife Brennan' },
  { id: 'unit-35', name: 'Acute Hospitals Division', departmentId: 'dept-3', departmentName: 'Health', usersCount: 5, createdAt: '2024-03-20', createdBy: 'Declan Walsh' },
  { id: 'unit-36', name: 'Community Healthcare Division', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-04-01', createdBy: 'Aoife Brennan' },
  { id: 'unit-37', name: 'National Ambulance Service', departmentId: 'dept-3', departmentName: 'Health', usersCount: 3, createdAt: '2024-04-05', createdBy: 'Declan Walsh' },
  
  // Social Protection - 10 units
  { id: 'unit-38', name: 'Employment Services', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 4, createdAt: '2024-01-12', createdBy: 'Declan Walsh' },
  { id: 'unit-39', name: 'Community Welfare', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-01-12', createdBy: 'Declan Walsh' },
  { id: 'unit-40', name: 'Pensions Division', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Declan Walsh' },
  { id: 'unit-41', name: 'Child Benefit Section', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-02-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-42', name: 'Disability Services', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-02-15', createdBy: 'Declan Walsh' },
  { id: 'unit-43', name: 'Jobseeker Services', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 4, createdAt: '2024-02-20', createdBy: 'Sinead Kelly' },
  { id: 'unit-44', name: 'Carers Section', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 2, createdAt: '2024-03-01', createdBy: 'Declan Walsh' },
  { id: 'unit-45', name: 'Maternity Benefit Section', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 2, createdAt: '2024-03-10', createdBy: 'Sinead Kelly' },
  { id: 'unit-46', name: 'PRSI Records', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-03-15', createdBy: 'Declan Walsh' },
  { id: 'unit-47', name: 'Appeals Office', departmentId: 'dept-4', departmentName: 'Social Protection', usersCount: 3, createdAt: '2024-03-20', createdBy: 'Sinead Kelly' },
  
  // Justice - 11 units
  { id: 'unit-48', name: 'An Garda Síochána Liaison', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 4, createdAt: '2024-01-08', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-49', name: 'Irish Prison Service', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-01-08', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-50', name: 'Courts Service', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 4, createdAt: '2024-01-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-51', name: 'Immigration Service', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 5, createdAt: '2024-01-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-52', name: 'Legal Aid Board', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-02-01', createdBy: 'Patrick Murphy' },
  { id: 'unit-53', name: 'Probation Service', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-02-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-54', name: 'Data Protection Unit', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 2, createdAt: '2024-02-15', createdBy: 'Patrick Murphy' },
  { id: 'unit-55', name: 'Crime Policy Division', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 3, createdAt: '2024-02-20', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-56', name: 'Civil Law Reform', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 2, createdAt: '2024-03-01', createdBy: 'Patrick Murphy' },
  { id: 'unit-57', name: 'International Protection Office', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 4, createdAt: '2024-03-10', createdBy: 'Marie O\'Sullivan' },
  { id: 'unit-58', name: 'Coroners Service', departmentId: 'dept-9', departmentName: 'Justice', usersCount: 2, createdAt: '2024-03-15', createdBy: 'Patrick Murphy' },
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
  { id: 'user-1', name: 'Seán Ó Briain', email: generateEmail('Seán', 'Ó Briain', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-01-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-2', name: 'Aoife Ní Chonchúir', email: generateEmail('Aoife', 'Ní Chonchúir', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-1', 'unit-2'], unitNames: ['Cork City Council', 'Dublin City Council'] }], addedAt: '2024-02-01', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-3', name: 'Ciarán Mac Carthaigh', email: generateEmail('Ciarán', 'Mac Carthaigh', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-3', 'unit-4', 'unit-5'], unitNames: ['Galway County Council', 'Kilkenny County Council', 'Limerick City and County Council'] }], addedAt: '2024-02-10', addedBy: 'Patrick Murphy' },
  { id: 'user-4', name: 'Niamh Ní Dhomhnaill', email: generateEmail('Niamh', 'Ní Dhomhnaill', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-6', 'unit-7'], unitNames: ['Waterford City and County Council', 'Fingal County Council'] }], addedAt: '2024-02-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-5', name: 'Pádraig Ó Suilleabháin', email: generateEmail('Pádraig', 'Ó Suilleabháin', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-8'], unitNames: ['South Dublin County Council'] }], addedAt: '2024-03-01', addedBy: 'Patrick Murphy' },
  { id: 'user-6', name: 'Máire Ní Bhriain', email: generateEmail('Máire', 'Ní Bhriain', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-9', 'unit-10'], unitNames: ['Dún Laoghaire-Rathdown County Council', 'Kerry County Council'] }], addedAt: '2024-03-10', addedBy: 'Sinead Kelly' },
  { id: 'user-7', name: 'Eoin Mac Aoidh', email: generateEmail('Eoin', 'Mac Aoidh', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-11', 'unit-12'], unitNames: ['Mayo County Council', 'Wexford County Council'] }], addedAt: '2024-03-15', addedBy: 'Patrick Murphy' },
  { id: 'user-8', name: 'Síle Ní Mhurchú', email: generateEmail('Síle', 'Ní Mhurchú', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-1'], unitNames: ['Cork City Council'] }], addedAt: '2024-03-20', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-9', name: 'Tadhg Ó Ceallaigh', email: generateEmail('Tadhg', 'Ó Ceallaigh', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-2'], unitNames: ['Dublin City Council'] }], addedAt: '2024-04-01', addedBy: 'Patrick Murphy' },
  { id: 'user-10', name: 'Gráinne Ní Fhloinn', email: generateEmail('Gráinne', 'Ní Fhloinn', 'housing.gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-2', 'unit-7'], unitNames: ['Dublin City Council', 'Fingal County Council'] }], addedAt: '2024-04-05', addedBy: 'Sinead Kelly' },
  
  // Education Department users (8 users)
  { id: 'user-11', name: 'Oisín Ó Néill', email: generateEmail('Oisín', 'Ó Néill', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-01-20', addedBy: 'Sinead Kelly' },
  { id: 'user-12', name: 'Siobhán Ní Riain', email: generateEmail('Siobhán', 'Ní Riain', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-13', 'unit-14'], unitNames: ['Primary Schools Division', 'Secondary Schools Division'] }], addedAt: '2024-02-01', addedBy: 'Sinead Kelly' },
  { id: 'user-13', name: 'Cormac Mac Giolla', email: generateEmail('Cormac', 'Mac Giolla', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-15'], unitNames: ['Higher Education Division'] }], addedAt: '2024-02-10', addedBy: 'Patrick Murphy' },
  { id: 'user-14', name: 'Áine Ní Shé', email: generateEmail('Áine', 'Ní Shé', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-16', 'unit-17'], unitNames: ['Special Education Division', 'Teacher Education Section'] }], addedAt: '2024-02-15', addedBy: 'Sinead Kelly' },
  { id: 'user-15', name: 'Fionn Ó Dónaill', email: generateEmail('Fionn', 'Ó Dónaill', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-18', 'unit-19', 'unit-20'], unitNames: ['Curriculum and Assessment Policy', 'School Transport Section', 'Statistics Section'] }], addedAt: '2024-03-01', addedBy: 'Patrick Murphy' },
  { id: 'user-16', name: 'Caoimhe Ní Cheallaigh', email: generateEmail('Caoimhe', 'Ní Cheallaigh', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-21'], unitNames: ['International Section'] }], addedAt: '2024-03-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-17', name: 'Darragh Ó Murchú', email: generateEmail('Darragh', 'Ó Murchú', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-22'], unitNames: ['ICT Policy Unit'] }], addedAt: '2024-03-15', addedBy: 'Patrick Murphy' },
  { id: 'user-18', name: 'Róisín Ní Ghrádaigh', email: generateEmail('Róisín', 'Ní Ghrádaigh', 'education.gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: false, unitIds: ['unit-13'], unitNames: ['Primary Schools Division'] }], addedAt: '2024-03-20', addedBy: 'Sinead Kelly' },
  
  // Health Department users (10 users)
  { id: 'user-19', name: 'Conor Ó Flannagáin', email: generateEmail('Conor', 'Ó Flannagáin', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-01-18', addedBy: 'Aoife Brennan' },
  { id: 'user-20', name: 'Saoirse Ní Mhaoláin', email: generateEmail('Saoirse', 'Ní Mhaoláin', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-23', 'unit-24'], unitNames: ['HSE Dublin North', 'HSE Dublin South'] }], addedAt: '2024-01-25', addedBy: 'Aoife Brennan' },
  { id: 'user-21', name: 'Liam Ó Raghallaigh', email: generateEmail('Liam', 'Ó Raghallaigh', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-25'], unitNames: ['HSE Cork'] }], addedAt: '2024-02-01', addedBy: 'Declan Walsh' },
  { id: 'user-22', name: 'Orla Ní Chonaill', email: generateEmail('Orla', 'Ní Chonaill', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-26', 'unit-27'], unitNames: ['HSE Galway', 'HSE Limerick'] }], addedAt: '2024-02-10', addedBy: 'Aoife Brennan' },
  { id: 'user-23', name: 'Declan Mac Suibhne', email: generateEmail('Declan', 'Mac Suibhne', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-28', 'unit-29', 'unit-30'], unitNames: ['HSE Waterford', 'HSE Kerry', 'HSE Sligo'] }], addedAt: '2024-02-15', addedBy: 'Declan Walsh' },
  { id: 'user-24', name: 'Clodagh Ní Fhearghail', email: generateEmail('Clodagh', 'Ní Fhearghail', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-31', 'unit-32'], unitNames: ['HSE Donegal', 'HSE Mayo'] }], addedAt: '2024-02-20', addedBy: 'Aoife Brennan' },
  { id: 'user-25', name: 'Brendan Ó hEachthairn', email: generateEmail('Brendan', 'Ó hEachthairn', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-33'], unitNames: ['Mental Health Division'] }], addedAt: '2024-03-01', addedBy: 'Declan Walsh' },
  { id: 'user-26', name: 'Maeve Ní Bhraonáin', email: generateEmail('Maeve', 'Ní Bhraonáin', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-34', 'unit-35'], unitNames: ['Primary Care Division', 'Acute Hospitals Division'] }], addedAt: '2024-03-10', addedBy: 'Aoife Brennan' },
  { id: 'user-27', name: 'Cathal Mac Lochlainn', email: generateEmail('Cathal', 'Mac Lochlainn', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-36'], unitNames: ['Community Healthcare Division'] }], addedAt: '2024-03-15', addedBy: 'Declan Walsh' },
  { id: 'user-28', name: 'Eimear Ní Dhuibhir', email: generateEmail('Eimear', 'Ní Dhuibhir', 'health.gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-37'], unitNames: ['National Ambulance Service'] }], addedAt: '2024-03-20', addedBy: 'Aoife Brennan' },
  
  // Social Protection users (6 users)
  { id: 'user-29', name: 'Donal Ó Cathasaigh', email: generateEmail('Donal', 'Ó Cathasaigh', 'dsp.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-02-05', addedBy: 'Declan Walsh' },
  { id: 'user-30', name: 'Sorcha Ní Chonghaile', email: generateEmail('Sorcha', 'Ní Chonghaile', 'dsp.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitIds: ['unit-38', 'unit-39'], unitNames: ['Employment Services', 'Community Welfare'] }], addedAt: '2024-02-10', addedBy: 'Sinead Kelly' },
  { id: 'user-31', name: 'Fergus Mac Giolla', email: generateEmail('Fergus', 'Mac Giolla', 'dsp.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitIds: ['unit-40', 'unit-41'], unitNames: ['Pensions Division', 'Child Benefit Section'] }], addedAt: '2024-02-15', addedBy: 'Declan Walsh' },
  { id: 'user-32', name: 'Deirdre Ní Shé', email: generateEmail('Deirdre', 'Ní Shé', 'dsp.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitIds: ['unit-42', 'unit-43'], unitNames: ['Disability Services', 'Jobseeker Services'] }], addedAt: '2024-02-20', addedBy: 'Sinead Kelly' },
  { id: 'user-33', name: 'Colm Ó Dónaill', email: generateEmail('Colm', 'Ó Dónaill', 'dsp.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitIds: ['unit-44', 'unit-45'], unitNames: ['Carers Section', 'Maternity Benefit Section'] }], addedAt: '2024-03-01', addedBy: 'Declan Walsh' },
  { id: 'user-34', name: 'Aisling Ní Cheallaigh', email: generateEmail('Aisling', 'Ní Cheallaigh', 'dsp.gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitIds: ['unit-46', 'unit-47'], unitNames: ['PRSI Records', 'Appeals Office'] }], addedAt: '2024-03-10', addedBy: 'Sinead Kelly' },
  
  // Justice Department users (6 users)
  { id: 'user-35', name: 'Ruairí Ó Murchú', email: generateEmail('Ruairí', 'Ó Murchú', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-01-22', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-36', name: 'Fionnuala Ní Ghrádaigh', email: generateEmail('Fionnuala', 'Ní Ghrádaigh', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitIds: ['unit-48', 'unit-49'], unitNames: ['An Garda Síochána Liaison', 'Irish Prison Service'] }], addedAt: '2024-02-01', addedBy: 'Patrick Murphy' },
  { id: 'user-37', name: 'Diarmuid Mac Suibhne', email: generateEmail('Diarmuid', 'Mac Suibhne', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitIds: ['unit-50', 'unit-51'], unitNames: ['Courts Service', 'Immigration Service'] }], addedAt: '2024-02-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-38', name: 'Meadhbh Ní Fhloinn', email: generateEmail('Meadhbh', 'Ní Fhloinn', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitIds: ['unit-52', 'unit-53'], unitNames: ['Legal Aid Board', 'Probation Service'] }], addedAt: '2024-02-15', addedBy: 'Patrick Murphy' },
  { id: 'user-39', name: 'Tomás Ó Raghallaigh', email: generateEmail('Tomás', 'Ó Raghallaigh', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitIds: ['unit-54', 'unit-55', 'unit-56'], unitNames: ['Data Protection Unit', 'Crime Policy Division', 'Civil Law Reform'] }], addedAt: '2024-02-20', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-40', name: 'Bríd Ní Mhaoláin', email: generateEmail('Bríd', 'Ní Mhaoláin', 'justice.gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitIds: ['unit-57', 'unit-58'], unitNames: ['International Protection Office', 'Coroners Service'] }], addedAt: '2024-03-01', addedBy: 'Patrick Murphy' },
  
  // Multi-department access users (5 users)
  { id: 'user-41', name: 'Oisín Mac Lochlainn', email: generateEmail('Oisín', 'Mac Lochlainn', 'gov.ie'), access: [{ departmentId: 'dept-1', departmentName: 'Housing, Local Government and Heritage', fullDepartment: false, unitIds: ['unit-1'], unitNames: ['Cork City Council'] }, { departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-25'], unitNames: ['HSE Cork'] }], addedAt: '2024-02-25', addedBy: 'Marie O\'Sullivan' },
  { id: 'user-42', name: 'Siobhán Ó Cathasaigh', email: generateEmail('Siobhán', 'Ó Cathasaigh', 'gov.ie'), access: [{ departmentId: 'dept-2', departmentName: 'Education', fullDepartment: true, unitIds: [], unitNames: [] }, { departmentId: 'dept-17', departmentName: 'Further and Higher Education, Research, Innovation and Science', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-03-05', addedBy: 'Sinead Kelly' },
  { id: 'user-43', name: 'Cormac Ní Bhraonáin', email: generateEmail('Cormac', 'Ní Bhraonáin', 'gov.ie'), access: [{ departmentId: 'dept-4', departmentName: 'Social Protection', fullDepartment: false, unitIds: ['unit-38'], unitNames: ['Employment Services'] }, { departmentId: 'dept-5', departmentName: 'Enterprise, Trade and Employment', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-03-10', addedBy: 'Declan Walsh' },
  { id: 'user-44', name: 'Áine Mac Aoidh', email: generateEmail('Áine', 'Mac Aoidh', 'gov.ie'), access: [{ departmentId: 'dept-3', departmentName: 'Health', fullDepartment: false, unitIds: ['unit-33', 'unit-34'], unitNames: ['Mental Health Division', 'Primary Care Division'] }, { departmentId: 'dept-15', departmentName: 'Children, Equality, Disability, Integration and Youth', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-03-15', addedBy: 'Aoife Brennan' },
  { id: 'user-45', name: 'Fionn Ní Dhuibhir', email: generateEmail('Fionn', 'Ní Dhuibhir', 'gov.ie'), access: [{ departmentId: 'dept-9', departmentName: 'Justice', fullDepartment: false, unitIds: ['unit-51'], unitNames: ['Immigration Service'] }, { departmentId: 'dept-12', departmentName: 'Foreign Affairs', fullDepartment: true, unitIds: [], unitNames: [] }], addedAt: '2024-03-20', addedBy: 'Patrick Murphy' },
];

// Mock Activity Logs (expanded)
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
  { id: 'log-11', action: 'unit_created', description: 'Created Fingal County Council unit', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@ogcio.gov.ie', timestamp: '2024-03-15T09:00:00Z', targetType: 'unit', targetName: 'Fingal County Council', metadata: { department: 'Housing, Local Government and Heritage' } },
  { id: 'log-12', action: 'user_invited', description: 'Invited Conor Ó Flannagáin to the platform', performedBy: 'Aoife Brennan', performedByEmail: 'aoife.brennan@ogcio.gov.ie', timestamp: '2024-01-18T10:30:00Z', targetType: 'user', targetName: 'Conor Ó Flannagáin' },
  { id: 'log-13', action: 'unit_created', description: 'Created HSE Dublin North unit', performedBy: 'Aoife Brennan', performedByEmail: 'aoife.brennan@ogcio.gov.ie', timestamp: '2024-01-05T11:00:00Z', targetType: 'unit', targetName: 'HSE Dublin North', metadata: { department: 'Health' } },
  { id: 'log-14', action: 'admin_invited', description: 'Invited Sinead Kelly as admin', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-15T08:00:00Z', targetType: 'admin', targetName: 'Sinead Kelly' },
  { id: 'log-15', action: 'whitelist_added', description: 'Added housing.gov.ie domain to whitelist', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-10T08:30:00Z', targetType: 'whitelist', targetName: 'housing.gov.ie' },
  { id: 'log-16', action: 'user_invited', description: 'Invited Oisín Ó Néill to the platform', performedBy: 'Sinead Kelly', performedByEmail: 'sinead.kelly@ogcio.gov.ie', timestamp: '2024-01-20T09:00:00Z', targetType: 'user', targetName: 'Oisín Ó Néill' },
  { id: 'log-17', action: 'access_granted', description: 'Granted full access to Education department', performedBy: 'Sinead Kelly', performedByEmail: 'sinead.kelly@ogcio.gov.ie', timestamp: '2024-01-20T09:01:00Z', targetType: 'user', targetName: 'Oisín Ó Néill', metadata: { department: 'Education' } },
  { id: 'log-18', action: 'unit_created', description: 'Created Primary Schools Division unit', performedBy: 'Sinead Kelly', performedByEmail: 'sinead.kelly@ogcio.gov.ie', timestamp: '2024-01-10T14:00:00Z', targetType: 'unit', targetName: 'Primary Schools Division', metadata: { department: 'Education' } },
  { id: 'log-19', action: 'unit_deleted', description: 'Deleted obsolete unit "Temporary Section"', performedBy: 'Patrick Murphy', performedByEmail: 'patrick.murphy@ogcio.gov.ie', timestamp: '2024-03-25T11:00:00Z', targetType: 'unit', targetName: 'Temporary Section', metadata: { department: 'Housing, Local Government and Heritage' } },
  { id: 'log-20', action: 'admin_invited', description: 'Invited Aoife Brennan as admin', performedBy: 'Marie O\'Sullivan', performedByEmail: 'marie.osullivan@ogcio.gov.ie', timestamp: '2024-01-10T07:00:00Z', targetType: 'admin', targetName: 'Aoife Brennan' },
];

// Mock Admins
export const admins: Admin[] = [
  { id: 'admin-1', name: 'Marie O\'Sullivan', email: 'marie.osullivan@ogcio.gov.ie', role: 'super_admin', addedAt: '2024-01-01', addedBy: 'System' },
  { id: 'admin-2', name: 'Patrick Murphy', email: 'patrick.murphy@ogcio.gov.ie', role: 'admin', addedAt: '2024-01-12', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-3', name: 'Sinead Kelly', email: 'sinead.kelly@ogcio.gov.ie', role: 'admin', addedAt: '2024-01-15', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-4', name: 'Aoife Brennan', email: 'aoife.brennan@ogcio.gov.ie', role: 'admin', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'admin-5', name: 'Declan Walsh', email: 'declan.walsh@ogcio.gov.ie', role: 'admin', addedAt: '2024-01-20', addedBy: 'Marie O\'Sullivan' },
];

// Mock Whitelisted Domains
export const whitelistedDomains: WhitelistedDomain[] = [
  { id: 'wl-1', domain: 'gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-2', domain: 'housing.gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-3', domain: 'education.gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-4', domain: 'health.gov.ie', addedAt: '2024-01-10', addedBy: 'Marie O\'Sullivan' },
  { id: 'wl-5', domain: 'dsp.gov.ie', addedAt: '2024-01-15', addedBy: 'Patrick Murphy' },
  { id: 'wl-6', domain: 'agriculture.gov.ie', addedAt: '2024-01-20', addedBy: 'Patrick Murphy' },
  { id: 'wl-7', domain: 'justice.gov.ie', addedAt: '2024-01-25', addedBy: 'Sinead Kelly' },
  { id: 'wl-8', domain: 'transport.gov.ie', addedAt: '2024-02-01', addedBy: 'Patrick Murphy' },
  { id: 'wl-9', domain: 'ogcio.gov.ie', addedAt: '2024-01-05', addedBy: 'Marie O\'Sullivan' },
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
