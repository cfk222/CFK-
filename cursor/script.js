// 初始化 AOS
AOS.init({
    duration: 800,
    once: true
});

// 导航切换功能
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.top-nav a');
    const sections = document.querySelectorAll('.section');

    // 默认显示首页
    document.querySelector('#home').classList.add('active');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // 更新导航栏激活状态
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            // 更新内容区域显示
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
});

// 图片加载动画
function loadGalleryImages() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const images = [
        { src: 'images/微信图片_20241227161104.jpg', alt: '我的照片', description: '个人照片' },
        { src: 'images/微信图片_20241227161114.jpg', alt: '生活照', description: '精彩瞬间' },
        { src: 'images/微信图片_20241227161118.jpg', alt: '生活照', description: '日常生活' },
        { src: 'images/微信图片_20241227161123.jpg', alt: '风景照', description: '美好时光' },
        { src: 'images/4a455b84579f07039f3d0dc1a1c004b2.jpg', alt: '风景照', description: '美好瞬间' }
    ];

    images.forEach(image => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        imgContainer.setAttribute('data-aos', 'fade-up');
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        
        const description = document.createElement('p');
        description.className = 'image-description';
        description.textContent = image.description;
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(description);
        galleryGrid.appendChild(imgContainer);
    });
}

// 页面加载完成后加载图片
window.addEventListener('load', loadGalleryImages);

// 添加图片点击放大功能
document.querySelector('.gallery-grid').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${e.target.src}" alt="${e.target.alt}">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function() {
            this.remove();
        });
    }
});

// 添加响应式导航栏
const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleScreenChange(e) {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (e.matches) {
        // 移动端布局
        sidebar.style.position = 'relative';
        mainContent.style.marginLeft = '0';
    } else {
        // 桌面端布局
        sidebar.style.position = 'fixed';
        mainContent.style.marginLeft = '250px';
    }
}

mediaQuery.addListener(handleScreenChange);
handleScreenChange(mediaQuery);

// 显示微信二维码
function showWechatQR() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.opacity = '0';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="images/weixinerweina.jpg" alt="微信二维码" style="width: 300px; height: auto;">
            <p style="text-align: center; margin-top: 10px; color: #666;">���击任意处关闭</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加淡入效果
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.3s ease';
    }, 10);
    
    modal.addEventListener('click', function() {
        // 添加淡出效果
        this.style.opacity = '0';
        setTimeout(() => {
            this.remove();
        }, 300);
    });
} 