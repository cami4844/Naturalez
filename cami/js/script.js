/* ════════════════════════════════════════════════════════════════════
   BINGO DEL OROBIOMA · Lógica de la aplicación
   ════════════════════════════════════════════════════════════════════ */

/* ─── Datos del proyecto ───────────────────────────────────────────── */
const TEAMS=[
  {id:1,name:'Mineros',           role:'Equipo 1',color:'#e85d75',soft:'#f08799',letter:'M'},
  {id:2,name:'Conservacionistas', role:'Equipo 2',color:'#5cb874',soft:'#84cc95',letter:'C'},
  {id:3,name:'Urbanizadores',     role:'Equipo 3',color:'#4d9be6',soft:'#7eb5ee',letter:'U'},
  {id:4,name:'Científicos',       role:'Equipo 4',color:'#e8b94d',soft:'#f0cd7c',letter:'C'},
  {id:5,name:'Campesinos',        role:'Equipo 5',color:'#d97a3e',soft:'#e69a68',letter:'C'}
];

const CREATORS=[
  {name:'María José',color:'#e85d75',letter:'M'},
  {name:'Nazaret',   color:'#5cb874',letter:'N'},
  {name:'Laura',     color:'#4d9be6',letter:'L'},
  {name:'Marlon',    color:'#e8b94d',letter:'M'},
  {name:'Camilo',    color:'#d97a3e',letter:'C'}
];

const TERMS=[
  'Wigginsia','Opuntia','Alondra','Dormilona','Codorniz',
  'Caracol','Hayuelo','Gurrumay','Dividivi','Palma',
  'Jarava','Clay-pan','pH 5.0','600 mm','Hojas duras',
  'Suculencia','Hojas pequeñas','Muchas crías','Semienterrada','Retamo',
  'Kikuyo','94%','15.499 ha','58 zonas'
];

/* Las 12 líneas ganadoras posibles en un bingo 5x5 */
const WIN_LINES=[
  [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
  [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
  [0,6,12,18,24],[4,8,12,16,20]
];

const SCORE_TABLE=[
  {pos:'1°',req:'3 líneas primero',pts:5.0},
  {pos:'2°',req:'3 líneas segundo',pts:4.5},
  {pos:'3°',req:'3 líneas tercero',pts:4.0},
  {pos:'4°',req:'2 líneas completadas',pts:3.0},
  {pos:'5°',req:'1 línea completada',pts:2.0},
  {pos:'—',req:'Sin líneas completadas',pts:1.0}
];

const STEPS=[
  {n:'01',title:'Preparación',items:['Cada equipo recibe su tarjeta de bingo','La casilla central LIBRE ya está marcada','Preparen fichas o marcadores para señalar']},
  {n:'02',title:'Revolver las fichas',items:['El moderador mezcla las 24 tarjetas de términos','Las coloca boca abajo en un montón','Revuelve bien para garantizar aleatoriedad']},
  {n:'03',title:'Sacar y marcar',items:['El moderador saca una ficha al azar','Lee el término en voz alta para todos','Los equipos lo buscan y, si lo tienen, lo marcan']},
  {n:'04',title:'Cantar BINGO',items:['Cuando completes una línea de 5 casillas','Grita ¡BINGO! lo más rápido posible','El primer equipo en cantar gana la ronda']}
];

/* Iconos botánicos/naturaleza SVG inline — premium y detallados */
const ICON_EAR='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4 C 11 7 8 12 8 18 C 8 23 11 27 16 28 C 21 27 24 23 24 18 C 24 12 21 7 16 4 Z"/><path d="M16 8 V26"/><path d="M16 12 C 13 12 11 10 11 7"/><path d="M16 16 C 19 16 21 14 21 11"/><path d="M16 20 C 13 20 11 18 11 15"/></svg>';
const ICON_LIGHTNING='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3 L8 18 L15 18 L13 29 L24 13 L17 13 Z" fill="currentColor" fill-opacity=".18"/><path d="M18 3 L8 18 L15 18 L13 29 L24 13 L17 13 Z"/></svg>';
const ICON_HANDS='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18 V13 C 9 11 10 10 11 10 C 12 10 13 11 13 13 V17"/><path d="M13 14 V11 C 13 9 14 8 15 8 C 16 8 17 9 17 11 V17"/><path d="M17 14 V10 C 17 8 18 7 19 7 C 20 7 21 8 21 10 V17"/><path d="M21 15 V12 C 21 11 22 10 23 10 C 24 10 25 11 25 12 V19 C 25 24 21 28 16 28 C 11 28 7 24 7 19 V17"/></svg>';
const ICON_BOOK='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6 C 5 5 6 4 7 4 L15 5 L15 28 L7 27 C 6 27 5 26 5 25 Z"/><path d="M27 6 C 27 5 26 4 25 4 L17 5 L17 28 L25 27 C 26 27 27 26 27 25 Z"/><path d="M9 9 H13 M9 13 H13 M19 9 H23 M19 13 H23"/></svg>';

const ICON_CACTUS='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 28 V14"/><path d="M16 20 C 12 20 10 18 10 14 C 14 14 16 16 16 20"/><path d="M16 16 C 20 16 22 14 22 10 C 18 10 16 12 16 16"/><path d="M13 25 H19"/><path d="M14 18 L13.5 17 M14 22 L13.5 21 M18 18 L18.5 17 M18 22 L18.5 21" opacity=".7"/></svg>';
const ICON_FOOTPRINT='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="16" cy="22" rx="5" ry="6"/><circle cx="10" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="19" cy="9" r="2"/><circle cx="23" cy="12" r="2"/></svg>';
const ICON_CHECK='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="13"/><path d="M10 16 L14 20 L22 12"/></svg>';
const ICON_EYE='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16 C 6 10 11 7 16 7 C 21 7 26 10 30 16 C 26 22 21 25 16 25 C 11 25 6 22 2 16 Z"/><circle cx="16" cy="16" r="4" fill="currentColor" fill-opacity=".25"/></svg>';
const ICON_STOP='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="13"/><line x1="10" y1="10" x2="22" y2="22"/><line x1="22" y1="10" x2="10" y2="22"/></svg>';
const ICON_SPEAKER='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12 H10 L18 6 V26 L10 20 H5 Z"/><path d="M22 10 C 24 12 24 20 22 22"/><path d="M25 7 C 29 11 29 21 25 25"/></svg>';
const ICON_TROPHY='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4 H22 V14 C 22 18 19 21 16 21 C 13 21 10 18 10 14 Z"/><path d="M10 7 H6 V11 C 6 13 8 14 10 14"/><path d="M22 7 H26 V11 C 26 13 24 14 22 14"/><line x1="14" y1="21" x2="18" y2="21"/><path d="M12 27 H20 M14 27 V21 H18 V27"/></svg>';

const TIPS=[
  {icon:ICON_EAR,title:'Escucha atenta',text:'Presta máxima atención a cada término cantado por el moderador.'},
  {icon:ICON_LIGHTNING,title:'Velocidad',text:'Los primeros en completar líneas ganan la ronda.'},
  {icon:ICON_HANDS,title:'Trabajo en equipo',text:'Coordínate con tus compañeros para no perderte ningún término.'},
  {icon:ICON_BOOK,title:'Conoce el territorio',text:'Estudia los conceptos del ecosistema semiseco andino.'}
];

/* Símbolos botánicos para las tarjetas de Slide 1 (Asignatura / Nivel / Ecosistema / Año) */
const ICON_FLASK='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 V12 L7 25 C 6 27 7 29 10 29 H22 C 25 29 26 27 25 25 L20 12 V4"/><line x1="11" y1="4" x2="21" y2="4"/><path d="M10 18 H22" opacity=".6"/></svg>';
const ICON_GRADUATION='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12 L16 6 L30 12 L16 18 Z"/><path d="M8 15 V23 C 8 25 12 27 16 27 C 20 27 24 25 24 23 V15"/><line x1="28" y1="13" x2="28" y2="22"/></svg>';
const ICON_MOUNTAIN='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 26 L11 11 L17 19 L21 14 L29 26 Z"/><circle cx="22" cy="8" r="2.5"/><path d="M11 11 L14 16 M17 19 L19 21" opacity=".5"/></svg>';
const ICON_CALENDAR='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="24" height="22" rx="2"/><line x1="4" y1="12" x2="28" y2="12"/><line x1="11" y1="3" x2="11" y2="9"/><line x1="21" y1="3" x2="21" y2="9"/><circle cx="11" cy="18" r="1.2" fill="currentColor"/><circle cx="16" cy="18" r="1.2" fill="currentColor"/><circle cx="21" cy="18" r="1.2" fill="currentColor"/><circle cx="11" cy="23" r="1.2" fill="currentColor"/><circle cx="16" cy="23" r="1.2" fill="currentColor"/></svg>';

/* ─── Emblemas de equipo (SVG línea, estilo herbario dorado) ───────── */
const EMBLEMS={
  /* Mineros — pico cruzado con cristal */
  1:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 36 L24 24 M36 12 L24 24"/>
    <path d="M9 39 C 11 37 13 37 15 39 L12 42 Z"/>
    <path d="M39 9 C 37 11 37 13 39 15 L42 12 Z"/>
    <path d="M24 24 L30 18 L34 22 L28 28 Z" opacity=".9"/>
    <path d="M31 20 L33 18" opacity=".6"/>
    <circle cx="24" cy="24" r="2.2" fill="currentColor" opacity=".5"/>
  </svg>`,
  /* Conservacionistas — brote en mano protectora */
  2:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 30 V18"/>
    <path d="M24 22 C 19 22 16 18 16 13 C 21 13 24 17 24 22"/>
    <path d="M24 22 C 29 22 32 18 32 13 C 27 13 24 17 24 22"/>
    <path d="M24 18 C 20 18 17 16 17 11 C 22 11 24 15 24 18"/>
    <path d="M14 30 C 14 34 18 37 24 37 C 30 37 34 34 34 30"/>
    <path d="M14 30 L14 40 L34 40 L34 30"/>
  </svg>`,
  /* Urbanizadores — skyline dentro de un arco */
  3:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 38 C 8 22 16 12 24 12 C 32 12 40 22 40 38"/>
    <rect x="17" y="26" width="6" height="12"/>
    <rect x="25" y="22" width="6" height="16"/>
    <path d="M20 26 V29 M28 22 V25 M28 30 V33"/>
  </svg>`,
  /* Científicos — átomo con hoja en el núcleo */
  4:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="24" cy="24" rx="18" ry="7"/>
    <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)"/>
    <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)"/>
    <path d="M24 26 V20 C 21 20 19 22 19 25 C 22 25 24 23 24 20" fill="currentColor" fill-opacity=".25"/>
  </svg>`,
  /* Campesinos — gavillas de trigo con cinta */
  5:`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 42 V14"/>
    <path d="M16 14 C 13 14 11 11 11 7 C 14 7 16 10 16 14"/>
    <path d="M16 14 C 19 14 21 11 21 7 C 18 7 16 10 16 14"/>
    <path d="M32 42 V14"/>
    <path d="M32 14 C 29 14 27 11 27 7 C 30 7 32 10 32 14"/>
    <path d="M32 14 C 35 14 37 11 37 7 C 34 7 32 10 32 14"/>
    <path d="M24 42 V12"/>
    <path d="M12 26 C 16 24 32 24 36 26"/>
    <path d="M12 26 L10 30 M36 26 L38 30"/>
  </svg>`
};

/* ─── Logo Orobioma (sello herbario: cactus en corona circular) ────── */
function logoSVG(size){
  return `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%">
    <g class="ring">
      <circle cx="50" cy="50" r="46" stroke-dasharray="2 4" opacity=".5"/>
      <circle cx="50" cy="50" r="40" opacity=".8"/>
    </g>
    <g class="ring-in" opacity="0">
    </g>
    <!-- Cactus central -->
    <path d="M50 70 V40"/>
    <path d="M50 52 C 44 52 41 48 41 42 C 46 42 50 46 50 52"/>
    <path d="M50 46 C 56 46 59 42 59 36 C 54 36 50 40 50 46"/>
    <path d="M50 40 C 46 40 43 37 43 32 C 48 32 50 35 50 40"/>
    <path d="M50 34 C 53 34 55 31 55 27 C 51 27 50 30 50 34"/>
    <!-- Espinas -->
    <path d="M47 44 L46 43 M53 44 L54 43 M47 50 L46 49 M50 64 L49 63 M50 64 L51 63" opacity=".7"/>
    <!-- Base/tierra -->
    <path d="M40 70 L60 70"/>
    <path d="M42 70 C 42 74 46 76 50 76 C 54 76 58 74 58 70"/>
    <!-- Brotes laterales -->
    <path d="M35 70 C 32 70 30 67 30 63 C 33 63 35 66 35 70" opacity=".6"/>
    <path d="M65 70 C 68 70 70 67 70 63 C 67 63 65 66 65 70" opacity=".6"/>
  </svg>`;
}

/* ─── Corona SVG realista con gemas ────────────────────────────────── */
const CROWN_SVG=`
<svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f0d68c"/>
      <stop offset="50%" stop-color="#d4a44c"/>
      <stop offset="100%" stop-color="#9a7430"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#fff" stop-opacity="0"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <path d="M20 80 L25 95 L115 95 L120 80 Z" fill="url(#g1)" stroke="#9a7430" stroke-width="1.2"/>
  <path d="M20 80 L15 35 L40 60 L55 25 L70 50 L85 25 L100 60 L125 35 L120 80 Z" fill="url(#g1)" stroke="#9a7430" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M20 80 L15 35 L40 60 L55 25 L70 50 L85 25 L100 60 L125 35 L120 80 Z" fill="url(#g2)" opacity="0.5"/>
  <circle cx="15" cy="35" r="3.5" fill="#e85d75" stroke="#fff" stroke-width="0.6"/>
  <circle cx="55" cy="25" r="4.5" fill="#4d9be6" stroke="#fff" stroke-width="0.6"/>
  <circle cx="70" cy="50" r="5.5" fill="#d4a44c" stroke="#fff" stroke-width="0.8"/>
  <circle cx="85" cy="25" r="4.5" fill="#5cb874" stroke="#fff" stroke-width="0.6"/>
  <circle cx="125" cy="35" r="3.5" fill="#e8b94d" stroke="#fff" stroke-width="0.6"/>
  <ellipse cx="70" cy="87" rx="7" ry="4" fill="#e85d75" stroke="#fff" stroke-width="0.8"/>
  <ellipse cx="70" cy="86" rx="4" ry="1.5" fill="#fff" opacity="0.5"/>
  <line x1="35" y1="87" x2="35" y2="92" stroke="#9a7430" stroke-width="0.8"/>
  <line x1="50" y1="87" x2="50" y2="92" stroke="#9a7430" stroke-width="0.8"/>
  <line x1="90" y1="87" x2="90" y2="92" stroke="#9a7430" stroke-width="0.8"/>
  <line x1="105" y1="87" x2="105" y2="92" stroke="#9a7430" stroke-width="0.8"/>
  <circle cx="30" cy="55" r="1.2" fill="#fff" opacity="0.7"/>
  <circle cx="65" cy="40" r="0.8" fill="#fff" opacity="0.7"/>
  <circle cx="95" cy="50" r="1.2" fill="#fff" opacity="0.7"/>
</svg>`;

/* ─── Medalla SVG ─────────────────────────────────────────────────── */
function medalSVG(roman){
  return `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="mg${roman}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="currentColor" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="currentColor" stop-opacity="0.5"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="2.5" fill="url(#mg${roman})"/>
  <circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.5"/>
  <circle cx="50" cy="50" r="28" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"/>
  <text x="50" y="62" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-weight="500" font-size="32" fill="currentColor">${roman}</text>
  <path d="M28 88 L50 95 L72 88 L72 95 L50 100 L28 95 Z" fill="currentColor" opacity="0.5"/>
</svg>`;
}

/* ─── Estado global ────────────────────────────────────────────────── */
let currentSlide=1;
const TOTAL_SLIDES=5;
let isDesktop=window.matchMedia('(pointer:fine)').matches;
let mouseX=0,mouseY=0,haloX=0,haloY=0;
let introSkipped=false;
let markedCells={};
let completedLines={};
let cardLayouts={};
let drawSequence=[];
let drawIndex=0;
let demoRunning=false;
let scores={};
let gameMode='demo';
let bingosWon={};
const BINGOS_TO_WIN=3;
let currentScreen='preloader';
let currentBg=0;

const wait=ms=>new Promise(r=>setTimeout(r,ms));

/* ─── Inicialización ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  /* Inyectar logo en preloader y barra */
  document.getElementById('preLogo').innerHTML=logoSVG();
  document.getElementById('barLogo').innerHTML=logoSVG(34);
  /* Precargar las 4 fotos de fondo */
  initBackgrounds();
  initCursorHalo();
  initAudioButton();
  initGlobalSfx();  /* SFX delegado global (Bloque 7) */
  initSFXPanel();
  buildTutorial();
  startPreloader();
});

