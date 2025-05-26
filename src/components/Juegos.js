<template>
  <div class="game-container">
    <div v-if="currentGame === 'memorama'">
      <h1 class="game-title">Memorama Ecológico</h1>
      <div class="grid">
        <div
          v-for="(card, index) in shuffledCards"
          :key="index"
          class="card"
          :class="{ flipped: card.flipped || card.matched }"
          @click="flipCard(index)"
        >
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
              <img :src="card.img" alt="Eco card" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="matchedPairs === cards.length / 2" class="win-screen">
        <div class="win-message">
          <h2>¡Ganaste!</h2>
          <p>+120 puntos</p>
        </div>
      </div>
    </div>
    <div v-else>
      <JuegoDos />
    </div>
  </div>
</template>

<script>
import JuegoDos from './JuegoDos.vue';

export default {
  components: {
    JuegoDos,
  },
  data() {
    return {
      currentGame: 'memorama',
      cards: [
        { id: 1, img: 'img1.jpg' },
        { id: 2, img: 'img2.jpg' },
        { id: 3, img: 'img3.jpg' },
        { id: 4, img: 'img4.jpg' },
        { id: 5, img: 'img5.jpg' },
        { id: 6, img: 'img6.jpg' },
        { id: 7, img: 'img7.jpg' },
        { id: 8, img: 'img8.jpg' },
      ],
      flippedCards: [],
      matchedPairs: 0,
    };
  },
  computed: {
    shuffledCards() {
      const duplicated = [...this.cards, ...this.cards];
      return duplicated
        .map((card) => ({ ...card, flipped: false, matched: false }))
        .sort(() => 0.5 - Math.random());
    },
  },
  methods: {
    flipCard(index) {
      const card = this.shuffledCards[index];
      if (card.flipped || card.matched || this.flippedCards.length === 2) return;
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        setTimeout(() => {
          const [first, second] = this.flippedCards;
          if (first.id === second.id) {
            first.matched = true;
            second.matched = true;
            this.matchedPairs++;
          } else {
            first.flipped = false;
            second.flipped = false;
          }
          this.flippedCards = [];
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f8ff;
  padding: 1rem;
}

.game-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2e7d32;
  text-shadow: 1px 1px 2px #ccc;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  max-width: 800px;
  width: 100%;
}

.card {
  perspective: 1000px;
  width: 100px;
  height: 140px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped .card-inner,
.card.matched .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-front {
  background-color: #a5d6a7;
}

.card-back {
  background-color: #fff;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-back img {
  max-width: 80%;
  max-height: 80%;
}

.win-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 128, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 1s ease-in-out forwards;
}

.win-message {
  text-align: center;
  color: #fff;
  font-size: 2rem;
  animation: scaleUp 0.8s ease-in-out;
}

.win-message p {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
