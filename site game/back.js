// === داده‌های محصولات فرضی (دیتابیس شبیه‌سازی شده) ===
const products = [
    { title: "گیفت کارت پلی استیشن ۱۰۰ دلاری آمریکا", price: "4,500,000 تومان", url: "#" },
    { title: "استیم والت ۵ دلاری روسیه", price: "280,000 تومان", url: "#" },
    { title: "استیم والت ۱۰ دلاری آمریکا", price: "530,000 تومان", url: "#" },
    { title: "بازی Elden Ring (استیم)", price: "890,000 تومان", url: "#" },
    { title: "گیفت کارت اسپاتیفای پریمیوم", price: "150,000 تومان", url: "#" },
    { title: "گیفت کارت ایکس باکس ۲۵ دلاری", price: "1,100,000 تومان", url: "#" },
    { title: "استیم والت ۵۰ لیر ترکیه", price: "115,000 تومان", url: "#" },
    { title: "Red Dead Redemption 2 (استیم)", price: "670,000 تومان", url: "#" },
    { title: "گیفت کارت گوگل پلی ۲۰ دلاری", price: "900,000 تومان", url: "#" },
    { title: "استیم والت گلوبال ۲۰ دلاری", price: "950,000 تومان", url: "#" }
];

// === عناصر DOM ===
const sidebar = document.getElementById('sidebarMenu');
const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');

// عناصر نوار جستجوی کشویی
const searchDropDown = document.getElementById('searchDropDown');
const openSearchBtn = document.getElementById('openSearchBtn'); 
const dropDownSearchInput = document.getElementById('dropDownSearchInput');
const dropDownSearchResults = document.getElementById('dropDownSearchResults');
const header = document.querySelector('.header'); 

// === توابع جستجوی پویا ===

function renderResults(results) {
    dropDownSearchResults.innerHTML = ''; 
    const query = dropDownSearchInput.value.trim();

    if (query.length === 0) {
        return;
    }

    if (results.length === 0) {
        dropDownSearchResults.innerHTML = '<div class="no-results">نتیجه‌ای برای جستجوی شما یافت نشد.</div>';
        return;
    }
    
    results.forEach(product => {
        const item = document.createElement('a');
        item.href = product.url;
        item.classList.add('search-result-item');
        
        item.innerHTML = `
            <span class="result-title">${product.title}</span>
            <span class="result-price">${product.price}</span>
        `;
        dropDownSearchResults.appendChild(item);
    });
}

function handleSearch() {
    const query = dropDownSearchInput.value.trim().toLowerCase();
    
    if (query.length === 0) {
        renderResults([]);
        return;
    }

    const filteredResults = products.filter(product => {
        return product.title.toLowerCase().includes(query);
    });

    renderResults(filteredResults);
}

// === مدیریت رخدادها ===

// 1. نمایش / پنهان کردن نوار جستجو
openSearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // اگر نوار باز است، ببند وگرنه باز کن
    if (searchDropDown.classList.contains('open')) {
        searchDropDown.classList.remove('open');
    } else {
        searchDropDown.classList.add('open');
        // پاک کردن و فوکوس هنگام باز شدن
        dropDownSearchInput.value = '';
        dropDownSearchResults.innerHTML = '';
        setTimeout(() => {
            dropDownSearchInput.focus();
        }, 100);
    }
    
    // **بستن سایدبار اگر باز است**
    sidebar.classList.remove('open');
});

// 2. جستجوی پویا هنگام تایپ
dropDownSearchInput.addEventListener('input', handleSearch);

// 3. مدیریت فرم جستجو (جلوگیری از رفرش صفحه)
document.querySelector('.drop-down-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("جستجوی نهایی: " + dropDownSearchInput.value);
    searchDropDown.classList.remove('open'); 
});

// 4. مدیریت منوی کناری (Sidebar)
openMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // باز یا بسته کردن سایدبار
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    } else {
        sidebar.classList.add('open');
    }
    // **بستن نوار جستجو اگر باز بود**
    searchDropDown.classList.remove('open');
});

closeMenuBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// 5. بستن با دکمه ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchDropDown.classList.contains('open')) {
            searchDropDown.classList.remove('open');
        }
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});


// 6. بستن منو و نوار جستجو با کلیک بیرون از آنها
document.addEventListener('click', (e) => {
    // بستن سایدبار
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        e.target !== openMenuBtn && 
        !openMenuBtn.contains(e.target)) {
        
        sidebar.classList.remove('open');
    }
    
    // بستن نوار جستجو (اگر روی خود نوار یا هدر کلیک نشده باشد)
    if (searchDropDown.classList.contains('open') && 
        !searchDropDown.contains(e.target) &&
        !header.contains(e.target)) {
        
        searchDropDown.classList.remove('open');
    }
});