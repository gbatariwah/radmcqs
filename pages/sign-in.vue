<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const loading = ref(false);
const loginError = ref("");

definePageMeta({
  layout: "auth",
  middleware: [
    function (to, from) {
      const session = useSupabaseSession();

      if (session.value) {
        return navigateTo("/");
      }
    },
  ],
});

const state = reactive({
  email: "",
  password: "",
});

watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  }
});

async function onSubmit(event) {
  // Do something with event.data
  loginError.value = "";

  const { email, password } = event.data;
  loading.value = true;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    loginError.value = error.message;
  }

  loading.value = false;
}
</script>

<template>
  <div class="flex flex-col max-w-xs mx-auto justify-center">
    <div class="mb-8">
      <div class="flex justify-center py-6">
        <Logo />
      </div>
    </div>
    <div class="mb-4" v-if="loginError">
      <UAlert color="red" variant="soft" :description="loginError" />
    </div>
    <UForm :state="state" @submit="onSubmit" class="space-y-12">
      <div class="space-y-4">
        <UFormGroup label="Email" name="email" class="w-full">
          <UInput
            color="gray"
            variant="outline"
            v-model="state.email"
            :ui="{
              color: {
                gray: {
                  outline: 'dark:bg-zinc-700',
                },
              },
            }"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="w-full">
          <UInput
            color="gray"
            variant="outline"
            v-model="state.password"
            type="password"
            :ui="{
              color: {
                gray: {
                  outline: 'dark:bg-zinc-700',
                },
              },
            }"
          />
        </UFormGroup>
      </div>
      <div>
        <UButton
          :disabled="!state.email || !state.password"
          :loading
          loading-icon="ph:spinner-ball-duotone"
          block
          type="submit"
        >
          Sign in
        </UButton>
      </div>
    </UForm>
  </div>
</template>
