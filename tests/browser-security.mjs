const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true });
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const context = await browser.newContext();
const page = await context.newPage();
const requests = [];
await context.route('**/*', async route => {
 const url = route.request().url();
 if (/googletagmanager\.com\/gtag\/js/.test(url)) { requests.push(url); await route.fulfill({ contentType: 'application/javascript', body: '' }); }
 else if (/google-analytics\.com/.test(url)) { requests.push(url); await route.abort(); }
 else await route.continue();
});
for (const choice of [null, 'accepted', 'rejected']) {
  await page.goto(base + '/cerez-politikasi');
  await page.evaluate(choice => {
    if (choice === null) localStorage.removeItem('cookieConsent');
    else localStorage.setItem('cookieConsent', choice);
  }, choice);
  await page.reload();
  await page.waitForLoadState('networkidle');
  assert.equal(requests.length, 0);
  assert.equal(await page.locator('script[src*="googletagmanager"], script[src*="google-analytics"]').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Kabul Et', exact: true }).count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Çerez tercihleri', exact: true }).count(), 0);
}
for (const cookie of ['', 'admin_session=true', 'admin_session=admin']) {
 const api = await context.request.post(base + '/api/admin/db', { headers: { cookie }, data: { table: 'events', action: 'delete', match: {} } });
 assert.equal(api.status(), 401);
 const panel = await context.request.get(base + '/admin', { headers: { cookie }, maxRedirects: 0 });
 assert.equal(panel.status(), 307);
 assert.ok(panel.headers().location.includes('/admin/login'));
}
await context.close();
console.log('PASS: Analytics absent with no choice and old accepted/rejected choices; anonymous and forged cookies denied over HTTP.');
await browser.close();
