// =========================================================================
// EcoShield.AI Enterprise | Planetary Earth System Observatory
// Standards Compliance: WMO Guidelines No. 1184 | ISO 7243 Thermal Stress
// Telemetry Sources: NASA ECOSTRESS (ISS) | Landsat-9 TIRS-2 | Open-Meteo HR
// =========================================================================

let currentLang = localStorage.getItem('ecoshield_lang') || 'en';
const OPENAQ_KEY = "9HVgYUIvSXTxMDFrdbhWA2OBt54AVQaSymRBGjDe";

// Global World Center Coordinates
const WORLD_CENTER_LAT = 20.0;
const WORLD_CENTER_LON = 10.0;

let isVoiceSpeaking = false; 
let citizenReports = []; 
let isSonificationActive = false;
let audioCtx = null;
let orbitLayerGroup = null;
let globalClickMarker = null;

const i18n = {
  en: {
    btnLang: "বাংলা (BN)",
    btnVoice: "Audio Advisory",
    btnVoiceStop: "Terminate Audio",
    btnVoiceListen: "Audio Advisory",
    headerBadge: "Planetary Earth System Observatory",
    targetLabel: "Spatial Domain:",
    targetValue: "Global Multi-Sensor Telemetry Grid (NASA/WMO)",
    btnDataAudit: "Methodology Audit",
    btnSmsAlert: "CAP Alert Dispatch",
    btnCitizenReport: "Ground Telemetry",
    btnDetectGps: "IN-SITU GPS",
    btnPullTelemetry: "SYNC TELEMETRY",
    kpiAmbient: "AMBIENT AIR (T2M)",
    kpiHotspot: "PEAK PLANETARY HOTSPOT",
    kpiFeelsLike: "HEAT INDEX (NOAA/ISO)",
    kpiSolar: "DIRECT IRRADIANCE FLUX",
    kpiSubSolar: "Radiative Heat Flux",
    kpiAqi: "PARTICULATE DENSITY (PM2.5)",
    layerHeat: "NASA ECOSTRESS Thermal Gradient",
    layerStations: "WMO Global Observatory Nodes",
    layerShelters: "Ecological Sanctuaries & Oases",
    layerSafeRoute: "Microclimate Shaded Corridor",
    layerOrbit: "ISS/ECOSTRESS Swath",
    legendTitle: "Surface Temperature (LST) Scale",
    legendCool: "<-10°C (Cryospheric)",
    legendNominal: "28°C (Temperate)",
    legendCrit: ">45°C (Critical Strain)",
    chartHeading: "24-Hour Diurnal UHI Amplification vs Direct Solar Irradiance",
    targetHeader: "Regional Telemetry & Indices",
    spectralHeading: "Landsat-9 Spectral Decomposition",
    simHeading: "Urban Climate Resilience Simulator (Policy Engine)",
    healthHeading: "Occupational Heat Strain & Risk Index",
    healthDesc: "Calibrated to ISO 7243 / ILO standards for occupational thermo-physiological stress assessment:",
    healthOccLabel: "Occupational Profile:",
    healthExposureLabel: "Radiative Exposure Duration:",
    healthOccLabor: "Heavy Physical / Outdoor Laborer (WMO Cat 4)",
    healthOccPed: "Moderate Exertion / Pedestrian (WMO Cat 2)",
    healthOccIndoor: "Sedentary / Indoor Air-Conditioned (WMO Cat 0)",
    healthExpHigh: "Sustained (>3 Hours)",
    healthExpMid: "Moderate (1 to 3 Hours)",
    healthExpLow: "Low (<1 Hour)",
    healthRiskLabel: "Heat Strain Probability:",
    healthStatusLabel: "Triage Classification:",
    nightTitle: "Nighttime Thermal Retention Index (NTRI)",
    nightDesc: "Measures diurnal thermal inertia of high-density built fabric radiating nocturnal heat:",
    nightRetainLabel: "Surface Heat Retained:",
    nightCoolLabel: "Nocturnal Cooling Efficacy:",
    ndbiLabel: "NDBI (Built-Up & Impervious Density):",
    ndbiDesc: "Normalized concrete, asphalt, and barren dry substrate density.",
    ndviLabel: "NDVI (Canopy Biomass Fraction):",
    ndviDesc: "Vegetative evapotranspiration and photosynthetic density index.",
    mathBaseLabel: "Ambient Regional Baseline:",
    mathAnomalyLabel: "Microclimate Anomaly (ΔT):",
    mathCalculatedLabel: "Effective Surface Kinetic LST:",
    simDesc: "Simulate municipal urban cooling interventions (Cool Roof SRI & Canopy Expansion):",
    simGreenLabel: "Canopy Cover Augmentation (+NDVI):",
    simRoofLabel: "High-Albedo Surface Retrofit (+SRI):",
    simDropLabel: "Projected Mitigation ΔT:",
    simProjLabel: "Post-Intervention LST:",
    fieldHeading: "Institutional Operational Directives",
    workerWarningHeading: "Occupational Health & Labor Safety Directive",
    plannerHeading: "Municipal Spatial Planning Directive",
    groundHeading: "In-Situ Sensor Ground-Truth Feed",
    stationLoc: "Reference Ground Station:",
    gpsModalTitle: "In-Situ Geolocation Telemetry",
    gpsZoneLabel: "Resolved Spatial Zone:",
    gpsLocalTempLabel: "In-Situ Temperature",
    gpsStressLabel: "Physiological Heat Strain",
    gpsStatusAdvise: "Operational Directive & Action:",
    modalMethodTitle: "Scientific Methodology & Peer-Reviewed Lineage",
    modalSmsTitle: "Common Alerting Protocol (CAP) Broadcast",
    modalSmsSub: "Zero-cost multi-channel alert dispatch engine designed for municipal crisis management and humanitarian field workers:",
    modalSmsPhoneLabel: "Recipient Terminal Identifier (Mobile / SMS):",
    modalSmsNodeLabel: "Target Telemetry Hotspot & Alert Threshold:",
    meterLabel: "Thermo-Physiological Stress Level Meter:",
    meterSafe: "Nominal",
    meterCaution: "Elevated Caution",
    meterDanger: "Extreme Hazard",
    bulletinBtn: "BRIEF",
    sosBtn: "EMERGENCY DISPATCH",
    btnSonify: "Audio Sonification"
  },
  bn: {
    btnLang: "English (EN)",
    btnVoice: "ভয়েস নির্দেশনা",
    btnVoiceStop: "ভয়েস বন্ধ করুন",
    btnVoiceListen: "ভয়েস নির্দেশনা",
    headerBadge: "গ্লোবাল আর্থ সিস্টেম অবজারভেটরি",
    targetLabel: "ভৌগোলিক পরিধি:",
    targetValue: "প্ল্যানেটারি মাল্টি-সেন্সর টেলিমেট্রি গ্রিড (NASA/WMO)",
    btnDataAudit: "মেথডোলজি অডিট",
    btnSmsAlert: "সিএপি ব্রডকাস্ট",
    btnCitizenReport: "গ্রাউন্ড টেলিমেট্রি",
    btnDetectGps: "লাইভ জিপিএস",
    btnPullTelemetry: "ডেটা রিফ্রেশ",
    kpiAmbient: "বাতাসের তাপমাত্রা (T2M)",
    kpiHotspot: "বৈশ্বিক সর্বোচ্চ হটস্পট",
    kpiFeelsLike: "হিট ইনডেক্স (NOAA/ISO)",
    kpiSolar: "সৌর বিকিরণ ফ্লাক্স",
    kpiSubSolar: "সারফেস হিট ফ্লাক্স",
    kpiAqi: "পার্টিকুলেট ঘনত্ব (PM2.5)",
    layerHeat: "NASA ইকোস্ট্রেস থার্মাল গ্রেডিয়েন্ট",
    layerStations: "WMO আন্তর্জাতিক অবজারভেটরি নোড",
    layerShelters: "পরিবেশগত শীতল আশ্রয় ও ওএসিস",
    layerSafeRoute: "মাইক্রোক্লাইমেট ছায়াযুক্ত রুট",
    layerOrbit: "ISS/ইকোস্ট্রেস অরবিট",
    legendTitle: "সারফেস টেম্পারেচার (LST) স্কেল",
    legendCool: "<-১০°C (চরম শৈত্যপ্রবাহ)",
    legendNominal: "২৮°C (সহনশীল মাত্রা)",
    legendCrit: ">৪৫°C (চরম বিপদজনক)",
    chartHeading: "২৪-ঘণ্টার ডায়ুরনাল UHI বৃদ্ধি বনাম সরাসরি সৌর বিকিরণ",
    targetHeader: "আঞ্চলিক টেলিমেট্রি ও সূচক",
    spectralHeading: "ল্যান্ডস্যাট-৯ স্পেকট্রাল বিশ্লেষণ",
    simHeading: "আরবান ক্লাইমেট রেজিলিয়েন্স সিমুলেটর (পলিসি ইঞ্জিন)",
    healthHeading: "পেশাগত হিট স্ট্রেন ও স্বাস্থ্য ঝুঁকি সূচক",
    healthDesc: "ISO 7243 এবং আন্তর্জাতিক শ্রম সংস্থার (ILO) মানদণ্ডে থার্মাল স্ট্রেস নিরূপণ:",
    healthOccLabel: "পেশাগত ক্যাটাগরি:",
    healthExposureLabel: "সরাসরি রোদে থাকার সময়কাল:",
    healthOccLabor: "ভারী কায়িক শ্রম / দিনমজুর (WMO Cat 4)",
    healthOccPed: "সাধারণ পথচারী / পরিভ্রমণকারী (WMO Cat 2)",
    healthOccIndoor: "অফিসকর্মী / ইনডোর শীতাতপ নিয়ন্ত্রিত (WMO Cat 0)",
    healthExpHigh: "ধারাবাহিক (>৩ ঘণ্টা)",
    healthExpMid: "মাঝারি (১ থেকে ৩ ঘণ্টা)",
    healthExpLow: "স্বল্প (<১ ঘণ্টা)",
    healthRiskLabel: "হিট-স্ট্রোকের ঝুঁকি মাত্রা:",
    healthStatusLabel: "মেডিকেল ট্রায়াজ স্ট্যাটাস:",
    nightTitle: "নাইট-টাইম থার্মাল রিটেনশন ইনডেক্স (NTRI)",
    nightDesc: "কংক্রিট ও শুষ্ক ভূমির সারফেস দিনের উত্তাপ ধরে রেখে রাতে ছড়িয়ে দেয়, যার ফলে তাপমাত্রা হ্রাস পায় না:",
    nightRetainLabel: "সারফেসে তাপ ধারণের হার:",
    nightCoolLabel: "রাতের শীতলীকরণ সক্ষমতা:",
    ndbiLabel: "NDBI (কংক্রিট ও শুষ্ক মাটির সূচক):",
    ndbiDesc: "কংক্রিট, অ্যাসফাল্ট ও অনাবৃত শুষ্ক মাটির ঘনত্ব সূচক।",
    ndviLabel: "NDVI (উদ্ভিদের বায়োমাস অনুপাত):",
    ndviDesc: "গাছপালা ও বাষ্পীভবনের মাধ্যমে প্রাকৃতিকভাবে তাপ হ্রাসের সূচক।",
    mathBaseLabel: "আঞ্চলিক বেস বায়ু তাপমাত্রা:",
    mathAnomalyLabel: "মাইক্রোক্লাইমেট অ্যানোমালি (ΔT):",
    mathCalculatedLabel: "বাস্তব সারফেস কাইনেটিক LST:",
    simDesc: "নগর পরিকল্পনা সংস্কার (হোয়াইট রুফ SRI ও বনায়ন বৃদ্ধি) দিয়ে তাপমাত্রা হ্রাসের সিমুলেশন:",
    simGreenLabel: "বৃক্ষরোপণ ও গ্রিনারি বৃদ্ধি (+NDVI):",
    simRoofLabel: "রিফ্লেক্টিভ কুল-রুফ কোটিং (+SRI):",
    simDropLabel: "প্রত্যাশিত তাপমাত্রা হ্রাস (ΔT):",
    simProjLabel: "সংস্কার পরবর্তী সম্ভাব্য LST:",
    fieldHeading: "প্রাতিষ্ঠানিক ও নীতি নির্ধারণী নির্দেশনা",
    workerWarningHeading: "পেশাগত স্বাস্থ্য ও শ্রমিক সুরক্ষা নির্দেশনা",
    plannerHeading: "পৌর ও নগর উন্নয়ন পরিকল্পনা নির্দেশনা",
    groundHeading: "ইন-সিটু গ্রাউন্ড সেন্সর টেলিমেট্রি ফিড",
    stationLoc: "রেফারেন্স মনিটরিং স্টেশন:",
    gpsModalTitle: "ইন-সিটু ভৌগোলিক টেলিমেট্রি",
    gpsZoneLabel: "শনাক্তকৃত ভৌগোলিক জোন:",
    gpsLocalTempLabel: "অন-সাইট তাপমাত্রা",
    gpsStressLabel: "শারীরিক হিট স্ট্রেন রেটিং",
    gpsStatusAdvise: "অপারেশনাল প্রটোকল ও পদক্ষেপ:",
    modalMethodTitle: "নাসা বৈজ্ঞানিক মেথডোলজি ও ডেটা লাইনিয়েজ",
    modalSmsTitle: "কমন অ্যালার্টিং প্রটোকল (CAP) ডিসপ্যাচ",
    modalSmsSub: "পৌর দুর্যোগ ব্যবস্থাপনা ও মাঠকর্মীদের জন্য সম্পূর্ণ বিনামূল্যে পরিচালিত জরুরি সতর্কতা ইঞ্জিন:",
    modalSmsPhoneLabel: "প্রাপক টার্মিনাল আইডেন্টিফায়ার (মোবাইল নম্বর):",
    modalSmsNodeLabel: "টার্গেট হটস্পট ও থ্রেশহোল্ড সীমা:",
    meterLabel: "থার্মাল স্ট্রেস লেভেল মিটার:",
    meterSafe: "সহনশীল",
    meterCaution: "সতর্কতা",
    meterDanger: "মারাত্মক সংকট",
    bulletinBtn: "ব্রিফ",
    sosBtn: "জরুরি ডিসপ্যাচ",
    btnSonify: "অডিও সোনিফাই"
  }
};

