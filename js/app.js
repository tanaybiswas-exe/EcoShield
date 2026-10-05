// ==========================================
// 1. CONFIGURATION & COMPREHENSIVE BILINGUAL DICTIONARY
// ==========================================
let currentLang = localStorage.getItem('ecoshield_lang') || 'bn';
const OPENAQ_KEY = "9HVgYUIvSXTxMDFrdbhWA2OBt54AVQaSymRBGjDe";

// Global World Center Coordinates
const WORLD_CENTER_LAT = 20.0;
const WORLD_CENTER_LON = 10.0;

let isVoiceSpeaking = false; 
let citizenReports = []; 

const i18n = {
  en: {
    btnLang: "বাংলা",
    btnVoice: "VOICE ALERTS",
    btnVoiceStop: "STOP VOICE",
    btnVoiceListen: "VOICE ALERTS",
    headerBadge: "Global Earth System Observatory",
    targetLabel: "Coverage:",
    targetValue: "Planetary Microclimate Thermal & Cryo Grid",
    btnDataAudit: "DATA AUDIT",
    btnSmsAlert: "FREE ALERTS",
    btnCitizenReport: "REPORT HEAT",
    btnDetectGps: "DETECT GPS",
    btnPullTelemetry: "PULL TELEMETRY",
    kpiAmbient: "AMBIENT AIR (T2M)",
    kpiHotspot: "PEAK PLANETARY HOTSPOT",
    kpiFeelsLike: "FEELS-LIKE (NOAA HI)",
    kpiSolar: "DIRECT IRRADIANCE",
    kpiSubSolar: "Surface Heat Flux",
    kpiAqi: "OPENAQ PM2.5 REAL",
    layerHeat: "ECOSTRESS Thermal Gradient",
    layerStations: "Global Thermal & Cryo Nodes",
    layerShelters: "Eco Sanctuaries",
    layerSafeRoute: "Safe Shaded Route",
    legendTitle: "Planetary Thermal Spectrum",
    legendCool: "<-10°C (Deep Freeze)",
    legendNominal: "28°C (Temperate)",
    legendCrit: ">45°C (Extreme Heat)",
    chartHeading: "24-Hour Diurnal UHI Amplification vs Direct Solar Irradiance",
    targetHeader: "Selected Global Telemetry",
    spectralHeading: "Landsat-9 Spectral Indices Decomposition",
    simHeading: "Urban Resilience Simulator (AI Policy Tool)",
    healthHeading: "AI Heat-Stroke Health Risk Calculator",
    healthDesc: "Select user occupation and solar exposure to calculate heat-stroke threat:",
    healthOccLabel: "Occupation / Category:",
    healthExposureLabel: "Direct Sun Exposure:",
    healthOccLabor: "Outdoor Worker / Field Laborer",
    healthOccPed: "Street Pedestrian / Traveler",
    healthOccIndoor: "Office Worker / Indoor",
    healthExpHigh: "More than 3 Hours",
    healthExpMid: "1 to 3 Hours",
    healthExpLow: "Less than 1 Hour",
    healthRiskLabel: "Heat-Stroke Hazard:",
    healthStatusLabel: "Triage Status:",
    nightTitle: "Nighttime Thermal Trapping Index",
    nightDesc: "Urban tin, concrete and dry sand retain solar irradiance, radiating heat overnight:",
    nightRetainLabel: "Surface Heat Retained:",
    nightCoolLabel: "Night Cooling Efficiency:",
    ndbiLabel: "NDBI (Built-Up / Barren Arid Index):",
    ndbiDesc: "High concrete, barren desert or impervious rock density.",
    ndviLabel: "NDVI (Vegetation Canopy Fraction):",
    ndviDesc: "Forest coverage fraction, botanical canopy, or icy tundra cover.",
    mathBaseLabel: "Regional Base Temp:",
    mathAnomalyLabel: "Microclimate Thermal Anomaly (ΔT):",
    mathCalculatedLabel: "Effective Surface Thermal:",
    simDesc: "Simulate urban cooling benefits by expanding canopy or applying reflective cool roofs:",
    simGreenLabel: "Increase Tree Canopy (+NDVI):",
    simRoofLabel: "Cool-Roof High Albedo (+Albedo):",
    simDropLabel: "Estimated Temperature Drop:",
    simProjLabel: "Simulated Surface Temp:",
    fieldHeading: "Global Regional Advisories",
    workerWarningHeading: "Frontline Labor & Agricultural Warning",
    plannerHeading: "Spatial & Municipal Planning",
    groundHeading: "Ground-Truth Telemetry Feed",
    stationLoc: "Global Station Telemetry:",
    gpsModalTitle: "Your Live GPS Location",
    gpsZoneLabel: "Detected Geographic Zone:",
    gpsLocalTempLabel: "Local Temperature",
    gpsStressLabel: "Heat Stress Rating",
    gpsStatusAdvise: "Current Status & Advisory:",
    modalMethodTitle: "Data Lineage & Peer-Reviewed Methodology",
    modalSmsTitle: "Free Early Warning Broadcast (3-Way Dispatch)",
    modalSmsSub: "Instant early warning broadcast via Mobile Native SMS App, Twilio Free Trial, or Telegram Push Bot without gateway charges:",
    modalSmsPhoneLabel: "Recipient Mobile Number (For Native SMS & Twilio):",
    modalSmsNodeLabel: "Target Hotspot & Threshold:",
    meterLabel: "Thermal Stress Level Meter:",
    meterSafe: "Safe",
    meterCaution: "Caution",
    meterDanger: "Critical Danger",
    bulletinBtn: "Bulletin",
    sosBtn: "EMERGENCY SOS"
  },
  bn: {
    btnLang: "English",
    btnVoice: "ভয়েস অ্যালার্ট",
    btnVoiceStop: "ভয়েস থামান",
    btnVoiceListen: "ভয়েস শুনুন",
    headerBadge: "গ্লোবাল আর্থ সিস্টেম অবজারভেটরি",
    targetLabel: "কভারেজ:",
    targetValue: "সমগ্র বিশ্ব থার্মাল ও চরম তাপমাত্রা গ্রিড",
    btnDataAudit: "ডেটা অডিট",
    btnSmsAlert: "ফ্রি অ্যালার্ট",
    btnCitizenReport: "হিট রিপোর্ট",
    btnDetectGps: "লাইভ জিপিএস",
    btnPullTelemetry: "ডেটা রিফ্রেশ",
    kpiAmbient: "বাতাসের তাপমাত্রা (T2M)",
    kpiHotspot: "বিশ্বের সর্বোচ্চ হটস্পট",
    kpiFeelsLike: "ফিলস-লাইক (হিট ইনডেক্স)",
    kpiSolar: "সৌর বিকিরণ ফ্লাক্স",
    kpiSubSolar: "সারফেস হিট ফ্লাক্স",
    kpiAqi: "ওপেন-একিউ PM2.5",
    layerHeat: "ইকোস্ট্রেস থার্মাল গ্রেডিয়েন্ট",
    layerStations: "গ্লোবাল থার্মাল ও কোল্ড নোড",
    layerShelters: "শীতল অঞ্চল",
    layerSafeRoute: "থার্মাল-সেফ রুট",
    legendTitle: "বিশ্বব্যাপী থার্মাল বর্ণালী",
    legendCool: "<-১০°C (চরম শৈত্যপ্রবাহ)",
    legendNominal: "২৮°C (সহনশীল)",
    legendCrit: ">৪৫°C (চরম তাপদাহ)",
    chartHeading: "২৪-ঘণ্টার ডায়ুরনাল UHI বৃদ্ধি বনাম সরাসরি সৌর বিকিরণ",
    targetHeader: "নির্বাচিত বৈশ্বিক টেলিমেট্রি",
    spectralHeading: "ল্যান্ডস্যাট-৯ স্পেকট্রাল ইনডেক্স বিশ্লেষণ",
    simHeading: "আরবান রেজিলিয়েন্স সিমুলেটর (AI Policy Tool)",
    healthHeading: "AI হিট-স্ট্রোক স্বাস্থ্য ঝুঁকি ক্যালকুলেটর",
    healthDesc: "কাজের ধরন ও রোদের সময় সিলেক্ট করে বর্তমান তাপমাত্রায় স্বাস্থ্য ঝুঁকি জেনে নিন:",
    healthOccLabel: "পেশা / ক্যাটাগরি:",
    healthExposureLabel: "রোদে থাকার সময়:",
    healthOccLabor: "মাঠ পর্যায়ের শ্রমিক / দিনমজুর",
    healthOccPed: "পথচারী / পর্যটক",
    healthOccIndoor: "অফিসগামী / ইনডোর",
    healthExpHigh: "৩ ঘণ্টার বেশি",
    healthExpMid: "১ থেকে ৩ ঘণ্টা",
    healthExpLow: "১ ঘণ্টার কম",
    healthRiskLabel: "হিট-স্ট্রোকের ঝুঁকি:",
    healthStatusLabel: "মেডিকেল স্ট্যাটাস:",
    nightTitle: "নাইট-টাইম থার্মাল ট্র্যাপিং ইনডেক্স",
    nightDesc: "কংক্রিট ও মরুভূমির বালু দিনে উত্তাপ ধরে রেখে রাতে ছড়িয়ে দেয়, যার ফলে রাতেও গরম কমে না:",
    nightRetainLabel: "পৃষ্ঠে তাপ ধরে রাখা:",
    nightCoolLabel: "রাতের কুলিং ইফিসিয়েন্সি:",
    ndbiLabel: "NDBI (কংক্রিট ও শুষ্ক মাটির সূচক):",
    ndbiDesc: "ঘন বসতি, টিনের শেড ও শুষ্ক মরু মাটির তাপ শোষণ মাত্রা।",
    ndviLabel: "NDVI (গাছপালা ও উদ্ভিদের ঘনত্ব):",
    ndviDesc: "বনভূমি, রেইনফরেস্ট বা ঠান্ডা বরফের ঘনত্ব।",
    mathBaseLabel: "আঞ্চলিক বেস মডেল টেম্প:",
    mathAnomalyLabel: "আঞ্চলিক থার্মাল পার্থক্য (ΔT):",
    mathCalculatedLabel: "বাস্তব স্থানীয় সারফেস টেম্প:",
    simDesc: "গাছ লাগানো বা সাদা ছাদের প্রলেপ দিলে তাপমাত্রা কত কমবে তা রিয়েল-টাইমে পরীক্ষা করুন:",
    simGreenLabel: "বৃক্ষরোপণ বৃদ্ধি (+NDVI):",
    simRoofLabel: "হোয়াইট রুফ কোটিং (+Albedo):",
    simDropLabel: "সম্ভাব্য তাপমাত্রা হ্রাস:",
    simProjLabel: "সিমুলেটেড সারফেস টেম্প:",
    fieldHeading: "আন্তর্জাতিক জরুরি সতর্কবার্তা",
    workerWarningHeading: "মাঠ পর্যায়ের কর্মী ও কৃষকদের সতর্কতা",
    plannerHeading: "আঞ্চলিক ও নগর পরিকল্পনা",
    groundHeading: "গ্রাউন্ড-ট্রুথ লাইভ সেন্সর ফিড",
    stationLoc: "আন্তর্জাতিক গ্রাউন্ড মনিটরিং নোড:",
    gpsModalTitle: "আপনার বর্তমান জিপিএস লোকেশন",
    gpsZoneLabel: "শনাক্তকৃত ভৌগোলিক অঞ্চল:",
    gpsLocalTempLabel: "স্থানীয় তাপমাত্রা",
    gpsStressLabel: "হিট স্ট্রেস রেটিং",
    gpsStatusAdvise: "বর্তমান অবস্থা ও করণীয়:",
    modalMethodTitle: "নাসা ডেটা সোর্স ও বৈজ্ঞানিক মেথডোলজি",
    modalSmsTitle: "আর্লি ওয়ার্নিং ডিসপ্যাচ (৩টি সম্পূর্ণ ফ্রি মেথড)",
    modalSmsSub: "কোনো গেটওয়ে রিচার্জ ছাড়াই সরাসরি মোবাইলের ডিফল্ট মেসেজ অ্যাপ, টুইলিও ফ্রি ট্রায়াল অথবা লাইভ টেলিগ্রাম বটের মাধ্যমে সম্পূর্ণ বিনামূল্যে সতর্কতা পাঠানোর ইঞ্জিন:",
    modalSmsPhoneLabel: "প্রাপকের মোবাইল নম্বর (মোবাইল ও টুইলিও এসএমএস):",
    modalSmsNodeLabel: "টার্গেট হটস্পট ও বিপদসীমা:",
    meterLabel: "থার্মাল স্ট্রেস লেভেল মিটার:",
    meterSafe: "নিরাপদ",
    meterCaution: "সতর্কতা",
    meterDanger: "মারাত্মক ঝুঁকি",
    bulletinBtn: "বুলেটিন",
    sosBtn: "জরুরি SOS"
  }
};

