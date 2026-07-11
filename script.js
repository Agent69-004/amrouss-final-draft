const dialog = document.querySelector('#booking');
const toast = document.querySelector('#toast');
const translations = {
  en: {
    navStay:'Stay', navStory:'The Dar', navDining:'Dining', navExperiences:'Experiences', reserve:'Reserve your stay',
    heroOverline:'5 KM FROM AZROU · MIDDLE ATLAS', heroKicker:'LEAVE THE NOISE. ARRIVE IN STILLNESS.', heroTitle:'The Atlas,<br><em>at its calmest.</em>', heroCopy:'Five minutes beyond the city, a rare kind of quiet begins: cedar air, mountain light and nothing competing for your attention.', discover:'Enter the quiet',
    arrival:'Arrival', departure:'Departure', guests:'Guests', twoGuests:'2 Guests', oneGuest:'1 Guest', family:'Family of 4', availability:'Check availability', ritualSteam:'A warm, mineral pause, infused with the forest.', ritualSunrise:'Tea at first light, over a waking valley.'
  },
  fr: {
    navStay:'Séjours', navStory:'La Maison', navDining:'Table', navExperiences:'Expériences', reserve:'Réserver votre séjour',
    heroOverline:'À 5 KM D’AZROU · MOYEN ATLAS', heroKicker:'LAISSEZ LE BRUIT. ENTREZ DANS LE CALME.', heroTitle:'L’Atlas,<br><em>dans son calme absolu.</em>', heroCopy:'À cinq minutes de la ville commence un silence rare : l’air des cèdres, la lumière des montagnes et rien pour vous distraire.', discover:'Entrer dans le calme',
    arrival:'Arrivée', departure:'Départ', guests:'Voyageurs', twoGuests:'2 voyageurs', oneGuest:'1 voyageur', family:'Famille de 4', availability:'Voir les disponibilités', ritualSteam:'Une pause chaude et minérale, infusée par la forêt.', ritualSunrise:'Un thé aux premières lueurs, face à la vallée qui s’éveille.'
  },
  es: {
    navStay:'Estancias', navStory:'El Dar', navDining:'Gastronomía', navExperiences:'Experiencias', reserve:'Reserva tu estancia',
    heroOverline:'A 5 KM DE AZROU · MEDIO ATLAS', heroKicker:'DEJA EL RUIDO. LLEGA A LA CALMA.', heroTitle:'El Atlas,<br><em>en su máxima calma.</em>', heroCopy:'A cinco minutos de la ciudad empieza un silencio excepcional: aire de cedro, luz de montaña y nada que reclame tu atención.', discover:'Entra en la calma',
    arrival:'Llegada', departure:'Salida', guests:'Huéspedes', twoGuests:'2 huéspedes', oneGuest:'1 huésped', family:'Familia de 4', availability:'Ver disponibilidad', ritualSteam:'Una pausa cálida y mineral, perfumada por el bosque.', ritualSunrise:'Té al amanecer, ante un valle que despierta.'
  }
};

function setLanguage(lang) {
  const copy = translations[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = copy[el.dataset.i18n] || el.textContent; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = copy[el.dataset.i18nHtml] || el.innerHTML; });
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === lang));
  try { localStorage.setItem('amrouss-language', lang); } catch (_) { /* language still works without storage */ }
}

document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('amrouss-language') || 'en'; } catch (_) { /* local file browser restrictions */ }
setLanguage(savedLanguage);

document.querySelectorAll('[data-open-booking]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#reserveForm').addEventListener('submit', event => {
  event.preventDefault(); dialog.close(); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000);
});

const observer = new IntersectionObserver(items => items.forEach(item => {
  if (item.isIntersecting) { item.target.classList.add('visible'); observer.unobserve(item.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const reviews = [
  ['“A beautiful antidote to the everyday. The air, the service, the silence — perfection.”', 'JULIEN & CLARA · PARIS'],
  ['“The rare kind of place that makes you want to keep its secret. We will return.”', 'MAYA R. · LONDON'],
  ['“It felt less like a hotel and more like discovering a beautiful home in the Atlas.”', 'YASSINE E. · CASABLANCA']
];
let reviewIndex = 0;
function showReview(direction) {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  const text = document.querySelector('[data-review]');
  text.style.opacity = 0; text.style.transform = 'translateY(10px)';
  setTimeout(() => { text.textContent = reviews[reviewIndex][0]; document.querySelector('[data-review-author]').textContent = reviews[reviewIndex][1]; document.querySelector('[data-review-current]').textContent = `0${reviewIndex + 1}`; text.style.opacity = 1; text.style.transform = 'none'; }, 180);
}
document.querySelector('[data-review-next]').addEventListener('click', () => showReview(1));
document.querySelector('[data-review-prev]').addEventListener('click', () => showReview(-1));