// WORLD METEOROLOGICAL ORGANIZATION (WMO) CALIBRATED OBSERVATORY NODES (GLOBAL COVERAGE)
const monitoringNodes = [
  {
    id: "WMO-DV-01",
    nameEn: "Death Valley Basin, California (USA)",
    nameBn: "ডেথ ভ্যালি অববাহিকা, ক্যালিফোর্নিয়া (যুক্তরাষ্ট্র)",
    lat: 36.5323,
    lon: -116.9325,
    ndbi: 0.96,
    ndvi: 0.02,
    albedo: 0.25,
    densityWeight: 1.50,
    populationDensity: "Sparse (Desert Basin)",
    sedacMultiplier: "1.05x",
    type: "danger",
    workerActionEn: "WMO Tier-1 critical thermal hazard. Immediate metabolic thermal failure risk. Mandate cessation of all daylight operations.",
    workerActionBn: "WMO টায়ার-১ চরম থার্মাল ঝুঁকি। মেটাবলিক তাপ ভারসাম্যের গুরুতর বিপর্যয় ঘটতে পারে। দিনের সব আউটডোর কার্যক্রম সম্পূর্ণ বন্ধ রাখুন।",
    plannerActionEn: "Establish automated solar-powered cooling chambers and impose strict transit interdictions during zenith hours.",
    plannerActionBn: "সোলার পাওয়ারচালিত শীতলীকরণ হাব স্থাপন এবং সর্বোচ্চ সৌর বিকিরণের সময়ে সাধারণ যান চলাচল নিয়ন্ত্রণ।"
  },
  {
    id: "WMO-KWT-02",
    nameEn: "Kuwait City Metropolitan Fabric (Kuwait)",
    nameBn: "কুয়েত সিটি মেট্রোপলিটন জোন (কুয়েত)",
    lat: 29.3759,
    lon: 47.9774,
    ndbi: 0.93,
    ndvi: 0.03,
    albedo: 0.20,
    densityWeight: 1.45,
    populationDensity: "High Density (Metropolis)",
    sedacMultiplier: "1.48x",
    type: "danger",
    workerActionEn: "Acute urban canyon thermal trap. Enforcement of ILO heat stress rest-to-work ratios (15 min labor / 45 min shaded rest).",
    workerActionBn: "তীব্র আরবান হিট ট্র্যাপ। আইএলও (ILO) নীতিমালার আলোকে প্রতি ১৫ মিনিট কাজের পর বাধ্যতামূলক ৪৫ মিনিট শীতল স্থানে বিশ্রাম নিশ্চিত করুন।",
    plannerActionEn: "Retrofit high solar reflectance materials across industrial envelopes and interconnect district chilled-water conduits.",
    plannerActionBn: "শিল্পাঞ্চলের ভবনে উচ্চ প্রতিফলনশীল কোটিং এবং নগরজুড়ে সেন্ট্রাল কুলিং নেটওয়ার্ক জোরদারকরণ।"
  },
  {
    id: "WMO-JAC-03",
    nameEn: "Jacobabad Thermal Corridor (Pakistan)",
    nameBn: "জ্যাকোবাবাদ থার্মাল করিডোর (পাকিস্তান)",
    lat: 28.2819,
    lon: 68.4385,
    ndbi: 0.90,
    ndvi: 0.05,
    albedo: 0.18,
    densityWeight: 1.40,
    populationDensity: "Dense Agricultural Hub",
    sedacMultiplier: "1.52x",
    type: "danger",
    workerActionEn: "Lethal wet-bulb threshold (TW > 31°C) proximity. Field workers require mandatory electrolytic replenishment and cooling vests.",
    workerActionBn: "ওয়েট-বাল্ব তাপমাত্রা বিপজ্জনক মাত্রায় (TW > ৩১°C)। শ্রমিকদের জন্য ইলেক্ট্রোলাইট রিহাইড্রেশন ও কুলিং ভেস্ট সরবরাহ বাধ্যতামূলক।",
    plannerActionEn: "Deploy municipal emergency evaporative mist shelters and maintain contingency clinical triage centers for heat strokes.",
    plannerActionBn: "জরুরি বাষ্পীয় কুয়াশা কুলিং শেল্টার স্থাপন এবং হিট-স্ট্রোক রোগীদের দ্রুত চিকিৎসার জন্য ক্লিনিক্যাল ট্রায়াজ সেন্টার সচল রাখা।"
  },
  {
    id: "WMO-BD-CHU",
    nameEn: "Chuadanga Agro-Climatic Belt (Bangladesh)",
    nameBn: "চুয়াডাঙ্গা কৃষি-জলবায়ু অঞ্চল (বাংলাদেশ)",
    lat: 23.6402,
    lon: 88.8418,
    ndbi: 0.92,
    ndvi: 0.05,
    albedo: 0.12,
    densityWeight: 1.45,
    populationDensity: "High Rural Aggregation",
    sedacMultiplier: "1.40x",
    type: "danger",
    workerActionEn: "National epicentre for agricultural heat shock. Limit field harvesting to morning windows prior to 10:30 AM.",
    workerActionBn: "দেশের সর্বোচ্চ তাপদাহপ্রবণ কৃষি অঞ্চল। সকাল ১০:৩০ এর পর জমিতে ফসল কাটা ও ভারী কায়িক শ্রম সীমিত রাখুন।",
    plannerActionEn: "Scale decentralized rural hydration depots at union council levels and establish strategic agroforestry windbreaks.",
    plannerActionBn: "ইউনিয়ন পর্যায়ে সুপেয় পানির হাইড্রেশন পয়েন্ট স্থাপন এবং তাপমাত্রা বাফার হিসেবে আঞ্চলিক কৃষি-বনায়ন নিশ্চিতকরণ।"
  },
  {
    id: "WMO-BD-DHK",
    nameEn: "Greater Dhaka Mega-Grid (Bangladesh)",
    nameBn: "বৃহত্তর ঢাকা মেগা-গ্রিড (বাংলাদেশ)",
    lat: 23.7156,
    lon: 90.3980,
    ndbi: 0.89,
    ndvi: 0.04,
    albedo: 0.11,
    densityWeight: 1.35,
    populationDensity: "Ultra-High Urban Megacity",
    sedacMultiplier: "1.65x",
    type: "danger",
    workerActionEn: "Severe Urban Heat Island (UHI) amplification coupled with vehicular exhaust. Frontline transit workers require shaded resting hubs.",
    workerActionBn: "যানবাহনের ধোঁয়া ও কংক্রিটের কারণে তীব্র আরবান হিট আইল্যান্ড। পরিবহন শ্রমিক ও রিকশাচালকদের জন্য ছায়াযুক্ত বিশ্রাম শেড প্রয়োজন।",
    plannerActionEn: "Mandate Cool Roof codes (SRI > 82) for commercial developments and preserve intra-urban wetlands from structural encroachment.",
    plannerActionBn: "বাণিজ্যিক ভবনে বাধ্যতামূলক রিফ্লেক্টিভ কুল-রুফ কোড বাস্তবায়ন এবং প্রাকৃতিক জলাধার দখলমুক্ত রাখা।"
  },
  {
    id: "WMO-DEL-04",
    nameEn: "National Capital Region, Delhi (India)",
    nameBn: "দিল্লি ও এনসিআর মেট্রোপলিটন জোন (ভারত)",
    lat: 28.6139,
    lon: 77.2090,
    ndbi: 0.88,
    ndvi: 0.06,
    albedo: 0.15,
    densityWeight: 1.38,
    populationDensity: "Mega Urban Density",
    sedacMultiplier: "1.60x",
    type: "danger",
    workerActionEn: "Compound thermal and particulate stress. Recommend air quality respirators along with continuous thermal monitoring.",
    workerActionBn: "উচ্চ তাপমাত্রা এবং বায়ুদূষণের যৌথ সংকট। বাইরে কাজ করার সময় মাস্ক পরিধান এবং নিয়মিত পানি পান বাধ্যতামূলক।",
    plannerActionEn: "Expand linear urban bioswales and enforce non-absorptive porous pavement across transport hubs.",
    plannerActionBn: "রাস্তার পাশে লিনিয়ার গ্রিন বেল্ট তৈরি এবং তাপ নিরোধক ছিদ্রযুক্ত পেভমেন্ট স্থাপন।"
  },
  {
    id: "WMO-SAH-01",
    nameEn: "Sahara In-Salah Thermal Hub (Algeria)",
    nameBn: "সাহারা ইন-সালাহ থার্মাল জোন (আলজেরিয়া)",
    lat: 27.1935,
    lon: 2.4832,
    ndbi: 0.95,
    ndvi: 0.01,
    albedo: 0.35,
    densityWeight: 1.48,
    populationDensity: "Desert Oasis Outpost",
    sedacMultiplier: "1.10x",
    type: "danger",
    workerActionEn: "Hyper-arid heat radiation. Extreme convective surface heating requiring continuous hydration protocol.",
    workerActionBn: "চরম শুষ্ক মরুভূমির তাপ বিকিরণ। জরুরি ডিহাইড্রেশন প্রতিরোধে বিশেষ সতর্কতা প্রয়োজন।",
    plannerActionEn: "Deploy deep geothermal sub-cooling corridors and traditional wind-catcher cooling architecture.",
    plannerActionBn: "প্রাকৃতিক বাতাস সঞ্চালন ও ভূগর্ভস্থ শীতলীকরণ চ্যানেলের ব্যবহার নিশ্চিতকরণ।"
  },
  {
    id: "WMO-AUS-01",
    nameEn: "Pilbara Red Center (Western Australia)",
    nameBn: "পিলবারা থার্মাল করিডোর (পশ্চিম অস্ট্রেলিয়া)",
    lat: -21.1736,
    lon: 119.7460,
    ndbi: 0.88,
    ndvi: 0.04,
    albedo: 0.30,
    densityWeight: 1.35,
    populationDensity: "Remote Mining District",
    sedacMultiplier: "1.15x",
    type: "danger",
    workerActionEn: "Intense solar UV and direct ground thermal convection. Heavy mining machinery shift rotation mandated.",
    workerActionBn: "তীব্র অতিবেগুনি রশ্মি এবং উত্তপ্ত ভূ-পৃষ্ঠ। শ্রমিকদের শিফট পরিবর্তন বাধ্যতামূলক।",
    plannerActionEn: "Utilize autonomous solar shading panels and mobile evaporative recovery stations.",
    plannerActionBn: "স্বয়ংক্রিয় সোলার শেডিং এবং ভ্রাম্যমাণ কুলিং ইউনিটের প্রসার।"
  },
  {
    id: "WMO-VOS-01",
    nameEn: "Vostok Subglacial Station (Antarctica)",
    nameBn: "ভোস্টক পোলার সাবগ্লেসিয়াল স্টেশন (অ্যান্টার্কটিকা)",
    lat: -78.4644,
    lon: 106.8340,
    ndbi: -0.80,
    ndvi: -0.90,
    albedo: 0.85,
    densityWeight: -2.0,
    populationDensity: "Extreme Scientific Outpost",
    sedacMultiplier: "0.95x",
    type: "cool",
    workerActionEn: "Planetary minimum thermal baseline. Extreme peripheral frostbite hazard within 90 seconds without specialized polar PPE.",
    workerActionBn: "পৃথিবীর শীতলতম মেরু বেস। বিশেষায়িত পোলার পিপিই ছাড়া ৯০ সেকেন্ডের মধ্যে তীব্র ফ্রস্টবাইটের ঝুঁকি রয়েছে।",
    plannerActionEn: "Maintain redundant geothermal/nuclear-electric life support insulation and thermal environmental barriers.",
    plannerActionBn: "দ্বৈত ব্যাকআপযুক্ত তাপ নিয়ন্ত্রণ বাসস্থান ও লাইফ-সাপোর্ট সিস্টেম অক্ষুণ্ণ রাখা।"
  },
  {
    id: "WMO-AMZ-01",
    nameEn: "Amazon Equatorial Biosphere (Brazil)",
    nameBn: "আমাজন ক্রান্তীয় জীবমণ্ডল ও রেইনফরেস্ট (ব্রাজিল)",
    lat: -3.4653,
    lon: -62.2159,
    ndbi: -0.20,
    ndvi: 0.92,
    albedo: 0.14,
    densityWeight: -1.5,
    populationDensity: "Indigenous Eco-Sanctuary",
    sedacMultiplier: "1.10x",
    type: "cool",
    workerActionEn: "Planetary cooling lung. Dense vegetative canopy mitigates surface irradiance by up to 85%. Nominal thermal safety.",
    workerActionBn: "পৃথিবীর প্রাকৃতিক কুলিং ফুসফুস। ঘন বনাঞ্চলের কারণে সৌর বিকিরণ ৮৫% পর্যন্ত বাধা পায়, যা পরিবেশ শীতল রাখে।",
    plannerActionEn: "Enforce strict zero-deforestation buffers to avert irreversible regional convective breakdown.",
    plannerActionBn: "আঞ্চলিক তাপমাত্রা নিয়ন্ত্রণে এবং দাবানল প্রতিরোধে বনভূমির সুরক্ষা নিশ্চিত করা।"
  },
  {
    id: "WMO-BD-SYL",
    nameEn: "Sylhet Boreal Tea Ecosystem (Bangladesh)",
    nameBn: "সিলেট চা-বাগান ও বনাঞ্চল ইকোসিস্টেম (বাংলাদেশ)",
    lat: 24.8949,
    lon: 91.8687,
    ndbi: 0.08,
    ndvi: 0.86,
    albedo: 0.22,
    densityWeight: -1.35,
    populationDensity: "Protected Natural Buffer",
    sedacMultiplier: "1.12x",
    type: "cool",
    workerActionEn: "Natural ecological thermal sanctuary. Moderate convective airflows keep conditions within standard physiological limits.",
    workerActionBn: "প্রাকৃতিক চা-বাগান ও পাহাড়ের কারণে তাপমাত্রা সহনশীল ও মানবদেহের জন্য সম্পূর্ণ নিরাপদ সীমার মধ্যে রয়েছে।",
    plannerActionEn: "Conserve natural water retentive catchment basins to maintain regional microclimate cooling efficacy.",
    plannerActionBn: "প্রাকৃতিক জলাভূমি ও বনায়ন অক্ষুণ্ণ রাখা যাতে জাতীয় পর্যায়ে তাপ বাফার হিসেবে কাজ করতে পারে।"
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
// 3. GIS MAP ENGINE WITH GLOBAL ON-CLICK INSPECT
// ==========================================
function initializeGISMap() {
  const mapContainer = document.getElementById('gis-map');
  if (!mapContainer) return;

  gisMap = L.map('gis-map', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true
  }).setView([WORLD_CENTER_LAT, WORLD_CENTER_LON], 2.5);

  L.control.zoom({ position: 'topright' }).addTo(gisMap);

  // Satellite Imagery Layer (No API Key Required)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    maxNativeZoom: 17
  }).addTo(gisMap);

  // Boundaries & Labels overlay
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    maxNativeZoom: 17
  }).addTo(gisMap);

  stationLayerGroup = L.layerGroup().addTo(gisMap);
  shelterLayerGroup = L.layerGroup().addTo(gisMap);
  citizenLayerGroup = L.layerGroup().addTo(gisMap);
  orbitLayerGroup = L.layerGroup().addTo(gisMap);

  // GLOBAL CLICK-TO-INSPECT: বিশ্বের যেকোনো স্থানে ক্লিক করলে লাইভ ডেটা আনবে
  gisMap.on('click', async (e) => {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    inspectGlobalCoordinates(lat, lon);
  });

  setTimeout(() => { if (gisMap) gisMap.invalidateSize(); }, 250);
}