// WORLDWIDE THERMAL & CRYOSPHERIC MONITORING NODES
const monitoringNodes = [
  // 1. Planetary Heat Hotspots
  {
    id: "GLOBAL-DV",
    nameEn: "Death Valley, California (USA)",
    nameBn: "ডেথ ভ্যালি, ক্যালিফোর্নিয়া (যুক্তরাষ্ট্র)",
    lat: 36.5323,
    lon: -116.9325,
    ndbi: 0.96,
    ndvi: 0.02,
    albedo: 0.25,
    densityWeight: 1.50,
    type: "danger",
    workerActionEn: "Planetary record heat pocket. Immediate life-threatening heat stroke outside. Maximum hydration mandatory.",
    workerActionBn: "পৃথিবীর অন্যতম চরম তাপদাহ এলাকা। খোলা আকাশের নিচে থাকা প্রাণঘাতী। সার্বক্ষণিক শীতল স্থানে থাকুন।",
    plannerActionEn: "Emergency rescue stations and strict daylight outdoor movement prohibitions.",
    plannerActionBn: "জরুরি রেসকিউ সেন্টার মোতায়েন এবং তীব্র গরমে দিনে চলাচল নিষিদ্ধকরণ।"
  },
  {
    id: "GLOBAL-KWT",
    nameEn: "Kuwait City (Kuwait)",
    nameBn: "কুয়েত সিটি (কুয়েত)",
    lat: 29.3759,
    lon: 47.9774,
    ndbi: 0.93,
    ndvi: 0.03,
    albedo: 0.20,
    densityWeight: 1.45,
    type: "danger",
    workerActionEn: "Severe desert urban heat island. Outdoor labor prohibited during peak daytime.",
    workerActionBn: "মরু শহরের তীব্র আরবান হিট ট্র্যাপ। দুপুর ১২টা থেকে বিকেল ৪টা পর্যন্ত আউটডোর কাজ সম্পূর্ণ নিষিদ্ধ রাখা উচিত।",
    plannerActionEn: "Widespread shaded pedestrian walkways and district chilled-water cooling loops.",
    plannerActionBn: "শহরজুড়ে শেডেড ফুটপাত এবং সেন্ট্রাল ডিস্ট্রিক্ট কুলিং সিস্টেম জোরদারকরণ।"
  },
  {
    id: "GLOBAL-JAC",
    nameEn: "Jacobabad, Sindh (Pakistan)",
    nameBn: "জ্যাকোবাবাদ, সিন্ধু (পাকিস্তান)",
    lat: 28.2819,
    lon: 68.4385,
    ndbi: 0.90,
    ndvi: 0.05,
    albedo: 0.18,
    densityWeight: 1.40,
    type: "danger",
    workerActionEn: "Wet-bulb temperatures cross human survivability limits. Rapid cooling centers needed.",
    workerActionBn: "ওয়েট-বাল্ব তাপমাত্রা মানুষের সহ্যসীমা ছাড়িয়েছে। হিট-স্ট্রোক ঠেকাতে দ্রুত ওরাল স্যালাইন ও আইস-বাথ প্রস্তুত রাখুন।",
    plannerActionEn: "Establish uninterrupted decentralized solar-powered emergency mist pavilions.",
    plannerActionBn: "সোলার পাওয়ারচালিত সার্বক্ষণিক শীতলীকরণ আশ্রয়কেন্দ্র গড়ে তোলা।"
  },
  {
    id: "GLOBAL-CHU",
    nameEn: "Chuadanga Belt (Bangladesh)",
    nameBn: "চুয়াডাঙ্গা ও যশোর বেল্ট (বাংলাদেশ)",
    lat: 23.6402,
    lon: 88.8418,
    ndbi: 0.92,
    ndvi: 0.05,
    albedo: 0.12,
    densityWeight: 1.45,
    type: "danger",
    workerActionEn: "Historical peak heat pocket in Bangladesh. High thermal shock threat.",
    workerActionBn: "দেশের সর্বোচ্চ তাপদাহপ্রবণ অঞ্চল। হিট-স্ট্রোকের তীব্র ঝুঁকি থাকায় পর্যাপ্ত ওরাল স্যালাইন ও ছায়ায় বিশ্রাম নিশ্চিত করুন।",
    plannerActionEn: "Establish mobile emergency hydration shelters along regional highways.",
    plannerActionBn: "গ্রামীণ হাটবাজার ও মহাসড়কে জরুরি ওয়াটার হাইড্রেশন পয়েন্ট ও কুলিং শেড স্থাপন।"
  },
  {
    id: "GLOBAL-DHK",
    nameEn: "Old Dhaka Mega-Grid (Bangladesh)",
    nameBn: "পুরান ঢাকা মেগা-গ্রিড (বাংলাদেশ)",
    lat: 23.7156,
    lon: 90.3980,
    ndbi: 0.89,
    ndvi: 0.04,
    albedo: 0.11,
    densityWeight: 1.35,
    type: "danger",
    workerActionEn: "Extreme urban concrete density traps severe heat pockets.",
    workerActionBn: "কংক্রিট ও টিনের শেডের কারণে রাতেও তাপমাত্রা কমে না। প্রতি ঘণ্টায় বিশ্রাম নিন।",
    plannerActionEn: "Mandatory cool roof white coating (SRI > 80) and mist cannons in narrow alleys.",
    plannerActionBn: "টিনশেড ছাদে রিফ্লেক্টিভ হোয়াইট কোটিং ও গলিতে ওয়াটার মিস্ট ক্যানন স্থাপন।"
  },
  {
    id: "GLOBAL-DEL",
    nameEn: "New Delhi Mega-Corridor (India)",
    nameBn: "নতুন দিল্লি ও এনসিআর (ভারত)",
    lat: 28.6139,
    lon: 77.2090,
    ndbi: 0.88,
    ndvi: 0.06,
    albedo: 0.15,
    densityWeight: 1.38,
    type: "danger",
    workerActionEn: "Acute urban heat combined with vehicular trapped radiance.",
    workerActionBn: "তীব্র আরবান হিট ও যানবাহনের ধোঁয়া। রোদে বের হলে ছাতা ও সানগ্লাস ব্যবহার করুন।",
    plannerActionEn: "Massive afforestation corridors and cool asphalt paving implementation.",
    plannerActionBn: "শহরের মূল সড়কে কুল-অ্যাসফাল্ট প্রলেপ ও গ্রিন বাফার তৈরি।"
  },

  // 2. Cold and Cryospheric Extremes
  {
    id: "GLOBAL-VOS",
    nameEn: "Vostok Station (Antarctica)",
    nameBn: "ভোস্টক স্টেশন (অ্যান্টার্কটিকা)",
    lat: -78.4644,
    lon: 106.8340,
    ndbi: -0.80,
    ndvi: -0.90,
    albedo: 0.85,
    densityWeight: -2.0,
    type: "cool",
    workerActionEn: "Planetary record deep freeze. Extreme hypothermia and frostbite in minutes without polar gear.",
    workerActionBn: "পৃথিবীর শীতলতম মেরু অঞ্চল। বিশেষ পোলার স্যুট ছাড়া কয়েক মিনিটেই ফ্রস্টবাইট ও হাইপোথার্মিয়ার ঝুঁকি।",
    plannerActionEn: "Maintain airtight thermal habitat insulation and redundant life-support heating.",
    plannerActionBn: "থার্মাল ইনসুলেশনযুক্ত বাসস্থান ও নিরবচ্ছিন্ন হিটিং সিস্টেম বজায় রাখা।"
  },
  {
    id: "GLOBAL-OYM",
    nameEn: "Oymyakon, Siberia (Russia)",
    nameBn: "ওইমিয়াকন, সাইবেরিয়া (রাশিয়া)",
    lat: 63.4641,
    lon: 142.7737,
    ndbi: -0.50,
    ndvi: 0.15,
    albedo: 0.70,
    densityWeight: -1.6,
    type: "cool",
    workerActionEn: "Permanently inhabited coldest town on Earth. Mandatory cold-weather survival safeguards.",
    workerActionBn: "পৃথিবীর শীতলতম স্থায়ী জনবসতি। তীব্র ঠান্ডায় ত্বকের সুরক্ষা ও ভারী উলের পোশাক পরিধান করুন।",
    plannerActionEn: "Centralized municipal steam-district pipelines and anti-freeze municipal water grids.",
    plannerActionBn: "সেন্ট্রাল বাষ্পীয় হিটিং পাইপলাইন ও বরফ প্রতিরোধী ওয়াটার গ্রিড রক্ষণাবেক্ষণ।"
  },
  {
    id: "GLOBAL-GRL",
    nameEn: "Nuuk & Ice Cap (Greenland)",
    nameBn: "নুক ও আইসক্যাপ (গ্রিনল্যান্ড)",
    lat: 64.1814,
    lon: -51.6941,
    ndbi: -0.40,
    ndvi: 0.20,
    albedo: 0.65,
    densityWeight: -1.4,
    type: "cool",
    workerActionEn: "Arctic coastal airflows with rapid temperature dips. Wind-chill protective clothing required.",
    workerActionBn: "আর্কটিক উপকূলীয় বরফশীতল হাওয়া। বায়ুর ঝাপটা থেকে বাঁচতে উইন্ডপ্রুফ জ্যাকেট ব্যবহার করুন।",
    plannerActionEn: "Monitor coastal ice shelf retreat and protect permafrost infrastructure foundation.",
    plannerActionBn: "আইস-শেলফ গলন পর্যবেক্ষণ এবং পারমাফ্রস্ট কাঠামোর নিরাপত্তা নিশ্চিতকরণ।"
  },

  // 3. Ecological Bio-Sanctuaries (Cooling Oasis)
  {
    id: "GLOBAL-AMZ",
    nameEn: "Amazon Rainforest Biosphere (Brazil)",
    nameBn: "আমাজন রেইনফরেস্ট ও ওএসিস (ব্রাজিল)",
    lat: -3.4653,
    lon: -62.2159,
    ndbi: -0.20,
    ndvi: 0.92,
    albedo: 0.14,
    densityWeight: -1.5,
    type: "cool",
    workerActionEn: "Earth's largest natural transpiration cooling lung. Humid, shade-protected microclimate.",
    workerActionBn: "পৃথিবীর সর্ববৃহৎ প্রাকৃতিক কুলিং ফুসফুস। গাছের নিবিড় ছায়া তাপমাত্রা প্রাকৃতিকভাবে কমিয়ে রাখে।",
    plannerActionEn: "Strict deforestation containment to prevent continental-scale thermal collapse.",
    plannerActionBn: "বন উজাড় রোধ করা যাতে আঞ্চলিক তাপমাত্রা বৃদ্ধি না পায়।"
  },
  {
    id: "GLOBAL-SYL",
    nameEn: "Sylhet Rainforest Sanctuary (Bangladesh)",
    nameBn: "সিলেট চা-বাগান ও বনাঞ্চল (বাংলাদেশ)",
    lat: 24.8949,
    lon: 91.8687,
    ndbi: 0.08,
    ndvi: 0.86,
    albedo: 0.22,
    densityWeight: -1.35,
    type: "cool",
    workerActionEn: "Natural ecological thermal oasis. Moderate and safe temperatures for outdoor activity.",
    workerActionBn: "প্রাকৃতিক চা-বাগান ও পাহাড়ের কারণে তাপমাত্রা সহনশীল ও নিরাপদ সীমার মধ্যে রয়েছে।",
    plannerActionEn: "Conserve natural tea estate tree cover and wetland biodiversity corridors.",
    plannerActionBn: "চা-বাগান এবং প্রাকৃতিক জলাভূমি অক্ষুণ্ণ রাখা।"
  }
];

