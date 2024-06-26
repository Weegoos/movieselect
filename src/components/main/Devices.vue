<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <p class="text-white">
      We Provide you streaming experience across various devices.
    </p>
    <p class="text-grey">
      With StreamVibe, you can enjoy your favorite movies and TV shows anytime,
      anywhere. Our platform is designed to be compatible with a wide range of
      devices, ensuring that you never miss a moment of entertainment.
    </p>

    <div :class="[$q.screen.width < 1150 ? 'column' : 'row']">
      <div
        class="deviceContainer col q-mt-md"
        v-for="device in devicesTop"
        :key="device.id"
      >
        <div class="q-ml-lg devicesDiv">
          <q-img
            :src="device.icon"
            alt=""
            style="width: 35px; height: 35px"
            class="q-ma-md"
          />
          <span class="text-white deviceName q-ma-md">{{ device.name }}</span>
          <p class="text-grey deviceDescription q-ma-md">
            {{ device.description }}
          </p>
        </div>
      </div>
    </div>

    <div :class="[$q.screen.width < 1150 ? 'column' : 'row']">
      <div
        class="deviceContainer col q-mt-md"
        v-for="device in devicesBottom"
        :key="device.id"
      >
        <div class="q-ml-lg devicesDiv">
          <q-img
            :src="device.icon"
            alt=""
            style="width: 35px; height: 35px"
            class="q-ma-md"
          />
          <span class="text-white deviceName q-ma-md">{{ device.name }}</span>
          <p class="text-grey deviceDescription q-ma-md">
            {{ device.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import smartphones from "../../assets/mainPage/smartphones.png";
import tablet from "../../assets/mainPage/tablet.png";
import smartTv from "../../assets/mainPage/smartTv.png";
import laptop from "../../assets/mainPage/laptop.png";
import gaming from "../../assets/mainPage/gaming.png";
import vr from "../../assets/mainPage/vr.png";

const devicesTop = [
  {
    id: 1,
    name: "Smartphones",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: smartphones,
  },
  {
    id: 2,
    name: "Tablet",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: tablet,
  },
  {
    id: 3,
    name: "Smart TV",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: smartTv,
  },
];

const devicesBottom = [
  {
    id: 1,
    name: "Laptops",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: laptop,
  },
  {
    id: 2,
    name: "Gaming Consoles",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: gaming,
  },
  {
    id: 3,
    name: "VR Headsets ",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    icon: vr,
  },
];
</script>

<style>
.deviceContainer {
  align-self: center;
}
.devicesDiv {
  background: linear-gradient(50deg, #262626 50%, #e50000 220%);
  width: 350px;
  height: 283px;
  border-radius: 7px;
}

.deviceName {
  font-size: 30px;
  font-weight: bold;
}

.deviceDescription {
  width: 90%;
}
</style>
