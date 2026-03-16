<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <!-- Header -->
      <v-container class="px-6 mt-5">
        <v-row justify="center">
          <v-col cols="12" md="4">
            <h1 class="text-h5 font-weight-semibold">
              Ofis Durumu
            </h1>
            <p class="text-body-2 text-medium-emphasis mt-1">
              Tuvalet doluluk oranlarını canlı takip edin.
            </p>
          </v-col>
        </v-row>
      </v-container>

      <!-- Cards -->
      <v-container class="pb-10 px-6">
        <v-row justify="center">
          <v-col cols="12" md="4">
            <!-- Erkek Tuvaleti -->
            <v-card class="mb-6 rounded-xl pa-6 status-card" elevation="1">
              <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center ga-4">
                  <div class="gender-icon gender-icon-men">
                    <v-icon color="blue-darken-2">
                      mdi-human-male
                    </v-icon>
                  </div>
                  <div>
                    <div class="text-subtitle-1 font-weight-medium">
                      Erkek Tuvaleti
                    </div>
                    <div class="text-caption text-medium-emphasis text-uppercase">
                      Tek Kişilik
                    </div>
                  </div>
                </div>
                <div class="d-flex align-center ga-2 status-pill status-pill-occupied">
                  <span class="status-dot status-pulse" />
                  <span class="text-orange-darken-2 text-body-2 font-weight-medium">Dolu</span>
                </div>
              </div>

              <v-divider class="mb-4" />

              <div class="mb-4">
                <div class="text-caption text-medium-emphasis text-uppercase font-weight-semibold mb-3">
                  Son Rezervasyonlar
                </div>
                <div class="d-flex flex-column ga-2">
                  <div
                    v-for="item in menReservations"
                    :key="item.name + item.time"
                    class="d-flex align-center justify-space-between text-body-2"
                  >
                    <span class="text-high-emphasis font-weight-medium">{{ item.name }}</span>
                    <span class="text-medium-emphasis">{{ item.time }}</span>
                  </div>
                </div>
              </div>

              <v-btn block color="grey-900" height="52" rounded="xl"
                class="bg-primary text-none text-body-2 font-weight-medium rounded-xl"
                @click="openModal('Erkek Tuvaleti')">
                Rezervasyon Yap
              </v-btn>
            </v-card>

            <!-- Kadın Tuvaleti -->
            <v-card class="mb-6 rounded-xl pa-6 status-card" elevation="1">
              <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center ga-4">
                  <div class="gender-icon gender-icon-women">
                    <v-icon color="pink-darken-2">
                      mdi-human-female
                    </v-icon>
                  </div>
                  <div>
                    <div class="text-subtitle-1 font-weight-medium">
                      Kadın Tuvaleti
                    </div>
                    <div class="text-caption text-medium-emphasis text-uppercase">
                      Tek Kişilik
                    </div>
                  </div>
                </div>
                <div class="d-flex align-center ga-2 status-pill status-pill-available">
                  <span class="status-dot" />
                  <span class="text-emerald-darken-2 text-body-2 font-weight-medium">Müsait</span>
                </div>
              </div>

              <v-divider class="mb-4" />

              <div class="mb-4">
                <div class="text-caption text-medium-emphasis text-uppercase font-weight-semibold mb-3">
                  Son Rezervasyonlar
                </div>
                <div class="d-flex flex-column ga-2">
                  <div
                    v-for="item in womenReservations"
                    :key="item.name + item.time"
                    class="d-flex align-center justify-space-between text-body-2"
                  >
                    <span class="text-high-emphasis font-weight-medium">{{ item.name }}</span>
                    <span class="text-medium-emphasis">{{ item.time }}</span>
                  </div>
                </div>
              </div>

              <v-btn block color="grey-900" height="52" rounded="xl"
                class="bg-primary text-none text-body-2 font-weight-medium rounded-xl"
                @click="openModal('Kadın Tuvaleti')">
                Rezervasyon Yap
              </v-btn>
            </v-card>

            <!-- Footer info -->
            <div class="d-flex justify-center mt-6">
              <div class="d-inline-flex align-center ga-2 text-caption text-disabled">
                <div class="footer-dot" />
                <span>Veriler her 30 saniyede bir güncellenir</span>
                <div class="footer-dot" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Reservation Dialog -->
      <v-dialog v-model="showReservation" max-width="480" content-class="reservation-dialog">
        <v-card class="rounded-xl">
          <v-card-title class="d-flex align-center justify-space-between">
            <div>
              <div class="text-subtitle-1 font-weight-semibold">
                {{ modalTitle }}
              </div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                Lütfen bilgilerinizi girin.
              </div>
            </div>
            <v-btn icon variant="text" size="small" @click="closeModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="pt-2">
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              class="mb-4"
              density="comfortable"
            >
              {{ errorMessage }}
            </v-alert>
            <v-form @submit.prevent="handleConfirm">
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="form.name" label="İsim" placeholder="Adınız" variant="outlined"
                    density="comfortable" rounded="xl" hide-details required />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model.number="form.hour" type="number" label="Saat" placeholder="14"
                    variant="outlined" density="comfortable" rounded="xl" hide-details :min="0" :max="23" required />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model.number="form.minute" type="number" label="Dakika" placeholder="20"
                    variant="outlined" density="comfortable" rounded="xl" hide-details :min="0" :max="59" required />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions class="px-6 pb-6 pt-2 d-flex flex-column ga-3">
            <v-btn height="48" block class="bg-primary flex-grow-1 text-none text-body-2 font-weight-medium"
              rounded="xl" :loading="confirmState === 'processing'" :disabled="!canConfirm" @click="handleConfirm">
              <template v-if="confirmState === 'idle'">
                Onayla
              </template>
              <template v-else-if="confirmState === 'processing'">
                İşleniyor...
              </template>
              <template v-else>
                Onaylandı
              </template>
            </v-btn>
            <v-btn height="48" block variant="flat" rounded="xl"
              class="flex-grow-1 text-none text-body-2 font-weight-medium" @click="closeModal">
              İptal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const showReservation = ref(false);
