import {test, expect} from '@playwright/test';

test('landing renders the workshop-manual hero and all sections', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {level: 1, name: 'Tome'})).toBeVisible();
  await expect(page.getByText('One catalog,')).toBeVisible();
  await expect(page.getByRole('img', {name: /exploded view/i})).toBeVisible();
  for (const t of [
    'Why Tome',
    'How it works',
    'What you get',
    'Midnight',
    'Get started in seconds',
    'Publish a catalog',
  ]) {
    await expect(page.getByText(t, {exact: false}).first()).toBeVisible();
  }
});

test('install command is shown and nav reaches docs', async ({page}) => {
  await page.goto('/');
  await expect(page.getByText('cargo install tome-mcp')).toBeVisible();
  await page.getByRole('link', {name: 'Docs'}).first().click();
  await expect(page).toHaveURL(/\/docs\//);
});
