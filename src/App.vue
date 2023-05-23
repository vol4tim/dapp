<template>
  <main-layout v-if="isReady" :title="title">
    <router-view />
  </main-layout>
</template>

<script>
import MainLayout from "@/components/layouts/Main.vue";
import dayjs from "dayjs";

export default {
  name: "App",
  components: {
    MainLayout
  },
  data() {
    return {
      isReady: false,
      title: ""
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.title = route?.meta?.title;
      },
      deep: true,
      immediate: true
    }
  },
  async created() {
    this.$store.commit("rws/setKey", process.env.VUE_APP_ROBONOMICS_UI_KEY);
    this.$store.dispatch("rws/init");

    this.$store.commit(
      "rws/setLinkActivate",
      this.$router.resolve({ name: "rwsActivate" }).path
    );
    this.$store.commit(
      "rws/setLinkList",
      this.$router.resolve({ name: "rwsSetupsList" }).path
    );
    this.$store.commit(
      "rws/setLinkSetup",
      this.$router.resolve({ name: "rwsSetup" }).path
    );
    this.$store.commit(
      "rws/setLinkDevices",
      this.$router.resolve({ name: "telemetry" }).path
    );
    this.$store.commit(
      "rws/setLinkUsers",
      this.$router.resolve({ name: "rwsUsersList" }).path
    );
    this.$store.commit(
      "rws/setLinkUseractivate",
      this.$router.resolve({ name: "rwsUserSetup" }).path
    );
    this.$store.commit(
      "rws/setLinkHaSetup",
      this.$router.resolve({ name: "haSetup" }).path
    );
    this.$store.commit("ipfs/setGateways", [
      "https://cf-ipfs.com/ipfs/",
      "https://ipfs.io/ipfs/",
      "https://gateway.pinata.cloud/ipfs/",
      "https://gateway.ipfs.io/ipfs/",
      "https://aira.mypinata.cloud/ipfs/"
    ]);

    this.$robonomicsReady(async () => {
      this.isReady = true;

      if (
        this.$store.state.robonomicsUIvue.rws.list &&
        this.$store.state.robonomicsUIvue.rws.list.length > 0
      ) {
        const checkStatus = async (owner, enddate) => {
          const now = dayjs().valueOf();
          const end = Number(enddate);
          if (now && end && end - now < 0) {
            const dataRaw = await this.$robonomics.rws.getLedger(owner);
            if (!dataRaw.isEmpty) {
              if (dataRaw.value === null) {
                return "";
              }
              const issue_time = dataRaw.value.issueTime.toNumber();
              let days = 0;
              if (dataRaw.value.kind.isDaily) {
                days = dataRaw.value.kind.value.days.toNumber();
              }
              const DAYS_TO_MS = 24 * 60 * 60 * 1000;
              return issue_time + days * DAYS_TO_MS;
            }
          }
          return enddate;
        };

        const arr = [];
        for (const item of this.$store.state.robonomicsUIvue.rws.list) {
          arr.push({
            ...item,
            enddate: await checkStatus(item.owner, item.enddate)
          });
        }
        this.$store.dispatch("rws/rewrite", arr);
      }
    });
  }
};
</script>
