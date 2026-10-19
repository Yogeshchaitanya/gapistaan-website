// The stunt lane above the Raja Ka Baja film strip: Raja and the Mantri (cut-out stickers made from the costume photos)
// cross the page in a loop of seven short scenes. Pure CSS animation, no script; the markup is built here, the motion lives in styles.css.
// Every scene is one .act (it travels across the lane) holding one .rig (the figures and the vehicle, laid out in px, scaled for phones).
// An act with class "r" travels right to left and its rig is mirrored.
const CREAM = '#f6ecd2';
const DARK = '#0b1313';
const BRASS = '#cda45a';
const BRASS_HI = '#f0d28e';

const SIZE = { raja: [44, 100], mantri: [31, 93] };
const BUST = { raja: 52, mantri: 48 }; // how much of the figure shows above a vehicle's sill (head to belt)

const sprite = (who, cls = '', props = '') =>
  `<span class="hop ${cls}"><img src="/img/stunt/${who}.webp" width="${SIZE[who][0]}" height="${SIZE[who][1]}" alt="" decoding="async">${props}</span>`;
const walker = (who, left, cls = '', props = '', extra = '') =>
  `<span class="ch ${who} ${extra}" style="left:${left}px">${sprite(who, cls, props)}<i class="sh"></i></span>`;
// only the upper body of a figure, sitting in a vehicle (the vehicle's body is drawn over the cut edge)
const bust = (who, left, bottom, z = 1, cls = '') =>
  `<span class="bust ${who}" style="left:${left}px;bottom:${bottom}px;height:${BUST[who]}px;width:${SIZE[who][0]}px;z-index:${z}"><img class="${cls}" src="/img/stunt/${who}.webp" width="${SIZE[who][0]}" height="${SIZE[who][1]}" alt="" decoding="async"></span>`;

const wheel = (x, y, r, hub = 5.5) =>
  `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${DARK}" stroke="${CREAM}" stroke-width="2.2"/><g class="spin"><circle r="${hub}" fill="${BRASS}"/><path d="M0 -${r - 3}V${r - 3}M-${r - 3} 0H${r - 3}M-${((r - 3) * 0.7).toFixed(1)} -${((r - 3) * 0.7).toFixed(1)}L${((r - 3) * 0.7).toFixed(1)} ${((r - 3) * 0.7).toFixed(1)}M${((r - 3) * 0.7).toFixed(1)} -${((r - 3) * 0.7).toFixed(1)}L-${((r - 3) * 0.7).toFixed(1)} ${((r - 3) * 0.7).toFixed(1)}" stroke="${BRASS_HI}" stroke-width="1.3"/></g></g>`;
const puffs = (x, y) => `<g class="exh" fill="${CREAM}" fill-opacity=".7"><circle cx="${x}" cy="${y}" r="3.2"/><circle cx="${x}" cy="${y}" r="3.2"/><circle cx="${x}" cy="${y}" r="3.2"/></g>`;

// the mace Raja swings: its handle's foot sits in his raised fist
const gada = `<svg class="gada" width="22" height="54" viewBox="0 0 22 54" aria-hidden="true"><rect x="8" y="22" width="6" height="30" rx="3" fill="#7a4a1f" stroke="${CREAM}" stroke-width="1.6"/><rect x="7" y="40" width="8" height="3" rx="1.5" fill="${BRASS}"/><g stroke="${CREAM}" stroke-width="1.6" stroke-linejoin="round"><path d="M11 0l3 5-3 1-3-1zM1 8l6 1 0 3-5 1zM21 8l-6 1 0 3 5 1zM3 20l6-3 1 3-5 3zM19 20l-6-3-1 3 5 3z" fill="${BRASS_HI}"/><circle cx="11" cy="14" r="9.5" fill="${BRASS}"/></g><circle cx="8" cy="11" r="2.6" fill="#fff3c4" fill-opacity=".85"/><path d="M3.5 16Q11 22 18.5 16" fill="none" stroke="#8a6a2a" stroke-width="1.2"/></svg>`;

