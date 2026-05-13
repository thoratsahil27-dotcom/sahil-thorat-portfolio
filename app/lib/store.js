import { defaultData } from './defaultData';

/* ─── Auth ───────────────────────────────────────────────────────── */
const ADMIN_EMAIL    = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'thoratsahil27@gmail.com';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Cherry@121198';
const AUTH_KEY       = 'sahil_admin_auth';

export function login(email, password) {
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') sessionStorage.setItem(AUTH_KEY, '1');
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === '1';
}


const KEY = 'sahil_portfolio_v1';

export function getData() {
  if (typeof window === 'undefined') return defaultData;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultData;
    const stored = JSON.parse(raw);
    
    if (!stored || typeof stored !== 'object') return defaultData;

    // Deep merge stored over defaults so new fields always appear
    // Use optional chaining and default values to be safe
    return {
      heroStats: { ...defaultData.heroStats, ...(stored.heroStats || {}) },
      campaigns: { ...defaultData.campaigns, ...(stored.campaigns || {}) },
      videoProjects: stored.videoProjects ?? defaultData.videoProjects,
      experience: stored.experience ?? defaultData.experience,
      about: { ...defaultData.about, ...(stored.about || {}) },
      skills: stored.skills ?? defaultData.skills,
    };
  } catch (err) {
    console.warn("Store: Falling back to default data due to error:", err);
    return defaultData;
  }
}

export function saveData(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function updateSection(section, value) {
  const current = getData();
  const updated = { ...current, [section]: value };
  saveData(updated);
  return updated;
}

export function resetData() {
  if (typeof window === 'undefined') return defaultData;
  saveData(defaultData);
  return defaultData;
}

// Robust CSV parser that handles multi-line cells and carry-forward brand logic
export function parseCampaignCsv(csvText) {
  const rows = [];
  let curRow = [];
  let curCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      curCell += '"'; i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      curRow.push(curCell.trim()); curCell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      curRow.push(curCell.trim());
      if (curRow.length > 1 || curRow[0] !== '') rows.push(curRow);
      curRow = []; curCell = '';
    } else {
      curCell += char;
    }
  }
  if (curCell || curRow.length > 0) {
    curRow.push(curCell.trim());
    rows.push(curRow);
  }

  let headerIdx = rows.findIndex(r => r.some(c => c.toLowerCase().includes('brand') || c.toLowerCase().includes('month')));
  if (headerIdx === -1) return { grouped: {}, brands: [] };

  const dataRows = rows.slice(headerIdx + 1);
  let lastBrand = '', lastCampaign = '';
  const finalData = [];

  dataRows.forEach(v => {
    if (!v || v.length < 4) return;
    
    const brandVal    = v[1]?.trim();
    const campaignVal = v[2]?.trim();
    const creator     = v[3]?.trim();
    const profile     = v[4]?.trim();
    const liveLink    = v[5]?.trim();

    // Only update brand if it's a short, valid string (not a list item or summary)
    // Brands in Sahil's sheet are like "Raymond", "Sab TV", etc. 
    // Junk rows usually start with "-" or are very long.
    if (brandVal && brandVal.length < 40 && !brandVal.startsWith('-')) {
      lastBrand = brandVal;
    }
    
    if (campaignVal && campaignVal.length < 100 && !campaignVal.startsWith('-')) {
      lastCampaign = campaignVal;
    }

    // Only add if we have a creator name and a valid brand
    if (creator && lastBrand) {
      finalData.push({ 
        brand: lastBrand, 
        campaign: lastCampaign || 'General', 
        creator, 
        profile, 
        liveLink 
      });
    }
  });

  const grouped = {};
  finalData.forEach(row => {
    if (!grouped[row.brand]) grouped[row.brand] = {};
    if (!grouped[row.brand][row.campaign]) grouped[row.brand][row.campaign] = [];
    grouped[row.brand][row.campaign].push({
      creator:  row.creator,
      profile:  row.profile,
      liveLink: row.liveLink
    });
  });

  return { grouped, brands: Object.keys(grouped) };
}

export function getYoutubeId(url) {
  if (!url) return null;
  // Support: standard, shorts, mobile, embed
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function getYoutubeThumbnail(url) {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
