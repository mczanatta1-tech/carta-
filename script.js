// Elementos principais
const intro = document.getElementById('intro');
const book = document.getElementById('book');
const envelope = document.getElementById('envelope');
const seal = document.getElementById('seal');
const restartBtn = document.getElementById('restartBtn');

// Abertura do envelope
seal.addEventListener('click', () => {
  envelope.classList.add('open');

  setTimeout(() => {
    intro.classList.add('hidden');
    book.classList.remove('hidden');
  }, 1800);
});

// Navegação entre páginas
const pages = document.querySelectorAll('.page');

function showPage(id){
  pages.forEach(page => {
    page.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}

document.querySelectorAll('.next').forEach(button => {
  button.addEventListener('click', () => {
    showPage(button.dataset.next);
  });
});

document.querySelectorAll('.prev').forEach(button => {
  button.addEventListener('click', () => {
    showPage(button.dataset.prev);
  });
});

// Contador desde o início da relação
const startDate = new Date('2025-04-28T00:00:00');

function updateCounter(){

  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if(days < 0){
    months--;

    const previousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if(months < 0){
    years--;
    months += 12;
  }

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = now.getHours();
}

updateCounter();
setInterval(updateCounter, 60000);

// Fechar a carta e voltar ao envelope
restartBtn.addEventListener('click', () => {

  book.classList.add('hidden');

  setTimeout(() => {

    envelope.classList.remove('open');

    intro.classList.remove('hidden');

    showPage('page1');

  }, 600);

});

// Pequeno efeito de parallax no envelope
window.addEventListener('deviceorientation', (event) => {

  const x = (event.gamma || 0) / 30;
  const y = (event.beta || 0) / 60;

  envelope.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});

// Caso o dispositivo não tenha sensor
window.addEventListener('mousemove', (event) => {

  const x = (event.clientX / window.innerWidth - 0.5) * 6;
  const y = (event.clientY / window.innerHeight - 0.5) * -6;

  envelope.style.transform =
    `rotateY(${x}deg) rotateX(${y}deg)`;

});
