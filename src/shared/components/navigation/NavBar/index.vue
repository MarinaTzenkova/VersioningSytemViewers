<template>
  <nav class="relative overflow-hidden">
    <img
      class="header-image absolute h-full"
      src="@/shared/images/banner.svg"
      alt
    />
    <div class="h-16 mt-2 ml-10 absolute">
      <router-link to="/">
        <img src="@/shared/images/logo-white.svg" class="h-full" />
      </router-link>
    </div>
    <div
      class="group block absolute top-0 right-0 mt-6 mr-5 cursor-pointer md:hidden"
      @click="showMobileMenu = !showMobileMenu"
    >
      <div class="w-6 h-1 my-1 bg-blue-100 group-hover:bg-white"></div>
      <div class="w-6 h-1 my-1 bg-blue-100 group-hover:bg-white"></div>
      <div class="w-6 h-1 my-1 bg-blue-100 group-hover:bg-white"></div>
    </div>
    <div
      class="urls relative md:absolute sm:block md:pt-0 md:right-0 md:top-0 md:mt-4"
    >
      <div
        class="mt-32 md:mt-0 ml-4 md:ml-0 md:flex items-baseline"
        :class="{ hidden: !showMobileMenu }"
      >
        <div class="form-layout">
          <div
            v-for="(u, index) in urls"
            :key="u.name"
            class="ml-2 mb-4 md:mb-0 self-center"
          >
            <router-link
              v-if="index != urls.length - 1"
              class="mr-8 no-underline text-blue-100 text-lg font-normal border-b-2 border-transparent py-2"
              :to="u.link"
              >{{ u.name }}</router-link
            >
          </div>
          <div class="hidden md:block mb-4 md:mb-0 self-center h-12">
            <a
              class="cursor-pointer mr-4 text-2xl text-blue-100 font-light hover:text-white"
              @click="showAccountDetails = !showAccountDetails"
            >
              <svg
                v-if="shortLetters == null"
                class="cursor-pointer mr-4 h-12 w-12"
                width="80%"
                height="100%"
                viewBox="0 0 9 9"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
              >
                <path
                  id="Icon_material-account-circle"
                  class="h-12 w-12"
                  d="M4.256,0c-2.335,0 -4.256,1.921 -4.256,4.256c0,2.335 1.921,4.257 4.256,4.257c2.335,0 4.257,-1.922 4.257,-4.257c-0.001,-2.334 -1.922,-4.255 -4.257,-4.256Zm0,1.277c0.701,0 1.277,0.576 1.277,1.277c0,0.7 -0.576,1.277 -1.277,1.277c-0.7,0 -1.277,-0.577 -1.277,-1.277c0,-0.001 0,-0.001 0,-0.002c0,-0.699 0.576,-1.275 1.276,-1.275c0,0 0.001,0 0.001,0Zm0,6.044c-1.026,0 -1.986,-0.515 -2.553,-1.371c0.012,-0.847 1.702,-1.311 2.553,-1.311c0.852,0 2.541,0.464 2.554,1.311c-0.567,0.856 -1.527,1.371 -2.554,1.371Z"
                  style="fill:#fff9f9;fill-rule:nonzero; "
                />
              </svg>
              <svg
                v-else
                id="circle1"
                class="cursor-pointer mr-4 h-12 w-12 text-2xl text-blue-100 font-light"
              >
                <circle cx="25" cy="25" r="22" fill="#A6BC4E" />
                <text
                  x="50%"
                  y="55%"
                  text-anchor="middle"
                  stroke-width="1px"
                  dy=".3em"
                  font-size="18"
                  fill="#ffffff"
                  font-family="sans-serif"
                >
                  {{ shortLetters }}
                </text>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <portal to="popups">
        <button
          v-if="showAccountDetails"
          class="fixed absolute top-0 right-0 left-0 bottom-0 h-full w-full"
          @click="showAccountDetails = false"
        ></button>
        <transition name="slide">
          <div
            v-if="showAccountDetails"
            class="mt-20 mr-1 dropdown top-0 right-0 absolute bg-white rounded-lg shadow-md right-0 p-4"
            style="z-index:9999"
          >
            <a
              id="dropdown"
              class="cursor-pointer block px-4 py-3 border-b text-grey-darkest bg-white flex hover:bg-gray-200 whitespace-no-wrap"
              @click="manage"
            >
              <svg
                v-if="shortLetters == null"
                class="cursor-pointer mr-4 h-12 w-12"
                width="12%"
                height="12%"
                viewBox="0 0 9 9"
                version="1.1"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
              >
                <path
                  id="Icon_material-account-circle"
                  d="M4.256,0c-2.335,0 -4.256,1.921 -4.256,4.256c0,2.335 1.921,4.257 4.256,4.257c2.335,0 4.257,-1.922 4.257,-4.257c-0.001,-2.334 -1.922,-4.255 -4.257,-4.256Zm0,1.277c0.701,0 1.277,0.576 1.277,1.277c0,0.7 -0.576,1.277 -1.277,1.277c-0.7,0 -1.277,-0.577 -1.277,-1.277c0,-0.001 0,-0.001 0,-0.002c0,-0.699 0.576,-1.275 1.276,-1.275c0,0 0.001,0 0.001,0Zm0,6.044c-1.026,0 -1.986,-0.515 -2.553,-1.371c0.012,-0.847 1.702,-1.311 2.553,-1.311c0.852,0 2.541,0.464 2.554,1.311c-0.567,0.856 -1.527,1.371 -2.554,1.371Z"
                />
              </svg>
              <svg
                v-else
                class="cursor-pointer mr-4 h-12 w-12 text-2xl text-blue-100 font-light hover:text-white"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="22"
                  stroke="white"
                  stroke-width="1"
                  fill="#A6BC4E"
                />
                <text
                  x="50%"
                  y="55%"
                  text-anchor="middle"
                  stroke-width="1px"
                  dy=".3em"
                  font-size="18"
                  fill="#ffffff"
                  font-family="sans-serif"
                >
                  {{ shortLetters }}
                </text>
              </svg>
              <div
                v-if="shortLetters == null"
                class="flex justify-end text-md font-semibold text-gray-500 self-center text-center"
              >
                Unknown Username
              </div>
              <div
                v-else
                class="flex justify-end text-md font-semibold text-gray-500 self-center text-center"
              >
                {{ fullName }}
              </div>
            </a>
            <a
              id="dropdown"
              class="cursor-pointer h-25 block px-4 py-3 flex text-grey-darkest bg-white hover:bg-gray-200 whitespace-no-wrap"
              @click="logout"
            >
              <svg
                class="cursor-pointer mr-4 h-12 w-12"
                width="80%"
                height="100%"
                viewBox="0 -2 5 9"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
              >
                <path
                  id="Icon_open-account-logout"
                  xmlns="http://www.w3.org/2000/svg"
                  d="M3.878,0l0,0.776l-3.102,0l0,3.877l3.102,0l0,0.776l-3.878,0l0,-5.429l3.878,0Zm0.775,1.551l1.551,1.163l-1.551,1.164l0,-0.776l-3.102,0l0,-0.775l3.102,0l0,-0.776Z"
                />
              </svg>
              <div
                class="flex justify-end text-md font-semibold text-gray-500 self-center text-center"
              >
                Sign out
              </div>
            </a>
          </div>
        </transition>
      </portal>
      <div
        class="border-t border-white-400 md:hidden"
        :class="{ hidden: !showMobileMenu }"
      >
        <a
          class="cursor-pointer block px-4 py-3 border-b-2 text-blue-100 border-transparent text-lg font-normal flex"
          @click="manage"
        >
          <svg
            v-if="shortLetters == null"
            class="cursor-pointer mr-4 h-12 w-12"
            width="80%"
            height="100%"
            viewBox="0 0 9 9"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          >
            <path
              id="Icon_material-account-circle"
              class="h-12 w-12"
              d="M4.256,0c-2.335,0 -4.256,1.921 -4.256,4.256c0,2.335 1.921,4.257 4.256,4.257c2.335,0 4.257,-1.922 4.257,-4.257c-0.001,-2.334 -1.922,-4.255 -4.257,-4.256Zm0,1.277c0.701,0 1.277,0.576 1.277,1.277c0,0.7 -0.576,1.277 -1.277,1.277c-0.7,0 -1.277,-0.577 -1.277,-1.277c0,-0.001 0,-0.001 0,-0.002c0,-0.699 0.576,-1.275 1.276,-1.275c0,0 0.001,0 0.001,0Zm0,6.044c-1.026,0 -1.986,-0.515 -2.553,-1.371c0.012,-0.847 1.702,-1.311 2.553,-1.311c0.852,0 2.541,0.464 2.554,1.311c-0.567,0.856 -1.527,1.371 -2.554,1.371Z"
              style="fill:#fff9f9;fill-rule:nonzero; "
            />
          </svg>
          <svg
            v-else
            class="cursor-pointer mr-4 h-12 w-12 text-2xl text-blue-100 font-light hover:text-white"
          >
            <circle
              cx="25"
              cy="25"
              r="22"
              stroke="white"
              stroke-width="1"
              fill="#A6BC4E"
            />
            <text
              x="50%"
              y="50%"
              font-size="18"
              fill="#ffffff"
              dy=".2em"
              font-family="sans-serif"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              {{ shortLetters }}
            </text>
          </svg>

          <div
            v-if="shortLetters == null"
            class="flex justify-end text-md font-semibold text-blue-100 self-center text-center"
          >
            Unknown Username
          </div>
          <div
            v-else
            class="flex justify-end text-md font-semibold text-blue-100 self-center text-center"
          >
            {{ fullName }}
          </div>
        </a>
        <a
          class="cursor-pointer block px-4 py-3 border-b-2 text-blue-100 border-transparent text-lg font-normal flex"
          @click="logout"
        >
          <svg
            class="cursor-pointer mr-4 h-12 w-12"
            width="80%"
            height="100%"
            viewBox="0 -2 5 9"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          >
            <path
              id="Icon_open-account-logout"
              xmlns="http://www.w3.org/2000/svg"
              d="M3.878,0l0,0.776l-3.102,0l0,3.877l3.102,0l0,0.776l-3.878,0l0,-5.429l3.878,0Zm0.775,1.551l1.551,1.163l-1.551,1.164l0,-0.776l-3.102,0l0,-0.775l3.102,0l0,-0.776Z"
              style="fill:#fff9f9;fill-rule:nonzero;"
            />
          </svg>
          <div
            class="flex justify-end text-md font-semibold text-blue-100 self-center text-center"
          >
            Sign out
          </div>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      account: null,
      urls: window.GLOBAL_NAVIGATION_URLS || [],
      userName: window.GLOBAL_CURRENT_USER_FULL_NAME || "",
      showMobileMenu: false,
      showAccountDetails: false,
      shortLetters: null,
      fullName: null
    };
  },
  beforeMount() {
    if (this.userName) {
      if (this.userName.indexOf("/") > -1) {
        this.fullName = this.userName.split("/ ");
        this.shortLetters = this.fullName[1].match(/\b(\w)/g);
        this.shortLetters =
          this.shortLetters[0].toUpperCase() +
          this.shortLetters[this.shortLetters.length - 1].toUpperCase();
        this.fullName = this.fullName[1];
      } else {
        this.shortLetters = this.userName.match(/\b(\w)/g);
        this.shortLetters =
          this.shortLetters[0].toUpperCase() +
          this.shortLetters[this.shortLetters.length - 1].toUpperCase();
        this.fullName = this.userName;
      }
    }
  },
  methods: {
    logout() {
      axios.post("/Account/Logoff", {}).then(() => {
        window.location.href = window.location.origin;
      });
    },
    manage() {
      this.$router.push({ name: "manage" });
    }
  }
};
</script>

<style lang="scss" scoped>
$height: 80px;

svg:hover {
  circle {
    stroke: #ffffff;
    stroke-width: 2px;
  }
}

a#dropdown:hover {
  div {
    color: #4188c7;
  }
  svg path {
    fill: #4188c7;
    color: #4188c7;
  }
}
path {
  fill: #c9c9c9;
}
svg text {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
svg text::selection {
  background: none;
}

nav {
  min-height: $height;
  background-color: #4188c7;
}
.header-image {
  z-index: 0;
  width: 1916px;
  // height: 105px;
  max-width: 1916px;
}

.form-layout {
  display: grid;
  grid-template-columns: auto auto auto auto auto 0fr 0.5fr;
  grid-template-areas:
    "label input"
    "empty errors";
}

@media screen and (max-width: 767px) {
  .layout {
    grid-template-areas:
      "label label"
      "input input";
  }
  .form-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "label"
      "input"
      "errors";
    grid-row-gap: 0.3rem;
  }
}

.slide-enter-active,
.slide-leave-active {
  animation: main 0.2s;
  transform-origin: top right;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}

@keyframes main {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
