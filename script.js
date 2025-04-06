const files = [
  {
    filename: "script.js",
    language: "javascript",
    content: `document.addEventListener('alpine:init', () => {
        Alpine.data('newsFeed', () => ({
            // IMPORTANT: Replace 'YOUR_API_KEY' with your actual NewsAPI key
            // Get one for free at https://newsapi.org/
            apiKey: '38e9949744fa422383b4944c15a3f9b9', 
            articles: [],
            loading: true,
            error: '',

            fetchNews() {
                this.loading = true;
                this.error = '';
                const url = \`https://newsapi.org/v2/top-headlines?country=us&pageSize=21&apiKey=\${this.apiKey}\`;

                if (this.apiKey === 'YOUR_API_KEY') {
                    this.error = 'Please replace YOUR_API_KEY in script.js with your actual NewsAPI key.';
                    this.loading = false;
                    console.error(this.error);
                    return;
                }

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => { throw new Error(err.message || \`HTTP error! status: \${response.status}\`) });
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.status === 'ok') {
                            this.articles = data.articles;
                        } else {
                            throw new Error(data.message || 'Failed to fetch news');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching news:', error);
                        this.error = \`Failed to load news: \${error.message}. Check API key and network.\`;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            // Simple placeholder for headline transformation
            transformHeadline(headline) {
                // Very basic "brain rot speak" placeholders - expand this significantly!
                const transformations = [
                    (s) => \`\${s} lol\`, 
                    (s) => \`Bruh, \${s}\`, 
                    (s) => \`Is it just me or is \${s} kinda crazy?\`,
                    (s) => \`\${s} 💀\`,
                    (s) => \`Big news: \${s.toLowerCase()} apparently.\`,
                    (s) => \`Wait, \${s}? No way. 🧢\`
                ];
                // Apply a random transformation
                const randomIndex = Math.floor(Math.random() * transformations.length);
                try {
                  return transformations[randomIndex](headline);
                } catch (e) {
                  return headline; // Fallback if transformation fails
                }
            }
        }));
    });

    // Share button functionality
    document.addEventListener('DOMContentLoaded', () => {
        const shareBtn = document.getElementById('shareBtn');
        if(shareBtn) {
            shareBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Check out this Mews Feed!',
                        text: 'See the latest news, meme-style!',
                        url: window.location.href
                    }).then(() => {
                        console.log('Thanks for sharing!');
                    }).catch(console.error);
                } else {
                    // Fallback for browsers that don't support navigator.share
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Feed URL copied to clipboard!');
                    }).catch(err => {
                        alert('Could not copy URL. Please copy it manually.');
                        console.error('Failed to copy URL: ', err);
                    });
                }
            });
        }
    });

    // Simple placeholder image if real image fails to load
    // The @error directive in Alpine handles this more elegantly now,
    // but this is a fallback/alternative.
    /*
    document.addEventListener('error', (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.src = 'placeholder.png';
        }
    }, true); // Use capture phase
    */

    // Note: Create a simple 'placeholder.png' image file (e.g., a gray box)
    // in the same directory for the image error handling to work visually.`
  },
  {
    filename: "mewsley.jpg",
    language: "binary",
    content: "iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+BsXoAAG1flnbAAAAAElFTkSuQmCC"
  }
];
