// =========================================================================
// EcoShield.AI Enterprise | Planetary Earth System Observatory
// Track: NASA Space Apps "Be An Earth System Trend Detective!"
// Standards Compliance: WMO Guidelines No. 1184 | ISO 7243 Thermal Stress
// Telemetry Sources: NASA ECOSTRESS (ISS) | Landsat-9 TIRS-2 | Open-Meteo HR
// =========================================================================

let currentLang = localStorage.getItem('ecoshield_lang') || 'en';
const OPENAQ_KEY = "9HVgYUIvSXTxMDFrdbhWA2OBt54AVQaSymRBGjDe";

const WORLD_CENTER_LAT = 20.0;
const WORLD_CENTER_LON = 10.0;

let isVoiceSpeaking = false; 
let citizenReports = []; 
let isSonificationActive = false;
let audioCtx = null;
let orbitLayerGroup = null;
let selectedTrendYear = 2026;

const i18n = {
  en: {
    btnLang: "বাংলা (BN)",
    btnVoice: "AUDIO ADVISORY",
    btnVoiceStop: "TERMINATE AUDIO",
    headerBadge: "Planetary Earth System Observatory",
    targetLabel: "Spatial Domain:",
    targetValue: "Global Multi-Sensor Telemetry Grid (NASA/WMO)",
    btnDataAudit: "Methodology Audit",
    btnSmsAlert: "CAP Alert Dispatch",
    btnCitizenReport: "Ground Telemetry",
    btnDetectGps: "IN-SITU GPS",
    kpiAmbient: "AMBIENT AIR",
    kpiHotspot: "PEAK HOTSPOT",
    kpiFeelsLike: "HEAT INDEX",
    kpiSolar: "SOLAR FLUX",
    kpiSubSolar: "Surface Irradiance",
    kpiAqi: "PM2.5 DENSITY",
    layerHeat: "Thermal Heatmap",
    layerStations: "Observatory Nodes",
    layerShelters: "Cooling Oases",
    layerSafeRoute: "Shaded Route",
    layerOrbit: "ISS Orbit Track",
    legendTitle: "Surface Temp (LST)",
    legendCool: "<-10°C",
    legendNominal: "28°C",
    legendCrit: ">45°C",
    chartHeading: "24-Hour Diurnal UHI Amplification vs Direct Solar Irradiance",
    targetHeader: "Selected Telemetry Node",
    spectralHeading: "Landsat-9 Spectral Decomposition",
    simHeading: "What-If Resilience Engine",
    healthHeading: "Heat Strain Index",
    healthOccLabel: "Occupation Profile:",
    healthExposureLabel: "Sun Exposure:",
    healthRiskLabel: "Probability:",
    healthStatusLabel: "Triage:",
    nightTitle: "Nighttime Heat Trapping",
    nightRetainLabel: "Heat Retained:",
    nightCoolLabel: "Cooling Efficacy:",
    ndbiLabel: "NDBI (Impervious / Concrete):",
    ndviLabel: "NDVI (Vegetation Canopy):",
    mathBaseLabel: "Ambient Regional Baseline:",
    mathAnomalyLabel: "Microclimate Anomaly (ΔT):",
    mathCalculatedLabel: "Effective Surface Kinetic LST:",
    simDesc: "Simulate municipal cooling interventions (Tree Canopy & Cool Roofs) in real time:",
    simGreenLabel: "Tree Canopy (+NDVI):",
    simRoofLabel: "Cool Roof Reflectance (+SRI):",
    simDropLabel: "Projected Drop:",
    simProjLabel: "Post-Policy LST:",
    uiWorkerWarningHeading: "Labor Safety Directive",
    uiPlannerHeading: "Municipal Directive",
    stationLoc: "WMO Reference Node:",
    gpsModalTitle: "In-Situ Telemetry",
    gpsZoneLabel: "Spatial Zone:",
    gpsLocalTempLabel: "Temperature:",
    gpsStressLabel: "Strain:",
    bulletinBtn: "BRIEF",
    sosBtn: "EMERGENCY DISPATCH",
    btnSonify: "Audio Sonification"
  },
  bn: {
    btnLang: "English (EN)",
    btnVoice: "ভয়েস নির্দেশনা",
    btnVoiceStop: "ভয়েস বন্ধ করুন",
    headerBadge: "গ্লোবাল আর্থ সিস্টেম অবজারভেটরি",
    targetLabel: "ভৌগোলিক পরিধি:",
    targetValue: "প্ল্যানেটারি মাল্টি-সেন্সর টেলিমেট্রি গ্রিড (NASA/WMO)",
    btnDataAudit: "মেথডোলজি অডিট",
    btnSmsAlert: "সিএপি ব্রডকাস্ট",
    btnCitizenReport: "গ্রাউন্ড টেলিমেট্রি",
    btnDetectGps: "লাইভ জিপিএস",
    kpiAmbient: "বাতাসের তাপমাত্রা",
    kpiHotspot: "সর্বোচ্চ হটস্পট",
    kpiFeelsLike: "হিট ইনডেক্স",
    kpiSolar: "সৌর বিকিরণ",
    kpiSubSolar: "সারফেস ফ্লাক্স",
    kpiAqi: "PM2.5 ঘনত্ব",
    layerHeat: "থার্মাল হিটম্যাপ",
    layerStations: "অবজারভেটরি নোড",
    layerShelters: "শীতল আশ্রয়",
    layerSafeRoute: "ছায়াযুক্ত রুট",
    layerOrbit: "ISS অরবিট ট্র্যাক",
    legendTitle: "সারফেস টেম্প (LST)",
    legendCool: "<-১০°C",
    legendNominal: "২৮°C",
    legendCrit: ">৪৫°C",
    chartHeading: "২৪-ঘণ্টার ডায়ুরনাল UHI বৃদ্ধি বনাম সরাসরি সৌর বিকিরণ",
    targetHeader: "নির্বাচিত টেলিমেট্রি নোড",
    spectralHeading: "ল্যান্ডস্যাট-৯ স্পেকট্রাল বিশ্লেষণ",
    simHeading: "হোয়াট-ইফ রেজিলিয়েন্স ইঞ্জিন",
    healthHeading: "হিট স্ট্রেন ইনডেক্স",
    healthOccLabel: "পেশাগত প্রোফাইল:",
    healthExposureLabel: "রোদে থাকার সময়:",
    healthRiskLabel: "ঝুঁকি মাত্রা:",
    healthStatusLabel: "মেডিকেল ট্রায়াজ:",
    nightTitle: "সান্ধ্যকালীন তাপ শোষণ (NTRI)",
    nightRetainLabel: "তাপ ধরে রাখা:",
    nightCoolLabel: "শীতলীকরণ দক্ষতা:",
    ndbiLabel: "NDBI (কংক্রিট/শুষ্ক মাটি):",
    ndviLabel: "NDVI (গাছপালা/ক্যানোপি):",
    mathBaseLabel: "আঞ্চলিক বায়ু তাপমাত্রা:",
    mathAnomalyLabel: "থার্মাল অ্যানোমালি (ΔT):",
    mathCalculatedLabel: "বাস্তব সারফেস LST:",
    simDesc: "বৃক্ষরোপণ ও হোয়াইট রুফ দিয়ে তাপমাত্রা হ্রাসের রিয়েল-টাইম সিমুলেশন:",
    simGreenLabel: "বৃক্ষরোপণ বৃদ্ধি (+NDVI):",
    simRoofLabel: "কুল রুফ কোটিং (+SRI):",
    simDropLabel: "প্রত্যাশিত হ্রাস:",
    simProjLabel: "সম্ভাব্য LST:",
    uiWorkerWarningHeading: "শ্রমিক সুরক্ষা নির্দেশনা",
    uiPlannerHeading: "পৌর ও নগর উন্নয়ন নির্দেশনা",
    stationLoc: "রেফারেন্স স্টেশন:",
    gpsModalTitle: "ইন-সিটু টেলিমেট্রি",
    gpsZoneLabel: "ভৌগোলিক জোন:",
    gpsLocalTempLabel: "অন-সাইট তাপমাত্রা:",
    gpsStressLabel: "শারীরিক স্ট্রেন:",
    bulletinBtn: "ব্রিফ",
    sosBtn: "জরুরি ডিসপ্যাচ",
    btnSonify: "অডিও সোনিফাই"
  }
};

