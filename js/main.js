const I18N = {
  id: { code: "ID", bipa: "Bahasa Indonesia untuk Penutur Asing", ppb: "Program Pelayanan Bahasa" },
  en: { code: "EN", bipa: "Indonesian for Foreign Speakers",      ppb: "Language Services Program" },
  ja: { code: "JA", bipa: "外国人のためのインドネシア語",            ppb: "語学サービスプログラム" },
  ko: { code: "KO", bipa: "외국인을 위한 인도네시아어",              ppb: "어학 서비스 프로그램" },
  zh: { code: "ZH", bipa: "面向外国人的印度尼西亚语",                ppb: "语言服务项目" },
};

const btn  = document.getElementById("langBtn");
const menu = document.getElementById("langMenu");
const flag = document.getElementById("langFlag");
const code = document.getElementById("langCode");
const items = [...menu.querySelectorAll("li")];

function setLang(lang) {
  if (!I18N[lang]) lang = "id";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = I18N[lang][el.dataset.i18n]; });
  flag.src = `img/flags/${lang}.svg`;
  code.textContent = I18N[lang].code;
  items.forEach(li => li.setAttribute("aria-selected", li.dataset.lang === lang));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

function toggleMenu(open) {
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", open);
}

btn.addEventListener("click", e => { e.stopPropagation(); toggleMenu(menu.hidden); });
items.forEach(li => {
  li.tabIndex = 0;
  li.addEventListener("click", () => { setLang(li.dataset.lang); toggleMenu(false); });
  li.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") li.click(); });
});
document.addEventListener("click", () => toggleMenu(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

let saved = "id";
try { saved = localStorage.getItem("lang") || "id"; } catch (e) {}
setLang(saved);
