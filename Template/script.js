let list=document.querySelector('.slider .list');
let items=document.querySelectorAll('.slider .list .img');
let dots=document.querySelectorAll('.slider .dots li');
let prev=document.getElementById('prev');
let next= document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1 ; 
next.onclick=function(){
    if(active + 1 > lengthItems){
        active = 0;
    }else{
        active=active+1;
    }
    reloadSlider();
}
prev.onclick=function(){
    if(active - 1 < 0){
        active = lengthItems;
    }else{
        active=active - 1;
    }
    reloadSlider();
}
let refreshSlider=setInterval(() => {
    next.click()
}, 5000);
function reloadSlider(){
    let checkLeft=items[active].offsetLeft;
    list.style.left= -checkLeft +'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
    refreshSlider=setInterval(() => {
        next.click()
    }, 5000);
}
dots.forEach((li,key) => {
    li.addEventListener('click',function(){
        active=key;
        reloadSlider();
    })
})
 //OwlCarousel
 $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        
        margin: 10,
        nav: true,
        navText: ['<span>&#8249;</span>', '<span>&#8250;</span>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
});
let headings = [
"Mirada Otellerinde <br> Aksa'lılara Özel İndirimler!",
"Başka Bir Başlık <br> İkinci İndirim Fırsatı!",
"Üçüncü Başlık <br> Özel Teklif!"
];
//Mirada
const data = [
{
    heading: "Mirada Otellerinde <br> Aksa'lılara Özel İndirimler!",
    imgSrc: "img/mirada.jpg"
},
{
    heading: "Boş",
    imgSrc: "" 
},
{
    heading: "Boş",
    imgSrc: "" 
}
];

let currentIndex = 0;

function updateContent() {
const headingElement = document.getElementById("heading");
const imageElement = document.getElementById("miradaImage");
if (headingElement && imageElement) {
    headingElement.innerHTML = data[currentIndex].heading;
    imageElement.src = data[currentIndex].imgSrc;
} else {
    console.error("Required elements not found.");
}
}

function prevHeading() {
currentIndex = (currentIndex - 1 + data.length) % data.length;
updateContent();
}

function nextHeading() {
currentIndex = (currentIndex + 1) % data.length;
updateContent();
}
//Bugün Doğanlar
const profiles = [
    { name: "Can Güner Yiğit", title: "Finans Uzman Yardımcısı", imgSrc: "img/insan1.jpeg" },
    { name: "Can Güner Yiğit", title: "Finans Uzman Yardımcısı", imgSrc: "img/kisi.jpg" },
    { name: "Can Güner Yiğit", title: "Finans Uzman Yardımcısı", imgSrc: "img/kisi2.jpg" },
    { name: "Can Güner Yiğit", title: "Finans Uzman Yardımcısı", imgSrc: "img/kisi3.jpg" },
    { name: "Can Güner Yiğit", title: "Finans Uzman Yardımcısı", imgSrc: "img/kisi4.png" },
    { name: "Can Güner Yiğit", title: "Finans Uzman Yardımcısı", imgSrc: "img/kisi5.png" }
];

let current = 0;

function displayProfiles() {
    const profilesContainer = document.getElementById("profilesContainer");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    if (!profilesContainer || !prevButton || !nextButton) {
        console.error("Profiles container or navigation buttons not found.");
        return;
    }

    profilesContainer.innerHTML = '';
    
    for (let i = current; i < current + 3 && i < profiles.length; i++) {
        const profile = profiles[i];
        profilesContainer.innerHTML += `
            <div class="profile-card">
                <img src="${profile.imgSrc}" alt="${profile.name}">
                <h4>${profile.name}</h4>
                <span style="font-size: small; text-align: center;">${profile.title}</span>
            </div>
        `;
    }

    prevButton.disabled = current === 0;
    nextButton.disabled = current + 3 >= profiles.length;
}

function prevProfiles() {
    if (current > 0) {
        current -= 3;
        displayProfiles();
    }
}

function nextProfiles() {
    if (current + 3 < profiles.length) {
        current += 3;
        displayProfiles();
    }
}

window.onload = displayProfiles;

//Takvim
document.addEventListener('DOMContentLoaded', () => {
    const monthYearElement = document.getElementById('monthYear');
    const calendarBody = document.getElementById('calendarBody');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    const publicHolidays = ["2024-06-03", "2024-06-04", "2024-06-05", "2024-06-06", "2024-06-07",  "2024-06-18"];
    const companyHolidays = ["2024-06-17", "2024-06-27", "2024-06-28"];

    let currentMonth = new Date().getMonth();
    const currentYear = 2024;  

    const renderCalendar = (month, year) => {
        const firstDay = (new Date(year, month).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYearElement.textContent = new Date(year, month).toLocaleDateString('tr-TR', {
            month: 'long'
        });

        calendarBody.innerHTML = '';

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    const cellText = document.createTextNode('');
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cellText = document.createTextNode(date);
                    cell.appendChild(cellText);

                    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    if (publicHolidays.includes(dateString)) {
                        cell.style.backgroundColor = '#8BC34A '; //Resmi Tatil
                        cell.style.borderRadius="15px";
                        cell.style.color="#fff";
                    } else if (companyHolidays.includes(dateString)) {
                        cell.style.backgroundColor = '#3b77e7'; //Şirket Tatili
                        cell.style.borderRadius="15px";
                        cell.style.color="#fff";
                    }

                    row.appendChild(cell);
                    date++;
                }
            }

            calendarBody.appendChild(row);
        }
    };

    prevMonthButton.addEventListener('click', () => {
        if (currentMonth > 0) {
            currentMonth--;
            renderCalendar(currentMonth, currentYear);
        }
    });

    nextMonthButton.addEventListener('click', () => {
        if (currentMonth < 11) {
            currentMonth++;
            renderCalendar(currentMonth, currentYear);
        }
    });

    renderCalendar(currentMonth, currentYear);
});

function showSection(sectionId) {
    var duyurular = document.getElementById('duyurular');
    var haberler = document.getElementById('haberler');
    var duyurularBtn = document.getElementById('duyurubtn');
    var haberlerBtn = document.getElementById('haberbtn');

    if (sectionId === 'duyurular') {
        duyurular.style.display = 'block';
        haberler.style.display = 'none';
        duyurularBtn.classList.add('active');
        haberlerBtn.classList.remove('active');
    } else {
        duyurular.style.display = 'none';
        haberler.style.display = 'block';
        duyurularBtn.classList.remove('active');
        haberlerBtn.classList.add('active');
    }
}

//Bilgilendirme

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    
    setTimeout(showSlides, 5000); 
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}