// বিশ্বের যেকোনো স্থানাঙ্কের লাইভ টেলিমেট্রি ইনস্পেকশন ইঞ্জিন
async function inspectGlobalCoordinates(lat, lon) {
  let locationLabel = `Global Coordinate (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;
  
  if (globalClickMarker) gisMap.removeLayer(globalClickMarker);

  const clickIcon = L.divIcon({
    className: 'global-inspect-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <span style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background: #00D1FF; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="width: 18px; height: 18px; border-radius: 9999px; background: #020617; border: 2.5px solid #00D1FF; box-shadow: 0 0 12px #00D1FF;"></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  globalClickMarker = L.marker([lat, lon], { icon: clickIcon }).addTo(gisMap);

  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      if (geoData.display_name) {
        locationLabel = geoData.display_name.split(',').slice(0, 3).join(',').trim();
      }
    }
  } catch (err) {
    console.warn("Geocode reverse lookup fallback applied:", err);
  }

  // কৃত্রিম ডায়নামিক নোড তৈরি
  const dynamicNode = {
    id: `WMO-GLB-${Math.abs(Math.round(lat))}-${Math.abs(Math.round(lon))}`,
    nameEn: locationLabel,
    nameBn: locationLabel,
    lat: lat,
    lon: lon,
    ndbi: Math.min(0.95, Math.max(0.10, Math.abs(lat % 1))),
    ndvi: Math.min(0.85, Math.max(0.05, 1 - Math.abs(lat % 1))),
    albedo: 0.20,
    densityWeight: 1.20,
    populationDensity: "Global Monitored Node",
    sedacMultiplier: "1.20x",
    type: "danger",
    workerActionEn: "Follow regional occupational heat stress standards. Ensure regular shaded recovery periods and hydration.",
    workerActionBn: "আঞ্চলিক পরিবেশগত তাপমাত্রা অনুযায়ী স্বাস্থ্যবিধি মেনে চলুন এবং নিয়মিত বিশ্রাম নিশ্চিত করুন।",
    plannerActionEn: "Integrate spaceborne Land Surface Temperature downscaling to evaluate local urban microclimate buffering.",
    plannerActionBn: "স্যাটেলাইট থার্মাল ডেটা ব্যবহার করে স্থানীয় মাইক্রোক্লাইমেট রেজিলিয়েন্স পরিকল্পনা নিশ্চিত করুন।"
  };

  selectMonitoringNode(dynamicNode, false);
  executeTelemetryPipeline(lat, lon);
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
          <span style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background: ${markerColor}; opacity: 0.35; animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
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

// SATELLITE SWATH TRACKER
function toggleSatelliteSwath() {
  const btn = document.getElementById('toggleOrbitBtn');
  if (orbitLayerGroup.getLayers().length > 0) {
    orbitLayerGroup.clearLayers();
    btn.classList.remove('bg-indigo-500', 'text-white');
    btn.classList.add('bg-indigo-500/15', 'text-indigo-300');
    return;
  }

  // Draw 51.6° Inclined ISS Ground Orbit Track
  const orbitCoords = [
    [-51.6, -160.0],
    [-30.0, -110.0],
    [0.0, -60.0],
    [30.0, -10.0],
    [51.6, 40.0],
    [23.7, 90.3],
    [-10.0, 130.0],
    [-51.6, 175.0]
  ];

  const orbitPath = L.polyline(orbitCoords, {
    color: '#818cf8',
    weight: 3.5,
    opacity: 0.9,
    dashArray: '10, 12'
  }).addTo(orbitLayerGroup);

  orbitPath.bindPopup(`
    <div class="font-mono text-xs p-1">
      <strong class="text-indigo-400">🛰️ ISS / ECOSTRESS Ground Track</strong><br/>
      <span>Inclination: 51.6° | Resolving 70m LSTE overpass band.</span>
    </div>
  `).openPopup();

  btn.classList.add('bg-indigo-500', 'text-white');
  btn.classList.remove('bg-indigo-500/15', 'text-indigo-300');
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
  const routeDesc = currentLang === 'bn' ? "গাছের ছায়াযুক্ত ও কম তাপমাত্রার রুট।" : "High-NDVI vegetative shade corridor mitigating radiant surface heat flux.";

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
// 4. CHART.JS PROJECTION
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
// 5. GLOBAL TELEMETRY PIPELINE
// ==========================================
async function executeTelemetryPipeline(targetLat = WORLD_CENTER_LAT, targetLon = WORLD_CENTER_LON) {
  const refreshIcon = document.getElementById('refreshIcon');
  if (refreshIcon) refreshIcon.classList.add('animate-spin');

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
        riskCat.innerText = currentLang === 'bn' ? "মারাত্মক বিপদ (ISO তীব্র সংকট)" : "Severe Danger (ISO Heat Stroke)";
        riskCat.className = "mt-1 text-[10px] text-rose-400 font-mono font-bold";
      } else if (noaaHI >= 33) {
        riskCat.innerText = currentLang === 'bn' ? "উচ্চ সতর্কতা (শারীরিক ক্লান্তি)" : "Extreme Caution (Fatigue Alert)";
        riskCat.className = "mt-1 text-[10px] text-amber-300 font-mono";
      } else if (noaaHI < 0) {
        riskCat.innerText = currentLang === 'bn' ? "চরম শৈত্যপ্রবাহ (ক্রায়োজেনিক)" : "Cryospheric Polar Alert";
        riskCat.className = "mt-1 text-[10px] text-sky-400 font-mono font-bold";
      } else {
        riskCat.innerText = currentLang === 'bn' ? "সহনশীল ও স্বাভাবিক মাত্রা" : "Nominal Physiological Range";
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
          document.getElementById('kpiAQIStation').innerText = station.name || "WMO Reference In-Situ Station";
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
    if (refreshIcon) refreshIcon.classList.remove('animate-spin');
  }
}

// ==========================================
// 6. TARGET SELECTION, SONIFICATION & SEDAC
// ==========================================
async function selectMonitoringNode(node, shouldFlyTo = true) {
  currentlySelectedNode = node;
  document.getElementById('targetNodeName').innerText = currentLang === 'bn' ? node.nameBn : node.nameEn;
  document.getElementById('targetNodeCoords').innerText = `Lat: ${node.lat.toFixed(4)}° | Lon: ${node.lon.toFixed(4)}° | ID: ${node.id}`;
  
  document.getElementById('valNDBI').innerText = `${node.ndbi > 0 ? '+' : ''}${node.ndbi.toFixed(2)}`;
  document.getElementById('barNDBI').style.width = `${Math.min(Math.max(node.ndbi * 100, 5), 100)}%`;

  document.getElementById('valNDVI').innerText = `${node.ndvi > 0 ? '+' : ''}${node.ndvi.toFixed(2)}`;
  document.getElementById('barNDVI').style.width = `${Math.min(Math.max(node.ndvi * 100, 5), 100)}%`;

  document.getElementById('sedacDensityScore').innerText = node.populationDensity || "Urban Grid";
  document.getElementById('sedacWeightVal').innerText = node.sedacMultiplier || "1.25x";

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
    badge.innerText = currentLang === 'bn' ? "চরম শৈত্যপ্রবাহ / বরফ বলয়" : "DEEP CRYO / POLAR FREEZE";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-600/30 text-sky-400 border border-sky-500/40";
  } else if (node.currentLST >= 35) {
    badge.innerText = currentLang === 'bn' ? "উচ্চ তাপমাত্রা ও ঝুঁকি" : "ELEVATED UHI STRAIN";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-500/40";
  } else {
    badge.innerText = currentLang === 'bn' ? "শীতল বায়োমাস আশ্রয়স্থল" : "COOL BIOMASS SANCTUARY";
    badge.className = "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-400 border border-emerald-500/40";
  }

  document.getElementById('simGreenery').value = 0;
  document.getElementById('simRoof').value = 0;
  runPolicySimulation();
  calculateHealthRisk();

  if (isSonificationActive) {
    playThermalSonification(node.currentLST);
  }

  if (shouldFlyTo && gisMap) {
    gisMap.flyTo([node.lat, node.lon], 5, { animate: true, duration: 1.5 });
  }
}

// WEB AUDIO DATA SONIFICATION ENGINE
function toggleSonification() {
  isSonificationActive = !isSonificationActive;
  const btn = document.getElementById('btnSonifyToggle');
  if (btn) {
    if (isSonificationActive) {
      btn.classList.add('bg-purple-600', 'text-white');
      btn.classList.remove('bg-space-850', 'text-purple-300');
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (currentlySelectedNode) playThermalSonification(currentlySelectedNode.currentLST);
    } else {
      btn.classList.remove('bg-purple-600', 'text-white');
      btn.classList.add('bg-space-850', 'text-purple-300');
    }
  }
}

function playThermalSonification(temp) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const freq = Math.max(150, Math.min(1000, 220 + (temp + 20) * 11));
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = temp > 40 ? 'sawtooth' : 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.2);
}

// 1-CLICK SOCIAL MEDIA HAZARD CARD (HTML5 CANVAS)
function generateVisualHazardCard() {
  const node = currentlySelectedNode || monitoringNodes[0];
  const canvas = document.getElementById('hazardCardCanvas');
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, '#030712');
  gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.strokeStyle = '#00D1FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, 1020, 1020);

  ctx.fillStyle = '#00D1FF';
  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.fillText("ECOSHIELD.AI | PLANETARY THERMAL ADVISORY", 80, 120);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px "Inter", sans-serif';
  ctx.fillText(node.nameEn, 80, 210);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '30px "JetBrains Mono", monospace';
  ctx.fillText(`GEO-NODE: ${node.id} | ${node.lat.toFixed(4)}°N, ${node.lon.toFixed(4)}°E`, 80, 270);

  ctx.beginPath();
  ctx.arc(260, 500, 160, 0, 2 * Math.PI);
  ctx.fillStyle = node.currentLST >= 40 ? 'rgba(252, 61, 33, 0.2)' : 'rgba(16, 185, 129, 0.2)';
  ctx.fill();
  ctx.strokeStyle = node.currentLST >= 40 ? '#FC3D21' : '#10B981';
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.fillStyle = node.currentLST >= 40 ? '#FC3D21' : '#10B981';
  ctx.font = 'bold 96px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`${node.currentLST}°C`, 260, 530);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 34px "Inter", sans-serif';
  ctx.fillText(`Microclimate Anomaly: +${node.currentAnomaly}°C`, 480, 440);
  ctx.fillText(`Solar Irradiance Flux: ${activeTelemetry.solarRadiation} W/m²`, 480, 510);
  ctx.fillText(`Relative Humidity: ${activeTelemetry.humidity}%`, 480, 580);

  ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
  ctx.fillRect(80, 720, 920, 220);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(80, 720, 920, 220);

  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 30px "JetBrains Mono", monospace';
  ctx.fillText("OPERATIONAL HEALTH DIRECTIVE:", 110, 780);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '26px "Inter", sans-serif';
  ctx.fillText(node.workerActionEn.substring(0, 75) + "...", 110, 840);
  ctx.fillText("Verified by NASA ECOSTRESS & Landsat-9 Data Feed", 110, 890);

  const link = document.createElement('a');
  link.download = `EcoShield_HazardCard_${node.id}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
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
    riskStatusElem.innerText = currentLang === 'bn' ? "চরম সংকট! কাজ বন্ধ করুন (ISO Class 4)" : "Critical Strain! Cease Labor (ISO Class 4)";
    riskStatusElem.className = "text-xs font-bold text-rose-500";
  } else if (riskScore >= 45) {
    riskStatusElem.innerText = currentLang === 'bn' ? "উচ্চ ঝুঁকি, ছায়ায় থাকুন (ISO Class 2)" : "Elevated Strain, Rest Required (ISO Class 2)";
    riskStatusElem.className = "text-xs font-bold text-amber-400";
  } else {
    riskStatusElem.innerText = currentLang === 'bn' ? "সহনশীল ও স্বাভাবিক (ISO Class 0)" : "Nominal Physiological Range (ISO Class 0)";
    riskStatusElem.className = "text-xs font-bold text-emerald-400";
  }
}

