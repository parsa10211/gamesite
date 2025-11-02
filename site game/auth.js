// --- توابع کمکی ---

// ذخیره کاربر جاری (برای نشان دادن حالت ورود)
function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

// پاک کردن کاربر جاری (برای خروج)
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// بررسی ورود کاربر
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// --- مدیریت فرم‌ها ---
document.addEventListener('DOMContentLoaded', () => {
    // اگر کاربر قبلاً وارد شده، مستقیماً به صفحه پروفایل منتقل شود
    if (isLoggedIn() && window.location.pathname.endsWith('login-register.html')) {
        window.location.href = 'profile.html';
        return;
    }
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // منطق جابجایی بین تب‌ها
    showLoginBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        registerForm.classList.remove('active');
        showLoginBtn.classList.add('active');
        showRegisterBtn.classList.remove('active');
    });

    showRegisterBtn.addEventListener('click', () => {
        registerForm.classList.add('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        loginForm.classList.remove('active');
        showRegisterBtn.classList.add('active');
        showLoginBtn.classList.remove('active');
    });

    // --- ثبت‌نام ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        registerMessage.textContent = '';
        if (password !== confirmPassword) {
            registerMessage.textContent = 'رمز عبور و تکرار آن یکسان نیستند.';
            return;
        }

        if (localStorage.getItem('user_' + username)) {
            registerMessage.textContent = 'این نام کاربری قبلاً ثبت شده است.';
            return;
        }

        // ذخیره کاربر جدید
        localStorage.setItem('user_' + username, JSON.stringify({ username, password }));
        registerMessage.textContent = '✅ ثبت‌نام موفق بود. اکنون وارد شوید.';
        registerMessage.classList.remove('error');
        registerMessage.classList.add('success');
        
        // سوئیچ خودکار به تب ورود
        setTimeout(() => {
            showLoginBtn.click();
            loginMessage.textContent = 'لطفا با حساب جدید خود وارد شوید.';
        }, 1500);

    });

    // --- ورود ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        loginMessage.textContent = '';
        const userData = localStorage.getItem('user_' + username);

        if (!userData) {
            loginMessage.textContent = 'نام کاربری یافت نشد.';
            return;
        }

        const user = JSON.parse(userData);

        if (user.password !== password) {
            loginMessage.textContent = 'رمز عبور اشتباه است.';
            return;
        }

        // ورود موفق: ذخیره کاربر و انتقال به پروفایل
        setCurrentUser(username);
        loginMessage.textContent = '✅ ورود موفق. در حال انتقال...';
        loginMessage.classList.remove('error');
        loginMessage.classList.add('success');
        
        // !!! انتقال به صفحه پروفایل !!!
        setTimeout(() => {
            window.location.href = 'profile.html'; 
        }, 500);
    });
    
    // تابع خروج (برای استفاده در profile.html)
    window.logout = function() {
        clearCurrentUser();
        window.location.href = 'login-register.html';
    }
});