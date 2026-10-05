const obs = new IntersectionObserver(
  es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      obs.unobserve(e.target);
    }
  }),
  { threshold: .12 }
);

document.querySelectorAll(".reveal").forEach(x => obs.observe(x));


/* =========================
   КУРСОР-ЗВЕЗДОЧКА
========================= */

const c = document.querySelector(".cursor");

let mx = 0;
let my = 0;
let cx = 0;
let cy = 0;

addEventListener("mousemove", e => {
  mx = e.clientX;
  my = e.clientY;

  /* Если курсор находится на красном фоне —
     звездочка становится светлой */

  const elementUnderCursor = document.elementFromPoint(
    e.clientX,
    e.clientY
  );

  const redBackground = elementUnderCursor?.closest(
    ".small-card, .education-card, .ticker, .hero-cta, .red-shape, .form-submit"
  );

  if (redBackground) {
    c.classList.add("cursor-light");
  } else {
    c.classList.remove("cursor-light");
  }
});


(function loop() {
  cx += (mx - cx) * .2;
  cy += (my - cy) * .2;

  c.style.left = cx + "px";
  c.style.top = cy + "px";

  requestAnimationFrame(loop);
})();


/* Увеличение звездочки */

document
  .querySelectorAll("a, button, .project")
  .forEach(x => {

    x.addEventListener("mouseenter", () => {
      c.classList.add("big");
    });

    x.addEventListener("mouseleave", () => {
      c.classList.remove("big");
    });

  });


/* =========================
   БУРГЕР-МЕНЮ
========================= */

const burger = document.querySelector(".burger");
const nav = document.querySelector(".top nav");

burger.addEventListener("click", () => {

  const open = nav.classList.toggle("mobile-open");

  burger.classList.toggle("open", open);

  burger.setAttribute(
    "aria-expanded",
    String(open)
  );

});


nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {

    nav.classList.remove("mobile-open");

    burger.classList.remove("open");

    burger.setAttribute(
      "aria-expanded",
      "false"
    );

  })
);


/* =========================
   ПРОЕКТЫ
========================= */

const projects = [

  {
    no: "01 / SELECTED WORK",
    category: "АЙДЕНТИКА / БРЕНДИНГ",
    title: "КОНТУР",
    visual: "PROJECT ONE",

    copy: "В\u00A0рамках проекта была разработана айдентика бренда: от\u00A0поиска основной идеи и\u00A0визуального направления до\u00A0логотипа, типографики, цветовой палитры и\u00A0дополнительных графических элементов. \n\nОсобое внимание уделялось тому, как система работает на\u00A0разных носителях.\n\nФирменный стиль был адаптирован для\u00A0полиграфии, упаковки и\u00A0рекламных материалов, чтобы сохранить узнаваемость бренда независимо от\u00A0формата.",

    bg: "#b62025",
    fg: "#f8f4ea"
  },


  {
    no: "02 / SELECTED WORK",
    category: "ГРАФИКА / ТИПОГРАФИКА",
    title: "ШУМ",
    visual: "PROJECT TWO",

    copy: "Проект построен вокруг экспериментов с\u00A0типографикой и\u00A0композицией. В\u00A0работе использовались разные масштабы текста, графические формы, текстуры и\u00A0контраст графитовых оттенков с\u00A0насыщенным синим цветом.\n\nГлавной задачей было превратить ощущение визуального шума в\u00A0управляемую композицию. \n\nНесмотря на\u00A0большое количество элементов, была выстроена иерархия, которая помогает направлять внимание зрителя и\u00A0сохранять читаемость.",

    bg: "#b62025",
    fg: "#f8f4ea"
  },


  {
    no: "03 / SELECTED WORK",
    category: "3D / ВИЗУАЛИЗАЦИЯ",
    title: "СРЕДА",
    visual: "PROJECT THREE",

    copy: "Для\u00A0проекта была создана архитектурная 3D-сцена с\u00A0использованием простых геометрических форм, арок, ступеней и\u00A0декоративных объектов. Основой визуального решения стала светлая молочная палитра, подчёркивающая форму и\u00A0объём пространства. \n\nОсобое внимание уделялось освещению, материалам и\u00A0композиции кадра.\n\nМягкие тени, отражения и\u00A0сочетание архитектуры с\u00A0природными элементами помогают создать спокойную атмосферу и\u00A0сделать пространство визуально цельным.",

    bg: "#b62025",
    fg: "#f8f4ea"
  }

];


/* =========================
   МОДАЛЬНОЕ ОКНО
========================= */

const modal = document.querySelector(".modal");

const image = document.querySelector(".modal-img");


