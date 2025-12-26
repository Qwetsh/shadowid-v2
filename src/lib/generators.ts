import type { Identity, Template } from '../types';

const firstNames = [
  'James', 'Sarah', 'Marcus', 'Ana', 'David', 'Yuki', 'Chris', 'Rhonda',
  'Dragon', 'Cipher', 'Wraith', 'Echo', 'Nexus', 'Spike', 'Raze', 'Volt'
];

const lastNames = [
  'Storm', 'Runner', 'Zero', 'Knight', 'Reeves', 'Jackson', 'Chen', 'O\'Brien',
  'Szilard', 'Rossi', 'Khan', 'Winters', 'Monroe', 'Blake'
];

const aliases = [
  'Phantom', 'Viper', 'Ghost', 'Blade', 'Cipher', 'Raze', 'Specter', 'Wraith',
  'Nexus', 'Echo', 'Storm', 'Void', 'Apex', 'Omega', 'Crimson', 'Noir'
];

const nationalities = [
  'UCAS (United Canadian and American States)',
  'Aztlan (Aztec Empire)',
  'Tír na nÓg (Irish Free State)',
  'Tír Tairngire (Elven State)',
  'Free City of Singapore',
  'Ares State',
  'NeoNET Zone',
  'Corporate Floating Enclave',
  'Free Hold',
  'Underground Network'
];

const corporations = [
  'Ares Macrotechnology',
  'NeoNET Systems',
  'Lone Star Security',
  'Renraku Computer Systems',
  'Yakashima (Mega-Corp)',
  'DocWagon',
  'Horizon Global',
  'Unknown Corp',
];

const districts = [
  'Downtown Core',
  'ShadowRunner\'s Alley',
  'The Sprawl',
  'Industrial District',
  'Arcology Tower',
  'Underground Sector',
  'Port Authority Zone',
  'Tech District',
];

const licenseTagOptions = [
  'Firearms Permit (Class A)',
  'Drone Operator License',
  'Magic License (Limited)',
  'Corporate Security Clearance',
  'Medical Practitioner',
  'Hacker\'s License (Conditional)',
  'Vehicle Operator (Commercial)',
  'Explosives Handler',
];

const augmentationOptions = [
  'Cybernetic Arm',
  'Datajack',
  'Wired Reflexes',
  'Muscle Replacement',
  'Orthoskin',
  'Dermal Plating',
  'Eyes Enhancement',
  'Ears Modification',
  'Limb Replacement',
  'Subdermal Armor',
];

const languageOptions = [
  'English', 'Japanese', 'Mandarin', 'Spanish', 'German', 'French',
  'Russian', 'Korean', 'Portuguese', 'Hindi'
];