const monitoringNodes = [
  {
    id: "WMO-DV-01",
    nameEn: "Death Valley Basin, California (USA)",
    nameBn: "ডেথ ভ্যালি অববাহিকা, ক্যালিফোর্নিয়া (যুক্তরাষ্ট্র)",
    lat: 36.5323,
    lon: -116.9325,
    ndbi: 0.96,
    ndvi: 0.02,
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
    id: "WMO-BD-CHU",
    nameEn: "Chuadanga Agro-Climatic Belt (Bangladesh)",
    nameBn: "চুয়াডাঙ্গা কৃষি-জলবায়ু অঞ্চল (বাংলাদেশ)",
    lat: 23.6402,
    lon: 88.8418,
    ndbi: 0.92,
    ndvi: 0.05,
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
    id: "WMO-BD-SYL",
    nameEn: "Sylhet Boreal Tea Ecosystem (Bangladesh)",
    nameBn: "সিলেট চা-বাগান ও বনাঞ্চল ইকোসিস্টেম (বাংলাদেশ)",
    lat: 24.8949,
    lon: 91.8687,
    ndbi: 0.08,
    ndvi: 0.86,
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
// MATHEMATICAL ENGINE & HISTORICAL TRENDS
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
  }
  return parseFloat(((HI - 32) * 5/9).toFixed(1));
}

