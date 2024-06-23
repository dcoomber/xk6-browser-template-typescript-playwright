import { check } from 'k6';
import { Options } from 'k6/options';
import { browser } from 'k6/experimental/browser';
import { clickCheckboxOnk6 } from '@pages/example-page';

export const options: Options = {
    vus: 1,
    scenarios: {
      perftest: {
        executor: 'per-vu-iterations',
        options: {
          browser: {
            type: 'chromium',
          },
        },
      },
    },
  }

export default async function () {
    // const browser = chromium.launch({
    //     headless: true, args: ['no-sandbox']
    // });
    // const context = browser.newContext();
    const page = browser.newPage();
    try {
        await clickCheckboxOnk6(page);
        check(page, {
            'checkbox is checked': (p) =>
                p.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
        });
    } finally {
        page.close();
        // browser.close();
    }
};
