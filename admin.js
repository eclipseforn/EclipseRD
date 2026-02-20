import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

window.login = async function() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login feito com sucesso!");
  } catch (error) {
    alert("Erro no login: " + error.message);
  }
}

window.salvarProduto = async function() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const imagem = document.getElementById("imagem").value;

  try {
    await addDoc(collection(db, "produtos"), {
      nome,
      preco,
      imagem
    });

    alert("Produto salvo!");
    carregar();
  } catch (error) {
    alert("Erro ao salvar: " + error.message);
  }
}

async function carregar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "produtos"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    lista.innerHTML += `<p>${data.nome} - R$ ${data.preco}</p>`;
  });
}

carregar();
