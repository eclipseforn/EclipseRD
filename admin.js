import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const loginBox = document.getElementById("loginBox");
const painel = document.getElementById("painel");

window.login = async function() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    loginBox.style.display = "none";
    painel.style.display = "block";
    carregarProdutos();
  } catch (error) {
    alert("Erro no login");
  }
}

window.logout = async function() {
  await signOut(auth);
  location.reload();
}

window.salvarProduto = async function() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const precoAntigo = document.getElementById("precoAntigo").value;
  const imagem = document.getElementById("imagem").value;
  const desconto = document.getElementById("desconto").value;

  await addDoc(collection(db, "produtos"), {
    nome,
    preco,
    precoAntigo,
    imagem,
    desconto
  });

  alert("Produto salvo!");
  carregarProdutos();
}

async function carregarProdutos() {
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "produtos"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    lista.innerHTML += `
      <div class="produto-admin">
        <p>${data.nome} - R$ ${data.preco}</p>
        <button onclick="excluirProduto('${docSnap.id}')">Excluir</button>
      </div>
    `;
  });
}

window.excluirProduto = async function(id) {
  await deleteDoc(doc(db, "produtos", id));
  carregarProdutos();
}