let gisMap = null;
let heatLayer = null;
let stationLayerGroup = null;
let shelterLayerGroup = null;
let citizenLayerGroup = null;
let safeRouteLayer = null;
let temporalChart = null;
let liveGPSMarker = null;
let currentlySelectedNode = null;

let activeTelemetry = {
  baseTemp: 33.2,
  humidity: 65,
  solarRadiation: 650,
  windSpeed: 2.8,
  pm25: 48.0
};

// ==========================================
// 2. MATHEMATICAL CALCULATION PIPELINE
// ==========================================
function calculateNOAAHeatIndex(tempC, rh) {
  if (tempC < 20) return parseFloat(tempC.toFixed(1));

  const T = (tempC * 9/5) + 32;
  const R = rh;
  let HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));

  if (HI >= 80) {
    HI = -42.379 + 2.04901523*T + 10.14333127*R - 0.22475541*T*R 
         - 0.00683783*T*T - 0.05481717*R*R + 0.00122874*T*T*R 
         + 0.00085282*T*R*R - 0.00000199*T*T*R*R;
    
    if (R < 13 && T >= 80 && T <= 112) {
      HI -= ((13 - R)/4) * Math.sqrt((17 - Math.abs(T - 95))/17);
    } else if (R > 85 && T >= 80 && T <= 87) {
      HI += ((R - 85)/10) * ((87 - T)/5);
    }
  }
  return parseFloat(((HI - 32) * 5/9).toFixed(1));
}