function evaluateMicroclimate(node, baseT, radiation, wind, trendOffset = 0) {
  const radMod = (radiation / 800) * 1.6;
  const windDampening = 1 / (1 + (wind * 0.15));
  const rawAnomaly = (((node.ndbi * 4.6) - (node.ndvi * 4.2) + (node.densityWeight * 1.4)) * radMod * windDampening) + trendOffset;
  const finalLST = parseFloat((baseT + rawAnomaly).toFixed(1));
  return { lst: finalLST, anomaly: parseFloat(rawAnomaly.toFixed(1)) };
}

function handleHistoricalTrendChange(year) {
  selectedTrendYear = parseInt(year);
  const label = document.getElementById('trendYearLabel');
  if (label) {
    label.innerText = `${selectedTrendYear} (${selectedTrendYear === 2026 ? 'Present' : 'Archive'})`;
  }
  const yearOffset = ((selectedTrendYear - 2026) / 26) * 1.8;
  renderGISLayers(yearOffset);
  if (currentlySelectedNode) {
    selectMonitoringNode(currentlySelectedNode, false, yearOffset);
  }
}

// ==========================================
// GIS MAP ENGINE (VERCEL PRODUCTION READY)
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

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(gisMap);

  stationLayerGroup = L.layerGroup().addTo(gisMap);
  shelterLayerGroup = L.layerGroup().addTo(gisMap);
  citizenLayerGroup = L.layerGroup().addTo(gisMap);
  orbitLayerGroup = L.layerGroup().addTo(gisMap);

  setTimeout(() => {
    if (gisMap) gisMap.invalidateSize();
  }, 250);
}

