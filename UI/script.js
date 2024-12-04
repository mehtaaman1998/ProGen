// Function to open product detail modal
function openProductDetail(productName) {
    alert(`Details about ${productName} will appear here.`);
}

// List of video URLs
const videoSources = [
    "assets/video1.mp4",
    "assets/video2.mp4",
    "assets/video3.mp4"
];

const videoElement = document.getElementById("background-video");
let currentVideoIndex = 0;

// Function to play the next video
function playNextVideo() {
    videoElement.src = videoSources[currentVideoIndex];
    videoElement.play();

    // Update to the next video in the list
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
}

// Start playing the first video
playNextVideo();

// Change video every 5 seconds
setInterval(playNextVideo, 5000);

// Modal functionality

// Function to open the modal and display relevant information
function openModal(cardType) {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    const title = document.getElementById("modal-title");
    const description = document.getElementById("modal-description");

    switch (cardType) {
        case 'Digital Marketing':
            title.textContent = 'Digital Marketing';
            description.textContent = 'We help you enhance your online presence with cutting-edge digital marketing strategies, including SEO, social media, and paid ads.';
            break;
        case 'Software Development':
            title.textContent = 'Software Development';
            description.textContent = 'Our expert developers create futuristic, scalable, and robust software solutions for businesses of all sizes.';
            break;
        case 'Prompt Engineering':
            title.textContent = 'Prompt Engineering';
            description.textContent = 'Learn the art of designing effective prompts to get the best results from AI systems, improving your productivity and creativity.';
            break;
        case 'Courses':
            title.textContent = 'Courses';
            description.textContent = 'Access our wide range of courses, from AI to digital marketing, to expand your knowledge and skills in the latest technologies.';
            break;
        default:
            title.textContent = '';
            description.textContent = '';
    }
}

// Function to close the modal
const closeModal = document.getElementById("close-modal");
closeModal.onclick = function() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Close the modal if clicked outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Fetch AI news from NewsAPI
// Currents API Key (replace with your own API key from Currents)
let currentIndex = 0;  // Initialize the starting index
const articlesPerLoad = 3; // Number of articles to load at a time
let articles = [];  // Store the fetched articles

const apiKey = 'rw6oibl2QgrPqCqJyFHQq_AZrYIEO0QP0FeHRaoSNEFy1784';  // Replace with your API key
const blogContainer = document.getElementById('blog-cards');

// Fetch the AI news
function fetchAINews() {
    const query = 'Newgen';  // Fetch news related to AI
    const url = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}&language=en&sortBy=published`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.news || data.news.length === 0) {
                blogContainer.innerHTML = '<p>No AI news available at the moment.</p>';
                return;
            }
            articles = data.news; // Store the fetched articles
            loadArticles();  // Load the first set of 3 articles
        })
        .catch(error => {
            console.error('Error fetching AI news:', error);
            blogContainer.innerHTML = '<p>There was an error fetching the news.</p>';
        });
}

// Function to load 3 articles at a time
function loadArticles() {
    const articlesToLoad = articles.slice(currentIndex, currentIndex + articlesPerLoad);
    blogContainer.innerHTML = '';  // Clear the previous articles

    // Create and append the new articles
    articlesToLoad.forEach(article => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank" style="color: #00FFAB; text-decoration: none;">Read more</a>
        `;
        blogContainer.appendChild(blogCard);
    });
}

// Scroll to the right (load next 3 articles)
function scrollRight() {
    if (currentIndex + articlesPerLoad < articles.length) {
        currentIndex += articlesPerLoad;  // Move to the next set of 3 articles
        loadArticles();  // Load the next set of articles
    }
}

// Scroll to the left (load previous 3 articles)
function scrollLeft() {
    if (currentIndex - articlesPerLoad >= 0) {
        currentIndex -= articlesPerLoad;  // Move to the previous set of 3 articles
        loadArticles();  // Load the previous set of articles
    }
}

// Call the function to fetch AI news on page load
fetchAINews();