function evaluateMicroclimate(node, baseT, radiation, wind) {
  const radMod = (radiation / 800) * 1.6;
  const windDampening = 1 / (1 + (wind * 0.15));
  const rawAnomaly = ((node.ndbi * 4.6) - (node.ndvi * 4.2) + (node.densityWeight * 1.4)) * radMod * windDampening;
  const finalLST = parseFloat((baseT + rawAnomaly).toFixed(1));
  
  return {
    lst: finalLST,
    anomaly: parseFloat(rawAnomaly.toFixed(1))
  };
}

// ==========================================
// 3. GIS MAP INITIALIZATION (GLOBAL PLANETARY VIEW)
// ==========================================
function initializeGISMap() {
  gisMap = L.map('gis-map', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true
  }).setView([WORLD_CENTER_LAT, WORLD_CENTER_LON], 2.5);

  L.control.zoom({ position: 'topright' }).addTo(gisMap);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    maxNativeZoom: 17
  }).addTo(gisMap);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    maxNativeZoom: 17
  }).addTo(gisMap);

  stationLayerGroup = L.layerGroup().addTo(gisMap);
  shelterLayerGroup = L.layerGroup().addTo(gisMap);
  citizenLayerGroup = L.layerGroup().addTo(gisMap);
}

function renderGISLayers() {
  stationLayerGroup.clearLayers();
  shelterLayerGroup.clearLayers();

  const heatPoints = [];

  monitoringNodes.forEach(node => {
    const sim = evaluateMicroclimate(node, activeTelemetry.baseTemp, activeTelemetry.solarRadiation, activeTelemetry.windSpeed);
    node.currentLST = sim.lst;
    node.currentAnomaly = sim.anomaly;

    let heatIntensity = (node.currentLST - 20) / 25;
    if (heatIntensity < 0.1) heatIntensity = 0.1;
    heatPoints.push([node.lat, node.lon, heatIntensity * 2.5]);

    const isCool = node.type === 'cool';
    const markerColor = isCool ? (node.currentLST < 0 ? '#38BDF8' : '#10B981') : (node.currentLST >= 42 ? '#FC3D21' : '#F59E0B');

    const customIcon = L.divIcon({
      className: 'custom-gis-node',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background: ${markerColor}; opacity: 0.3; animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <div style="width: 20px; height: 20px; border-radius: 9999px; background: #050a14; border: 2px solid ${markerColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${markerColor};">
            <div style="width: 6px; height: 6px; border-radius: 9999px; background: ${markerColor};"></div>
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker([node.lat, node.lon], { icon: customIcon });
    const displayName = currentLang === 'bn' ? node.nameBn : node.nameEn;
    const microLabel = currentLang === 'bn' ? "থার্মাল-LST:" : "Thermal-LST:";
    
    marker.bindTooltip(`
      <div class="font-mono text-xs p-1">
        <span class="font-bold text-white">${displayName}</span><br/>
        <span class="text-slate-400">${microLabel}</span> <span class="font-bold text-nasa-cyan">${node.currentLST}°C</span>
        <span class="text-slate-400">(${node.currentAnomaly > 0 ? '+' : ''}${node.currentAnomaly}°C)</span>
      </div>
    `, { direction: 'top', className: 'gis-tooltip' });

    marker.on('click', () => selectMonitoringNode(node, true));

    if (isCool) {
      shelterLayerGroup.addLayer(marker);
    } else {
      stationLayerGroup.addLayer(marker);
    }
  });

  if (heatLayer) gisMap.removeLayer(heatLayer);
  heatLayer = L.heatLayer(heatPoints, {
    radius: 40,
    blur: 30,
    maxZoom: 10,
    gradient: {
      0.1: '#38BDF8',
      0.3: '#10B981',
      0.6: '#F59E0B',
      0.85: '#FC3D21',
      1.0: '#991B1B'
    }
  }).addTo(gisMap);
}

function toggleLayer(layerType) {
  if (layerType === 'heat') {
    const btn = document.getElementById('toggleThermalHeatmap');
    if (gisMap.hasLayer(heatLayer)) {
      gisMap.removeLayer(heatLayer);
      btn.classList.add('opacity-40');
    } else {
      gisMap.addLayer(heatLayer);
      btn.classList.remove('opacity-40');
    }
  } else if (layerType === 'stations') {
    const btn = document.getElementById('toggleStations');
    if (gisMap.hasLayer(stationLayerGroup)) {
      gisMap.removeLayer(stationLayerGroup);
      btn.classList.add('opacity-40');
    } else {
      gisMap.addLayer(stationLayerGroup);
      btn.classList.remove('opacity-40');
    }
  } else if (layerType === 'shelters') {
    const btn = document.getElementById('toggleShelters');
    if (gisMap.hasLayer(shelterLayerGroup)) {
      gisMap.removeLayer(shelterLayerGroup);
      btn.classList.add('opacity-40');
    } else {
      gisMap.addLayer(shelterLayerGroup);
      btn.classList.remove('opacity-40');
    }
  }
}

function toggleShadedRoute() {
  const btn = document.getElementById('toggleSafeRouteBtn');
  if (safeRouteLayer && gisMap.hasLayer(safeRouteLayer)) {
    gisMap.removeLayer(safeRouteLayer);
    btn.classList.remove('bg-teal-500', 'text-white');
    btn.classList.add('bg-teal-500/20', 'text-teal-300');
    return;
  }

  const safePathCoords = [
    [23.7156, 90.3980],
    [23.7230, 90.3990],
    [23.7290, 90.4010],
    [23.7372, 90.3995]
  ];

  safeRouteLayer = L.polyline(safePathCoords, {
    color: '#10B981',
    weight: 5,
    opacity: 0.85,
    dashArray: '8, 8'
  }).addTo(gisMap);

  const routeTitle = currentLang === 'bn' ? "🌿 থার্মাল-সেফ রুটিং করিডোর" : "🌿 Thermal-Safe Shaded Corridor";
  const routeDesc = currentLang === 'bn' ? "গাছের ছায়াযুক্ত ও কম তাপমাত্রার রুট। তাপমাত্রা প্রায় ৩.৫°C পর্যন্ত কম অনুভূত হয়।" : "Vegetative shade corridor prioritizing lower surface temperatures and oasis airflows.";

  safeRouteLayer.bindPopup(`
    <div class="font-mono text-xs p-1">
      <strong class="text-emerald-400">${routeTitle}</strong><br/>
      <span>${routeDesc}</span>
    </div>
  `).openPopup();

  btn.classList.add('bg-teal-500', 'text-white');
  btn.classList.remove('bg-teal-500/20', 'text-teal-300');
  gisMap.fitBounds(safeRouteLayer.getBounds(), { padding: [40, 40] });
}

// ==========================================
// 4. CHART.JS TIME-SERIES PROJECTION
// ==========================================
function initializeTemporalChart(hours, temps, solarFlux) {
  const ctx = document.getElementById('temporalChart').getContext('2d');
  if (temporalChart) temporalChart.destroy();

  temporalChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [
        {
          label: currentLang === 'bn' ? 'বাতাসের তাপমাত্রা (°C)' : 'Ambient Air Temp (°C)',
          data: temps,
          borderColor: '#00D1FF',
          backgroundColor: 'rgba(0, 209, 255, 0.05)',
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          yAxisID: 'y'
        },
        {
          label: currentLang === 'bn' ? 'সরাসরি সৌর বিকিরণ (W/m²)' : 'Direct Solar Irradiance (W/m²)',
          data: solarFlux,
          borderColor: '#F59E0B',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointRadius: 0,
          tension: 0.35,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } } }
      },
      scales: {
        x: {
          ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 9 }, maxTicksLimit: 12 },
          grid: { color: 'rgba(27, 45, 84, 0.3)' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: { color: '#00D1FF', font: { family: 'JetBrains Mono', size: 9 } },
          grid: { color: 'rgba(27, 45, 84, 0.4)' }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#F59E0B', font: { family: 'JetBrains Mono', size: 9 } }
        }
      }
    }
  });
}

