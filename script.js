/* ===== EDIT ME ===== */
const CONFIG = {
  brand: 'Dušan Đuriš',
  email: 'dukydjuris@gmail.com',
  instagram: 'https://www.instagram.com/dusan_djuris/',
  // Contact form: leave '' to open the visitor's email app instead (no backend).
  // To go live, paste a form-service URL (Formspree, Web3Forms, Getform) or a
  // Cloudflare Worker URL that accepts a JSON POST {name,email,message}.
  formEndpoint: '',
  emailjs: { service: 'service_l17ce2i', template: 'template_mbtej0g', key: 'm5M-5KixKsVQpLeEg' },
};

/* English strings. Serbian is read from index.html itself (the default language). */
const EN = {
  skip:'Skip to content', logo:'web design', n1:'Home', n2:'Work', n3:'Services', n4:'About', n5:'Contact',
  h1:'Your Business Deserves a Better Website.',
  sub:'I design and develop modern, professional websites that help businesses stand out, attract customers and build trust online.',
  cta1:'View My Work', cta2:"Let's Talk",
  h_work:'Websites That Make an Impression.', c_biz:'Business website',
  d_res:'Website for a local representative serving international automotive companies in Slovakia: a clear offer, multilingual contact and key metrics at a glance.',
  t_resp:'Responsive design', t_form:'Contact form', view:'View project', concept:'Concept (demo)',
  d_beauty:'Beauty salon website: services, price list and booking.',
  d_barber:'Premium barbershop website concept featuring services, barber team, gallery and contact information.',
  d_fit:'Premium personal fitness coaching website featuring training programs, client transformations and coaching services.',
  d_tattoo:'Premium tattoo studio website featuring professional artists, tattoo styles, a curated gallery and booking experience.',
  live:'Live Preview',
  h_serv:'What I Can Build for You.',
  s1:'Business Websites', s1d:'Professional websites that present your business, services, contact information and brand.',
  s2:'Landing Pages', s2d:'Focused landing pages designed to present a specific service, offer or product.',
  s3:'Portfolio Websites', s3d:'Beautiful online portfolios for freelancers, creatives and independent professionals.',
  s4:'Website Maintenance', s4d:'Ongoing updates, improvements and technical support to keep websites up to date.',
  h_proc:'Simple Process. Professional Results.',
  p1:'Discovery', p1d:'We discuss your business, goals and website requirements.',
  p2:'Design', p2d:'I create a design that matches your brand and target audience.',
  p3:'Development', p3d:'I build a responsive, functional website optimized for desktop and mobile.',
  p4:'Launch', p4d:'Your website goes live and is ready for customers.',
  alt_me:'My photo',
  h_about:'Personal Approach. Professional Results.',
  a1:"I'm an independent web designer and developer passionate about creating modern, functional and visually appealing websites.",
  a2:'I work directly with clients to understand their needs and turn their ideas into professional online experiences.',
  a3:'My focus is on clean design, responsive development and websites that make it easier for customers to connect with businesses.',
  h_cont:"Let's Build Something Great Together.",
  cont_t:"Have an idea for a website or want to improve your online presence? Tell me a little about your business and let's discuss how I can help.",
  f_name:'Name', f_mail:'Email', f_msg:'Message', f_send:'Send message', book:'Book a 15-minute call',
  foot:'Independent web design and development for small businesses.',
  e_name:'Enter your name.', e_mail:'Enter a valid email address.', e_msg:'Write at least 10 characters.',
  s_mailto:'Opening your email app. The contact form is not connected to a server yet.',
  s_ok:'Thank you! Your message was sent.', s_fail:'Sending failed. Please email me directly.',
  mail_sub:'Website inquiry', mail_name:'Name', title:'Web Design & Website Development for Small Businesses',
  desc:'I design and develop modern, professional websites for salons, barbers, fitness trainers, freelancers and small local businesses.'
};
const SRX = {
  e_name:'Unesite ime.', e_mail:'Unesite ispravnu email adresu.', e_msg:'Napišite bar 10 karaktera.',
  s_mailto:'Otvaram vaš email program. Kontakt forma još nije povezana sa serverom.',
  s_ok:'Hvala! Vaša poruka je poslata.', s_fail:'Slanje nije uspelo. Pišite mi direktno na email.',
  mail_sub:'Upit za sajt', mail_name:'Ime', title:document.title,
  desc:document.querySelector('meta[name=description]').content
};

