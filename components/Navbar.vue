<template>
  <nav class="flex justify-between items-center py-4">
    <Logo />

    <div class="flex gap-4 items-center">
      <ToggleTheme />
      <UDropdown
        :items="items"
        :ui="{
          item: { disabled: 'cursor-text select-text' },
          background: 'dark:bg-neutral-900',
        }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar icon="ph:user-duotone" />

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <div class="flex justify-between w-full" @click="handleSignOut">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </div>
        </template>
      </UDropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
};

watchEffect(() => {
  if (!user.value) {
    navigateTo("/sign-in");
  }
});

const items = [
  [
    {
      label: user.value.email,
      slot: "account",
      disabled: true,
    },
  ],
  // [
  //   {
  //     label: "Settings",
  //     icon: "i-heroicons-cog-8-tooth",
  //   },
  // ],
  // [
  //   {
  //     label: "Documentation",
  //     icon: "i-heroicons-book-open",
  //   },
  //   {
  //     label: "Changelog",
  //     icon: "i-heroicons-megaphone",
  //   },
  //   {
  //     label: "Status",
  //     icon: "i-heroicons-signal",
  //   },
  // ],
  [
    {
      label: "Sign out",
      icon: "ph:sign-out-duotone",
    },
  ],
];
</script>
