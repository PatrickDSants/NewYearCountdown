// Selecionando os elementos HTML
const secondsContainer = document.querySelector('#seconds')
const minutesContainer = document.querySelector('#minutes')
const hoursContainer = document.querySelector('#hours')
const daysContainer = document.querySelector('#days')
const nextYearContainer = document.querySelector('#year')
const countdownContainer = document.querySelector('#countdown')
const loading = document.querySelector('#loading')

// Definição do próximo Ano Novo
const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);

// Exibindo o próximo ano no HTML
nextYearContainer.textContent = nextYear;

// Constantes para conversões de tempo
const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;

// Função para formatar valores com dois dígitos
const formatTimeUnit = unit => String(unit).padStart(2, '0');

// Função que insere os valores no HTML
const insertCountdownValues = ({ seconds, minutes, hours, days }) => {
    secondsContainer.textContent = formatTimeUnit(seconds);
    minutesContainer.textContent = formatTimeUnit(minutes);
    hoursContainer.textContent = formatTimeUnit(hours);
    daysContainer.textContent = formatTimeUnit(days);
};

// Função que atualiza a contagem regressiva
const updateCountdown = () => {
    const currentTime = new Date();
    const difference = newYearTime - currentTime;

    // Evita números negativos após a virada do ano
    if (difference < 0) {
        clearInterval(countdownInterval);
        insertCountdownValues({ seconds: 0, minutes: 0, hours: 0, days: 0 });
        return;
    }

    const totalSeconds = Math.floor(difference / MILLISECONDS_IN_A_SECOND);
    const totalMinutes = Math.floor(totalSeconds / SECONDS_IN_A_MINUTE);
    const totalHours = Math.floor(totalMinutes / MINUTES_IN_AN_HOUR);
    const totalDays = Math.floor(totalHours / HOURS_IN_A_DAY);

    const seconds = totalSeconds % SECONDS_IN_A_MINUTE;
    const minutes = totalMinutes % MINUTES_IN_AN_HOUR;
    const hours = totalHours % HOURS_IN_A_DAY;
    const days = totalDays;

    insertCountdownValues({ seconds, minutes, hours, days });
};

// Removendo o carregamento e exibindo a contagem regressiva após 2 segundos
setTimeout(() => {
    loading.remove();
    countdownContainer.style.display = "flex";
}, 2000);

// Iniciando a contagem regressiva
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Atualiza imediatamente ao carregar a página