function generateBiometricHash(): string {
  const chars = 'ABCDEF0123456789';
  let hash = '';
  for (let i = 0; i < 32; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}

function generateUniqueId(): string {
  const prefix = 'SIN-';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return prefix + timestamp + random;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const time = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(time).toISOString().split('T')[0];
}

export function generateRandomIdentity(): Identity {
  const issueDate = randomDate(new Date(2070, 0, 1), new Date(2080, 0, 1));
  const expiryDate = new Date(new Date(issueDate).getFullYear() + 5, 0, 1);

  return {
    id: crypto.randomUUID(),
    fullName: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
    alias: randomElement(aliases),
    metatype: randomElement(['Human', 'Elf', 'Ork', 'Troll', 'Dwarf'] as const),
    nationality: randomElement(nationalities),
    corporateAffiliation: randomElement(corporations),
    sinRating: Math.floor(Math.random() * 6) + 1,
    credRating: Math.floor(Math.random() * 11),
    dateOfBirth: randomDate(new Date(2040, 0, 1), new Date(2070, 0, 1)),
    issueDate,
    expirationDate: expiryDate.toISOString().split('T')[0],
    address: `${Math.floor(Math.random() * 9999) + 1} ${randomElement(districts)}`,
    licenseTags: [randomElement(licenseTagOptions)],
    biometricHash: generateBiometricHash(),
    clearanceLevel: Math.floor(Math.random() * 6),
    uniqueId: generateUniqueId(),
    notes: 'Street-legitimate SIN',
    languages: [randomElement(languageOptions), randomElement(languageOptions)],
    augmentations: [randomElement(augmentationOptions)],
    status: randomElement(['Valid', 'Suspended', 'Burned'] as const),
    theme: 'Neon Rain',
    accentColor: '#00f0ff',
    cornerStyle: 'chamfer',
    showHologram: true,
    glitchIntensity: 0.3,
    includeQRCode: true,
    includeBarcode: true,
  };
}

export function getTemplates(): Template[] {
  return [
    {
      name: 'Corporate Wage Slave',
      description: 'Straight employee with corporate SIN',
      theme: 'Arcology',
      getIdentity: () => ({
        id: crypto.randomUUID(),
        fullName: 'Samuel J. Morrison',
        alias: 'Sam',
        metatype: 'Human',
        nationality: 'UCAS',
        corporateAffiliation: 'Ares Macrotechnology',
        sinRating: 5,
        credRating: 7,
        dateOfBirth: '2050-03-15',
        issueDate: '2075-01-01',
        expirationDate: '2080-01-01',
        address: '4521 Downtown Core, Seattle',
        licenseTags: ['Corporate Security Clearance', 'Vehicle Operator (Commercial)'],
        biometricHash: 'A1B2C3D4E5F6789012345678',
        clearanceLevel: 2,
        uniqueId: 'SIN-CORP-2050031500001',
        notes: 'Mid-level manager. Loyal. Corporate benefits active.',
        languages: ['English', 'Japanese'],
        augmentations: ['Datajack', 'Wired Reflexes'],
        status: 'Valid',
        theme: 'Arcology',
        accentColor: '#0088ff',
        cornerStyle: 'rounded',
        showHologram: true,
        glitchIntensity: 0.2,
        includeQRCode: true,
        includeBarcode: true,
      }),
    },
    {
      name: 'Street Runner',
      description: 'Burned SIN, independent operator',
      theme: 'Neon Rain',
      getIdentity: () => ({
        id: crypto.randomUUID(),
        fullName: 'James "Phantom" Storm',
        alias: 'Phantom',
        metatype: 'Ork',
        nationality: 'Free Hold',
        corporateAffiliation: '',
        sinRating: 1,
        credRating: 4,
        dateOfBirth: '2055-07-22',
        issueDate: '2078-06-15',
        expirationDate: '2081-06-15',
        address: 'Unknown',
        licenseTags: ['Firearms Permit (Class A)', 'Hacker\'s License (Conditional)'],
        biometricHash: 'F4E3D2C1B0A9876543210FED',
        clearanceLevel: 0,
        uniqueId: 'SIN-FREE-2055072200042',
        notes: 'Run solo. Disposable SIN. Precautions advised.',
        languages: ['English', 'Spanish'],
        augmentations: ['Cybernetic Arm', 'Dermal Plating', 'Eyes Enhancement'],
        status: 'Burned',
        theme: 'Neon Rain',
        accentColor: '#ff006e',
        cornerStyle: 'sharp',
        showHologram: true,
        glitchIntensity: 0.6,
        includeQRCode: true,
        includeBarcode: true,
      }),
    },
    {
      name: 'Licensed Mage',
      description: 'Legitimate magical practitioner',
      theme: 'Red Samurai',
      getIdentity: () => ({
        id: crypto.randomUUID(),
        fullName: 'Yuki Tanaka',
        alias: 'Sage',
        metatype: 'Elf',
        nationality: 'Tír Tairngire',
        corporateAffiliation: 'Renraku Computer Systems',
        sinRating: 4,
        credRating: 6,
        dateOfBirth: '2045-11-08',
        issueDate: '2076-05-20',
        expirationDate: '2083-05-20',
        address: '1250 Arcology Tower, Sector 7',
        licenseTags: ['Magic License (Limited)', 'Medical Practitioner'],
        biometricHash: 'DEADBEEFCAFEBABE123456FF',
        clearanceLevel: 3,
        uniqueId: 'SIN-MAGE-2045110800015',
        notes: 'Shaman specialization. Licensed for healing magic only.',
        languages: ['English', 'Japanese', 'German'],
        augmentations: ['Datajack'],
        status: 'Valid',
        theme: 'Red Samurai',
        accentColor: '#ff0000',
        cornerStyle: 'chamfer',
        showHologram: true,
        glitchIntensity: 0.3,
        includeQRCode: true,
        includeBarcode: true,
      }),
    },
    {
      name: 'DocWagon Contract Holder',
      description: 'High-priority medical response coverage',
      theme: 'Street Doc',
      getIdentity: () => ({
        id: crypto.randomUUID(),
        fullName: 'Dr. Ana Reeves',
        alias: 'Doc',
        metatype: 'Dwarf',
        nationality: 'UCAS',
        corporateAffiliation: 'DocWagon',
        sinRating: 3,
        credRating: 8,
        dateOfBirth: '2048-02-12',
        issueDate: '2074-09-01',
        expirationDate: '2082-09-01',
        address: '2847 Medical District',
        licenseTags: ['Medical Practitioner', 'Explosives Handler'],
        biometricHash: 'C0FFEE1234567890ABCDEF00',
        clearanceLevel: 1,
        uniqueId: 'SIN-DOC-2048021200008',
        notes: 'DocWagon Gold member. Emergency contact priority.',
        languages: ['English', 'Spanish', 'Portuguese'],
        augmentations: ['Eyes Enhancement', 'Limb Replacement'],
        status: 'Valid',
        theme: 'Street Doc',
        accentColor: '#39ff14',
        cornerStyle: 'rounded',
        showHologram: false,
        glitchIntensity: 0.1,
        includeQRCode: true,
        includeBarcode: true,
      }),
    },
    {
      name: 'Black ICE Admin',
      description: 'Corporate system security specialist',
      theme: 'Black ICE',
      getIdentity: () => ({
        id: crypto.randomUUID(),
        fullName: 'Marcus Chen',
        alias: 'Cipher',
        metatype: 'Human',
        nationality: 'UCAS',
        corporateAffiliation: 'NeoNET Systems',
        sinRating: 6,
        credRating: 9,
        dateOfBirth: '2052-09-30',
        issueDate: '2077-01-15',
        expirationDate: '2084-01-15',
        address: 'NeoNET Arcology, Secured Zone',
        licenseTags: ['Corporate Security Clearance', 'Hacker\'s License (Conditional)'],
        biometricHash: '0123456789ABCDEFDEADBEEF',
        clearanceLevel: 4,
        uniqueId: 'SIN-NET-2052093000020',
        notes: 'System administrator. High-level network access. Classified operations.',
        languages: ['English', 'Mandarin', 'Japanese'],
        augmentations: ['Datajack', 'Wired Reflexes', 'Cybernetic Arm'],
        status: 'Valid',
        theme: 'Black ICE',
        accentColor: '#000000',
        cornerStyle: 'sharp',
        showHologram: true,
        glitchIntensity: 0.8,
        includeQRCode: true,
        includeBarcode: true,
      }),
    },
  ];
}
