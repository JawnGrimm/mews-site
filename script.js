document.addEventListener('alpine:init', () => {
    Alpine.data('newsFeed', () => ({
        // Replace 'YOUR_API_KEY' with your actual NewsAPI key
        apiKey: 38e9949744fa422383b4944c15a3f9b9,
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