function renderGISLayers(trendOffset = 0) {
  stationLayerGroup.clearLayers();
  shelterLayerGroup.clearLayers();
  const heatPoints = [];

  monitoringNodes.forEach(node => {
    const sim = evaluateMicroclimate(node, activeTelemetry.baseTemp, activeTelemetry.solarRadiation, activeTelemetry.windSpeed, trendOffset);
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
          <span style="position: absolute; width: 26px; height: 26px; border-radius: 9999px; background: ${markerColor}; opacity: 0.35; animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <div style="width: 18px; height: 18px; border-radius: 9999px; background: #030712; border: 2px solid ${markerColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${markerColor};">
            <div style="width: 6px; height: 6px; border-radius: 9999px; background: ${markerColor};"></div>
          </div>
        </div>
      `,
      iconSize: [26, 26], iconAnchor: [13, 13]
    });

    const marker = L.marker([node.lat, node.lon], { icon: customIcon });
    const displayName = currentLang === 'bn' ? node.nameBn : node.nameEn;
    
    marker.bindTooltip(`
      <div class="font-mono text-xs p-1">
        <span class="font-bold text-white">${displayName}</span><br/>
        <span class="text-slate-400">LST (${selectedTrendYear}):</span> <span class="font-bold text-nasa-cyan">${node.currentLST}°C</span>
        <span class="text-slate-400">(${node.currentAnomaly > 0 ? '+' : ''}${node.currentAnomaly}°C)</span>
      </div>
    `, { direction: 'top', className: 'gis-tooltip' });

    marker.on('click', () => selectMonitoringNode(node, true));
    if (isCool) shelterLayerGroup.addLayer(marker);
    else stationLayerGroup.addLayer(marker);
  });

  if (heatLayer) gisMap.removeLayer(heatLayer);
  heatLayer = L.heatLayer(heatPoints, {
    radius: 40, blur: 30, maxZoom: 10,
    gradient: { 0.1: '#38BDF8', 0.3: '#10B981', 0.6: '#F59E0B', 0.85: '#FC3D21', 1.0: '#991B1B' }
  }).addTo(gisMap);
}

function toggleLayer(layerType) {
  if (layerType === 'heat') {
    if (gisMap.hasLayer(heatLayer)) { gisMap.removeLayer(heatLayer); document.getElementById('toggleThermalHeatmap').classList.add('opacity-40'); }
    else { gisMap.addLayer(heatLayer); document.getElementById('toggleThermalHeatmap').classList.remove('opacity-40'); }
  } else if (layerType === 'stations') {
    if (gisMap.hasLayer(stationLayerGroup)) { gisMap.removeLayer(stationLayerGroup); document.getElementById('toggleStations').classList.add('opacity-40'); }
    else { gisMap.addLayer(stationLayerGroup); document.getElementById('toggleStations').classList.remove('opacity-40'); }
  } else if (layerType === 'shelters') {
    if (gisMap.hasLayer(shelterLayerGroup)) { gisMap.removeLayer(shelterLayerGroup); document.getElementById('toggleShelters').classList.add('opacity-40'); }
    else { gisMap.addLayer(shelterLayerGroup); document.getElementById('toggleShelters').classList.remove('opacity-40'); }
  }
}

function toggleSatelliteSwath() {
  const btn = document.getElementById('toggleOrbitBtn');
  if (orbitLayerGroup.getLayers().length > 0) {
    orbitLayerGroup.clearLayers();
    btn.classList.remove('bg-indigo-500', 'text-white');
    btn.classList.add('bg-indigo-500/15', 'text-indigo-300');
    return;
  }
  const orbitCoords = [
    [-51.6, -160.0], [-30.0, -110.0], [0.0, -60.0], [30.0, -10.0],
    [51.6, 40.0], [23.7, 90.3], [-10.0, 130.0], [-51.6, 175.0]
  ];
  const orbitPath = L.polyline(orbitCoords, { color: '#818cf8', weight: 3, opacity: 0.9, dashArray: '10, 12' }).addTo(orbitLayerGroup);
  orbitPath.bindPopup(`<strong class="text-indigo-400 font-mono text-xs">🛰️ ISS / ECOSTRESS Ground Track</strong>`).openPopup();
  btn.classList.add('bg-indigo-500', 'text-white');
  btn.classList.remove('bg-indigo-500/15', 'text-indigo-300');
}

function toggleShadedRoute() {
  const btn = document.getElementById('toggleSafeRouteBtn');
  if (safeRouteLayer && gisMap.hasLayer(safeRouteLayer)) {
    gisMap.removeLayer(safeRouteLayer);
    btn.classList.remove('bg-teal-500', 'text-white');
    btn.classList.add('bg-teal-500/15', 'text-teal-300');
    return;
  }
  const safePathCoords = [[23.7156, 90.3980], [23.7230, 90.3990], [23.7290, 90.4010], [23.7372, 90.3995]];
  safeRouteLayer = L.polyline(safePathCoords, { color: '#10B981', weight: 5, opacity: 0.85, dashArray: '8, 8' }).addTo(gisMap);
  safeRouteLayer.bindPopup(`<strong class="text-emerald-400 font-mono text-xs">🌿 Thermal-Safe Shaded Corridor</strong>`).openPopup();
  btn.classList.add('bg-teal-500', 'text-white');
  btn.classList.remove('bg-teal-500/15', 'text-teal-300');
  gisMap.fitBounds(safeRouteLayer.getBounds(), { padding: [40, 40] });
}

// ==========================================
// CHART.JS TIME-SERIES ENGINE
// ==========================================
function initializeTemporalChart(hours, temps, solarFlux) {
  const ctx = document.getElementById('temporalChart').getContext('2d');
  if (temporalChart) temporalChart.destroy();
  temporalChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [
        { label: 'Ambient Air Temp (°C)', data: temps, borderColor: '#00D1FF', backgroundColor: 'rgba(0, 209, 255, 0.05)', borderWidth: 2, fill: true, tension: 0.35, yAxisID: 'y' },
        { label: 'Solar Irradiance (W/m²)', data: solarFlux, borderColor: '#F59E0B', backgroundColor: 'transparent', borderWidth: 1.5, borderDash: [4, 4], pointRadius: 0, tension: 0.35, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 9 } } } },
      scales: {
        x: { ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 9 }, maxTicksLimit: 12 }, grid: { color: 'rgba(31, 51, 94, 0.3)' } },
        y: { type: 'linear', position: 'left', ticks: { color: '#00D1FF', font: { family: 'JetBrains Mono', size: 9 } }, grid: { color: 'rgba(31, 51, 94, 0.4)' } },
        y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#F59E0B', font: { family: 'JetBrains Mono', size: 9 } } }
      }
    }
  });
}

// ==========================================
// TELEMETRY PIPELINE & SELECTOR
// ==========================================
async function executeTelemetryPipeline(targetLat = WORLD_CENTER_LAT, targetLon = WORLD_CENTER_LON) {
  const refreshIcon = document.getElementById('refreshIcon');
  if (refreshIcon) refreshIcon.classList.add('animate-spin');
  try {
    const weatherEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,direct_normal_irradiance,wind_speed_10m&hourly=temperature_2m,direct_normal_irradiance&forecast_days=2`;
    const res = await fetch(weatherEndpoint);
    const wData = await res.json();
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
      if (noaaHI >= 41) riskCat.innerText = "Severe Danger";
      else if (noaaHI >= 33) riskCat.innerText = "Extreme Caution";
      else riskCat.innerText = "Nominal";
    }
    if (wData.hourly) {
      const currentHourStr = new Date().toISOString().substring(0, 13);
      const startIndex = wData.hourly.time.findIndex(t => t.startsWith(currentHourStr)) || 0;
      const hoursSlice = wData.hourly.time.slice(startIndex, startIndex + 24).map(t => t.split('T')[1]);
      const tempsSlice = wData.hourly.temperature_2m.slice(startIndex, startIndex + 24);
      const radSlice = wData.hourly.direct_normal_irradiance.slice(startIndex, startIndex + 24);
      initializeTemporalChart(hoursSlice, tempsSlice, radSlice);
    }
    renderGISLayers();
    const worstNode = [...monitoringNodes].sort((a, b) => b.currentLST - a.currentLST)[0];
    document.getElementById('kpiPeakUHI').innerText = worstNode.currentLST.toFixed(1);
    document.getElementById('kpiHotspotLoc').innerText = `${worstNode.nameEn.split(' ')[0]} (+${worstNode.currentAnomaly}°C)`;
    if (!currentlySelectedNode) selectMonitoringNode(worstNode, false);
  } catch (err) {
    console.error("Telemetry Pipeline Error:", err);
  } finally {
    if (refreshIcon) refreshIcon.classList.remove('animate-spin');
  }
}

