import { ref } from "@vue/composition-api";

export default function() {
  const speed = ref(0);

  function setSpeed(sp) {
    speed.value = sp;
  }

  return { speed, setSpeed };
}