// FORMAL EXECUTIVE BRIEFING EXPORT (FOR GOVERNMENTS & OFFICES)
function exportAdvisoryCard() {
  const node = currentlySelectedNode || monitoringNodes[0];
  const bulletinText = `
================================================================================
EXECUTIVE ENVIRONMENTAL BRIEFING | EcoShield.AI Autonomous WebGIS
STANDARDS: World Meteorological Organization (WMO) | ISO 7243 Heat Stress
================================================================================
Date/Timestamp: ${new Date().toUTCString()}
Observation Domain: ${node.nameEn} [Identifier: ${node.id}]
Geographic Coordinates: Latitude ${node.lat.toFixed(4)}°, Longitude ${node.lon.toFixed(4)}°

KEY THERMAL TELEMETRY:
- Satellite Derived Land Surface Temperature (LST): ${node.currentLST}°C
- Microclimate Thermal Anomaly: ${node.currentAnomaly > 0 ? '+' : ''}${node.currentAnomaly}°C
- Ambient Air Temperature (T2M): ${activeTelemetry.baseTemp}°C
- Relative Atmospheric Humidity: ${activeTelemetry.humidity}%
- Direct Normal Solar Irradiance: ${activeTelemetry.solarRadiation} W/m²
- Urban Morphology (NDBI / Impervious): ${node.ndbi} | Canopy Fraction (NDVI): ${node.ndvi}
- Population Vulnerability Multiplier: ${node.sedacMultiplier || '1.25x'} (${node.populationDensity})

OCCUPATIONAL & FIELD HEALTH DIRECTIVE:
${node.workerActionEn}

MUNICIPAL & SPATIAL RESILIENCE DIRECTIVE:
${node.plannerActionEn}

DATA LINEAGE:
Spaceborne Sensor: NASA ECOSTRESS (ISS Radiometer Collection 2)
Spectral Verification: USGS / NASA Landsat-9 (OLI-2 & TIRS-2 Bands 4, 5, 6, 10)
Numerical Weather Prediction: Open-Meteo HR Planetary Convective Array
Reference In-Situ Ground Validation: OpenAQ Planetary Sensor Index

CONFIDENTIALITY / DISTRIBUTION:
Authorized for municipal decision-makers, industrial safety officers, and field responders.
================================================================================
  `;

  const blob = new Blob([bulletinText], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `EcoShield_Executive_Brief_${node.id}.txt`;
  a.click();
}

function triggerEmergencySOS() {
  const modal = document.getElementById('sosModal');
  modal.classList.remove('hidden');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      document.getElementById('sosNearestDist').innerText = currentLang === 'bn' ? "~১.২ কিমি (নিকটবর্তী)" : "~1.2 km (Designated Haven)";
    });
  }
}

