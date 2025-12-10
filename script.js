// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，初始化功能...');
    
    // 获取所有景点方框元素
    const attractionBoxes = document.querySelectorAll('.attraction-box');
    
    // 为每个景点方框添加点击事件监听器
    attractionBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // 获取景点ID
            const attractionId = this.getAttribute('data-attraction');
            console.log('点击景点:', attractionId);
            // 跳转到介绍页面，并传递景点ID作为查询参数
            window.location.href = `attraction.html?id=${attractionId}`;
        });
    });
    
    // 获取所有美食方框元素
    const foodBoxes = document.querySelectorAll('.food-box');
    
    // 为每个美食方框添加点击事件监听器
    foodBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // 获取美食ID
            const foodId = this.getAttribute('data-food');
            console.log('点击美食:', foodId);
            // 跳转到美食介绍页面，并传递美食ID作为查询参数
            window.location.href = `food.html?food=${foodId}`;
        });
    });
    
    // 导航栏交互
    const navItems = document.querySelectorAll('.nav-item');
    const attractionsSection = document.getElementById('attractions');
    const foodSection = document.getElementById('food');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有激活状态
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            
            // 根据点击的导航项显示对应的内容
            const target = this.querySelector('.nav-link').getAttribute('href');
            
            if (target === '#attractions') {
                if (attractionsSection) {
                    attractionsSection.style.display = 'grid';
                }
                if (foodSection) {
                    foodSection.style.display = 'none';
                }
            } else if (target === '#food') {
                if (attractionsSection) {
                    attractionsSection.style.display = 'none';
                }
                if (foodSection) {
                    foodSection.style.display = 'grid';
                }
            }
        });
    });
    
    // 初始化登录功能
    initLoginFunctionality();
    
    // 初始化搜索功能
    initSearchFunctionality();
    
    // 初始化评分功能（在主页面也需要）
    setTimeout(() => {
        initializeAllRatingSections();
    }, 100);
});

// 搜索功能数据
const searchData = {
    attractions: [
        { id: 'forbidden-city', name: '故宫', description: '北京故宫是中国明清两代的皇家宫殿', type: 'attraction' },
        { id: 'great-wall', name: '八达岭长城', description: '八达岭长城是明长城中保存最好的一段', type: 'attraction' },
        { id: 'summer-palace', name: '颐和园', description: '颐和园是中国现存最大的皇家园林', type: 'attraction' },
        { id: 'bird-nest', name: '鸟巢', description: '国家体育场，2008年北京奥运会主体育场', type: 'attraction' },
        { id: 'yuanmingyuan', name: '圆明园遗址', description: '圆明园遗址公园', type: 'attraction' },
        { id: 'prince-gong-mansion', name: '恭王府博物馆', description: '清代规模最大的一座王府', type: 'attraction' },
        { id: 'universal-studios-beijing', name: '北京环球影城', description: '北京环球度假区', type: 'attraction' },
        { id: 'national-museum', name: '中国国家博物馆', description: '中国最大的综合性博物馆', type: 'attraction' },
        { id: 'beihai-park', name: '北海公园', description: '中国现存最古老、最完整的皇家园林之一', type: 'attraction' }
    ],
    food: [
        { id: 'peking-duck', name: '北京烤鸭', description: '北京著名特产', type: 'food' },
        { id: 'zhajiangmian', name: '炸酱面', description: '老北京传统面食', type: 'food' },
        { id: 'douzhir-jiaoquan', name: '豆汁儿焦圈', description: '老北京传统小吃', type: 'food' },
        { id: 'chaogan', name: '炒肝', description: '老北京传统小吃', type: 'food' },
        { id: 'baodu', name: '爆肚', description: '老北京传统小吃', type: 'food' },
        { id: 'jingjiangrousi', name: '京酱肉丝', description: '传统北京菜', type: 'food' },
        { id: 'lvdagun', name: '驴打滚', description: '老北京传统小吃', type: 'food' },
        { id: 'shuan-yangrou', name: '涮羊肉', description: '老北京传统美食', type: 'food' },
        { id: 'luzhu-huoshao', name: '卤煮火烧', description: '老北京传统小吃', type: 'food' },
        { id: 'mending-roubing', name: '门钉肉饼', description: '老北京传统小吃', type: 'food' }
    ]
};

