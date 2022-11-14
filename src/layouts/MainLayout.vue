<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-btn round @click="persistent = true">
          <q-avatar size="40px">
            <img src="../assets/app_icon.png" />
          </q-avatar>
        </q-btn>
        <q-toolbar-title> Cool Player </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->

        <q-btn color="white" text-color="primary">
          Abrir arquivo
          <input
            id="fileInput"
            type="file"
            class="q-uploader__input overflow-hidden absolute-full"
            v-on:change="fileChosen"
            ref="fileInput"
            accept="audio/mpeg"
          />
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="my-card">
        <div align="center" class="q-pt-md q-pb-md">
          <q-img src="../assets/app_icon.png" width="130px" height="130px" />
        </div>
        <q-card-section style="background: white">
          <div align="center" class="col text-h6 ellipsis">Cool Player</div>
          <div align="center" class="text-subtitle2 text-grey">
            by Nadilson v1.0
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="background: white">
          <div class="text-caption text-grey">
            <p>
              Baseado no tutorial "How to build a SoundCloud-like audio player
              app with VueJS, Quasar and WaveSurfer", disponível
              <a
                href="https://www.learningsomethingnew.com/how-to-build-a-sound-cloud-like-audio-player-app-with-vue-js-quasar-and-wave-surfer"
                target="_blank"
                >aqui</a
              >.
            </p>

            <p>
              Fonte da imagem utilizada como plano de fundo no app:
              <a
                href="https://www.freepik.com/free-vector/indie-music-festival-banner-template_14568719.htm"
                target="_blank"
                >Freepik</a
              >.
            </p>
            <p>
              Bug fixes, design, melhorias, personalização e outras
              funcionalidades:
              <a href="https://github.com/Nadilson-IFPE" target="_blank"
                >Nadilson</a
              >.
            </p>
            <p>
              O código-fonte pode ser obtido
              <a
                href="https://github.com/Nadilson-IFPE/quasar-wavesurfer-audio-player"
                target="_blank"
                >aqui</a
              >.
            </p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" style="background: white">
          <q-btn v-close-popup flat color="primary" label="OK" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
//import EssentialLink from "components/EssentialLink.vue";
import eventBus from "src/services/event-bus";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  methods: {
    fileChosen(file) {
      // Chosen file passed as argument
      eventBus.$emit("fileChosen", file);
    },
  },

  /* setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  }, */

  setup() {
    return {
      card: ref(false),
      persistent: ref(false),
    };
  },
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 340px;
  align-content: center;
  align-items: center;
  text-align: justify;
  text-justify: inter-word;
  background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
}

a:link {
  color: blue;
  text-decoration: none;
}

a:visited {
  color: blue;
  text-decoration: none;
}

a:hover {
  color: red;
  text-decoration: none;
}

a:active {
  color: white;
  text-decoration: none;
}
</style>
