document.addEventListener('alpine:init', () => {
    Alpine.data('newsFeed', () => ({
        // Replace 'YOUR_API_KEY' with your actual NewsAPI key
        apiKey: 'YOUR_API_KEY',
        articles: [],
        async fetchNews() {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.apiKey}`);
            const data = await response.json();
            this.articles = data.articles;
        },
        init() {
            this.fetchNews();
        }
    }));
});