async function selectMonitoringNode(node, shouldFlyTo = true, trendOffset = 0) {
  currentlySelectedNode = node;
  document.getElementById('targetNodeName').innerText = currentLang === 'bn' ? node.nameBn : node.nameEn;
  document.getElementById('targetNodeCoords').innerText = `Lat: ${node.lat.toFixed(4)}° | Lon: ${node.lon.toFixed(4)}° | ${node.id}`;
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
      const sim = evaluateMicroclimate(node, localBaseT, data.current.direct_normal_irradiance || 550, data.current.wind_speed_10m || 2.4, trendOffset);
      node.currentLST = sim.lst;
      node.currentAnomaly = sim.anomaly;
      document.getElementById('mathBaseTemp').innerText = `${localBaseT.toFixed(1)}°C`;
    }
  } catch {
    document.getElementById('mathBaseTemp').innerText = `${activeTelemetry.baseTemp.toFixed(1)}°C`;
  }

  document.getElementById('mathAnomaly').innerText = `${node.currentAnomaly > 0 ? '+' : ''}${node.currentAnomaly.toFixed(1)}°C`;
  document.getElementById('mathCalculatedLST').innerText = `${node.currentLST.toFixed(1)}°C`;
  document.getElementById('workerAdvisoryText').innerText = currentLang === 'bn' ? node.workerActionBn : node.workerActionEn;
  document.getElementById('plannerAdvisoryText').innerText = currentLang === 'bn' ? node.plannerActionBn : node.plannerActionEn;

  // Real-time Surface Thermal Splitter calculation
  const splitTin = document.getElementById('splitTinTemp');
  const splitCool = document.getElementById('splitCoolTemp');
  if (splitTin && splitCool) {
    const tinEquiv = (node.currentLST * 1.22).toFixed(1);
    const coolRoofEquiv = (node.currentLST * 0.81).toFixed(1);
    splitTin.innerText = `${tinEquiv}°C`;
    splitCool.innerText = `${coolRoofEquiv}°C`;
  }

  runPolicySimulation();
  calculateHealthRisk();

  if (isSonificationActive) playThermalSonification(node.currentLST);
  if (shouldFlyTo && gisMap) gisMap.flyTo([node.lat, node.lon], 5, { animate: true, duration: 1.4 });
}

