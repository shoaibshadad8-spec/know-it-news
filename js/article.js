document.addEventListener("DOMContentLoaded", function () {
    // جلب بيانات الخبر من localStorage
    const articleData = JSON.parse(localStorage.getItem('selectedArticle'));

    const container = document.querySelector('#article-details');

    if (!articleData) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h3 class="text-danger">لم يتم العثور على تفاصيل الخبر</h3>
                <a href="index.html" class="btn btn-primary mt-3">العودة للرئيسية</a>
            </div>
        `;
        return;
    }

    const imageUrl = articleData.image_url || 'https://via.placeholder.com/800x400?text=No+Image+Available';
    const description = articleData.description || articleData.content || 'لا يوجد محتوى تفصيلي إضافي لهذا الخبر حالياً.';

    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="badge bg-primary fs-6">${articleData.category ? articleData.category[0].toUpperCase() : 'General'}</span>
            <span class="text-muted small">${articleData.pubDate || ''}</span>
        </div>
        
        <h1 class="mb-4 fw-bold text-dark">${articleData.title}</h1>
        
        <img src="${imageUrl}" class="article-img" alt="${articleData.title}">
        
        <div class="article-body fs-5 text-secondary lh-lg mb-4">
            <p>${description}</p>
        </div>

        <hr class="my-4">

        <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">المصدر: ${articleData.source_id || 'Know IT News'}</small>
            ${articleData.link ? `<a href="${articleData.link}" target="_blank" class="btn btn-success">قراءة الخبر من المصدر الأصلي 🔗</a>` : ''}
        </div>
    `;
});