// 登录功能实现
let loggedInUser = null;
let users = JSON.parse(localStorage.getItem('users')) || {};

// 显示登录模态框
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 切换模态框标签
function switchTab(tabId) {
    console.log('切换到标签:', tabId);
    // 隐藏所有标签内容
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 移除所有标签按钮的激活状态
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示当前标签内容
    const currentTab = document.getElementById(tabId);
    if (currentTab) {
        currentTab.classList.add('active');
    }
    
    // 激活当前标签按钮
    const currentButton = document.querySelector(`[data-tab="${tabId.replace('Tab', '')}"]`);
    if (currentButton) {
        currentButton.classList.add('active');
    }
    
    // 清空消息
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');
    if (loginMessage) loginMessage.textContent = '';
    if (registerMessage) registerMessage.textContent = '';
}

// 隐藏登录模态框
function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // 清除表单内容
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        if (loginForm) {
            loginForm.reset();
        }
        if (registerForm) {
            registerForm.reset();
        }
        // 清除消息
        const loginMessage = document.getElementById('loginMessage');
        const registerMessage = document.getElementById('registerMessage');
        if (loginMessage) loginMessage.textContent = '';
        if (registerMessage) registerMessage.textContent = '';
    }
}

// 处理登录表单提交
function handleLoginSubmit(event) {
    event.preventDefault();
    console.log('登录表单提交');
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');
    
    if (!username || !password) {
        if (loginMessage) {
            loginMessage.textContent = '请填写用户名和密码！';
            loginMessage.style.color = '#f44336';
        }
        return;
    }
    
    // 简单的登录验证
    if (users[username] && users[username] === password) {
        loggedInUser = username;
        localStorage.setItem('loggedInUser', username);
        console.log('登录成功:', username);
        
        hideLoginModal();
        
        // 更新登录按钮显示
        updateLoginButtonState();
        
        // 显示成功消息
        if (loginMessage) {
            loginMessage.textContent = '登录成功！';
            loginMessage.style.color = '#4CAF50';
        }
        
        // 更新评分功能状态
        updateRatingFunctionality();
        
        // 显示登录成功提示
        showNotification('登录成功！');
    } else {
        if (loginMessage) {
            loginMessage.textContent = '用户名或密码错误！';
            loginMessage.style.color = '#f44336';
        }
    }
}

// 处理注册表单提交
function handleRegisterSubmit(event) {
    event.preventDefault();
    console.log('注册表单提交');
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registerMessage = document.getElementById('registerMessage');
    
    // 表单验证
    if (!username || !password || !confirmPassword) {
        registerMessage.textContent = '请填写所有字段！';
        registerMessage.style.color = '#f44336';
        return;
    }
    
    if (username.length < 3) {
        registerMessage.textContent = '用户名至少3个字符！';
        registerMessage.style.color = '#f44336';
        return;
    }
    
    if (password.length < 6) {
        registerMessage.textContent = '密码至少6个字符！';
        registerMessage.style.color = '#f44336';
        return;
    }
    
    if (password !== confirmPassword) {
        registerMessage.textContent = '两次输入的密码不一致！';
        registerMessage.style.color = '#f44336';
        return;
    }
    
    if (users[username]) {
        registerMessage.textContent = '用户名已存在！';
        registerMessage.style.color = '#f44336';
        return;
    }
    
    // 注册新用户
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    
    registerMessage.textContent = '注册成功！2秒后自动跳转到登录';
    registerMessage.style.color = '#4CAF50';
    
    // 2秒后切换到登录标签
    setTimeout(() => {
        switchTab('loginTab');
        // 自动填充用户名
        document.getElementById('loginUsername').value = username;
        document.getElementById('loginPassword').value = '';
        registerMessage.textContent = '';
    }, 2000);
}

