import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Event Scanner',
    version: '1.0.0',
    description: 'Scan websites for event information and post to API',
    permissions: ['activeTab', 'storage'],
    host_permissions: ['<all_urls>'],
  },
});