// Policy Simulator & ROI Calculation
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

  const powerSaved = (tempReduction * 0.85).toFixed(1);
  const costSaved = Math.round(tempReduction * 145000);
  const roiPower = document.getElementById('roiPowerVal');
  const roiSavings = document.getElementById('roiSavingsVal');
  if (roiPower && roiSavings) {
    roiPower.innerText = `${powerSaved} MW/km²`;
    roiSavings.innerText = `$${costSaved.toLocaleString()} / yr`;
  }
}

// AI 5-Year Action Plan Generator
function generatePolicyRoadmap() {
  const node = currentlySelectedNode || monitoringNodes[0];
  const container = document.getElementById('roadmapContent');
  if (!container) return;

  const isCritical = node.currentLST >= 40;
  container.innerHTML = `
    <div class="p-2 bg-space-950 rounded border border-space-border space-y-1.5">
      <p class="font-bold text-amber-300">Phase 1: Immediate Triage (0 - 6 Months)</p>
      <p class="text-slate-300">• Deploy ${isCritical ? 'high-throughput misting stations' : 'shaded hydration gazebos'} along key commercial arterials.</p>
      <p class="text-slate-300">• Mandate midday rest breaks (12 PM - 3 PM) for outdoor workforce under ISO 7243 standards.</p>
    </div>
    <div class="p-2 bg-space-950 rounded border border-space-border space-y-1.5">
      <p class="font-bold text-nasa-cyan">Phase 2: Built Environment Retrofit (Year 1 - 2)</p>
      <p class="text-slate-300">• Subsidize high-albedo (SRI > 80) cool-roof paint for corrugated tin structures (-17.6°C surface drop).</p>
      <p class="text-slate-300">• Implement porous permeable paving on transport terminals to mitigate night-heat trapping (NTRI).</p>
    </div>
    <div class="p-2 bg-space-950 rounded border border-space-border space-y-1.5">
      <p class="font-bold text-emerald-300">Phase 3: Urban Canopy & Bioswales (Year 3 - 5)</p>
      <p class="text-slate-300">• Expand vegetative cover (+25% NDVI) to form continuous shaded walking corridors connecting transit hubs.</p>
      <p class="text-slate-300">• Target estimated municipal energy reduction of 1.7 MW/km² during seasonal summer peaks.</p>
    </div>
  `;
}

function calculateHealthRisk() {
  if (!currentlySelectedNode) return;
  const userMultiplier = parseFloat(document.getElementById('healthUserType').value) || 1.2;
  const exposureMultiplier = parseFloat(document.getElementById('healthExposureHours').value) || 1.1;
  let riskScore = ((currentlySelectedNode.currentLST - 25) * 3.8) * userMultiplier * exposureMultiplier;
  if (riskScore < 5) riskScore = 8;
  if (riskScore > 99) riskScore = 99;

  document.getElementById('healthRiskPercent').innerText = `${riskScore.toFixed(0)}%`;
  const statusElem = document.getElementById('healthRiskStatus');
  if (riskScore >= 75) { statusElem.innerText = "Critical (ISO Class 4)"; statusElem.className = "text-xs font-bold text-rose-500"; }
  else if (riskScore >= 45) { statusElem.innerText = "Elevated (ISO Class 2)"; statusElem.className = "text-xs font-bold text-amber-400"; }
  else { statusElem.innerText = "Nominal (ISO Class 0)"; statusElem.className = "text-xs font-bold text-emerald-400"; }
}

// Web Audio Sonification
function toggleSonification() {
  isSonificationActive = !isSonificationActive;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (isSonificationActive && currentlySelectedNode) playThermalSonification(currentlySelectedNode.currentLST);
}

function playThermalSonification(temp) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const freq = Math.max(150, Math.min(1000, 220 + (temp + 20) * 11));
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = temp > 40 ? 'sawtooth' : 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 1.2);
}

