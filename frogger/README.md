# Frogger - Jogo de Lógica

Este é um jogo de lógica inspirado no clássico **Frogger**, onde o objetivo é guiar um sapo através de um ambiente perigoso, evitando carros e atravessando o rio com a ajuda de troncos. O jogo foi desenvolvido usando HTML, CSS e JavaScript.

---

## Como Jogar

1. **Iniciar o Jogo:**
   - Ao abrir o jogo, uma tela de introdução é exibida com as instruções.
   - Clique em **"Iniciar Jogo"** para começar.

2. **Controles:**
   - Use as **setas do teclado** para mover o sapo:
     - **↑ (Cima):** Move o sapo para cima.
     - **↓ (Baixo):** Move o sapo para baixo.
     - **← (Esquerda):** Move o sapo para a esquerda.
     - **→ (Direita):** Move o sapo para a direita.

3. **Objetivo:**
   - Leve o sapo até o topo do tabuleiro, alcançando as áreas de vitória.
   - Evite colidir com os carros ou cair no rio.
   - Você tem **3 vidas**. Se perder todas, o jogo acaba.

4. **Vitória:**
   - Para vencer, o sapo deve alcançar todas as áreas de vitória no topo do tabuleiro.

5. **Reiniciar:**
   - Se perder ou vencer, pressione **"Enter"** para reiniciar o jogo.

---

## Como Executar o Jogo com Podman e Nginx

### Pré-requisitos
- **Podman** instalado na sua máquina. Se ainda não tiver, siga as instruções de instalação no [site oficial do Podman](https://podman.io/getting-started/installation).

### Passos para Construir e Executar a Imagem

1. **Navegue até o diretório do projeto:**
   ```bash
   cd /caminho/para/o/projeto
   ```

2. **Construa a imagem do jogo:**
   ```bash
   podman build -t frogger-nginx .
   ```
   - O comando acima cria uma imagem chamada `frogger-nginx` a partir do `Dockerfile`.

3. **Execute o contêiner:**
   ```bash
   podman run -d -p 8080:80 --name frogger-container frogger-nginx
   ```
   - O comando acima executa o contêiner em segundo plano (`-d`), mapeia a porta 80 do contêiner para a porta 8080 da sua máquina (`-p 8080:80`) e dá ao contêiner o nome `frogger-container`.

4. **Acesse o jogo:**
   Abra o navegador e acesse:
   ```
   http://localhost:8080
   ```

5. **Parar o contêiner:**
   Se precisar parar o contêiner, use o comando:
   ```bash
   podman stop frogger-container
   ```

6. **Remover o contêiner:**
   Para remover o contêiner após parar, use:
   ```bash
   podman rm frogger-container
   ```

7. **Remover a imagem:**
   Se quiser remover a imagem, use:
   ```bash
   podman rmi frogger-nginx
   ```

---

## Funcionalidades do Jogo

### 1. **Tabuleiro e Elementos**
   - O tabuleiro é composto por:
     - **Estrada:** Onde os carros se movem.
     - **Rio:** Onde os troncos flutuam.
     - **Áreas de Vitória:** Localizadas no topo do tabuleiro.
   - O sapo é representado por um sprite animado.

### 2. **Carros**
   - Os carros se movem horizontalmente pela estrada.
   - Se o sapo colidir com um carro, ele perde uma vida.

### 3. **Troncos**
   - Os troncos flutuam no rio.
   - O sapo pode pular nos troncos para atravessar o rio.
   - Se o sapo cair no rio sem estar em um tronco, ele perde uma vida.

### 4. **Vidas e Pontuação**
   - O jogador começa com **3 vidas**, representadas por corações no canto inferior esquerdo.
   - Cada vez que o sapo alcança uma área de vitória, ele marca um ponto.
   - O jogo é vencido quando todas as áreas de vitória são alcançadas.

### 5. **Animações e Sons**
   - O sapo tem sprites animados para cada direção de movimento.
   - Efeitos sonoros são reproduzidos ao pular e ao perder uma vida.

### 6. **Modais de Interface**
   - **Modal de Introdução:** Exibe as instruções do jogo.
   - **Modal de Game Over:** Exibido quando o jogador perde todas as vidas.
   - **Modal de Vitória:** Exibido quando o jogador completa o objetivo.

---

## Estrutura do Projeto

```
.
├── Dockerfile
├── view/
│   ├── index.html
│   └── confirmacao.html
├── public/
│   └── js/
│       └── main.js
├── styles.css
└── README.md
```

---

## Dockerfile com Nginx

O `Dockerfile` é usado para construir a imagem do jogo com o Nginx. Aqui está o conteúdo:

```Dockerfile
# Usar uma imagem base leve com Nginx
FROM nginx:alpine

# Copiar os arquivos estáticos do projeto para o diretório do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 (porta padrão do Nginx)
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
```

---

## Melhorias Futuras

- **Níveis de Dificuldade:** Adicionar diferentes níveis com aumento de velocidade dos carros e troncos.
- **Pontuação:** Implementar um sistema de pontuação baseado no tempo ou número de movimentos.
- **Multiplayer:** Adicionar suporte para dois jogadores competindo ou cooperando.
- **Novos Obstáculos:** Incluir mais elementos, como trens ou animais.
