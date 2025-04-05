const container = document.getElementById('meme-container');
const sheetUrl = 'https://opensheet.vercel.app/1PYdzyMwUZYCadxjK7Q-w2j2C97Pl6FLkScffTjTYgik/Sheet1';

async function fetchMemes() {
  try {
    const res = await fetch(sheetUrl);
    const data = await res.json();

    data.forEach(meme => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded shadow p-4 flex flex-col space-y-2';

      if (meme['Image URL']) {
        const img = document.createElement('img');
        img.src = meme['Image URL'];
        img.alt = meme['Meme Caption'];
        img.className = 'w-full h-48 object-cover rounded';
        card.appendChild(img);
      }

      const caption = document.createElement('p');
      caption.textContent = meme['Meme Caption'];
      caption.className = 'text-lg font-semibold';
      card.appendChild(caption);

      const headline = document.createElement('a');
      headline.href = meme['URL'];
      headline.target = '_blank';
      headline.rel = 'noopener noreferrer';
      headline.textContent = meme['Headline'];
      headline.className = 'text-blue-600 hover:underline text-sm';
      card.appendChild(headline);

      const source = document.createElement('span');
      source.textContent = meme['Source'];
      source.className = 'text-xs text-gray-500';
      card.appendChild(source);

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = '<p class="text-red-500">Failed to load memes. Try again later.</p>';
    console.error('Error fetching memes:', error);
  }
}

fetchMemes();
