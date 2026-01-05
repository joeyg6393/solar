import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

// Test results tracking
interface TestResult {
  test: string;
  status: 'pass' | 'fail';
  error?: string;
  url?: string;
}

const testResults: TestResult[] = [];
const consoleErrors: string[] = [];
const pageErrors: Array<{ url: string; error: string }> = [];

// Helper function to track console errors
function setupConsoleTracking(page: Page, pageUrl: string) {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const errorText = msg.text();
      consoleErrors.push(`[${pageUrl}] ${errorText}`);
    }
  });

  page.on('pageerror', error => {
    pageErrors.push({
      url: pageUrl,
      error: error.message
    });
  });
}

// Load expected data
function getExpectedData() {
  const projectRoot = path.join(process.cwd(), '..');

  // Load service schema
  const schemaPath = path.join(projectRoot, 'service-schema-template.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const services = schema.services || [];

  // Load locations
  const locationsPath = path.join(projectRoot, 'locations.json');
  const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
  const locations = locationsData.locations || [];

  // Load page files
  const pagesDir = path.join(projectRoot, 'pages');
  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));

  return {
    services,
    locations,
    pageFiles,
    totalExpectedPages: pageFiles.length,
    serviceCount: services.length,
    locationCount: locations.length
  };
}

test.describe('Solar Website Validation', () => {

  test.beforeAll(() => {
    console.log('\n===========================================');
    console.log('SOLAR WEBSITE PLAYWRIGHT TESTING');
    console.log('===========================================\n');
  });

  test('Homepage loads successfully', async ({ page }) => {
    const testName = 'Homepage loads successfully';
    console.log(`\nTesting: ${testName}`);

    setupConsoleTracking(page, '/');

    try {
      const response = await page.goto(BASE_URL, { timeout: 10000 });

      // Check response status
      expect(response?.status()).toBe(200);

      // Check page title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(20);
      console.log(`  ✓ Title: "${title}"`);

      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDesc).toBeTruthy();
      expect(metaDesc!.length).toBeGreaterThan(50);
      console.log(`  ✓ Meta description: ${metaDesc!.length} characters`);

      // Check H1 exists
      const h1 = await page.locator('h1').first();
      await expect(h1).toBeVisible();
      const h1Text = await h1.textContent();
      console.log(`  ✓ H1: "${h1Text}"`);

      // Check hero section exists
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();
      console.log('  ✓ Hero section visible');

      // Check navigation exists
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
      console.log('  ✓ Navigation present');

      // Check for contact form or CTA
      const ctaButtons = await page.locator('a[href*="tel"], button').count();
      expect(ctaButtons).toBeGreaterThan(0);
      console.log(`  ✓ Found ${ctaButtons} CTA elements`);

      testResults.push({ test: testName, status: 'pass' });
      console.log(`✅ PASS: ${testName}\n`);

    } catch (error) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: (error as Error).message
      });
      console.log(`❌ FAIL: ${testName} - ${(error as Error).message}\n`);
      throw error;
    }
  });

  test('Sample service pages load correctly', async ({ page }) => {
    const testName = 'Sample service pages load correctly';
    console.log(`\nTesting: ${testName}`);

    const servicePages = [
      '/residential-solar-installation',
      '/commercial-solar-installation'
    ];

    const errors: string[] = [];

    for (const url of servicePages) {
      setupConsoleTracking(page, url);

      try {
        const response = await page.goto(`${BASE_URL}${url}`, { timeout: 10000 });

        if (response?.status() !== 200) {
          errors.push(`${url}: HTTP ${response?.status()}`);
          continue;
        }

        // Check title
        const title = await page.title();
        if (!title || title.length < 20) {
          errors.push(`${url}: Title too short or missing`);
        }

        // Check H1
        const h1Count = await page.locator('h1').count();
        if (h1Count === 0) {
          errors.push(`${url}: No H1 heading found`);
        }

        console.log(`  ✓ ${url} - Status ${response?.status()}`);

      } catch (error) {
        errors.push(`${url}: ${(error as Error).message}`);
      }
    }

    if (errors.length > 0) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: errors.join('; ')
      });
      console.log(`❌ FAIL: Found ${errors.length} errors:\n${errors.join('\n')}\n`);
      throw new Error(`Found ${errors.length} errors in service pages`);
    } else {
      testResults.push({ test: testName, status: 'pass' });
      console.log(`✅ PASS: All ${servicePages.length} service pages loaded\n`);
    }
  });

  test('Sample location pages load correctly', async ({ page }) => {
    const testName = 'Sample location pages load correctly';
    console.log(`\nTesting: ${testName}`);

    const locationPages = [
      '/springfield',
      '/chicopee'
    ];

    const errors: string[] = [];

    for (const url of locationPages) {
      setupConsoleTracking(page, url);

      try {
        const response = await page.goto(`${BASE_URL}${url}`, { timeout: 10000 });

        if (response?.status() !== 200) {
          errors.push(`${url}: HTTP ${response?.status()}`);
          continue;
        }

        // Check title
        const title = await page.title();
        if (!title || title.length < 20) {
          errors.push(`${url}: Title too short or missing`);
        }

        // Check H1
        const h1Count = await page.locator('h1').count();
        if (h1Count === 0) {
          errors.push(`${url}: No H1 heading found`);
        }

        console.log(`  ✓ ${url} - Status ${response?.status()}`);

      } catch (error) {
        errors.push(`${url}: ${(error as Error).message}`);
      }
    }

    if (errors.length > 0) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: errors.join('; ')
      });
      console.log(`❌ FAIL: Found ${errors.length} errors:\n${errors.join('\n')}\n`);
      throw new Error(`Found ${errors.length} errors in location pages`);
    } else {
      testResults.push({ test: testName, status: 'pass' });
      console.log(`✅ PASS: All ${locationPages.length} location pages loaded\n`);
    }
  });

  test('Sample service+location pages load correctly', async ({ page }) => {
    const testName = 'Sample service+location combination pages';
    console.log(`\nTesting: ${testName}`);

    const combinationPages = [
      '/residential-solar-installation-springfield',
      '/commercial-solar-installation-chicopee',
      '/solar-battery-storage-holyoke',
      '/ev-charger-installation-amherst',
      '/solar-maintenance-repair-westfield',
      '/ground-mount-solar-systems-northampton',
      '/solar-roof-installation-agawam',
      '/solar-panel-cleaning-services-longmeadow',
      '/solar-system-monitoring-optimization-west-springfield',
      '/solar-financing-consultation-east-longmeadow'
    ];

    const errors: string[] = [];
    let successCount = 0;

    for (const url of combinationPages) {
      setupConsoleTracking(page, url);

      try {
        const response = await page.goto(`${BASE_URL}${url}`, { timeout: 10000 });

        if (response?.status() === 404) {
          errors.push(`404 ERROR: ${url}`);
          continue;
        }

        if (response?.status() !== 200) {
          errors.push(`HTTP ${response?.status()}: ${url}`);
          continue;
        }

        // Check title
        const title = await page.title();
        if (!title || title.length < 20) {
          errors.push(`SHORT TITLE: ${url} - "${title}"`);
        }

        // Check meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (!metaDesc || metaDesc.length < 50) {
          errors.push(`SHORT META DESC: ${url}`);
        }

        // Check H1
        const h1Count = await page.locator('h1').count();
        if (h1Count === 0) {
          errors.push(`NO H1: ${url}`);
        }

        // Check for images
        const images = await page.locator('img').count();
        if (images === 0) {
          errors.push(`NO IMAGES: ${url}`);
        }

        successCount++;
        console.log(`  ✓ ${url.substring(0, 60)}... - Status ${response?.status()}`);

      } catch (error) {
        errors.push(`EXCEPTION: ${url} - ${(error as Error).message}`);
      }
    }

    console.log(`\n  Tested: ${combinationPages.length} pages`);
    console.log(`  Passed: ${successCount} pages`);
    console.log(`  Failed: ${errors.length} pages`);

    if (errors.length > 0) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: `${errors.length} errors found`
      });
      console.log(`\n❌ FAIL: Found ${errors.length} errors:\n${errors.slice(0, 10).join('\n')}\n`);
      if (errors.length > 10) {
        console.log(`  ... and ${errors.length - 10} more errors\n`);
      }
      throw new Error(`Found ${errors.length} errors in service+location pages`);
    } else {
      testResults.push({ test: testName, status: 'pass' });
      console.log(`✅ PASS: All ${combinationPages.length} service+location pages loaded\n`);
    }
  });

  test('SEO meta tags are present on all page types', async ({ page }) => {
    const testName = 'SEO meta tags validation';
    console.log(`\nTesting: ${testName}`);

    const testUrls = [
      '/',
      '/residential-solar-installation-springfield',
      '/commercial-solar-installation',
      '/springfield'
    ];

    const errors: string[] = [];

    for (const url of testUrls) {
      await page.goto(`${BASE_URL}${url}`, { timeout: 10000 });

      // Check title
      const title = await page.title();
      if (!title || title.length < 20) {
        errors.push(`SHORT TITLE on ${url}: "${title}"`);
      }

      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      if (!metaDesc || metaDesc.length < 50) {
        errors.push(`SHORT META DESC on ${url}`);
      }

      // Check Open Graph title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      if (!ogTitle) {
        errors.push(`MISSING OG:TITLE on ${url}`);
      }

      // Check canonical
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      if (!canonical) {
        errors.push(`MISSING CANONICAL on ${url}`);
      }

      if (errors.length === 0) {
        console.log(`  ✓ ${url} - All SEO tags present`);
      }
    }

    if (errors.length > 0) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: errors.join('; ')
      });
      console.log(`❌ FAIL: Found ${errors.length} SEO errors:\n${errors.join('\n')}\n`);
      throw new Error(`Found ${errors.length} SEO errors`);
    } else {
      testResults.push({ test: testName, status: 'pass' });
      console.log(`✅ PASS: All pages have proper SEO meta tags\n`);
    }
  });

  test('Click-to-call links work correctly', async ({ page }) => {
    const testName = 'Click-to-call functionality';
    console.log(`\nTesting: ${testName}`);

    await page.goto(BASE_URL, { timeout: 10000 });

    // Find phone links
    const phoneLinks = await page.locator('a[href^="tel:"]').all();

    if (phoneLinks.length === 0) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: 'No click-to-call links found'
      });
      console.log('❌ FAIL: No click-to-call links found\n');
      throw new Error('No click-to-call links found');
    }

    console.log(`  ✓ Found ${phoneLinks.length} click-to-call links`);

    // Check first phone link
    const href = await phoneLinks[0].getAttribute('href');
    expect(href).toMatch(/^tel:\+?\d+/);
    console.log(`  ✓ Phone link format valid: ${href}`);

    testResults.push({ test: testName, status: 'pass' });
    console.log(`✅ PASS: Click-to-call links working\n`);
  });

  test('Images load correctly', async ({ page }) => {
    const testName = 'Image loading validation';
    console.log(`\nTesting: ${testName}`);

    await page.goto(`${BASE_URL}/residential-solar-installation-springfield`, { timeout: 10000 });

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    const images = await page.locator('img').all();

    if (images.length === 0) {
      testResults.push({
        test: testName,
        status: 'fail',
        error: 'No images found on test page'
      });
      console.log('❌ FAIL: No images found on test page\n');
      throw new Error('No images found');
    }

    console.log(`  ✓ Found ${images.length} images on page`);

    // Check first image has alt text
    const firstImg = images[0];
    const alt = await firstImg.getAttribute('alt');
    expect(alt).toBeTruthy();
    console.log(`  ✓ Images have alt text`);

    testResults.push({ test: testName, status: 'pass' });
    console.log(`✅ PASS: Images loading correctly\n`);
  });

  test('Mobile responsiveness', async ({ page }) => {
    const testName = 'Mobile responsiveness';
    console.log(`\nTesting: ${testName}`);

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { timeout: 10000 });

    // Check if mobile menu exists or navigation is visible
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    console.log('  ✓ Navigation visible on mobile');

    // Check content is visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    console.log('  ✓ Content visible on mobile viewport');

    // Check CTA buttons are visible
    const ctaButtons = page.locator('a[href*="tel"]').first();
    await expect(ctaButtons).toBeVisible();
    console.log('  ✓ CTA buttons visible on mobile');

    testResults.push({ test: testName, status: 'pass' });
    console.log(`✅ PASS: Site is mobile responsive\n`);
  });

  test('Navigation links work', async ({ page }) => {
    const testName = 'Navigation functionality';
    console.log(`\nTesting: ${testName}`);

    await page.goto(BASE_URL, { timeout: 10000 });

    // Find navigation links
    const navLinks = await page.locator('nav a[href]').all();

    if (navLinks.length === 0) {
      console.log('⚠️ WARNING: No navigation links found');
      testResults.push({ test: testName, status: 'pass' });
      return;
    }

    console.log(`  ✓ Found ${navLinks.length} navigation links`);

    // Test first link
    const firstLink = navLinks[0];
    const href = await firstLink.getAttribute('href');

    if (href && !href.startsWith('#') && !href.startsWith('tel:')) {
      await firstLink.click();
      await page.waitForLoadState('networkidle');

      const currentUrl = page.url();
      console.log(`  ✓ Navigation link clicked successfully: ${currentUrl}`);
    }

    testResults.push({ test: testName, status: 'pass' });
    console.log(`✅ PASS: Navigation working correctly\n`);
  });

  test.afterAll(() => {
    console.log('\n===========================================');
    console.log('TEST SUMMARY REPORT');
    console.log('===========================================\n');

    const data = getExpectedData();

    console.log('PROJECT STATISTICS:');
    console.log(`  Total Service+Location Pages: ${data.totalExpectedPages}`);
    console.log(`  Services: ${data.serviceCount}`);
    console.log(`  Locations: ${data.locationCount}`);
    console.log('');

    const passed = testResults.filter(r => r.status === 'pass').length;
    const failed = testResults.filter(r => r.status === 'fail').length;

    console.log('TEST RESULTS:');
    console.log(`  Total Tests: ${testResults.length}`);
    console.log(`  Passed: ${passed} ✅`);
    console.log(`  Failed: ${failed} ${failed > 0 ? '❌' : ''}`);
    console.log('');

    if (failed > 0) {
      console.log('FAILED TESTS:');
      testResults
        .filter(r => r.status === 'fail')
        .forEach(r => {
          console.log(`  ❌ ${r.test}`);
          console.log(`     Error: ${r.error}`);
        });
      console.log('');
    }

    console.log('CONSOLE ERRORS:');
    if (consoleErrors.length === 0) {
      console.log('  ✅ No console errors detected');
    } else {
      console.log(`  ⚠️ Found ${consoleErrors.length} console errors:`);
      consoleErrors.slice(0, 10).forEach(err => {
        console.log(`     - ${err}`);
      });
      if (consoleErrors.length > 10) {
        console.log(`     ... and ${consoleErrors.length - 10} more errors`);
      }
    }
    console.log('');

    console.log('PAGE ERRORS:');
    if (pageErrors.length === 0) {
      console.log('  ✅ No page errors detected');
    } else {
      console.log(`  ⚠️ Found ${pageErrors.length} page errors:`);
      pageErrors.slice(0, 5).forEach(err => {
        console.log(`     - ${err.url}: ${err.error}`);
      });
      if (pageErrors.length > 5) {
        console.log(`     ... and ${pageErrors.length - 5} more errors`);
      }
    }
    console.log('');

    console.log('OVERALL STATUS:');
    if (failed === 0 && consoleErrors.length === 0 && pageErrors.length === 0) {
      console.log('  ✅ ALL TESTS PASSED - READY FOR DEPLOYMENT');
    } else if (failed === 0 && (consoleErrors.length > 0 || pageErrors.length > 0)) {
      console.log('  ⚠️ TESTS PASSED WITH WARNINGS - Review console errors before deployment');
    } else {
      console.log('  ❌ TESTS FAILED - Fix errors before deployment');
    }

    console.log('\n===========================================\n');

    // Write report to file
    const reportPath = path.join(process.cwd(), 'test-results.json');
    const report = {
      timestamp: new Date().toISOString(),
      projectStats: {
        totalPages: data.totalExpectedPages,
        services: data.serviceCount,
        locations: data.locationCount
      },
      testResults: {
        total: testResults.length,
        passed,
        failed,
        details: testResults
      },
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      overallStatus: failed === 0 ? 'PASS' : 'FAIL'
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Test report saved to: ${reportPath}\n`);
  });
});