/* Fondo cinematográfico: precarga las 4 fotos desde la carpeta imagenes/ */
function initBackgrounds(){
  const photos=document.querySelectorAll('.bg-photo');
  photos.forEach(p=>{
    const n=p.dataset.img;
    p.style.backgroundImage=`url("imagenes/${n}.jpeg")`;
  });
}

/* Cambia el fondo activo según la pantalla */
function setBackground(n){
  n=((n-1)%4)+1; /* cicla 1-4 */
  if(n===currentBg)return;
  document.querySelectorAll('.bg-photo').forEach(p=>{
    p.classList.toggle('active',+p.dataset.img===n);
  });
  currentBg=n;
}

/* Cursor personalizado TEMÁTICO Orobioma: brújula-talismán + semilla-baya +
   polen orbital (3 partículas) + halo + trail de hojas al moverse */
function initCursorHalo(){
  if(!isDesktop)return;
  const halo=document.getElementById('cursorHalo');
  const ring=document.getElementById('cursorRing');
  const dot=document.getElementById('cursorDot');
  const sparkles=[
    document.getElementById('cursorSparkle1'),
    document.getElementById('cursorSparkle2'),
    document.getElementById('cursorSparkle3')
  ];
  if(!ring||!dot)return;

  /* Marcar como listos (activa opacidad) */
  requestAnimationFrame(()=>{
    ring.classList.add('ready');
    dot.classList.add('ready');
    sparkles.forEach(s=>s&&s.classList.add('ready'));
  });

  /* Pool de partículas para el trail (8 hojas reusables) */
  const TRAIL_SVG=`<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M7 1 Q9 4 7 7 Q5 4 7 1 Z M7 7 Q10 8 11 12 Q7 11 7 7 Z M7 7 Q4 8 3 12 Q7 11 7 7 Z" fill="#8cbe82" opacity="0.9"/></svg>`;
  const trailPool=[];
  for(let i=0;i<8;i++){
    const t=document.createElement('div');
    t.className='cursor-trail';
    t.innerHTML=TRAIL_SVG;
    document.body.appendChild(t);
    trailPool.push({el:t,alive:false,age:0});
  }
  let trailIdx=0;
  let lastTrailX=0, lastTrailY=0;

  let ringX=0, ringY=0;
  let dotX=0, dotY=0;
  let orbitAngle=0;

  /* Selectores de elementos interactivos que cambian el cursor */
  const interactiveSelector='a,button,[role="button"],.btn,.btn-primary,.btn-ghost,.btn-finish,.btn-add,.btn-remove,.btn-reset,.dot,.bc-cell,.card,.step,.tip-card,.rule-card,.line-demo,.score-row,.grade-row,.control-row,.race-mini-row,.bar-row,.podium-spot,input,select,textarea';

  window.addEventListener('mousemove',e=>{
    mouseX=e.clientX;
    mouseY=e.clientY;
    /* Si se movió lo suficiente, sembrar una hoja en el trail */
    const dx=e.clientX-lastTrailX;
    const dy=e.clientY-lastTrailY;
    const dist=Math.sqrt(dx*dx+dy*dy);
    if(dist>14){
      const p=trailPool[trailIdx];
      trailIdx=(trailIdx+1)%trailPool.length;
      p.el.style.left=e.clientX+'px';
      p.el.style.top=e.clientY+'px';
      p.el.style.opacity='1';
      p.el.style.transform='translate(-50%,-50%) rotate('+(Math.random()*360)+'deg) scale(1)';
      p.alive=true;
      p.age=0;
      lastTrailX=e.clientX;
      lastTrailY=e.clientY;
    }
  });

  /* Estado hover sobre elementos interactivos */
  document.addEventListener('mouseover',e=>{
    const t=e.target;
    if(t.closest&&t.closest(interactiveSelector)){
      ring.classList.add('hover');
      dot.classList.add('hover');
    }
  });
  document.addEventListener('mouseout',e=>{
    const t=e.target;
    if(t.closest&&t.closest(interactiveSelector)){
      ring.classList.remove('hover');
      dot.classList.remove('hover');
    }
  });

  /* Estado click */
  window.addEventListener('mousedown',()=>{
    ring.classList.add('down');
    dot.classList.add('down');
  });
  window.addEventListener('mouseup',()=>{
    ring.classList.remove('down');
    dot.classList.remove('down');
  });

  /* Ocultar cursor al salir de la ventana */
  document.addEventListener('mouseleave',()=>{
    ring.classList.remove('ready');
    dot.classList.remove('ready');
    sparkles.forEach(s=>s&&s.classList.remove('ready'));
  });
  document.addEventListener('mouseenter',()=>{
    ring.classList.add('ready');
    dot.classList.add('ready');
    sparkles.forEach(s=>s&&s.classList.add('ready'));
  });

  function tick(){
    /* Semilla central — sigue al instante (lag suave) */
    dotX+=(mouseX-dotX)*.55;
    dotY+=(mouseY-dotY)*.55;
    dot.style.left=dotX+'px';
    dot.style.top=dotY+'px';

    /* Brújula-talismán — sigue con lag elástico */
    ringX+=(mouseX-ringX)*.18;
    ringY+=(mouseY-ringY)*.18;
    ring.style.left=ringX+'px';
    ring.style.top=ringY+'px';

    /* Halo — sigue muy lentamente */
    haloX+=(mouseX-haloX)*.06;
    haloY+=(mouseY-haloY)*.06;
    halo.style.left=haloX+'px';
    halo.style.top=haloY+'px';

    /* Polen orbital — 3 partículas en triángulo a distancias distintas */
    orbitAngle+=.05;
    const baseRadius=22;
    sparkles.forEach((s,i)=>{
      if(!s)return;
      const angle=orbitAngle+(i*(Math.PI*2/3));
      const radius=baseRadius+(i%2)*6;
      const sx=dotX+Math.cos(angle)*radius;
      const sy=dotY+Math.sin(angle)*radius;
      s.style.left=sx+'px';
      s.style.top=sy+'px';
    });

    /* Trail: desvanecer y escalar las hojas */
    for(let i=0;i<trailPool.length;i++){
      const p=trailPool[i];
      if(!p.alive)continue;
      p.age+=16;
      const life=600; // ms total de vida
      const t=Math.min(1,p.age/life);
      const op=1-t;
      const sc=1-t*0.6;
      p.el.style.opacity=op.toFixed(3);
      p.el.style.transform=`translate(-50%,-50%) scale(${sc.toFixed(3)}) rotate(${(t*180).toFixed(0)}deg)`;
      if(t>=1){p.alive=false;p.el.style.opacity='0';}
    }

    requestAnimationFrame(tick);
  }
  tick();
}

/* ─── Preloader ───────────────────────────────────────────────────── */
function startPreloader(){
  setBackground(1);
  setTimeout(()=>{
    const pre=document.getElementById('preloader');
    gsap.to(pre,{
      opacity:0,
      duration:.8,
      ease:'power2.inOut',
      onComplete:()=>{
        pre.style.display='none';
        startIntro();
      }
    });
  },2600);
}

/* ─── Intro — secuencia de créditos minimalista ───────────────────── */
async function startIntro(){
  if(introSkipped)return;
  const intro=document.getElementById('intro');
  const stage=document.getElementById('introStage');
  intro.classList.add('active');
  currentScreen='intro';
  setBackground(2);

  for(let i=0;i<CREATORS.length;i++){
    if(introSkipped)return;
    await showCreatorName(CREATORS[i],i);
  }

  if(introSkipped)return;

  await wait(600);
  const reveal=document.createElement('div');
  reveal.className='intro-reveal';
  reveal.innerHTML=`
    <div class="label">Presentan</div>
    <h1>Equipo <em>Orobioma</em></h1>
    <div class="credits-line">
      <span>Décimo Grado</span>
      <span>Ciencias Naturales</span>
      <span>2026</span>
    </div>
    <div class="subtitle">Una experiencia educativa sobre el ecosistema semiseco del altiplano cundiboyacense</div>
  `;
  stage.appendChild(reveal);

  await new Promise(r=>gsap.fromTo(reveal,
    {opacity:0,y:30},
    {opacity:1,y:0,duration:1.2,ease:'power2.out',onComplete:r}
  ));

  await wait(3500);
  if(introSkipped)return;

  gsap.to(intro,{
    opacity:0,
    duration:.9,
    ease:'power2.inOut',
    onComplete:()=>{
      intro.classList.remove('active');
      intro.style.opacity='1';
      showScreen('tutorial');
    }
  });
}

async function showCreatorName(creator,index){
  const stage=document.getElementById('introStage');
  const name=document.createElement('div');
  name.className='intro-name';
  name.textContent=creator.name;
  name.style.color=creator.color;
  name.style.textShadow=`0 0 40px ${creator.color}40`;
  stage.appendChild(name);

  await new Promise(r=>gsap.fromTo(name,
    {opacity:0,scale:.92,y:20},
    {opacity:1,scale:1,y:0,duration:1,ease:'power2.out',onComplete:r}
  ));
  name.classList.add('visible');

  await wait(1400);

  if(introSkipped){name.remove();return;}

  await new Promise(r=>gsap.to(name,{
    opacity:0,
    y:-20,
    duration:.8,
    ease:'power2.in',
    onComplete:()=>{name.remove();r()}
  }));
}

function skipIntro(){
  introSkipped=true;
  const intro=document.getElementById('intro');
  if(intro.classList.contains('active')){
    sfx('whoosh'); /* transición al saltar intro */
    gsap.to(intro,{
      opacity:0,
      duration:.4,
      onComplete:()=>{
        intro.classList.remove('active');
        intro.style.opacity='1';
        showScreen('tutorial');
      }
    });
  }
}