const $ = (s, r = document) => [...r.querySelectorAll(s)];
const SR = {}, SRALT = {};
$('[data-i18n]').forEach(e => { if (!(e.dataset.i18n in SR)) SR[e.dataset.i18n] = e.textContent; });
$('[data-i18n-alt]').forEach(e => SRALT[e.dataset.i18nAlt] = e.alt);
SR.alt_me = 'Moja fotografija';
let lang = 'sr';
const t = k => (lang === 'en' ? (EN[k] ?? SR[k]) : (SR[k] ?? SRX[k] ?? EN[k]));

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  $('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  $('[data-i18n-alt]').forEach(e => e.alt = t(e.dataset.i18nAlt));
  $('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  document.title = t('title');
  document.querySelector('meta[name=description]').content = t('desc');
  document.querySelector('meta[property="og:title"]').content = t('title');
  try { localStorage.setItem('lang', l); } catch (e) {}
  if (!$('.err').every(x => !x.textContent)) validate();
}

/* brand, email, instagram */
$('[data-brand]').forEach(e => e.textContent = CONFIG.brand);
$('[data-email]').forEach(e => { e.textContent = CONFIG.email; e.href = 'mailto:' + CONFIG.email; });
$('[data-ig]').forEach(e => e.href = CONFIG.instagram);
document.getElementById('year').textContent = new Date().getFullYear();

/* language buttons */
$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
let saved = 'sr'; try { saved = localStorage.getItem('lang') || 'sr'; } catch (e) {}
setLang(saved === 'en' ? 'en' : 'sr');

/* mobile menu */
const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
const toggle = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); };
burger.addEventListener('click', () => toggle(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) toggle(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

/* scroll reveal */
const rv = $('.card,.svc,.steps li,.about>div,.contact>*');
rv.forEach(e => e.classList.add('reveal'));
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
  rv.forEach(e => io.observe(e));
} else rv.forEach(e => e.classList.add('in'));

/* contact form */
const f = document.getElementById('form'), st = document.getElementById('status');
function validate() {
  const v = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
  const bad = {
    name: v.name.length < 2,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email),
    message: v.message.length < 10
  };
  [['name', 'e_name', 'e-name'], ['email', 'e_mail', 'e-mail'], ['message', 'e_msg', 'e-msg']].forEach(([k, m, id]) => {
    document.getElementById(id).textContent = bad[k] ? t(m) : '';
    f[k].setAttribute('aria-invalid', bad[k]);
  });
  return Object.values(bad).some(Boolean) ? null : v;
}
f.addEventListener('submit', async e => {
  e.preventDefault(); st.textContent = '';
  const v = validate(); if (!v) return;
  if (CONFIG.emailjs.key) {
  try {
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: CONFIG.emailjs.service,
        template_id: CONFIG.emailjs.template,
        user_id: CONFIG.emailjs.key,
        template_params: { from_name: v.name, reply_to: v.email, message: v.message }
      })
    });
    if (!r.ok) throw 0;
    st.textContent = t('s_ok'); f.reset();
  } catch (x) { st.textContent = t('s_fail'); }
  return;
}
  if (!CONFIG.formEndpoint) {
    st.textContent = t('s_mailto');
    location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(t('mail_sub')) +
      '&body=' + encodeURIComponent(t('mail_name') + ': ' + v.name + '\nEmail: ' + v.email + '\n\n' + v.message);
    return;
  }
  try {
    const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) });
    if (!r.ok) throw 0;
    st.textContent = t('s_ok'); f.reset();
  } catch (x) { st.textContent = t('s_fail'); }
});

/* hero parallax oko fotografije */
(() => {
  const p = document.getElementById('portrait');
  if (!p || matchMedia('(prefers-reduced-motion:reduce)').matches || matchMedia('(pointer:coarse)').matches) return;
  const hero = p.closest('.hero');
  hero.addEventListener('pointermove', e => {
    const r = p.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
    p.style.setProperty('--mx', Math.max(-1, Math.min(1, x)).toFixed(3));
    p.style.setProperty('--my', Math.max(-1, Math.min(1, y)).toFixed(3));
  });
  hero.addEventListener('pointerleave', () => { p.style.setProperty('--mx', 0); p.style.setProperty('--my', 0); });
})();