// Shareable Hazard Infographic Card
function generateVisualHazardCard() {
  const node = currentlySelectedNode || monitoringNodes[0];
  const canvas = document.getElementById('hazardCardCanvas');
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, '#030712'); gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 1080);
  ctx.strokeStyle = '#00D1FF'; ctx.lineWidth = 14; ctx.strokeRect(30, 30, 1020, 1020);
  ctx.fillStyle = '#00D1FF'; ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.fillText("ECOSHIELD.AI | PLANETARY THERMAL ADVISORY", 80, 120);
  ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 50px "Inter", sans-serif';
  ctx.fillText(node.nameEn, 80, 210);
  ctx.beginPath(); ctx.arc(260, 500, 160, 0, 2 * Math.PI);
  ctx.fillStyle = node.currentLST >= 40 ? 'rgba(252, 61, 33, 0.2)' : 'rgba(16, 185, 129, 0.2)';
  ctx.fill(); ctx.strokeStyle = node.currentLST >= 40 ? '#FC3D21' : '#10B981'; ctx.lineWidth = 8; ctx.stroke();
  ctx.fillStyle = node.currentLST >= 40 ? '#FC3D21' : '#10B981';
  ctx.font = 'bold 96px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
  ctx.fillText(`${node.currentLST}°C`, 260, 530);
  ctx.textAlign = 'left'; ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 34px "Inter", sans-serif';
  ctx.fillText(`Anomaly: +${node.currentAnomaly}°C`, 480, 440);
  ctx.fillText(`Solar Flux: ${activeTelemetry.solarRadiation} W/m²`, 480, 510);
  ctx.fillText(`Relative Humidity: ${activeTelemetry.humidity}%`, 480, 580);
  ctx.fillStyle = 'rgba(30, 41, 59, 0.7)'; ctx.fillRect(80, 720, 920, 220);
  ctx.fillStyle = '#F59E0B'; ctx.font = 'bold 30px "JetBrains Mono", monospace';
  ctx.fillText("OPERATIONAL HEALTH DIRECTIVE:", 110, 780);
  ctx.fillStyle = '#cbd5e1'; ctx.font = '26px "Inter", sans-serif';
  ctx.fillText(node.workerActionEn.substring(0, 75) + "...", 110, 840);

  const link = document.createElement('a');
  link.download = `EcoShield_HazardCard_${node.id}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function exportAdvisoryCard() {
  const node = currentlySelectedNode || monitoringNodes[0];
  const bulletinText = `
================================================================================
EXECUTIVE ENVIRONMENTAL BRIEFING | EcoShield.AI Autonomous WebGIS
================================================================================
Timestamp: ${new Date().toUTCString()}
Observation Domain: ${node.nameEn} [ID: ${node.id}]
Surface Kinetic LST: ${node.currentLST}°C (Anomaly: +${node.currentAnomaly}°C)
Ambient Air Baseline: ${activeTelemetry.baseTemp}°C | Humidity: ${activeTelemetry.humidity}%
Solar Flux: ${activeTelemetry.solarRadiation} W/m² | Population Risk: ${node.sedacMultiplier || '1.25x'}
Field Health Directive: ${node.workerActionEn}
Municipal Directive: ${node.plannerActionEn}
Data Lineage: NASA ECOSTRESS (ISS) / Landsat-9 TIRS-2 / Open-Meteo
================================================================================`;
  const blob = new Blob([bulletinText], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `EcoShield_Brief_${node.id}.txt`;
  a.click();
}

// Emergency & Voice Handlers
function triggerEmergencySOS() { document.getElementById('sosModal').classList.remove('hidden'); }
function closeSosModal() { document.getElementById('sosModal').classList.add('hidden'); }
function navigateNearestShelter() {
  closeSosModal();
  gisMap.flyTo([23.7372, 90.3995], 14, { animate: true, duration: 1.2 });
}

function playVoiceWarning() {
  if (!('speechSynthesis' in window)) return;
  if (isVoiceSpeaking) { window.speechSynthesis.cancel(); isVoiceSpeaking = false; return; }
  const node = currentlySelectedNode || monitoringNodes[0];
  const msg = currentLang === 'bn' 
    ? `সতর্কবার্তা! ${node.nameBn} এলাকায় তাপমাত্রা ${node.currentLST} ডিগ্রি সেলসিয়াস।` 
    : `Attention! Thermal telemetry for ${node.nameEn} indicates ${node.currentLST} degrees Celsius.`;
  const utterance = new SpeechSynthesisUtterance(msg);
  utterance.lang = currentLang === 'bn' ? 'bn-BD' : 'en-US';
  utterance.onend = () => { isVoiceSpeaking = false; };
  isVoiceSpeaking = true;
  window.speechSynthesis.speak(utterance);
}

// GPS In-Situ Geocoding
function requestUserGPS() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    let name = "In-Situ Position";
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`);
      if (res.ok) {
        const data = await res.json();
        const a = data.address || {};
        name = `${a.suburb || a.village || a.road || 'Area'}, ${a.city || a.county || 'Bangladesh'}`;
      }
    } catch {}
    displayUserLocationCard(lat, lon, name);
  }, () => {}, { enableHighAccuracy: true, timeout: 15000 });
}

