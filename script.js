// ===== Qovurish egri chizig'i — interaktiv nuqtalar =====
const points = [
  {
    x: 60, y: 360,
    stage: "0' — Boshlanish",
    text: "Yashil donlar 200°C li silindrga tushiriladi. Harorat keskin pasayadi, so'ng sekin ko'tarila boshlaydi."
  },
  {
    x: 260, y: 295,
    stage: "3' — Quritish bosqichi",
    text: "Donlar ichidagi namlik bug'lanadi. Rang och yashildan somon rangiga o'ta boshlaydi."
  },
  {
    x: 420, y: 190,
    stage: "6' — Meylard reaksiyasi",
    text: "Qandlar va aminokislotalar reaksiyaga kirishadi — kelajakdagi ta'm va aroma shu yerda shakllanadi."
  },
  {
    x: 620, y: 95,
    stage: "9' — Birinchi chirsillash",
    text: "Don ichidagi bosim po'stni yoradi — eshitiladigan 'chirs' tovushi. Och qovurish shu yerdan boshlanadi."
  },
  {
    x: 860, y: 55,
    stage: "11'40 — Tushirish nuqtasi",
    text: "Don darhol sovutish g'alviriga tushiriladi — qovurish shu zahoti to'xtatiladi, ta'm 'muhrlanadi'."
  }
];

const pointsGroup = document.getElementById('roastPoints');
const detailStage = document.querySelector('.curve-detail__stage');
const detailText = document.querySelector('.curve-detail__text');

if (pointsGroup) {
  points.forEach((p, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.x);
    circle.setAttribute('cy', p.y);
    circle.setAttribute('r', 7);
    circle.setAttribute('class', 'roast-point');
    circle.setAttribute('tabindex', '0');
    circle.setAttribute('role', 'button');
    circle.setAttribute('aria-label', p.stage);

    const activate = () => {
      document.querySelectorAll('.roast-point').forEach(el => el.classList.remove('active'));
      circle.classList.add('active');
      detailStage.textContent = p.stage;
      detailText.textContent = p.text;
    };

    circle.addEventListener('mouseenter', activate);
    circle.addEventListener('focus', activate);
    circle.addEventListener('click', activate);

    pointsGroup.appendChild(circle);

    if (i === points.length - 1) {
      // Boshlang'ich holatda oxirgi nuqtani ko'rsatib qo'yamiz
      setTimeout(activate, 2200);
    }
  });
}

// ===== Scroll bilan yumshoq paydo bo'lish =====
const revealTargets = document.querySelectorAll('.process__item, .bean-card, .visit__block');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});
