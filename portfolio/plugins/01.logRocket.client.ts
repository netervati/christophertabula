import LogRocket from 'logrocket';

export default defineNuxtPlugin(() => {
  const { $pinia } = useNuxtApp();
  const opts = useRuntimeConfig()?.public?.logRocket;

  if (!opts?.id || (!opts?.dev && !(process.env.NODE_ENV === 'production'))) {
    return;
  }

  LogRocket.init(opts?.id, opts?.config);

  if ($pinia && opts?.enablePinia) {
    $pinia.use(({ store }) => {
      store.$subscribe(m => LogRocket.log('mutation', m));
    });
  }

  return { provide: { LogRocket } };
});