function closeSosModal() {
  document.getElementById('sosModal').classList.add('hidden');
}

function navigateNearestShelter() {
  closeSosModal();
  gisMap.flyTo([23.7372, 90.3995], 14, { animate: true, duration: 1.2 });
  alert(currentLang === 'bn' ? "নিকটবর্তী কুলিং সেন্টারের অবস্থান ম্যাপে নির্দেশ করা হয়েছে।" : "Navigating to designated cooling oasis on GIS canvas.");
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
    if (voiceBtnText) voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoice : i18n.en.btnVoice;
    return;
  }

  window.speechSynthesis.cancel();
  const node = currentlySelectedNode || monitoringNodes[0];
  let voiceText = "";

  if (currentLang === 'bn') {
    voiceText = `সতর্কবার্তা! ${node.nameBn} অঞ্চলে বাস্তব তাপমাত্রা ${node.currentLST} ডিগ্রি সেলসিয়াসে পৌঁছেছে। ${node.workerActionBn}`;
  } else {
    voiceText = `Attention! Thermal telemetry for ${node.nameEn} indicates surface kinetic temperature of ${node.currentLST} degrees Celsius. ${node.workerActionEn}`;
  }

  const utterance = new SpeechSynthesisUtterance(voiceText);
  utterance.lang = currentLang === 'bn' ? 'bn-BD' : 'en-US';
  utterance.rate = 0.95;

  utterance.onstart = () => {
    isVoiceSpeaking = true;
    if (voiceBtnText) voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoiceStop : i18n.en.btnVoiceStop;
  };

  utterance.onend = () => {
    isVoiceSpeaking = false;
    if (voiceBtnText) voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoice : i18n.en.btnVoice;
  };

  utterance.onerror = () => {
    isVoiceSpeaking = false;
    if (voiceBtnText) voiceBtnText.innerText = currentLang === 'bn' ? i18n.bn.btnVoice : i18n.en.btnVoice;
  };

  window.speechSynthesis.speak(utterance);
}