const bowSvg = `<svg class="bow" width="22" height="58" viewBox="0 0 22 58" aria-hidden="true"><path d="M3 2Q26 29 3 56" fill="none" stroke="${CREAM}" stroke-width="6.4" stroke-linecap="round"/><path d="M3 2Q26 29 3 56" fill="none" stroke="#7a4a1f" stroke-width="3.4" stroke-linecap="round"/><path d="M3 2V56" stroke="${CREAM}" stroke-width="1" opacity=".9"/><rect x="11.5" y="23" width="5" height="12" rx="2" fill="${BRASS}" stroke="${CREAM}" stroke-width="1.2"/></svg>`;
const arrow = (n) =>
  `<svg class="arrow" style="--n:${n}" width="40" height="8" viewBox="0 0 40 8" aria-hidden="true"><path d="M2 4H34" stroke="${CREAM}" stroke-width="3.4" stroke-linecap="round"/><path d="M2 4H34" stroke="#7a4a1f" stroke-width="1.6" stroke-linecap="round"/><path d="M33 0.4L40 4 33 7.6Z" fill="#dfe6e6" stroke="${CREAM}" stroke-width="1" stroke-linejoin="round"/><path d="M2 4L-1 0.5M2 4L-1 7.5M6 4L3 0.5M6 4L3 7.5" stroke="#ff7a4a" stroke-width="1.8" stroke-linecap="round"/></svg>`;

// open roadster, facing right. Raja drives.
const carSvg = `<svg class="veh" width="170" height="64" viewBox="0 0 170 64" aria-hidden="true">${puffs(-2, 44)}<path d="M6 48V35Q6 29 13 29L100 27L148 31Q165 33 165 42V48Z" fill="#1b9c8e" stroke="${CREAM}" stroke-width="2.4" stroke-linejoin="round"/><path d="M10 38H161" stroke="${BRASS}" stroke-width="2.6" stroke-linecap="round"/><path d="M66 31V47M99 30V47" stroke="#0b5e56" stroke-width="1.6"/><rect x="91" y="34" width="5" height="2.4" rx="1" fill="${BRASS_HI}"/><path d="M100 28L95 9H102L113 29Z" fill="#bfeee6" fill-opacity=".62" stroke="${BRASS}" stroke-width="2" stroke-linejoin="round"/><circle cx="159" cy="37" r="4.2" fill="#fff3c4" stroke="${CREAM}" stroke-width="1.6"/><rect x="162" y="44" width="8" height="5" rx="2" fill="${CREAM}"/><rect x="0" y="44" width="8" height="5" rx="2" fill="${CREAM}"/>${wheel(36, 52, 12)}${wheel(130, 52, 12)}</svg>`;

// scooter, facing right. Raja rides, the Mantri sits behind him.
const scooterSvg = `<svg class="veh" width="124" height="72" viewBox="0 0 124 72" aria-hidden="true">${puffs(2, 56)}<path d="M12 31Q36 21 62 29V33H12Z" fill="#3a2417" stroke="${CREAM}" stroke-width="2" stroke-linejoin="round"/><path d="M6 56Q4 37 22 33L62 31Q71 31 73 40L75 52Q75 58 67 58L14 58Q6 58 6 56Z" fill="#ee8a3a" stroke="${CREAM}" stroke-width="2.4" stroke-linejoin="round"/><path d="M9 46H72" stroke="${BRASS}" stroke-width="2.4" stroke-linecap="round"/><rect x="68" y="52" width="28" height="7" rx="3.5" fill="#0b5e56" stroke="${CREAM}" stroke-width="2"/><path d="M89 55L86 27Q86 20 93 18L99 18L97 55Z" fill="#ee8a3a" stroke="${CREAM}" stroke-width="2.2" stroke-linejoin="round"/><path d="M95 18L99 8" stroke="${CREAM}" stroke-width="6" stroke-linecap="round"/><path d="M95 18L99 8" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/><rect x="92" y="4" width="20" height="5" rx="2.5" fill="${DARK}" stroke="${CREAM}" stroke-width="1.8"/><path d="M99 21A4.4 4.4 0 0 1 99 12.4Z" fill="#fff3c4" stroke="${CREAM}" stroke-width="1.4" stroke-linejoin="round" transform="translate(5 3)"/><path d="M85 60Q100 41 115 60" fill="none" stroke="${CREAM}" stroke-width="8" stroke-linecap="round"/><path d="M85 60Q100 41 115 60" fill="none" stroke="#ee8a3a" stroke-width="4.4" stroke-linecap="round"/><circle cx="6" cy="42" r="2.4" fill="#ff4d4d"/>${wheel(24, 61, 11, 4.6)}${wheel(100, 61, 11, 4.6)}</svg>`;

