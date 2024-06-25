import { check } from 'k6';
import { Options } from 'k6/options';
import { browser } from 'k6/experimental/browser';
import { clickCheckboxOnk6 } from '@pages/example-page';


export let options: Options = {
    vus: 1,
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            options: {
            browser: {
              type: 'chromium',
            },
          },
        },
    },
    thresholds: {
        checks: ["rate==1.0"]
    }
};

export default async function () {
    const page = browser.newPage();
    try {
        await clickCheckboxOnk6(page);
        check(page, {
            'checkbox is checked': (p) =>
                p.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
        });
    } finally {
        page.close();
    }
};
