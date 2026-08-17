document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.body.removeAttribute('data-theme');
      themeToggleBtn.textContent = '🌙';
    } else {
      document.body.setAttribute('data-theme', 'light');
      themeToggleBtn.textContent = '☀️';
    }
  });

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.btn-filter');
  const cards = document.querySelectorAll('.card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-role') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Like Buttons
  const cardsGrid = document.getElementById('cardsGrid');
  const totalLikesElement = document.getElementById('totalLikes');
  let totalLikes = 24;

  cardsGrid.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.btn-like');
    if (likeBtn) {
      const countSpan = likeBtn.querySelector('.like-count');
      let currentLikes = parseInt(countSpan.textContent, 10);
      currentLikes += 1;
      countSpan.textContent = currentLikes;

      totalLikes += 1;
      if (totalLikesElement) {
        totalLikesElement.textContent = totalLikes;
      }

      // Small bounce animation
      likeBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 200);
    }
  });

  // Modal Functionality
  const modal = document.getElementById('addModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const addForm = document.getElementById('addMemberForm');
  const memberCountElement = document.getElementById('memberCount');

  const openModal = () => modal.classList.add('active');
  const closeModal = () => {
    modal.classList.remove('active');
    addForm.reset();
  };

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle Form Submission
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inputName').value.trim();
    const dept = document.getElementById('inputDept').value.trim();
    const role = document.getElementById('inputRole').value;
    const bio = document.getElementById('inputBio').value.trim() || 'よろしくお願いします！';
    const tagsInput = document.getElementById('inputTags').value.trim();

    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['インターン'];

    // Generate Avatar seed
    const avatarSeed = encodeURIComponent(name);

    // Create New Card Element
    const newCard = document.createElement('article');
    newCard.className = 'card';
    newCard.setAttribute('data-role', role);

    const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const roleLabel = role === 'mentor' ? 'メンター / 社員' : 'インターン生';

    newCard.innerHTML = `
      <div class="card-header">
        <div class="avatar-wrapper">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}" alt="${name}" class="avatar">
          <span class="role-badge ${role}">${roleLabel}</span>
        </div>
        <button class="btn-like">
          <span class="heart">❤️</span> <span class="like-count">0</span>
        </button>
      </div>
      <div class="card-body">
        <h3 class="member-name">${name}</h3>
        <p class="member-dept">${dept}</p>
        <p class="member-bio">${bio}</p>
        <div class="tag-list">
          ${tagsHTML}
        </div>
      </div>
    `;

    cardsGrid.appendChild(newCard);

    // Update count
    const currentCount = parseInt(memberCountElement.textContent, 10);
    memberCountElement.textContent = currentCount + 1;

    closeModal();
  });
});
