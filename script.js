let posts = [];

function postarFoto() {
  const nome = document.getElementById('nomePet').value;
  const arquivo = document.getElementById('fotoPet').files[0];
  const privacidade = document.getElementById('privacidade').value;

  if (!nome || !arquivo) {
    alert('Preencha todos os campos!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const foto = e.target.result;
    posts.unshift({ nome, foto, privacidade });
    renderizarFeed();
  };
  reader.readAsDataURL(arquivo);

  document.getElementById('nomePet').value = '';
  document.getElementById('fotoPet').value = '';
}

function renderizarFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';

  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <img src="${post.foto}" alt="Foto de ${post.nome}" />
      <div class="info">
        <h3>${post.nome}</h3>
        <p>Privacidade: ${post.privacidade}</p>
      </div>
    `;
    feed.appendChild(div);
  });
}

// Salvar
localStorage.setItem('posts', JSON.stringify(posts));
// Carregar (no início do script)
const saved = JSON.parse(localStorage.getItem('posts'));
if (saved) {
  posts = saved;
  renderizarFeed();
}



let stories = [];

function adicionarStory() {
  const arquivo = document.getElementById('fotoStory').files[0];
  if (!arquivo) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const foto = e.target.result;
    stories.unshift(foto);
    renderizarStories();
  };
  reader.readAsDataURL(arquivo);

  document.getElementById('fotoStory').value = '';
}

function renderizarStories() {
  const container = document.getElementById('storiesContainer');
  container.innerHTML = '';

  stories.forEach((foto, index) => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `<img src="${foto}" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">`;
    div.onclick = () => abrirStory(index);
    container.appendChild(div);
  });
}

function abrirStory(index) {
  const modal = document.getElementById('storyModal');
  const img = document.getElementById('storyImage');
  img.src = stories[index];
  modal.style.display = 'flex';
}

function fecharStory() {
  document.getElementById('storyModal').style.display = 'none';
}

function navegar(pagina) {
    switch (pagina) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'explorar':
        alert('Funcionalidade Explorar em desenvolvimento!');
        break;
      case 'pesquisar':
        const termo = prompt('Digite o que deseja pesquisar:');
        if (termo) {
          alert(`Você pesquisou por: ${termo}`);
        }
        break;
      case 'mensagens':
        alert('Funcionalidade Mensagens em desenvolvimento!');
        break;
      case 'notificacoes':
        alert('Você não tem notificações no momento.');
        break;
    }
  }
  