function openProject(i) {

  const p = projects[i];

  document.querySelector(
    ".modal-no"
  ).textContent = p.no;

  document.querySelector(
    ".modal-category"
  ).textContent = p.category;

  document.querySelector(
    ".modal-title"
  ).textContent = p.title;

  document.querySelector(
    ".modal-visual-title"
  ).innerHTML = p.visual.replace(" ", "<br>");

  document.querySelector(
    ".modal-copy"
  ).textContent = p.copy;


  image.style.background = p.bg;

  image.style.color = p.fg;

  image.style.backgroundImage =
    `url("image/project-0${i + 1}.png")`;

  image.style.backgroundSize = "cover";

  image.style.backgroundPosition = "center";


  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


function closeProject() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


document
  .querySelectorAll(".project")
  .forEach((p, i) =>
    p.addEventListener(
      "click",
      () => openProject(i)
    )
  );


document
  .querySelector(".modal-close")
  .addEventListener(
    "click",
    closeProject
  );


modal.addEventListener("click", e => {

  if (e.target === modal) {
    closeProject();
  }

});


addEventListener("keydown", e => {

  if (e.key === "Escape") {
    closeProject();
  }

});


/* =========================
   ТИПОГРАФИКА
========================= */

function fixTypography() {

  const elements =
    document.querySelectorAll(
      "p, h1, h2, h3, h4, span, small, a, b, strong"
    );


  elements.forEach(element => {

    if (element.children.length > 0) return;


    let text = element.innerHTML;


    /* Предлоги и короткие союзы */

    text = text.replace(
      /(^|\s)(а|в|во|и|к|ко|о|об|с|со|у|на|не|но|по|за|из|от|до|для|при|про|без|над|под)\s+/gi,
      "$1$2&nbsp;"
    );


    /* Число + слово */

    text = text.replace(
      /(\d+)\s+(курс|года|год|лет|проекта|проекты)/gi,
      "$1&nbsp;$2"
    );


    element.innerHTML = text;

  });

}


fixTypography();
/* Обратная связь: проверка, счётчик и подготовка письма */
const contactForm = document.querySelector('#contact-form');
const contactEmail = document.querySelector('#contact-email');
const contactMessage = document.querySelector('#contact-message');
const contactStatus = document.querySelector('.form-status');
const CONTACT_EMAIL = 'yourmail@example.com'; // Замените своим адресом.
document.querySelector('.contact-write').addEventListener('click', () => {
  window.open(
    'https://t.me/aksdess',
    '_blank',
    'noopener,noreferrer'
  );
});
function checkContactField(field) {
  const isEmail = field === contactEmail;
  const valid = isEmail ? field.validity.valid && field.value.trim().length > 0 : field.value.trim().length >= 10;
  field.setAttribute('aria-invalid', String(!valid));
  document.querySelector(isEmail ? '#email-error' : '#message-error').textContent = valid ? '' : (isEmail ? 'Укажите корректный email.' : 'Напишите хотя бы 10 символов.');
  return valid;
}
[contactEmail, contactMessage].forEach(field => {
  field.addEventListener('blur', () => checkContactField(field));
  field.addEventListener('input', () => {
    if (field.hasAttribute('aria-invalid')) checkContactField(field);
    contactStatus.textContent = '';
  });
});
contactMessage.addEventListener('input', () => {
  document.querySelector('#message-count').textContent = contactMessage.value.length + ' / 150';
});
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const emailValid = checkContactField(contactEmail);
  const messageValid = checkContactField(contactMessage);
  if (!emailValid || !messageValid) {
    contactStatus.textContent = 'Проверьте отмеченные поля.';
    (emailValid ? contactMessage : contactEmail).focus();
    return;
  }
  contactForm.reset();
  document.querySelector('#message-count').textContent = '0 / 150';
  [contactEmail, contactMessage].forEach(field => field.removeAttribute('aria-invalid'));
  contactStatus.textContent = '';
  const popup = document.createElement('dialog');
  popup.className = 'sent-popup';
  popup.setAttribute('aria-label', 'Записка отправлена');
  popup.innerHTML = '<span class="sent-star" aria-hidden="true">✦</span><h3>Записка отправлена!</h3><button type="button">ОТЛИЧНО</button>';
  document.body.append(popup);
  popup.querySelector('button').addEventListener('click', () => popup.close());
  popup.addEventListener('click', e => { if (e.target === popup) popup.close(); });
  popup.addEventListener('close', () => { document.body.prepend(c); c.classList.remove('big', 'cursor-light'); popup.remove(); contactEmail.focus({ preventScroll: true }); });
  popup.showModal();
  popup.append(c);
  const popupButton = popup.querySelector('button');
  popupButton.addEventListener('mouseenter', () => c.classList.add('big'));
  popupButton.addEventListener('mouseleave', () => c.classList.remove('big')); 
});
