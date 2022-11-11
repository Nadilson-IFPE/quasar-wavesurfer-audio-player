<template>
  <q-page class>
    <div v-if="isMobile()" class="audio-container-mobile">
      <div class="row q-ma-md">
        <div class="col-12">
          <div id="waveform" />

          <div>
            <p class="arquivo">{{ arquivoSelecionado }}</p>
          </div>
          <br />
          <div>
            <p class="arquivo">{{ tamanhoArquivo }}</p>
          </div>
        </div>

        <p class="textoLink">
          Imagem por:
          <a
            href="https://www.freepik.com/free-vector/indie-music-festival-banner-template_14568719.htm"
            target="_blank"
            >Freepik</a
          >
          (clique para visitar)
        </p>
      </div>
    </div>

    <div v-if="!isMobile()" class="audio-container-desktop">
      <div class="row q-ma-md">
        <div class="col-12">
          <div id="waveform" />

          <div>
            <p class="arquivo">{{ arquivoSelecionado }}</p>
          </div>
          <br />
          <div>
            <p class="arquivo">{{ tamanhoArquivo }}</p>
          </div>
        </div>
        <p class="textoLink">
          Imagem por:
          <a
            href="https://www.freepik.com/free-vector/indie-music-festival-banner-template_14568719.htm"
            target="_blank"
            >Freepik</a
          >
          (clique para visitar)
        </p>
      </div>
    </div>

    <div
      class="controls row flex flex-center fixed-bottom q-pb-md q-pt-md shadow-10"
    >
      <div class>
        <q-btn
          color="primary"
          flat
          round
          icon="fast_rewind"
          size="xl"
          @click="wavesurfer.skipBackward(1)"
        />
        <q-btn
          v-if="isPlaying"
          color="primary"
          round
          icon="pause"
          size="xl"
          @click="wavesurfer.playPause()"
        />
        <q-circular-progress
          v-if="isLoading"
          size="72px"
          indeterminate
          color="primary"
        />
        <q-btn
          v-if="!isPlaying && !isLoading"
          color="primary"
          round
          icon="play_arrow"
          size="xl"
          @click="wavesurfer.playPause()"
        />
        <q-btn
          color="primary"
          flat
          round
          icon="fast_forward"
          size="xl"
          @click="wavesurfer.skipForward(1)"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import eventBus from "src/services/event-bus";
import { defineComponent } from "vue";
import WaveSurfer from "wavesurfer.js";

export default defineComponent({
  name: "IndexPage",

  data: () => ({
    wavesurfer: null,
    isLoading: false,
    // tamanhoTela: screen.width + "px/" + screen.height,
    arquivoSelecionado: null,
    tamanhoArquivo: null,
  }),
  async mounted() {
    if (!this.wavesurfer) this.createWaveSurfer();

    eventBus.$on("fileChosen", (file) => {
      this.loadFile(file);
    });
  },

  computed: {
    isPlaying() {
      if (!this.wavesurfer) return false;

      return this.wavesurfer.isPlaying();
    },
  },
  methods: {
    isMobile() {
      /* if (screen.width <= 760) {
        return true;
      } else {
        return false;
      } */

      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },

    createWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        hideScrollbar: true,
        waveColor: "hsla(200, 93%, 34%, 1)",
        progressColor: "white",
        cursorColor: "#fff",
        barWidth: 3,
      });

      this.wavesurfer.on("error", (err) => {
        console.error(err);
        this.isLoading = false;
        this.$q.notify({ message: err });
      });

      this.wavesurfer.on("loading", () => {
        this.isLoading = true;
      });

      this.wavesurfer.on("ready", () => {
        this.isLoading = false;
      });
    },

    loadFile(file) {
      if (file.target.files.length == 0) return;

      this.wavesurfer.loadBlob(file.target.files[0]);

      var seletordeArquivo = document.getElementById("fileInput");
      this.arquivoSelecionado =
        "Arquivo: " + seletordeArquivo.files.item(0).name;
      this.tamanhoArquivo =
        "Tamanho: " +
        (seletordeArquivo.files.item(0).size / 1048576).toFixed(2) +
        "MB";
    },
  },
});
</script>

<style>
.controls {
  background-color: #0b5297;
  align-content: center;
  align-items: center;
}

.audio-container-mobile {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../assets/audio.jpg") no-repeat center;
  background-size: cover;
}

.audio-container-desktop {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../assets/audio-desktop.jpg") no-repeat center;
  background-size: cover;
}

.textoLink {
  position: absolute;
  top: 82%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: white;
  background-color: rgba(238, 235, 235, 0.3);
  padding: 10px;
  align-content: center;
  align-items: center;
  white-space: nowrap;
}

a:link {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

a:visited {
  color: white;
  text-decoration: none;
}

a:hover {
  color: yellow;
  font-weight: bold;
  text-decoration: none;
}

a:active {
  color: white;
  text-decoration: none;
}

.arquivo {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: white;
  padding-top: 20px;
  align-content: center;
  align-items: center;
  white-space: nowrap;
}
</style>
