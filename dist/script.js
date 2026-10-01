const listings = {
  'casa-contemporanea': {
    title: 'Casa contemporânea', type: 'CASA · LAVRAS, MG',
    description: 'Projeto de linhas atuais com fachada em contraste, ambientes claros, cozinha com bancada e área externa. Fale com a equipe para conhecer localização, medidas, valor e disponibilidade.',
    photos: [
      ['assets/casa-fachada.jpg', 'Fachada da casa contemporânea'],
      ['assets/casa-entrada.jpg', 'Entrada e área externa da casa'],
      ['assets/casa-lateral.jpg', 'Área lateral da casa'],
      ['assets/casa-sala.jpg', 'Sala da casa'],
      ['assets/casa-cozinha.jpg', 'Cozinha com bancada'],
      ['assets/casa-banheiro.jpg', 'Banheiro da casa'],
      ['assets/casa-quarto.jpg', 'Quarto da casa']
    ],
    source: 'https://www.instagram.com/msimobiliariaa/p/DRdWv-GALlJ/'
  },
  'apartamento-claro': {
    title: 'Apartamento iluminado', type: 'APARTAMENTO · LAVRAS, MG',
    description: 'Ambientes de tons claros, cozinha com armários, sala iluminada e banheiro com box. Consulte a equipe sobre localização, medidas, valor e disponibilidade.',
    photos: [
      ['assets/apartamento-sala.jpg', 'Sala iluminada do apartamento'],
      ['assets/apartamento-cozinha.jpg', 'Cozinha do apartamento'],
      ['assets/apartamento-banheiro.jpg', 'Banheiro do apartamento'],
      ['assets/apartamento-cozinha-2.jpg', 'Outro ângulo da cozinha do apartamento']
    ]
  },
  'terreno-lago': {
    title: 'Terreno junto à água', type: 'TERRENO · PERFIL M.S. IMÓVEIS',
    description: 'Terreno com paisagem aberta e vista para o lago, apresentado no Instagram da M.S. Imóveis. Consulte localização exata, área, valor e disponibilidade.',
    photos: [['assets/terreno-lago.jpg', 'Terreno com vista para lago']],
    source: 'https://www.instagram.com/msimobiliariaa/p/DG_X3fZuSFw/'
  },
  'casa-ambientes': {
    title: 'Casa com ambientes acolhedores', type: 'CASA · PERFIL M.S. IMÓVEIS',
    description: 'Publicação com fotos de sala, cozinha e quartos de uma casa divulgada pela imobiliária. Consulte localização, características, valor e disponibilidade.',
    photos: [['assets/casa-ambientes.jpg', 'Ambientes da casa mostrada pela M.S. Imóveis']],
    source: 'https://www.instagram.com/msimobiliariaa/p/CtSU-ZzLAQT/'
  },
  'lote-vista': {
    title: 'Lote com vista aberta', type: 'LOTE · PERFIL M.S. IMÓVEIS',
    description: 'Lote urbano com vista ampla apresentado no Instagram da M.S. Imóveis. Consulte metragem, localização, valor e disponibilidade.',
    photos: [['assets/lote-vista.jpg', 'Lote urbano com vista aberta']],
    source: 'https://www.instagram.com/msimobiliariaa/p/CtT6OK7tj5a/'
  }
};

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

const filterButtons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.property-card');
function filterListings(type) {
  filterButtons.forEach(button => {
    const active = button.dataset.filter === type;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => { card.hidden = type !== 'todos' && card.dataset.type !== type; });
}
filterButtons.forEach(button => button.addEventListener('click', () => filterListings(button.dataset.filter)));
document.getElementById('finder-submit').addEventListener('click', () => {
  filterListings(document.getElementById('finder-type').value);
  document.getElementById('imoveis').scrollIntoView({ behavior: 'smooth' });
});

const dialog = document.getElementById('property-dialog');
const dialogImage = document.getElementById('dialog-image');
const galleryCount = document.getElementById('gallery-count');
let currentListing = null;
let photoIndex = 0;
function showPhoto() {
  const [src, alt] = currentListing.photos[photoIndex];
  dialogImage.src = src;
  dialogImage.alt = alt;
  galleryCount.textContent = `${photoIndex + 1} / ${currentListing.photos.length}`;
  const hasMultiple = currentListing.photos.length > 1;
  document.querySelectorAll('.gallery-nav').forEach(button => { button.hidden = !hasMultiple; });
}
function openListing(id) {
  currentListing = listings[id];
  if (!currentListing) return;
  photoIndex = 0;
  document.getElementById('dialog-type').textContent = currentListing.type;
  document.getElementById('dialog-title').textContent = currentListing.title;
  document.getElementById('dialog-description').textContent = currentListing.description;
  document.getElementById('dialog-whatsapp').href = `https://wa.me/553534093637?text=${encodeURIComponent(`Olá! Vi o imóvel "${currentListing.title}" no site da M.S. Imóveis. Gostaria de confirmar disponibilidade, valor e mais detalhes.`)}`;
  const source = document.getElementById('dialog-source');
  source.hidden = !currentListing.source;
  if (currentListing.source) source.href = currentListing.source;
  showPhoto();
  dialog.showModal();
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openListing(button.dataset.open)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.gallery-prev').addEventListener('click', () => { photoIndex = (photoIndex - 1 + currentListing.photos.length) % currentListing.photos.length; showPhoto(); });
document.querySelector('.gallery-next').addEventListener('click', () => { photoIndex = (photoIndex + 1) % currentListing.photos.length; showPhoto(); });
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' && currentListing) { photoIndex = (photoIndex - 1 + currentListing.photos.length) % currentListing.photos.length; showPhoto(); }
  if (event.key === 'ArrowRight' && currentListing) { photoIndex = (photoIndex + 1) % currentListing.photos.length; showPhoto(); }
});

document.getElementById('owner-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form).entries());
  const details = [
    'Olá, M.S. Imóveis! Quero conversar sobre meu imóvel.',
    '',
    `Objetivo: ${values.objetivo}`,
    `Tipo: ${values.tipo}`,
    `Bairro/região: ${values.bairro}`,
    values.area && `Área aproximada: ${values.area}`,
    values.quartos && `Quartos: ${values.quartos}`,
    values.vagas && `Vagas: ${values.vagas}`,
    values.valor && `Valor desejado: ${values.valor}`,
    values.descricao && `Outras informações: ${values.descricao}`,
    '',
    `Meu nome: ${values.nome}`,
    `Meu contato: ${values.telefone}`
  ].filter(line => line !== false && line !== undefined && line !== '').join('\n');
  const url = `https://wa.me/553534093637?text=${encodeURIComponent(details)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    const error = document.getElementById('form-error');
    error.hidden = false;
    error.textContent = 'O navegador bloqueou a nova aba. Permita pop-ups para abrir sua mensagem no WhatsApp.';
  }
});
document.getElementById('year').textContent = new Date().getFullYear();