const modalTitle = ref<"Erkek Tuvaleti" | "Kadın Tuvaleti" | "Rezervasyon">(
  "Rezervasyon",
);

interface RecentReservation {
  name: string;
  time: string;
}

const menReservations = ref<RecentReservation[]>([
  { name: "Ahmet", time: "14:20" },
  { name: "Mehmet", time: "14:05" },
  { name: "Can", time: "13:45" },
  { name: "Burak", time: "13:15" },
  { name: "Deniz", time: "12:50" },
]);

const womenReservations = ref<RecentReservation[]>([
  { name: "Ayşe", time: "14:15" },
  { name: "Fatma", time: "13:55" },
  { name: "Zeynep", time: "13:30" },
  { name: "Ece", time: "13:10" },
  { name: "Selin", time: "12:40" },
]);

type ConfirmState = "idle" | "processing" | "confirmed";

const confirmState = ref<ConfirmState>("idle");
const errorMessage = ref("");

const form = reactive({
  name: "",
  hour: null as number | null,
  minute: null as number | null,
});

const canConfirm = computed(() => {
  return Boolean(
    form.name &&
    form.hour !== null &&
    form.minute !== null &&
    form.hour >= 0 &&
    form.hour <= 23 &&
    form.minute >= 0 &&
    form.minute <= 59,
  );
});

const openModal = (title: "Erkek Tuvaleti" | "Kadın Tuvaleti" | "Rezervasyon") => {
  modalTitle.value = title;
  showReservation.value = true;
  confirmState.value = "idle";
  errorMessage.value = "";
};

const closeModal = () => {
  showReservation.value = false;
  confirmState.value = "idle";
  errorMessage.value = "";
  form.name = "";
  form.hour = null;
  form.minute = null;
};

const handleConfirm = () => {
  if (!canConfirm.value || confirmState.value !== "idle") return;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const selectedMinutes = (form.hour as number) * 60 + (form.minute as number);

  if (selectedMinutes < currentMinutes) {
    errorMessage.value = "Geçmiş tarihli rezervasyon yapılamaz";
    return;
  }

  errorMessage.value = "";

  confirmState.value = "processing";

  setTimeout(() => {
    const time = `${String(form.hour).padStart(2, "0")}:${String(
      form.minute,
    ).padStart(2, "0")}`;

    const targetList =
      modalTitle.value === "Erkek Tuvaleti"
        ? menReservations
        : modalTitle.value === "Kadın Tuvaleti"
          ? womenReservations
          : null;

    if (targetList) {
      targetList.value = [
        { name: form.name, time },
        ...targetList.value,
      ].slice(0, 5);
    }

    confirmState.value = "confirmed";

    setTimeout(() => {
      closeModal();
    }, 800);
  }, 1000);
};
</script>

<style scoped>
.status-card {
  border: 1px solid rgba(226, 232, 240, 1);
}

.gender-icon {
  width: 48px;
  height: 48px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gender-icon-men {
  background-color: #eff6ff;
  color: #2563eb;
}

.gender-icon-women {
  background-color: #ffe4f0;
  color: #ec4899;
}

.status-pill {
  border-radius: 999px;
  padding: 6px 14px;
}

.status-pill-occupied {
  background-color: #fff7ed;
}

.status-pill-available {
  background-color: #ecfdf5;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.status-pill-occupied .status-dot {
  background-color: #fb923c;
}

.status-pill-available .status-dot {
  background-color: #34d399;
}

.status-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.footer-dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background-color: rgba(148, 163, 184, 0.8);
}
</style>