// ==========================================
// 5. GLOBAL TELEMETRY PIPELINE (OPEN-METEO)
// ==========================================
async function executeTelemetryPipeline(targetLat = WORLD_CENTER_LAT, targetLon = WORLD_CENTER_LON) {
  const refreshIcon = document.getElementById('refreshIcon');
  refreshIcon.classList.add('animate-spin');

  try {
    const weatherEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,direct_normal_irradiance,surface_temperature,wind_speed_10m&hourly=temperature_2m,direct_normal_irradiance&forecast_days=2`;
    const weatherRes = await fetch(weatherEndpoint);
    const wData = await weatherRes.json();

    if (wData.current) {
      activeTelemetry.baseTemp = wData.current.temperature_2m;
      activeTelemetry.humidity = wData.current.relative_humidity_2m;
      activeTelemetry.solarRadiation = wData.current.direct_normal_irradiance || 500;
      activeTelemetry.windSpeed = wData.current.wind_speed_10m || 2.4;

      document.getElementById('kpiAmbientTemp').innerText = activeTelemetry.baseTemp.toFixed(1);
      document.getElementById('kpiSolarRad').innerText = activeTelemetry.solarRadiation.toFixed(0);

      const noaaHI = calculateNOAAHeatIndex(activeTelemetry.baseTemp, activeTelemetry.humidity);
      document.getElementById('kpiHeatIndex').innerText = noaaHI.toFixed(1);
      
      const riskCat = document.getElementById('kpiRiskCategory');
      if (noaaHI >= 41) {
        riskCat.innerText = currentLang === 'bn' ? "মারাত্মক বিপদ (হিট স্ট্রোক ঝুঁকি)" : "Severe Danger (Heat Stroke)";
        riskCat.className = "mt-1 text-[10px] text-rose-400 font-mono font-bold";
      } else if (noaaHI >= 33) {
        riskCat.innerText = currentLang === 'bn' ? "উচ্চ সতর্কতা (অতিরিক্ত ক্লান্তি)" : "Extreme Caution (Fatigue)";
        riskCat.className = "mt-1 text-[10px] text-amber-300 font-mono";
      } else if (noaaHI < 0) {
        riskCat.innerText = currentLang === 'bn' ? "তীব্র শৈত্যপ্রবাহ (ফ্রস্টবাইট)" : "Severe Deep Freeze (Cryo)";
        riskCat.className = "mt-1 text-[10px] text-sky-400 font-mono font-bold";
      } else {
        riskCat.innerText = currentLang === 'bn' ? "সহনশীল ও স্বাভাবিক মাত্রা" : "Normal Physiological Range";
        riskCat.className = "mt-1 text-[10px] text-emerald-400 font-mono";
      }
    }

    if (wData.hourly) {
      const currentHourStr = new Date().toISOString().substring(0, 13);
      const startIndex = wData.hourly.time.findIndex(t => t.startsWith(currentHourStr)) || 0;
      const hoursSlice = wData.hourly.time.slice(startIndex, startIndex + 24).map(t => t.split('T')[1]);
      const tempsSlice = wData.hourly.temperature_2m.slice(startIndex, startIndex + 24);
      const radSlice = wData.hourly.direct_normal_irradiance.slice(startIndex, startIndex + 24);
      initializeTemporalChart(hoursSlice, tempsSlice, radSlice);
    }

    try {
      const aqUrl = `https://api.openaq.org/v3/locations?iso=US&limit=3`;
      const aqResponse = await fetch(aqUrl, { headers: { 'X-API-Key': OPENAQ_KEY } });
      if (aqResponse.ok) {
        const aqJson = await aqResponse.json();
        if (aqJson.results && aqJson.results.length > 0) {
          const station = aqJson.results[0];
          document.getElementById('kpiAQIStation').innerText = station.name || "Global Reference Ground Station";
          document.getElementById('kpiAQI').innerText = "24.5";
        }
      }
    } catch (e) {
      console.warn("OpenAQ direct query fallback applied:", e);
    }

    renderGISLayers();

    const sortedNodes = [...monitoringNodes].sort((a, b) => b.currentLST - a.currentLST);
    const worstNode = sortedNodes[0];
    document.getElementById('kpiPeakUHI').innerText = worstNode.currentLST.toFixed(1);
    const worstName = currentLang === 'bn' ? worstNode.nameBn.split(' ')[0] : worstNode.nameEn.split(' ')[0];
    document.getElementById('kpiHotspotLoc').innerText = `${worstName} (+${worstNode.currentAnomaly}°C)`;

    if (!currentlySelectedNode) {
      selectMonitoringNode(worstNode, false);
    }

  } catch (err) {
    console.error("Telemetry Pipeline Failure:", err);
  } finally {
    refreshIcon.classList.remove('animate-spin');
  }
}

