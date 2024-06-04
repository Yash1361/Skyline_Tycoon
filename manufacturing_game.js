function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
}