// 更新登录按钮状态
function updateLoginButtonState() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    
    if (loggedInUser) {
        // 已登录状态
        loginBtn.innerHTML = `<span>${loggedInUser}</span><span class="logout-icon">🚪</span>`;
        loginBtn.style.pointerEvents = 'auto';
        loginBtn.style.backgroundColor = '#ff6b6b';
        loginBtn.style.cursor = 'pointer';
        
        // 移除旧的事件监听器
        loginBtn.replaceWith(loginBtn.cloneNode(true));
        const newLoginBtn = document.getElementById('loginBtn');
        
        // 添加注销功能
        newLoginBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showLogoutConfirmation();
        });
    } else {
        // 未登录状态
        loginBtn.textContent = '登录';
        loginBtn.style.backgroundColor = '#4CAF50';
        loginBtn.style.cursor = 'pointer';
        
        // 移除旧的事件监听器
        loginBtn.replaceWith(loginBtn.cloneNode(true));
        const newLoginBtn = document.getElementById('loginBtn');
        
        // 添加登录功能
        newLoginBtn.addEventListener('click', showLoginModal);
    }
}

// 显示注销确认
function showLogoutConfirmation() {
    // 创建确认对话框
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'logout-confirmation';
    confirmDiv.innerHTML = `
        <div class="logout-modal">
            <h3>确认注销</h3>
            <p>确定要注销账号吗？</p>
            <div class="logout-buttons">
                <button class="logout-confirm-btn">确认注销</button>
                <button class="logout-cancel-btn">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmDiv);
    
    // 绑定按钮事件
    confirmDiv.querySelector('.logout-confirm-btn').addEventListener('click', function() {
        logoutUser();
        confirmDiv.remove();
    });
    
    confirmDiv.querySelector('.logout-cancel-btn').addEventListener('click', function() {
        confirmDiv.remove();
    });
    
    // 点击外部关闭
    confirmDiv.addEventListener('click', function(e) {
        if (e.target === confirmDiv) {
            confirmDiv.remove();
        }
    });
}

// 注销用户
function logoutUser() {
    loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    
    // 更新登录按钮状态
    updateLoginButtonState();
    
    // 更新评分功能状态
    updateRatingFunctionality();
    
    // 显示注销成功提示
    showNotification('已成功注销账号', 'success');
}

// 显示通知
function showNotification(message, type = 'success') {
    // 移除已有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 更新评分功能状态
function updateRatingFunctionality() {
    const ratingSections = document.querySelectorAll('.rating-section');
    ratingSections.forEach(section => {
        const ratingInputs = section.querySelectorAll('input[type="radio"], textarea');
        const submitBtn = section.querySelector('.submit-rating');
        const stars = section.querySelectorAll('.rating-star');
        
        if (loggedInUser) {
            // 用户已登录，启用评分功能
            ratingInputs.forEach(input => {
                input.disabled = false;
                input.style.opacity = '1';
                input.style.cursor = 'pointer';
            });
            stars.forEach(star => {
                star.style.cursor = 'pointer';
                star.style.opacity = '1';
            });
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        } else {
            // 用户未登录，禁用评分功能
            ratingInputs.forEach(input => {
                input.disabled = true;
                input.style.opacity = '0.6';
                input.style.cursor = 'not-allowed';
            });
            stars.forEach(star => {
                star.style.cursor = 'not-allowed';
                star.style.opacity = '0.6';
            });
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.6';
                submitBtn.style.cursor = 'not-allowed';
            }
        }
    });
}

// 初始化登录功能
function initLoginFunctionality() {
    console.log('初始化登录功能');
    
    // 获取登录按钮
    const loginBtn = document.getElementById('loginBtn');
    // 获取登录模态框
    const loginModal = document.getElementById('loginModal');
    // 获取关闭按钮
    const closeBtn = document.querySelector('.close-button');
    // 获取登录表单
    const loginForm = document.getElementById('loginForm');
    // 获取注册表单
    const registerForm = document.getElementById('registerForm');
    // 获取标签按钮
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // 检查是否已登录
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
        loggedInUser = savedUser;
        console.log('已登录用户:', savedUser);
    }
    
    // 更新登录按钮状态
    updateLoginButtonState();
    
    // 绑定登录按钮点击事件
    if (loginBtn && !loggedInUser) {
        loginBtn.addEventListener('click', showLoginModal);
    }
    
    // 绑定关闭按钮点击事件
    if (closeBtn) {
        closeBtn.addEventListener('click', hideLoginModal);
    }
    
    // 点击模态框外部关闭模态框
    if (loginModal) {
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                hideLoginModal();
            }
        });
    }
    
    // 绑定登录表单提交事件
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // 绑定注册表单提交事件
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // 绑定标签按钮点击事件
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            console.log('点击标签:', tabId);
            switchTab(tabId + 'Tab');
        });
    });
    
    // 初始化评分功能
    initRatingFunctionality();
}

// 初始化评分功能
function initRatingFunctionality() {
    console.log('初始化评分功能');
    
    // 更新评分功能状态（根据登录状态）
    updateRatingFunctionality();
    
    // 绑定星级评分点击事件
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            if (!loggedInUser) {
                showNotification('请先登录才能进行评分！', 'error');
                return;
            }
            
            const rating = this.dataset.rating;
            const ratingSection = this.closest('.rating-section');
            const stars = ratingSection.querySelectorAll('.rating-star');
            const radioInput = ratingSection.querySelector(`input[value="${rating}"]`);
            
            // 更新星级显示
            stars.forEach(s => {
                s.classList.remove('active');
                if (s.dataset.rating <= rating) {
                    s.classList.add('active');
                }
            });
            
            // 选中对应的单选按钮
            if (radioInput) {
                radioInput.checked = true;
            }
        });
    });
    
    // 绑定提交评价按钮点击事件
    const submitRatingBtns = document.querySelectorAll('.submit-rating');
    submitRatingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!loggedInUser) {
                showNotification('请先登录才能提交评价！', 'error');
                return;
            }
            
            const itemId = this.dataset.item;
            const ratingSection = this.closest('.rating-section');
            const selectedRating = ratingSection.querySelector('input[type="radio"]:checked');
            const comment = ratingSection.querySelector('.rating-textarea').value;
            
            if (!selectedRating) {
                showNotification('请选择评分星级！', 'error');
                return;
            }
            
            if (!comment.trim()) {
                showNotification('请输入评价内容！', 'error');
                return;
            }
            
            if (comment.trim().length < 3) {
                showNotification('评价内容至少3个字符！', 'error');
                return;
            }
            
            const ratingValue = parseInt(selectedRating.value);
            submitRating(itemId, ratingValue, comment);
        });
    });
}

// 初始化所有评分区域
function initializeAllRatingSections() {
    // 获取所有评分区域
    const ratingSections = document.querySelectorAll('.rating-section');
    
    // 显示每个项目的评价
    ratingSections.forEach(section => {
        const itemId = section.dataset.item;
        if (itemId) {
            displayRatings(itemId);
        }
    });
    
    // 重新绑定评分事件
    initRatingFunctionality();
}

// 提交评价
function submitRating(itemId, rating, comment) {
    console.log('提交评价:', itemId, rating, comment);
    
    // 创建评价对象
    const newRating = {
        id: Date.now(),
        user: loggedInUser,
        rating: rating,
        comment: comment,
        date: new Date().toLocaleString()
    };
    
    // 从localStorage获取现有评价
    const ratingsKey = `ratings_${itemId}`;
    let ratings = JSON.parse(localStorage.getItem(ratingsKey) || '[]');
    
    // 检查用户是否已经评价过
    const userExistingRating = ratings.find(r => r.user === loggedInUser);
    if (userExistingRating) {
        // 更新现有评价
        userExistingRating.rating = rating;
        userExistingRating.comment = comment;
        userExistingRating.date = new Date().toLocaleString();
    } else {
        // 添加新评价
        ratings.push(newRating);
    }
    
    // 保存到localStorage
    localStorage.setItem(ratingsKey, JSON.stringify(ratings));
    
    // 显示评价
    displayRatings(itemId);
    
    // 清空表单
    const ratingSection = document.querySelector(`[data-item="${itemId}"]`);
    const textarea = ratingSection.querySelector('.rating-textarea');
    const radioInputs = ratingSection.querySelectorAll('input[type="radio"]');
    const stars = ratingSection.querySelectorAll('.rating-star');
    
    textarea.value = '';
    radioInputs.forEach(input => input.checked = false);
    stars.forEach(star => star.classList.remove('active'));
    
    showNotification('评价提交成功！');
}

// 显示评价
function displayRatings(itemId) {
    const ratingsKey = `ratings_${itemId}`;
    const ratings = JSON.parse(localStorage.getItem(ratingsKey) || '[]');
    const ratingsDisplay = document.getElementById(`ratings-${itemId}`);
    
    if (!ratingsDisplay) return;
    
    // 清空现有评价
    ratingsDisplay.innerHTML = '';
    
    // 计算平均评分
    const averageRating = ratings.length > 0 ? 
        (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : 0;
    
    // 创建评分统计
    const statsHTML = `
        <div class="rating-stats">
            <div class="average-rating">
                <span class="average-number">${averageRating}</span>
                <span class="total-ratings">(${ratings.length}条评价)</span>
            </div>
        </div>
    `;
    
    ratingsDisplay.innerHTML = statsHTML;
    
    // 如果没有评价
    if (ratings.length === 0) {
        ratingsDisplay.innerHTML += '<div class="no-ratings"><p>暂无评价，快来成为第一个评价的人吧！</p></div>';
        return;
    }
    
    // 创建评价元素（按时间倒序）
    ratings.sort((a, b) => b.id - a.id).forEach(rating => {
        const ratingElement = document.createElement('div');
        ratingElement.className = 'rating-item';
        
        // 创建星级显示
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += i <= rating.rating ? '★' : '☆';
        }
        
        ratingElement.innerHTML = `
            <div class="rating-header">
                <div class="user-info">
                    <span class="rating-user">${rating.user}</span>
                    <div class="rating-stars-display">${starsHTML}</div>
                </div>
                <span class="rating-date">${rating.date}</span>
            </div>
            <div class="rating-comment">${rating.comment}</div>
        `;
        
        ratingsDisplay.appendChild(ratingElement);
    });
}

// 搜索功能实现
function initSearchFunctionality() {
    console.log('初始化搜索功能');
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput || !searchButton || !searchSuggestions) return;
    
    // 搜索建议功能
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length === 0) {
            searchSuggestions.style.display = 'none';
            return;
        }
        
        const suggestions = generateSearchSuggestions(query);
        displaySearchSuggestions(suggestions);
    });
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            performSearch(query);
        }
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        }
    });
    
    // 点击外部关闭搜索建议
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            searchSuggestions.style.display = 'none';
        }
    });
}

// 生成搜索建议
function generateSearchSuggestions(query) {
    const allItems = [...searchData.attractions, ...searchData.food];
    return allItems.filter(item => {
        return item.name.toLowerCase().includes(query) || 
               item.description.toLowerCase().includes(query);
    });
}

// 显示搜索建议
function displaySearchSuggestions(suggestions) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    searchSuggestions.innerHTML = '';
    
    if (suggestions.length === 0) {
        searchSuggestions.style.display = 'none';
        return;
    }
    
    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'search-suggestion-item';
        item.innerHTML = `
            <span class="suggestion-name">${suggestion.name}</span>
            <span class="suggestion-type">${suggestion.type === 'attraction' ? '景点' : '美食'}</span>
        `;
        
        // 点击建议项进行搜索
        item.addEventListener('click', function() {
            document.getElementById('searchInput').value = suggestion.name;
            performSearch(suggestion.name);
            searchSuggestions.style.display = 'none';
        });
        
        searchSuggestions.appendChild(item);
    });
    
    searchSuggestions.style.display = 'block';
}

// 执行搜索
function performSearch(query) {
    console.log('执行搜索:', query);
    const allItems = [...searchData.attractions, ...searchData.food];
    const results = allItems.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase()) || 
               item.description.toLowerCase().includes(query.toLowerCase());
    });
    
    if (results.length === 0) {
        showNotification(`未找到与"${query}"相关的内容`, 'error');
        return;
    }
    
    // 找到第一个结果并跳转
    const firstResult = results[0];
    if (firstResult.type === 'attraction') {
        window.location.href = `attraction.html?id=${firstResult.id}`;
    } else {
        window.location.href = `food.html?food=${firstResult.id}`;
    }
}