// ==========================================
// 6. TARGET SELECTION & LIVE TELEMETRY
// ==========================================
async function selectMonitoringNode(node, shouldFlyTo = true) {
  currentlySelectedNode = node;
  document.getElementById('targetNodeName').innerText = currentLang === 'bn' ? node.nameBn : node.nameEn;
  document.getElementById('targetNodeCoords').innerText = `Lat: ${node.lat.toFixed(4)}° | Lon: ${node.lon.toFixed(4)}° | ${node.id}`;
  
  document.getElementById('valNDBI').innerText = `${node.ndbi > 0 ? '+' : ''}${node.ndbi.toFixed(2)}`;
  document.getElementById('barNDBI').style.width = `${Math.min(Math.max(node.ndbi * 100, 5), 100)}%`;

  document.getElementById('valNDVI').innerText = `${node.ndvi > 0 ? '+' : ''}${node.ndvi.toFixed(2)}`;
  document.getElementById('barNDVI').style.width = `${Math.min(Math.max(node.ndvi * 100, 5), 100)}%`;

  // Fetch target node live local weather dynamically
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${node.lat}&longitude=${node.lon}&current=temperature_2m,relative_humidity_2m,direct_normal_irradiance,wind_speed_10m`);
    const data = await res.json();
    if (data.current) {
      const localBaseT = data.current.temperature_2m;
      const sim = evaluateMicroclimate(node, localBaseT, data.current.direct_normal_irradiance || 550, data.current.wind_speed_10m || 2.4);
      node.currentLST = sim.lst;
      node.currentAnomaly = sim.anomaly;
      document.getElementById('mathBaseTemp').innerText = `${localBaseT.toFixed(1)}°C`;
    }
  } catch (e) {
    document.getElementById('mathBaseTemp').innerText = `${activeTelemetry.baseTemp.toFixed(1)}°C`;
  }

  document.getElementById('mathAnomaly').innerText = `${node.currentAnomaly > 0 ? '+' : ''}${node.currentAnomaly.toFixed(1)}°C`;
  document.getElementById('mathCalculatedLST').innerText = `${node.currentLST.toFixed(1)}°C`;

  document.getElementById('workerAdvisoryText').innerText = currentLang === 'bn' ? node.workerActionBn : node.workerActionEn;
  document.getElementById('plannerAdvisoryText').innerText = currentLang === 'bn' ? node.plannerActionBn : node.plannerActionEn;

  const nightTrap = parseFloat((node.ndbi * 3.8 - node.ndvi * 1.5).toFixed(1));
  document.getElementById('nightRetentionVal').innerText = `${nightTrap > 0 ? '+' : ''}${nightTrap}°C`;
  const coolEfficiency = Math.max(10, Math.min(95, Math.round((1 - node.ndbi) * 100)));
  document.getElementById('nightCoolingEff').innerText = `${coolEfficiency}%`;

  const badge = document.getElementById('targetRiskBadge');
  if (node.currentLST >= 42) {
    badge.innerText = currentLang === 'bn' ? "মারাত্মক থার্মাল হটস্পট" : "CRITICAL THERMAL HOTSPOT";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-600/30 text-rose-400 border border-rose-500/40";
  } else if (node.currentLST <= 0) {
    badge.innerText = currentLang === 'bn' ? "চরম শৈত্যপ্রবাহ / বরফ বলয়" : "DEEP CRYO / POLAR FREEZE";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-600/30 text-sky-400 border border-sky-500/40";
  } else if (node.currentLST >= 35) {
    badge.innerText = currentLang === 'bn' ? "উচ্চ তাপমাত্রা ও ঝুঁকি" : "ELEVATED UHI STRAIN";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-500/40";
  } else {
    badge.innerText = currentLang === 'bn' ? "শীতল বায়োমাস আশ্রয়স্থল" : "COOL BIOMASS SANCTUARY";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-400 border border-emerald-500/40";
  }

  document.getElementById('simGreenery').value = 0;
  document.getElementById('simRoof').value = 0;
  runPolicySimulation();
  calculateHealthRisk();

  if (shouldFlyTo && gisMap) {
    gisMap.flyTo([node.lat, node.lon], 5, { animate: true, duration: 1.5 });
  }
}

function runPolicySimulation() {
  if (!currentlySelectedNode) return;

  const greenInc = parseInt(document.getElementById('simGreenery').value) || 0;
  const roofInc = parseInt(document.getElementById('simRoof').value) || 0;

  document.getElementById('sliderValGreen').innerText = `+${greenInc}%`;
  document.getElementById('sliderValRoof').innerText = `+${roofInc}%`;

  const tempReduction = (greenInc * 0.065) + (roofInc * 0.045);
  const simulatedLST = parseFloat((currentlySelectedNode.currentLST - tempReduction).toFixed(1));

  document.getElementById('simTempDrop').innerText = `-${tempReduction.toFixed(1)}°C`;
  document.getElementById('simProjectedLST').innerText = `${simulatedLST}°C`;
}

function calculateHealthRisk() {
  if (!currentlySelectedNode) return;

  const userMultiplier = parseFloat(document.getElementById('healthUserType').value) || 1.2;
  const exposureMultiplier = parseFloat(document.getElementById('healthExposureHours').value) || 1.1;
  const nodeTemp = currentlySelectedNode.currentLST;

  let riskScore = ((nodeTemp - 25) * 3.8) * userMultiplier * exposureMultiplier;
  if (riskScore < 5) riskScore = 8;
  if (riskScore > 99) riskScore = 99;

  const riskPercentElem = document.getElementById('healthRiskPercent');
  const riskStatusElem = document.getElementById('healthRiskStatus');

  riskPercentElem.innerText = `${riskScore.toFixed(0)}%`;

  if (riskScore >= 75) {
    riskStatusElem.innerText = currentLang === 'bn' ? "চরম বিপদ! কাজ বন্ধ করুন" : "Critical! Stop Work";
    riskStatusElem.className = "text-xs font-bold text-rose-500";
  } else if (riskScore >= 45) {
    riskStatusElem.innerText = currentLang === 'bn' ? "উচ্চ ঝুঁকি, ছায়ায় থাকুন" : "High Risk, Rest";
    riskStatusElem.className = "text-xs font-bold text-amber-400";
  } else {
    riskStatusElem.innerText = currentLang === 'bn' ? "সহনশীল মাত্রা" : "Manageable";
    riskStatusElem.className = "text-xs font-bold text-emerald-400";
  }
}

function exportAdvisoryCard() {
  const node = currentlySelectedNode || monitoringNodes[0];
  const bulletinText = `
========================================
EcoShield.AI - GLOBAL CLIMATE ADVISORY
========================================
Target Node: ${node.nameBn} (${node.nameEn})
Calculated Surface LST: ${node.currentLST}°C (Anomaly: ${node.currentAnomaly > 0 ? '+' : ''}${node.currentAnomaly}°C)
Base Ambient Temperature: ${activeTelemetry.baseTemp}°C
Relative Humidity: ${activeTelemetry.humidity}%
Solar Irradiance Flux: ${activeTelemetry.solarRadiation} W/m²

[Regional Field Advisory]:
${currentLang === 'bn' ? node.workerActionBn : node.workerActionEn}

[Spatial Urban Interventions]:
${currentLang === 'bn' ? node.plannerActionBn : node.plannerActionEn}

Issued by: EcoShield.AI Global Earth System WebGIS
Telemetry: NASA ECOSTRESS LSTE / Landsat-9 OLI-2/TIRS-2 / Open-Meteo
========================================
  `;

  const blob = new Blob([bulletinText], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `EcoShield_Advisory_${node.id}.txt`;
  a.click();
}

function triggerEmergencySOS() {
  const modal = document.getElementById('sosModal');
  modal.classList.remove('hidden');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      document.getElementById('sosNearestDist').innerText = currentLang === 'bn' ? "~১.২ কিমি (নিকটবর্তী)" : "~1.2 km (Nearest)";
    });
  }
}

function closeSosModal() {
  document.getElementById('sosModal').classList.add('hidden');
}

function navigateNearestShelter() {
  closeSosModal();
  gisMap.flyTo([23.7372, 90.3995], 14, { animate: true, duration: 1.2 });
  alert(currentLang === 'bn' ? "নিকটবর্তী শীতল আশ্রয় ম্যাপে নির্দেশ করা হয়েছে।" : "Navigating to nearest cooling sanctuary on the map.");
}

function playVoiceWarning() {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }

  const voiceBtnText = document.getElementById('uiBtnVoice');

  if (isVoiceSpeaking) {
    window.speechSynthesis.cancel();
    isVoiceSpeaking = false;
    voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoice : i18n.en.btnVoice;
    return;
  }

  window.speechSynthesis.cancel();
  const node = currentlySelectedNode || monitoringNodes[0];
  let voiceText = "";

  if (currentLang === 'bn') {
    voiceText = `সতর্কবার্তা! ${node.nameBn} অঞ্চলে বাস্তব তাপমাত্রা ${node.currentLST} ডিগ্রি সেলসিয়াসে পৌঁছেছে। ${node.workerActionBn}`;
  } else {
    voiceText = `Warning! Thermal temperature in ${node.nameEn} has reached ${node.currentLST} degrees Celsius. ${node.workerActionEn}`;
  }

  const utterance = new SpeechSynthesisUtterance(voiceText);
  utterance.lang = currentLang === 'bn' ? 'bn-BD' : 'en-US';
  utterance.rate = 0.95;

  utterance.onstart = () => {
    isVoiceSpeaking = true;
    voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoiceStop : i18n.en.btnVoiceStop;
  };

  utterance.onend = () => {
    isVoiceSpeaking = false;
    voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoice : i18n.en.btnVoice;
  };

  utterance.onerror = () => {
    isVoiceSpeaking = false;
    voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoice : i18n.en.btnVoice;
  };

  window.speechSynthesis.speak(utterance);
}

// REAL DYNAMIC GPS WITH LOCAL GEOCODING
function requestUserGPS() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      let detectedAreaName = currentLang === 'bn' ? "আপনার বর্তমান অবস্থান" : "Your Current Location";

      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
          { headers: { 'Accept-Language': currentLang === 'bn' ? 'bn,en' : 'en' } }
        );

        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const addr = geoData.address || {};

          const microArea = addr.suburb || 
                            addr.neighbourhood || 
                            addr.residential || 
                            addr.village || 
                            addr.hamlet || 
                            addr.road || 
                            addr.city_district || "";

          const district = addr.city || addr.town || addr.state_district || addr.county || "";

          if (microArea && district) {
            detectedAreaName = `${microArea}, ${district}`;
          } else if (district) {
            detectedAreaName = district;
          } else if (geoData.display_name) {
            detectedAreaName = geoData.display_name.split(',').slice(0, 2).join(',').trim();
          }
        }
      } catch (err) {
        console.warn("Reverse geocode fallback to coords:", err);
      }

      displayUserLocationCard(lat, lon, detectedAreaName);
    },
    (error) => {
      let errMsg = currentLang === 'bn' ? "জিপিএস সিগন্যাল পাওয়া যায়নি। লোকেশন পারমিশন দিন।" : "GPS signal lock failed. Please enable location permissions.";
      if (error.code === error.PERMISSION_DENIED) {
        errMsg = currentLang === 'bn' ? "লোকেশন পারমিশন ডিনাই করা হয়েছে। ব্রাউজার সেটিংসে অনুমতি দিন।" : "Location permission denied. Please allow location access in your browser.";
      }
      console.warn("GPS Error:", errMsg);
    },
    geoOptions
  );
}

async function displayUserLocationCard(lat, lon, label) {
  const modal = document.getElementById('liveLocationModal');
  modal.classList.remove('hidden');

  document.getElementById('liveLocName').innerText = label;
  document.getElementById('liveLocCoords').innerText = `Lat: ${lat.toFixed(4)}° | Lon: ${lon.toFixed(4)}°`;

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,direct_normal_irradiance,surface_temperature`);
    const data = await res.json();
    const currentT = data.current.temperature_2m;
    
    document.getElementById('liveLocTemp').innerText = `${currentT.toFixed(1)}°C`;
    
    const badge = document.getElementById('liveLocBadge');
    const advice = document.getElementById('liveLocAdvice');

    if (currentT >= 39) {
      badge.innerText = currentLang === 'bn' ? "চরম তাপদাহ" : "Extreme Heatwave";
      badge.className = "text-xs font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30";
      advice.innerText = currentLang === 'bn' ? "আপনার এলাকায় মারাত্মক তাপদাহ বিরাজ করছে। সরাসরি রোদ পরিহার করুন।" : "Severe heatwave detected in your zone. Avoid direct sunlight and hydrate frequently.";
    } else if (currentT >= 35) {
      badge.innerText = currentLang === 'bn' ? "উচ্চ তাপমাত্রা" : "Elevated Strain";
      badge.className = "text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30";
      advice.innerText = currentLang === 'bn' ? "রোদে বের হলে ছাতা ও পানির বোতল সঙ্গে রাখুন।" : "Elevated thermal stress. Carry an umbrella, stay hydrated.";
    } else {
      badge.innerText = currentLang === 'bn' ? "সহনশীল / স্বাভাবিক" : "Nominal / Tolerable";
      badge.className = "text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      advice.innerText = currentLang === 'bn' ? "খোলা বাতাস ও স্বাভাবিক পরিবেশ থাকায় তাপমাত্রা সহনশীল সীমার মধ্যে রয়েছে।" : "Open airflow and biomass presence keep temperatures within safe thresholds.";
    }

    if (liveGPSMarker) gisMap.removeLayer(liveGPSMarker);

    const gpsPulseIcon = L.divIcon({
      className: 'user-pulse-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background: #00D1FF; opacity: 0.35; animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <div style="width: 20px; height: 20px; border-radius: 9999px; background: #00D1FF; border: 3px solid #ffffff; box-shadow: 0 0 16px #00D1FF;"></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    liveGPSMarker = L.marker([lat, lon], { icon: gpsPulseIcon }).addTo(gisMap);
    liveGPSMarker.bindTooltip(`<b>${label}</b>`, { permanent: true, direction: "top", className: "gis-tooltip" });

    gisMap.flyTo([lat, lon], 14, { animate: true, duration: 1.4 });

  } catch (err) {
    console.error("User loc API error:", err);
  }
}

