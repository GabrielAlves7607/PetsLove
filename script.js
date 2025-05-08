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