/* ─── Construcción del tutorial ───────────────────────────────────── */
function buildTutorial(){
  /* Equipos */
  const tg=document.getElementById('teamsGrid');
  TEAMS.forEach(t=>{
    const c=document.createElement('div');
    c.className='card team-card';
    c.style.borderTop=`3px solid ${t.color}`;
    c.innerHTML=`
      <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-3)">
        <div class="avatar team-avatar" style="--team:${t.color}">${t.letter}</div>
        <div>
          <div class="card-value" style="color:${t.color};font-size:1.3rem">${t.name}</div>
          <div class="card-label">${t.role}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-3);color:${t.color}">
        <div class="emblem" style="--em-size:30px;--team:${t.color}">${EMBLEMS[t.id]}</div>
        <span class="card-text" style="margin:0">Tarjeta única · color identificativo</span>
      </div>
    `;
    tg.appendChild(c);
  });

  /* Pasos */
  const sg=document.getElementById('stepsGrid');
  STEPS.forEach(s=>{
    const el=document.createElement('div');
    el.className='step';
    el.innerHTML=`
      <div class="step-num">${s.n}</div>
      <div class="step-title">${s.title}</div>
      <ul class="step-list">${s.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    `;
    sg.appendChild(el);
  });

  /* Líneas ganadoras */
  const ld=document.getElementById('lineDemos');
  [
    {name:'Horizontal',desc:'Completa una fila',cells:[0,1,2,3,4]},
    {name:'Vertical',desc:'Completa una columna',cells:[0,5,10,15,20]},
    {name:'Diagonal',desc:'De esquina a esquina',cells:[0,6,12,18,24]}
  ].forEach(l=>{
    const d=document.createElement('div');
    d.className='line-demo';
    let cells='';
    for(let i=0;i<25;i++)cells+=`<div class="line-cell${l.cells.includes(i)?' on':''}"></div>`;
    d.innerHTML=`<div class="line-grid">${cells}</div><div class="line-name">${l.name}</div><div class="line-desc">${l.desc}</div>`;
    ld.appendChild(d);
  });

  /* Tabla de puntuación */
  const st=document.getElementById('scoreTable');
  let html='<div class="score-row head"><div>Puesto</div><div>Requisito</div><div style="text-align:center">Nota</div></div>';
  SCORE_TABLE.forEach((s,i)=>{
    html+=`<div class="score-row"><div class="score-pos">${s.pos}</div><div class="score-req">${s.req}</div><div class="score-pts">${s.pts.toFixed(1)}</div></div>`;
  });
  st.innerHTML=html;

  /* Consejos */
  const tipG=document.getElementById('tipsGrid');
  TIPS.forEach(t=>{
    const c=document.createElement('div');
    c.className='card tip-card';
    c.innerHTML=`
      <div class="tip-icon-wrap">
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${t.icon.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>
      </div>
      <div class="card-value tip-title">${t.title}</div>
      <div class="card-text tip-text">${t.text}</div>
    `;
    tipG.appendChild(c);
  });

  /* Dots */
  const dots=document.getElementById('dots');
  for(let i=1;i<=TOTAL_SLIDES;i++){
    const d=document.createElement('div');
    d.className='dot'+(i===1?' active':'');
    d.onclick=()=>goToSlide(i);
    dots.appendChild(d);
  }

  /* Scroll-reveal: animar tarjetas, pasos y reglas al entrar en viewport */
  if(window.ScrollTrigger){
    gsap.utils.toArray('#tutorial .card, #tutorial .step, .line-demo, .score-row, .note').forEach(el=>{
      gsap.fromTo(el,
        {opacity:0,y:24,scale:.96},
        {
          opacity:1,y:0,scale:1,
          duration:.7,
          ease:'power3.out',
          scrollTrigger:{
            trigger:el,
            start:'top 90%',
            toggleActions:'play none none none',
            once:true
          }
        }
      );
    });
    /* Stagger de las tarjetas de equipo */
    ScrollTrigger.batch('#teamsGrid .card',{
      start:'top 85%',
      onEnter:els=>gsap.fromTo(els,{opacity:0,y:30,scale:.92,rotate:-2},{opacity:1,y:0,scale:1,rotate:0,duration:.7,stagger:.08,ease:'back.out(1.3)'}),
      once:true
    });
    ScrollTrigger.batch('.cards.c4 .card, .cards.c2 .card',{
      start:'top 88%',
      onEnter:els=>gsap.fromTo(els,{opacity:0,y:24,scale:.95},{opacity:1,y:0,scale:1,duration:.6,stagger:.07,ease:'power3.out'}),
      once:true
    });
  }

  /* Botones magnéticos con seguimiento del cursor */
  initMagneticButtons();
}

/* ─── Navegación del tutorial ─────────────────────────────────────── */
function tutNext(){
  sfx('click');
  if(currentSlide<TOTAL_SLIDES)goToSlide(currentSlide+1);
  else beginExperience();
}
function tutPrev(){
  sfx('click');
  if(currentSlide>1)goToSlide(currentSlide-1);
}
function goToSlide(n){
  if(n===currentSlide)return;
  const prevSlide=document.getElementById('slide'+currentSlide);
  const nextSlide=document.getElementById('slide'+n);
  if(!prevSlide||!nextSlide)return;

  /* Out animation */
  gsap.to(prevSlide,{opacity:0,y:-20,duration:.35,ease:'power2.in',onComplete:()=>{
    prevSlide.classList.remove('active');
    nextSlide.classList.add('active');
    gsap.fromTo(nextSlide,
      {opacity:0,y:30,scale:.97},
      {opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',onComplete:()=>{
        /* Stagger reveal de cards dentro del slide activo */
        gsap.fromTo(nextSlide.querySelectorAll('.card, .step, .line-demo, .score-row, .note, .tip-card, .rule-card'),
          {opacity:0,y:18,scale:.96},
          {opacity:1,y:0,scale:1,duration:.55,stagger:.06,ease:'power3.out'}
        );
      }}
    );
  }});

  currentSlide=n;
  document.querySelectorAll('.dot').forEach((d,i)=>{
    d.classList.remove('active','done');
    if(i+1===n)d.classList.add('active');
    else if(i+1<n)d.classList.add('done');
  });
  document.getElementById('prevBtn').disabled=n===1;
  document.getElementById('nextBtn').textContent=n===TOTAL_SLIDES?'Iniciar juego ▸':'Siguiente ▸';
}

/* ─── Botones magnéticos con tilt 3D ──────────────────────────────── */
function initMagneticButtons(){
  if(!isDesktop)return;
  document.querySelectorAll('.btn-primary, .btn-finish').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2;
      const y=e.clientY-r.top-r.height/2;
      gsap.to(btn,{
        x:x*.18,
        y:y*.22,
        duration:.4,
        ease:'power2.out'
      });
    });
    btn.addEventListener('mouseleave',()=>{
      gsap.to(btn,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'});
    });
  });
}

/* ─── Cambio de pantalla (con rotación de fondo) ───────────────────── */
function showScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('game-start').classList.remove('active');
  document.getElementById(name).classList.add('active');
  currentScreen=name;
  /* Rotar fondo según pantalla */
  const bgMap={tutorial:3,'game-start':4,'game-main':4,'race-screen':2,winners:1,credits:3};
  if(bgMap[name])setBackground(bgMap[name]);
  window.scrollTo({top:0,behavior:'instant'});
}

/* ─── Inicio de la experiencia de juego ───────────────────────────── */
function beginExperience(){
  /* Asegurar cierre de todas las pantallas previas */
  document.getElementById('tutorial').classList.remove('active');
  const gs=document.getElementById('game-start');
  gs.classList.remove('active');
  showScreen('game-main');
  gameMode='demo';
  document.getElementById('gameMode').textContent='Demo · bots automáticos';
  document.getElementById('controlTable').style.display='none';
  document.getElementById('race-mini-screen').classList.remove('active');
  initDemo();
  buildCards();
  sfx('whoosh'); /* SFX de transición al juego */
  setTimeout(()=>runDemo(),800);
}

/* ─── Demo automática ──────────────────────────────────────────────── */
function initDemo(){
  markedCells={};
  completedLines={};
  demoRunning=true;

  for(let t=1;t<=5;t++){
    cardLayouts[t]=shuffle([...TERMS],Date.now()+t*1000+Math.floor(Math.random()*9999));
  }
  drawSequence=shuffle([...TERMS],Date.now());
  drawIndex=0;

  TEAMS.forEach(team=>{
    markedCells[team.id]=[12];
    completedLines[team.id]=0;
  });
}

function shuffle(arr,seed){
  const r=[...arr];
  let s=seed;
  for(let i=r.length-1;i>0;i--){
    s=(s*9301+49297)%233280;
    const j=Math.floor((s/233280)*(i+1));
    [r[i],r[j]]=[r[j],r[i]];
  }
  return r;
}

/* ─── Construcción de tarjetas de bingo ───────────────────────────── */
function buildCards(){
  const grid=document.getElementById('bingoGrid');
  grid.innerHTML='';
  TEAMS.forEach(team=>{
    const card=document.createElement('div');
    card.className='bingo-card';
    card.id='card-'+team.id;
    card.style.setProperty('--team',team.color);
    let cells='';
    const layout=cardLayouts[team.id];
    for(let i=0;i<25;i++){
      if(i===12){
        cells+=`<div class="bc-cell free" data-team="${team.id}" data-idx="12">LIBRE</div>`;
      }else{
        const term=layout[i<12?i:i-1];
        cells+=`<div class="bc-cell" data-team="${team.id}" data-idx="${i}" data-term="${term}">${term}</div>`;
      }
    }
    card.innerHTML=`
      <div class="bc-head">
        <div class="bc-name"><div class="bc-avatar-sm">${team.letter}</div>${team.name}</div>
        <div class="bc-lines">Líneas: <b id="lines-${team.id}">0</b></div>
      </div>
      <div class="bc-cells">${cells}</div>
    `;
    grid.appendChild(card);
  });
  /* Timeline premium con escala, blur y rotación ligera */
  const tl=gsap.timeline({defaults:{ease:'power3.out'}});
  tl.fromTo('.bingo-card',
    {opacity:0,y:30,scale:.92,filter:'blur(8px)'},
    {opacity:1,y:0,scale:1,filter:'blur(0px)',duration:.7,stagger:.08}
  ).fromTo('.bc-cell',
    {opacity:0,scale:.7},
    {opacity:1,scale:1,duration:.4,stagger:.012},
    '-=.35'
  );
}

/* ─── Ejecución de la demo automática ─────────────────────────────── */
async function runDemo(){
  const pill=document.getElementById('fichaPill');
  const termEl=document.getElementById('fichaTerm');
  const countEl=document.getElementById('fichaCount');
  pill.classList.add('active');

  let champion=null;
  const SPEED=300;

  for(let i=0;i<drawSequence.length;i++){
    if(!demoRunning)break;
    drawIndex=i;
    const term=drawSequence[i];
    termEl.textContent=term;
    countEl.textContent=`${i+1} / ${drawSequence.length}`;

    gsap.fromTo(pill,
      {scale:1},
      {scale:1.04,duration:.15,yoyo:true,repeat:1}
    );

    markAllCards(term);
    checkAllLines();

    await wait(SPEED);

    champion=TEAMS.find(t=>completedLines[t.id]>=3);
    if(champion){
      demoRunning=false;
      break;
    }
  }

  pill.classList.remove('active');

  if(champion){
    toast(`¡${champion.name} es tricampeón de la demo!`,champion.color);
    document.getElementById('card-'+champion.id).classList.add('triple');
    burstConfetti(window.innerWidth/2,window.innerHeight/2,champion.color,80);
    await wait(3000);
  }else{
    let maxLines=0,leader=null;
    TEAMS.forEach(t=>{
      if(completedLines[t.id]>maxLines){
        maxLines=completedLines[t.id];
        leader=t;
      }
    });
    if(leader&&maxLines>0){
      toast(`Demo: ${leader.name} lideró con ${maxLines} línea(s)`,leader.color);
      await wait(2500);
    }else{
      await wait(1500);
    }
  }

  transitionToReal();
}

function markAllCards(term){
  TEAMS.forEach(team=>{
    const layout=cardLayouts[team.id];
    for(let i=0;i<24;i++){
      if(layout[i]===term){
        const cellIdx=i<12?i:i+1;
        if(!markedCells[team.id].includes(cellIdx)){
          markedCells[team.id].push(cellIdx);
          const cell=document.querySelector(`.bc-cell[data-team="${team.id}"][data-idx="${cellIdx}"]`);
          if(cell){
            cell.classList.add('marked');
            miniBurst(cell,team.color);
            /* SFX único por equipo al marcar celda */
            sfxTeam(team.id);
          }
        }
      }
    }
  });
}

function checkAllLines(){
  TEAMS.forEach(team=>{
    const marked=markedCells[team.id];
    let count=0;
    WIN_LINES.forEach(line=>{
      if(line.every(idx=>marked.includes(idx)))count++;
    });
    if(count>completedLines[team.id]){
      completedLines[team.id]=count;
      onLineComplete(team.id);
      updateLineCounter(team.id);
      updateLeader();
    }
  });
}

