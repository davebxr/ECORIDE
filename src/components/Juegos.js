<template>
  <div class="min-h-screen bg-green-100 p-4 flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-green-800 mb-4">Memorama Ecológico</h1>

    <div class="grid" :style="gridStyle">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ flipped: isFlipped(index), matched: matchedCards.includes(index) }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <img :src="card" class="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="gameWon"
      class="fixed inset-0 bg-green-800 bg-opacity-90 flex flex-col items-center justify-center text-white z-50 animate-fade-in"
    >
      <h2 class="text-5xl font-bold mb-4 animate-bounce">¡Ganaste!</h2>
      <p class="text-2xl">+120 puntos</p>
      <button @click="resetGame" class="mt-6 px-4 py-2 bg-white text-green-800 font-bold rounded shadow hover:bg-green-200 transition">
        Jugar de nuevo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://i.imgur.com/8Qf2QXt.png',
        'https://i.imgur.com/xzT4C9k.png',
        'https://i.imgur.com/JkwqF8R.png',
        'https://i.imgur.com/sBpoZTW.png',
        'https://i.imgur.com/hnSOMwM.png',
        'https://i.imgur.com/bI8qbbx.png',
        'https://i.imgur.com/NFbLvGr.png',
        'https://i.imgur.com/dL2lYuG.png'
      ],
      cards: [],
      flippedIndices: [],
      matchedCards: [],
      gameWon: false,
    };
  },
  computed: {
    gridStyle() {
      const columns = Math.floor(Math.sqrt(this.cards.length));
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(60px, 1fr))`,
        gap: '12px',
        maxWidth: '100%',
      };
    },
  },
  created() {
    this.setupCards();
  },
  methods: {
    setupCards() {
      const totalPairs = this.images.length;
      const selected = [...this.images, ...this.images];
      this.cards = this.shuffle(selected);
      this.flippedIndices = [];
      this.matchedCards = [];
      this.gameWon = false;
    },
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    flipCard(index) {
      if (this.flippedIndices.length === 2 || this.matchedCards.includes(index)) return;

      if (!this.flippedIndices.includes(index)) {
        this.flippedIndices.push(index);

        if (this.flippedIndices.length === 2) {
          const [first, second] = this.flippedIndices;
          if (this.cards[first] === this.cards[second]) {
            this.matchedCards.push(first, second);
            this.flippedIndices = [];
            if (this.matchedCards.length === this.cards.length) {
              this.gameWon = true;
            }
          } else {
            setTimeout(() => {
              this.flippedIndices = [];
            }, 800);
          }
        }
      }
    },
    isFlipped(index) {
      return this.flippedIndices.includes(index) || this.matchedCards.includes(index);
    },
    resetGame() {
      this.setupCards();
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  aspect-ratio: 1/1;
  perspective: 800px;
  cursor: pointer;
}
.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}
.card.flipped .card-inner,
.card.matched .card-inner {
  transform: rotateY(180deg);
}
.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.card-front {
  background-color: #2f855a;
}
.card-back {
  transform: rotateY(180deg);
  background-color: #fff;
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
