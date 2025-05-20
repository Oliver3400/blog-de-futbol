document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-articulos");
  const inputBusqueda = document.getElementById("busqueda");

  fetch('data/posts.json')
    .then(res => res.json())
    .then(posts => {
      mostrarArticulos(posts);

      inputBusqueda.addEventListener("input", () => {
        const valor = inputBusqueda.value.toLowerCase();
        const filtrados = posts.filter(p =>
          p.titulo.toLowerCase().includes(valor) ||
          p.resumen.toLowerCase().includes(valor) ||
          p.etiquetas.join(" ").toLowerCase().includes(valor)
        );
        mostrarArticulos(filtrados);
      });
    });

  function mostrarArticulos(articulos) {
    contenedor.innerHTML = "";
    articulos.forEach(post => {
      const art = document.createElement("article");
      art.innerHTML = `
      <a href="${post.archivo}"><img src="${post.imagen}" alt="${post.titulo}" style="width: 50%; height: auto;" />
       <h2 style="text-align: center;">${post.titulo}</h2>
        <p>${post.resumen}</p>
        <small>${post.etiquetas.join(", ")}</small></a>
      `;
      contenedor.appendChild(art);
    });
  }
});