function onLineComplete(teamId){
  const team=TEAMS.find(t=>t.id===teamId);
  /* SFX: chime mágico de línea completada + ding de bingo */
  sfx('chime');
  setTimeout(()=>sfx('ding'),200);
  shoutBingo(team);
  toast(`¡${team.name} cantó BINGO!`,team.color);

  const marked=markedCells[teamId];
  WIN_LINES.forEach(line=>{
    if(line.every(idx=>marked.includes(idx))){
      line.forEach(idx=>{
        const cell=document.querySelector(`.bc-cell[data-team="${teamId}"][data-idx="${idx}"]`);
        if(cell&&!cell.classList.contains('line-win')){
          cell.classList.add('line-win');
          setTimeout(()=>cell.classList.remove('line-win'),800);
        }
      });
    }
  });

  const card=document.getElementById('card-'+teamId);
  const rect=card.getBoundingClientRect();
  burstConfetti(rect.left+rect.width/2,rect.top+rect.height/2,team.color,18);
}

function shoutBingo(team){
  const card=document.getElementById('card-'+team.id);
  if(!card)return;
  const rect=card.getBoundingClientRect();
  const shout=document.createElement('div');
  shout.className='bingo-shout';
  shout.style.color=team.color;
  shout.style.left=(rect.left+rect.width/2)+'px';
  shout.style.top=(rect.top+rect.height/2)+'px';
  shout.textContent='¡BINGO!';
  document.body.appendChild(shout);

  gsap.fromTo(shout,
    {opacity:0,scale:.4,y:0},
    {opacity:1,scale:1.1,y:-40,duration:.5,ease:'back.out(1.6)'}
  );
  gsap.to(shout,{
    y:-200,
    opacity:0,
    scale:.85,
    duration:1.3,
    delay:.6,
    ease:'power2.in',
    onComplete:()=>shout.remove()
  });
}

function updateLineCounter(teamId){
  const el=document.getElementById('lines-'+teamId);
  if(el){
    el.textContent=completedLines[teamId];
    gsap.fromTo(el,{scale:1.5},{scale:1,duration:.3});
  }
}

function updateLeader(){
  let max=0,leader=null;
  TEAMS.forEach(t=>{
    if(completedLines[t.id]>max){
      max=completedLines[t.id];
      leader=t;
    }
  });
  const ln=document.getElementById('leaderName');
  const ld=document.getElementById('leaderDot');
  if(leader&&max>0){
    ln.textContent=`${leader.name} (${max})`;
    ln.style.color=leader.color;
    ld.style.background=leader.color;
    ld.style.boxShadow=`0 0 8px ${leader.color}`;
  }else{
    ln.textContent='—';
    ln.style.color='var(--sage-bright)';
    ld.style.background='var(--sage)';
    ld.style.boxShadow='0 0 8px var(--sage)';
  }
}

/* ─── Transición al modo real ─────────────────────────────────────── */
async function transitionToReal(){
  toast('Comenzando partida real...','var(--sage)');
  await wait(2000);

  gameMode='real';
  bingosWon={};
  TEAMS.forEach(t=>{
    bingosWon[t.id]=0;
    scores[t.id]=0;
  });

  document.querySelectorAll('.bingo-card').forEach(c=>c.classList.remove('winner','triple'));
  document.querySelectorAll('.bc-cell').forEach(c=>{
    if(!c.classList.contains('free'))c.classList.remove('marked','line-win');
  });
  markedCells={};
  completedLines={};
  TEAMS.forEach(team=>{
    markedCells[team.id]=[12];
    completedLines[team.id]=0;
    const el=document.getElementById('lines-'+team.id);
    if(el)el.textContent='0';
  });
  updateLeader();

  document.getElementById('gameMode').textContent='Partida real';
  document.getElementById('controlTable').style.display='block';
  const rms=document.getElementById('race-mini-screen');
  rms.classList.add('active');
  rms.scrollTop=0;

  buildControlTable();
  buildRaceMini();

  /* Animaciones de entrada */
  gsap.fromTo('#controlTable',
    {opacity:0,y:30},
    {opacity:1,y:0,duration:.7,ease:'power3.out'}
  );
  gsap.fromTo('#raceMini',
    {opacity:0,scale:.94,y:24},
    {opacity:1,scale:1,y:0,duration:.8,delay:.2,ease:'back.out(1.2)'}
  );
  gsap.fromTo('.control-row',
    {opacity:0,x:-30},
    {opacity:1,x:0,duration:.5,stagger:.08,delay:.3,ease:'power3.out'}
  );
  gsap.fromTo('.race-mini-row',
    {opacity:0,x:30},
    {opacity:1,x:0,duration:.5,stagger:.08,delay:.4,ease:'power3.out'}
  );

  toast('Pulsa «+» para añadir un Bingo, «−» para corregir','var(--sage)');
}