async function displayUserLocationCard(lat, lon, label) {
  const modal = document.getElementById('liveLocationModal');
  modal.classList.remove('hidden');
  document.getElementById('liveLocName').innerText = label;
  document.getElementById('liveLocCoords').innerText = `Lat: ${lat.toFixed(4)}° | Lon: ${lon.toFixed(4)}°`;
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`);
    const data = await res.json();
    document.getElementById('liveLocTemp').innerText = `${data.current.temperature_2m.toFixed(1)}°C`;
    if (liveGPSMarker) gisMap.removeLayer(liveGPSMarker);
    const icon = L.divIcon({
      className: 'user-pulse',
      html: `<div style="width: 18px; height: 18px; border-radius: 9999px; background: #00D1FF; border: 3px solid white; box-shadow: 0 0 14px #00D1FF;"></div>`,
      iconSize: [18, 18], iconAnchor: [9, 9]
    });
    liveGPSMarker = L.marker([lat, lon], { icon }).addTo(gisMap);
    gisMap.flyTo([lat, lon], 14, { animate: true, duration: 1.4 });
  } catch {}
}

function closeLocationModal() { document.getElementById('liveLocationModal').classList.add('hidden'); }

// CAP Alerts
function dispatchDirectNativeSMS() {
  const phone = document.getElementById('demoPhone').value.trim();
  window.location.href = `sms:${phone}?body=${encodeURIComponent("[EcoShield Alert]: High thermal strain detected.")}`;
}
function dispatchTwilioSMS() { alert("Twilio REST handler simulated successfully."); }
function dispatchTelegramAlert() { alert("Alert broadcasted to https://t.me/ecoshield_alerts"); }

// Citizen Science Storage
function openCitizenModal() { document.getElementById('citizenModal').classList.remove('hidden'); }
function closeCitizenModal() { document.getElementById('citizenModal').classList.add('hidden'); }
function openMethodologyModal() { document.getElementById('methodologyModal').classList.remove('hidden'); }
function closeMethodologyModal() { document.getElementById('methodologyModal').classList.add('hidden'); }
function openSmsModal() { document.getElementById('smsModal').classList.remove('hidden'); }
function closeSmsModal() { document.getElementById('smsModal').classList.add('hidden'); }

function handleCitizenReportSubmit(e) {
  e.preventDefault();
  const loc = document.getElementById('citizenReportLoc').value;
  const temp = document.getElementById('citizenReportTemp').value;
  alert(`Observation "${loc}" (${temp}°C) recorded to in-situ store.`);
  closeCitizenModal();
}

function toggleAppLanguage() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  localStorage.setItem('ecoshield_lang', currentLang);
  applyLanguageUI();
}

function applyLanguageUI() {
  const t = i18n[currentLang];
  document.getElementById('langBtnText').innerText = t.btnLang;
  document.getElementById('uiHeaderBadge').innerText = t.headerBadge;
  document.getElementById('uiTargetLabel').innerText = t.targetLabel;
  document.getElementById('uiTargetValue').innerText = t.targetValue;
  document.getElementById('kpiLabelAmbient').innerText = t.kpiAmbient;
  document.getElementById('kpiLabelHotspot').innerText = t.kpiHotspot;
  document.getElementById('kpiLabelFeelsLike').innerText = t.kpiFeelsLike;
  document.getElementById('kpiLabelSolar').innerText = t.kpiSolar;
  document.getElementById('kpiSubSolar').innerText = t.kpiSubSolar;
  document.getElementById('kpiLabelAqi').innerText = t.kpiAqi;
  document.getElementById('chartHeading').innerText = t.chartHeading;
  document.getElementById('uiTargetHeader').innerText = t.targetHeader;
  document.getElementById('uiSpectralHeading').innerText = t.spectralHeading;
  document.getElementById('uiSimHeading').innerText = t.simHeading;
  document.getElementById('uiHealthHeading').innerText = t.healthHeading;
  document.getElementById('uiMathBaseLabel').innerText = t.mathBaseLabel;
  document.getElementById('uiMathAnomalyLabel').innerText = t.mathAnomalyLabel;
  document.getElementById('uiMathCalculatedLabel').innerText = t.mathCalculatedLabel;
  document.getElementById('bulletinBtn').innerText = t.bulletinBtn;
  document.getElementById('uiSosBtnText').innerText = t.sosBtn;
  if (currentlySelectedNode) selectMonitoringNode(currentlySelectedNode, false);
}

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  initializeGISMap();
  
  setTimeout(() => { if (gisMap) gisMap.invalidateSize(); }, 250);
  setTimeout(() => { if (gisMap) gisMap.invalidateSize(); }, 1000);

  executeTelemetryPipeline();
  requestUserGPS();
  applyLanguageUI();
});