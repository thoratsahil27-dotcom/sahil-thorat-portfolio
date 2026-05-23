const defaultData = {
  heroStats: {
    stat1Value: '70+',
    stat1Label: 'Campaigns',
    stat2Value: '10+',
    stat2Label: 'Brands',
    stat3Value: '60+',
    stat3Label: 'Creators',
    stat4Value: '5+',
    stat4Label: 'Years',
    instagramUrl: 'https://instagram.com/sahilthorat019',
    linkedinUrl: 'https://www.linkedin.com/in/sahil-thorat-8018b4328',
    youtubeUrl: 'https://youtube.com/@sahil-thorat98',
  },
  campaigns: {
    sheetUrl:
      'https://docs.google.com/spreadsheets/d/1fGEspsH5giDymSErmF1ZjGAkUZEQcdEB2eCqh2SaT6Y/export?format=csv',
  },
  videoProjects: [
    {
      id: 'vp1',
      title: 'Parking Lot Sessions S2',
      description: 'Lead post-production for the underground music series — Urban Monkey',
      tags: ['ARTIST MANAGEMENT', 'EDITOR', 'MUSIC'],
      videos: [
        { id: 'v1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Episode 1' },
      ],
    },
    {
      id: 'vp2',
      title: 'Brand Reel Edits',
      description: 'High-energy branded content reels for fashion and lifestyle brands',
      tags: ['EDITING', 'BRAND', 'REELS'],
      videos: [],
    },
    {
      id: 'vp3',
      title: 'Rap Music Videos',
      description: 'High-energy rap music video edits and post-production',
      tags: ['MUSIC', 'RAP', 'EDITING'],
      videos: [],
    },
  ],
  experience: [
    {
      id: 'ex1',
      year: '2026 - Present',
      role: 'Influencer Marketing Executive',
      company: 'Illuminati Media',
      description:
        'Executed and managed influencer campaigns for ICICI Bank, My11Circle, Flipkart, Sony SAB, Tata Motors, and more.',
    },
    {
      id: 'ex2',
      year: '2024 - 25',
      role: 'Video Producer / Management',
      company: 'NS Entertainment',
      description:
        'Coordinated and managed live events, stage shows, dance performances, and entertainment productions.',
    },
    {
      id: 'ex3',
      year: '2023',
      role: 'Editor & Artist Manager',
      company: 'Urban Monkey — Parking Lot Sessions S2',
      description:
        'Led post-production and editing for Urban Monkey\'s Parking Lot Sessions Season 2. Coordinated with underground artists.',
    },
    {
      id: 'ex4',
      year: '2021 – 2024',
      role: 'Admin Coordinator',
      company: 'Tata Power',
      description: 'Managed day-to-day office operations and administrative coordination.',
    },
    {
      id: 'ex5',
      year: '2012 – 2026',
      role: 'Freelance Video Editor & Professional Dancer',
      company: 'Self-Employed',
      description:
        'Shot and edited celebrity BTS videos, music albums, promotional videos, reels, and branded content.',
    },
  ],
  about: {
    bio: "I'm Sahil Thorat, a Content Producer and Influencer Marketer who spent more time in the editing room than in my MCA classes (but hey, I still graduated!). I bridge the gap between brands and creators with the precision of a keyframe and the wit of a viral caption. If you're looking for someone who speaks fluent 'Algorithm' and 'Premium Aesthetics,' you're in the right place.",
    email: 'thoratsahil90@gmail.com',
    phone: '+91 8082812805',
    instagramUrl: 'https://instagram.com/sahilthorat019',
    linkedinUrl: 'https://www.linkedin.com/in/sahil-thorat-8018b4328',
    youtubeUrl: 'https://youtube.com/@sahil-thorat98',
  },
  skills: [
    'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Influencer Campaigns',
    'Campaign Decks', 'Creator Briefing', 'Brand Integration', 'Media Planning',
    'Talent Scouting', 'Event Coordination', 'Artist Management', 'Script Coordination',
    'Content Strategy', 'Audience Research', 'Analytics & Reporting', 'Show Running',
  ],
};

async function run() {
  const url = 'https://sahill-trial-default-rtdb.firebaseio.com/portfolio_content.json';
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(defaultData)
  });
  const data = await res.json();
  console.log("Restored successfully!");
}

run();