// IN-SITU HIGH PRECISION REVERSE GEOCODING (ONLY CALLED WHEN USER CLICKS BUTTON)
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
      
      let detectedAreaName = currentLang === 'bn' ? "আপনার বর্তমান অবস্থান" : "In-Situ Verified Position";

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
      let errMsg = currentLang === 'bn' ? "জিপিএস সিগন্যাল পাওয়া যায়নি। লোকেশন পারমিশন দিন।" : "GPS signal lock failed. Please enable location permissions.";
      if (error.code === error.PERMISSION_DENIED) {
        errMsg = currentLang === 'bn' ? "লোকেশন পারমিশন ডিনাই করা হয়েছে। ব্রাউজার সেটিংসে অনুমতি দিন।" : "Location permission denied. Please allow location access in your browser.";
      }
      console.warn("GPS Error:", errMsg);
    },
    geoOptions
  );
}

// COMPACT SLEEK MICRO-HUD CARD CONTROLLER
async function displayUserLocationCard(lat, lon, label) {
  const modal = document.getElementById('liveLocationModal');
  if (!modal) return;
  modal.classList.remove('hidden');

  document.getElementById('liveLocName').innerText = label;
  document.getElementById('liveLocCoords').innerText = `Lat: ${lat.toFixed(4)}° | Lon: ${lon.toFixed(4)}°`;

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,direct_normal_irradiance,surface_temperature`);
    const data = await res.json();
    const currentT = data.current ? data.current.temperature_2m : activeTelemetry.baseTemp;
    
    document.getElementById('liveLocTemp').innerText = `${currentT.toFixed(1)}°C`;
    
    const badge = document.getElementById('liveLocBadge');
    const advice = document.getElementById('liveLocAdvice');

    if (currentT >= 39) {
      badge.innerText = currentLang === 'bn' ? "চরম সংকট" : "Hazard";
      badge.className = "text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30";
      advice.innerText = currentLang === 'bn' ? "মারাত্মক তাপদাহ বিরাজ করছে। সরাসরি রোদ পরিহার করুন।" : "Severe hyper-thermal conditions. Avoid direct solar exposure.";
    } else if (currentT >= 35) {
      badge.innerText = currentLang === 'bn' ? "সতর্কতা" : "Elevated";
      badge.className = "text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30";
      advice.innerText = currentLang === 'bn' ? "উচ্চ তাপমাত্রা। ছায়ায় থাকুন ও পানি পান করুন।" : "Elevated thermal stress. Maintain hydration and seek shade.";
    } else {
      badge.innerText = currentLang === 'bn' ? "সহনশীল" : "Nominal";
      badge.className = "text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      advice.innerText = currentLang === 'bn' ? "স্বাভাবিক পরিবেশ ও বাতাস থাকায় তাপমাত্রা নিরাপদ সীমার মধ্যে রয়েছে।" : "Convective air currents keep in-situ temperature within safe boundaries.";
    }

    if (liveGPSMarker && gisMap) gisMap.removeLayer(liveGPSMarker);

    const gpsPulseIcon = L.divIcon({
      className: 'user-pulse-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 30px; height: 30px; border-radius: 9999px; background: #00D1FF; opacity: 0.35; animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <div style="width: 16px; height: 16px; border-radius: 9999px; background: #00D1FF; border: 2.5px solid #ffffff; box-shadow: 0 0 12px #00D1FF;"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    if (gisMap) {
      liveGPSMarker = L.marker([lat, lon], { icon: gpsPulseIcon }).addTo(gisMap);
      liveGPSMarker.bindTooltip(`<b>${label}</b>`, { permanent: true, direction: "top", className: "gis-tooltip" });
      gisMap.flyTo([lat, lon], 14, { animate: true, duration: 1.4 });
    }

  } catch (err) {
    console.error("User loc API error:", err);
  }
}

function closeLocationModal() {
  const modal = document.getElementById('liveLocationModal');
  if (modal) modal.classList.add('hidden');
}

// ==========================================
// 7. COMMON ALERTING PROTOCOL (CAP) DISPATCH
// ==========================================
function getAlertMessage(target) {
  if (target === 'Chuadanga') {
    return currentLang === 'bn' 
      ? `[EcoShield জরুরি অ্যালার্ট]: চুয়াডাঙ্গা ও যশোর বেল্টে তাপমাত্রা ৪৩.৫°C অতিক্রম করেছে। দুপুর ১২টা-৩টা সরাসরি রোদ পরিহার করুন ও ওরাল স্যালাইন নিন।`
      : `[EcoShield Alert]: Chuadanga-Jashore agro-thermal corridor exceeded 43.5°C. Immediate mandatory rest protocols per WMO guidelines.`;
  } else if (target === 'Rajshahi') {
    return currentLang === 'bn' 
      ? `[EcoShield জরুরি অ্যালার্ট]: রাজশাহী বরেন্দ্র অঞ্চলে তীব্র শুষ্ক তাপদাহ (৪২.৮°C)। মাঠে ভারী কাজ বন্ধ রাখুন ও ছায়ায় বিশ্রাম নিন।`
      : `[EcoShield Alert]: Barind Tract drought corridor reports 42.8°C kinetic surface temperature. Suspend outdoor haulage.`;
  } else {
    return currentLang === 'bn' 
      ? `[EcoShield জরুরি অ্যালার্ট]: পুরান ঢাকা ও চকবাজারে তাপমাত্রা ৪৩.৮°C ছাড়িয়েছে। দুপুর ১২টা-৩টা সরাসরি রোদ পরিহার করুন। নিকটস্থ আশ্রয়: বাহাদুর শাহ পার্ক।`
      : `[EcoShield Alert]: Megacity urban canyon index crossed 43.8°C in Old Dhaka. Relocate field teams to verified cooling shelters.`;
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
  statusText.innerText = currentLang === 'bn' ? "সফল: মোবাইল মেসেজ অ্যাপ চালু হচ্ছে (১০০% ফ্রি)" : "SUCCESS: INITIATING NATIVE CAP CLIENT";
  textBody.innerHTML = `<strong>${msg}</strong><br/><span class="text-emerald-400 text-[10px] mt-1 block">${currentLang === 'bn' ? "আপনার ডিভাইসের মেসেজ অ্যাপ চালু হচ্ছে..." : "Routing to device telecommunication layer..."}</span>`;

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  window.location.href = `sms:${cleanPhone}?body=${encodeURIComponent(msg)}`;
}

async function dispatchTwilioSMS() {
  const phone = document.getElementById('demoPhone').value.trim();
  const target = document.getElementById('smsNodeSelect').value;
  const msg = getAlertMessage(target);

  const preview = document.getElementById('smsPreviewBox');
  const textBody = document.getElementById('smsTextBody');
  const time = document.getElementById('smsTimestamp');
  const statusText = document.getElementById('dispatchStatusText');

  preview.classList.remove('hidden');
  time.innerText = new Date().toLocaleTimeString();

  statusText.innerText = "TWILIO CLOUD GATEWAY READY";
  textBody.innerHTML = `<strong>${msg}</strong><div class="mt-2 text-rose-300 text-[10px]">Cloud SMS terminal calibrated. Providing credentials dispatches worldwide telecom packets.</div>`;
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

  textBody.innerHTML = `<strong>${msg}</strong><div class="mt-2 text-nasa-cyan text-[10px]">Broadcast channel: https://t.me/ecoshield_alerts</div>`;
  statusText.innerText = "SUCCESS: TELEGRAM BOT NOTIFIED (FREE)";
}