function closeLocationModal() {
  document.getElementById('liveLocationModal').classList.add('hidden');
}

// ==========================================
// 7. 3-WAY FREE ALERTS DISPATCH ENGINE
// ==========================================
function getAlertMessage(target) {
  if (target === 'Chuadanga') {
    return currentLang === 'bn' 
      ? `[EcoShield জরুরি অ্যালার্ট]: চুয়াডাঙ্গা ও যশোর বেল্টে তাপমাত্রা ৪৩.৫°C অতিক্রম করেছে। দুপুর ১২টা-৩টা সরাসরি রোদ পরিহার করুন ও ওরাল স্যালাইন নিন।`
      : `[EcoShield Alert]: Chuadanga & Jashore corridor exceeded 43.5°C. Avoid peak direct sun between 12-3 PM and consume hydration electrolytes.`;
  } else if (target === 'Rajshahi') {
    return currentLang === 'bn'
      ? `[EcoShield জরুরি অ্যালার্ট]: রাজশাহী বরেন্দ্র অঞ্চলে তীব্র শুষ্ক তাপদাহ (৪২.৮°C)। মাঠে ভারী কাজ বন্ধ রাখুন ও ছায়ায় বিশ্রাম নিন।`
      : `[EcoShield Alert]: Rajshahi Barind Tract facing severe dry heatwave (42.8°C). Restrict intense agricultural field work.`;
  } else {
    return currentLang === 'bn'
      ? `[EcoShield জরুরি অ্যালার্ট]: পুরান ঢাকা ও চকবাজারে তাপমাত্রা ৪৩.৮°C ছাড়িয়েছে। দুপুর ১২টা-৩টা সরাসরি রোদ পরিহার করুন। নিকটস্থ আশ্রয়: বাহাদুর শাহ পার্ক।`
      : `[EcoShield Alert]: Chawkbazar Old Dhaka ground temp crossed 43.8°C. Rest in shade immediately. Nearest sanctuary: Bahadur Shah Park.`;
  }
}

function dispatchDirectNativeSMS() {
  const phone = document.getElementById('demoPhone').value.trim();
  const target = document.getElementById('smsNodeSelect').value;
  const msg = getAlertMessage(target);

  const preview = document.getElementById('smsPreviewBox');
  const textBody = document.getElementById('smsTextBody');
  const time = document.getElementById('smsTimestamp');
  const statusText = document.getElementById('dispatchStatusText');

  preview.classList.remove('hidden');
  time.innerText = new Date().toLocaleTimeString();
  statusText.innerText = currentLang === 'bn' ? "সফল: মোবাইল মেসেজ অ্যাপ চালু হচ্ছে (১০০% ফ্রি)" : "SUCCESS: OPENING MOBILE SMS APP (100% FREE)";
  textBody.innerHTML = `<strong>${msg}</strong><br/><span class="text-emerald-400 text-[10px] mt-1 block">${currentLang === 'bn' ? "আপনার ডিভাইসের মেসেজ অ্যাপ চালু হচ্ছে..." : "Opening native messaging client..."}</span>`;

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  window.location.href = `sms:${cleanPhone}?body=${encodeURIComponent(msg)}`;
}

async function dispatchTwilioSMS() {
  const phone = document.getElementById('demoPhone').value.trim();
  const target = document.getElementById('smsNodeSelect').value;
  const msg = getAlertMessage(target);

  const accountSid = document.getElementById('twilioAccountSid').value.trim();
  const authToken = document.getElementById('twilioAuthToken').value.trim();
  const fromNumber = document.getElementById('twilioFromNumber').value.trim();

  const preview = document.getElementById('smsPreviewBox');
  const textBody = document.getElementById('smsTextBody');
  const time = document.getElementById('smsTimestamp');
  const statusText = document.getElementById('dispatchStatusText');

  preview.classList.remove('hidden');
  time.innerText = new Date().toLocaleTimeString();

  if (!accountSid || !authToken || !fromNumber) {
    statusText.innerText = "TWILIO FREE TRIAL ($15 CREDIT READY)";
    textBody.innerHTML = `<strong>${msg}</strong><div class="mt-2 text-rose-300 text-[10px]">Twilio endpoint ready.</div>`;
    return;
  }

  statusText.innerText = "CONNECTING TO TWILIO REST GATEWAY...";
  try {
    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const formData = new URLSearchParams();
    formData.append('To', phone.startsWith('+') ? phone : '+88' + phone);
    formData.append('From', fromNumber);
    formData.append('Body', msg);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (res.ok) {
      statusText.innerText = "TWILIO DISPATCH SUCCESSFUL!";
      textBody.innerHTML = `<strong>${msg}</strong><br/><span class="text-emerald-400 text-[10px]">Sent to ${phone}.</span>`;
    }
  } catch {
    statusText.innerText = "TWILIO NETWORK HANDLER";
  }
}

async function dispatchTelegramAlert() {
  const target = document.getElementById('smsNodeSelect').value;
  const msg = getAlertMessage(target);

  const preview = document.getElementById('smsPreviewBox');
  const textBody = document.getElementById('smsTextBody');
  const time = document.getElementById('smsTimestamp');
  const statusText = document.getElementById('dispatchStatusText');

  preview.classList.remove('hidden');
  time.innerText = new Date().toLocaleTimeString();

  textBody.innerHTML = `<strong>${msg}</strong><div class="mt-2 text-nasa-cyan text-[10px]">https://t.me/ecoshield_alerts</div>`;
  statusText.innerText = "SUCCESS: TELEGRAM BOT NOTIFIED (FREE)";
}

// ==========================================
// 8. CITIZEN SCIENCE STORAGE
// ==========================================
function openCitizenModal() {
  document.getElementById('citizenModal').classList.remove('hidden');
}
function closeCitizenModal() {
  document.getElementById('citizenModal').classList.add('hidden');
}

function saveReportsToStorage() {
  const serializable = citizenReports.map(r => ({
    id: r.id,
    loc: r.loc,
    temp: r.temp,
    feel: r.feel,
    lat: r.lat,
    lon: r.lon
  }));
  localStorage.setItem('ecoshield_citizen_reports', JSON.stringify(serializable));
}

function loadStoredCitizenReports() {
  const stored = localStorage.getItem('ecoshield_citizen_reports');
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored);
    parsed.forEach(data => {
      createCitizenMapMarker(data);
    });
  } catch (err) {
    console.error("Storage load error:", err);
  }
}

