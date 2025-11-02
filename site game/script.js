// === داده‌های محصولات فرضی (دیتابیس شبیه‌سازی شده) ===
const products = [
    { title: "گیفت کارت پلی استیشن ۱۰۰ دلاری آمریکا", price: "4,500,000 تومان", url: "#" },
    { title: "استیم والت ۵ دلاری روسیه", price: "280,000 تومان", url: "#" },
    { title: "استیم والت ۱۰ دلاری آمریکا", price: "530,000 تومان", url: "#" },
    { title: "بازی Elden Ring (استیم)", price: "890,000 تومان", url: "#" },
    { title: "گیفت کارت ایکس باکس ۲۵ دلاری", price: "1,100,000 تومان", url: "#" },
    { title: "Red Dead Redemption 2 (استیم)", price: "670,000 تومان", url: "#" },
];

// === ۱. عناصر DOM: مطمئن شوید که شناسه‌ها دقیقا با HTML یکی باشند ===
// المان‌های سایدبار
const sidebar = document.getElementById('sidebarMenu');
const openMenuBtn = document.getElementById('openMenuBtn'); 
const closeMenuBtn = document.getElementById('closeMenuBtn'); 

// المان‌های جستجو
const searchDropDown = document.getElementById('searchDropDown'); // پنل کشویی جدید
const openSearchBtn = document.getElementById('openSearchBtn'); // آیکون جستجو در هدر
const dropDownSearchInput = document.getElementById('dropDownSearchInput'); 
const dropDownSearchResults = document.getElementById('dropDownSearchResults'); 

// المان‌های عمومی
const header = document.querySelector('.header'); 

// === ۲. توابع جستجوی پویا (Live Search) ===

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
    
    // فیلتر کردن محصولات بر اساس ورودی
    const filteredResults = products.filter(product => {
        return product.title.toLowerCase().includes(query);
    });

    renderResults(filteredResults);
}

// ======================= ۳. مدیریت رخدادها =======================

// --- مدیریت نوار جستجو ---
openSearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    sidebar.classList.remove('open'); // بستن سایدبار
    searchDropDown.classList.toggle('open'); // باز و بسته کردن جستجو
    
    if (searchDropDown.classList.contains('open')) {
        // فوکوس و پاک کردن فیلد هنگام باز شدن
        dropDownSearchInput.value = '';
        dropDownSearchResults.innerHTML = '';
        setTimeout(() => {
            dropDownSearchInput.focus();
        }, 100);
    }
});

// اجرای جستجوی پویا هنگام تایپ
dropDownSearchInput.addEventListener('input', handleSearch);

// جلوگیری از ارسال فرم و رفرش صفحه
document.querySelector('.drop-down-form').addEventListener('submit', (e) => {
    e.preventDefault();
    searchDropDown.classList.remove('open'); 
});

// --- مدیریت منوی کناری (Sidebar) ---
openMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    searchDropDown.classList.remove('open'); // بستن نوار جستجو
    sidebar.classList.toggle('open'); // باز و بسته کردن سایدبار
});

closeMenuBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// --- بستن با کلیک بیرون و ESC ---
document.addEventListener('click', (e) => {
    // بستن سایدبار
    const isClickInsideSidebar = sidebar.contains(e.target) || openMenuBtn.contains(e.target) || e.target === openMenuBtn;
    if (sidebar.classList.contains('open') && !isClickInsideSidebar) {
        sidebar.classList.remove('open');
    }
    
    // بستن نوار جستجو
    const isClickInsideSearch = searchDropDown.contains(e.target) || openSearchBtn.contains(e.target) || e.target === openSearchBtn;
    if (searchDropDown.classList.contains('open') && !isClickInsideSearch) {
        searchDropDown.classList.remove('open');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchDropDown.classList.remove('open');
        sidebar.classList.remove('open');
    }
});