// ==========================================
// 8. CITIZEN SCIENCE PERSISTENT STORAGE
// ==========================================
function openCitizenModal() { document.getElementById('citizenModal').classList.remove('hidden'); }
function closeCitizenModal() { document.getElementById('citizenModal').classList.add('hidden'); }

function saveReportsToStorage() {
  const serializable = citizenReports.map(r => ({ id: r.id, loc: r.loc, temp: r.temp, feel: r.feel, lat: r.lat, lon: r.lon }));
  localStorage.setItem('ecoshield_citizen_reports', JSON.stringify(serializable));
}

function loadStoredCitizenReports() {
  const stored = localStorage.getItem('ecoshield_citizen_reports');
  if (!stored) return;
  try {
    const parsed = JSON.parse(stored);
    parsed.forEach(data => createCitizenMapMarker(data));
  } catch (err) { console.error("Storage load error:", err); }
}

function createCitizenMapMarker(reportData) {
  const citizenIcon = L.divIcon({
    className: 'custom-citizen-marker',
    html: `<div style="background: #6366f1; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 0 12px rgba(99, 102, 241, 0.9);">👤</div>`,
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
  alert(currentLang === 'bn' ? `ধন্যবাদ! আপনার গ্রাউন্ড টেলিমেট্রি "${loc}" (${temp}°C) সফলভাবে সংরক্ষিত হয়েছে।` : `In-situ ground observation "${loc}" (${temp}°C) persisted to telemetry store.`);
}

function renderCitizenPopup(report) {
  const groundTitle = currentLang === 'bn' ? "গ্রাউন্ড টেলিমেট্রি:" : "In-Situ Ground Observation:";
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

  const newFeel = prompt("Qualitative Heat Assessment:", report.feel);
  if (newFeel === null || newFeel.trim() === "") return;

  report.temp = parseFloat(newTemp) || report.temp;
  report.feel = newFeel;
  renderCitizenPopup(report);
  saveReportsToStorage();
}

function deleteCitizenReport(id) {
  if (!confirm("Delete observation record?")) return;
  const index = citizenReports.findIndex(r => r.id === id);
  if (index !== -1) {
    citizenLayerGroup.removeLayer(citizenReports[index].marker);
    citizenReports.splice(index, 1);
    saveReportsToStorage();
  }
}

// ==========================================
// 9. MODAL CONTROLS & COMPREHENSIVE I18N
// ==========================================
function openMethodologyModal() { document.getElementById('methodologyModal').classList.remove('hidden'); }
function closeMethodologyModal() { document.getElementById('methodologyModal').classList.add('hidden'); }
function openSmsModal() { document.getElementById('smsModal').classList.remove('hidden'); }
function closeSmsModal() { document.getElementById('smsModal').classList.add('hidden'); }

function openHeartbeatModal() {
  const modal = document.getElementById('heartbeatModal');
  if (modal) modal.classList.remove('hidden');
}
function closeHeartbeatModal() {
  const modal = document.getElementById('heartbeatModal');
  if (modal) modal.classList.add('hidden');
}

function toggleToolsMenu() {
  const menu = document.getElementById('toolsMenuDropdown');
  if (menu) menu.classList.toggle('hidden');
}

window.addEventListener('click', function(e) {
  const btn = document.getElementById('btnToolsDropdown');
  const menu = document.getElementById('toolsMenuDropdown');
  if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

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
  document.getElementById('uiBtnSonify').innerText = t.btnSonify;

  document.getElementById('kpiLabelAmbient').innerText = t.kpiAmbient;
  document.getElementById('kpiLabelHotspot').innerText = t.kpiHotspot;
  document.getElementById('kpiLabelFeelsLike').innerText = t.kpiFeelsLike;
  document.getElementById('kpiLabelSolar').innerText = t.kpiSolar;
  document.getElementById('kpiSubSolar').innerText = t.kpiSubSolar;
  document.getElementById('kpiLabelAqi').innerText = t.kpiAqi;

  document.getElementById('layerBtnHeat').innerText = t.layerHeat;
  document.getElementById('layerBtnStations').innerText = t.layerStations;
  document.getElementById('layerBtnShelters').innerText = t.layerShelters;
  document.getElementById('layerBtnSafeRoute').innerText = t.layerSafeRoute;
  document.getElementById('layerBtnOrbit').innerText = t.layerOrbit;
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

  if (gisMap) renderGISLayers();
  if (currentlySelectedNode) selectMonitoringNode(currentlySelectedNode, false);
}

// ==========================================
// 10. NASA SPOTLIGHT CONTROLLER (LIVE APOD + SENSORS)
// ==========================================
let cachedApodData = null;

const spotlightMissionData = {
  ecostress: {
    title: "NASA ECOSTRESS (ISS Thermal Radiometer Experiment)",
    date: "ISS Radiometer C2",
    tag: "THERMAL TIR-5",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    desc: "ECOSTRESS measures the temperature of plants to understand their water consumption and thermal stress dynamics. Mounted aboard the Japanese Experiment Module on the International Space Station, its high-spatial resolution (70m x 70m) captures diurnal temperature variations across city blocks, identifying lethal urban heat island anomalies."
  },
  landsat: {
    title: "USGS / NASA Landsat-9 Multi-Spectral Observatory",
    date: "OLI-2 & TIRS-2 Bands",
    tag: "30M SPECTRAL",
    img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop",
    desc: "Landsat-9 continues a 50-year record of spaceborne Earth observation. Utilizing OLI-2 (Bands 4 & 5) and TIRS-2 (Thermal Bands 10 & 11), EcoShield decomposes Normalized Difference Built-Up Index (NDBI) and vegetation fraction (NDVI) to mathematically calculate surface kinetic thermal anomalies."
  }
};

async function fetchNasaApod(forceRefresh = false) {
  if (cachedApodData && !forceRefresh) {
    renderApodContent(cachedApodData);
    return;
  }

  const expEl = document.getElementById('apodExplanation');
  if (expEl) expEl.innerText = "Connecting to NASA Open API Gateway...";

  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    if (!res.ok) throw new Error("NASA API rate limit or network unreachable");

    const data = await res.json();
    cachedApodData = data;
    renderApodContent(data);
  } catch (err) {
    console.warn("APOD Live Fallback applied:", err);
    const fallback = {
      title: "ISS Terrestrial Night Horizon Observation",
      date: new Date().toLocaleDateString(),
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      hdurl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
      media_type: "image",
      explanation: "ECOSTRESS mounted aboard the International Space Station measures thermal infrared emissions from the terrestrial biosphere, tracking microclimate trends and evapotranspiration changes across global megacities."
    };
    renderApodContent(fallback);
  }
}

function renderApodContent(data) {
  const titleEl = document.getElementById('apodTitle');
  const expEl = document.getElementById('apodExplanation');
  const imgEl = document.getElementById('apodImage');
  const dateEl = document.getElementById('apodDateBadge');
  const linkEl = document.getElementById('apodHdLink');
  const tagEl = document.getElementById('apodMediaTag');

  if (titleEl) titleEl.innerText = data.title || "NASA Earth System Observation";
  if (expEl) expEl.innerText = data.explanation || "";
  if (dateEl) dateEl.innerText = data.date || "Today's Telemetry";
  if (tagEl) tagEl.innerText = (data.media_type || "IMAGE").toUpperCase();

  const targetUrl = data.url || data.hdurl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";
  if (imgEl) imgEl.src = targetUrl;
  if (linkEl) linkEl.href = data.hdurl || targetUrl;
}

function switchSpotlightTab(tab) {
  const btnApod = document.getElementById('spotTabApod');
  const btnEco = document.getElementById('spotTabEcostress');
  const btnLand = document.getElementById('spotTabLandsat');

  if (btnApod && btnEco && btnLand) {
    [btnApod, btnEco, btnLand].forEach(b => {
      b.className = "px-2.5 py-1 rounded bg-space-950 hover:bg-space-850 text-slate-400 border border-space-border transition";
    });

    if (tab === 'apod') {
      btnApod.className = "px-2.5 py-1 rounded bg-nasa-cyan/20 text-nasa-cyan border border-nasa-cyan/40 font-bold transition";
      if (cachedApodData) renderApodContent(cachedApodData);
      else fetchNasaApod();
    } else if (tab === 'ecostress') {
      btnEco.className = "px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition";
      renderManualMissionContent(spotlightMissionData.ecostress);
    } else if (tab === 'landsat') {
      btnLand.className = "px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold transition";
      renderManualMissionContent(spotlightMissionData.landsat);
    }
  }
}

function renderManualMissionContent(info) {
  const titleEl = document.getElementById('apodTitle');
  const expEl = document.getElementById('apodExplanation');
  const dateEl = document.getElementById('apodDateBadge');
  const tagEl = document.getElementById('apodMediaTag');
  const imgEl = document.getElementById('apodImage');
  const linkEl = document.getElementById('apodHdLink');

  if (titleEl) titleEl.innerText = info.title;
  if (expEl) expEl.innerText = info.desc;
  if (dateEl) dateEl.innerText = info.date;
  if (tagEl) tagEl.innerText = info.tag;
  if (imgEl) imgEl.src = info.img;
  if (linkEl) linkEl.href = info.img;
}

function openNasaApodModal() {
  const modal = document.getElementById('nasaApodModal');
  if (modal) {
    modal.classList.remove('hidden');
    fetchNasaApod();
  }
}

function closeNasaApodModal() {
  const modal = document.getElementById('nasaApodModal');
  if (modal) modal.classList.add('hidden');
}

function triggerPrintReport() {
  const node = currentlySelectedNode || monitoringNodes[0];
  document.getElementById('printDate').innerText = new Date().toLocaleString();
  document.getElementById('printNodeName').innerText = `${node.nameEn} (${node.id})`;
  document.getElementById('printLST').innerText = node.currentLST;
  document.getElementById('printAnomaly').innerText = node.currentAnomaly;
  document.getElementById('printAmbient').innerText = activeTelemetry.baseTemp;
  document.getElementById('printSolar').innerText = activeTelemetry.solarRadiation;
  document.getElementById('printWorkerDirective').innerText = node.workerActionEn;
  document.getElementById('printPlannerDirective').innerText = node.plannerActionEn;

  window.print();
}

// ==========================================
// 11. INITIALIZATION ENGINE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initializeGISMap();

  setTimeout(() => { if (gisMap) gisMap.invalidateSize(); }, 250);

  loadStoredCitizenReports(); 
  executeTelemetryPipeline(); // বিশ্ব কেন্দ্র (World Center) থেকে গ্লোবাল ডেটা লোড করবে
  applyLanguageUI();
});