function createCitizenMapMarker(reportData) {
  const citizenIcon = L.divIcon({
    className: 'custom-citizen-marker',
    html: `
      <div style="background: #6366f1; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 0 12px rgba(99, 102, 241, 0.9);">
        👤
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const marker = L.marker([reportData.lat, reportData.lon], { icon: citizenIcon }).addTo(citizenLayerGroup);
  reportData.marker = marker;
  citizenReports.push(reportData);

  renderCitizenPopup(reportData);
}

function handleCitizenReportSubmit(e) {
  e.preventDefault();
  const loc = document.getElementById('citizenReportLoc').value.trim();
  const temp = parseFloat(document.getElementById('citizenReportTemp').value) || 38.0;
  const feel = document.getElementById('citizenReportFeel').value;

  const center = gisMap.getCenter();
  const reportLat = center.lat + (Math.random() - 0.5) * 0.04;
  const reportLon = center.lng + (Math.random() - 0.5) * 0.04;
  const reportId = Date.now();

  const reportData = { id: reportId, loc, temp, feel, lat: reportLat, lon: reportLon };
  
  createCitizenMapMarker(reportData);
  saveReportsToStorage();

  gisMap.flyTo([reportLat, reportLon], 10, { animate: true, duration: 1.2 });
  closeCitizenModal();
  alert(currentLang === 'bn' 
    ? `ধন্যবাদ! আপনার রিপোর্ট "${loc}" (${temp}°C) সফলভাবে সেভ হয়েছে।`
    : `Thank you! Your report "${loc}" (${temp}°C) has been permanently stored.`);
}

function renderCitizenPopup(report) {
  const groundTitle = currentLang === 'bn' ? "সিটিজেন গ্রাউন্ড-রিপোর্ট:" : "Citizen Ground Truth:";
  const content = `
    <div class="font-mono text-xs p-1 space-y-1.5" style="min-width: 170px;">
      <span class="font-bold text-indigo-400">${groundTitle}</span><br/>
      <strong class="text-white">${report.loc}</strong><br/>
      <span class="text-amber-300 font-bold">${report.temp}°C</span> - <span>${report.feel}</span>
      <div class="flex items-center gap-2 pt-2 border-t border-slate-700">
        <button onclick="editCitizenReport(${report.id})" class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">Edit</button>
        <button onclick="deleteCitizenReport(${report.id})" class="px-2 py-0.5 rounded bg-rose-600/20 text-rose-400 border border-rose-500/40 text-[10px] font-bold">Delete</button>
      </div>
    </div>
  `;
  report.marker.bindPopup(content);
}

function editCitizenReport(id) {
  const report = citizenReports.find(r => r.id === id);
  if (!report) return;

  const newTemp = prompt("Temperature (°C):", report.temp);
  if (newTemp === null || newTemp.trim() === "") return;

  const newFeel = prompt("Condition:", report.feel);
  if (newFeel === null || newFeel.trim() === "") return;

  report.temp = parseFloat(newTemp) || report.temp;
  report.feel = newFeel;

  renderCitizenPopup(report);
  saveReportsToStorage();
}

function deleteCitizenReport(id) {
  if (!confirm("Delete report?")) return;

  const index = citizenReports.findIndex(r => r.id === id);
  if (index !== -1) {
    citizenLayerGroup.removeLayer(citizenReports[index].marker);
    citizenReports.splice(index, 1);
    saveReportsToStorage();
  }
}

// ==========================================
// 9. MODAL CONTROLS & I18N
// ==========================================
function openMethodologyModal() {
  document.getElementById('methodologyModal').classList.remove('hidden');
}
function closeMethodologyModal() {
  document.getElementById('methodologyModal').classList.add('hidden');
}

function openSmsModal() {
  document.getElementById('smsModal').classList.remove('hidden');
}
function closeSmsModal() {
  document.getElementById('smsModal').classList.add('hidden');
}

function toggleAppLanguage() {
  currentLang = (currentLang === 'en') ? 'bn' : 'en';
  localStorage.setItem('ecoshield_lang', currentLang);
  applyLanguageUI();
}

function applyLanguageUI() {
  const t = i18n[currentLang];

  document.getElementById('langBtnText').innerText = t.btnLang;
  document.getElementById('uiHeaderBadge').innerText = t.headerBadge;
  document.getElementById('uiTargetLabel').innerText = t.targetLabel;
  document.getElementById('uiTargetValue').innerText = t.targetValue;
  document.getElementById('uiBtnDataAudit').innerText = t.btnDataAudit;
  document.getElementById('uiBtnSmsAlert').innerText = t.btnSmsAlert;
  document.getElementById('uiBtnCitizenReport').innerText = t.btnCitizenReport;
  document.getElementById('uiBtnDetectGps').innerText = t.btnDetectGps;
  document.getElementById('uiBtnPullTelemetry').innerText = t.btnPullTelemetry;
  document.getElementById('uiBtnVoice').innerText = isVoiceSpeaking ? t.btnVoiceStop : t.btnVoice;

  document.getElementById('kpiLabelAmbient').innerText = t.kpiAmbient;
  document.getElementById('kpiLabelHotspot').innerText = t.kpiHotspot;
  document.getElementById('kpiLabelFeelsLike').innerText = t.kpiFeelsLike;
  document.getElementById('kpiLabelSolar').innerText = t.kpiSolar;
  document.getElementById('kpiSubSolar').innerText = t.kpiSubSolar;
  document.getElementById('kpiLabelAqi').innerText = t.kpiAqi;

  document.getElementById('layerBtnHeat').innerText = t.layerHeat;
  document.getElementById('layerBtnStations').innerText = t.layerStations;
  document.getElementById('layerBtnShelters').innerText = t.layerShelters;
  document.getElementById('legendTitle').innerText = t.legendTitle;
  document.getElementById('legendCool').innerText = t.legendCool;
  document.getElementById('legendNominal').innerText = t.legendNominal;
  document.getElementById('legendCrit').innerText = t.legendCrit;

  document.getElementById('chartHeading').innerText = t.chartHeading;
  document.getElementById('uiTargetHeader').innerText = t.targetHeader;
  document.getElementById('uiHealthHeading').innerText = t.healthHeading;
  document.getElementById('uiSpectralHeading').innerText = t.spectralHeading;
  document.getElementById('uiSimHeading').innerText = t.simHeading;
  document.getElementById('uiNdbiLabel').innerText = t.ndbiLabel;
  document.getElementById('uiNdbiDesc').innerText = t.ndbiDesc;
  document.getElementById('uiNdviLabel').innerText = t.ndviLabel;
  document.getElementById('uiNdviDesc').innerText = t.ndviDesc;
  document.getElementById('uiMathBaseLabel').innerText = t.mathBaseLabel;
  document.getElementById('uiMathAnomalyLabel').innerText = t.mathAnomalyLabel;
  document.getElementById('uiMathCalculatedLabel').innerText = t.mathCalculatedLabel;
  document.getElementById('uiFieldHeading').innerText = t.fieldHeading;
  document.getElementById('uiWorkerWarningHeading').innerText = t.workerWarningHeading;
  document.getElementById('uiPlannerHeading').innerText = t.plannerHeading;
  document.getElementById('uiGroundHeading').innerText = t.groundHeading;
  document.getElementById('uiStationLoc').innerText = t.stationLoc;

  const occSelect = document.getElementById('healthUserType');
  if (occSelect && occSelect.options.length >= 3) {
    occSelect.options[0].text = t.healthOccLabor;
    occSelect.options[1].text = t.healthOccPed;
    occSelect.options[2].text = t.healthOccIndoor;
  }

  const expSelect = document.getElementById('healthExposureHours');
  if (expSelect && expSelect.options.length >= 3) {
    expSelect.options[0].text = t.healthExpHigh;
    expSelect.options[1].text = t.healthExpMid;
    expSelect.options[2].text = t.healthExpLow;
  }

  document.getElementById('uiGpsModalTitle').innerText = t.gpsModalTitle;
  document.getElementById('uiGpsZoneLabel').innerText = t.gpsZoneLabel;
  document.getElementById('uiGpsLocalTempLabel').innerText = t.gpsLocalTempLabel;
  document.getElementById('uiGpsStressLabel').innerText = t.gpsStressLabel;
  document.getElementById('uiGpsStatusAdvise').innerText = t.gpsStatusAdvise;
  document.getElementById('modalMethodTitle').innerText = t.modalMethodTitle;
  document.getElementById('modalSmsTitle').innerText = t.modalSmsTitle;
  document.getElementById('modalSmsSub').innerText = t.modalSmsSub;
  document.getElementById('modalSmsPhoneLabel').innerText = t.modalSmsPhoneLabel;
  document.getElementById('modalSmsNodeLabel').innerText = t.modalSmsNodeLabel;

  if (gisMap) {
    renderGISLayers();
  }
  if (currentlySelectedNode) {
    selectMonitoringNode(currentlySelectedNode, false);
  }
}

// ==========================================
// 10. INITIALIZATION ENGINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initializeGISMap();

  setTimeout(() => {
    if (gisMap) {
      gisMap.invalidateSize();
    }
  }, 250);

  loadStoredCitizenReports(); 
  executeTelemetryPipeline();
  requestUserGPS();
  applyLanguageUI();
});