/* ─── Tabla de control de Bingos (modo real) ──────────────────────── */
function buildControlTable(){
  const rows=document.getElementById('controlRows');
  rows.innerHTML=TEAMS.map((t,i)=>`
    <div class="control-row" id="crow-${t.id}" style="--team:${t.color}">
      <div class="control-num">${String(i+1).padStart(2,'0')}</div>
      <div class="control-team">
        <div class="avatar" style="--team:${t.color};width:36px;height:36px;font-size:.95rem">${t.letter}</div>
        <div class="control-team-name">${t.name}</div>
      </div>
      <div class="control-count">
        <b id="ccount-${t.id}">0</b>
        <small>Bingos</small>
      </div>
      <div class="control-track">
        <i id="ctrack-${t.id}"></i>
      </div>
      <div class="control-btns">
        <button class="btn-remove" id="crmv-${t.id}" onclick="removeBingo(${t.id})" disabled title="Quitar un punto (corregir error)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <button class="btn-add" onclick="addBingo(${t.id})" title="Añadir un Bingo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function buildRaceMini(){
  const c=document.getElementById('raceMiniRows');
  c.innerHTML=TEAMS.map(t=>`
    <div class="race-mini-row" style="--team:${t.color}">
      <div class="race-mini-name">
        <div class="bc-avatar-sm">${t.letter}</div>
        ${t.name}
      </div>
      <div class="race-mini-path">
        <div class="race-mini-runner" id="mrunner-${t.id}" style="left:0">${t.letter}</div>
      </div>
      <div class="race-mini-count" id="mcount-${t.id}">0</div>
    </div>
  `).join('');
}

/* Añadir un BINGO a un equipo */
function addBingo(teamId){
  if(gameMode!=='real')return;
  bingosWon[teamId]++;
  const team=TEAMS.find(t=>t.id===teamId);

  updateControlUI(teamId);

  /* Actualizar líder */
  document.querySelectorAll('.control-row').forEach(r=>r.classList.remove('leader'));
  let maxB=0,leaderT=null;
  TEAMS.forEach(t=>{
    if(bingosWon[t.id]>maxB){
      maxB=bingosWon[t.id];
      leaderT=t;
    }
  });
  if(leaderT&&maxB>0){
    document.getElementById('crow-'+leaderT.id).classList.add('leader');
  }

  document.getElementById('btnFinish').disabled=false;

  /* SFX: ding de bingo + posible sparkle si llega a la línea */
  sfx(bingosWon[teamId]>=BINGOS_TO_WIN?'fanfare':'ding');

  toast(`¡${team.name} tiene ${bingosWon[teamId]} Bingo(s)!`,team.color);
  burstConfetti(window.innerWidth/2,window.innerHeight/3,team.color,30);

  if(bingosWon[teamId]>=BINGOS_TO_WIN){
    document.getElementById('card-'+teamId).classList.add('triple');
    setTimeout(()=>sfx('magic'),300);
    toast(`¡${team.name} es tricampeón!`,team.color);
    burstConfetti(window.innerWidth/2,window.innerHeight/2,team.color,80);
  }
}

/* QUITAR un BINGO a un equipo (corregir un punto por error) */
function removeBingo(teamId){
  if(gameMode!=='real')return;
  if(bingosWon[teamId]<=0)return;
  bingosWon[teamId]--;
  const team=TEAMS.find(t=>t.id===teamId);

  updateControlUI(teamId);

  /* Quitar marca tricampeón si ya no cumple */
  if(bingosWon[teamId]<BINGOS_TO_WIN){
    document.getElementById('card-'+teamId).classList.remove('triple');
  }

  /* Actualizar líder */
  document.querySelectorAll('.control-row').forEach(r=>r.classList.remove('leader'));
  let maxB=0,leaderT=null;
  TEAMS.forEach(t=>{
    if(bingosWon[t.id]>maxB){
      maxB=bingosWon[t.id];
      leaderT=t;
    }
  });
  if(leaderT&&maxB>0){
    document.getElementById('crow-'+leaderT.id).classList.add('leader');
  }

  /* Si el total queda en 0, deshabilitar botón terminar */
  const total=Object.values(bingosWon).reduce((a,b)=>a+b,0);
  if(total===0){
    document.getElementById('btnFinish').disabled=true;
  }

  /* SFX: error suave al retirar punto */
  sfx('error');

  toast(`Punto retirado de ${team.name}: ${bingosWon[teamId]} Bingo(s)`,team.color);
}

/* Refresca la UI de control para un equipo tras sumar o restar */
function updateControlUI(teamId){
  const team=TEAMS.find(t=>t.id===teamId);
  const countEl=document.getElementById('ccount-'+teamId);
  const trackEl=document.getElementById('ctrack-'+teamId);
  const rowEl=document.getElementById('crow-'+teamId);
  const mrunner=document.getElementById('mrunner-'+teamId);
  const mcount=document.getElementById('mcount-'+teamId);
  const rmvBtn=document.getElementById('crmv-'+teamId);

  const val=bingosWon[teamId];
  countEl.textContent=val;
  mcount.textContent=val;
  const pct=Math.min(100,(val/BINGOS_TO_WIN)*100);
  trackEl.style.width=pct+'%';
  mrunner.style.left=`calc(${pct}% - 12px)`;

  /* Habilitar quitar solo si hay puntos */
  if(rmvBtn)rmvBtn.disabled=val<=0;

  gsap.fromTo(rowEl,
    {scale:1.02,boxShadow:`0 0 24px ${team.color}`},
    {scale:1,duration:.5}
  );
  gsap.fromTo(countEl,
    {scale:1.5,color:team.color},
    {scale:1,color:'var(--sage-bright)',duration:.4}
  );
}

/* ─── Finalizar y pasar a la carrera ──────────────────────────────── */
function finishGame(){
  const total=Object.values(bingosWon).reduce((a,b)=>a+b,0);
  if(total===0){
    sfx('error'); /* advertencia al intentar terminar sin bingos */
    toast('Añade al menos un Bingo antes de terminar','var(--t1)');
    return;
  }
  sfx('fanfare'); /* cierre del juego → carrera */
  startRaceScreen();
}

/* ─── Pantalla de carrera fullscreen ──────────────────────────────── */
async function startRaceScreen(){
  const gm=document.getElementById('game-main');
  const rs=document.getElementById('race-screen');
  const rms=document.getElementById('race-mini-screen');

  sfx('whoosh'); /* SFX de transición épica */

  gsap.to([gm,rms],{
    opacity:0,
    duration:.5,
    onComplete:()=>{
      gm.classList.remove('active');
      rms.classList.remove('active');
      gm.style.opacity='1';
      rms.style.opacity='1';
      rs.classList.add('active');
      rs.scrollTop=0;
      buildRaceBig();
      runCountdown();
    }
  });
}

function buildRaceBig(){
  const c=document.getElementById('raceBig');
  c.innerHTML=TEAMS.map(t=>`
    <div class="race-big-lane" style="--team:${t.color}">
      <div class="race-big-head">
        <div class="race-big-name">
          <div class="avatar" style="--team:${t.color}">${t.letter}</div>
          <div>
            ${t.name}
            <small>${t.role}</small>
          </div>
        </div>
        <div class="race-big-count" id="bcount-${t.id}">${bingosWon[t.id]}/${BINGOS_TO_WIN}</div>
      </div>
      <div class="race-big-path">
        <div class="race-big-finish"></div>
        <div class="race-big-runner" id="brunner-${t.id}" style="left:0">${t.letter}</div>
      </div>
    </div>
  `).join('');
}

/* Countdown 3-2-1-YA */
async function runCountdown(){
  for(let n=3;n>=1;n--){
    const cd=document.createElement('div');
    cd.className='countdown';
    cd.textContent=n;
    document.body.appendChild(cd);
    sfx('pop'); /* SFX en cada número del countdown */
    gsap.fromTo(cd,
      {opacity:0,scale:1.8},
      {opacity:1,scale:1,duration:.35,ease:'back.out(1.8)'}
    );
    gsap.to(cd,{
      opacity:0,
      scale:.6,
      duration:.4,
      delay:.55,
      onComplete:()=>cd.remove()
    });
    await wait(950);
  }

  const ya=document.createElement('div');
  ya.className='countdown';
  ya.textContent='¡YA!';
  ya.style.fontSize='clamp(5rem,15vw,11rem)';
  document.body.appendChild(ya);
  sfx('fanfare'); /* SFX de "¡YA!" para arrancar la carrera */
  gsap.fromTo(ya,
    {opacity:0,scale:.5},
    {opacity:1,scale:1,duration:.4,ease:'back.out(1.8)'}
  );
  await wait(700);
  gsap.to(ya,{
    opacity:0,
    scale:1.4,
    duration:.4,
    onComplete:()=>ya.remove()
  });

  await runBigRace();
}

/* Animación de la carrera grande */
async function runBigRace(){
  const STEP_DELAY=450;

  for(let step=1;step<=BINGOS_TO_WIN;step++){
    TEAMS.forEach(team=>{
      if(bingosWon[team.id]>=step){
        const pct=Math.min(100,(step/BINGOS_TO_WIN)*100);
        const runner=document.getElementById('brunner-'+team.id);
        if(runner){
          runner.style.left=`calc(${pct}% - 20px)`;
        }
      }
    });
    await wait(STEP_DELAY);
  }

  await wait(1500);

  let winner=TEAMS[0];
  let maxB=bingosWon[TEAMS[0].id];
  TEAMS.forEach(t=>{
    if(bingosWon[t.id]>maxB){
      maxB=bingosWon[t.id];
      winner=t;
    }
  });

  showRaceWinner(winner);
}

function showRaceWinner(winner){
  const display=document.getElementById('raceWinner');
  const avatar=document.getElementById('raceWinnerAvatar');
  const nameEl=document.getElementById('raceWinnerName');
  const scoreEl=document.getElementById('raceWinnerScore');

  avatar.innerHTML=`<div class="avatar" style="--team:${winner.color};width:80px;height:80px;font-size:2rem">${winner.letter}</div>`;
  nameEl.textContent=winner.name;
  nameEl.style.color=winner.color;
  nameEl.style.textShadow=`0 0 40px ${winner.color}80`;
  scoreEl.textContent=`${bingosWon[winner.id]} Bingo${bingosWon[winner.id]!==1?'s':''}`;

  display.classList.add('active');

  setTimeout(()=>{
    dropCrownOnWinner(winner);
  },800);

  burstConfetti(window.innerWidth/2,window.innerHeight/2,winner.color,120);
  launchConfetti(700);

  setTimeout(()=>{
    document.getElementById('btnToWinners').style.display='inline-flex';
    gsap.fromTo('#btnToWinners',
      {opacity:0,y:20},
      {opacity:1,y:0,duration:.5}
    );
  },3800);
}

/* ─── Animación MEJORADA de la corona ────────────────────────────────
   Fases:
   1. Estela de chispas doradas baja desde el cielo anunciándola
   2. Rayos de luz se encienden en el punto de aterrizaje
   3. La corona aparece girando, cae con aceleración (gravedad)
   4. Al posarse: rebote elástico + destello de chispas + pedestal
   5. La corona queda flotando suavemente sobre el avatar
───────────────────────────────────────────────────────────────────── */
async function dropCrownOnWinner(winner){
  const winnerAvatar=document.querySelector('#raceWinnerAvatar .avatar');
  if(!winnerAvatar)return;

  const rect=winnerAvatar.getBoundingClientRect();
  /* Coordenadas del CENTRO de la cabeza del avatar (viewport) */
  const headCenterX=rect.left+rect.width/2;
  const headTopY=rect.top;

  /* 1. Estela de chispas que baja anunciando la corona */
  for(let i=0;i<22;i++){
    const spark=document.createElement('div');
    const sx=headCenterX+(Math.random()-.5)*50;
    spark.style.cssText=`position:fixed;left:${sx}px;top:${-30-i*16}px;width:${3+Math.random()*3}px;height:${3+Math.random()*3}px;background:var(--amber);border-radius:50%;box-shadow:0 0 10px var(--amber);pointer-events:none;z-index:447`;
    document.body.appendChild(spark);
    gsap.to(spark,{
      top:headTopY-40,
      opacity:0,
      duration:.5+i*.04,
      ease:'power2.in',
      delay:i*.045,
      onComplete:()=>spark.remove()
    });
  }
  await wait(800);

  /* 2. Rayos de luz y pedestal en la CABEZA del ganador */
  const rays=document.createElement('div');
  rays.className='crown-rays';
  rays.style.left=headCenterX+'px';
  rays.style.top=(headTopY-30)+'px';
  document.body.appendChild(rays);

  const pedestal=document.createElement('div');
  pedestal.className='crown-pedestal';
  pedestal.style.left=headCenterX+'px';
  pedestal.style.top=(headTopY-10)+'px';
  document.body.appendChild(pedestal);

  gsap.to(rays,{opacity:1,duration:.5,ease:'power2.out'});
  gsap.to(pedestal,{opacity:.9,duration:.5});
  await wait(250);

  /* 3. Crear la corona. VERSIÓN DEFINITIVA (Bloque 9):
     - 100% transform-based (sin top/left, solo x/y).
     - x/y se calculan respecto al CENTRO de la cabeza, NO al top-left.
     - transform-origin: 50% 95% → pivote en la BASE del SVG.
     - Esto elimina AMBOS bugs: que se vaya al piso y que se vaya al cielo. */
  const crown=document.createElement('div');
  crown.className='falling-crown';
  crown.innerHTML=CROWN_SVG;
  crown.style.left='0';
  crown.style.top='0';
  crown.style.opacity='0';
  document.body.appendChild(crown);

  /* Forzar reflow para que el SVG se renderice y podamos medir */
  void crown.offsetHeight;
  const crownRect=crown.getBoundingClientRect();
  const crownActualH=crownRect.height;

  /* Calcular la posición FINAL donde la BASE de la corona toca la cabeza.
     La corona tiene transformOrigin: 50% 95% (la base).
     Para que la base toque headTopY, necesitamos colocar el CENTRO vertical
     del elemento (que coincide con el 50% del SVG) en headTopY - crownActualH * 0.05
     (porque el 5% inferior del SVG está por debajo del pivote).
     Como `translate(x,y)` posiciona la ESQUINA SUPERIOR IZQUIERDA,
     debemos traducir a (headCenterX - crownW/2, headTopY - crownActualH * 0.95).
     PERO usaremos `xPercent: -50` para centrar horizontalmente sin calcular a mano. */
  const finalY=headTopY - crownActualH * 0.95 + 6; /* +6 = pequeño overlap sobre la cabeza */

  /* Posición inicial: muy arriba, descentrada, pequeña, rotada */
  gsap.set(crown,{
    x:headCenterX,
    y:-crownActualH - 60, /* fuera de pantalla por arriba */
    xPercent:-50, /* centrar horizontalmente respecto al translateX */
    yPercent:0,
    opacity:0,
    scale:.4,
    rotation:-45,
    transformOrigin:'50% 95%'
  });

  /* Aparece y se endereza */
  await new Promise(r=>gsap.to(crown,{
    opacity:1,
    scale:.85,
    rotation:-15,
    duration:.5,
    ease:'power2.out',
    onComplete:r
  }));

  /* Cae con aceleración (gravedad) hacia la posición FINAL sobre la cabeza */
  await new Promise(r=>gsap.to(crown,{
    y:finalY,
    x:headCenterX,
    scale:1,
    rotation:0,
    duration:1.05,
    ease:'power2.in',
    transformOrigin:'50% 95%',
    onComplete:r
  }));

  /* 4. Rebote elástico al aterrizar (squash & stretch con pivote en la base) */
  await new Promise(r=>gsap.to(crown,{
    scaleY:.82,
    scaleX:1.12,
    duration:.12,
    ease:'power2.out',
    transformOrigin:'50% 95%',
    onComplete:r
  }));
  await new Promise(r=>gsap.to(crown,{
    y:finalY-14,
    scaleY:1.06,
    scaleX:.95,
    duration:.22,
    ease:'power2.out',
    transformOrigin:'50% 95%',
    onComplete:r
  }));
  await new Promise(r=>gsap.to(crown,{
    y:finalY,
    scaleY:1,
    scaleX:1,
    duration:.5,
    ease:'bounce.out',
    transformOrigin:'50% 95%',
    onComplete:r
  }));

  /* Destello de chispas doradas radial al posarse */
  for(let i=0;i<28;i++){
    const p=document.createElement('div');
    const angle=(i/28)*Math.PI*2;
    p.style.cssText=`position:fixed;left:${headCenterX}px;top:${headTopY-30}px;width:${4+Math.random()*3}px;height:${4+Math.random()*3}px;background:var(--amber);border-radius:50%;box-shadow:0 0 12px var(--amber);pointer-events:none;z-index:447`;
    document.body.appendChild(p);
    gsap.to(p,{
      x:Math.cos(angle)*110,
      y:Math.sin(angle)*90,
      opacity:0,
      scale:0,
      duration:1,
      ease:'power2.out',
      onComplete:()=>p.remove()
    });
  }

  /* 5. La corona queda flotando suavemente sobre la cabeza (efecto "respiración") */
  gsap.to(crown,{
    y:finalY-6,
    duration:1.8,
    ease:'sine.inOut',
    yoyo:true,
    repeat:-1,
    overwrite:'auto'
  });
  gsap.to(rays,{
    rotation:360,
    duration:30,
    ease:'none',
    repeat:-1,
    transformOrigin:'50% 50%'
  });

  /* Reposicionar si el viewport cambia (resize, scroll, zoom).
     Recalcula y/x desde el centro de la cabeza del ganador. */
  const reposition=()=>{
    const r2=winnerAvatar.getBoundingClientRect();
    const newHeadCenterX=r2.left+r2.width/2;
    const newHeadTopY=r2.top;
    /* La corona puede haber cambiado de tamaño por resize (vmin); recalcular */
    crown.style.transform='';
    void crown.offsetHeight;
    const newH=crown.getBoundingClientRect().height;
    const newFinalY=newHeadTopY - newH * 0.95 + 6;
    gsap.to(crown,{
      x:newHeadCenterX,
      y:newFinalY,
      duration:.3,
      ease:'power2.out',
      overwrite:'auto',
      transformOrigin:'50% 95%'
    });
    rays.style.left=newHeadCenterX+'px';
    rays.style.top=(newHeadTopY-30)+'px';
    pedestal.style.left=newHeadCenterX+'px';
    pedestal.style.top=(newHeadTopY-10)+'px';
  };
  window.addEventListener('resize',reposition);
  window.addEventListener('scroll',reposition,true);

  /* Limpiar listeners al ir a otra pantalla */
  const cleanup=()=>{
    window.removeEventListener('resize',reposition);
    window.removeEventListener('scroll',reposition,true);
  };
  document.getElementById('btnToWinners')?.addEventListener('click',()=>{
    gsap.killTweensOf(crown);
    /* Reset al estado final estable: exactamente sobre la cabeza */
    const r3=winnerAvatar.getBoundingClientRect();
    const cx=r3.left+r3.width/2;
    const hy=r3.top;
    const hh=crown.getBoundingClientRect().height;
    gsap.set(crown,{
      x:cx,
      y:hy-hh*0.95+6,
      scale:1,
      rotation:0,
      transformOrigin:'50% 95%'
    });
    cleanup();
  },{once:true});

  setTimeout(()=>{
    toast(`¡${winner.name} coronado campeón!`,'var(--amber)');
  },300);
}

/* ─── Pantalla de ganadores finales ───────────────────────────────── */
function showWinners(){
  const rs=document.getElementById('race-screen');
  /* Limpiar la corona, rayos y pedestal si siguen */
  document.querySelectorAll('.falling-crown,.crown-rays,.crown-pedestal').forEach(c=>c.remove());
  sfx('fanfare'); /* SFX épico al entrar al podio */
  gsap.to(rs,{
    opacity:0,
    duration:.6,
    onComplete:()=>{
      rs.classList.remove('active');
      rs.style.opacity='1';
      document.getElementById('raceWinner').classList.remove('active');
      document.getElementById('btnToWinners').style.display='none';

      const sorted=[...TEAMS].sort((a,b)=>bingosWon[b.id]-bingosWon[a.id]);
      const ptsByRank=[5.0,4.5,4.0,3.0,2.0];
      sorted.forEach((t,i)=>{
        if(bingosWon[t.id]===0)scores[t.id]=1.0;
        else scores[t.id]=ptsByRank[i];
      });

      renderWinners(sorted);
    }
  });
}

function renderWinners(sorted){
  const inner=document.getElementById('winnersInner');
  const r1=sorted[0],r2=sorted[1],r3=sorted[2];

  const podiumOrder=[
    {team:r2,rank:'silver',medal:'II',place:'2°'},
    {team:r1,rank:'gold',medal:'I',place:'1°'},
    {team:r3,rank:'bronze',medal:'III',place:'3°'}
  ];

  inner.innerHTML=`
    <div class="crown-wrap">${CROWN_SVG}</div>
    <h1 class="winners-title">Partida <em>finalizada</em></h1>
    <p class="winners-sub">Campeones del Bingo del Orobioma</p>

    <div class="podium">
      ${podiumOrder.map(p=>`
        <div class="podium-spot ${p.rank}" style="--team:${p.team.color}">
          <div class="podium-medal">${medalSVG(p.medal)}</div>
          <div class="podium-avatar"><div class="avatar" style="--team:${p.team.color}">${p.team.letter}</div></div>
          <div class="podium-name">${p.team.name}</div>
          <div class="podium-score">${scores[p.team.id].toFixed(1)}</div>
          <div class="podium-meta">
            <b>${p.place} lugar</b><br>
            ${bingosWon[p.team.id]} Bingo${bingosWon[p.team.id]!==1?'s':''}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="final-grades">
      <div class="final-grades-title">Notas finales</div>
      ${sorted.map((t,i)=>{
        const place=i===0?'1°':i===1?'2°':i===2?'3°':i===3?'4°':'5°';
        return `
          <div class="grade-row${i===0?' gold-row':''}" style="--team:${t.color}">
            <div class="grade-rank">${place}</div>
            <div class="grade-team">
              <div class="bc-avatar-sm" style="background:${t.color}">${t.letter}</div>
              <div class="grade-team-name">${t.name}</div>
            </div>
            <div class="grade-score">${scores[t.id].toFixed(1)}</div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="bars">
      <div class="bars-title">Bingos ganados por equipo</div>
      ${sorted.map(t=>{
        const pct=(bingosWon[t.id]/BINGOS_TO_WIN)*100;
        return `
          <div class="bar-row" style="--team:${t.color}">
            <div class="bar-label">
              <div class="bc-avatar-sm" style="background:${t.color}">${t.letter}</div>
              ${t.name}
            </div>
            <div class="bar-track">
              <div class="bar-fill" data-target="${pct}" style="background:linear-gradient(90deg,${t.color},var(--sage))"></div>
            </div>
            <div class="bar-value">${bingosWon[t.id]}</div>
          </div>
        `;
      }).join('')}
    </div>

    <div style="margin-top:var(--space-7)">
      <button class="btn btn-primary" onclick="showCredits()" style="font-size:1rem;padding:18px 40px">Ver créditos ▸</button>
    </div>
  `;

  document.getElementById('winners').classList.add('active');
  document.getElementById('winners').scrollTop=0;
  launchConfetti(900);

  /* Master timeline cinemático */
  const tl=gsap.timeline({defaults:{ease:'power3.out'}});
  tl.fromTo('.crown-wrap',{scale:0,rotation:-30,y:30},{scale:1,rotation:0,y:0,duration:1.1,ease:'back.out(1.4)'})
    .fromTo('.winners-title',{opacity:0,y:20,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.7},'-=.5')
    .fromTo('.winners-sub',{opacity:0,y:15},{opacity:1,y:0,duration:.5},'-=.3')
    .fromTo('.podium-spot.gold',{opacity:0,y:120,scale:.7,rotation:-3},{opacity:1,y:0,scale:1,rotation:0,duration:1,ease:'back.out(1.3)'},'-=.2')
    .fromTo('.podium-spot.silver',{opacity:0,y:100,scale:.75,rotation:2},{opacity:1,y:0,scale:1,rotation:0,duration:.85,ease:'back.out(1.3)'},'-=.6')
    .fromTo('.podium-spot.bronze',{opacity:0,y:80,scale:.8,rotation:-2},{opacity:1,y:0,scale:1,rotation:0,duration:.85,ease:'back.out(1.3)'},'-=.55')
    .fromTo('.grade-row',{opacity:0,x:-30},{opacity:1,x:0,duration:.45,stagger:.1},'-=.4')
    .fromTo('.bar-row',{opacity:0,x:-30},{opacity:1,x:0,duration:.45,stagger:.09},'-=.3')
    .fromTo('.winners-inner .btn',{opacity:0,y:20,scale:.9},{opacity:1,y:0,scale:1,duration:.5,ease:'back.out(1.4)'},'-=.2');

  /* Pulso continuo del oro y rotación lenta de la corona */
  setTimeout(()=>{
    gsap.to('.podium-spot.gold',{
      boxShadow:'0 0 60px var(--amber-glow),0 -8px 32px rgba(212,164,76,.25)',
      duration:1.5,
      ease:'sine.inOut',
      yoyo:true,
      repeat:-1
    });
    gsap.to('.crown-wrap svg',{
      rotation:6,
      duration:2,
      ease:'sine.inOut',
      yoyo:true,
      repeat:-1,
      transformOrigin:'50% 80%'
    });
  },2200);

  setTimeout(()=>{
    document.querySelectorAll('.bar-fill').forEach(b=>{
      b.style.width=b.dataset.target+'%';
    });
  },2400);
}

/* ─── Pantalla de créditos ────────────────────────────────────────── */
function showCredits(){
  const wn=document.getElementById('winners');
  const cr=document.getElementById('credits');
  const namesEl=document.getElementById('creditsNames');

  namesEl.innerHTML=CREATORS.map(c=>`
    <div class="credit-name" style="--name-color:${c.color}">${c.name}</div>
  `).join('');

  gsap.to(wn,{
    opacity:0,
    duration:.7,
    onComplete:()=>{
      wn.classList.remove('active');
      wn.style.opacity='1';
      cr.classList.add('active');
      cr.scrollTop=0;

      gsap.fromTo('.credits-eyebrow',{opacity:0,y:20},{opacity:1,y:0,duration:.7});
      gsap.fromTo('.credits-title',{opacity:0,scale:.85,y:30},{opacity:1,scale:1,y:0,duration:1,ease:'back.out(1.3)',delay:.3});

      document.querySelectorAll('.credit-name').forEach((el,i)=>{
        gsap.fromTo(el,
          {opacity:0,y:30,rotation:-5,scale:.7},
          {opacity:1,y:0,rotation:0,scale:1,duration:.7,ease:'back.out(1.5)',delay:1+i*.22}
        );
      });

      gsap.fromTo('.credits-thanks',{opacity:0,y:20},{opacity:1,y:0,duration:.7,delay:2.3});
      gsap.fromTo('.credits-footer',{opacity:0},{opacity:1,duration:.7,delay:2.8});
      launchConfetti(400);
    }
  });
}

/* ─── Confetti ────────────────────────────────────────────────────── */
function launchConfetti(count){
  const canvas=document.getElementById('confetti-canvas');
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const colors=['#d4a44c','#e8c275','#8cbe82','#a8d49a','#5cb874','#e85d75','#4d9be6','#e8b94d','#d97a3e','#eae4d3'];
  const particles=[];
  for(let i=0;i<count;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:-Math.random()*canvas.height,
      vx:(Math.random()-.5)*8,
      vy:Math.random()*4+2,
      size:Math.random()*8+4,
      color:colors[Math.floor(Math.random()*colors.length)],
      rot:Math.random()*360,
      vrot:(Math.random()-.5)*12,
      life:1,
      shape:Math.random()>.5?'rect':'circle'
    });
  }
  let frame=0;
  const maxF=600;
  function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    frame++;
    particles.forEach(p=>{
      p.x+=p.vx;
      p.y+=p.vy;
      p.vy+=.18;
      p.vx*=.99;
      p.rot+=p.vrot;
      if(frame>maxF-80)p.life-=.02;
      if(p.life<=0)return;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.globalAlpha=Math.max(0,p.life);
      ctx.fillStyle=p.color;
      if(p.shape==='rect'){
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.6);
      }else{
        ctx.beginPath();
        ctx.arc(0,0,p.size/2,0,Math.PI*2);
        ctx.fill();
      }
      ctx.restore();
    });
    if(frame<maxF)requestAnimationFrame(tick);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  tick();
}

function burstConfetti(x,y,color,count){
  const colors=[color,'#d4a44c','#e8c275','#8cbe82','#eae4d3'];
  for(let i=0;i<count;i++){
    const c=document.createElement('div');
    c.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:${Math.random()*6+4}px;height:${Math.random()*6+4}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};pointer-events:none;z-index:9999;box-shadow:0 0 6px ${colors[Math.floor(Math.random()*colors.length)]}`;
    document.body.appendChild(c);
    gsap.to(c,{
      x:(Math.random()-.5)*260,
      y:(Math.random()-.5)*260-70,
      rotation:Math.random()*720,
      opacity:0,
      duration:1.1+Math.random(),
      ease:'power2.out',
      onComplete:()=>c.remove()
    });
  }
}

function miniBurst(el,color){
  const rect=el.getBoundingClientRect();
  const x=rect.left+rect.width/2;
  const y=rect.top+rect.height/2;
  for(let i=0;i<8;i++){
    const p=document.createElement('div');
    p.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:5px;height:5px;background:${color};border-radius:50%;box-shadow:0 0 8px ${color};pointer-events:none;z-index:9999`;
    document.body.appendChild(p);
    const angle=Math.random()*Math.PI*2;
    const dist=40+Math.random()*50;
    gsap.to(p,{
      x:Math.cos(angle)*dist,
      y:Math.sin(angle)*dist,
      opacity:0,
      scale:0,
      duration:.6,
      ease:'power2.out',
      onComplete:()=>p.remove()
    });
  }
}

/* ─── Sistema de audio (Web Audio API — sin archivos externos) ─────
   - SFX: osciladores sintetizados (click, ding, whoosh, pop, error, fanfare)
   - Música ambiental: pads con LFO + arpegio lento en loop de 16 compases
   - Respeta prefers-reduced-motion/sound
   - Control de volumen + botón mute/unmute
   ──────────────────────────────────────────────────────────────────── */
let audioCtx=null;
let audioOn=true; /* Bloque 7: audio siempre activo. Se conserva la variable por compatibilidad con código legacy. */
let masterGain=null;
let musicGain=null;
let musicNodes=null; // referencias para poder parar la música
const prefersReducedSound=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ||window.matchMedia('(prefers-reduced-sound: reduce)').matches;

function ensureAudioCtx(){
  if(audioCtx)return audioCtx;
  try{
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  }catch(e){
    console.warn('Web Audio API no disponible',e);
    return null;
  }
  masterGain=audioCtx.createGain();
  masterGain.gain.value=0.6;
  masterGain.connect(audioCtx.destination);
  musicGain=audioCtx.createGain();
  musicGain.gain.value=0; // empieza en silencio
  musicGain.connect(masterGain);
  return audioCtx;
}

function toggleAudio(){
  /* En el Bloque 6 ya no hay botón de toggle — el audio está siempre activo.
     Esta función se conserva por compatibilidad con código legacy
     (initSFXPanel la usa para activar audio en preview).
     Sólo activa el contexto si está suspendido. */
  const ctx=ensureAudioCtx();
  if(!ctx)return;
  if(ctx.state==='suspended')ctx.resume();
  audioOn=true; /* ya siempre true — redundante pero inofensivo */
}

/* ─── SFX desde Banco + sintetizado (fallback) ──────────────────────
   Audio siempre activo en el Bloque 6 (sin botón de mute).
   `sfx(id)` reproduce archivo real si cargó, o sintetiza si la red falló.
   `sfxTeam(teamId)` reproduce un SFX único por equipo al marcar celda. */
function sfx(name){
  if(!audioCtx)return;
  /* Si el archivo real cargó, reproducirlo */
  const el=sfxElements[name];
  if(el){
    try{
      el.currentTime=0;
      const p=el.play();
      if(p&&p.catch)p.catch(()=>{});
      return;
    }catch(e){}
  }
  /* Fallback sintetizado */
  sfxSynth(name);
}

/* SFX únicos por equipo (5 sonidos distintos al marcar celda) */
const TEAM_SFX={
  /* Mineros (rojo coral) — campana metálica, golpe de pico */
  mineros:'crowd',
  /* Conservacionistas (verde fresco) — viento de páramo, hojas */
  conservacionistas:'nature',
  /* Urbanizadores (azul cielo) — pop tecnológico, click sintético */
  urbanizadores:'pop',
  /* Científicos (mostaza) — chime de descubrimiento */
  cientificos:'chime',
  /* Campesinos (terracota) — sparkle cálido, terrenal */
  campesinos:'magic'
};
function sfxTeam(teamId){
  const sfxId=TEAM_SFX[teamId];
  if(sfxId)sfx(sfxId);
}

/* (sfxSynth consolidado más abajo — versión Bloque 8 con volúmenes subidos) */

/* ─── Música ambiental: legacy (ya no se usa — la música ahora es MP3 del usuario) ── */
// const MUSIC_SCALE=[220,261.63,329.63,440,523.25];
// const MUSIC_CHORD=[146.83,174.61,220,277.18];

/* ─── Música de fondo: auto-play del MP3 del usuario ─────────────────
   En el Bloque 6, la música se carga desde ./audio/ (las canciones generadas
   por el usuario con Suno). Suena automáticamente desde el inicio, sin
   botón para desactivarla.
   - Si el navegador bloquea autoplay, intenta reanudar en la primera
     interacción del usuario (click, touch, keydown).
   - Volumen bajo (regla de oro: música siempre más baja que SFX).

   BLOQUE 10 — Fix GitHub Pages:
   - Rutas codificadas con encodeURIComponent (tildes y espacios seguros
     en cualquier proxy/CDN; sin esto, GitHub Pages puede devolver 404
     en navegadores antiguos).
   - Error handler robusto (sin {once:true}) + fallback sintetizado.
   - Overlay "Toca para entrar" desbloquea autoplay en Safari/iOS.
   ─────────────────────────────────────────────────────────────────── */

const BG_MUSIC_FILES=[
  'audio/'+encodeURIComponent('Páramo al amanecer')+'.mp3',
  'audio/'+encodeURIComponent('Herbario sonoro')+'.mp3',
  'audio/'+encodeURIComponent('Cordillera viva')+'.mp3'
];
let bgAudioElement=null;
let bgMusicStarted=false;
let bgMusicChoice=0; /* índice en BG_MUSIC_FILES */

function tryStartBgMusic(){
  if(bgMusicStarted)return;
  if(!bgAudioElement){
    /* Probar primero la canción principal; si falla, las otras */
    bgAudioElement=new Audio(BG_MUSIC_FILES[bgMusicChoice]);
    bgAudioElement.loop=true;
    bgAudioElement.volume=0; /* BLOQUE 10: arrancar SILENCIOSO para superar
                                la autoplay-policy de Chrome/Safari/Firefox.
                                Luego fade-in gradual a 0.35. */
    bgAudioElement.preload='auto';
    /* BLOQUE 10: handler sin {once:true} — debe cubrir TODOS los intentos,
       no solo el primero (el bug original silenciaba los siguientes). */
    bgAudioElement.addEventListener('error',onBgAudioError);
  }
  const playPromise=bgAudioElement.play();
  if(playPromise&&playPromise.then){
    playPromise.then(()=>{
      bgMusicStarted=true;
      /* Si el play() pasó (incluso silencioso), hacer fade-in a 0.35
         en 1.5s. Esto crea la sensación de "autoplay automático". */
      fadeInBgMusic(0.35,1500);
    }).catch(err=>{
      /* Autoplay bloqueado — quedará en espera hasta la 1ª interacción */
      console.warn('Autoplay bloqueado, esperando interacción del usuario');
      bgMusicStarted=false;
    });
  }else{
    bgMusicStarted=true;
    fadeInBgMusic(0.35,1500);
  }
}

/* BLOQUE 10 — Fade-in gradual del volumen de la música.
   Se usa tras el autoplay silencioso para que la música aparezca suave. */
function fadeInBgMusic(targetVol,durationMs){
  if(!bgAudioElement)return;
  const startVol=bgAudioElement.volume;
  const startTime=performance.now();
  function step(){
    if(!bgAudioElement)return;
    const elapsed=performance.now()-startTime;
    const t=Math.min(1,elapsed/durationMs);
    /* Easing ease-out-cubic para que la subida se sienta orgánica */
    const eased=1-Math.pow(1-t,3);
    bgAudioElement.volume=startVol+(targetVol-startVol)*eased;
    if(t<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function onBgAudioError(){
  /* BLOQUE 10: handler robusto — no usa {once:true} para que cubra
     los 3 intentos. Si los 3 fallan, activa el fallback sintetizado. */
  console.warn(`No se pudo cargar ${BG_MUSIC_FILES[bgMusicChoice]}, probando siguiente...`);
  bgMusicChoice++;
  if(bgMusicChoice<BG_MUSIC_FILES.length){
    bgAudioElement=null;
    tryStartBgMusic();
  } else {
    console.warn('Todos los MP3 fallaron — activando fallback sintetizado (Web Audio API).');
    bgAudioElement=null;
    startFallbackBgMusic();
  }
}

/* BLOQUE 10 — Fallback sintetizado: si los 3 MP3 fallan (ruta rota,
   proxy de GitHub, MIME mal servido), generamos un pad ambiental suave
   con Web Audio API. Misma "estética" de fondo, sin competir con SFX. */
let fallbackBgNodes=null;
function startFallbackBgMusic(){
  if(fallbackBgNodes)return; /* ya activo */
  const ctx=ensureAudioCtx();
  if(!ctx)return;
  const now=ctx.currentTime;
  /* Acorde drone en sol menor — 3 osciladores detuned */
  const freqs=[196.00, 233.08, 293.66]; /* G3, Bb3, D4 */
  const oscs=[];
  const gains=[];
  const masterPadGain=ctx.createGain();
  masterPadGain.gain.value=0.0; /* fade-in */
  masterPadGain.connect(masterGain);
  /* LFO para movimiento orgánico */
  const lfo=ctx.createOscillator();
  const lfoGain=ctx.createGain();
  lfo.frequency.value=0.07; /* muy lento, casi imperceptible */
  lfoGain.gain.value=0.015;
  lfo.connect(lfoGain);
  lfoGain.connect(masterPadGain.gain);
  lfo.start(now);
  freqs.forEach((f,i)=>{
    const o=ctx.createOscillator();
    o.type=i===0?'sine':'triangle';
    o.frequency.value=f;
    /* Detune sutil para dar amplitud estéreo virtual */
    o.detune.value=(i-1)*6;
    const g=ctx.createGain();
    g.gain.value=0.18;
    o.connect(g);
    g.connect(masterPadGain);
    o.start(now);
    oscs.push(o); gains.push(g);
  });
  /* Fade-in a 0.05 (regla: música < SFX) */
  masterPadGain.gain.linearRampToValueAtTime(0.05, now+3);
  fallbackBgNodes={oscs,gains,lfo,lfoGain,masterPadGain};
  bgMusicStarted=true;
  console.info('Fallback bg music activo (pad sintetizado)');
}

/* Cuando el usuario hace su primera interacción, intentar reanudar la música.
   BLOQUE 10: además descuenta el overlay "Toca para entrar" si existe. */
function unlockAudioOnFirstGesture(){
  const onceHandler=()=>{
    /* Si el audio quedó silenciado por autoplay-policy, subir volumen
       en la 1ª interacción del usuario. Esto cubre el caso iOS Safari
       donde play() pasa silencioso y el navegador permite "despertar"
       el audio tras un gesto. */
    if(bgAudioElement && bgAudioElement.volume<0.35){
      fadeInBgMusic(0.35,800);
    }
    tryStartBgMusic();
    ensureAudioCtx();
    if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();
    dismissAudioOverlay();
    document.removeEventListener('click',onceHandler);
    document.removeEventListener('keydown',onceHandler);
    document.removeEventListener('touchstart',onceHandler);
  };
  document.addEventListener('click',onceHandler,{once:true});
  document.addEventListener('keydown',onceHandler,{once:true});
  document.addEventListener('touchstart',onceHandler,{once:true});
}

/* BLOQUE 10 — Overlay "Toca para entrar".
   Necesario para desbloquear autoplay en Safari/iOS/Chrome móvil.
   Es la primera interacción que el usuario hace en la página; sin esto,
   el navegador bloquea TODO play() hasta que haya un click. */
function showAudioOverlay(){
  if(document.getElementById('audio-unlock-overlay'))return; /* ya existe */
  const overlay=document.createElement('div');
  overlay.id='audio-unlock-overlay';
  overlay.className='audio-unlock-overlay';
  overlay.setAttribute('role','button');
  overlay.setAttribute('aria-label','Toca para comenzar');
  overlay.innerHTML=`
    <div class="audio-unlock-card">
      <svg class="audio-unlock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H2v6h4l5 4z"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      </svg>
      <div class="audio-unlock-title">Bingo del Orobioma</div>
      <div class="audio-unlock-sub">Toca para comenzar</div>
      <div class="audio-unlock-hint">Click · Tecla · Toque</div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function dismissAudioOverlay(){
  const ov=document.getElementById('audio-unlock-overlay');
  if(!ov)return;
  if(ov.dataset.dismissed==='1')return;
  ov.dataset.dismissed='1';
  /* Fade-out con GSAP si está disponible; si no, CSS transition */
  if(typeof gsap!=='undefined'){
    gsap.to(ov,{opacity:0,duration:0.7,ease:'power2.out',onComplete:()=>ov.remove()});
  } else {
    ov.classList.add('dismissed');
    setTimeout(()=>ov.remove(),700);
  }
}

/* ─── EVENT DELEGATION GLOBAL — Sonidos en TODO lo interactivo ──────
   Cualquier click en un elemento interactivo del HTML dispara un SFX
   según su categoría. La página debe sentirse VIVA sin que el usuario
   tenga que pulsar un botón de audio primero.
   ─────────────────────────────────────────────────────────────────── */

/* Mapa de selectores → SFX. El ORDEN importa: el más específico primero.
   Cuando un elemento coincide con varios selectores, gana el primero.
   En el Bloque 8, los volúmenes de los archivos reales se aplican por SFX
   individual (más fuerte para eventos importantes). */
const SFX_MAP=[
  /* Botones principales — feedback fuerte */
  {sel:'.btn-primary, .btn-finish, button[onclick*="showCredits"], button[onclick*="fullRestart"], button[onclick*="beginExperience"]',sfx:'fanfare',desc:'Acción principal'}, /* Nuevo juego, comenzar, créditos */
  {sel:'.btn-ghost, .btn-reset',sfx:'whoosh',desc:'Acción secundaria'}, /* Anterior, reset */
  {sel:'.btn',sfx:'click',desc:'Botón genérico'},
  {sel:'.btn-add',sfx:'ding',desc:'Añadir'},
  {sel:'.btn-remove',sfx:'error',desc:'Quitar'},
  {sel:'.intro-skip',sfx:'whoosh',desc:'Saltar intro'},

  /* Celdas de bingo — SFX único por equipo */
  {sel:'.bc-cell',sfx:'teamCell',desc:'Celda de bingo (SFX por equipo)'},

  /* Avatares, emblemas, podiums */
  {sel:'.podium-spot',sfx:'chime',desc:'Podio'},
  {sel:'.podium-medal',sfx:'magic',desc:'Medalla'},
  {sel:'.team-avatar, .avatar',sfx:'pop',desc:'Avatar'},
  {sel:'.emblem',sfx:'pop',desc:'Emblema'},

  /* Cards, slides, tips, reglas */
  {sel:'.card',sfx:'whoosh',desc:'Tarjeta'},
  {sel:'.tip-card',sfx:'chime',desc:'Tip'},
  {sel:'.rule-card',sfx:'pop',desc:'Regla'},
  {sel:'.line-demo',sfx:'pop',desc:'Demostración de línea'},
  {sel:'.step',sfx:'pop',desc:'Paso'},
  {sel:'.score-row:not(.head)',sfx:'pop',desc:'Fila de puntuación'},
  {sel:'.grade-row',sfx:'pop',desc:'Nota final'},
  {sel:'.bar-row',sfx:'pop',desc:'Barra'},
  {sel:'.control-row',sfx:'click',desc:'Fila de control'},
  {sel:'.race-mini-row',sfx:'click',desc:'Carrera mini'},

  /* Navegación */
  {sel:'.dot',sfx:'pop',desc:'Indicador de slide'},
  {sel:'.bc-avatar-sm',sfx:'pop',desc:'Avatar pequeño'},

  /* Panel del Banco de Sonidos — control propio */
  {sel:'.sfx-card',sfx:null,desc:'SFX card (controlado por su propio handler)'},
  {sel:'.sfx-toggle',sfx:'click',desc:'Toggle banco de sonidos'},
  {sel:'.sfx-close',sfx:'click',desc:'Cerrar banco de sonidos'},

  /* SFX-card-icons y otros elementos pequeños */
  {sel:'.sfx-card-icon, .audio-btn, .card-icon-wrap, .tip-icon-wrap, .rule-icon, .podium-medal svg',sfx:null,desc:'Decorativo (sin SFX)'},

  /* Cualquier otro botón, enlace, o [role=button] */
  {sel:'button, a[href], [role="button"], [onclick]',sfx:'click',desc:'Genérico'}
];

/* Encuentra el SFX correspondiente a un elemento */
function getSfxForElement(el){
  if(!el||!el.closest)return null;
  for(const{match}of cachedMatches){
    if(match(el))return match;
  }
  return null;
}

/* Pre-compila los matches para rendimiento */
const cachedMatches=SFX_MAP.map(entry=>({
  ...entry,
  match:el=>el.closest(entry.sel)
}));

function initGlobalSfx(){
  if(prefersReducedSound)return;
  /* Un único listener delegado en document — captura cualquier click */
  document.addEventListener('click',e=>{
    /* No interferir con el panel del Banco de Sonidos (ya tiene su handler) */
    if(e.target.closest('.sfx-panel')||e.target.closest('.sfx-card'))return;

    const entry=getSfxForElement(e.target);
    if(!entry)return;

    /* SFX especial: celda de bingo usa SFX del equipo */
    if(entry.sfx==='teamCell'){
      const cell=e.target.closest('.bc-cell');
      if(cell){
        const teamId=cell.getAttribute('data-team');
        if(teamId){
          sfxTeam(teamId);
          return;
        }
      }
    }

    /* SFX normal */
    if(entry.sfx){
      sfx(entry.sfx);
    }
  },{passive:true});

  /* Hover sutil en elementos interactivos grandes (cards, dots, podiums) */
  document.addEventListener('mouseover',e=>{
    const entry=getSfxForElement(e.target);
    if(!entry||!entry.sfx)return;
    /* No hover-SFX en elementos pequeños — solo en cards y podiums */
    if(e.target.closest('.card,.podium-spot,.tip-card,.rule-card,.step,.line-demo')){
      /* No reproducimos SFX en hover (sería molesto),
         solo dejamos el cursor del CSS hacer su trabajo */
    }
  },{passive:true});
}

/* Inicializar audio (Bloque 6: auto-play sin botón, Bloque 10: con overlay)
   El overlay se muestra ANTES del preloader para garantizar que el primer
   click del usuario sea sobre él → desbloquea autoplay en TODOS los
   navegadores (Safari/iOS en particular). Si el usuario cancela o el
   navegador ya tenía autoplay permitido, el overlay se descarta en
   la primera interacción y la música arranca con normalidad. */
function initAudioButton(){
  /* Cargar y arrancar música de fondo automáticamente */
  if(prefersReducedSound){
    /* Si el sistema prefiere sin sonido, no reproducir música */
    console.info('Audio desactivado por preferencia del sistema');
    return;
  }
  /* Intentar reproducir ya (puede funcionar en local) */
  tryStartBgMusic();
  /* Mostrar overlay "Toca para entrar" — visible al cargar la página.
     Cualquier click/tecla/toque en CUALQUIER parte del documento
     desbloquea el audio. La función unlockAudioOnFirstGesture()
     ya cubre esos eventos, así que solo necesitamos que el overlay
     exista y sea el primer elemento visible. */
  showAudioOverlay();
  /* Asegurar también el listener de primer gesto */
  unlockAudioOnFirstGesture();
}

/* ─── Banco de Sonidos (SFX) ────────────────────────────────────────
   10 efectos reales desde bancos libres (Mixkit + Freesound CDN).
   Cada SFX se mapea a un evento del juego (bingo, click, victoria, etc.).
   Si la red falla, cae automáticamente al SFX sintetizado (fallback).
   La MÚSICA de fondo NO está incluida — la provee el usuario (Suno/Udio).
   ─────────────────────────────────────────────────────────────────── */

/* Catálogo de SFX con URLs de bancos libres.
   Formato: {id, name, desc, tag, url, fallback} */
const SFX_CATALOG=[
  {id:'click',   name:'Click suave',     desc:'Botón / celda',         tag:'UI',
    url:'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    fallback:'click'},
  {id:'pop',     name:'Pop bubble',      desc:'Confirmación',           tag:'UI',
    url:'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    fallback:'pop'},
  {id:'ding',    name:'Ding campana',    desc:'Bingo normal',           tag:'BINGO',
    url:'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
    fallback:'ding'},
  {id:'chime',   name:'Chime mágico',    desc:'Línea ganadora',         tag:'LÍNEA',
    url:'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
    fallback:'sparkle'},
  {id:'fanfare', name:'Fanfarria épica', desc:'Tricampeón / carrera',   tag:'ÉPICO',
    url:'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
    fallback:'fanfare'},
  {id:'whoosh',  name:'Whoosh aire',     desc:'Transición de pantalla', tag:'MOVE',
    url:'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    fallback:'whoosh'},
  {id:'error',   name:'Error grave',     desc:'Quitar punto',           tag:'ERROR',
    url:'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
    fallback:'error'},
  {id:'crowd',   name:'Aplausos',        desc:'Celebración podio',      tag:'ÉPICO',
    url:'https://assets.mixkit.co/active_storage/sfx/2016/2016-preview.mp3',
    fallback:'fanfare'},
  {id:'nature',  name:'Viento páramo',   desc:'Ambiente andino',        tag:'AMBIENTE',
    url:'https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3',
    fallback:'whoosh'},
  {id:'magic',   name:'Sparkle mágico',  desc:'Victoria final',         tag:'ÉPICO',
    url:'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
    fallback:'sparkle'}
];

/* Volúmenes individuales por SFX (Bloque 8).
   Eventos importantes más fuertes que los sutiles.
   Escala 0.0 (silencio) a 1.0 (máximo). */
const SFX_VOLUME={
  click:0.75,    /* click genérico — medio */
  pop:0.95,      /* pop en countdown — fuerte */
  ding:1.0,      /* bingo normal — MÁXIMO (el más importante) */
  chime:0.92,    /* chime de línea — fuerte */
  fanfare:1.0,   /* fanfarria de victoria — MÁXIMO */
  whoosh:0.85,   /* whoosh de transición — fuerte */
  error:0.85,    /* error grave — fuerte */
  crowd:0.95,    /* aplausos de celebración — fuerte */
  nature:0.75,   /* viento páramo — medio */
  magic:1.0      /* sparkle mágico — MÁXIMO */
};

/* Estado: cada SFX precargado como elemento <audio>.
   Si la carga falla, se usa el fallback sintetizado (Web Audio API). */
const sfxElements={}; // id → HTMLAudioElement o null
let sfxLoaded=false;

function preloadSFXBank(){
  if(sfxLoaded)return;
  SFX_CATALOG.forEach(s=>{
    const a=new Audio();
    a.preload='auto';
    /* Volumen individual por SFX — eventos importantes más fuertes */
    a.volume=SFX_VOLUME[s.id]!==undefined?SFX_VOLUME[s.id]:0.85;
    a.src=s.url;
    a.addEventListener('canplaythrough',()=>{
      sfxElements[s.id]=a;
    },{once:true});
    a.addEventListener('error',()=>{
      console.warn(`SFX "${s.id}" no se pudo cargar, usando fallback sintetizado.`);
      sfxElements[s.id]=null;
    },{once:true});
  });
  sfxLoaded=true;
}

/* Reproduce un SFX por id. Si el archivo real cargó, lo usa.
   Si no, usa el oscilador sintetizado (fallback). */
function sfx(id){
  /* Si el archivo real cargó, reproducirlo */
  const el=sfxElements[id];
  if(el){
    try{
      el.currentTime=0;
      const p=el.play();
      if(p&&p.catch)p.catch(()=>{});
      return;
    }catch(e){
      /* si falla play(), cae al fallback */
    }
  }
  /* Fallback: SFX sintetizado del Web Audio API */
  const preset=SFX_CATALOG.find(s=>s.id===id);
  sfxSynth(preset?preset.fallback:id);
}

/* SFX sintetizado (versión original del Bloque 4, conservada como fallback) */
function sfxSynth(name){
  if(!audioCtx)return;
  const t=audioCtx.currentTime;
  const presets={
    /* Volúmenes SUBIDOS al Bloque 8 — antes eran apenas audibles */
    click:{type:'square',freq:1200,dur:.06,vol:.18,slide:0,attack:.005,release:.04},
    pop:{type:'triangle',freq:520,dur:.12,vol:.32,slide:880,attack:.005,release:.08},
    ding:{type:'sine',freq:880,dur:.45,vol:.42,slide:660,attack:.01,release:.4},
    whoosh:{type:'sawtooth',freq:200,dur:.35,vol:.22,slide:1400,attack:.02,release:.25},
    error:{type:'square',freq:180,dur:.3,vol:.28,slide:90,attack:.01,release:.25,vibrato:6},
    fanfare:{type:'triangle',notes:[
      {f:523,d:.15,slide:659},{f:659,d:.15,slide:784},
      {f:784,d:.15,slide:988},{f:1047,d:.4,slide:1319}
    ],vol:.38,attack:.01,release:.1},
    sparkle:{type:'sine',freq:1568,dur:.25,vol:.32,slide:2093,attack:.005,release:.2}
  };
  const p=presets[name];
  if(!p)return;
  if(p.notes){
    let t0=t;
    p.notes.forEach(n=>{
      const osc=audioCtx.createOscillator();
      const g=audioCtx.createGain();
      osc.type=p.type;
      osc.frequency.setValueAtTime(n.f,t0);
      if(n.slide)osc.frequency.exponentialRampToValueAtTime(n.slide,t0+n.d);
      g.gain.setValueAtTime(0,t0);
      g.gain.linearRampToValueAtTime(p.vol,t0+p.attack);
      g.gain.exponentialRampToValueAtTime(.001,t0+n.d+p.release);
      osc.connect(g).connect(masterGain);
      osc.start(t0);osc.stop(t0+n.d+p.release);
      t0+=n.d*.9;
    });
  }else{
    const osc=audioCtx.createOscillator();
    const g=audioCtx.createGain();
    osc.type=p.type;
    osc.frequency.setValueAtTime(p.freq,t);
    if(p.slide)osc.frequency.exponentialRampToValueAtTime(p.slide,t+p.dur);
    if(p.vibrato){
      const lfo=audioCtx.createOscillator();
      const lfoGain=audioCtx.createGain();
      lfo.frequency.value=p.vibrato;
      lfoGain.gain.value=p.vibrato*8;
      lfo.connect(lfoGain).connect(osc.frequency);
      lfo.start(t);lfo.stop(t+p.dur);
    }
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(p.vol,t+p.attack);
    g.gain.exponentialRampToValueAtTime(.001,t+p.dur+p.release);
    osc.connect(g).connect(masterGain);
    osc.start(t);osc.stop(t+p.dur+p.release);
  }
}

/* ─── Panel UI del Banco de Sonidos ──────────────────────────────── */
function initSFXPanel(){
  const toggle=document.getElementById('sfxToggle');
  const panel=document.getElementById('sfxPanel');
  const close=document.getElementById('sfxClose');
  const grid=document.getElementById('sfxGrid');
  if(!toggle||!panel||!grid)return;

  if(prefersReducedSound){
    toggle.style.opacity='.4';
    toggle.style.cursor='not-allowed';
    toggle.setAttribute('aria-label','Banco de sonidos desactivado por preferencia del sistema');
    toggle.addEventListener('click',()=>{
      toast('Banco de sonidos desactivado por preferencia del sistema','var(--ink-faint)');
    });
    return;
  }

  /* Iconos SVG por categoría */
  const icons={
    UI:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6m11-11h-6M7 12H1"/></svg>',
    BINGO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>',
    LÍNEA:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    ÉPICO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2"/></svg>',
    MOVE:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>',
    ERROR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    AMBIENTE:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2-4 6-4 8 0s6 4 8 0 4-4 4 0"/></svg>'
  };

  /* Renderizar catálogo */
  grid.innerHTML=SFX_CATALOG.map(s=>`
    <button class="sfx-card" data-sfx="${s.id}" type="button" aria-label="Reproducir ${s.name}">
      <div class="sfx-card-icon">${icons[s.tag]||icons.UI}</div>
      <div class="sfx-card-info">
        <div class="sfx-card-name">${s.name}</div>
        <div class="sfx-card-desc">${s.desc}</div>
      </div>
      <span class="sfx-card-tag">${s.tag}</span>
    </button>
  `).join('');

  /* Click en un SFX card: previsualizar */
  grid.querySelectorAll('.sfx-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const id=card.dataset.sfx;
      /* Si audio está apagado, activarlo solo para preview */
      if(!audioOn){
        toggleAudio();
      }
      /* Marcar como playing */
      grid.querySelectorAll('.sfx-card').forEach(c=>c.classList.remove('playing'));
      card.classList.add('playing');
      sfx(id);
      setTimeout(()=>card.classList.remove('playing'),1500);
    });
  });

  /* Toggle panel */
  toggle.addEventListener('click',()=>{
    const open=panel.getAttribute('aria-hidden')==='false';
    panel.setAttribute('aria-hidden',open?'true':'false');
    toggle.setAttribute('aria-expanded',open?'false':'true');
  });
  close.addEventListener('click',()=>{
    panel.setAttribute('aria-hidden','true');
    toggle.setAttribute('aria-expanded','false');
  });

  /* Cerrar con click fuera o Escape */
  document.addEventListener('click',e=>{
    if(panel.getAttribute('aria-hidden')==='true')return;
    if(panel.contains(e.target)||toggle.contains(e.target))return;
    panel.setAttribute('aria-hidden','true');
    toggle.setAttribute('aria-expanded','false');
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&panel.getAttribute('aria-hidden')==='false'){
      panel.setAttribute('aria-hidden','true');
      toggle.setAttribute('aria-expanded','false');
    }
  });

  /* Pre-cargar los archivos reales */
  preloadSFXBank();
}

/* ─── Toasts ──────────────────────────────────────────────────────── */
function toast(msg,color){
  color=color||'var(--sage)';
  const wrap=document.getElementById('toasts');
  const t=document.createElement('div');
  t.className='toast';
  t.style.borderColor=color;
  t.innerHTML=`<span class="toast-dot" style="background:${color};box-shadow:0 0 8px ${color}"></span>${msg}`;
  wrap.appendChild(t);
  setTimeout(()=>{
    t.classList.add('out');
    setTimeout(()=>t.remove(),300);
  },2800);
}

/* ─── Reset general ───────────────────────────────────────────────── */
function confirmReset(){
  sfx('click');
  if(confirm('¿Reiniciar la experiencia?'))fullRestart();
}

function fullRestart(){
  demoRunning=false;
  document.querySelectorAll('.falling-crown,.crown-rays,.crown-pedestal').forEach(c=>c.remove());
  document.getElementById('winners').classList.remove('active');
  document.getElementById('credits').classList.remove('active');
  document.getElementById('game-main').classList.remove('active');
  document.getElementById('race-screen').classList.remove('active');
  document.getElementById('race-mini-screen').classList.remove('active');
  document.getElementById('fichaPill').classList.remove('active');

  currentSlide=1;
  document.querySelectorAll('.slide').forEach(s=>s.classList.remove('active'));
  document.getElementById('slide1').classList.add('active');
  document.querySelectorAll('.dot').forEach((d,i)=>{
    d.classList.remove('active','done');
    if(i===0)d.classList.add('active');
  });
  document.getElementById('prevBtn').disabled=true;
  document.getElementById('nextBtn').textContent='Siguiente ▸';

  showScreen('tutorial');

  const canvas=document.getElementById('confetti-canvas');
  canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);

  window.scrollTo({top:0,behavior:'instant'});
}

/* ─── Teclado ─────────────────────────────────────────────────────── */
document.addEventListener('keydown',e=>{
  if(currentScreen==='tutorial'){
    if(e.key==='ArrowRight')tutNext();
    else if(e.key==='ArrowLeft')tutPrev();
  }
});

/* Resize del canvas de confetti */
window.addEventListener('resize',()=>{
  const canvas=document.getElementById('confetti-canvas');
  if(canvas){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
  }
});