// cycle rickshaw, facing right: the Mantri pedals in front, Raja is the passenger under the hood.
const rickshawSvg = `<svg class="veh" width="190" height="100" viewBox="0 0 190 100" overflow="visible" aria-hidden="true">
<path d="M10 64C4 14 40-16 84-4C100 0 112 14 116 30L108 33C102 18 92 10 80 6C44-2 22 22 24 64Z" fill="#f2b84b" stroke="${CREAM}" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 22C34 4 56-4 74 0M16 42C20 28 26 18 34 11M96 5C104 10 110 18 112 26" fill="none" stroke="#d6453d" stroke-width="2.2" stroke-linecap="round"/>
<path d="M14 86V68Q14 62 21 62H108Q115 62 115 68V86Z" fill="#d6453d" stroke="${CREAM}" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 72H111" stroke="${BRASS_HI}" stroke-width="3" stroke-linecap="round"/><g fill="${BRASS}"><circle cx="30" cy="79" r="2.4"/><circle cx="64" cy="79" r="2.4"/><circle cx="98" cy="79" r="2.4"/></g>
<path d="M115 80L141 82M141 82L132 55M141 82L165 58M132 55L165 58M165 58L172 86" fill="none" stroke="${CREAM}" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M115 80L141 82M141 82L132 55M141 82L165 58M132 55L165 58M165 58L172 86" fill="none" stroke="${DARK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="124" y="50" width="16" height="5.4" rx="2.7" fill="#3a2417" stroke="${CREAM}" stroke-width="1.6"/><path d="M165 58L161 49H170" fill="none" stroke="${CREAM}" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M165 58L161 49H170" fill="none" stroke="${DARK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="168" cy="46" r="3.4" fill="${BRASS_HI}" stroke="${CREAM}" stroke-width="1.2"/>
<g transform="translate(141 82)"><g class="spin"><path d="M-8 0H8" stroke="${DARK}" stroke-width="2.6" stroke-linecap="round"/><rect x="5" y="-2.4" width="7" height="4.8" rx="1.6" fill="${BRASS}" stroke="${CREAM}" stroke-width="1"/><rect x="-12" y="-2.4" width="7" height="4.8" rx="1.6" fill="${BRASS}" stroke="${CREAM}" stroke-width="1"/></g></g>
${wheel(52, 85, 15, 5)}${wheel(172, 86, 14, 4.6)}</svg>`;

const act = (i, cls, rig, style = '') =>
  `<div class="act a${i} ${cls}" style="--dly:${(i * 9 + 1.2).toFixed(1)}s${style}"><div class="rig">${rig}</div></div>`;

export function stuntLane() {
  const acts = [
    // 1. Raja swings his mace and chases the Mantri
    act(0, '', `${walker('mantri', 150, 'fast b')}${walker('raja', 40, 'run', gada)}`, ''),
    // 2. Raja flees by car, the Mantri runs behind and falls back
    act(1, 'r fast', `${walker('mantri', 0, 'fast', '', 'lag')}<div class="vg" style="left:64px">${bust('raja', 54, 33, 1, 'shout')}${carSvg}</div>`),
    // 3. the Mantri chases Raja
    act(2, '', `${walker('raja', 150, 'fast b')}${walker('mantri', 40, 'run')}`),
    // 4. Raja shoots arrows over the running Mantri
    act(3, 'r', `${walker('raja', 14, 'run steady', bowSvg)}<span class="volley">${arrow(0)}${arrow(1)}${arrow(2)}</span>${walker('mantri', 230, 'fast b')}`),
    // 5. Raja on a scooter, the Mantri on the pillion
    act(4, 'fast', `<div class="vg" style="left:0">${bust('mantri', 4, 38, 0)}${bust('raja', 34, 40, 1, 'shout')}${scooterSvg}</div>`),
    // 6. rickshaw: the Mantri pedals, Raja sits behind
    act(5, 'r', `<div class="vg" style="left:0">${bust('raja', 40, 36, 1, 'shout')}${bust('mantri', 124, 46, 1)}${rickshawSvg}</div>`),
    // 7. jumps and somersaults
    act(6, '', `${walker('mantri', 0, 'jump nodust')}${walker('raja', 62, 'flip b nodust')}`),
  ];
  return `<div class="stunt" aria-hidden="true">${acts.join('')}</div>`;
}
